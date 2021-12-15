import * as TWEEN from '../tween/tween.esm.js'
import { Enemy } from './Enemy.js';

class TweenableEnemy extends Enemy {
    constructor(scene, loadingManager = null) {
        super(scene, loadingManager);

        this.keyframes = [];
    }

    initializeModel(scene) {
        super.initializeModel(scene).then(() => this.initializeTween());
    }

    initializeTween() {
        if(this.keyframes.length !== 0) {
            const tweens = [];
            const tween = new TWEEN.Tween(this.model.position).to(this.keyframes[0].end, this.keyframes[0].duration);
            tweens.push(tween);
            for(let i = 1; i < this.keyframes.length; i++) {
                const tw = new TWEEN.Tween(this.model.position).to(this.keyframes[i].end, this.keyframes[i].duration);
                tweens.push(tw);
                tweens[i-1].chain(tw);   
            }

            tween.start();
        }
        
    }

    addKeyframe(end, duration) {
        const keyframe = {
            end: end,
            duration: duration,
        }

        this.keyframes.push(keyframe);
    }
}

export { TweenableEnemy }