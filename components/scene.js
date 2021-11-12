import { Scene, CubeTextureLoader, Color } from "../three/three.module.js";

function createScene() {
    const scene = new Scene();
    return scene;
}

async function setPanorama(scene, url, manager){
    const panorama = await loadPanorama(url, manager);
    scene.background = panorama;
}

function loadPanorama(url, manager){
    return new Promise((resolve, reject) => {
        const loader = new CubeTextureLoader(manager);
        loader.load(
            [
                `${url}px.png`,
                `${url}nx.png`,
                `${url}py.png`,
                `${url}ny.png`,
                `${url}pz.png`,
                `${url}nz.png`,
            ],
            (panorama) => resolve(panorama),
            null,
            (error) => reject(error)
        );
    })
}

export { createScene, setPanorama };