import { Math as THREEMath, Vector3 } from "../../three/three.module.js";
import { EnemyMissile } from "../EnemyMissile.js";
import { Homing } from "../move_strategy/Homing.js";
import { ShootStrategy } from "./ShootStrategy.js";

export class Normal extends ShootStrategy {
    constructor(object, position = null) {
        super(object);
        this.cd = 1;
        this.position = position;
    }

    shoot() {
        let angle;
        const missile = new EnemyMissile(this.object.loop, this.object.loadingManager);
        if(this.type === 'homing') {
            this.strategy = new Homing(missile);
            angle = this.object.model.rotation.y;
        }
        else if (this.type === 'normal') {
            this.strategy = new Normal(missile);
            angle = THREEMath.degToRad(180);
        }
        this.strategy.direction = -1;
        missile.strategy = this.strategy;
        const pos = this.position ? this.position : new Vector3(-this.object.model.position.x, 0, - (this.object.model.position.z))
        missile.startPosition.set(pos.x, pos.y, pos.z);
        missile.rotation.y = angle;
        missile.initializeModel(this.object.scene);
    }
}