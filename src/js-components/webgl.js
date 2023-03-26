export default webgl


function webgl(canvas)
{
    const gl = canvas.$element.getContext('webgl2', {antialias: true})
    return gl
}