import './scene-colors.css';
import color_picker_modal from '../color-picker-modal/color-picker-modal';
export default SceneColors
import global from '../../global';

function SceneColors({$get,set}) {

    if($get === undefined)
    {
        $get = () => [255,255,255,1]
        console.error("DropDownMenu: get is undefined")
    }
    if(set === undefined)
    {
        set = () => {}
        console.error("DropDownMenu: set is undefined")
    }

    const computeButton = ref()
    const palette = ref()
    var container = 
    <div class="row">
        <button class="button" style="margin:10px" ref={computeButton}>Compute</button>
        <div class="color-palette-container ">
            <div class="color-palette" >
                <div class="color-palette-item-container" ref={palette} >
                </div>
            </div>
        </div>
    </div>

    computeButton.$on("click",e => {

        global.scene_colors ={}
        var voxel = global.voxel
        palette.innerHTML = ""
        for(var item of voxel.voxels)
        {
            for(const color of item.color)
            {
                var key = color.r + "," + color.g + "," + color.b
                if(global.scene_colors[key] === undefined)
                {
                    global.scene_colors[key] = []
                    const item = <div class="color-item double-border" style={`background-color:rgba(${color.r},${color.g},${color.b},${1})`}></div>
                    item.$parent(palette)
                    item.$on("click",e => {
                        var pc = {...color}
                        color_picker_modal(pc, pickedColor => {
                            for(const objectColor of global.scene_colors[key])
                            {
                                objectColor.r = pickedColor.r
                                objectColor.g = pickedColor.g
                                objectColor.b = pickedColor.b
                            }
                            color.r = pickedColor.r
                            color.g = pickedColor.g
                            color.b = pickedColor.b
                            item.$update();
                            voxel.update()
                        });
                    })
                }
                global.scene_colors[key].push(color)
            }
        }
    })

    return container
}