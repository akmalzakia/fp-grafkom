import { WebGLRenderer } from "../three/three.module.js";

function createRenderer(canvas, sizes) {
    const renderer = new WebGLRenderer({
        canvas: canvas,
        antialias: true,
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.physicallyCorrectLights = true;

    return renderer;
}

export { createRenderer };