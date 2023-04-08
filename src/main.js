import * as THREE from 'three'
import { createOrbit } from './js-components/three/components/orbit.js'
import { CreateGrid } from './js-components/three/objets/Grid.js'
import { CreateRenderer  } from './js-components/three/components/renderer.js'
import { CreateLights } from './js-components/three/objets/lights.js'
import { CreateVoxel } from './js-components/three/objets/voxel.js'

import { createUserInput } from './js-components/three/components/user-input.js'
export default useMain


async function useMain(canvas_container, raster_canvas,render_canvas,config)
{

    const orbit = createOrbit(canvas_container)
    const renderer = CreateRenderer(raster_canvas,orbit)



    renderer.add( orbit.camera );
    renderer.add( CreateGrid(10) );
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
    renderer.add( voxel.wireframeMesh );

    function onMouseDown(event, {point,origin,axis,normal_direction})
    {
        if(event.button == 0)
        {
            voxel.add(point)
        }
        //remove
        else if(event.button == 2)
        {
            if(origin == null) return
            voxel.remove(origin)
        }
        voxel.compute()
    }

   createUserInput(orbit,canvas_container,[voxel.mesh],onMouseDown)

    function draw()
    {
        renderer.render();
    }

    return {draw}

}
