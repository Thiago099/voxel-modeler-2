import './color-palette.css';
export default ColorPalette

function ColorPalette({get,set,foreground}) {

    if(get === undefined)
    {
        get = () => [255,255,255,1]
        console.error("DropDownMenu: get is undefined")
    }
    if(set === undefined)
    {
        set = () => {}
        console.error("DropDownMenu: set is undefined")
    }
    if(foreground === undefined)
    {
        foreground = () => {}
        console.error("DropDownMenu: foreground is undefined")
    }
    var color = get()
    const palette = ref()

    var colors = []


    var container = 
    <div class="color-palette-container ">
        <div class="color-palette" >
            <div class="color-palette-item-container" ref={palette} >
                <div class="color-item double-border" on:click={add} style={`background-color:rgba(${color[0]},${color[1]},${color[2]},${color[3]})`}><i class="fa fa-plus"></i></div>
            </div>
        </div>
    </div>

    function add() {
        var cc = color
        var item = <div class="color-item double-border" style={`background-color:rgba(${cc[0]},${cc[1]},${cc[2]},${cc[3]})`}></div>
        item.$on("mousedown",e => {
            e.preventDefault()
            e.stopPropagation()
            if(e.button === 0)
            {
            }
            //right
            else if(e.button === 2)
            {


            }
            //middle
            else if(e.button === 1)
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


    return container
}