import * as THREE from '../three/three.module.js'
import { GLTFLoader } from '../three/loaders/GLTFLoader.js';
import { Loop } from '../systems/Loop.js';

export class GameObject {
    constructor(scene, loop, loadingManager = null){
        this.loadingManager = loadingManager;
        /**
         * @type {Loop} this.loop
         */
        this.loop = loop;
        this.url = "";
        this.scene = scene;
        this.startPosition = new THREE.Vector3(0, 0, 0);
        this.scale = new THREE.Vector3(1, 1, 1);
        this.rotation = new THREE.Vector3(0, 0, 0);
        this.model = new THREE.Object3D();

        this.helper = null;
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
        this.model.position.set(this.startPosition.x, this.startPosition.y, this.startPosition.z);
        this.model.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
        this.center();
        this.scene.add(this.model);
        this.enableHelper()
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

    center(){
        const bbox = new THREE.Box3().setFromObject(this.model);
        const cent = bbox.getCenter(new THREE.Vector3());
        const size = bbox.getSize(new THREE.Vector3());

        bbox.setFromObject(this.model);
        bbox.getCenter(cent);
        bbox.getSize(size);

        this.model.position.copy(cent).multiplyScalar(-1);
        this.model.position.y -= (size.y * 0.5);


    }

    dispose(){
        this.model.traverse((o) => {
            if(o instanceof THREE.Mesh){
                o.geometry.dispose();
                o.material.dispose();
            }
        })

        this.scene.remove(this.model);
        this.model = null;

        if(this.helper){
            this.disableHelper();
        }
    }

    enableHelper(){
        this.helper = new THREE.BoxHelper(this.model, 0xffff00);
        this.scene.add(this.helper);
    }

    disableHelper(){
        this.helper.visible = false;
    }
}