export { canvasResize }


function canvasResize(canvas,callback)
{
    function resize()
    {
        callback(canvas.clientWidth,canvas.clientHeight)
    }
    resize()
    window.addEventListener("resize", () => {
        resize()
    })
}