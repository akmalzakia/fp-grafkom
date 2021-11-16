import { Clock } from "../three/three.module.js";

// Loop class for the world loop

class Loop {

    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.isRunning = false;
        this.scene = scene;
        this.renderer = renderer;
        this.clock = new Clock();
        this.lastTime = 0;
        this.time = 0;
        this.updatables = [];
    }

    // Start the loop

    start() {
        this.lastTime = 0;
        this.time = 0;
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
        this.clock.running = false;

    }

    // Handle animated objects

    tick() {
        this.time += 0.01;
        const delta = this.time - this.lastTime;
        // console.log(this.time);

        for (const object of this.updatables){
            object.tick(delta);
        }

        // console.log(this.updatables);
        this.lastTime = this.time;
    }
}

export { Loop };