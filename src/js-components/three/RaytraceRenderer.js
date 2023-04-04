import * as THREE from 'three';
export { createRaytraceRender }
import { CreateRaytraceWorker } from './bin/RaytraceWorker';
import { CreateRaytraceScene } from './bin/RaytraceScene';
async function createRaytraceRender(camera,canvas)
{
    const hdrTexture =  await new THREE.TextureLoader().load('textures/background.png')

    const scene = await CreateRaytraceScene(hdrTexture)

    const renderer = await CreateRaytraceWorker(canvas, scene, camera.value);

    return {...scene,...renderer}

}