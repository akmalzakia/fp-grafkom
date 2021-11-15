import { GridHelper, Object3D } from "../three/three.module.js";

class Grid {
    constructor(scene){
        this.scene = scene;
        this.size = 30;
        this.divisions = 10;
        this.square = this.size / this.divisions;

        this.gridSpace = new Object3D();
        this.gridSpace.position.set(-(this.size/2) + (this.square/2), 0,  - (this.size/2) + (this.square/2));
        this.grid = new GridHelper(this.size, this.divisions);
    }

    enable(){
        this.scene.add(this.gridSpace);
        this.scene.add(this.grid);
    }

    disable(){
        this.scene.remove(this.gridSpace);
        this.scene.add(this.grid)
    }

    indexToCoordinates(index){
        const x = index % this.divisions * this.square;
        const z = Math.floor(index / this.divisions) * this.square;
        return new THREE.Vector2(x, z);
    }
    
    //kurang, masi salah kalo griddivision != gridsize
    coordinatesToIndex(coord){
        return Math.floor(coord.y * this.divisions + coord.x);
    }
    
}

export { Grid };