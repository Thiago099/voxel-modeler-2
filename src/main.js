import canvasResize from "./js-components/canvas-resize.js"
import webgl from "./js-components/webgl.js"
import shaderProgramAsync from "./js-components/shader-program.js"
export default useMain
async function useMain({canvas})
{
    canvasResize(canvas)

    var gl = webgl(canvas)
    var grid_program = await shaderProgramAsync(gl,"grid")
    grid_program.use()
    
    const vertices = [0.0, 0.0, 0.0]; 

    grid_program.attribute_matrix_3_float.position = vertices

    gl.clearColor(0, 0, 0, 0.1);
    const numVertices = 1; // adjust the number of vertices to render
    gl.drawArrays(gl.POINTS, 0, numVertices);
    
    // update the display
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.CULL_FACE);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    async function step()
    {
        
    }
    return step
}
