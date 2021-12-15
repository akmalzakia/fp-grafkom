import { score, scoreboard, nilai} from "./score.js";
import { Plane } from "./Plane.js";
import { Missile } from './Missile.js'
import { Homing } from "./move_strategy/Homing.js";

class EnemyMissile extends Missile{
    constructor(loop, loadingManager = null){
        super(loop, loadingManager);
        this.url = '../assets/missile/scene.gltf';
        this.scale.set(.01, .01, .01);
        this.name = "EnemyMissile"
        //Movement
        this.speed = 10;
        this.distance = 20;
        
        //Shoot
        this.damage = 10;
    }

    collidePlayer() {
        if(this.model) {
            const player = this.scene.collidableObject.filter((o) => o instanceof Plane).find((o) => this.isCollide(o.model));
            if(player) {
                this.dispose();
                player.takeDamage(this.damage);
                score.value--;
                nilai.innerHTML = score.value;
            }
        }
    }

    setFromEnemyMissile(enemyMissile) {
        super.setFromMissile(enemyMissile);
    }

    clone() {
        const enemyMissile = new EnemyMissile(null, null);
        enemyMissile.setFromEnemyMissile(this);
        return enemyMissile;
    }

    // Animation

    tick(delta){
        if(this.model){
            this.move(delta);
            // console.log(this.model);
            if(this.helper){
                this.helper.update();
            }

            this.collidePlayer();
        }
    }

}

export { EnemyMissile }