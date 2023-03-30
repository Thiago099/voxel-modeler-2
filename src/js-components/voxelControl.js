

import * as THREE from 'three';
import {lineBetweenPoints} from "./lineBetweenPoints.js";
import { boxBetweenTwoPoints } from './boxBetweenTwoPoints.js';
import { SnapToAxis } from './snapToAxis.js';
export {UseVoxelControl}
// define the fixed axis (Y-axis in this case)
const axis = new THREE.Vector3(0, 1, 0);

// define a point on the fixed axis
const point = new THREE.Vector3(0, 0, 0);

// define a plane that is perpendicular to the fixed axis and passes through the point
const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(axis, point);
function UseVoxelControl(gridSpacing,final_voxel,temp_voxel,config)
{
    var prev = null;
    var dragging = false;
    var button = 0;
    var box_state = "undefined"
    var snap_axis = "undefined"
    var box_position = null;
    var snap_center = null;
    const raycaster = new THREE.Raycaster();
    function MouseDown(event,{mouse,control_key},camera)
    {
        if(control_key) return;
        raycaster.setFromCamera( mouse, camera );
        ray_cast(raycaster, (point,origin,direction)=>{
            if(config.tool == "Box")
            {
                if(box_state == "undefined")
                {
                    box_state = "start"
                    snap_axis = direction
                    prev = point;
                }
                else if(box_state == "end")
                {
                    if(button == 2)
                    {
                        final_voxel.clear();
                        final_voxel.show();
                    }
                    box_state = "undefined"
                    final_voxel.add(temp_voxel.voxels,temp_voxel.face_colors);
                    temp_voxel.clear();
                }
                dragging = true;
                if(event.button == 2)
                {
                    temp_voxel.add(final_voxel.voxels,final_voxel.face_colors)
                    temp_voxel.remove([prev.x,prev.y,prev.z])
                    final_voxel.hide();
                }
                return
            }
            if(event.button == 0)
            {
                dragging = true;
                temp_voxel.add([[point.x,point.y,point.z]])
                prev = point;
            }
            else if(event.button == 2)
            {
                dragging = true;
                prev = origin ?? point;
                temp_voxel.add(final_voxel.voxels,final_voxel.face_colors)
                temp_voxel.remove([prev.x,prev.y,prev.z])
                final_voxel.hide();
            }
        })
        button = event.button;
    }
    function min_distance_axis(point_a,point_b)
    {
        var x = Math.abs(point_a.x - point_b.x);
        var y = Math.abs(point_a.y - point_b.y);
        var z = Math.abs(point_a.z - point_b.z);
        if(x < y && x < z)
        {
            return "x"
        }
        else if(y < x && y < z)
        {
            return "y"
        }
        else
        {
            return "z"
        }
    }
    function MouseMove(event,{mouse,control_key},camera)
    {
        if(control_key) return;
        if(dragging)
        {
            raycaster.setFromCamera( mouse, camera );
            ray_cast(raycaster, (point,origin,direction)=>{

                if (config.tool == "Box" )
                {

                    var cur
                    if(button == 0)
                    {
                        cur = point; 
                    }
                    else if(button == 2)
                    {
                        cur = origin ?? point;
                    }
                    if(box_state == "start")
                    {
                        box_position = cur;
                    }
                    else if(box_state == "end")
                    {
                        var snap = SnapToAxis(raycaster,snap_axis,camera,snap_center)
                        box_position[snap_axis] = snap_value_to_grid(snap[snap_axis]+1)
                    }

                    if(button == 0)
                    {
                        temp_voxel.clear();
                        temp_voxel.add(boxBetweenTwoPoints(...[box_position.x,box_position.y,box_position.z],...[prev.x,prev.y,prev.z]));
                    }
                    else if(button == 2)
                    {
                        temp_voxel.clear();
                        temp_voxel.add(final_voxel.voxels,final_voxel.face_colors)
                        temp_voxel.remove(...boxBetweenTwoPoints(...[box_position.x,box_position.y,box_position.z],...[prev.x,prev.y,prev.z]));
                    }
                    return
                }
                if(button == 0)
                {
                    if(config.tool == "Pen")
                    {
                        temp_voxel.add(lineBetweenPoints(...[point.x,point.y,point.z],...[prev.x,prev.y,prev.z]));
                        prev = point;
                    }
                    else if (config.tool == "Line")
                    {
                        temp_voxel.clear();
                        temp_voxel.add(lineBetweenPoints(...[point.x,point.y,point.z],...[prev.x,prev.y,prev.z]));
                    }
                    // add([point.x,point.y,point.z]);
                }
                else if(button == 2)
                {
                    
                    var cur = origin ?? point;
                    if(config.tool == "Pen")
                    {
                        temp_voxel.remove(...lineBetweenPoints(...[cur.x,cur.y,cur.z],...[prev.x,prev.y,prev.z]));
                        prev =cur;
                    }
                    else if (config.tool == "Line")
                    {
                        temp_voxel.clear();
                        temp_voxel.add(final_voxel.voxels,final_voxel.face_colors)
                        temp_voxel.remove(...lineBetweenPoints(...[cur.x,cur.y,cur.z],...[prev.x,prev.y,prev.z]));
                    }
                    else if (config.tool == "Box")
                    {
                        temp_voxel.clear();
                        temp_voxel.add(final_voxel.voxels,final_voxel.face_colors)
                        temp_voxel.remove(...boxBetweenTwoPoints(...[cur.x,cur.y,cur.z],...[prev.x,prev.y,prev.z]));
                    }
                    // remove([origin.x,origin.y,origin.z]);
                }
            })

        }
    }
    function MouseUp(event,{mouse,control_key},camera)
    {
        if(control_key) return;
        if(box_state == "start")
        {
            snap_center = box_position

            box_state = "end";
            return;
        }
        if(button == 2 && dragging)
        {
            final_voxel.clear();
            final_voxel.show();
        }
        final_voxel.add(temp_voxel.voxels,temp_voxel.face_colors);
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
    function snap_value_to_grid(value)
    {
        var snap = gridSpacing;
        return Math.floor(value/snap);
    }

    function get_axis(direction)
    {
        if(direction.x != 0)
        {
            return "x"
        }
        if(direction.y != 0)
        {
            return "y"
        }
        if(direction.z != 0)
        {
            return "z"
        }
        return null;


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


            callback(snap_point,snap_origin, get_axis(direction))
        }
        else
        {
            const point = new THREE.Vector3();
            raycaster.ray.intersectPlane( plane ,point);
            point.y+=0.1
            var snap_point =  snap_point_to_grid(point)
            callback(snap_point, null,"y")
        }
    }
}
