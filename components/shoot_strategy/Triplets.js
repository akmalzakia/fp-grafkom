import { EnemyMissile } from "../EnemyMissile.js";
import { Vertical } from "../move_strategy/Vertical.js";
import { ShootStrategy } from "./ShootStrategy.js";
import { Math as THREEMath, MathUtils } from "../../three/three.module.js";
import { Homing } from "../move_strategy/Homing.js";

export class Triplets extends ShootStrategy {
    constructor(object) {
        super(object);
        this.gap = 2;
        this.cd = 2;
    }

    handleCooldown(time) {
        super.handleCooldown(time);
        this.gap = MathUtils.randInt(1, 5);
    }

    shoot() {
        let angle;
        const missiles = [];
        const missile1 = new EnemyMissile(this.object.loop, this.object.loadingManager);
        missile1.startPosition.set(-this.object.model.position.x - this.gap, 0, - (this.object.model.position.z));

        
        const missile2 = new EnemyMissile(this.object.loop, this.object.loadingManager);
        missile2.startPosition.set(-this.object.model.position.x, 0, - (this.object.model.position.z));


        const missile3 = new EnemyMissile(this.object.loop, this.object.loadingManager);
        missile3.startPosition.set(-this.object.model.position.x + this.gap, 0, - (this.object.model.position.z));

        missiles.push(missile1);
        missiles.push(missile2);
        missiles.push(missile3);

        for(const missile of missiles) {
            if(this.type === 'homing') {
                missile.strategy = new Homing(missile);
                angle = this.object.model.rotation.y;
            }
            else if (this.type === 'vertical') {
                missile.strategy = new Vertical(missile);
                angle = THREEMath.degToRad(180);
            }

            missile.rotation.y = angle;

            missile.strategy.direction = -1;
            missile.initializeModel(this.object.scene);
        }
    }
}
