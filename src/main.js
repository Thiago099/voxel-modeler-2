
import { createOrbit } from './js-components/three/components/orbit.js'
import { CreateGrid } from './js-components/three/tools/Grid.js'
import { CreateRenderer  } from './js-components/three/components/renderer.js'
import { CreateLights } from './js-components/Lights.js'
export default useMain
async function useMain(canvas_container, raster_canvas,render_canvas,config)
{

    const orbit = createOrbit(canvas_container)
    const renderer = CreateRenderer(raster_canvas,orbit)

    const gridSpacing = 1
    const gridLength = 10
    
    renderer.add( orbit.camera );
    renderer.add( CreateGrid(gridSpacing, gridLength) );
    renderer.add( CreateLights() );

    function draw()
    {
        renderer.render();
    }

    return {draw}

}

