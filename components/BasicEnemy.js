import { GameObject } from "./GameObject.js";

export class BasicEnemy extends GameObject {

    constructor(scene, loop, loadingManager = null){
        super(scene, loop, loadingManager);
        this.url = '../assets/invader_5/scene.gltf';
        this.scale.set(1.5, 1.5, 1.5);
        this.name = "Enemy"
        this.speed = 3;

        //movement
        this.maxHorizontalRange = 5;
        this.dir = 1;


    }

    verticalMove(delta){
        if(this.model){
            this.model.position.z -= this.speed * delta;
            
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
        this.horizontalMove(delta);


        if(this.helper){
            this.helper.update();
        }
    }
}