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

    gl.useProgram(program);

    return new shader_program_builder(gl,program)
}

class shader_program_builder
{
    constructor(gl,program)
    {
        this.gl = gl;
        this.program = program;


        this.uniform_float = varProxy((name, value) => {
            var location = gl.getUniformLocation(program, name)
            gl.uniform1f(location, value)
        })

        this.uniform_vec2 = varProxy((name, value) => {
            var location = gl.getUniformLocation(program, name)
            gl.uniform2fv(location, value)
        })

        this.uniform_vec3 = varProxy((name, value) => {
            var location = gl.getUniformLocation(program, name)
            gl.uniform3fv(location, value)
        })

        this.uniform_matrix_4_mat_float = varProxy((name, value) => {
            var location = gl.getUniformLocation(program, name)
            gl.uniformMatrix4fv(location, false, value)
        })

        const addTextureAsync = UseAddTextureAsync(gl,program)
        this.addTextureAsync = addTextureAsync.bind(this)

        const addAttribute = UseAddAttribute(gl,program)
        this.addAttribute = addAttribute.bind(this)

        const setIndexBuffer = useSetIndexBuffer(gl)
        this.setIndexBuffer = setIndexBuffer.bind(this)
        

    }
    use()
    {
        this.gl.useProgram(this.program);
    }
    stop()
    {
        this.gl.useProgram(null);
    }
}
function varProxy(callback)
{
    return new Proxy({}, {
        set: function(target, name, value) {
            callback(name,value)
            return true;
        }
    });
}
function useSetIndexBuffer(gl)
{
    var old = null
    function set(value)
    {
        if(old != null)
        {
            gl.deleteBuffer(old);
        }
        var index_buffer = gl.createBuffer();
        old = index_buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(value), gl.STATIC_DRAW);

    }
    return set
}

function UseAddAttribute(gl,program)
{
    var old = {}
    function add(name,length,value)
    {
        if(old[name] != null)
        {
            gl.deleteBuffer(old[name]);
        }
        var vertex_buffer = gl.createBuffer();
        old[name] = vertex_buffer

        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(value), gl.STATIC_DRAW);
        
        var attribute = gl.getAttribLocation(program, name);
        gl.vertexAttribPointer(attribute, length, gl.FLOAT, false,0,0);
        gl.enableVertexAttribArray(attribute);
    }
    return add
}
function UseAddTextureAsync(gl,program)
{
    var old = {}
    async function add(name,url)
    {
        var promise = new Promise((resolve,reject) => {
            if(old[name] != null)
            {
                gl.deleteTexture(old[name]);
            }
            var texture = gl.createTexture();
            old[name] = texture


            //is not string
            if(typeof url != "string")
            {
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, url);

                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

                // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

                gl.generateMipmap(gl.TEXTURE_2D);
                gl.bindTexture(gl.TEXTURE_2D, null);

                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                var textureLocation = gl.getUniformLocation(program, name);
                gl.uniform1i(textureLocation, 0);
                resolve()
                return
            }

            var image = new Image();
            image.src = url;
            image.addEventListener('load', function() {
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

                // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

                gl.generateMipmap(gl.TEXTURE_2D);
                gl.bindTexture(gl.TEXTURE_2D, null);
        
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                var textureLocation = gl.getUniformLocation(program, name);
                gl.uniform1i(textureLocation, 0);
                resolve()
            });
            image.addEventListener('error', function(e) {
                reject(e)
            });
        })
        return promise
    }
    return add
}