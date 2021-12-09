import { Enemy } from "./Enemy.js";
import { GameObject } from "./GameObject.js";
import { score, scoreboard, nilai} from "./score.js";

class Missile extends GameObject{
    constructor(loop, loadingManager = null){
        super(loop, loadingManager);
        this.url = '../assets/missile/scene.gltf';
        this.scale.set(.01, .01, .01);
        this.name = "Missile"
        
        //Movement
        this.speed = 20;
        this.distance = 20;
        
        //Shoot
        this.damage = 10;
        
        this.loop.updatables.push(this);
    }

    // Movement

    move(delta){
        this.model.position.z += delta * this.speed;
        // console.log(this.model.position.z);
        if(this.model.position.z > -this.startPosition.z + this.distance){
            this.dispose();
        }
    }

    // Animation

    tick(delta){
        if(this.model){
            this.move(delta);
            if(this.helper){
                this.helper.update();
            }

            this.checkEnemyCollision();
        }
    }

    // Collision Detection

    checkEnemyCollision(){
        const enemies = this.scene.collidableObject.filter((o) => o instanceof Enemy);
        const enemy = enemies.find((o) => this.isCollide(o.model))
        if(enemy){
            enemy.takeDamage(this.damage);
            score.value++;
            console.log('score: ', score.value);
            nilai.innerHTML = score.value;
        }
    }

}

export { Missile }