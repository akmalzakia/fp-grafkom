import { Vector3 } from "../three/three.module.js";
import * as TWEEN from "../tween/tween.esm.js";

// Loop class for the world loop

class Loop {

    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.isRunning = false;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];

        this.lastfps_second = 0;
        this.fps = 0;
        this.second = 0;
    }

    // Start the loop

    start() {
        this.renderer.setAnimationLoop(() => {

            this.tick();
            this.renderer.render(this.scene, this.camera);
        })

        this.isRunning = true;
    }

    // Stop the loop

    stop() {
        const plane = this.updatables.find((p) => p.name === 'Plane');
        if(plane){
            plane.lastShot = plane.fireRate + (-plane.lastShot)
        }
        
        this.renderer.setAnimationLoop(null);
        this.isRunning = false;
        this.lastfps_second = 0;
    }

    // Handle animated objects

    tick() {
        if(this.lastfps_second === 0) {
            this.lastfps_second = performance.now();
            this.fps = 0;
            return;
        }
        const del = (performance.now() - this.lastfps_second) / 1000;
        this.lastfps_second = performance.now();
        this.fps = 1/del;
        this.second += del;

        TWEEN.update();

      
        for (const object of this.updatables){
            object.tick(del);

            if(object.model) {
                let constraintOffset = 3;
                let pos = new Vector3();
                object.model.getWorldPosition(pos);
                if(Math.abs(pos.x) > constraintOffset + this.scene.grid.size / 2 || Math.abs(pos.z) > constraintOffset + this.scene.grid.size / 2 ) {
                    console.log(object);
                    object.dispose();
                }
            }
        }

    }
}

export { Loop };