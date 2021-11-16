import { Enemy } from "./Enemy.js";

export class BasicEnemy extends Enemy {

    constructor(scene, loop, loadingManager = null){
        super(scene, loop, loadingManager);
        this.url = '../assets/invader_5/scene.gltf';
        this.scale.set(1.5, 1.5, 1.5);
        this.name = "BasicEnemy"
        this.speed = 5;

        //movement
        this.maxHorizontalRange = 5;
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
            const range = this.model.position.x - this.startPosition.x;
            if(range > this.maxHorizontalRange || range < -this.maxHorizontalRange){
                this.dir *= -1;
            }
            // console.log(delta);
            this.model.position.x += this.speed * delta * this.dir;
        }
    }

    tick(delta){
        if(this.model){
            this.horizontalMove(delta);
            this.verticalMove(delta);

            this.collidePlayer();


            // helper
            if(this.helper){
                this.helper.update();
            }
        }
    }
}