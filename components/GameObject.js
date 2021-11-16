import * as THREE from '../three/three.module.js'
import { GLTFLoader } from '../three/loaders/GLTFLoader.js';
import { Loop } from '../systems/Loop.js';
import { removeItemOnce } from '../systems/functional.js';

export class GameObject {
    constructor(scene, loop, loadingManager = null){
        this.name = "";
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

    // Model Loader

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

    // Initialize the model

    async initializeModel(){
        this.model = await this.loadModel();
        // console.log(this.model);
        this.model.scale.set(this.scale.x, this.scale.y, this.scale.z);
        this.model.position.set(this.startPosition.x, this.startPosition.y, this.startPosition.z);
        this.model.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
        this.model.name = this.name;
        this.center();
        this.scene.add(this.model);
        this.enableHelper()
    }

    // Collision Detection

    isCollide(object){
        if(object && this.model){

            var bounding1 = new THREE.Box3().setFromObject(this.model)
            var bounding2 = new THREE.Box3().setFromObject(object)
            
            return bounding1.intersectsBox(bounding2);
        }

        return false;
    }

    // Center the object on its scene

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

    // Dispose / Remove the object

    dispose(){
        const mdl = this.model;
        this.scene.remove(this.model);
        this.scene.collidableObject = removeItemOnce(this.scene.collidableObject, this);
        this.model = null;

        console.log('disposed');

        mdl.traverse((o) => {
            if(o instanceof THREE.Mesh){
                o.geometry.dispose();
                o.material.dispose();
            }
        })


        if(this.helper){
            this.disableHelper();
        }

        
    }

    // Box Helper for threejs

    enableHelper(){
        this.helper = new THREE.BoxHelper(this.model, 0xffff00);
        this.scene.add(this.helper);
    }

    disableHelper(){
        this.helper.visible = false;
        this.scene.remove(this.helper);
    }

    
}