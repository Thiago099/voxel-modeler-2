
import * as THREE from 'three';
import { useGrid } from './js-components/Grid.js';

import { useVoxels } from './js-components/voxel.js';
import { useLights } from './js-components/Lights.js';
import { initThree } from './js-components/InitThree.js';
import { UseVoxelControl } from './js-components/voxelControl.js';
export default useMain
function useMain(canvas,config)
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


    const gridSpacing = 1
    const gridLength = 10

    scene.add( useGrid(gridSpacing, gridLength) );

    const final_voxel = useVoxels(gridSpacing,0)
    scene.add( final_voxel.mesh );
    scene.add( final_voxel.line_mesh );

    const temp_voxel = useVoxels(gridSpacing,1)
    scene.add( temp_voxel.mesh );
    scene.add( temp_voxel.line_mesh );


    const [voxelMouseDown,voxelMouseUp,voxelMouseMove,undo,redo] = UseVoxelControl(gridSpacing,final_voxel,temp_voxel,config)





    const mouse = new THREE.Vector2();
    canvas.addEventListener( 'mousemove', onMouseMove );
    document.addEventListener( 'keydown', keyDown );
    document.addEventListener( 'keyup', keyUp );


    
    controls.enablePan = false;
    controls.enableRotate = false;
    var control_key = false;
    var shift_key = false;

    function keyDown( event ) {
        // ctrl +z
        if(event.key == "z" && event.ctrlKey)
        {
            undo();
        }
        // ctrl +y
        if(event.key == "y" && event.ctrlKey)
        {
            redo();
        }


        if(event.key == "Control")
        {
            controls.enableRotate = true;
            controls.enablePan = true;
            control_key = true;
        }
        if(event.key == "Shift")
        {
            shift_key = true;
        }

    }
    function keyUp( event ) {
        if(event.key == "Control")
        {
            controls.enablePan = false;
            controls.enableRotate = false;
            control_key = false;
        }
        if(event.key == "Shift")
        {
            shift_key = false;
        }
    }
    canvas.addEventListener( 'mousedown', mouseDown );
    canvas.addEventListener( 'mouseup', mouseUp );



    function onMouseMove( event ) {
        mouse.x = ( event.offsetX / canvas.width ) * 2 - 1;
        mouse.y = - ( event.offsetY / canvas.height ) * 2 + 1;

        voxelMouseMove(event,{mouse,shift_key,control_key},camera)
    }
    
    function mouseDown( event ) {

        if(control_key) return;
        voxelMouseDown(event,{mouse,shift_key,control_key},camera)
    }
    
    function mouseUp( event ) {
        voxelMouseUp(event,{mouse,shift_key,control_key},camera)
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

