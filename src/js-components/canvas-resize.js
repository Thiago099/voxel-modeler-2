export default canvasResize


function canvasResize(canvas)
{
    window.addEventListener("resize", () => {
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
    })
}