import { MoveStrategy } from "./moveStrategy.js";

export class Homing extends MoveStrategy {
    constructor(object) {
        super(object);
    }
    
    move(delta) {
        const angle = this.object.rotation.y;
        this.object.model.position.z += delta * this.object.speed * Math.cos(angle);
        this.object.model.position.x += delta * this.object.speed * Math.sin(angle);
    }
}