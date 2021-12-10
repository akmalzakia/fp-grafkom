import { createCamera } from "../../components/camera.js";
import { createLights } from "../../components/lights.js";
import { createScene, setPanorama } from "../../components/scene.js";
import { createRenderer } from "../../systems/renderer.js";
import { createLoadingManager } from "../../systems/loadingManager.js";

import { Loop } from "../../systems/Loop.js";
import { Resizer } from "../../systems/Resizer.js";
import { createControls } from "../../systems/controls.js";
import { Plane } from "../../components/Plane.js";
import { BasicEnemy } from "../../components/BasicEnemy.js";
import { Grid } from "../../systems/Grid.js";
import { Spawner } from "../../components/Spawner.js";
import { Wave } from "../../components/Wave.js";
import { score, scoreboard, nilai} from "../../components/score.js";


class easyWorld {
    // Setup your game here

    constructor(canvas, sizes){
        super(canvas, sizes);

        const light = createLights();
        this.scene.add(light)

        const plane = new Plane(this.loop, this.loadManager);
        plane.initializeModel(this.scene).then(() => {
            this.camera.tick = () => {
                this.camera.position.set(plane.model.position.x, plane.model.position.y + 10,  -20)
            }

            this.loop.updatables.push(this.camera);
        });
        this.scene.collidableObject.push(plane);

        const spawner = new Spawner(this.loop, grid);
        spawner.initializeModel(grid.gridSpace);
        this.loop.updatables.push(spawner);

        nilai.innerHTML = score.value;

    }

    start(){
        this.loop.start();
        this.isRunning = true;
    }

    stop(){
        this.loop.stop();
        this.isRunning = false;
    }
}

export { easyWorld };