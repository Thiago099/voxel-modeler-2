

import * as THREE from 'three';
import {lineBetweenPoints} from "./lineBetweenPoints.js";
export {UseVoxelControl}
// define the fixed axis (Y-axis in this case)
const axis = new THREE.Vector3(0, 1, 0);

// define a point on the fixed axis
const point = new THREE.Vector3(0, 0, 0);

// define a plane that is perpendicular to the fixed axis and passes through the point
const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(axis, point);
function UseVoxelControl(gridSpacing,final_voxel,temp_voxel)
{
    var prev = null;
    var dragging = false;
    var button = 0;
    const raycaster = new THREE.Raycaster();
    function MouseDown(event,mouse,camera)
    {
        raycaster.setFromCamera( mouse, camera );
        ray_cast(raycaster, (point,origin)=>{
            if(event.button == 0)
            {
                dragging = true;
                prev = point;
            }
            else if(event.button == 2)
            {
                dragging = true;
                prev = origin ?? point;
                temp_voxel.add(...final_voxel.voxels)
                final_voxel.hide();
            }
        })
        button = event.button;
    }
    function MouseMove(event,mouse,camera)
    {
        if(dragging)
        {
            raycaster.setFromCamera( mouse, camera );
            ray_cast(raycaster, (point,origin)=>{
                if(button == 0)
                {
                    temp_voxel.add(...lineBetweenPoints(...[point.x,point.y,point.z],...[prev.x,prev.y,prev.z]));
                    prev = point;
                    // add([point.x,point.y,point.z]);
                }
                else if(button == 2)
                {
                    console.log(origin,point)
                    var cur = origin ?? point;
                    temp_voxel.remove(...lineBetweenPoints(...[cur.x,cur.y,cur.z],...[prev.x,prev.y,prev.z]));
                    prev =cur;
                    // remove([origin.x,origin.y,origin.z]);
                }
            })

        }
    }
    function MouseUp(event,mouse,camera)
    {
        if(button == 2 && dragging)
        {
            final_voxel.clear();
            final_voxel.show();
        }
        final_voxel.add(...temp_voxel.voxels);
        temp_voxel.clear();
        dragging = false;
    }

 
    return [MouseDown,MouseUp,MouseMove]

    function snap_point_to_grid(point)
    {
        var snap = gridSpacing;
        point.x = Math.floor(point.x/snap);
        point.y = Math.floor(point.y/snap);
        point.z = Math.floor(point.z/snap);
        return point;
    }

    
    function ray_cast(raycaster,callback)
    {

        const intersects = raycaster.intersectObjects( [final_voxel.mesh]/*scene.children*/ );
     
        if ( intersects.length > 0 ) {
            var point = intersects[0].point;
            var direction = intersects[0].face.normal.clone();
            var intersect_mesh = intersects[0].object;
            direction.transformDirection( intersect_mesh.matrixWorld );
            var point = intersects[0].point.clone();
            var origin = intersects[0].point.clone();
            // increment the point by gridSpacing * direction
            point.addScaledVector(direction, gridSpacing/2);
            origin.addScaledVector(direction, -gridSpacing/2);

            var snap_point =  snap_point_to_grid(point)
            var snap_origin =  snap_point_to_grid(origin)

            callback(snap_point,snap_origin)
        }
        else
        {
            const point = new THREE.Vector3();
            raycaster.ray.intersectPlane( plane ,point);
            point.y+=0.1
            var snap_point =  snap_point_to_grid(point)
            callback(snap_point)
        }
    }
}
