
import global from "../../../global"

export {project2JSON,JSON2Project}

function project2JSON() {
    return{
        voxels: global.voxel.getVoxels(),
        layers: Object.values(global.layers).map(x=>{return {id:x.id,text:x.text}}),
    }
}
function JSON2Project(json) {
    global.clearLayer()
    for(const {id,text} of json.layers)
    {
        global.add_layer(id,text)
    }
    global.voxel.add(json.voxels)
}