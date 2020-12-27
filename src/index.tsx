// import * as p5 from 'p5'

import p5 from 'p5';
import './main.styl';
import * as dat from 'dat.gui';

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

function* insertionSort(array: number[]) {
  const array2 = array.slice();
  for (let i = 0; i < array2.length; i++) {
    const current = array2[i];
    for (let y = i - 1; current < array2[y] && y > -1; y--) {
      const temp = array2[y];
      array2[y] = current;
      array2[y + 1] = temp;
      yield array2;
    }
  }
  yield array2;
}
function* bubbleSort(array: number[]) {
  const array2 = array.slice();

  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < array2.length - 1; i++) {
      if (array2[i] > array2[i + 1]) {
        const temp = array2[i];
        array2[i] = array2[i + 1];
        array2[i + 1] = temp;
        yield array2;
        swapped = true;
      }
    }
  }

  yield array2;
}

const sortingAlgorithm = {
  insertionSort: insertionSort,
  bubbleSort: bubbleSort,
};

new p5((p5: p5) => {
  (window as any).p5 = p5;

  function randomArray() {
    const array: number[] = [];
    for (let i = 0; i < 30; i++) {
      array[i] = Math.floor(p5.random(0, canvasContainer.clientHeight / 2));
    }
    return array;
  }

  p5.setup = () => {
    const canvas = p5.createCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
    canvas.parent(canvasContainer);

    const gui = new dat.GUI({ name: 'My GUI' });
    const options = { framerate: 10 };
    const framerate = gui.add(options, 'framerate', 0, 120);
    framerate.onChange(() => {
      p5.frameRate(options.framerate);
    });
  };

  let array = randomArray();
  let arrayGenerator = bubbleSort(array);

  console.log('array:', array);

  const width = 10;
  const margin = 1;

  for (const [algorithmName, fn] of Object.entries(sortingAlgorithm)) {
    const buttonContainer = document.createElement('div');
    const button = document.createElement('button');
    buttonContainer.appendChild(button);
    button.innerText = algorithmName;
    button.addEventListener('click', () => {
      array = randomArray();

      arrayGenerator = fn(array);
    });
    appInputs.appendChild(buttonContainer);
  }

  p5.draw = () => {
    p5.background(styles.c3);

    p5.fill(styles.c4);
    p5.noStroke();

    array = arrayGenerator.next().value || array;
    // array = insertionSort(array);

    for (let index = 0; index < array.length; index++) {
      const item = array[index];

      p5.rect(100 + margin * index + width * index, 100, width, item);
    }
  };

  window.addEventListener('resize', () => {
    p5.resizeCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
  });
});
