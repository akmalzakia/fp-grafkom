import * as THREE from '../three/three.module.js'
import { GameObject } from './GameObject.js'
import { Missile } from './Missile.js';

export class Plane extends GameObject{

    key_press = {
        ArrowLeft: false,
        ArrowUp: false,
        ArrowRight: false,
        ArrowDown: false,
        Space: false,
    }

    constructor(scene, loop, loadingManager = null){
        super(scene, loop, loadingManager);

        // Base
        this.url = '../assets/cartoon_plane/scene.gltf';
        this.scale.set(.003, .003, .003);
        
        // Movement
        this.rotationSpeed = 1.5;
        this.minRotation = new THREE.Vector3(0, 0, THREE.Math.degToRad(-20));
        this.maxRotation = new THREE.Vector3(0, 0, THREE.Math.degToRad(20));
        this.speed = 4;
        
        // Shooting
        this.fireRate = 0.25;
        this.lastShot = 0;
        this.allowShot = true;
        // this.missiles = [];


        this.loop.updatables.push(this);
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

        

        if(this.allowShot){
            this.shoot();
            this.allowShot = false;
        }

        if(this.loop.clock.getElapsedTime() - this.lastShot > this.fireRate){
           
            this.allowShot = true;
        }

        // helper
        if(this.helper){
            this.helper.update();
        }

        // // remove unused missile
        // if(this.missiles.length && !this.missiles[0].model){
        //     this.missiles.shift();
        // }
    }

    shoot(){
        if(this.key_press.Space){
            const missile = new Missile(this.scene, this.loop, this.loadingManager);
            missile.startPosition.set(-this.model.position.x, -this.model.position.y, - (this.model.position.z));
            missile.initializeModel();
            
            // this.missiles.push(missile);

            this.lastShot = this.loop.clock.getElapsedTime();
        }
    }

    setEventListener(){
        window.addEventListener('keydown', (e) => {
            if(e.code in this.key_press){
                if(e.code === "ArrowLeft"){
                    this.key_press.ArrowLeft = true;
                }
                if(e.code === "ArrowUp"){
                    this.key_press.ArrowUp = true;
                }
                if(e.code === "ArrowRight"){
                    this.key_press.ArrowRight = true;
                }
                if(e.code === "ArrowDown"){
                    this.key_press.ArrowDown = true;
                }
                if(e.code === "Space"){
                    this.key_press.Space = true;
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
                if(e.code === "Space"){
                    this.key_press.Space = false;
                }
            }
        });
    }
}
