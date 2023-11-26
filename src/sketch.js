import './lib/p5.global';
import 'p5/lib/addons/p5.sound';
import './lib/p5.brush';

// Exporting a function called 'mySketch'
export const mySketch = (p) => {
  let maxSize = 500;
  let wspeed = 1.66;
  let hspeed = 1.33;
  let w = 0;
  let h = maxSize;
  let r = 0;
  let hue = 0;

  let monoSynth;

  // Calling p5.js functions, using the variable 'p'
  p.setup = () => {
    // Creating a canvas using the entire screen of the webpage
    let cnv = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    cnv.mousePressed(playSynth);
    p.strokeWeight(5);
    p.background(255);

    p.colorMode(p.HSB, 255);

    p.getAudioContext().suspend();
    monoSynth = new p5.MonoSynth();
  };

  p.draw = () => {
    // Clear the frame
    p.background(255, 50);

    // Draw an ellipse
    p.translate(p.width / 2, p.height / 2);
    p.rotate(r);
    p.fill(0, 1);
    p.stroke(hue, 255, 255);
    p.ellipse(0, 0, w, h);

    // Updating rotation and increment values
    r = r + 0.015;
    hue = (hue + 1) % 256;
    w = w + wspeed;
    h = h + hspeed;
    if (w < 0 || w > maxSize) wspeed *= -1;
    if (h < 0 || h > maxSize) hspeed *= -1;
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };

  function playSynth() {
    p.userStartAudio();

    let note = p.random(['Fb4', 'G4']);
    // note velocity (volume, from 0 to 1)
    let velocity = p.random();
    // time from now (in seconds)
    let time = 0;
    // note duration (in seconds)
    let dur = 1 / 6;

    monoSynth.play(note, velocity, time, dur);
  }
};
