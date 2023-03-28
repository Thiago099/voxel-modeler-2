
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'

import DropDownMenu from './components/drop-down-menu/drop-down-menu'
import Selection from './components/selection/selection'
import ToggleButton from './components/toggle-button/toggle-button'
import Slider from './components/slider/slider'
import ColorDisplay from './components/color-display/color-display'
import ColorPalette from './components/color-palette/color-palette'
import animationLoop from './js-components/animation-loop'
import useMain from './main'
const main_menu_options = [
    {
        text: "New",
        action: () => {
            alert("New")
        }
    },,
    {
        text: "Load",
        action: () => {
            alert("Open")
        }
    },
    {
        text: "Save",
        action: () => {
            alert("Save")
        }
    },,
    {
        text: "Export",
        action: () => {
            alert("Export")
        }
    },
]    
const view_options = [
    {
        text: "Reset pan",
        action: () => {
            alert("Reset pan")
        }
    },
    {
        text: "Reset rotation",
        action: () => {
            alert("Reset rotation")
        }
    },
    {
        text: "Reset zoom",
        action: () => {
            alert("Reset zoom")
        }
    },,
    {
        text: "Wireframe",
        get: () => true,
        set: (value) => {
            // alert(value)
        }
    }

]
const action_options = [

    {
        text: "Undo",
        action: () => {
            alert("Undo")
        }
    },
    {
        text: "Redo",
        action: () => {
            alert("Redo")
        }
    },,
    {
        text: "Quick save",
        action: () => {
            alert("Quick save")
        }
    },
    {
        text: "Quick load",
        action: () => {
            alert("Quick load")
        }
    },
]

const color_options = [
    {
        text: "Save palette",
        action: () => {
            alert("Save palette")
        }
    },,
    {
        text: "Export palette",
        action: () => {
            alert("Save palette")
        }
    },
    {
        text: "Import palette",
        action: () => {
            alert("Save palette")
        }
    },,
    {
        text: "Set color",
        action: () => {
            alert("Set color")
        }
    },
    {
        text: "Set color to foreground",
        action: () => {
            alert("Set color to foreground")
        }
    },
    {
        text: "Set color to background",
        action: () => {
            alert("Set color to background")
        }
    }

]



        

const type = ["Sculpt","Paint"]
const shape = ["Circle","Square"]
const tools = ["Pen","Line","Extrude","Box"]


const canvas_ref = ref()


const config = {
    tool: "Pen",
}

const app =
<div>
<div class="header">
    <div class="title">
        Voxel modeler 2
    </div>
    <div class="divider"></div>
    <DropDownMenu options={main_menu_options} name="File"/>
    <DropDownMenu options={view_options} name="View"/>
    <DropDownMenu options={action_options} name="Action"/>
    <DropDownMenu options={color_options} name="Color"/>
</div>
<div class="program">
    <canvas ref={canvas_ref} class="canvas"></canvas>
    <div class="tool-bar-container right">
        <div class="tool-bar col">
            <label>
                Type:
            </label>
            <Selection options={type} get={"Sculpt"}/>
            <label>
                Tools:
            </label>
            <Selection options={tools} get={config.tool} set={v=>config.tool = v}/>
        </div>
        <div class="tool-bar col">
            <label>Brush shape</label>
            <Selection options={shape} get={"Circle"}/>
            <label>Flood options</label>
            <div class="row">
                <ToggleButton name="Contiguous" get={x=>true}/>
            </div>
        </div>
        <div class="tool-bar col">
            <label>Geometry</label>
            <div class="row">
                <button class="button">Subdivide</button>
                <button class="button">Merge</button>
            </div>
        </div>


    </div>
    <div class="tool-bar-container">
        <div class="tool-bar col">
            <label>Brush size</label>
            <Slider  min={1} max={100} step={1} get={1}/>
            <label>Feather</label>
            <Slider min={0} max={1} step={0.1} get={0} />
        </div>
        <div class="tool-bar col">
            <label>Color</label>
            <ColorDisplay />
        </div>
        <div class="tool-bar col">
            <label>Palette</label>
            <ColorPalette/>
        </div>
    </div>
</div>
</div>
app.$parent(document.body)


const {draw} = useMain(canvas_ref,config)
animationLoop(draw)
