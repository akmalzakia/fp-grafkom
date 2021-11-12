
function setSize(sizes, camera, renderer) {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

class Resizer {
    constructor(sizes, camera, renderer) {
        setSize(sizes, camera, renderer);

        window.addEventListener('resize', () => {
            setSize(sizes, camera, renderer);
        });
    }

}

export { Resizer };