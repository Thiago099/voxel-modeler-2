
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'

import DropDownMenu from './components/drop-down-menu/drop-down-menu'
import Selection from './components/selection/selection'
import ToggleButton from './components/toggle-button/toggle-button'
const main_menu_options = [
    {
        text: "New",
        action: () => {
            alert("New")
        }
    },{},
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
    },
    {},
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
    {},
    {
        text: "Wireframe",
        get: () => true,
        set: (value) => {
            // alert(value)
        }
    }

]
        

const type = ["Sculpt","Paint"]
const shape = ["Circle","Square"]
const tools = ["Pen","Line","Plane","Box"]


const app =
<div>
<div class="header">
    <div class="title">
        Voxel modeler 2
    </div>
    <div class="divider"></div>
    <DropDownMenu options={main_menu_options} name="File"/>
    <DropDownMenu options={view_options} name="View"/>
</div>
<div class="program">
    <canvas class="canvas"></canvas>
    <div class="tool-bar-container right">
        <div class="tool-bar col">
            <label>
                Type:
            </label>
            <Selection options={type} get={()=>"Sculpt"}/>
            <label>
                Tools:
            </label>
            <Selection options={tools} get={()=>"Pen"}/>
        </div>
        <div class="tool-bar col">
            <label>Brush shape</label>
            <Selection options={shape} get={()=>"Circle"}/>
            <label>Flood options</label>
            <div class="row">
                <ToggleButton name="Contiguous"/>
            </div>
        </div>
        <div class="tool-bar col">
            <label>Brush size</label>
        </div>
    </div>
</div>
</div>


app.$parent(document.body)