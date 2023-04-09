
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'

import DropDownMenu from './components/drop-down-menu/drop-down-menu'
import Selection from './components/selection/selection'
import ToggleButton from './components/toggle-button/toggle-button'
import Slider from './components/slider/slider'
import ColorDisplay from './components/color-display/color-display'
import ColorPalette from './components/color-palette/color-palette'
import SceneColors from './components/scene-colors/scene-colors'
import animationLoop from './js-components/animation-loop'
import useMain from './main.js'
import Layer from './components/layer/layer'

const config = {
    tool: "Pen",
    brushSize: 1,
    background: { r: 0, g: 0, b: 0, a: 1 },
    foreground: { r: 255, g: 255, b: 255, a: 1 },
}

const errorCallback = () => console.error("Render target callback not set")
const callbacks = {
    renderTarget: errorCallback,
}

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
    {
        text: "Export visible",
        action: () => {
            alert("Export visible")
        }
    },
    {
        text: "Export selection",
        action: () => {
            alert("Export selection")
        }
    }
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
        options: ["Wireframe selected", "Wireframe all", "Wireframe none"],
        set: (value) => {
            // alert(value)
        }
    }
]
const edit_options = [
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
    },,
    {
        text: "Mirror X",
        get: () => false,
        set: (value) => {
            // alert(value)
        }
    },
    {
        text: "Mirror Y",
        get: () => false,
        set: (value) => {
            // alert(value)
        }
    },
    {
        text: "Mirror Z",
        get: () => false,
        set: (value) => {
        }
    }
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
const tools = ["Pen","Line","Extrude","Box","Plane","Move"]


const raster_canvas = ref()
const render_canvas = ref()
const canvas_container = ref()

const program = ref()

const palette = ref()

const app =
<div>
<div class="header">
    <div class="title">
        Voxel modeler 2
    </div>
    <div class="divider"></div>
    <DropDownMenu options={main_menu_options} name="File"/>
    <DropDownMenu options={edit_options} name="Edit"/>
    <DropDownMenu options={view_options} name="View"/>
    <DropDownMenu options={color_options} name="Color"/>
</div>
<div class="canvas-container" ref={canvas_container}>
    <canvas ref={raster_canvas} class="canvas"></canvas>
    <canvas ref={render_canvas} class="canvas"></canvas>
</div>
<div class="program" ref={program}>
    <div class="tool-bar-container right">
        <div class="tool-bar col">
            <label>Render mode</label>
            <ToggleButton name="Render mode" get={()=>false} set={(value)=>{callbacks.renderTarget(value)}}/>
        </div>
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
        </div>
        {/* <div class="tool-bar col">
            <label>Geometry</label>
            <div class="row">
                <button class="button">Subdivide</button>
                <button class="button">Merge</button>
            </div>
        </div> */}
        <div class="tool-bar col">
            <label>Layers</label>
            <Layer config={config}/>
        </div>



    </div>
    <div class="tool-bar-container">
        <div class="tool-bar col">
            <label>Brush size</label>
            <Slider  min={1} max={20} step={1} get={config.brushSize} set={value => config.brushSize = value}/>
            <label>Feather</label>
            <Slider min={0} max={1} step={0.1} get={0} />
        </div>
        <div class="tool-bar col">
            <label>Color</label>
            <ColorDisplay get={()=>[config.background,config.foreground]} set={(background,foreground)=>updateColor(background,foreground)}/>
        </div>
        <div class="tool-bar col">
            <label>Palette</label>
            <ColorPalette 
                ref={palette}
                get_foreground={config.foreground} 
                set_foreground={v=>set_foreground(v)}
                set_background={v=>set_background(v)}
            />
        </div>
        <div class="tool-bar col">
            <label>Scene colors</label>
            <SceneColors get={config.voxel}/>
        </div>

    </div>
</div>
</div>

function set_foreground(value) {
    config.foreground = value
    app.$update()
}
function set_background(value) {
    config.background = value
    app.$update()
}
function updateColor(background,foreground) {
    config.foreground = foreground
    config.background = background
    palette.$update()
}

app.$parent(document.body)

program.$on("mousedown", (e) => {
    e.stopPropagation()
})

useMain(canvas_container, raster_canvas,render_canvas,config).then(({draw})=>animationLoop(draw))



// const canvasContainer = <div id="canvas-container"></div>
// canvasContainer.$parent(document.body)
// canvasContainer.style.position = "absolute";
// canvasContainer.style.top = "0px";
// canvasContainer.style.right = "0px";