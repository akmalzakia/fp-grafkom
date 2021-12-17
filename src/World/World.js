import { createCamera } from "../../components/camera.js";
import { createScene, setPanorama } from "../../components/scene.js";
import { createRenderer } from "../../systems/renderer.js";
import { createLoadingManager } from "../../systems/loadingManager.js";
import { Resizer } from '../../systems/Resizer.js';
import { Audio, AudioLoader, AudioListener  } from "../../three/three.module.js";

import { Loop } from "../../systems/Loop.js";
import { Grid } from "../../systems/Grid.js";


class World {
    // Setup your game here
    static active = null;

    constructor(canvas, sizes){
        this.isRunning = false;
        this.sizes = sizes;
        this.loadManager = createLoadingManager();
        this.camera = createCamera(sizes);
        this.scene = createScene();
        this.scene.name = "Main Scene"
        setPanorama(this.scene, '../assets/spacemap/', this.loadManager);
        this.renderer = createRenderer(canvas, sizes);
        this.loop = new Loop(this.camera, this.scene, this.renderer);
        this.grid = new Grid(this.scene);
        
        const resizer = new Resizer(this.sizes, this.camera, this.renderer);
        this.grid.enable();

        // Audio 
        // create an AudioListener and add it to the camera
        const listener = new AudioListener();
        this.camera.add( listener );

        // create a global audio source
        const sound = new Audio( listener );

        // load a sound and set it as the Audio object's buffer
        const audioLoader = new AudioLoader();
        audioLoader.load( '/assets/sounds/beat.ogg', function(buffer) {
            sound.setBuffer( buffer );
            sound.setLoop( true );
            sound.setVolume( 0.5 ); 
            sound.play();
        });

        this.sound = sound;
        
        //Custom Scene Variables
        this.scene.collidableObject = [];
        this.scene.grid = this.grid;
    }

    worldFailed() {
        this.stop();
        const blocker = document.getElementById( 'blocker' );
        const instructions = document.getElementById( 'instructions' );
        const status = document.querySelector('#status');
        blocker.style.display = 'block';
        status.innerHTML = 'You Lose';
        instructions.style.display = 'flex';
    }

    worldSuccess() {
        this.stop();
        const blocker = document.getElementById( 'blocker' );
        const instructions = document.getElementById( 'instructions' );
        const status = document.querySelector('#status');
        blocker.style.display = 'block';
        status.innerHTML = 'You Win';
        instructions.style.display = 'flex';
    }

    start(){
        this.loop.start();
        this.isRunning = true;
    }

    stop(){
        this.loop.stop();
        this.sound.stop();
        this.isRunning = false;
    }
}

export { World };