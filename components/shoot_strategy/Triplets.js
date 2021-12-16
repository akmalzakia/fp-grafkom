import { EnemyMissile } from "../EnemyMissile.js";
import { Vertical } from "../move_strategy/Vertical.js";
import { ShootStrategy } from "./ShootStrategy.js";
import { Math as THREEMath } from "../../three/three.module.js";

export class Triplets extends ShootStrategy {
    constructor(object) {
        super(object);

        this.gap = 2;
        this.cd = 2;
    }

    shoot() {
        const angle = THREEMath.degToRad(180);
        const missile1 = new EnemyMissile(this.object.loop, this.object.loadingManager);
        const v1 = new Vertical(missile1);
        v1.direction = -1;
        missile1.strategy = v1;
        missile1.startPosition.set(-this.object.model.position.x - this.gap, 0, - (this.object.model.position.z));
        missile1.rotation.y = angle;
        
        const missile2 = new EnemyMissile(this.object.loop, this.object.loadingManager);
        const v2 = new Vertical(missile2);
        v2.direction = -1;
        missile2.strategy = v2;
        missile2.startPosition.set(-this.object.model.position.x, 0, - (this.object.model.position.z));
        missile2.rotation.y = angle;

        const missile3 = new EnemyMissile(this.object.loop, this.object.loadingManager);
        const v3 = new Vertical(missile3);
        v3.direction = -1;
        missile3.strategy = v3;
        missile3.startPosition.set(-this.object.model.position.x + this.gap, 0, - (this.object.model.position.z));
        missile3.rotation.y = angle;

        missile1.initializeModel(this.object.scene);
        missile2.initializeModel(this.object.scene);
        missile3.initializeModel(this.object.scene);
    }
}
