import * as THREE from './three/three.module.js'
import { OrbitControls } from './three/controls/OrbitControls.js'
import { EXRLoader } from './three/loaders/EXRLoader.js'
import * as dat from './three/dat.gui.module.js'
import { GLTFLoader } from './three/loaders/GLTFLoader.js'
import { FlakesTexture } from './three/textures/FlakesTexture.js'
import { RGBELoader } from './three/loaders/RGBELoader.js'

// Canvas
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

// Objects
const objects = []
const baseSize = 0.9
const boxSize = baseSize * gridSquare
const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);

function indexToCoordinates(index){
    const x = index % gridDivisions * gridSquare;
    const z = Math.floor(index / gridDivisions) * gridSquare;
    return new THREE.Vector2(x, z);
}

function loadGLTF(url, scale, position){
    const loader = new GLTFLoader();
    let returnScene = new THREE.Object3D();
    loader.load(
        url,
        (gltf) => {
            gltf.scene.scale.set(scale.x, scale.y, scale.z);
            gltf.scene.position.set(position.x, 0, position.y);
            returnScene.copy(gltf.scene, true);
            // scene.add(returnScene);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '%loaded');
        },
        (error) => {
            console.log('An error happened');
        }
    )

    return returnScene;
};

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


// Lights

const skyColor = 0xB1E1FF;
const groundColor = 0xB97A20;
const intensity = 1;
const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);

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
camera.position.z = 7
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

const planeScale = new THREE.Vector3(0.001, 0.001, 0.001);
let plane = loadGLTF('assets/cartoon_plane/scene.gltf', planeScale, indexToCoordinates(0));
gridSpace.add(plane);


const enemyScale = new THREE.Vector3(0.8, 0.8, 0.8);
const enemy = loadGLTF('assets/invader_5/scene.gltf', enemyScale, indexToCoordinates(11));
gridSpace.add(enemy);

 

const clock = new THREE.Clock()
const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update Orbital Controls
    controls.update()
  
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}

tick();