export {LoadProject}
import global from "../../global"

function LoadProject()
{
    //load prompt
    var file = document.createElement("input")
    file.type = "file"
    file.accept = ".vox"
    file.onchange = function()
    {
        var reader = new FileReader()
        reader.onload = function()
        {
            var data = JSON.parse(reader.result)
            global.clearLayer()
            for(const {id,text} of data.layers)
            {
                global.add_layer(id,text)
            }
            global.voxel.replace(data.voxels)
        }
        reader.readAsText(file.files[0])
    }
    file.click()
}