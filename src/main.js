import * as THREE from 'three'
import { createOrbit } from './js-components/three/lib/Orbit.js'
import { canvasResize } from './js-components/three/lib/CanvasResize.js'
import { useGrid } from './js-components/three/tools/Grid.js'
export default useMain
async function useMain(canvas_container, raster_canvas,render_canvas,config)
{

    const orbit = createOrbit(canvas_container)

    const renderer = new THREE.WebGLRenderer({
        antialias:true,
        canvas:raster_canvas
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    // renderer.setClearColor( 0xffffff, 0);
    renderer.setClearColor( 0xff0000, 0);
    const scene = new THREE.Scene();

    scene.add( orbit.camera );

    canvasResize(raster_canvas,(width,height)=>{
        renderer.setSize( width, height );
        orbit.camera.aspect = width / height;
        orbit.camera.updateProjectionMatrix();
    })

    const gridSpacing = 1
    const gridLength = 10

    

    scene.add( useGrid(gridSpacing, gridLength) );

    function draw()
    {
        renderer.render( scene, orbit.camera );
    }

    return {draw}

}

