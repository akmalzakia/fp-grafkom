import { PerspectiveCamera } from "../three/three.module.js";

function createCamera(sizes) {
    const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 10;

    return camera;
}

export { createCamera };