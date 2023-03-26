export default webgl


function webgl(canvas)
{
    const gl = canvas.getContext('webgl2', {antialias: true})
    return gl
}
