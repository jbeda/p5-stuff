import './lib/p5.global';
//import 'spectral.js';
//import './lib/p5.brush.wrapper.js';

// Import a variable from a JavaScript file from the project folder
import { mySketch } from './sketch.js';

// Import CSS styles in JavaScript
import './index.css';

// Initialize p5.js
// p5 requires two arguments: new p5(sketch function, target DOM element)
new p5(mySketch, document.getElementById('sketch'));

// Use `RELOAD` prop passed via esbuild to live reload
RELOAD && new EventSource('/esbuild').addEventListener('change', () => location.reload());
