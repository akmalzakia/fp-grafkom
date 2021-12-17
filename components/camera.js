import { PerspectiveCamera, Math} from "../three/three.module.js";

function createCamera(sizes) {
    const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.x = 0;
    camera.position.y = 4;
    camera.position.z = -7;


    camera.rotateY(Math.degToRad(180));
    camera.rotateX(Math.degToRad(-30));

    
    

    return camera;
}

export { createCamera };