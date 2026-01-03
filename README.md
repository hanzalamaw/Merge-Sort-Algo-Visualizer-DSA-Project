<div align="center">

# 🔀 Merge Sort Visualizer

**Watch the divide & conquer algorithm come to life**

[![Live Demo](https://img.shields.io/badge/Live-Demo-4f46e5?style=for-the-badge&logo=github)](https://github.com)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<br />
*An interactive, step-by-step visualization of the Merge Sort algorithm*

---

</div>

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **Real-time Visualization** | Watch arrays divide and merge with smooth animations |
| 🎮 **Interactive Controls** | Adjust array size (4-12 elements) and animation speed |
| 📊 **Live Activity Log** | Step-by-step breakdown of every comparison and merge |
| ⏯️ **Playback Controls** | Start, pause, resume, and reset at any time |
| 📱 **Fully Responsive** | Works beautifully on desktop, tablet, and mobile |
| 🎨 **Modern UI** | Clean, elegant design with smooth transitions |

---

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/hanzalamaw/merge-sort-visualizer.git
   cd merge-sort-visualizer
   ```

2. **Open in browser**
   ```bash
   # Simply open the HTML file
   open mergesortalgo3.html
   
   # Or use a local server
   npx serve .
   ```

3. **Start visualizing!**
   - Click **🎲 Randomize** to generate a new array
   - Adjust the **Array Size** and **Animation Speed** sliders
   - Hit **▶ Start Sorting** to begin

---

## 🧠 How Merge Sort Works

Merge Sort is a **divide and conquer** algorithm with **O(n log n)** time complexity.

```
                    [38, 27, 43, 3, 9, 82, 10]
                              ↓ DIVIDE
                   [38, 27, 43]    [3, 9, 82, 10]
                        ↓               ↓
                 [38]  [27, 43]    [3, 9]  [82, 10]
                        ↓               ↓
               [38]  [27]  [43]  [3]  [9]  [82]  [10]
                              ↓ MERGE
                 [38]  [27, 43]    [3, 9]  [10, 82]
                        ↓               ↓
                   [27, 38, 43]    [3, 9, 10, 82]
                              ↓
                    [3, 9, 10, 27, 38, 43, 82]
```

### Algorithm Phases

| Phase | Description | Color |
|-------|-------------|-------|
| 🟠 **Divide** | Split array into halves until single elements | Orange |
| 🔵 **Merge** | Combine sorted subarrays back together | Blue |
| 🟣 **Compare** | Compare elements during merge | Purple |
| 🟢 **Complete** | Final sorted array | Green |

---

## 📁 Project Structure

```
mergesort/
├── 📄 mergesortalgo3.html          # Main HTML structure
├── 🎨 mergesortalgo3.css           # Styling and animations
├── ⚙️ megesortalgo3.js             # Core algorithm logic
├── 🎬 mergesortalgo3-animations.js # UI and animation handlers
└── 📖 README.md                    # Documentation
```

---

## 🎨 UI Preview

### Control Panel
- **Array Size Slider**: Choose between 4-12 elements
- **Speed Slider**: Control animation from 0.1x to 10x speed
- **Action Buttons**: Randomize, Start, Pause/Resume, Reset

### Visualization Stage
- Tree-like display showing array divisions
- Color-coded subarrays indicating current phase
- Smooth animations for each operation

### Activity Log
- Timestamped entries for every operation
- Color-coded by operation type
- Auto-scrolling to latest entry

---

## 🛠️ Technical Details

### Technologies Used
- **HTML5** — Semantic structure
- **CSS3** — Custom properties, flexbox, grid, animations
- **Vanilla JavaScript** — ES6+, async/await, Promises
- **Google Fonts** — DM Sans & IBM Plex Mono

### Key Implementation Highlights

```javascript
// Exponential speed scaling for natural feel
getDelay() {
  const sliderVal = Number(speedSlider.value);
  const minDelay = 50, maxDelay = 5000;
  const t = (sliderVal - 1) / 99;
  return maxDelay * Math.pow(minDelay / maxDelay, t);
}

// Async-aware pause handling
async waitIfPaused() {
  while (this.isPaused && !this.shouldStop) {
    await this.sleep(50);
  }
  if (this.shouldStop) throw new Error('STOPPED');
}
```

---

## 📊 Algorithm Complexity

| Metric | Complexity |
|--------|------------|
| ⏱️ Time (Best) | O(n log n) |
| ⏱️ Time (Average) | O(n log n) |
| ⏱️ Time (Worst) | O(n log n) |
| 💾 Space | O(n) |
| 🔄 Stable | Yes |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. 🍴 Fork the repository
2. 🔧 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔃 Open a Pull Request

---

<div align="center">

**Made with ❤️ for algorithm enthusiasts**

⭐ Star this repo if you found it helpful!

</div>

