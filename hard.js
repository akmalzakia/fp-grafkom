import { World } from "./src/World/World.js";
import { hardWorld } from "./src/World/hardWorld.js";
import { easyWorld } from "./src/World/easyWorld.js";

function main() {

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    const canvas = document.querySelector('canvas.webgl');

    const blocker = document.getElementById( 'blocker' );
    const instructions = document.getElementById( 'instructions' );

    instructions.addEventListener( 'click', function () {
        start();
    } );


    const world = new hardWorld(canvas, sizes);
    world.stop();
    

    // // Pause
    // document.addEventListener('keydown', (e) => {
    //     if(e.key === 'Escape'){
    //         if(world.isRunning){
    //             world.stop();
    //         }
    //         else{
    //             world.start();
    //         }
    //     }

    // })



    window.onblur = function() {
        start();
    }


    function pause() {
        world.stop();
        instructions.style.display = 'flex';
        blocker.style.display = 'block';
    }

    function start() {
        world.start();
        instructions.style.display = 'none';
        blocker.style.display = 'none';
    }
}

main();