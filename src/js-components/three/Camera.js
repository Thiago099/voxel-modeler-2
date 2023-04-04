
import * as THREE from 'three';

import { OrbitControls } from './OrbitControls.js';


export { createOrbitCamera }

function createOrbitCamera(canvas)
{
    console.log("canvas",canvas)
    var callbacks = []
    function addCallback(callback)
    {
        callbacks.push(callback)
    }
    var value = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    value.position.set( 20, 20, 20 );

    var controls = new OrbitControls( value, canvas, ()=>{
        for(var callback of callbacks)
        {
            callback()
        }
    });

    var distance = 40; // desired distance
    var vector = new THREE.Vector3();
    vector.subVectors(value.position, controls.target); // vector from target to camera
    vector.setLength(distance); // set vector length to desired distance
    value.position.copy(controls.target).add(vector); // set camera position
    controls.zoomSpeed = 2;
    return {value,controls, addCallback}
}