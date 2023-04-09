import * as THREE from 'three'
import { createOrbit } from './js-components/three/components/orbit.js'
import { CreateGrid } from './js-components/three/objets/Grid.js'
import { CreateRenderer  } from './js-components/three/components/renderer.js'
import { CreateLights } from './js-components/three/objets/lights.js'
import { CreateVoxel } from './js-components/three/objets/voxel.js'
import { lineBetweenPoints } from './js-components/point-math/line-between-points.js'

import { createUserInput } from './js-components/three/components/user-input.js'

import { getPointsInSphere } from './js-components/point-math/shape.js'

import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';

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
        if(global.mode == "Paint")
        {
            tmp_voxel.replace(JSON.parse(JSON.stringify(voxel.voxels)))
            voxel.hide()
            if(event.button == 0)
            {
                if(origin != null)
                {
                    voxel.setColor(getPointsInSphere(origin, global.brushSize),global.foreground)
                }
                action = 'foreground'
            }
            else if(event.button == 2)
            {
                if(origin != null)
                {
                    voxel.setColor(getPointsInSphere(origin, global.brushSize),global.background)
                }
                action = 'background'
            }
            previous_point = origin ?? point
        }
        else
        {
            if(event.button == 0)
            {
                action = 'add'
                var item = getPointsInSphere(point, global.brushSize)
                tmp_voxel.add(item,true)
                previous_point = point
            }
            else if(event.button == 2)
            {
                const current = origin ?? point
                tmp_voxel.replace(voxel.voxels)
                tmp_voxel.remove(getPointsInSphere(current, global.brushSize))
                voxel.hide()
                action = 'remove'
                previous_point = current
            }
        }
    }
    function onMouseMove(event, {point,origin,axis,normal_direction})
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
                tmp_voxel.remove([previous_point,...lineBetweenPoints(previous_point,current).map(x=>getPointsInSphere(x, global.brushSize)).flat()])
            }
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
        }
    }
    function onMouseUp(event)
    {
        voxel.show()
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
