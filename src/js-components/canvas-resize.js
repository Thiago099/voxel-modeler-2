export default canvasResize


function canvasResize(canvas)
{
    function resize()
    {
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
    }
    resize()
    window.addEventListener("resize", () => {
        resize()
    })
}