import global from "../../global";
export {getPane}
function getPane(origin,axis,normal_direction)
{
    var result = []
    const visited = new Set();
    loop(origin)
    return result
    function loop(voxel)
    {
        var id = voxel.x + "," + voxel.y + "," + voxel.z
        if(!global.voxel.hasVoxelAt(voxel) || visited.has(id)) return;
        visited.add(id)
        result.push(voxel)
        var nv = {...voxel}
        nv[axis] += normal_direction
        if(axis != "x")
        {
            if(!global.voxel.hasVoxelAt({x:nv.x+1,y:nv.y,z:nv.z}))
            loop({x:voxel.x+1,y:voxel.y,z:voxel.z})
            if(!global.voxel.hasVoxelAt({x:nv.x-1,y:nv.y,z:nv.z}))
            loop({x:voxel.x-1,y:voxel.y,z:voxel.z})
        }
        if(axis != "y")
        {
            if(!global.voxel.hasVoxelAt({x:nv.x,y:nv.y+1,z:nv.z}))
            loop({x:voxel.x,y:voxel.y+1,z:voxel.z})
            if(!global.voxel.hasVoxelAt({x:nv.x,y:nv.y-1,z:nv.z}))
            loop({x:voxel.x,y:voxel.y-1,z:voxel.z})
        }
        if(axis != "z")
        {
            if(!global.voxel.hasVoxelAt({x:nv.x,y:nv.y,z:nv.z+1}))
            loop({x:voxel.x,y:voxel.y,z:voxel.z+1})
            if(!global.voxel.hasVoxelAt({x:nv.x,y:nv.y,z:nv.z-1}))
            loop({x:voxel.x,y:voxel.y,z:voxel.z-1})
        }
    }
}