import { createRasterRender } from './RasterRenderer.js';
import { createOrbitCamera } from './Camera.js';
import { createRaytraceRender } from './RaytraceRenderer.js';

export { createRender }

async function createRender(canvas)
{
    var rasterRenderer, raytraceRenderer;

    var needsRaytraceMeshUpdate = false


    const raytraceMeshList = []
    const rasterMeshList = []
    const camera = createOrbitCamera(canvas)
    var type = null;

    await updateRenderType("raster");



    async function setRenderTarget(target)
    {
        await updateRenderType(target);
    }

    async function updateRenderType(target)
    {
        if(target == "raytrace")
        {
            if(raytraceRenderer == null)
            {
                raytraceRenderer = await createRaytraceRender(camera,canvas);
                camera.addCallback(raytraceRenderer.setMovingCamera)
                build()
            }
            else
            {
                raytraceRenderer.addCamera()
                build()
            }

        }
        else if(target == "raster")
        {
            if(rasterRenderer == null)
            {
                rasterRenderer = createRasterRender(camera,canvas);
                for(var mesh of rasterMeshList)
                {
                    rasterRenderer.add(mesh)
                }
            }
            else 
            {
                rasterRenderer.build()
            }
        }
        type = target;
    }

    function add(mesh, affect_type=null)
    {
        mesh.visible = true

        if(affect_type == null || affect_type == "raytrace")
        {
            raytraceMeshList.push(mesh)
            if(type == "raytrace")
            {
                needsRaytraceMeshUpdate = true
            }
        }
        if(affect_type == null || affect_type == "raster")
        {
            rasterMeshList.push(mesh)
            if(type == "raster")
            {
                rasterRenderer.add(mesh)
            }
        }
    }

    function build()
    {
        if(type == "raytrace")
        {
            needsRaytraceMeshUpdate = true
        }
    }
    function hide(element)
    {
        if(type == "raytrace")
        {
            element.visible = false
            needsRaytraceMeshUpdate = true
        }
        // else if(type == "raster")
        // {
        //    element.material.visible = false
        // }
    }
    function show(element)
    {
        if(type == "raytrace")
        {
            element.visible = true
            needsRaytraceMeshUpdate = true
        }
        // else if(type == "raster")
        // {
        //    element.material.visible = true
        // }
    }

    function render()
    {

        if(type == "raster")
        {
            rasterRenderer.render()
        } 
        else if(type == "raytrace")
        {
            if(needsRaytraceMeshUpdate)
            {
                raytraceRenderer.add(...raytraceMeshList.filter(x=>x.visible).map(x=>{return{geometry:x.geometry,albedo:x.material.map}}))
                raytraceRenderer.setMovingCamera()
                raytraceRenderer.Build()
                needsRaytraceMeshUpdate = false
            }
            raytraceRenderer.render()
        }
    }

    return {add,render,setRenderTarget,camera,build,hide,show}

}