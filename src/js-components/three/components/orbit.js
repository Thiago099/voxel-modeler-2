
import * as THREE from 'three';

import { OrbitControls } from '../lib/orbit-controls.js';


export { createOrbit }

function createOrbit(canvas)
{
    var callbacks = []
    function addCallback(callback)
    {
        callbacks.push(callback)
    }
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 20, 20, 20 );

    var controls = new OrbitControls( camera, canvas, ()=>{
        for(var callback of callbacks)
        {
            callback()
        }
    });

    var distance = 40; // desired distance
    var vector = new THREE.Vector3();
    vector.subVectors(camera.position, controls.target); // vector from target to camera
    vector.setLength(distance); // set vector length to desired distance
    camera.position.copy(controls.target).add(vector); // set camera position
    controls.zoomSpeed = 2;

    camera.position.set( 20, 20, 20 );
    controls.target.set(0,0,0)



    function reset()
    {
        camera.position.set( 20, 20, 20 );
        controls.target.set(0,0,0)
        controls.update()
        for(var callback of callbacks)
        {
            callback()
        }
    }

    return {camera,controls, addCallback,reset}
}