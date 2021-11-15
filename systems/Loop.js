import { Clock } from "../three/three.module.js";

// Loop class for the world loop

class Loop {

    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.clock = new Clock();
        this.updatables = [];
    }

    // Start the loop

    start() {
        this.renderer.setAnimationLoop(() => {

            this.tick();
            this.renderer.render(this.scene, this.camera);
        })
    }

    // Stop the loop

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    // Handle animated objects

    tick() {
        const delta = this.clock.getDelta();
        for (const object of this.updatables){
            object.tick(delta);
        }
    }
}

export { Loop };