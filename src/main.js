import { mat4 } from "gl-matrix"

import canvasResize from "./js-components/canvas-resize.js"
import webgl from "./js-components/webgl.js"
import shaderProgramAsync from "./js-components/shader-program.js"
import useCheckerboardShaderProgramAsync from "./js-components/programs/checkerboard-overlay.js"
import useFloorProgramAsync from "./js-components/programs/floor-program.js"
import useCamera from "./js-components/camera.js"
export default useMain
async function useMain({canvas})
{
    canvasResize(canvas)

    var gl = webgl(canvas)

    const renderChecker = await useCheckerboardShaderProgramAsync(gl)
    const renderFloor = await useFloorProgramAsync(gl)

    
    
    const {updateCamera} = useCamera(canvas,gl)
    
    async function step()
    {
        //enable depth testing
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        // disable backface rendering

        gl.clearColor(0.0, 0.0, 0.0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var updateProgramCamera = updateCamera()
        renderChecker(updateProgramCamera)
        renderFloor(updateProgramCamera)
    }
    return step
}



    // var {grid_program,draw:drawGrid} = await gridShaderProgram(gl)

    // update the display
    // gl.enable(gl.DEPTH_TEST);
    // gl.depthFunc(gl.LEQUAL);
    // gl.enable(gl.CULL_FACE);
    // gl.clearDepth(1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);