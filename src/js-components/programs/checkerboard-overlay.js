import shaderProgramAsync from "../shader-program.js"
export default useCheckerboardShaderProgramAsync
async function useCheckerboardShaderProgramAsync(gl)
{
    var grid_program = await shaderProgramAsync(gl,"checkerboard-overlay")
    
    var mesh =  [
        -1, 1,0,
        1, 1,0,
        -1, -1,0,
        1, -1,0,
    ]
    var offset = [0,0]
    var size = [10,10]

    
    function render(updateProgramCamera)
    {
        grid_program.use()
        updateProgramCamera(grid_program)
        grid_program.addAttribute("position",3,mesh);
        grid_program.uniform_vec2.offset = offset
        grid_program.uniform_vec2.size = size
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    return render
}