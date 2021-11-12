import * as THREE from '../three/three.module.js'
import { GameObject } from './GameObject.js'

export class Plane extends GameObject{

    key_press = {
        ArrowLeft: false,
        ArrowUp: false,
        ArrowRight: false,
        ArrowDown: false,
    }

    constructor(scene, loadingManager = null){
        super(scene, loadingManager);
        this.url = '../assets/cartoon_plane/scene.gltf';
        this.scale.set(.001, .001, .001);
        this.minRotation = new THREE.Vector3(0, 0, THREE.Math.degToRad(-20));
        this.maxRotation = new THREE.Vector3(0, 0, THREE.Math.degToRad(20));
        this.speed = 2;
        this.rotationSpeed = 1.5;
        this.setEventListener();
    }

    move(delta){

        if(!this.key_press.ArrowUp && !this.key_press.ArrowDown && !this.key_press.ArrowLeft && !this.key_press.ArrowRight && !this.rotation.equals(new THREE.Vector3(0, 0, 0))){
            if(this.rotation.z > 0){
                this.rotation.z -= this.rotationSpeed * delta;
            }
            else if(this.rotation.z < 0){
                this.rotation.z += this.rotationSpeed * delta;
            }
        }

        if(this.key_press.ArrowUp){
            this.model.position.z += this.speed * delta;
        }
        if(this.key_press.ArrowLeft){
            this.model.position.x += this.speed * delta;
            this.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z - this.rotationSpeed * delta).clamp(this.minRotation, this.maxRotation);
        }
        if(this.key_press.ArrowRight){
            this.model.position.x -= this.speed * delta;
            this.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z + this.rotationSpeed * delta).clamp(this.minRotation, this.maxRotation);
        }
        if(this.key_press.ArrowDown){
            this.model.position.z -= this.speed * delta;
        }
        
        this.model.rotation.setFromVector3(this.rotation);
    }

    tick(delta) {
        this.move(delta);
    }

    setEventListener(){
        window.addEventListener('keydown', (e) => {
            if(e.code in this.key_press){
                if(e.code === "ArrowLeft"){
                    this.key_press.ArrowLeft = true;
                }
                else if(e.code === "ArrowUp"){
                    this.key_press.ArrowUp = true;
                }
                else if(e.code === "ArrowRight"){
                    this.key_press.ArrowRight = true;
                }
                else if(e.code === "ArrowDown"){
                    this.key_press.ArrowDown = true;
                }
            }
        });
        window.addEventListener('keyup', (e) => {
            if(e.code in this.key_press){
                if(e.code === "ArrowLeft"){
                    this.key_press.ArrowLeft = false;
                }
                if(e.code === "ArrowUp"){
                    this.key_press.ArrowUp = false;
                }
                if(e.code === "ArrowRight"){
                    this.key_press.ArrowRight = false;
                }
                if(e.code === "ArrowDown"){
                    this.key_press.ArrowDown = false;
                }
            }
        });
    }
}
