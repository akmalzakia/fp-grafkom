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
    const gameover = document.getElementById('gameover');
    const win = document.getElementById('win');
    const lose = document.getElementById('lose');


    instructions.addEventListener( 'click', function () {
        start();
    } );


    const world = new hardWorld(canvas, sizes);
    gameover.style.display = 'none';
    world.start();
    // blocker2.style.display = 'none';
    // gameover.style.display = 'none';

    // Pause
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape'){
            if(world.isRunning){
                pause()
            }
            else{
                start()
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
        gameover.style.display = 'none';
    }

    function start() {
        world.start();
        instructions.style.display = 'none';
        blocker.style.display = 'none';
        gameover.style.display = 'none';
    }

}

main();