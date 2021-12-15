import { MoveStrategy } from "./moveStrategy.js";
import { Math as THREEMath } from "../../three/three.module.js"

export class Radial extends MoveStrategy {
    constructor(object) {
        super(object);
        this.angle = 0;
    }

    move(delta) {
        const ang = THREEMath.degToRad(this.angle);
        // console.log(THREEMath.radToDeg(angle), this.angle);
        this.object.model.position.z += delta * this.object.speed * Math.cos(ang);
        this.object.model.position.x += delta * this.object.speed * Math.sin(ang);
        if(this.angle > 360) {
            console.log('x');
            this.angle = 0;
        }
        this.angle++;
        console.log(this.angle);
    } 
}