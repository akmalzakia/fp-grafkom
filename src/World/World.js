import { createCamera } from "../../components/camera.js";
import { createCube } from "../../components/cube.js";
import { createLights } from "../../components/lights.js";
import { createScene, setPanorama } from "../../components/scene.js";
import { createRenderer } from "../../systems/renderer.js";
import { createLoadingManager } from "../../systems/loadingManager.js";

import { Loop } from "../../systems/Loop.js";
import { Resizer } from "../../systems/Resizer.js";
import { createControls } from "../../systems/controls.js";
import { Plane } from "../../components/Plane.js";

class World {
    static playArea = {
        px: 10,
        nx: -10,
        pz: 10,
        nz: -10,
    }

    constructor(canvas, sizes){
        this.sizes = sizes;
        this.loadManager = createLoadingManager();
        this.camera = createCamera(sizes);
        this.scene = createScene();
        // setPanorama(this.scene, '../assets/spacemap/', this.loadManager);
        this.renderer = createRenderer(canvas, sizes);
        this.loop = new Loop(this.camera, this.scene, this.renderer);
        

        const controls = createControls(this.camera, canvas);
        const light = createLights();
        // const cube = createCube();

        this.loop.updatables.push(controls);

        this.scene.add(light)
        // this.scene.add(cube);

        const resizer = new Resizer(this.sizes, this.camera, this.renderer);
        const plane = new Plane(this.scene, this.loop, this.loadManager);
        plane.initializeModel();
        console.log(plane.model);
        

        
    }

    render(){
        this.renderer.render(this.scene, this.camera);
        console.log(this.renderer)
    }

    start(){
        this.loop.start();
    }

    stop(){
        this.loop.stop();
    }
}

export { World };