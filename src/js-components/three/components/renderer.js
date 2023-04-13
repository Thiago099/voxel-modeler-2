import * as THREE from 'three'
import { canvasResize } from '../lib/canvas-resize.js'
export { CreateRenderer }

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
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

    var composer = new EffectComposer( renderer );




    const ssaoPass = new SSAOPass( scene, orbit.camera, 1000, 1000 );
    ssaoPass.kernelRadius = 1;
    ssaoPass.minDistance = 1e-10;
    ssaoPass.maxDistance = 0.1;
    //quality
    


    composer.addPass( ssaoPass );

    ssaoPass.output = SSAOPass.OUTPUT.Default;

    
    canvasResize(canvas,(width,height)=>{
        renderer.setSize( width, height );
        orbit.camera.aspect = width / height;
        orbit.camera.updateProjectionMatrix();
        composer.setSize( width, height );
        ssaoPass.setSize( width, height );
    })

    function render()
    {
        composer.render();
    }
    function add(object)
    {
        scene.add(object)

    
        
    }

    return {render, add}

}