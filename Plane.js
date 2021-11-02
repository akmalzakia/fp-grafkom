import * as THREE from './three/three.module.js'
import { GameObject } from './GameObject.js'

export class Plane extends GameObject{

    constructor(scene, position, loadingManager = null){
        super(scene, loadingManager);
        this.url = 'assets/cartoon_plane/scene.gltf';
        this.scale.set(.001, .001, .001);
        this.position.set(position.x, 0, position.y);
        this.minRotation = new THREE.Vector3(0, 0, THREE.Math.degToRad(-20));
        this.maxRotation = new THREE.Vector3(0, 0, THREE.Math.degToRad(20));
        this.speed = 2;
        this.rotationSpeed = 1.5;
    }

    move(key_press, delta){

        if(!key_press.ArrowUp && !key_press.ArrowDown && !key_press.ArrowLeft && !key_press.ArrowRight && !this.rotation.equals(new THREE.Vector3(0, 0, 0))){
            if(this.rotation.z > 0){
                this.rotation.z -= this.rotationSpeed * delta;
            }
            else if(this.rotation.z < 0){
                this.rotation.z += this.rotationSpeed * delta;
            }
        }

        if(key_press.ArrowUp){
            this.model.position.z += this.speed * delta;
        }
        if(key_press.ArrowLeft){
            this.model.position.x += this.speed * delta;
            this.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z - this.rotationSpeed * delta).clamp(this.minRotation, this.maxRotation);
        }
        if(key_press.ArrowRight){
            this.model.position.x -= this.speed * delta;
            this.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z + this.rotationSpeed * delta).clamp(this.minRotation, this.maxRotation);
        }
        if(key_press.ArrowDown){
            this.model.position.z -= this.speed * delta;
        }
        
        this.model.rotation.setFromVector3(this.rotation);
    }
}
