import { generateGeometry } from "../../js-components/three/components/waveformat/generateGeometry"
import modal from "../modal/modal"
import Slider from "../slider/slider"
import ToggleButton from "../toggle-button/toggle-button"
export {ExportModal}


function ExportModal(voxels)
{
    
    const saveButton = ref()
    const model = state({filename:"New project",geometry:true,texture:true,pixelSize:1})
    //if has name on local storage, use it

    var md = localStorage.getItem("model")
    if(md)
    {
        md = JSON.parse(md)
        model.filename = md.filename
        model.geometry = md.geometry
        model.texture = md.texture
        model.pixelSize = md.pixelSize

    }


    var item = localStorage.getItem("filename")
    if(item)
    {
        model.filename = item
    }
    

    const content = <div class="modal-medium col">
        <div class="row">
            <div class="input-group flex">
                <label>File name</label>
                <input type="text" class="input" model={model.filename}/>
            </div>
            <div style="flex:1;margin-top:10px;">
                <label>Pixel size</label>
                <Slider min={1} max={100} step={1} get={model.pixelSize} set={value => model.pixelSize = value} />
            </div>
        </div>
        <div class="row padding-top">
            <div class="input-group flex">
                <ToggleButton name="geometry" get={model.geometry} set={value=>model.geometry = value}></ToggleButton>
            </div>
            <div class="input-group flex">
                <ToggleButton name="texture" get={model.texture} set={value=>model.texture =value}></ToggleButton>
            </div>
        </div>
        <button class="button corner" ref={saveButton}>Save</button>
    </div>
    const {close} = modal(content)
    saveButton.$on("click", () => {
        localStorage.setItem("filename", model.filename)
        localStorage.setItem("model", JSON.stringify(model))
        generateGeometry(voxels,model.filename, model.geometry, model.texture, model.pixelSize)
        close()
    })
}