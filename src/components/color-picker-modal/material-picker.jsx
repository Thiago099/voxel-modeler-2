import modal from "../modal/modal";
import global from "../../global";

import Slider from '../slider/slider.jsx'
import Selection from "../selection/selection";
export default materialPicker

function materialPicker(initial_color, callback)
{
    const types = ["Regular","Refractive","Metalic"]
    if(initial_color.reflective == undefined)
    {
        initial_color.reflective = 0
    }
    if(initial_color.refractive == undefined)
    {
        initial_color.refractive = 0
    }
    if(initial_color.roughness == undefined)
    {
        initial_color.roughness = 0
    }
    if(initial_color.emissive == undefined)
    {
        initial_color.emissive = 0
    }
    var kind = "Regular"

    function updateKind(kind)
    {

        if(kind == "Regular")
        {
            initial_color.refractive = 0
            initial_color.reflective = 0
        }
        else if(kind == "Refractive")
        {
            initial_color.refractive = 255
            initial_color.reflective = 0
        }
        else if(kind == "Metalic")
        {
            initial_color.refractive = 0
            initial_color.reflective = 255
        }
        initial_color.kind = kind
    }
    var content = 
    <div class="modal-regular" style="height:100px">
        <div class="row">
            <div style="flex:1">
                <label> Roughness </label>
                <Slider  min={0} max={255} step={1} get={initial_color.roughness} set={value => initial_color.roughness = value}/>
            </div>
            <div style="flex:1">
                <label> Emissive </label>
                <Slider  min={0} max={255} step={1} get={initial_color.emissive} set={value => initial_color.emissive = value}/>
            </div>
        </div>
        <Selection options={types} get={kind} set={(x)=>updateKind(x)}/>
    </div>
    var {close} = modal(content)
}
