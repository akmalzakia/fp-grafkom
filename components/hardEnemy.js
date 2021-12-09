import { Enemy } from "./Enemy.js";

export class HardEnemy extends Enemy {

    constructor(loop, loadingManager = null){
        super(loop, loadingManager);
        this.url = '../assets/invader_1/scene.gltf';
        this.scale.set(0.1, 0.1, 0.1);
        this.name = "HardEnemy"
        this.speed = 7;

        //movement
        this.maxHorizontalRange = 3;
        this.dir = 1;
        this.hp = 10;

        this.damage = 10;

    }

    verticalMove(delta){
        if(this.model){
            this.model.position.z -= this.speed * delta * 0.3;
            
        }
    }

    horizontalMove(delta){
        if(this.model){
            const range =  this.model.position.x - this.startPosition.x;
            // console.log(`${this.name} : ${this.model.position.x}, ${this.model.position.y}, ${this.model.position.z}`);
            if(range > this.maxHorizontalRange || range < -this.maxHorizontalRange){
                this.dir *= -1;
            }
            
            this.model.position.x += this.speed * delta * this.dir;
        }
    }

    move(delta) {
        super.move(delta);
        this.horizontalMove(delta);
        this.verticalMove(delta);
    }

    tick(delta){
        if(this.model){
            this.move(delta);
            this.collidePlayer();


            // helper
            if(this.helper){
                this.helper.update();
            }
        }
    }
}