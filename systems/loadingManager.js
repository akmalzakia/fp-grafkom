import { LoadingManager } from "../three/three.module.js";

function createLoadingManager() {
    const manager = new LoadingManager();

    manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

        // console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    
    };
    
    manager.onLoad = function ( ) {
    
        // console.log( 'Loading complete!');
    
    };
    
    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    
        // console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    
    };
    
    manager.onError = function ( url ) {
    
        console.log( 'There was an error loading ' + url );
    
    };

    return manager;
}

export { createLoadingManager };