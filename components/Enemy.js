import { GameObject } from "./GameObject.js";


class Enemy extends GameObject {
    constructor(scene, loop, loadingManager = null) {
        super(scene, loop, loadingManager)
        this.name = "Enemy";
        this.hp = 100;
        this.damage = 10;
    }

    collidePlayer() {
        const player = this.scene.collidableObject.filter((o) => o.name === 'Plane');
        const p = player.find((o) => this.isCollide(o.model));
        if(p !== undefined) {
            this.takeDamage(p.damage);
            p.takeDamage(this.damage);
        } 
    }

    takeDamage(damage) {
        this.hp -= damage;
        console.log(this.hp);

        // die
        if(this.hp <= 0) {
            this.dispose();
        }
    }

}


export { Enemy };