import { GameObject } from "./GameObject";
import { Missile } from "./Missile";

export class Shootable {
    /**
     * 
     * @param {GameObject} object 
     * @param {Missile} missile 
     */
    constructor(object, missile) {
        this.object = object;
        this.missile = missile;
        this.fireRate = 0.7;
        this.lastShot = 1;
        this.allowShot = true;
        this.fireTime = 0;
    }

    shoot() {
        const missile = missile.clone();
        missile.startPosition.set(-this.object.model.position.x, 0, - (this.object.model.position.z));
        missile.rotation.y = this.object.model.rotation.y;
        missile.initializeModel(this.object.scene);
        this.lastShot = this.object.loop.second
        this.allowShot = false;
    }

    handleShoot() {
        this.fireTime = this.object.loop.second - this.lastShot;
            // console.log(this.fireTime);
        if( this.fireTime > this.fireRate){
            this.allowShot = true;      
        }

        if(this.allowShot){
            this.shoot();  
        }
    }


}