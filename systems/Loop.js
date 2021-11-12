import { Clock } from "../three/three.module.js";


class Loop {

    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.clock = new Clock();
        this.updatables = [];
    }

    start() {
        this.renderer.setAnimationLoop(() => {

            this.tick();
            this.renderer.render(this.scene, this.camera);
        })
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick() {
        const delta = this.clock.getDelta();

        for (const object of this.updatables){
            object.tick(delta);
        }
    }
}

export { Loop };