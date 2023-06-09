import './color-palette.css';
import color_picker_modal from '../color-picker-modal/color-picker-modal';
export default ColorPalette
import global from '../../global.js'

function ColorPalette({$color,$set}) {



    const palette = ref()



    var container = 
    <div class="color-palette-container ">
        <div class="color-palette" >
            <div class="color-palette-item-container" ref={palette} >
                <div class="color-item double-border" on:click={add_current} style={`background-color:rgba(${$color().r},${$color().g},${$color().b},${$color().a})`}><i class="fa fa-plus add-color-icon"></i></div>
            </div>
        </div>
    </div>
    container.$on("contextmenu",e => {
        e.preventDefault()
        e.stopPropagation()
    })
    function add_current()
    {
        var cc = $color()
        global.palette_colors.push(cc)
        add(cc)
    }

    for(var color of global.palette_colors)
    {
        add(color)
    }

    container.$on("update",e => {
        // color = $get_foreground()
        // palette.$update()
    })

    function add(cc) {

        var item = <div class="color-item double-border" style={`background-color:rgba(${cc.r},${cc.g},${cc.b},${cc.a})`}></div>
        item.$on("mousedown",e => {
            e.preventDefault()
            e.stopPropagation()
            if(e.button === 0)
            {
                $set(cc)
            }
            //right
            else if(e.button === 2)
            {
                global.palette_colors.splice(global.palette_colors.indexOf(cc),1)
                item.$remove()
            }
        })
    


        item.$parent(palette)
    }
    container.set = function(c) {
        color = c
        container.$update()
    }

    return container
}