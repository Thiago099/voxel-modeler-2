import { createRasterRender } from './RasterRenderer.js';
import { createOrbitCamera } from './Camera.js';
import { createRaytraceRender } from './RaytraceRenderer.js';

export { createRender }

async function createRender(canvas_container, canvas,canvas2)
{
    var rasterRenderer, raytraceRenderer;

    var needsRaytraceMeshUpdate = false


    const raytraceMeshList = []
    const rasterMeshList = []
    const camera = createOrbitCamera(canvas_container)
    var type = null;

    await updateRenderType("raster");



    async function setRenderTarget(target)
    {
        await updateRenderType(target);
    }


    async function updateRenderType(target)
    {

        if(type == "raytrace")
        {
            for(var mesh of raytraceMeshList)
            {
                if(mesh.compute)
                {
                    mesh.compute(target)
                }
            }
        }
        else if(type == "raster")
        {
            for(var mesh of rasterMeshList)
            {
                if(mesh.compute)
                {
                    mesh.compute(target)
                }
            }
        }
        if(target == "raytrace")
        {
            canvas.style.display = "none"
            canvas2.style.display = "block"
            if(raytraceRenderer == null)
            {
                //world matrix
                camera.value.updateMatrixWorld()
                raytraceRenderer = await createRaytraceRender(camera,canvas2);
                camera.addCallback(raytraceRenderer.setMovingCamera)
            }
            else
            {
                raytraceRenderer.addCamera()
            }

            

        }
        else if(target == "raster")
        {
            canvas2.style.display = "none"
            canvas.style.display = "block"
            if(raytraceRenderer != null)
            {
                raytraceRenderer.removeCamera()
            }
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
        build()
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
    function remove(mesh)
    {
        var index = raytraceMeshList.indexOf(mesh)
        if(index != -1)
        {
            raytraceMeshList.splice(index,1)
            if(type == "raytrace")
            {
                needsRaytraceMeshUpdate = true
            }
        }
        index = rasterMeshList.indexOf(mesh)
        if(index != -1)
        {
            rasterMeshList.splice(index,1)
            if(type == "raster")
            {
                rasterRenderer.remove(mesh)
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
                raytraceRenderer.add(...raytraceMeshList.filter(x=>x.visible && x.has_any_geometry).map(x=>{return{geometry:x.geometry,albedo:x.material.map,pbr:x.material.pbr,emission:x.material.emission}}))
                raytraceRenderer.Build()
                raytraceRenderer.setMovingCamera()
                needsRaytraceMeshUpdate = false
            }
            raytraceRenderer.render()
        }
    }

    function getRenderTarget(){
        return type;
    }

    return {add,remove,render,setRenderTarget,getRenderTarget,camera,build,hide,show}

}