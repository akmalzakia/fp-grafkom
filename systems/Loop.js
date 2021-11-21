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

        this.lastfps_second = 0;
        this.fps = 0;
        this.second = 0;
        this.second_counter = 0;
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
        if(this.lastfps_second === 0) {
            this.lastfps_second = performance.now();
            this.fps = 0;
            return;
        }
        const del = (performance.now() - this.lastfps_second) / 1000;
        this.lastfps_second = performance.now();
        this.fps = 1/del;

        this.time += 0.01;
        const delta = this.time - this.lastTime;
        
        this.second_counter += 1;

        if(this.second_counter > this.fps) {
            this.second_counter = 0;
            this.second++;
            
        }

      
        for (const object of this.updatables){
            object.tick(delta);
        }

        // console.log(this.updatables);
        this.lastTime = this.time;
    }
}

export { Loop };