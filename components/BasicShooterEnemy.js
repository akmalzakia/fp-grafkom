import { Math as THREEMath, Vector3 } from "../three/three.module.js";
import { Enemy } from "./Enemy.js";
import { EnemyMissile } from "./EnemyMissile.js";
import * as TWEEN from '../tween/tween.esm.js';
import { TweenableEnemy } from "./TweenableEnemy.js";
import { Homing } from "./move_strategy/Homing.js";

export class BasicShooterEnemy extends TweenableEnemy {
    constructor(loop, loadingManager = null) {
        super(loop, loadingManager);
        this.url = '../assets/invader_1/scene.gltf';
        this.scale.set(.1, .1, .1);
        this.name = 'Basic Shooter Enemy';
        this.speed = 6;
        this.strategies = [];
        
        this.fireRate = 0.7;
        this.lastShot = 1;  
        this.allowShot = true;
        this.fireTime = 0;
    }

    setTarget(player) {
        this.target = player;
    }

    lookTarget() {
        if(this.target.model) {
            const dx = (this.target.model.position.x - this.model.position.x);
            const dy = (this.target.model.position.z - this.model.position.z);
            const angle = Math.atan2(dx, dy);
            this.model.rotation.set(this.model.rotation.x, angle , this.model.rotation.z)
        }
    }

    move(delta) {
        for(const strategy of this.strategies) {
            strategy.move(delta);
        }
        this.lookTarget();
    }

    shoot() {
        const missile = new EnemyMissile(this.loop, this.loadingManager);
        const homing = new Homing(missile)
        missile.strategy = homing;
        missile.startPosition.set(-this.model.position.x, 0, - (this.model.position.z));
        missile.rotation.y = this.model.rotation.y;
        missile.initializeModel(this.scene);
        this.lastShot = this.loop.second
        this.allowShot = false;
    }

    handleShoot() {
        this.fireTime = this.loop.second - this.lastShot;
            // console.log(this.fireTime);
        if( this.fireTime > this.fireRate){
            this.allowShot = true;      
        }

        if(this.allowShot){
            this.shoot();  
        }
    }

    tick(delta) {
        super.tick();
        if(this.model) {
            this.move(delta);

            this.handleShoot();
            this.collidePlayer();
            
        }
    }
}