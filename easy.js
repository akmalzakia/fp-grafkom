import { World } from "./src/World/World.js";
import { hardWorld } from "./src/World/hardWorld.js";
import { easyWorld } from "./src/World/easyWorld.js";
import { score } from "./components/score.js";

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


    const world = new easyWorld(canvas, sizes);
    world.start();
    

    // Pause
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape'){
            if(world.isRunning){
                pause();
            }
            else{
                start();
            }
        }

    })

    window.onblur = function() {
        pause();
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