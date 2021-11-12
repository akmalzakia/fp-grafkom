import { GameObject } from "./GameObject.js";

export class BasicEnemy extends GameObject {
    constructor(scene, position, loadingManager = null){
        super(scene, loadingManager);
        this.url = 'assets/invader_5/scene.gltf';
        this.scale.set(0.8, 0.8, 0.8);
        this.position.set(position.x, 0, position.y);
    }
}