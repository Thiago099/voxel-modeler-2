

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
function join_array(value)
{
    return value[0]+","+value[1]+","+value[2]
}

function UseVoxelControl(gridSpacing,final_voxel,temp_voxel,config)
{
    var history = [];
    var history_pointer = 0;
    function undo()
    {
        console.log(history_pointer)
        
        if(history_pointer<=1) return;
        history_pointer--;
        var last = history[history_pointer-1]
        console.log(last)
        final_voxel.clear();
        final_voxel.add(last.voxels,last.face_colors);
    }
    function redo()
    {
        if(history_pointer >= history.length) return;
        history_pointer++;
        var last = history[history_pointer-1]
        final_voxel.clear();
        final_voxel.add(last.voxels,last.face_colors);
    }
    function push_history()
    {
        //remove all after pointer
        history = history.slice(0,history_pointer);
        history.push({voxels:JSON.parse(JSON.stringify(final_voxel.voxels)),face_colors:JSON.parse(JSON.stringify(final_voxel.face_colors))});
        if(history.length > 100)
        {
            history.shift();
        }
        else
        {
            history_pointer++;
        }
        
        
    }
 
    push_history()
    function get_plane(origin,direction,normal_direction)
    {
        var result = []
        const visited = new Set();
        loop(origin)
        return result
        function loop(voxel)
        {
            var id = join_array(Object.values(voxel))
            if(!final_voxel.has([voxel.x,voxel.y,voxel.z]) || visited.has(id)) return;
            visited.add(id)
            result.push(voxel)
            var nv = {...voxel}
            nv[direction] += normal_direction
            if(direction != "x")
            {
                if(!final_voxel.has([nv.x+1,nv.y,nv.z]))
                loop({x:voxel.x+1,y:voxel.y,z:voxel.z})
                if(!final_voxel.has([nv.x-1,nv.y,nv.z]))
                loop({x:voxel.x-1,y:voxel.y,z:voxel.z})
            }
            if(direction != "y")
            {
                if(!final_voxel.has([nv.x,nv.y+1,nv.z]))
                loop({x:voxel.x,y:voxel.y+1,z:voxel.z})
                if(!final_voxel.has([nv.x,nv.y-1,nv.z]))
                loop({x:voxel.x,y:voxel.y-1,z:voxel.z})
            }
            if(direction != "z")
            {
                if(!final_voxel.has([nv.x,nv.y,nv.z+1]))
                loop({x:voxel.x,y:voxel.y,z:voxel.z+1})
                if(!final_voxel.has([nv.x,nv.y,nv.z-1]))
                loop({x:voxel.x,y:voxel.y,z:voxel.z-1})


            }
        }
    }

    var prev = null;
    var dragging = false;
    var button = 0;
    var box_state = "undefined"
    var snap_axis = "undefined"
    var box_position = null;
    var snap_center = null;
    var extrude_points = []
    const raycaster = new THREE.Raycaster();
    function MouseDown(event,{mouse,control_key},camera)
    {
        if(control_key) return;
        raycaster.setFromCamera( mouse, camera );
        ray_cast(raycaster, (point,origin,direction, normal_direction)=>{
            if(config.tool == "Box" || config.tool == "Plane")
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
            if(config.tool == "Extrude")
            {
                if(origin == null) return
                snap_center = origin
                dragging = true;
                extrude_points = get_plane(origin,direction,normal_direction)
                snap_axis = direction
                prev = point;

                if(event.button == 2)
                {
                    temp_voxel.add(final_voxel.voxels,final_voxel.face_colors)
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

                function extrude()
                {
                    var snap = SnapToAxis(raycaster,snap_axis,camera,snap_center)
                    var y = snap_value_to_grid(snap[snap_axis])
                    var start = prev[snap_axis]
                    var end = y
                    if(start > end)
                    {
                        var temp = start
                        start = end
                        end = temp
                    }
                    end += 1

                    var points = []
                    for(var i = start; i < end; i++)
                    {
                        for(var j = 0; j < extrude_points.length; j++)
                        {
                            var position = {...extrude_points[j]}
                            position[snap_axis] = i
                            points.push([position.x,position.y,position.z])
                        }
                    }
                    return points
                }

                if (config.tool == "Box" || config.tool == "Plane")
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
                    else if (config.tool == "Extrude")
                    {
   
                        temp_voxel.clear()
                        temp_voxel.add(extrude())
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
                    else if (config.tool == "Extrude")
                    {
   
                        temp_voxel.clear()
                        temp_voxel.add(final_voxel.voxels,final_voxel.face_colors)
                        temp_voxel.remove(...extrude())
                    }
                }
            })

        }
    }
    function MouseUp(event,{mouse,control_key},camera)
    {
        if(control_key) return;
        if(box_state == "end")
        {
            box_state = "undefined";
            push_history()

            return
        }
        if(box_state == "start")
        {
            if(config.tool == "Box")
            {

                snap_center = box_position
                box_state = "end";
            }
            else if(config.tool == "Plane")
            {
                if(button == 2)
                {
                    final_voxel.clear();
                    final_voxel.show();
                }
                box_state = "undefined"
                final_voxel.add(temp_voxel.voxels,temp_voxel.face_colors);
                temp_voxel.clear();
                push_history()
            }
            return;
        }
        if(button == 2 && dragging)
        {
            final_voxel.clear();
            final_voxel.show();
        }
        if(button == 0 || button == 2)
        {
            final_voxel.add(temp_voxel.voxels,temp_voxel.face_colors);
            temp_voxel.clear();
            push_history()
        }
        dragging = false;
    }

    return [MouseDown,MouseUp,MouseMove,undo,redo]

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
    function get_normal_direction(direction)
    {
        if(direction.x > 0) return 1
        if(direction.y > 0) return 1
        if(direction.z > 0) return 1
        if(direction.x < 0) return -1
        if(direction.y < 0) return -1
        if(direction.z < 0) return -1
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


            callback(snap_point,snap_origin, get_axis(direction),get_normal_direction(direction))
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
