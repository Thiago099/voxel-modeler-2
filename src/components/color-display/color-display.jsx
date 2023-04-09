import './color-display.css';

import color_picker_modal from '../color-picker-modal/color-picker-modal';

export default ColorDisplay

function ColorDisplay({$get,$set}) {
    if($get === undefined)
    {
        $get = () => [
        {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        },
        {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        },
        ]
    }
    if($set === undefined)
    {
        $set = (background,foreground) => {}
    }
    

    var [background,foreground] = $get()

    const box = ref()
    
    var result = 
    <div class="color-box-container">
        <div class="color-box" ref={box}>
            <div class="color-box-background color-box-item double-border" on:click={pick_background}>
                <div class="color-box-grid"></div>
                <div 
                    class="color-box-color" 
                    style={`background-color:rgba(${background.r},${background.g},${background.b},${background.a})`}
                ></div>
            </div>
            <div class="color-box-foreground color-box-item double-border" on:click={pick_foreground}>
                <div class="color-box-grid"></div>
                <div class="color-box-color" style={`background-color:rgba(${foreground.r},${foreground.g},${foreground.b},${foreground.a})`}></div>
            </div>
        </div>
        <i class="fa-solid fa-arrows-rotate icon swap-icon" on:click={swap}></i>
    </div>

    result.$on("update",e => {
        var [bg,fg] = $get()
        background = bg
        foreground = fg
    })
    

    function swap() {
        var temp = background
        background = foreground
        foreground = temp
        $set(background,foreground)
        box.$update()
    }
    function pick_background()
    {
        color_picker_modal(background, (color) => {
            background = color
            $set(background,foreground)
            result.$update()
        })
    }
    function pick_foreground()
    {
        color_picker_modal(foreground, (color) => {
            foreground = color
            $set(background,foreground)
            result.$update()
        })
    }

    return result
}