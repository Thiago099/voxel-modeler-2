import './color-palette.css';
import color_picker_modal from '../color-picker-modal/color-picker-modal';
export default ColorPalette

function ColorPalette({$get_foreground,$set_foreground,$set_background}) {


    var color = $get_foreground()

    const palette = ref()

    var colors = []


    var container = 
    <div class="color-palette-container ">
        <div class="color-palette" >
            <div class="color-palette-item-container" ref={palette} >
                <div class="color-item double-border" on:click={add} style={`background-color:rgba(${color.r},${color.g},${color.b},${color.a})`}><i class="fa fa-plus add-color-icon"></i></div>
            </div>
        </div>
    </div>

    container.$on("update",e => {
        color = $get_foreground()
        palette.$update()
    })

    function add() {
        var cc = $get_foreground()
        var item = <div class="color-item double-border" style={`background-color:rgba(${cc.r},${cc.g},${cc.b},${cc.a})`}></div>
        item.$on("mousedown",e => {
            e.preventDefault()
            e.stopPropagation()
            if(e.button === 0)
            {
                $set_foreground(cc)
            }
            //right
            else if(e.button === 2)
            {
                item.$remove()
            }
            //middle
            else if(e.button === 1)
            {
                color_picker_modal(cc,pickedColor=>{
                    cc = pickedColor
                    item.$update()
                })
            }
        })
        item.$on("contextmenu",e => {
            e.preventDefault()
            e.stopPropagation()
        })


        item.$parent(palette)
    }


    return container
}