import { World } from "./src/World/World.js";


function main() {

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    const canvas = document.querySelector('canvas.webgl');

    const blocker = document.getElementById( 'blocker' );
    const instructions = document.getElementById( 'instructions' );

    instructions.addEventListener( 'click', function () {

        instructions.style.display = 'none';
        blocker.style.display = 'none';

    } );

    const world = new World(canvas, sizes);

    // world scene
    world.start();

    // Pause
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape'){
            if(world.isRunning){
                world.stop();
            }
            else{
                world.start();
            }
        }

    })
}

main();