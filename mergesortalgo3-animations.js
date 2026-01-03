// ============================================================== //
// ANIMATION MODULE - Handles all visual rendering and UI updates //
// ============================================================== //
 
const Animation = {
  // DOM Elements
  elements: {
    treeContainer: document.getElementById('treeContainer'),
    logsContainer: document.getElementById('logsContainer'),
    sizeOut: document.getElementById('sizeOut'),
    speedOut: document.getElementById('speedOut'),
    statusDot: document.getElementById('statusDot'),
    statusText: document.getElementById('statusText'),
    phaseText: document.getElementById('phaseText'),
    startBtn: document.getElementById('startBtn'),
    pauseBtn: document.getElementById('pauseBtn'),
    resetBtn: document.getElementById('resetBtn'),
    randomBtn: document.getElementById('randomBtn'),
    sizeEl: document.getElementById('size'),
    speedEl: document.getElementById('speed'),
    clearLogsBtn: document.getElementById('clearLogs')
  },

  // Clear the tree visualization
  clearTree() {
    this.elements.treeContainer.innerHTML = '';
  },

  // Create a subarray element with optional styling class
  createSubarrayElement(arr, className = '') {
    const subarray = document.createElement('div');
    subarray.className = `subarray ${className}`;
    arr.forEach(val => {
      const elem = document.createElement('div');
      elem.className = 'element';
      elem.textContent = val;
      subarray.appendChild(elem);
    });
    return subarray;
  },

  // Create a tree level container
  createTreeLevel() {
    const level = document.createElement('div');
    level.className = 'tree-level';
    return level;
  },

  // Render the initial unsorted array
  renderInitialArray(arr) {
    this.clearTree();
    const level = this.createTreeLevel();
    level.appendChild(this.createSubarrayElement(arr));
    this.elements.treeContainer.appendChild(level);
  },

  // Render all levels of the merge sort tree
  renderLevels(levels) {
    this.clearTree();
    levels.forEach(level => {
      const levelEl = this.createTreeLevel();
      level.forEach(item => {
        const classMap = {
          'left': 'left-part',
          'right': 'right-part',
          'merging': 'merging',
          'merged': 'merged',
          'complete': 'complete'
        };
        const className = classMap[item.state] || '';
        levelEl.appendChild(this.createSubarrayElement(item.arr, className));
      });
      this.elements.treeContainer.appendChild(levelEl);
    });
  },

  // Update status bar
  setStatus(text, isActive = false, phase = 'IDLE') {
    this.elements.statusText.textContent = text;
    this.elements.statusDot.classList.toggle('active', isActive);
    this.elements.phaseText.textContent = phase;
  },

  // Enable/disable controls during sorting
  setControlsDuringRun(running) {
    this.elements.startBtn.disabled = running;
    this.elements.randomBtn.disabled = running;
    this.elements.sizeEl.disabled = running;
    this.elements.resetBtn.disabled = !running;
    this.elements.pauseBtn.disabled = !running;
  },

  // Update slider output displays
  updateOutputs(sizeValue, speedDisplay) {
    this.elements.sizeOut.textContent = sizeValue + ' items';
    this.elements.speedOut.textContent = speedDisplay;
  },

  // Update pause button text
  setPauseButtonText(isPaused) {
    this.elements.pauseBtn.textContent = isPaused ? '▶ Resume' : '⏸ Pause';
  },

  // Add a log entry
  addLog(message, type = 'info') {
    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', { 
      hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' 
    });
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.innerHTML = `<span class="timestamp">${timestamp}</span><span>${message}</span>`;
    this.elements.logsContainer.appendChild(entry);
    this.elements.logsContainer.scrollTop = this.elements.logsContainer.scrollHeight;
  },

  // Clear all logs
  clearLogs() {
    this.elements.logsContainer.innerHTML = '';
  },

  // Format array for display in logs
  formatArray(arr) {
    return `<span class="array-display">[${arr.join(', ')}]</span>`;
  }
};   
  
// ============================================ //
// EVENT HANDLERS - Connect UI to functionality //
// ============================================ //

function updateOutputs() {
  const size = Animation.elements.sizeEl.value;
  const speed = MergeSort.getSpeedDisplay();
  Animation.updateOutputs(size, speed);
}

Animation.elements.sizeEl.addEventListener('input', () => {
  updateOutputs();
  if (!MergeSort.isRunning) {
    MergeSort.reset(Number(Animation.elements.sizeEl.value));
  }
});

Animation.elements.speedEl.addEventListener('input', updateOutputs);

Animation.elements.randomBtn.addEventListener('click', () => {
  MergeSort.reset(Number(Animation.elements.sizeEl.value));
  Animation.addLog(`New array generated: ${Animation.formatArray(MergeSort.originalArray)}`, 'info');
});

Animation.elements.startBtn.addEventListener('click', async () => {
  if (MergeSort.isRunning) return;

  MergeSort.isRunning = true;
  MergeSort.isPaused = false;
  MergeSort.shouldStop = false;
  Animation.setControlsDuringRun(true);

  try {
    await MergeSort.run();
  } catch (e) {
    if (e.message !== 'STOPPED') {
      console.error(e);
      Animation.addLog(`Error: ${e.message}`, 'error');
    }
  }

  MergeSort.isRunning = false;
  Animation.setControlsDuringRun(false);
});

Animation.elements.pauseBtn.addEventListener('click', () => {
  if (!MergeSort.isRunning) return;
  MergeSort.isPaused = !MergeSort.isPaused;
  Animation.setPauseButtonText(MergeSort.isPaused);
  Animation.setStatus(
    MergeSort.isPaused ? 'Paused' : 'Sorting...',
    !MergeSort.isPaused,
    MergeSort.isPaused ? 'PAUSED' : Animation.elements.phaseText.textContent
  );
  Animation.addLog(MergeSort.isPaused ? '⏸ Paused' : '▶ Resumed', 'info');
});

Animation.elements.resetBtn.addEventListener('click', () => {
  MergeSort.shouldStop = true;
  MergeSort.isPaused = false;
  Animation.addLog('↺ Reset', 'info');
  setTimeout(() => MergeSort.reset(Number(Animation.elements.sizeEl.value)), 100);
});

Animation.elements.clearLogsBtn.addEventListener('click', () => {
  Animation.clearLogs();
});


// ========== //
// INITIALIZE //
// ========== //

updateOutputs();
MergeSort.reset(Number(Animation.elements.sizeEl.value));
Animation.addLog('Merge Sort Visualizer ready. Click "Start Sorting" to begin!', 'complete');