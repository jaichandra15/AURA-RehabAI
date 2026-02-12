// code adapted for RehabAI from 
// https://github.com/tensorflow/tfjs-models/blob/master/pose-detection/demos/live_video/src/renderer_canvas2d.js

/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as posedetection from '@tensorflow-models/pose-detection';

const DEFAULT_LINE_WIDTH = 2;
const DEFAULT_RADIUS = 4;
const MODEL = posedetection.SupportedModels.MoveNet;
const SCORE_THRESHOLD = 0.3;


export class RendererCanvas2d {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');

    this.videoWidth = canvas.width;
    this.videoHeight = canvas.height;
  }

  flip(videoWidth) {
    // Because the image from camera is mirrored, need to flip horizontally.
    this.ctx.translate(videoWidth, 0);
    this.ctx.scale(-1, 1);
  }

  draw(rendererParams) {
    const [video, poses] = rendererParams;
    this.drawCtx(video);

    if (poses && poses.length > 0) {
      this.drawResults(poses);
    }
  }

  drawCtx(video) {
    this.ctx.drawImage(video, 0, 0, this.videoWidth, this.videoHeight);
  }

  clearCtx() {
    this.ctx.clearRect(0, 0, this.videoWidth, this.videoHeight);
  }

  /**
   * Draw the keypoints and skeleton on the video.
   * @param poses A list of poses to render.
   */
  drawResults(poses) {
    for (const pose of poses) {
      this.drawResult(pose);
    }
  }

  /**
   * Draw the keypoints and skeleton on the video.
   * @param pose A pose with keypoints to render.
   */
  drawResult(pose) {
    if (pose.keypoints != null) {
      this.drawKeypoints(pose.keypoints);
      this.drawSkeleton(pose.keypoints);
    }
  }

  /**
   * Draw the keypoints on the video.
   * @param keypoints A list of keypoints.
   */
  drawKeypoints(keypoints) {
    const keypointInd = posedetection.util.getKeypointIndexBySide(MODEL);
    this.ctx.fillStyle = 'Red';
    this.ctx.strokeStyle = 'White';
    this.ctx.lineWidth = DEFAULT_LINE_WIDTH;

    for (const i of keypointInd.middle) {
      this.drawKeypoint(keypoints[i]);
    }

    this.ctx.fillStyle = 'Green';
    for (const i of keypointInd.left) {
      this.drawKeypoint(keypoints[i]);
    }

    this.ctx.fillStyle = 'Orange';
    for (const i of keypointInd.right) {
      this.drawKeypoint(keypoints[i]);
    }
  }

  drawKeypoint(keypoint) {
    // If score is null, just show the keypoint.
    const score = keypoint.score != null ? keypoint.score : 1;
    const scoreThreshold = SCORE_THRESHOLD;

    if (score >= scoreThreshold) {
      const circle = new Path2D();
      circle.arc(keypoint.x, keypoint.y, DEFAULT_RADIUS, 0, 2 * Math.PI);
      this.ctx.fill(circle);
      this.ctx.stroke(circle);
    }
  }

  /**
   * Draw the skeleton of a body on the video.
   * @param keypoints A list of keypoints.
   */
  drawSkeleton(keypoints) {
    this.ctx.fillStyle = 'White';
    this.ctx.strokeStyle = 'White';
    this.ctx.lineWidth = DEFAULT_LINE_WIDTH;

    posedetection.util.getAdjacentPairs(MODEL).forEach(([i, j]) => {
      const kp1 = keypoints[i];
      const kp2 = keypoints[j];

      // If score is null, just show the keypoint.
      const score1 = kp1.score != null ? kp1.score : 1;
      const score2 = kp2.score != null ? kp2.score : 1;
      const scoreThreshold = SCORE_THRESHOLD;

      if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
        this.ctx.beginPath();
        this.ctx.moveTo(kp1.x, kp1.y);
        this.ctx.lineTo(kp2.x, kp2.y);
        this.ctx.stroke();
      }
    });
  }

  /**
   * Draw reference skeleton as translucent overlay (Ghost Skeleton)
   * Provides visual guidance by showing expert demonstration
   * @param {Object} referenceDF - DataFrame with reference joint positions
   * @param {number} frameIndex - Current frame in reference sequence
   */
  drawGhostSkeleton(referenceDF, frameIndex) {
    // Ensure we have valid data
    if (!referenceDF || frameIndex < 0 || frameIndex >= referenceDF.length) {
      return;
    }

    const ghostKeypoints = this.mapReferenceToKeypoints(referenceDF, frameIndex);

    // Save current context state
    this.ctx.save();

    // Semi-transparent green for reference skeleton
    this.ctx.globalAlpha = 0.4;
    this.ctx.fillStyle = 'LimeGreen';
    this.ctx.strokeStyle = 'LimeGreen';
    this.ctx.lineWidth = 3;

    // Draw ghost skeleton
    this.drawKeypoints(ghostKeypoints);
    this.drawSkeleton(ghostKeypoints);

    // Restore context
    this.ctx.restore();
  }

  /**
   * Map reference CSV data to MediaPipe keypoint format
   * Converts DataFrame row to array of keypoint objects
   * @param {Object} referenceDF - DataFrame with reference positions
   * @param {number} frameIndex - Frame index to extract
   * @returns {Array} Keypoints in {x, y, score} format
   */
  mapReferenceToKeypoints(referenceDF, frameIndex) {
    // Get the specific frame (iloc is 0-indexed, end is exclusive)
    const row = referenceDF.iloc([frameIndex, frameIndex + 1]);
    const keypoints = [];

    // Map 17 joints from reference CSV to keypoint format
    const jointNames = [
      'nose', 'left_eye', 'right_eye', 'left_ear', 'right_ear',
      'left_shoulder', 'right_shoulder', 'left_elbow', 'right_elbow',
      'left_wrist', 'right_wrist', 'left_hip', 'right_hip',
      'left_knee', 'right_knee', 'left_ankle', 'right_ankle'
    ];

    // Convert normalized coordinates (0-1) to pixel coordinates
    jointNames.forEach(joint => {
      const x = row.get(`${joint}_x`).values[0];
      const y = row.get(`${joint}_y`).values[0];
      const score = row.get(`${joint}_confidence`).values[0];

      keypoints.push({
        x: x * this.videoWidth,
        y: y * this.videoHeight,
        score: score
      });
    });

    return keypoints;
  }
}