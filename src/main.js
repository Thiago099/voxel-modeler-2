
import * as THREE from 'three';
import { useGrid } from './js-components/Grid.js';

import { useVoxels } from './js-components/voxel.js';
import { useLights } from './js-components/Lights.js';
import { UseVoxelControl } from './js-components/voxelControl.js';
import data from './js-components/global.js';
import { createRender } from './js-components/three/Renderer.js';

export default useMain
async function useMain(canvas,config)
{



    const renderer = await createRender(canvas)
    const lights = useLights();
    lights.forEach(light => renderer.add(light,"raster"));

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

    renderer.add( useGrid(gridSpacing, gridLength), "raster" );



    const voxel_data = {final_voxels:[]}
    data.addLayer = function()
    {
        const final_voxel = useVoxels(gridSpacing,0,renderer)
        renderer.add( final_voxel.mesh );
        renderer.add( final_voxel.line_mesh , "raster");
        voxel_data.final_voxels.push(final_voxel)
        function select()
        {
            voxel_data.selected = final_voxel
            for(var item of voxel_data.final_voxels)
            {
                item.hide_wireframe()
                // item.enable_ghost()
            }
            final_voxel.show_wireframe()
            // final_voxel.disable_ghost()
        }
        function destroy()
        {
            scene.remove(final_voxel.mesh)
            scene.remove(final_voxel.line_mesh)
            final_voxel.destroy()
            voxel_data.final_voxels.splice(voxel_data.final_voxels.indexOf(final_voxel),1)
        }
        return {select,destroy,...final_voxel}
    }

    const temp_voxel = useVoxels(gridSpacing,1,renderer)
    renderer.add( temp_voxel.mesh );
    renderer.add( temp_voxel.line_mesh , "raster");


    const [voxelMouseDown,voxelMouseUp,voxelMouseMove,undo,redo] = UseVoxelControl(gridSpacing,temp_voxel,voxel_data,config,renderer)





    const mouse = new THREE.Vector2();
    canvas.addEventListener( 'mousemove', onMouseMove );
    document.addEventListener( 'keydown', keyDown );
    document.addEventListener( 'keyup', keyUp );


    
    renderer.camera.controls.enablePan = false;
    renderer.camera.controls.enableRotate = false;
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
            renderer.camera.controls.enableRotate = true;
            renderer.camera.controls.enablePan = true;
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
            renderer.camera.controls.enablePan = false;
            renderer.camera.controls.enableRotate = false;
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

        voxelMouseMove(event,{mouse,shift_key,control_key})
    }
    
    function mouseDown( event ) {

        if(control_key) return;
        voxelMouseDown(event,{mouse,shift_key,control_key})
    }
    
    function mouseUp( event ) {
        voxelMouseUp(event,{mouse,shift_key,control_key})
    }


    function draw()
    {
            
        // raycaster.setFromCamera( mouse, camera );
        // var p = GetSeepAxis(raycaster,"x");
        // mesh.position.copy( p );
        renderer.render();
    }

    return {draw}

}

