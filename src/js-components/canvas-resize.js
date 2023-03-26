export default canvasResize


function canvasResize(canvas)
{
    window.addEventListener("resize", () => {
        canvas.$element.width = canvas.$element.clientWidth
        canvas.$element.height = canvas.$element.clientHeight
    })
}