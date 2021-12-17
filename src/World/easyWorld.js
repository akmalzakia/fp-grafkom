import { World } from "./World.js";
import { Plane } from "../../components/Plane.js";
import { BasicEnemy } from "../../components/BasicEnemy.js";
import { createLights } from "../../components/lights.js";
import { HardEnemy } from "../../components/HardEnemy.js";
import { Spawner } from "../../components/Spawner.js";
import { Wave } from "../../components/Wave.js";
import { score, scoreboard, nilai} from "../../components/score.js";
import { BasicShooterEnemy } from "../../components/BasicShooterEnemy.js";
import { createControls } from "../../systems/controls.js";
import { Vector3 } from "../../three/three.module.js";
import { BasicBoss } from "../../components/BasicBoss.js";
import { Triplets } from "../../components/shoot_strategy/Triplets.js";
import { Normal } from "../../components/shoot_strategy/Normal.js";


class easyWorld extends World{
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

        // const controls = createControls(this.camera, canvas);
        // this.loop.updatables.push(controls)

        const spawner = new Spawner(this.loop, this.grid);
        spawner.initializeModel(this.grid.gridSpace);
        this.loop.updatables.push(spawner);

        // const shootEnemy = new BasicShooterEnemy(this.loop, this.loadManager);
        // shootEnemy.addKeyframe(new Vector3(0, 0, 0), 1000);
        // shootEnemy.addKeyframe(new Vector3(10, 0, 0), 5000);
        // shootEnemy.addKeyframe(new Vector3(0, 0, 0), 5000);
        // spawner.registerObject(shootEnemy, 1, 1);
        // this.scene.collidableObject.push(shootEnemy)
        // this.loop.updatables.push(shootEnemy);
        // shootEnemy.setTarget(plane);    

        const boss = new BasicBoss(this.loop, this.loadManager);
        boss.setTarget(plane);
        const triplets = new Triplets(boss);
        triplets.type = 'vertical';
        boss.shootStrategies.push(triplets);
        const homing = new Normal(boss);
        homing.type = 'homing';
        boss.shootStrategies.push(homing);
        spawner.registerObject(boss, 1, 1);
        this.scene.collidableObject.push(boss);
        this.loop.updatables.push(boss);
        

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