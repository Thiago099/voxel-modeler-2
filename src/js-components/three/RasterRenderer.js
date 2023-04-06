import * as THREE from 'three';
import canvasResize from '../resize.js'
export { createRasterRender }
function createRasterRender(camera,canvas)
{

    var scene = null, renderer = null, add_callbacks = [],target=null;
    function build()
    {

        scene.add(camera.value)


    }



    renderer = new THREE.WebGLRenderer({
        antialias:true,
        canvas
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( 0xffffff, 0);
    scene = new THREE.Scene();

    canvasResize(canvas,(width,height)=>{
        renderer.setSize( width, height );
        camera.value.aspect = width / height;
        camera.value.updateProjectionMatrix();
    })

    scene.add(camera.value)

    function add(item)
    {
        function callback()
        {
            scene.add(item)
        }
        callback()
        add_callbacks.push(callback)
    }

    function remove(item)
    {
        scene.remove(item)
    }
    
    //render target
    const context = renderer.getContext();
	context.getExtension('EXT_color_buffer_float');
	context.getExtension('EXT_float_blend');
    


    
    //clear
    function render()
    {
        renderer.render(scene, camera.value);
    }
    

    return {build,add,remove,render}

}