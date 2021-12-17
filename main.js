import { easyWorld } from "./src/World/easyWorld.js";
import { hardWorld } from "./src/World/hardWorld.js";
import { World } from "./src/World/World.js";

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector('canvas.webgl');

const blocker = document.getElementById( 'blocker' );
const instructions = document.getElementById( 'instructions' );

function start(world) {
    world.start();
    instructions.style.display = 'none';
    blocker.style.display = 'none';
    gameover.style.display = 'none';
    World.active = world;
}

function doEasy() {
    let world = new easyWorld(canvas, sizes);
    start(world);
    
}

function doHard() {
    let world = new hardWorld(canvas, sizes);
    start(world);
}

const easy = document.querySelector('#easy');
const hard = document.querySelector('#hard');

easy.addEventListener('click', doEasy);
hard.addEventListener('click', doHard);