import * as THREE from 'three';
import canvasResize from '../resize.js'
export { useRenderer }
function useRenderer(camera,canvas)
{

    var scene = null, renderer = null, add_callbacks = [];
    function update()
    {
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

        for(var callback of add_callbacks)
        {
            callback()
        }
        scene.add(camera.value)
    }

    function add(item)
    {
        function callback()
        {
            scene.add(item)
        }
        if(scene)
        {
            callback()
        }
        add_callbacks.push(scene)
    }

    function render()
    {
        renderer.render( scene, camera.value );
    }

    return {update,add,render}

}