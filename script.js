import * as THREE from './three/three.module.js'
import { OrbitControls } from './three/controls/OrbitControls.js'
import * as dat from './three/dat.gui.module.js'
import { Plane } from './components/Plane.js'
import { BasicEnemy } from './components/BasicEnemy.js'

function start(){

    const blocker = document.getElementById( 'blocker' );
    const instructions = document.getElementById( 'instructions' );

    instructions.addEventListener( 'click', function () {

        instructions.style.display = 'none';
        blocker.style.display = 'none';

    } );

    
    const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Grid
const gridSize = 11; // samain sama division pls
const gridDivisions = 11;
const gridSquare = gridSize / gridDivisions;
const grid = new THREE.GridHelper(gridSize, gridDivisions);
scene.add(grid);

// Grid Space
const gridSpace = new THREE.Object3D();
gridSpace.position.set(-(gridSize/2) + (gridSquare/2), 0,  - (gridSize/2) + (gridSquare/2));
scene.add(gridSpace);

function indexToCoordinates(index){
    const x = index % gridDivisions * gridSquare;
    const z = Math.floor(index / gridDivisions) * gridSquare;
    return new THREE.Vector2(x, z);
}

//kurang, masi salah kalo griddivision != gridsize
function coordinatesToIndex(coord){
    return Math.floor(coord.y * gridDivisions + coord.x);
}

// Collision
function isCollide(box1, box2){
    if(box1 && box2){
        box1.geometry.computeBoundingBox();
        box2.geometry.computeBoundingBox();
        box1.updateMatrixWorld();
        box2.updateMatrixWorld();
        var bounding1 = box1.geometry.boundingBox.clone();
        bounding1.applyMatrix4(box1.matrixWorld);
        var bounding2 = box2.geometry.boundingBox.clone();
        bounding2.applyMatrix4(box2.matrixWorld);

        return bounding1.intersectsBox(bounding2);
    }

    return false;
}


// 

// Lights

const skyColor = 0xB1E1FF;
const groundColor = 0xB97A20;
const intensity = 1;
const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);


/**
 * Panorama 
 */
 const panorama = new THREE.CubeTextureLoader();
 const space = panorama.load([
   'assets/spacemap/px.png',
   'assets/spacemap/nx.png',
   'assets/spacemap/py.png',
   'assets/spacemap/ny.png',
   'assets/spacemap/pz.png',
   'assets/spacemap/nz.png',
 
 ]);
 scene.background = space;

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 7
camera.position.z = -7
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onLoad = function ( ) {

	console.log( 'Loading complete!');

};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onError = function ( url ) {

	console.log( 'There was an error loading ' + url );

};

const plane = new Plane(gridSpace, indexToCoordinates(5), manager);
plane.initializeModel();

for( let i = gridSize * gridSize - 1; i > gridSize * (gridSize - 2) - 1; i--){
    const enemy = new BasicEnemy(gridSpace, indexToCoordinates(i), manager);
    enemy.initializeModel();
}





// Game Controls

const key_press = {
    ArrowLeft: false,
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
}


window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);
/**
 * 
 * @param {KeyboardEvent} e 
 */

function onKeyDown(e){
    if(e.code in key_press){
        if(e.code === "ArrowLeft"){
            key_press.ArrowLeft = true;
        }
        else if(e.code === "ArrowUp"){
            key_press.ArrowUp = true;
        }
        else if(e.code === "ArrowRight"){
            key_press.ArrowRight = true;
        }
        else if(e.code === "ArrowDown"){
            key_press.ArrowDown = true;
        }
    }
}

/**
 * 
 * @param {KeyboardEvent} e 
 */

function onKeyUp(e){
    if(e.code in key_press){
        if(e.code === "ArrowLeft"){
            key_press.ArrowLeft = false;
        }
        if(e.code === "ArrowUp"){
            key_press.ArrowUp = false;
        }
        if(e.code === "ArrowRight"){
            key_press.ArrowRight = false;
        }
        if(e.code === "ArrowDown"){
            key_press.ArrowDown = false;
        }
    }
}


const clock = new THREE.Clock()
let delta = 0;
let lastTime = clock.getElapsedTime();
const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()
    delta = elapsedTime - lastTime;

    // Update Orbital Controls
    controls.update()
  
    // Render
    renderer.render(scene, camera)

    plane.move(key_press, delta);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    lastTime = elapsedTime;

}

tick();

}

// let button = document.getElementById('newGame');
// button.addEventListener('click', () => {
//     start();
// });

start();
// init();
// Canvas
