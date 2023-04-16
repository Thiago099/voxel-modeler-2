import * as THREE from 'three'
import { createOrbit } from './js-components/three/components/orbit.js'
import { CreateGrid } from './js-components/three/objects/Grid.js'
import { CreateRenderer  } from './js-components/three/components/renderer.js'
import { CreateLights } from './js-components/three/objects/lights.js'
import { CreateVoxel } from './js-components/three/objects/voxel.js'
import { lineBetweenPoints } from './js-components/point-math/line-between-points.js'

import { SnapToAxis } from './js-components/three/lib/snap-to-axis.js'
import { createUserInput } from './js-components/three/components/user-input.js'

import { getPointsInShape } from './js-components/point-math/shape.js'

import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import { boxBetweenTwoPoints } from './js-components/point-math/boxBetweenTwoPoints.js' 
import { CreateMirror } from './js-components/three/objects/mirror.js'

import { getPane } from './js-components/point-math/selection.js'

import global from './global.js'
import { CreateRaytraceRenderer } from './js-components/three/components/raytrace/raytraceRenderer.js'

export default useMain



async function useMain(canvas_container, raster_canvas,render_canvas)
{

    const orbit = createOrbit(canvas_container)

    global.orbit = orbit

    const renderer = CreateRenderer(raster_canvas,orbit)

    const raytraceRenderer = await CreateRaytraceRenderer(render_canvas,orbit)

    orbit.addCallback( raytraceRenderer.setMovingCamera )

    var target = "raster"
    global.setTarget = (t) => {
        target = t
        if(target == "raster")
        {
            raster_canvas.style.display = "block"
            render_canvas.style.display = "none"
            raytraceRenderer.disable()
        }
        else
        {
            raster_canvas.style.display = "none"
            render_canvas.style.display = "block"
            raytraceRenderer.enable()
        }
    }


    renderer.add( orbit.camera );
    renderer.add( CreateGrid(10) );


    CreateLights().map(x => renderer.add( x ));
    CreateMirror(global).map(x => renderer.add( x ));

    const voxel = CreateVoxel()

    voxel.addCallback( raytraceRenderer.build )

    global.voxel = voxel

    renderer.add( voxel.mesh );
    renderer.add( voxel.wireframeMesh );

    raytraceRenderer.add( ()=> {return {geometry:voxel.geometry,albedo:voxel.material.map}} );
       

    const tmp_voxel = CreateVoxel(2)


    tmp_voxel.addCallback( raytraceRenderer.build )

    renderer.add( tmp_voxel.mesh );
    renderer.add( tmp_voxel.wireframeMesh );

    raytraceRenderer.add( ()=> {return {geometry:tmp_voxel.geometry,albedo:tmp_voxel.material.map}} );



    let action = null
    let previous_point = null
    let snap_axis = null
    let snap_center = null
    let snap_direction = null
    let extrude_points = null

    var history = []
    var history_pointer = 0

    function pushHistory()
    {
        history = history.slice(0,history_pointer)
        history.push(JSON.stringify(voxel.getVoxels()))
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
        voxel.clear()
        voxel.add(JSON.parse(history[history_pointer-1]))
    }
    function redo()
    {
        if(history_pointer >= history.length) return
        history_pointer++
        voxel.clear()
        voxel.add(JSON.parse(history[history_pointer-1]))
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

        if(event.button == 1)
        {
            global.foreground = voxel.getColor(origin)
            global.foreground.a = 1
            global.colorDisplay.$update()
            return
        }
        if(action == 'box-add-extrude')
        {
            voxel.add(tmp_voxel.getVoxels())
            tmp_voxel.clear()
            action = null
            voxel.show()
            pushHistory()
            return;
        }
        else if(action == 'box-remove-extrude')
        {
            voxel.replace(tmp_voxel.chunks,true)
            tmp_voxel.clear()
            action = null
            voxel.show()
            pushHistory()
            return;
        }
        else if(action == 'box-paint-foreground-extrude')
        {
            voxel.replace(tmp_voxel.chunks,true)
            tmp_voxel.clear()
            action = null
            voxel.show()
            pushHistory()
            return;
        }
        else if(action == 'box-paint-background-extrude')
        {
            voxel.replace(tmp_voxel.chunks,true)
            tmp_voxel.clear()
            action = null
            voxel.show()
            pushHistory()
            return;
        }
        if(global.mode == "Paint")
        {
            tmp_voxel.replace(voxel.chunks,true)
            voxel.hide()
            if(event.button == 0)
            {
    
                //set color of the current point
                if(global.tool == "Box")
                {
                    if(origin != null)
                    {
                        tmp_voxel.setColor([origin],global.foreground)
                        snap_center = origin
                    }
                    action = 'box-paint-foreground'
                    snap_axis = axis
                }
                else
                {
                    if(origin != null)
                    {
                        tmp_voxel.setColor(getPointsInShape(origin, global.brushSize,axis),global.foreground)
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
                        snap_center = origin
                    }
                    action = 'box-paint-background'
                    snap_axis = axis
                }
                else
                {
                    if(origin != null)
                    {
                        tmp_voxel.setColor(getPointsInShape(origin, global.brushSize,axis),global.background)
                    }
                    action = 'background'

                }
            }
            previous_point = origin ?? point
        }
        else
        {
            if(global.tool == "Extrude")
            {
                if(origin == null) return
                previous_point = origin
                snap_axis = axis
                snap_direction = normal_direction
                extrude_points = getPane(origin,axis,normal_direction)
                tmp_voxel.replace(voxel.chunks)
                voxel.hide()
                action = 'extrude'
                return
            }
            if(global.tool == "Move")
            {
                if(origin == null) return
                previous_point = origin 
                snap_axis = axis
                snap_direction = normal_direction
                tmp_voxel.replace(voxel.chunks)
                voxel.hide()
                action = 'move'
                return
            }
            if(event.button == 0)
            {

                previous_point = point
                if(global.tool == "Box")
                {
                    action = "box-add"
                    snap_center = point
                    snap_axis = axis
                    tmp_voxel.add([point],true)
                }
                else
                {
                    var item = getPointsInShape(point, global.brushSize,axis)
                    tmp_voxel.add(item,true)
                    action = 'add'
                }
            }
            else if(event.button == 2)
            {
                const current = origin ?? point
                tmp_voxel.replace(voxel.chunks)
                voxel.hide()
                if(global.tool == "Box")
                {
                    action = 'box-remove'
                    snap_center = current
                    snap_axis = axis
                    tmp_voxel.remove([current],true)
                }
                else
                {
                    tmp_voxel.remove(getPointsInShape(current, global.brushSize,axis))
                    action = 'remove'
                }
                previous_point = current
            }
        }
    }
    function onMouseMove(event, {point,origin,axis,normal_direction,raycaster})
    {
        if(action == "move")
        {
            var snap = SnapToAxis(raycaster,snap_axis,orbit.camera,previous_point)
            var tmp = voxel.getVoxels().map(x=>({...x}))
            var snap = Math.floor(snap[snap_axis])- (snap_direction<0?-1:0)
            for(var i = 0; i < tmp.length; i++)
            {
                if(tmp[i].layer != global.selected_layer.id) continue

                tmp[i][snap_axis] = tmp[i][snap_axis] - previous_point[snap_axis] + snap
            }
            tmp_voxel.clear()
            tmp_voxel.add(tmp,null,true)
        }
        else if(action == 'extrude')
        {
            var snap = SnapToAxis(raycaster,snap_axis,orbit.camera,previous_point)
            var start = previous_point[snap_axis]  - (snap_direction<0?0:-1)
            var end =  Math.floor(snap[snap_axis] )  - (snap_direction<0?0:-1)
            var reverse = snap_direction < 0
            if(start > end)
            {
                var temp = start
                start = end
                end = temp
                reverse = snap_direction > 0
            }
            var points = []
            for(var i = start; i < end; i++)
            {
                for(var j = 0; j < extrude_points.length; j++)
                {
                    var position = {...extrude_points[j]}
                    position[snap_axis] = i
                    points.push({x:position.x,y:position.y,z:position.z})
                }
            }

            if(reverse)
            {
                tmp_voxel.clear()
                tmp_voxel.replace(voxel.chunks)
                tmp_voxel.remove(points)
            }
            else
            {
                tmp_voxel.clear()
                tmp_voxel.replace(voxel.chunks)
                tmp_voxel.add(points,true)
            }
        }
        if(action == 'add')
        {
            if(global.tool == "Pen")
            {
                tmp_voxel.add(lineBetweenPoints(previous_point,point).map(x=>getPointsInShape(x, global.brushSize,axis)).flat(),true)
                previous_point = point
            }
            else if (global.tool == "Line")
            {
                tmp_voxel.clear()
                tmp_voxel.add([previous_point,...lineBetweenPoints(previous_point,point).map(x=>getPointsInShape(x, global.brushSize,axis)).flat()],true)
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
                const current = origin ?? point
                tmp_voxel.remove(lineBetweenPoints(previous_point,current).map(x=>getPointsInShape(x, global.brushSize,axis)).flat())
                previous_point = current
            }
            else if (global.tool == "Line")
            {
                const current = origin ?? point
                tmp_voxel.replace(voxel.chunks)
                tmp_voxel.remove([previous_point,...lineBetweenPoints(previous_point,current).map(x=>getPointsInShape(x, global.brushSize,axis)).flat()])
            }
            else if (global.tool == "Plane")
            {
                const current = origin ?? point
                tmp_voxel.replace(voxel.chunks)
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
            tmp_voxel.replace(voxel.chunks)
            tmp_voxel.remove(boxBetweenTwoPoints(previous_point,point))
        }
        else if(action == 'box-remove-extrude')
        {
            tmp_voxel.replace(voxel.chunks)
            var snap = SnapToAxis(raycaster,snap_axis,orbit.camera,snap_center)
            var position = {...snap_center}
            position[snap_axis] = Math.floor(snap[snap_axis])
            tmp_voxel.remove(boxBetweenTwoPoints(previous_point,position),true)
        }
        else if(action == 'box-paint-foreground')
        {
            snap_center = point ?? origin
            tmp_voxel.replace(voxel.chunks)
            tmp_voxel.setColor(boxBetweenTwoPoints(previous_point,point),global.foreground)
        }
        else if(action == 'box-paint-foreground-extrude')
        {
            tmp_voxel.replace(voxel.chunks)
            var snap = SnapToAxis(raycaster,snap_axis,orbit.camera,snap_center)
            var position = {...snap_center}
            position[snap_axis] = Math.floor(snap[snap_axis])
            tmp_voxel.setColor(boxBetweenTwoPoints(previous_point,position),global.foreground)
        }
        else if(action == 'box-paint-background')
        {
            snap_center = point ?? origin
            tmp_voxel.replace(voxel.chunks)
            tmp_voxel.setColor(boxBetweenTwoPoints(previous_point,point),global.background)
        }
        else if(action == 'box-paint-background-extrude')
        {
            tmp_voxel.replace(voxel.chunks)
            var snap = SnapToAxis(raycaster,snap_axis,orbit.camera,snap_center)
            var position = {...snap_center}
            position[snap_axis] = Math.floor(snap[snap_axis])
            tmp_voxel.setColor(boxBetweenTwoPoints(previous_point,position),global.background)
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
                tmp_voxel.setColor(lineBetweenPoints(previous_point,origin).map(x=>getPointsInShape(x, global.brushSize,axis)).flat(),color)
                previous_point = origin
            }
            else if (global.tool == "Line")
            {
                const current = origin ?? point
                tmp_voxel.replace(voxel.chunks)
                tmp_voxel.setColor([previous_point,...lineBetweenPoints(previous_point,current)].map(x=>getPointsInShape(x, global.brushSize,axis)).flat(),color)
            }
            else if (global.tool == "Plane")
            {
                const current = origin ?? point
                tmp_voxel.replace(voxel.chunks)
                tmp_voxel.setColor(boxBetweenTwoPoints(previous_point,current),color)
            }
        }
    }
    function onMouseUp(event)
    {

        if(action == 'add')
        {
            voxel.add(tmp_voxel.getVoxels())
            tmp_voxel.clear()
        }
        else if(action == 'remove' || action == 'background' || action == 'foreground' || action == 'extrude' || action == 'move')
        {
            voxel.replace(tmp_voxel.chunks,true)
            tmp_voxel.clear()
            voxel.show()
            voxel.clearPaintIteration()
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
            voxel.clearPaintIteration()
            return
        }
        if(action == "box-paint-background")
        {
            action = "box-paint-background-extrude"
            voxel.clearPaintIteration()
            return
        }
        voxel.show()
        if(action != null) pushHistory()
        action = null
    }

   createUserInput(orbit,canvas_container,[voxel.mesh],onMouseDown,onMouseMove,onMouseUp)

    function draw()
    {
        if(target == "raster")
        {
            renderer.render();
            if(global.saveRequest)
            {
                global.saveRequest(raster_canvas.toDataURL("image/png"))
                global.saveRequest = null
            }
        }
        else if(target == "raytrace")
        {
            raytraceRenderer.render();
            if(global.saveRequest)
            {
                global.saveRequest(render_canvas.toDataURL("image/png"))
                global.saveRequest = null
            }
        }

    }

    return {draw}

}
