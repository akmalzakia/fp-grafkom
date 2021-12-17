import { World } from "../src/World/World.js";
import { EnemyMissile } from "./EnemyMissile.js";
import { Radial } from "./move_strategy/Radial.js";
import { TweenableEnemy } from "./TweenableEnemy.js";

class BasicBoss extends TweenableEnemy {
    constructor(loop, loadingManager = null) {
        super(loop, loadingManager)
        this.url = '../assets/invader_1/scene.gltf';
        this.scale.set(0.2, 0.2, 0.2);
        this.name = 'Basic Boss';
        this.speed = 6;
        this.shootStrategies = [];
        
        this.maxHorizontalRange = 3;
        this.dir = 1;
        this.hp = 1000;

        this.fireRate = 0.7;
        this.lastShot = 1;  
        this.allowShot = true;
        this.fireTime = 0;
    }

    shoot() {
        this.shootStrategies[0].handleCooldown(this.loop.second);
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


    tick() {
        if(this.model) {
            super.tick();
            this.handleShoot();
            this.collidePlayer();
        }
    }

    dispose() {
        super.dispose();
        World.active.worldSuccess();
    }

}

export { BasicBoss };