import './color-picker-modal.css'
import modal from "../modal/modal";
import ColorPalette from '../color-palette/color-palette';
import ScenePalette from '../color-palette/scene-palette';
export default color_picker_modal

function color_picker_modal(initialColorRGBA,callback)
{
    const svBox = ref()
    const hueBox = ref()
    const hueBar = ref()
    const svCircle = ref()
    const HexInput = ref()
    const hueInput = ref()
    const saturationInput = ref()
    const brightnessInput = ref()
    const redInput = ref()
    const greenInput = ref()
    const blueInput = ref()
    const alphaBox = ref()
    const alphaBar = ref() 
    const alphaInput = ref()
    var palette_create_color = {r:0,g:0,b:0,a:1}
    var content = 
    <div class="modal-regular color-picker-modal">
        <div class="row">
            <div class="color-picker-container">
                <div class="sb-box" ref={svBox}>
                    <div class="sb-circle" ref={svCircle}></div>
                </div>
                <div class="hue-box" ref={hueBox}>
                    <div class="hue-bar" ref={hueBar}></div>
                </div>
            </div>
          
            <div class="row" style="width:50%">
                <div class="col">

                    <div class="input-group">
                        <label>Hue</label>
                        <input type="text" class="input" ref={hueInput}/>
                    </div>

                    <div class="input-group">
                        <label>Saturation</label>
                        <input type="text" class="input" ref={saturationInput}/>
                    </div>

                    <div class="input-group">
                        <label>Brightness</label>
                        <input type="text" class="input" ref={brightnessInput}/>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group">
                        <label>Red</label>
                        <input type="text" class="input" ref={redInput}/>
                    </div>

                    <div class="input-group">
                        <label>Green</label>
                        <input type="text" class="input" ref={greenInput}/>
                    </div>

                    <div class="input-group">
                        <label>Blue</label>
                        <input type="text" class="input" ref={blueInput}/>
                    </div>
                </div>
                <div class="input-group" style="position:relative">
                    <label>Hex</label>
                    <div class="hashtag">#</div>
                    <input type="text" class="input" ref={HexInput}/>
                </div>
                <div class="input-group" style="position:relative">
                    <label>Alpha</label>
                    <input type="text" class="input" ref={alphaInput}/>
                </div>

            </div>

            <div class="trackbar-container" ref={alphaBox} style={`width:calc(50% - 20px);margin:10px;--accent-color:${redInput.value},${greenInput.value},${blueInput.value}`} >
                <div class="trackbar-background"></div>
                <div class="trackbar-foreground" ></div>
                <div class="alpha-bar" ref={alphaBar}></div>
            </div>
            <div style="width:50%"></div>
            <div class="row" style="width:100%">
                <div style="width:50%;padding-right:20px;padding-left:10px;flex:1">
                    <ColorPalette color={palette_create_color} set={(c)=>setPalette(c)}/>
                </div>
                <div style="width:50%">
                    <ScenePalette set={(c)=>setPalette(c)}/>
                </div>
            </div>
        </div>
    </div>

    //convert to hsv
    const hsv = RGBtoHSV(initialColorRGBA.r,initialColorRGBA.g,initialColorRGBA.b)
    
    var saturation = hsv.s
    var brightness = hsv.v
    var hue = hsv.h
    var alpha = initialColorRGBA.a * 100
    var drag = false


    function setInput()
    {
        prepareValues()
    }
    function prepareValues()
    {
        var rgb = HSVtoRGB(hue,saturation,brightness)
        var hex = rgbToHex(rgb.r,rgb.g,rgb.b)
        HexInput.value = hex
        hueInput.value = (hue * 360).toFixed(0)
        saturationInput.value = (saturation * 100).toFixed(0)
        brightnessInput.value = (brightness * 100).toFixed(0)
        redInput.value = rgb.r
        greenInput.value = rgb.g
        blueInput.value = rgb.b
        alphaInput.value = alpha.toFixed(0)
        svBox.style.backgroundColor = `hsl(${hue * 360},100%,50%)`
        palette_create_color = {r:rgb.r,g:rgb.g,b:rgb.b,a:alpha/100}
        content.$update()
        return {...rgb,a:alpha/100}
    }

    function setPalette(color)
    {
        redInput.value = color.r.toFixed(0)
        greenInput.value = color.g.toFixed(0)
        blueInput.value = color.b.toFixed(0)
        alphaInput.value = (color.a*100).toFixed(0)
        getRGBInput()
    }

    content.$on('mounted',() => {
        prepareValues()
        update()
    })
    HexInput.$on('input',getHexInput)
    redInput.$on('input',getRGBInput)
    greenInput.$on('input',getRGBInput)
    blueInput.$on('input',getRGBInput)
    hueInput.$on('input',getHSVInput)
    saturationInput.$on('input',getHSVInput)
    brightnessInput.$on('input',getHSVInput)
    alphaInput.$on('input',getRGBInput)
    function getHexInput()
    {
        var rgb = hexToRgb(HexInput.value)
        var hsv = RGBtoHSV(rgb.r,rgb.g,rgb.b)
        if(isNaN(hsv.h) || isNaN(hsv.s) || isNaN(hsv.v))
        {
            return
        }
        hue = hsv.h
        saturation = hsv.s
        brightness = hsv.v
        update()
        setInput()

    }
    function getHSVInput()
    {
        hue = parseInt(hueInput.value) / 360
        saturation = parseInt(saturationInput.value) / 100
        brightness = parseInt(brightnessInput.value) / 100
        if(isNaN(hue) || isNaN(saturation) || isNaN(brightness))
        {
            return
        }
        //clamp
        hue = Math.max(0,Math.min(1,hue))
        saturation = Math.max(0,Math.min(1,saturation))
        brightness = Math.max(0,Math.min(1,brightness))
        update()
        setInput()

    }
    function getRGBInput()
    {
        const r = parseInt(redInput.value)
        const g = parseInt(greenInput.value)
        const b = parseInt(blueInput.value)
        const a = parseInt(alphaInput.value)
        const hsv = RGBtoHSV(r,g,b)
        //if is not a number
        if(isNaN(hsv.h) || isNaN(hsv.s) || isNaN(hsv.v))
        {
            return
        }
        //clamp
        hue = Math.max(0,Math.min(1,hsv.h))
        saturation = Math.max(0,Math.min(1,hsv.s))
        brightness = Math.max(0,Math.min(1,hsv.v))
        alpha = Math.max(0,Math.min(100,a))
        update()
        setInput()

    }
    
    function update()
    {
        var svRect = svBox.getBoundingClientRect()
        var hueRect = hueBox.getBoundingClientRect()
        const alphaRect = alphaBox.getBoundingClientRect()
        svCircle.style.left = saturation * svRect.width + 'px'
        svCircle.style.top = (1 - brightness) * svRect.height + 'px'
        hueBar.style.top = (1-hue) * hueRect.height + 'px'
        alphaBar.style.left = alpha * alphaRect.width / 100 + 'px'
    }

    svBox.$on('mousedown', (e) => {
        drag = true
        update_sb(e)
    })
    document.addEventListener('mouseup', (e) => {
        drag = false
    })
    document.addEventListener('mousemove',e=>{
        update_sb(e)
        update_hue(e)
    } )

    function update_sb(e)
    {
        if(drag)
        {
            //get rect
            var rect = svBox.getBoundingClientRect()
            //get x and y
            var x = e.clientX - rect.left
            var y = e.clientY - rect.top
            //clamp x and y
            x = Math.max(0, Math.min(x, rect.width))
            y = Math.max(0, Math.min(y, rect.height))
            
            svCircle.style.left = x + 'px'
            svCircle.style.top = y + 'px'

            saturation = x / rect.width
            brightness = 1 - y / rect.height
            setInput()
        }
    }
    var drag_hue = false
    hueBox.$on('mousedown', (e) => {
        drag_hue = true
        update_hue(e)
    })
    document.addEventListener('mouseup', (e) => {
        drag_hue = false
    })


    function update_hue(e)
    {
        if(drag_hue)
        {
            //get rect
            var rect = hueBox.getBoundingClientRect()
            //y
            var y = e.clientY - rect.top
            //clamp y
            y = Math.max(0, Math.min(y, rect.height))

            hueBar.style.top = y + 'px'

            hue = 1-(y / rect.height)

            svBox.style.backgroundColor = `hsl(${hue * 360},100%,50%)`

            setInput()
        }
    }

    let drag_alpha = false
    alphaBox.$on('mousedown', (e) => {
        drag_alpha = true
        update_alpha(e)
    })
    document.addEventListener('mouseup', (e) => {
        drag_alpha = false
    })
    document.addEventListener('mousemove',e=>{
        update_alpha(e)
    } )

    function update_alpha(e)
    {
        if(drag_alpha)
        {
            //get rect
            var rect = alphaBox.getBoundingClientRect()
            //x
            var x = e.clientX - rect.left
            //clamp x
            x = Math.max(0, Math.min(x, rect.width))
            
            alphaBar.style.left = x + 'px'

            alpha = x / rect.width * 100

            setInput()

        }
    }



    var {close} = modal(content,()=>{
        const color = prepareValues()
        callback({r:color.r,g:color.g,b:color.b,a:color.a})
    })
    function open()
    {

    }
}


function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
} 
function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  