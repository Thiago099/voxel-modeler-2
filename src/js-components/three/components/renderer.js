import * as THREE from 'three'
import { canvasResize } from '../lib/canvas-resize.js'
export { CreateRenderer }
function CreateRenderer(canvas,orbit)
{
    const renderer = new THREE.WebGLRenderer({
        antialias:true,
        canvas
    });




    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; //THREE.BasicShadowMap | THREE.PCFShadowMap |  THREE.VSMShadowMap | THREE.PCFSoftShadowMap
    renderer.shadowMap.soft = true;
    renderer.shadowMap.bias = -0.0001;
    renderer.shadowMap.darkness = 1;
    renderer.shadowMap.width = 2048;
    renderer.shadowMap.height = 2048;
    








    renderer.setPixelRatio( window.devicePixelRatio );
    
    renderer.setClearColor( 0xffffff, 0);

    const scene = new THREE.Scene();

    
    canvasResize(canvas,(width,height)=>{
        renderer.setSize( width, height );
        orbit.camera.aspect = width / height;
        orbit.camera.updateProjectionMatrix();
    })

    function render()
    {
        renderer.render( scene, orbit.camera );
    }
    function add(object)
    {
        scene.add(object)
    }

    return {render, add}

}