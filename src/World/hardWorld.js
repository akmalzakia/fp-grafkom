import { World } from "./World.js";
import { Plane } from "../../components/Plane.js";
import { BasicEnemy } from "../../components/BasicEnemy.js";
import { createLights } from "../../components/lights.js";
import { HardEnemy } from "../../components/HardEnemy.js";
import { Spawner } from "../../components/Spawner.js";
import { Wave } from "../../components/Wave.js";
import { score, scoreboard, nilai} from "../../components/score.js";

class hardWorld extends World{
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
 

        const spawner = new Spawner(this.loop, this.grid);
        spawner.initializeModel(this.grid.gridSpace);
        this.loop.updatables.push(spawner);
        // console.log(score);


        const wave2 = new Wave("wave2", 1);
        for(let i = 0; i < 10; i++) {
            const enemy = new HardEnemy(this.loop, this.loadManager);
            enemy.name = enemy.name + i;
            // spawner.spawnObject(enemy, i, 0);
            wave2.addObject(enemy, i, 1 * i);
            this.scene.collidableObject.push(enemy);
            this.loop.updatables.push(enemy);
        }

        const wave3 = new Wave("wave3", 1);
        for(let i = 0; i < 10; i++) {
            const enemy = new BasicEnemy(this.loop, this.loadManager);
            enemy.name = enemy.name + i;
            // spawner.spawnObject(enemy, i, 0);
            wave3.addObject(enemy, i, 1 * i);
            this.scene.collidableObject.push(enemy);
            this.loop.updatables.push(enemy);
        }

        spawner.registerWave(wave2);
        spawner.registerWave(wave3);
        console.log(spawner.spawnQueue);

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

export { hardWorld };