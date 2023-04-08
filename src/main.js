import * as THREE from 'three'
import { createOrbit } from './js-components/three/components/orbit.js'
import { CreateGrid } from './js-components/three/tools/Grid.js'
import { CreateRenderer  } from './js-components/three/components/renderer.js'
import { CreateLights } from './js-components/lights.js'
import { CreateVoxel } from './js-components/three/components/voxel.js'
export default useMain
async function useMain(canvas_container, raster_canvas,render_canvas,config)
{

    const orbit = createOrbit(canvas_container)
    const renderer = CreateRenderer(raster_canvas,orbit)

    const gridSpacing = 1
    const gridLength = 10
    
    renderer.add( orbit.camera );
    renderer.add( CreateGrid(gridSpacing, gridLength) );
    CreateLights().map(x => renderer.add( x ));
    const voxel = CreateVoxel()


    // var planeGeometry = new THREE.PlaneGeometry( 100, 100, 32 );
    // var planeMaterial = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
    // var plane = new THREE.Mesh( planeGeometry, planeMaterial );
    // plane.receiveShadow = true;
    // plane.castShadow = true;
    // plane.rotation.x = -Math.PI/2
    // renderer.add( plane );
    

    renderer.add( voxel.mesh );

    function draw()
    {
        renderer.render();
    }

    return {draw}

}

