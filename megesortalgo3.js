// ============================================================ // 
// FUNCTIONALITY MODULE - Merge Sort Logic and State Management // 
// ============================================================ // 

const MergeSort = {
  // State 
  originalArray: [],
  isRunning: false,
  isPaused: false,
  shouldStop: false,

  // Utility: sleep for async delays
  sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
  },

  // Calculate delay based on speed slider
  getDelay() {
    const sliderVal = Number(Animation.elements.speedEl.value);
    const minDelay = 50, maxDelay = 5000;
    const t = (sliderVal - 1) / 99;
    return maxDelay * Math.pow(minDelay / maxDelay, t);
  },

  // Get speed display text for UI
  getSpeedDisplay() {
    const sliderVal = Number(Animation.elements.speedEl.value);
    const minSpeed = 0.1, maxSpeed = 10;
    const t = (sliderVal - 1) / 99;
    const speed = minSpeed * Math.pow(maxSpeed / minSpeed, t); 
    return speed < 1 ? speed.toFixed(1) + 'x' : speed.toFixed(1).replace(/\.0$/, '') + 'x';
  },

  // Generate random array values
  generateArray(n) {
    return Array.from({ length: n }, () => Math.floor(Math.random() * 99) + 1);
  },

  // Wait while paused
  async waitIfPaused() {
    while (this.isPaused && !this.shouldStop) {
      await this.sleep(50);
    }
    if (this.shouldStop) throw new Error('STOPPED');
  },

  // MERGE SORT ALGORITHM: Divide step
  divide(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    return {
      left: arr.slice(0, mid),
      right: arr.slice(mid)
    };
  },

  // MERGE SORT ALGORITHM: Merge two sorted arrays
  merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
  },

  // Run the visualization
  async run() {
    const arr = [...this.originalArray];
    let levels = [[{ arr: [...arr], state: 'initial' }]];

    Animation.addLog(`Starting merge sort on ${Animation.formatArray(arr)}`, 'divide');
    Animation.setStatus('Sorting...', true, 'DIVIDE');

    // DIVIDE PHASE
    await this.dividePhase(levels);
    if (this.shouldStop) return;

    // MERGE PHASE
    Animation.setStatus('Sorting...', true, 'MERGE');
    await this.mergePhase(levels);
    if (this.shouldStop) return;

    Animation.addLog(`✓ Sorting complete! Result: ${Animation.formatArray(levels[0][0].arr)}`, 'complete');
    Animation.setStatus('Complete!', false, 'DONE');
  },

  // Divide phase: split arrays level by level
  async dividePhase(levels) {
    let currentLevel = 0;

    while (true) {
      await this.waitIfPaused();

      const thisLevel = levels[currentLevel];
      let anyDivided = false;
      const nextLevel = [];

      for (const item of thisLevel) {
        if (item.arr.length > 1) {
          anyDivided = true;
          const { left, right } = this.divide(item.arr);
          nextLevel.push({ arr: left, state: 'left', parent: item });
          nextLevel.push({ arr: right, state: 'right', parent: item });
        } else {
          nextLevel.push({ arr: item.arr, state: 'single', parent: item });
        }
      }

      if (!anyDivided) break;

      levels.push(nextLevel);
      currentLevel++;

      // Log the division
      const leftArrays = nextLevel.filter(x => x.state === 'left').map(x => x.arr);
      const rightArrays = nextLevel.filter(x => x.state === 'right').map(x => x.arr);
      if (leftArrays.length > 0) {
        Animation.addLog(
          `Dividing: ${leftArrays.map(a => Animation.formatArray(a)).join(', ')} ← left | right → ${rightArrays.map(a => Animation.formatArray(a)).join(', ')}`,
          'divide'
        );
      }

      Animation.renderLevels(levels);
      await this.sleep(this.getDelay());
    }
  },

  // Merge phase: combine arrays from bottom up
  async mergePhase(levels) {
    for (let levelIdx = levels.length - 1; levelIdx > 0; levelIdx--) {
      await this.waitIfPaused();

      const currentLevel = levels[levelIdx];
      const parentLevel = levels[levelIdx - 1];
      const newParentLevel = [];

      for (const parent of parentLevel) {
        const children = currentLevel.filter(c => c.parent === parent);

        if (children.length === 2) {
          const left = children[0].arr;
          const right = children[1].arr;

          Animation.addLog(`Merging ${Animation.formatArray(left)} + ${Animation.formatArray(right)}`, 'merge');

          // Show merging state
          children[0].state = 'merging';
          children[1].state = 'merging';
          Animation.renderLevels(levels);
          await this.sleep(this.getDelay() / 2);
          await this.waitIfPaused();

          // Perform merge with comparison logs
          const merged = await this.mergeWithLogging(left, right);

          parent.arr = merged;
          parent.state = 'merged';
          Animation.addLog(`Result: ${Animation.formatArray(merged)}`, 'merge');
        } else if (children.length === 1) {
          parent.arr = children[0].arr;
          parent.state = 'merged';
        }

        newParentLevel.push(parent);
      }

      levels.splice(levelIdx, 1);
      levels[levelIdx - 1] = newParentLevel;

      Animation.renderLevels(levels);
      await this.sleep(this.getDelay());
    }

    // Mark as complete
    if (levels[0] && levels[0][0]) {
      levels[0][0].state = 'complete';
      Animation.renderLevels(levels);
    }
  },

  // Merge with logging for each comparison
  async mergeWithLogging(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      await this.waitIfPaused();
      const pick = left[i] <= right[j] ? left[i] : right[j];
      Animation.addLog(`Comparing: ${left[i]} vs ${right[j]} → picking ${pick}`, 'compare');
      await this.sleep(this.getDelay() / 3);

      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  },

  // Reset to initial state
  reset(newSize) {
    this.isRunning = false;
    this.isPaused = false;
    this.shouldStop = false;
    this.originalArray = this.generateArray(newSize);
    Animation.renderInitialArray(this.originalArray);
    Animation.setControlsDuringRun(false);
    Animation.setPauseButtonText(false);
    Animation.setStatus('Ready', false, 'IDLE');
  }
};
