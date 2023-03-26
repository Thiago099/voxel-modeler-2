import shaderProgramAsync from "../shader-program.js"
export default cubeProgramAsync
async function cubeProgramAsync(gl)
{
    var program = await shaderProgramAsync(gl,"cube")
    
    const positions = [
        // Front face
        -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
      
        // Back face
        -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
      
        // Top face
        -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
      
        // Bottom face
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
      
        // Right face
        1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
      
        // Left face
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
    ];
    const edge_indexes = [
        0,1, 1,2, 2,3, 3,0,
        4,5, 5,6, 6,7, 7,4,
        8,9, 9,10, 10,11, 11,8,
        12,13, 13,14, 14,15, 15,12,
        16,17, 17,18, 18,19, 19,16,
        20,21, 21,22, 22,23, 23,20,
    ]


    
    function render(updateProgramCamera,mouseProjection)
    {
        program.use()
        updateProgramCamera(program)
        program.addAttribute("position",3, positions)
        program.uniform_vec3.mouse = [mouseProjection.x,mouseProjection.y,mouseProjection.z]
        program.setIndexBuffer(edge_indexes)
        gl.drawElements(gl.LINES, edge_indexes.length, gl.UNSIGNED_SHORT, 0);
        
    }
    return render
}