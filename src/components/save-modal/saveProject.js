export {SaveProject}
import global from "../../global"
import { SaveModal } from "./save-modal"

function SaveProject()
{
    SaveModal("vox", {
        voxels: global.voxel.voxels,
        layers: global.layers.map(x=>{return {id:x.id,text:x.text}}),
    })
}