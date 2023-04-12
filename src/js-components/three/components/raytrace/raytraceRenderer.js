import * as THREE from 'three'
import { CreateRaytraceScene } from './bin/RaytraceScene.js'
import { CreateRaytraceWorker } from './bin/RaytraceWorker.js'
export { CreateRaytraceRenderer }
async function CreateRaytraceRenderer(canvas,orbit)
{
    const hdrTexture =  await new THREE.TextureLoader().load('textures/background.png')
    const RaytraceScene = await CreateRaytraceScene(hdrTexture)
    const raytraceRenderer = await CreateRaytraceWorker(canvas,RaytraceScene,orbit.camera)
    const elements = []
    var active = false
    function add(item)
    {
        elements.push(item)
    }
    function enable()
    {
        active = true
        setTimeout(build,0)
    }
    function disable()
    {
        active = false
    }
    function build()
    {
        if(active)
        {
            RaytraceScene.add(elements.map(x=>x()).filter(x=>x));
            RaytraceScene.Build()
            raytraceRenderer.setMovingCamera()
        }
    }
    return {add,enable,disable,build,render:raytraceRenderer.render,setMovingCamera:raytraceRenderer.setMovingCamera}

}