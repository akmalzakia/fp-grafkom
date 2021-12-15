import { Enemy } from "./Enemy.js";
import { Missile } from "./Missile.js";

export class PlayerMissile extends Missile {
    constructor(scene, loadingManager = null) {
        super(scene, loadingManager);
        this.url = '../assets/missile/scene.gltf';
        this.scale.set(.01, .01, .01);
        this.name = "PlayerMissile"
    }

    setFromPlayerMissile(playerMissile) {
        super.setFromMissile(playerMissile);
    }

    clone() {
        const playerMissile = new PlayerMissile(null, null);
        playerMissile.setFromPlayerMissile(this);
        return playerMissile;
    }

    // Collision Detection

    checkEnemyCollision(){
    const enemies = this.scene.collidableObject.filter((o) => o instanceof Enemy);
        const enemy = enemies.find((o) => this.isCollide(o.model))
        if(enemy){
            this.dispose();
            enemy.takeDamage(this.damage);
            score.value++;
            nilai.innerHTML = score.value;
        }
    }
    
}