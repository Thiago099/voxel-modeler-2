
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'

import DropDownMenu from './components/drop-down-menu/drop-down-menu'
import Selection from './components/selection/selection'
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

const type = ["Paint","Sculpt"]
const tools = ["Pen","Line","Plane","Box"]


const app =
<div>
<div class="header">
    <div class="title">
        Voxel modeler 2
    </div>
    <div class="divider"></div>
    <DropDownMenu options={main_menu_options} name="File"/>
</div>
<div class="program">
    <canvas class="canvas"></canvas>
    <div class="tool-bar-container right">
        <div class="tool-bar col right">
            <label>
                Type:
            </label>
            <Selection options={type} get={()=>"Paint"}/>
            <label>
                Tools:
            </label>
            <Selection options={tools} get={()=>"Pen"}/>
        </div>
        <div class="tool-bar col right">
            <label>Brush options</label>
        </div>
    </div>
</div>
</div>


app.$parent(document.body)