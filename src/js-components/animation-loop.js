export default animationLoop

function animationLoop(callback)
{
    function job()
    {
        requestAnimationFrame(job);
        callback();
    }
    job()
}


