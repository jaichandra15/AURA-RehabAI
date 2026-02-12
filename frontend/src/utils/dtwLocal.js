/**
 * Dynamic Time Warping (DTW) Implementation for Real-Time Feedback
 * 
 * This module provides browser-based DTW calculation for immediate joint trajectory comparison.
 * Ported from Python (tslearn.metrics.dtw) to eliminate network latency.
 */

/**
 * Compute Dynamic Time Warping distance between two sequences
 * 
 * Uses dynamic programming to find the optimal alignment between two time series.
 * The algorithm minimizes the cumulative distance along the warping path.
 * 
 * @param {number[]} seq1 - Current joint trajectory (e.g., x or y coordinates over time)
 * @param {number[]} seq2 - Reference joint trajectory from expert demonstration
 * @returns {number} DTW distance normalized by path length
 */
export function computeDTW(seq1, seq2) {
    const n = seq1.length;
    const m = seq2.length;

    // Edge case: empty sequences
    if (n === 0 || m === 0) {
        return Infinity;
    }

    // Initialize cost matrix with infinity
    // dtw[i][j] = minimum cost to align seq1[0...i-1] with seq2[0...j-1]
    const dtw = Array(n + 1).fill(null).map(() =>
        Array(m + 1).fill(Infinity)
    );
    dtw[0][0] = 0;

    // Fill cost matrix using dynamic programming
    // For each position (i, j), we can arrive from:
    // - (i-1, j) = insertion (skip element in seq1)
    // - (i, j-1) = deletion (skip element in seq2)
    // - (i-1, j-1) = match/substitution
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            const cost = Math.abs(seq1[i - 1] - seq2[j - 1]);
            dtw[i][j] = cost + Math.min(
                dtw[i - 1][j],     // insertion
                dtw[i][j - 1],     // deletion
                dtw[i - 1][j - 1]  // match
            );
        }
    }

    // Normalize by path length (average cost per step)
    // This makes DTW values comparable across different sequence lengths
    return dtw[n][m] / (n + m);
}

/**
 * Compare joint trajectories and generate feedback messages
 * 
 * Analyzes the difference between current exercise performance and reference
 * for all important joints (excluding face landmarks). Generates actionable
 * feedback when DTW cost exceeds threshold.
 * 
 * @param {Object} currentDF - DataFrame with current joint positions (pandas-js)
 * @param {Object} referenceDF - DataFrame with reference positions from CSV
 * @param {Object} keypointDict - Joint name to index mapping
 * @returns {Array<Object>} Feedback messages with joint, axis, and cost information
 */
export function compareJointsWithDTW(currentDF, referenceDF, keypointDict) {
    const feedbackMessages = [];
    const threshold = 2.5; // Same threshold as Python implementation

    // Get current frame count
    const currentLength = currentDF.length;

    // Extract reference frames up to current position
    // Note: iloc is 0-indexed, end is exclusive
    const referenceFrames = referenceDF.iloc([0, currentLength]);

    // Only analyze important joints (skip face landmarks: indices 0-4)
    // Also skip ankles (indices > 12) as they're less critical for upper body exercises
    for (const [jointName, jointIndex] of Object.entries(keypointDict)) {
        if (jointIndex <= 4 || jointIndex > 12) {
            continue;
        }

        // Format joint name for user-friendly messages
        const jointLabel = jointName.replace(/_/g, ' ');

        // ==================== X-AXIS COMPARISON ====================
        const colX = `${jointName}_x`;

        // Extract x-coordinate trajectories
        const currentX = currentDF.get(colX).values.toArray();
        const refX = referenceFrames.get(colX).values.toArray();

        // Compute DTW distance
        const costX = computeDTW(currentX, refX);

        // Generate feedback if cost exceeds threshold
        if (costX > threshold) {
            feedbackMessages.push({
                message: `Adjust your ${jointLabel} horizontally`,
                joint: jointName,
                axis: 'x',
                cost: costX.toFixed(2),
                index: null // Will be set by caller if needed for tracking
            });
        }

        // ==================== Y-AXIS COMPARISON ====================
        const colY = `${jointName}_y`;

        // Extract y-coordinate trajectories
        const currentY = currentDF.get(colY).values.toArray();
        const refY = referenceFrames.get(colY).values.toArray();

        // Compute DTW distance
        const costY = computeDTW(currentY, refY);

        // Generate feedback if cost exceeds threshold
        if (costY > threshold) {
            feedbackMessages.push({
                message: `Adjust your ${jointLabel} vertically`,
                joint: jointName,
                axis: 'y',
                cost: costY.toFixed(2),
                index: null
            });
        }
    }

    return feedbackMessages;
}

/**
 * Validate DTW implementation against known test cases
 * Use this for debugging and verifying algorithm correctness
 * 
 * @returns {boolean} True if all tests pass
 */
export function validateDTW() {
    // Test 1: Identical sequences should have zero cost
    const seq1 = [1, 2, 3, 4, 5];
    const cost1 = computeDTW(seq1, seq1);
    if (Math.abs(cost1) > 0.01) {
        console.error(`DTW Test 1 Failed: Expected ~0, got ${cost1}`);
        return false;
    }

    // Test 2: Simple offset
    const seq2a = [0, 0, 0, 0, 0];
    const seq2b = [1, 1, 1, 1, 1];
    const cost2 = computeDTW(seq2a, seq2b);
    const expected2 = 1.0; // Average difference is 1
    if (Math.abs(cost2 - expected2) > 0.1) {
        console.error(`DTW Test 2 Failed: Expected ~${expected2}, got ${cost2}`);
        return false;
    }

    // Test 3: Different lengths
    const seq3a = [1, 2, 3];
    const seq3b = [1, 1.5, 2, 2.5, 3];
    const cost3 = computeDTW(seq3a, seq3b);
    if (cost3 < 0 || cost3 === Infinity) {
        console.error(`DTW Test 3 Failed: Invalid cost ${cost3}`);
        return false;
    }

    console.log('✓ All DTW validation tests passed');
    return true;
}
