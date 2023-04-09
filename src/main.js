import * as THREE from 'three'
import { createOrbit } from './js-components/three/components/orbit.js'
import { CreateGrid } from './js-components/three/objets/Grid.js'
import { CreateRenderer  } from './js-components/three/components/renderer.js'
import { CreateLights } from './js-components/three/objets/lights.js'
import { CreateVoxel } from './js-components/three/objets/voxel.js'
import { lineBetweenPoints } from './js-components/point-math/line-between-points.js'

import { SnapToAxis } from './js-components/three/lib/snap-to-axis.js'
import { createUserInput } from './js-components/three/components/user-input.js'

import { getPointsInSphere } from './js-components/point-math/shape.js'

import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import { boxBetweenTwoPoints } from './js-components/three/lib/boxBetweenTwoPoints.js' 


import global from './global.js'

export default useMain


async function useMain(canvas_container, raster_canvas,render_canvas)
{

    const orbit = createOrbit(canvas_container)
    const renderer = CreateRenderer(raster_canvas,orbit)



       

    renderer.add( orbit.camera );
    renderer.add( CreateGrid(10) );

    CreateLights().map(x => renderer.add( x ));


    const voxel = CreateVoxel()

    global.voxel = voxel

    renderer.add( voxel.mesh );
    renderer.add( voxel.wireframeMesh );

    const tmp_voxel = CreateVoxel(2)
    renderer.add( tmp_voxel.mesh );
    renderer.add( tmp_voxel.wireframeMesh );


    let action = null
    let previous_point = null
    let snap_axis = null
    let snap_center = null

    var history = []
    var history_pointer = 0

    function pushHistory()
    {
        history = history.slice(0,history_pointer)
        history.push(JSON.parse(JSON.stringify(voxel.voxels)))
        if(history.length > 100)
        {
            history.shift()
        } 
        else
        {
            history_pointer++
        }
    }
    global.pushHistory = pushHistory
    function undo()
    {
        if(history_pointer <= 1) return
        history_pointer--
        voxel.replace(JSON.parse(JSON.stringify(history[history_pointer-1])))
    }
    function redo()
    {
        if(history_pointer >= history.length) return
        history_pointer++
        voxel.replace(JSON.parse(JSON.stringify(history[history_pointer-1])))
    }

    document.addEventListener( 'keydown', (event) => {
        if(event.key == "z" && event.ctrlKey)
        {
            undo()
        }
        else if(event.key == "y" && event.ctrlKey)
        {
            redo()
        }
    });


    pushHistory()
    function onMouseDown(event, {point,origin,axis,normal_direction})
    {
        if(action == 'box-add-extrude')
        {
            voxel.add(tmp_voxel.voxels)
            tmp_voxel.clear()
            action = null
            pushHistory()
            return;
        }
        else if(action == 'box-remove-extrude')
        {
            voxel.replace(tmp_voxel.voxels)
            tmp_voxel.clear()
            action = null
            pushHistory()
            return;
        }
        else if(action == 'box-paint-foreground-extrude')
        {
            voxel.replace(tmp_voxel.voxels)
            tmp_voxel.clear()
            action = null
            pushHistory()
            return;
        }
        if(global.mode == "Paint")
        {
            tmp_voxel.replace(JSON.parse(JSON.stringify(voxel.voxels)))
            voxel.hide()
            if(event.button == 0)
            {
    
                //set color of the current point
                if(global.tool == "Box")
                {
                    if(origin != null)
                    {
                        tmp_voxel.setColor([origin],global.foreground)
                    }

                    action = 'box-paint-foreground'
                    snap_axis = axis
                }
                else
                {
                    if(origin != null)
                    {
                        tmp_voxel.setColor(getPointsInSphere(origin, global.brushSize),global.foreground)
                    }
                    action = 'foreground'
                }
            }
            else if(event.button == 2)
            {
                if(global.tool == "Box")
                {
                    if(origin != null)
                    {
                        tmp_voxel.setColor([origin],global.background)
                    }
                    action = 'box-paint-background'
                    snap_axis = axis
                }
                else
                {
                    if(origin != null)
                    {
                        voxel.setColor(getPointsInSphere(origin, global.brushSize),global.background)
                    }
                    action = 'background'

                }
            }
            previous_point = origin ?? point
        }
        else
        {
            if(event.button == 0)
            {
                var item = getPointsInSphere(point, global.brushSize)
                tmp_voxel.add(item,true)
                previous_point = point
                if(global.tool == "Box")
                {
                    action = "box-add"
                    snap_axis = axis
                }
                else
                {
                    action = 'add'
                }
            }
            else if(event.button == 2)
            {
                const current = origin ?? point
                tmp_voxel.replace(voxel.voxels)
                tmp_voxel.remove(getPointsInSphere(current, global.brushSize))
                voxel.hide()
                if(global.tool == "Box")
                {
                    action = 'box-remove'
                    snap_axis = axis
                }
                else
                {
                    action = 'remove'
                }
                previous_point = current
            }
        }
    }
    function onMouseMove(event, {point,origin,axis,normal_direction,raycaster})
    {
        if(action == 'add')
        {
            if(global.tool == "Pen")
            {
                tmp_voxel.add(lineBetweenPoints(previous_point,point).map(x=>getPointsInSphere(x, global.brushSize)).flat(),true)
                previous_point = point
            }
            else if (global.tool == "Line")
            {
                tmp_voxel.clear()
                tmp_voxel.add([previous_point,...lineBetweenPoints(previous_point,point).map(x=>getPointsInSphere(x, global.brushSize)).flat()],true)
            }
            else if (global.tool == "Plane")
            {
                tmp_voxel.clear()
                tmp_voxel.add(boxBetweenTwoPoints(previous_point,point),true)
            }
        }
        else if(action == 'remove')
        {
            if(global.tool == "Pen")
            {
                if(origin == null) return
                tmp_voxel.remove(lineBetweenPoints(previous_point,origin).map(x=>getPointsInSphere(x, global.brushSize)).flat())
                previous_point = origin
            }
            else if (global.tool == "Line")
            {
                const current = origin ?? point
                tmp_voxel.replace(voxel.voxels)
                tmp_voxel.remove([previous_point,...lineBetweenPoints(previous_point,current)])
            }
            else if (global.tool == "Plane")
            {
                const current = origin ?? point
                tmp_voxel.replace(voxel.voxels)
                tmp_voxel.remove(boxBetweenTwoPoints(previous_point,current))
            }
        }
        else if(action == 'box-add')
        {
            snap_center = point
            tmp_voxel.clear()
            tmp_voxel.add(boxBetweenTwoPoints(previous_point,point),true)
        }
        else if(action == 'box-add-extrude')
        {
            tmp_voxel.clear()
            var snap = SnapToAxis(raycaster,snap_axis,orbit.camera,snap_center)
            var position = {...snap_center}
            position[snap_axis] = Math.floor(snap[snap_axis])
            tmp_voxel.add(boxBetweenTwoPoints(previous_point,position),true)
        }
        else if(action == 'box-remove')
        {
            snap_center = point ?? origin
            tmp_voxel.replace(voxel.voxels)
            tmp_voxel.remove(boxBetweenTwoPoints(previous_point,point))
        }
        else if(action == 'box-remove-extrude')
        {
            tmp_voxel.replace(voxel.voxels)
            var snap = SnapToAxis(raycaster,snap_axis,orbit.camera,snap_center)
            var position = {...snap_center}
            position[snap_axis] = Math.floor(snap[snap_axis])
            tmp_voxel.remove(boxBetweenTwoPoints(previous_point,position),true)
        }
        else if(action == 'box-paint-foreground')
        {
            snap_center = point ?? origin
            tmp_voxel.replace(JSON.parse(JSON.stringify(voxel.voxels)))
            tmp_voxel.setColor(boxBetweenTwoPoints(previous_point,point),global.foreground)
        }
        else if(action == 'box-paint-foreground-extrude')
        {
            tmp_voxel.replace(JSON.parse(JSON.stringify(voxel.voxels)))
            var snap = SnapToAxis(raycaster,snap_axis,orbit.camera,snap_center)
            var position = {...snap_center}
            position[snap_axis] = Math.floor(snap[snap_axis])
            tmp_voxel.setColor(boxBetweenTwoPoints(previous_point,position),global.foreground)
        }
        else if(action == 'foreground')
        {
            paint(global.foreground)
        }
        else if(action == 'background')
        {
           paint(global.background)
        }
        function paint(color)
        {
            if(global.tool == "Pen")
            {
                if(origin == null) return
                tmp_voxel.setColor(lineBetweenPoints(previous_point,origin).map(x=>getPointsInSphere(x, global.brushSize)).flat(),color)
                previous_point = origin
            }
            else if (global.tool == "Line")
            {
                const current = origin ?? point
                tmp_voxel.replace(JSON.parse(JSON.stringify(voxel.voxels)))
                tmp_voxel.setColor([previous_point,...lineBetweenPoints(previous_point,current).map(x=>getPointsInSphere(x, global.brushSize)).flat()],color)
            }
            else if (global.tool == "Plane")
            {
                const current = origin ?? point
                tmp_voxel.replace(JSON.parse(JSON.stringify(voxel.voxels)))
                tmp_voxel.setColor(boxBetweenTwoPoints(previous_point,current),color)
            }
        }
    }
    function onMouseUp(event)
    {

        if(action == 'add')
        {
            voxel.add(tmp_voxel.voxels)
            tmp_voxel.clear()
        }
        else if(action == 'remove' || action == 'background' || action == 'foreground')
        {
            voxel.replace(tmp_voxel.voxels)
            tmp_voxel.clear()
            voxel.show()
        }
        if(action == "box-add")
        {
            action = "box-add-extrude"
            return
        }
        if(action == "box-remove")
        {
            action = "box-remove-extrude"
            return
        }
        if(action == "box-paint-foreground")
        {
            action = "box-paint-foreground-extrude"
            return
        }
        if(action == "box-paint-background")
        {
            action = "box-paint-background-extrude"
            return
        }
        voxel.show()
        if(action != null) pushHistory()
        action = null
    }

   createUserInput(orbit,canvas_container,[voxel.mesh],onMouseDown,onMouseMove,onMouseUp)

    function draw()
    {
        renderer.render();
    }

    return {draw}

}
