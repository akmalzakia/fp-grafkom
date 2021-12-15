import { Enemy } from "./Enemy.js";
import { GameObject } from "./GameObject.js";
import { Vertical } from "./move_strategy/Vertical.js";
import { score, scoreboard, nilai} from "./score.js";

class Missile extends GameObject{
    constructor(loop, loadingManager = null){
        super(loop, loadingManager);
        this.strategy = new Vertical(this);
        //Movement
        this.speed = 20;
        this.distance = 20;
        
        //Shoot
        this.damage = 10;
        
        this.loop.updatables.push(this);
    }

    // Movement

    move(delta){
        if(this.strategy) this.strategy.move(delta);
    }

    setFromMissile(missile) {
        super.setFromGameObject(missile);
        this.strategy = missile.strategy;
        this.speed = missile.speed;
        this.distance = missile.distance;
        this.damage = missile.damage;
    }

    clone() {
        const missile = new Missile(null, null);
        missile.setFromMissile(this);
        return missile;
    }

    // Animation

    tick(delta){
        if(this.model){
            super.tick();
            this.move(delta);
            this.checkEnemyCollision();
        }
    }


}

export { Missile }