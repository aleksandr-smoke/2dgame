import { Canvas } from './classes/Canvas.js';
import { Game } from './classes/Game.js';

const canvasElement = document.querySelector('#canvas');
const canvas = new Canvas(canvasElement);
new Game(canvas);
