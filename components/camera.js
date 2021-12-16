import { PerspectiveCamera, Math, Audio, AudioLoader, AudioListener } from "../three/three.module.js";

function createCamera(sizes) {
    const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.x = 0;
    camera.position.y = 4;
    camera.position.z = -7;


    camera.rotateY(Math.degToRad(180));
    camera.rotateX(Math.degToRad(-30));  

    
    // Audio 
    // create an AudioListener and add it to the camera
    const listener = new AudioListener();
    camera.add( listener );

    // create a global audio source
    const sound = new Audio( listener );

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new AudioLoader();
    audioLoader.load( '/assets/sounds/beat.ogg', function( buffer ) {
	    sound.setBuffer( buffer );
	    sound.setLoop( true );
	    sound.setVolume( 0.5 );
	    sound.play();
    });

    return camera;
}

export { createCamera };