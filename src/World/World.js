import { createCamera } from "../../components/camera.js";
import { createScene, setPanorama } from "../../components/scene.js";
import { createRenderer } from "../../systems/renderer.js";
import { createLoadingManager } from "../../systems/loadingManager.js";

import { Loop } from "../../systems/Loop.js";
import { Grid } from "../../systems/Grid.js";


class World {
    // Setup your game here

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
        
        this.grid.enable();
        
        //Custom Scene Variables
        this.scene.collidableObject = [];
        this.scene.grid = this.grid;
        
    }


    start(){
        this.loop.start();
        this.isRunning = true;
    }

    stop(){
        this.loop.stop();
        this.isRunning = false;
    }
}

export { World };