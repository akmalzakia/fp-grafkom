import { removeItemOnce, timeout } from '../systems/functional.js';
import * as THREE from '../three/three.module.js'
import { GameObject } from './GameObject.js'
import { Missile } from './Missile.js';
import { PlayerMissile } from './PlayerMissile.js';

export class Plane extends GameObject{

    key_press = {
        ArrowLeft: false,
        ArrowUp: false,
        ArrowRight: false,
        ArrowDown: false,
        Space: false,
    }

    constructor(loop, loadingManager = null){
        super(loop, loadingManager);
        // Base
        this.url = '../assets/cartoon_plane/scene.gltf';
        this.scale.set(.003, .003, .003);
        this.name = 'Plane';
        
        // Movement
        this.rotationSpeed = 3;
        this.minRotation = new THREE.Vector3(0, 0, THREE.Math.degToRad(-20));
        this.maxRotation = new THREE.Vector3(0, 0, THREE.Math.degToRad(20));
        this.speed = 6;
        
        // Shooting
        this.fireRate = 0.25;
        this.lastShot = 1;
        this.allowShot = true;
        this.fireTime = 0;
        // this.missiles = [];

        this.hp = 100;
        this.damage = 50;
        this.invisibilityTime = 1500; //ms
        this.invisibilityTick = 150 //ms

        this.loop.updatables.push(this);
        this.setEventListener();
    }

    // Movement

    move(delta){

        // Constraint Movement
        let allowUp = true, allowLeft = true, allowRight = true, allowDown = true;
        if(this.scene.grid) {
            // console.log(`${this.model.position.z} : ${this.scene.grid.py}`);
            if(this.model.position.x > this.scene.grid.px) {
                allowLeft = false;
            }

            if(this.model.position.x < this.scene.grid.nx) {
                allowRight = false;
            }

            if(this.model.position.z > this.scene.grid.py) {
                allowUp = false;
            }

            if(this.model.position.z < this.scene.grid.nx) {
                allowDown = false;
            }
        }

        // Plane Rotation
        if(!this.key_press.ArrowUp && !this.key_press.ArrowDown && !this.key_press.ArrowLeft && !this.key_press.ArrowRight && !this.rotation.equals(new THREE.Vector3(0, 0, 0))){
            if(this.rotation.z > 0){
                this.rotation.z -= this.rotationSpeed * delta;
            }
            if(this.rotation.z < 0){
                this.rotation.z += this.rotationSpeed * delta;
            }
        }

        //Plane Movement
        if(this.key_press.ArrowUp){
            this.model.position.z += this.speed * delta * allowUp;
        }
        if(this.key_press.ArrowLeft){
            this.model.position.x += this.speed * delta * allowLeft;
            this.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z - this.rotationSpeed * delta).clamp(this.minRotation, this.maxRotation);
        }
        if(this.key_press.ArrowRight){
            this.model.position.x -= this.speed * delta * allowRight;
            this.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z + this.rotationSpeed * delta).clamp(this.minRotation, this.maxRotation);
        }
        if(this.key_press.ArrowDown){
            this.model.position.z -= this.speed * delta * allowDown;
        }
        
        this.model.rotation.setFromVector3(this.rotation);
    }

    

    // Shoot function

    shoot(){
        if(this.key_press.Space){
            const missile = new PlayerMissile(this.loop, this.loadingManager);
            missile.startPosition.set(-this.model.position.x, -this.model.position.y, - (this.model.position.z));
            missile.initializeModel(this.scene);
            this.lastShot = this.loop.second
            this.allowShot = false;
        }
    }

    // Set the event listener

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

    // die
    takeDamage(damage) {
        this.hp -= damage;

        if(this.hp <= 0) {
            this.dispose();

        }
        else {
            this.invisibility();
        }
    }

    async invisibility() {
        this.scene.collidableObject = removeItemOnce(this.scene.collidableObject, this);
        // console.log(this.scene.collidableObject);
        const flick = this.invisibilityTime / (this.invisibilityTick * 2)
        // console.log(flick);
        for( let i = 0; i < flick; i++) {
            // console.log(i);
            this.model.visible = false;
            await timeout(this.invisibilityTick);
            this.model.visible = true; 
            await timeout(this.invisibilityTick);
        }
        this.scene.collidableObject.push(this);
        // console.log(this.scene.collidableObject);
    }

    // Animation

    tick(delta) {
        super.tick();
        if(this.model) {
            this.move(delta);
            // this.collideEnemy();

            this.fireTime = this.loop.second - this.lastShot;
            if( this.fireTime > this.fireRate){
                this.allowShot = true;      
            }

            if(this.allowShot){
                this.shoot();
                
            }
        }
    }

    dispose() {
        super.dispose();
        console.log("Game Over");
    }
}
