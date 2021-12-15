import { GameObject } from "./GameObject.js";
import { Plane } from "./Plane.js";
import { score, nilai} from "./score.js";


class Enemy extends GameObject {
    constructor(loop, loadingManager = null) {
        super(loop, loadingManager)
        this.name = "Enemy";
        this.hp = 100;
        this.damage = 10;
    }

    collidePlayer() {
        const player = this.scene.collidableObject.filter((o) => o instanceof Plane);
        const p = player.find((o) => this.isCollide(o.model));
        if(p !== undefined) {
            this.takeDamage(p.damage);
            p.takeDamage(this.damage);
            score.value--;
            nilai.innerHTML = score.value;
        } 
    }

    takeDamage(damage) {
        this.hp -= damage;
        // console.log(this.hp);

        // die
        if(this.hp <= 0) {
            this.dispose();
        }
    }

    move() {
        // Constraint Movement
    }

}


export { Enemy };