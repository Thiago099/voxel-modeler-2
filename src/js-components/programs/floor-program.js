import shaderProgramAsync from "../shader-program.js"
export default useFloorProgramAsync
async function useFloorProgramAsync(gl)
{
    var program = await shaderProgramAsync(gl,"floor")

    // Set up the vertex data
    var vertices = [
        -1000,0, -1000,
        1000,0, -1000,
        1000,0,  1000,
        -1000,0,  1000,
    ];
    var texCoords = [
        0.0, 0.0,
        1000, 0.0,
        1000, 1000,
        0.0, 1000,
    ];



    var c = document.createElement("canvas")
    c.width = 500
    c.height = 500
    var ctx = c.getContext("2d")
    //stroke square
    ctx.strokeStyle = "white"
    ctx.lineWidth = 5
    ctx.strokeRect(0,0,500,500)


	// Render the scene
	async function render(updateProgramCamera) {

        program.use()
        updateProgramCamera(program)
        program.attribute_matrix_3_float.position = vertices
        program.attribute_matrix_2_float.texCoord = texCoords
        await program.addTextureAsync("texture",c)
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
	}
    return render
}