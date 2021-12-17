import { World } from "./World.js";
import { Plane } from "../../components/Plane.js";
import { BasicEnemy } from "../../components/BasicEnemy.js";
import { createLights } from "../../components/lights.js";
import { HardEnemy } from "../../components/HardEnemy.js";
import { Spawner } from "../../components/Spawner.js";
import { Wave } from "../../components/Wave.js";
import { score, scoreboard, nilai} from "../../components/score.js";
import { Horizontal } from "../../components/move_strategy/Horizontal.js";
import { Vertical } from "../../components/move_strategy/Vertical.js";
import { BasicBoss } from "../../components/BasicBoss.js";
import { Triplets } from "../../components/shoot_strategy/Triplets.js";
import { Normal } from "../../components/shoot_strategy/Normal.js"
import { MathUtils, Vector3 } from "../../three/three.module.js";
import { BasicShooterEnemy } from "../../components/BasicShooterEnemy.js";

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

            const vertical_move = new Vertical(enemy);
            const horizontal_move = new Horizontal(enemy);
            vertical_move.direction = -1;


            enemy.strategies.push(vertical_move);
            enemy.strategies.push(horizontal_move);

            enemy.name = enemy.name + i;
            // spawner.spawnObject(enemy, i, 0);
            wave2.addObject(enemy, i, 3 * i);
            this.scene.collidableObject.push(enemy);
            this.loop.updatables.push(enemy);
        }

        const wave3 = new Wave("wave3", 1);
        for(let i = 0; i < 10; i++) {
            const enemy = new BasicEnemy(this.loop, this.loadManager);
            const vertical_move = new Vertical(enemy);
            const horizontal_move = new Horizontal(enemy);
            vertical_move.direction = -1;

            enemy.strategies.push(vertical_move);
            enemy.strategies.push(horizontal_move);

            enemy.name = enemy.name + i;
            wave3.addObject(enemy, i, 2 * i);
            this.scene.collidableObject.push(enemy);
            this.loop.updatables.push(enemy);
        }

        const wave4 = new Wave("wave4", 1);
        for(let i = 0; i < 10; i++) {
            const enemy = new HardEnemy(this.loop, this.loadManager);
            
            const vertical_move = new Vertical(enemy);
            const horizontal_move = new Horizontal(enemy);
          
            vertical_move.direction = -1;

            enemy.strategies.push(vertical_move);
            enemy.strategies.push(horizontal_move);

            enemy.name = enemy.name + i;
            // spawner.spawnObject(enemy, i, 0);
            wave4.addObject(enemy, i, i);
            this.scene.collidableObject.push(enemy);
            this.loop.updatables.push(enemy);
        }

        const wave5 = new Wave("wave5", 1);
        for(let i = 0; i < 10; i++) {
            const enemy = new HardEnemy(this.loop, this.loadManager);
            
            const vertical_move = new Vertical(enemy);
            const horizontal_move = new Horizontal(enemy);
          
            vertical_move.direction = -1;

            enemy.strategies.push(vertical_move);
            enemy.strategies.push(horizontal_move);

            enemy.name = enemy.name + i;
            // spawner.spawnObject(enemy, i, 0);
            wave5.addObject(enemy, i, 1 * i);
            this.scene.collidableObject.push(enemy);
            this.loop.updatables.push(enemy);
        }

        const wave6 = new Wave("wave6", 1);
        for(let i = 5; i < 10; i++) {
            const enemy = new HardEnemy(this.loop, this.loadManager);
            
            const vertical_move = new Vertical(enemy);
            const horizontal_move = new Horizontal(enemy);
          
            vertical_move.direction = -1;

            enemy.strategies.push(vertical_move);
            enemy.strategies.push(horizontal_move);

            enemy.name = enemy.name + i;
            // spawner.spawnObject(enemy, i, 0);
            wave6.addObject(enemy, i, 1 * i);
            this.scene.collidableObject.push(enemy);
            this.loop.updatables.push(enemy);
        }


        spawner.registerWave(wave2);
        spawner.registerWave(wave3);
        spawner.registerWave(wave4);
        spawner.registerWave(wave5);


        const boss = new BasicBoss(this.loop, this.loadManager);
        let pos = this.grid.indexToWorldCoordinates(25);
        boss.addKeyframe(new Vector3(pos.x, pos.y, pos.z), 5000);
        let pos1 = this.grid.indexToWorldCoordinates(20);
        boss.addKeyframe(new Vector3(pos1.x, pos1.y, pos1.z), 5000);
        let pos2 = this.grid.indexToWorldCoordinates(29);
        boss.addKeyframe(new Vector3(pos2.x, pos2.y, pos2.z), 5000);
        boss.addKeyframe(new Vector3(pos1.x, pos1.y, pos1.z), 5000);
        boss.addKeyframe(new Vector3(pos2.x, pos2.y, pos2.z), 5000);
        boss.addKeyframe(new Vector3(pos1.x, pos1.y, pos1.z), 5000);
        boss.addKeyframe(new Vector3(pos2.x, pos2.y, pos2.z), 5000);
        boss.addKeyframe(new Vector3(pos1.x, pos1.y, pos1.z), 5000);
        boss.addKeyframe(new Vector3(pos2.x, pos2.y, pos2.z), 5000);
        boss.addKeyframe(new Vector3(pos.x, pos.y, pos.z), 5000);
        boss.setTarget(plane);
        const triplets = new Triplets(boss);
        triplets.type = 'homing';
        boss.shootStrategies.push(triplets);
        const homing = new Normal(boss);
        homing.type = 'homing';
        boss.shootStrategies.push(homing);
        spawner.registerWave(wave6);
        this.scene.collidableObject.push(boss);
        this.loop.updatables.push(boss);

        const wave7 = new Wave('wave7', 1);
        for(let i = 1; i < 5; i++) {
            const enemy = new BasicShooterEnemy(this.loop, this.loadManager);
            enemy.setTarget(plane);
            enemy.fireRate += 1;
            const vertical_move = new Vertical(enemy);
            const horizontal_move = new Horizontal(enemy);
          
            vertical_move.direction = -1;

            enemy.strategies.push(vertical_move);
            enemy.strategies.push(horizontal_move);

            enemy.name = enemy.name + i;
            wave7.addObject(enemy, 5, 4 * i);
            this.scene.collidableObject.push(enemy);
            this.loop.updatables.push(enemy);
        }

        spawner.registerWave(wave7);
        spawner.registerObject(boss, 3, 1);
        
        console.log(spawner.spawnQueue);

        nilai.innerHTML = score.value;

        const wave8 = new Wave("wave8", 1);
        for(let i = 0; i < 10; i++) {
            const enemy = new HardEnemy(this.loop, this.loadManager);
            enemy.speed += 2;
            const vertical_move = new Vertical(enemy);
          
            vertical_move.direction = -1;

            enemy.strategies.push(vertical_move);

            enemy.name = enemy.name + i;
            // spawner.spawnObject(enemy, i, 0);
            wave8.addObject(enemy, i, i / 2);
            this.scene.collidableObject.push(enemy);
            this.loop.updatables.push(enemy);
        }

        spawner.registerWave(wave8);

        const wave9 = new Wave("wave9", 1);
        for(let i = 0; i < 5; i++) {
            const enemy = new BasicShooterEnemy(this.loop, this.loadManager);
            enemy.fireRate += 0.5;
            enemy.setTarget(plane);
            const vertical_move = new Vertical(enemy);
          
            vertical_move.direction = -1;

            enemy.strategies.push(vertical_move);

            enemy.name = enemy.name + i;
            // spawner.spawnObject(enemy, i, 0);
            wave9.addObject(enemy, i * 2, i / 2);
            this.scene.collidableObject.push(enemy);
            this.loop.updatables.push(enemy);
        }

        spawner.registerWave(wave9);

        const wave10 = new Wave("wave10", 1);
        for(let i = 0; i < 10; i++) {
            const enemy = new HardEnemy(this.loop, this.loadManager);
            enemy.speed += 2;
            const vertical_move = new Vertical(enemy);
          
            vertical_move.direction = -1;

            enemy.strategies.push(vertical_move);

            enemy.name = enemy.name + i;
            // spawner.spawnObject(enemy, i, 0);
            wave10.addObject(enemy, 9 - i, i / 2);
            this.scene.collidableObject.push(enemy);
            this.loop.updatables.push(enemy);
        }

        spawner.registerWave(wave10);
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