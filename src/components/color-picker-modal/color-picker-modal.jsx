import modal from "../modal/modal";
import data from "../../js-components/global";

import Slider from '../slider/slider.jsx'
import Selection from "../selection/selection";
export default color_picker_modal

function color_picker_modal(initial_color, callback)
{
    const types = ["Regular","Refractive","Metalic"]

    function updateKind(kind)
    {

        if(kind == "Regular")
        {
            data.material[0] = 0
            data.material[2] = 0
        }
        else if(kind == "Refractive")
        {
            data.material[0] = 255
            data.material[2] = 0
        }
        else if(kind == "Metalic")
        {
            data.material[0] = 0
            data.material[2] = 255
        }
        data.kind = kind
    }
    var content = 
    <div class="modal-regular" style="height:100px">
        <div class="row">
            <button class="button" on:click={open}>Pick color</button>
            <div style="flex:1">
                <label> Roughness </label>
                <Slider  min={0} max={255} step={1} get={data.material[1]} set={value => data.material[1] = value}/>
            </div>
            <div style="flex:1">
                <label> Emissive </label>
                <Slider  min={0} max={255} step={1} get={data.material[3]} set={value => data.material[3] = value}/>
            </div>
        </div>
        <Selection options={types} get={data.kind} set={(x)=>updateKind(x)}/>
    </div>
    var {close} = modal(content)
    function open()
    {
        var color = <input type="color" model={data.color} />
        setTimeout(() => color.click(), 0)
    }
}
