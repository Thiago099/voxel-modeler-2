export default shaderProgramAsync


async function shaderProgramAsync(gl,shader_path)
{
    var vertCode = await fetch(`./${shader_path}.vert`).then(res=>res.text())
    var fragCode = await fetch(`./${shader_path}.frag`).then(res=>res.text())
    
    const program = gl.createProgram();

    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);
    gl.attachShader(program, fragShader);

    const vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);
    gl.attachShader(program, vertShader);

    gl.linkProgram(program);

    return new shader_program_builder(gl,program)
}

class shader_program_builder
{
    constructor(gl,program)
    {
        this.gl = gl;
        this.program = program;
        this.attribute_matrix_3_float = varProxyBuffer(gl,(name, value) => {

            var vertex_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(value), gl.STATIC_DRAW);
            
            var attribute = gl.getAttribLocation(this.program, name);
            gl.vertexAttribPointer(attribute, 3, gl.FLOAT, false,0,0);
            gl.enableVertexAttribArray(attribute);

            return vertex_buffer;
            
        })
    }
    use()
    {
        this.gl.useProgram(this.program);
    }
}

function varProxyBuffer(gl, callback)
{
    var old = {}
    return new Proxy({}, {
        set: function(target, name, value) {

            if(old[name] != null)
            {
                gl.deleteBuffer(old);
            }

            old[name] = callback(name,value)

            return true;
        }
    });
}