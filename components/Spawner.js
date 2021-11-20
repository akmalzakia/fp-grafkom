import { BoxGeometry, BoxHelper, Color, LineSegments, Vector3, WireframeGeometry } from "../three/three.module.js";
import { createBoxWireframe } from "./boxWireframe.js";
import { GameObject } from "./GameObject.js";

class Spawner extends GameObject{
    constructor(loop, grid = null) {
        super(loop, null);
        this.grid = grid;
        this.name = "Spawner";
        this.segmentSize = this.grid ? this.grid.divisions : 10;
        this.segments = [];

        const size = this.grid ? new Vector3(this.grid.size, this.grid.square, this.grid.square) : new Vector3(1, 1, 1);
        this.model = createBoxWireframe(size);
        
        const pos = this.grid ? this.grid.indexToCoordinates(this.grid.divisions ** 2 - (this.grid.divisions + 1) / 2) : this.startPosition;
        this.startPosition.set(pos.x, -size.y/2, pos.y);

        this.initializeSegments()
    }

    /**
     * Spawn GameObject From Spawner Position
     * @param {GameObject} object 
     */
    spawnObject(object, position, time) {
        if(position < this.segmentSize && position >= 0) {
            // const test = createBoxWireframe(new Vector3(1, 1, 1), 0xff0000);
            // const pos = this.spawnerPositionToGridPosition(this.segments[position].position);
            // console.log(pos);
            // test.position.set(pos.x, pos.y, pos.z);
            
            let realPos = new Vector3(0, 0 ,0);
            this.segments[position].getWorldPosition(realPos);
            object.startPosition.set(-realPos.x, 0, -realPos.z);

            object.initializeModel(this.grid ? this.grid.scene : this.scene);
            // console.log(object.model.position);
        }
    }

    initializeSegments() {
        const size = this.grid ? new Vector3(this.grid.size / this.grid.divisions, this.grid.square, this.grid.square) : new Vector3(1, 1, 1);

        for(let i = 0; i < this.segmentSize; i++) {
            const segment = createBoxWireframe(new Vector3(size.x, size.y, size.z));
            let position = new Vector3(i , 0, 0);
            if(this.grid) {
                const offset = (this.grid.divisions - 1) / 2;
                position.setX(offset * this.grid.square - (this.grid.square * i));
            }
            
            segment.position.set(position.x, position.y, position.z);
            this.model.add(segment);
            this.segments.push(segment);
        }
    }

    spawnerPositionToGridPosition(pos) {
        if(this.grid) {
            return new Vector3(pos.x + ((this.grid.divisions - 1) * this.grid.square / 2), pos.y, pos.z + this.grid.square * (this.grid.divisions - 1))
        }
    }
}

export { Spawner }; 