import { HemisphereLight } from "../three/three.module.js";

function createLights() {
    const skyColor = 0xB1E1FF;
    const groundColor = 0xB97A20;
    const intensity = 2;
    const light = new HemisphereLight(skyColor, groundColor, intensity);

    return light;
}

export { createLights };