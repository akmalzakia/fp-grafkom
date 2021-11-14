import { GameObject } from "./GameObject.js";

class Missile extends GameObject{
    constructor(scene, loop, loadingManager = null){
        super(scene, loop, loadingManager);
        this.url = '../assets/missile/scene.gltf';
        this.scale.set(.01, .01, .01);
        
        //Movement
        this.speed = 20;
        this.distance = 20;
        
        //Shoot
        this.damage = 10;
        
        this.loop.updatables.push(this);
    }

    move(delta){
        this.model.position.z += delta * this.speed;
        console.log(this.model.position.z);
        if(this.model.position.z > -this.startPosition.z + this.distance){
            this.dispose();
        }
    }

    tick(delta){
        if(this.model){
            this.move(delta);
            if(this.helper){
                this.helper.update();
            }
        }
    }
}

export { Missile }