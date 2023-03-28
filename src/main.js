
import * as THREE from 'three';
import { useGrid } from './js-components/Grid.js';

import { useVoxels } from './js-components/voxel.js';
import { useLights } from './js-components/Lights.js';
import { initThree } from './js-components/initThree.js';
import { UseVoxelControl } from './js-components/voxelControl.js';
export default useMain
function useMain(canvas)
{
    const {renderer,scene,camera,controls} = initThree(canvas);

    const lights = useLights();
    lights.forEach(light => scene.add(light));

    // shaded cube
    // var geometry = new THREE.BoxGeometry( 10, 10, 10 );
    // const material = new THREE.MeshStandardMaterial({
    //     color: 'cyan', // Set the base color to white
    //     metalness: 0.5, // Adjust the metalness and roughness properties
    //     roughness: 0.5,
    //   });
    // mesh = new THREE.Mesh( geometry, material );
    //     scene.add( mesh );    


    const gridSpacing = 5
    const gridLength = 50

    scene.add( useGrid(gridSpacing, gridLength) );

    const voxel = useVoxels(gridSpacing)
    const [voxel_mesh] = voxel

    const [voxelMouseDown] = UseVoxelControl(gridSpacing,voxel)

    scene.add( voxel_mesh );




    const mouse = new THREE.Vector2();
    canvas.addEventListener( 'mousemove', onMouseMove );
    canvas.addEventListener( 'keydown', keyDown );
    canvas.addEventListener( 'keyup', keyUp );
    canvas.tabIndex = 1;
    canvas.focus();

    function onMouseMove( event ) {
        mouse.x = ( event.offsetX / canvas.width ) * 2 - 1;
        mouse.y = - ( event.offsetY / canvas.height ) * 2 + 1;
    }
    
    controls.enablePan = false;
    controls.enableRotate = false;
    var control_key = false;

    function keyDown( event ) {
        if(event.key == "Control")
        {
            controls.enableRotate = true;
            controls.enablePan = true;
            control_key = true;

        }
    }
    function keyUp( event ) {
        if(event.key == "Control")
        {
            controls.enablePan = false;
            controls.enableRotate = false;
            control_key = false;

        }
    }
    canvas.addEventListener( 'mousedown', mouseDown );

    const raycaster = new THREE.Raycaster();
    
    function mouseDown( event ) {
        if(event.button != 0 && event.button != 2) return;
        if(control_key) return;
            raycaster.setFromCamera( mouse, camera );
            voxelMouseDown(event,raycaster)
    }
    
    function draw()
    {
        // raycaster.setFromCamera( mouse, camera );
        // var p = GetSeepAxis(raycaster,"x");
        // mesh.position.copy( p );
        renderer.render( scene, camera );
    }

    return {draw}

}

