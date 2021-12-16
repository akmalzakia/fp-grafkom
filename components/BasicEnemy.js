import { Enemy } from "./Enemy.js";

export class BasicEnemy extends Enemy {

    constructor(loop, loadingManager = null){
        super(loop, loadingManager);
        this.url = '../assets/invader_5/scene.gltf';
        this.scale.set(1.5, 1.5, 1.5);
        this.name = "BasicEnemy"
        this.speed = 4;
        this.strategies = [];

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
        for(const strategy of this.strategies) {
            strategy.move(delta);
        }
    }

    tick(delta){
        super.tick();
        if(this.model){
            this.move(delta);
            this.collidePlayer();


            // helper
            
        }
    }
}