import './color-palette.css';
import color_picker_modal from '../color-picker-modal/color-picker-modal';
export default ScenePalette
import global from '../../global.js'

function ScenePalette({$color,$set}) {



    const palette = ref()



    var container = 
    <div class="color-palette-container ">
        <div class="color-palette" >
            <div class="color-palette-item-container" ref={palette} >
            </div>
        </div>
    </div>



    for(var color of Object.values(global.scene_colors))
    {
        add(color[0])
    }

    container.$on("update",e => {
        // color = $get_foreground()
        // palette.$update()
    })

    function add(cc) {

        var item = <div class="color-item double-border" style={`background-color:rgba(${cc.r},${cc.g},${cc.b},1)`}></div>
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
                item.$remove()
            }
        })
        item.$on("contextmenu",e => {
            e.preventDefault()
            e.stopPropagation()
        })


        item.$parent(palette)
    }
    container.set = function(c) {
        color = c
        container.$update()
    }

    return container
}