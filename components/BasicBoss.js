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
        this.hp = 500;

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

    shoot() {
        for(const strategy of this.shootStrategies) {
            strategy.handleCooldown(this.loop.second);
        }
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
            this.lookTarget();
            this.collidePlayer();
        }
    }

    dispose() {
        super.dispose();
        World.active.worldSuccess();
    }

}

export { BasicBoss };