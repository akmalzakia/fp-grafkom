import * as THREE from '../three/three.module.js'
import { GLTFLoader } from '../three/loaders/GLTFLoader.js';

export class GameObject {
    constructor(scene, loadingManager = null){
        this.loadingManager = loadingManager;
        this.url = "";
        this.scene = scene;
        this.position = new THREE.Vector3(0, 0, 0);
        this.scale = new THREE.Vector3(1, 1, 1);
        this.rotation = new THREE.Vector3(0, 0, 0);
        this.model = new THREE.Object3D();
    }

    loadModel(){
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader(this.loadingManager);
            loader.load(
                this.url,
                (gltf) => {
                    resolve(gltf.scene)
                },
                null
                ,
                (error) => {
                    reject(error)
                }
            );
        });
    }

    async initializeModel(){
        this.model = await this.loadModel();
        this.model.scale.set(this.scale.x, this.scale.y, this.scale.z);
        this.model.position.set(this.position.x, this.position.y, this.position.z);
        this.model.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
        this.scene.add(this.model);
    }

    isCollide(object){
        if(object){
            this.model.geometry.computeBoundingBox();
            object.geometry.computeBoundingBox();

            this.model.updateMatrixWorld();
            object.updateMatrixWorld();

            var bounding1 = this.model.geometry.boundingBox.clone();
            bounding1.applyMatrix4(this.model.matrixWorld);
            var bounding2 = object.geometry.boundingBox.clone();
            bounding2.applyMatrix4(object.matrixWorld);
            
            return bounding1.intersectsBox(bounding2);
        }

        return false;
    }
}