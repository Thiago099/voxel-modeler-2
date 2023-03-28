import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';
import canvasResize from './resize.js'
export { initThree }
function initThree(canvas)
{
    var renderer = new THREE.WebGLRenderer({
        antialias:true,
        canvas
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( 0xffffff, 0);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 20, 20, 20 );
    canvasResize(canvas,(width,height)=>{
        renderer.setSize( width, height );
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
    })
    var controls = new OrbitControls( camera, canvas );

    var distance = 40; // desired distance
    var vector = new THREE.Vector3();
    vector.subVectors(camera.position, controls.target); // vector from target to camera
    vector.setLength(distance); // set vector length to desired distance
    camera.position.copy(controls.target).add(vector); // set camera position
    controls.zoomSpeed = 2;

    return {renderer,scene,camera,controls};
}