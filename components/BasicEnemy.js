import { GameObject } from "./GameObject.js";

export class BasicEnemy extends GameObject {
    constructor(scene, loop, loadingManager = null){
        super(scene, loop, loadingManager);
        this.url = '../assets/invader_5/scene.gltf';
        this.scale.set(1.5, 1.5, 1.5);
        this.name = "Enemy"
    }
}