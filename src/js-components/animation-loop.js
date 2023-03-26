export default animationLoop

function animationLoop(callback)
{
    function job()
    {
        callback();
        requestAnimationFrame(job);
    }
    job()
}


