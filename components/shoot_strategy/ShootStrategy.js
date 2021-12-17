
export class ShootStrategy {
    constructor(object) {
        this.object = object;
        this.cd = 5;
        this.type = 'vertical';
        this.lastTime = 0;
        this.isAvailable = true;
    }

    handleCooldown(time) {
        if (this.isAvailable) {
            this.shoot();
            this.lastTime = time;
            this.isAvailable = false;
        }

        if(time - this.lastTime >= this.cd) {
            this.isAvailable = true;
        }
    }

}