import * as THREE from 'three'
import { createOrbit } from './js-components/three/components/orbit.js'
import { CreateGrid } from './js-components/three/objets/Grid.js'
import { CreateRenderer  } from './js-components/three/components/renderer.js'
import { CreateLights } from './js-components/three/objets/lights.js'
import { CreateVoxel } from './js-components/three/objets/voxel.js'
import { lineBetweenPoints } from './js-components/point-math/line-between-points.js'

import { createUserInput } from './js-components/three/components/user-input.js'

import { getPointsInSphere } from './js-components/point-math/shape.js'
export default useMain


async function useMain(canvas_container, raster_canvas,render_canvas,config)
{

    const orbit = createOrbit(canvas_container)
    const renderer = CreateRenderer(raster_canvas,orbit)



    renderer.add( orbit.camera );
    renderer.add( CreateGrid(10) );

    CreateLights().map(x => renderer.add( x ));


    const voxel = CreateVoxel()
    renderer.add( voxel.mesh );
    renderer.add( voxel.wireframeMesh );

    const tmp_voxel = CreateVoxel()
    renderer.add( tmp_voxel.mesh );
    renderer.add( tmp_voxel.wireframeMesh );


    let action = null
    let previous_point = null
    function onMouseDown(event, {point,origin,axis,normal_direction})
    {
        if(event.button == 0)
        {
            action = 'add'
            tmp_voxel.add(getPointsInSphere(point, config.brushSize))
            previous_point = point
        }
        else if(event.button == 2)
        {
            const current = origin ?? point
            tmp_voxel.replace(voxel.voxels)
            tmp_voxel.remove(getPointsInSphere(current, config.brushSize))
            voxel.hide()
            action = 'remove'
            previous_point = current
        }
    }
    function onMouseMove(event, {point,origin,axis,normal_direction})
    {
        if(action == 'add')
        {
            if(config.tool == "Pen")
            {
                tmp_voxel.add(lineBetweenPoints(previous_point,point).map(x=>getPointsInSphere(x, config.brushSize)).flat())
                previous_point = point
            }
            else if (config.tool == "Line")
            {
                tmp_voxel.clear()
                tmp_voxel.add([previous_point,...lineBetweenPoints(previous_point,point).map(x=>getPointsInSphere(x, config.brushSize)).flat()])
            }
        }
        else if(action == 'remove')
        {
            if(config.tool == "Pen")
            {
                if(origin == null) return
                tmp_voxel.remove(lineBetweenPoints(previous_point,origin).map(x=>getPointsInSphere(x, config.brushSize)).flat())
                previous_point = origin
            }
            else if (config.tool == "Line")
            {
                const current = origin ?? point
                tmp_voxel.replace(voxel.voxels)
                tmp_voxel.remove([previous_point,...lineBetweenPoints(previous_point,current).map(x=>getPointsInSphere(x, config.brushSize)).flat()])
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
        else if(action == 'remove')
        {
            voxel.replace(tmp_voxel.voxels)
            tmp_voxel.clear()
            voxel.show()
        }
        action = null
    }

   createUserInput(orbit,canvas_container,[voxel.mesh],onMouseDown,onMouseMove,onMouseUp)

    function draw()
    {
        renderer.render();
    }

    return {draw}

}
