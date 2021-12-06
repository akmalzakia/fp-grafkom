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

class easyWorld {
    // Setup your game here

    constructor(canvas, sizes){
        this.isRunning = false;
        this.sizes = sizes;
        this.loadManager = createLoadingManager();
        this.camera = createCamera(sizes);
        this.scene = createScene();
        this.scene.name = "Main Scene"
        setPanorama(this.scene, '../assets/spacemap/', this.loadManager);
        this.renderer = createRenderer(canvas, sizes);
        this.loop = new Loop(this.camera, this.scene, this.renderer);
        const grid = new Grid(this.scene);
        
        grid.enable();
        
        //Custom Scene Variables
        this.scene.collidableObject = [];
        this.scene.grid = grid;

        const controls = createControls(this.camera, canvas);
        const light = createLights();
        // const cube = createCube();

        this.loop.updatables.push(controls);

        this.scene.add(light)
        

        // this.scene.add(cube);

        const resizer = new Resizer(this.sizes, this.camera, this.renderer);
        const plane = new Plane(this.loop, this.loadManager);
        plane.initializeModel(this.scene);
        this.scene.collidableObject.push(plane);

        const spawner = new Spawner(this.loop, grid);
        spawner.initializeModel(grid.gridSpace);

        const wave1 = new Wave("wave1", 1000);
        for(let i = 0; i < 10; i++) {
            const enemy = new BasicEnemy(this.loop, this.loadManager);
            enemy.name = enemy.name + i;
            // spawner.spawnObject(enemy, i, 0);
            wave1.addObject(enemy, i, 1000 * i);
            this.scene.collidableObject.push(enemy);
            this.loop.updatables.push(enemy);
        }

        spawner.spawnWave(wave1);
        
        
    }

    // Render world

    render(){
        this.renderer.render(this.scene, this.camera);
        console.log(this.renderer)
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