import { Enemy } from "./Enemy.js";
import { GameObject } from "./GameObject.js";
import { Math as THREEMath } from "../three/three.module.js";
import { score, scoreboard, nilai} from "./score.js";
import { Plane } from "./Plane.js";

class EnemyMissile extends GameObject{
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
        
        this.loop.updatables.push(this);
    }

    // Movement

    move(delta){
        const angle = this.rotation.y;
        // console.log(THREEMath.radToDeg(angle));
        this.model.position.z += delta * this.speed * Math.cos(angle);
        this.model.position.x += delta * this.speed * Math.sin(angle);
        // console.log(this.model.position.z);
        if(this.model.position.z > -this.startPosition.z + this.distance){
            this.dispose();
        }
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