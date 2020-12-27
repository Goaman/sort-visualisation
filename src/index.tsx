// import * as p5 from 'p5'

import p5 from 'p5';
import './main.styl';

const styles = {
  'c1': '#f4f1de',
  'c2': '#e07a5f',
  'c3': '#3d405b',
  'c4': '#81b29a',
  'c5': '#f2cc8f',
};

const appContainer = document.createElement('app-container');
document.body.appendChild(appContainer);

const appInputs = document.createElement('app-inputs');
appContainer.appendChild(appInputs);

const canvasContainer = document.createElement('canvas-container');
appContainer.appendChild(canvasContainer);

new p5((p5: p5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
    canvas.parent(canvasContainer);
  };
  let i = 0;
  p5.draw = () => {
    i++;
    p5.background(styles.c3);

    p5.fill(styles.c4);
    p5.noStroke();
    p5.square(i, i, 10, 10);
  };

  window.addEventListener('resize', () => {
    p5.resizeCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
  });
});
