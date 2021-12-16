import { MoveStrategy } from "./moveStrategy.js";

export class Horizontal extends MoveStrategy {
    constructor(object) {
        super(object);
        this.direction = 1;
        this.maxHorizontalRange = 3;
        
    }

    move(delta) {
        const range =  this.object.model.position.x - this.object.startPosition.x;
        // console.log(`${this.name} : ${this.model.position.x}, ${this.model.position.y}, ${this.model.position.z}`);
        if(range > this.maxHorizontalRange || range < -this.maxHorizontalRange){
            this.direction *= -1;
        }
            
        this.object.model.position.x += this.object.speed * delta * this.direction;
    }
}