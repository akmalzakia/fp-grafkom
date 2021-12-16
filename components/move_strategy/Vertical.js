import { MoveStrategy } from "./moveStrategy.js";

export class Vertical extends MoveStrategy {
    constructor(object) {
        super(object);
        this.direction = 1;
    }

    move(delta) {
        this.object.model.position.z += delta * this.object.speed * this.direction * (this.object.verticalMultiplier ? this.object.verticalMultiplier : 1);
    }
}