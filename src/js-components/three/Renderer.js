import { createRasterRender } from './RasterRenderer.js';
import { createOrbitCamera } from './Camera.js';
import { createRaytraceRender } from './RaytraceRenderer.js';

export { createRender }

async function createRender(canvas)
{
    const mesh_list = [];
    
    const camera = createOrbitCamera(canvas)
    const type = "raytrace";

    await updateRenderType();


    var rasterRenderer, raytraceRenderer;

    var needsRaytraceMeshUpdate = false
    const raytraceMeshList = []

    async function swap()
    {
        type = type == "raytrace" ? "raster" : "raytrace";
        updateRenderType();
    }

    async function updateRenderType()
    {
        if(type == "raytrace")
        {
            if(raytraceRenderer == null)
            {
                raytraceRenderer = await createRaytraceRender(camera,canvas);
                camera.addCallback(raytraceRenderer.setMovingCamera)
            }
            else
            {
                raytraceRenderer.addCamera()
            }

        }
        else if(type == "raster")
        {
            if(rasterRenderer == null)
            {
                rasterRenderer = createRasterRender(camera,canvas);
            }
            else 
            {
                rasterRenderer.build()
            }
        }
    }

    function add(mesh, affect_type=null)
    {
        if(type == "raster" && (affect_type == null || affect_type == "raster"))
        {
            rasterRenderer.add(mesh)
        } else if(type == "raytrace" && (affect_type == null || affect_type == "raytrace"))
        {
            raytraceMeshList.push(mesh)
            needsRaytraceMeshUpdate = true
        }
    }

    function build()
    {
        if(type == "raytrace")
        {
            needsRaytraceMeshUpdate = true
        }
    }

    function render()
    {
        if(type == "raster")
        {
            rasterRenderer.render()
        } else if(type == "raytrace")
        {
            if(needsRaytraceMeshUpdate)
            {
                raytraceRenderer.add(...raytraceMeshList.map(x=>{return{geometry:x.geometry,albedo:x.material.map}}))
                raytraceRenderer.setMovingCamera()
                raytraceRenderer.Build()
                needsRaytraceMeshUpdate = false
            }
            raytraceRenderer.render()
        }
    }

    return {add,render,swap,camera,build}

}