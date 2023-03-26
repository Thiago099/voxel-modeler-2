import './slider.css';
export default Slider

function Slider({min,max,step,get,set}) {
    if(min === undefined)
    {
        min = 0
        console.error("Slider: min is undefined")
    }
    if(max === undefined)
    {
        max = 10
        console.error("Slider: max is undefined")
    }
    if(step === undefined)
    {
        step = 1
        console.error("Slider: step is undefined")
    }
    if(get === undefined)
    {
        get = () => 1
        console.error("Slider: get is undefined")
    }
    if(set === undefined)
    {
        set = () => {}
        console.error("Slider: set is undefined")
    }

    var ss = step.toString().split(".")
    var decimal_places = 0
    if(ss.length > 1)
        decimal_places = ss[1].length

    var value = get() 

    const dot = ref()
    const sliderContainer = ref()
    const workArea = ref()
    const input = ref()
    var container = 
    <div class="slider-container">
        <input type="text" class="input slider-input" model={value} ref={input}/>
        <div class="work-area" ref={workArea}>
            <div class="slider-dot-container" ref={sliderContainer}>
                <div class="slider-dot" ref={dot}></div>
            </div>
        </div>
    </div>
    var drag = false
    var px = 0

    input.$on("input",e => {
        reverseUpdate(v)
        container.$update()
    })
    dot.$on("mousedown",e => {
        e.stopPropagation()
        drag = true
        px = e.clientX - Number(dot.$get_computed_style("left").replace("px",""))
        console.log(px)
    })
    function update(cx) {
        var rect = sliderContainer.$element.getBoundingClientRect()
        dot.$style("left",cx+"px")
        var v = min + (max-min) * (cx / rect.width)
        v = Math.round(v / step) * step
        set(v)
        value = v.toFixed(decimal_places)
        container.$update()
        input.$update()
    }
    function reverseUpdate(v) {
        var v = Number(value)
        if(v < min)
            v = min
        if(v > max)
            v = max
        set(v)

        var rect = sliderContainer.$element.getBoundingClientRect()
        var cx = (v - min) / (max - min) * rect.width
        dot.$style("left",cx+"px")
        value = v.toFixed(decimal_places)
        dot.$update()
    }
    workArea.$on("mousedown",e => {
        drag=true
        var rect = sliderContainer.$element.getBoundingClientRect()
        var cx = e.clientX - rect.left
        px =e.clientX - e.offsetX + 10
        if(cx < 0)
            cx = 0
        if(cx > rect.width)
            cx = rect.width
        update(cx)
    })
    document.addEventListener("mousemove",e => {
        if(drag)
        {
            var x = e.clientX
            var rect = sliderContainer.$element.getBoundingClientRect()
            var cx = x - px

            if(cx < 0)
                cx = 0
            if(cx > rect.width)
                cx = rect.width
            update(cx)
        }
    })

    document.addEventListener("mouseup",e => {
        drag = false
    })        
    container.$on("mounted",() => {
        reverseUpdate()
    })
    return container
}