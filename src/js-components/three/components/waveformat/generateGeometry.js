import { build_hd_texture,build_texture,build_obj_file } from "./waveformat"
import { voxel2mesh } from "./voxel2mesh"

import global from "@/global"

export {generateGeometry}


function getNormal(voxel, normal)
{
    var normal = {x:voxel.x+normal.x,y:voxel.y+normal.y,z:voxel.z+normal.z}
    return `${normal.x},${normal.y},${normal.z}`
}

function build_faces(voxels)
{
    const faces = new Array(voxels.length).fill(0).map(x => [1,1,1,1,1,1]);

    var map = {}

    for(var i = 0; i < voxels.length; i++)
    {
        map[`${voxels[i].x},${voxels[i].y},${voxels[i].z}`] = i
    }

    for(var i = 0; i < voxels.length; i++)
    // for(var j = i+1; j < voxels.length; j++)
    {
        var top = map[getNormal(voxels[i],{x:1,y:0,z:0})]

        if(top)
        {
            faces[i][4] = 0;
            faces[top][5] = 0;
        }
        
        var bottom = map[getNormal(voxels[i],{x:-1,y:0,z:0})]

        if(bottom)
        {
            faces[i][5] = 0;
            faces[bottom][4] = 0;
        }
        var right = map[getNormal(voxels[i],{x:0,y:1,z:0})]

        if(right)
        {
            faces[i][2] = 0;
            faces[right][3] = 0;
        }
        var left = map[getNormal(voxels[i],{x:0,y:-1,z:0})]

        if(left)
        {
            faces[i][3] = 0;
            faces[left][2] = 0;
        }
        var front =  map[getNormal(voxels[i],{x:0,y:0,z:1})]

        if(front)
        {
            faces[i][0] = 0;
            faces[front][1] = 0;
        }            
        var back =  map[getNormal(voxels[i],{x:0,y:0,z:-1})]
        if(back)
        {
            faces[i][1] = 0;
            faces[back][0] = 0;
        }
    }
    return faces;
}

function generateGeometry()
{
    var texture = true
    var geometry = true
    var square_size = 16
    var filename = "test"

    const voxels = global.voxel.getVoxels()
    const faces = build_faces(voxels)
    var data = voxel2mesh(voxels.map(x=>[x.x,x.y,x.z]),faces,voxels.map(x=>[x.color.r,x.color.g,x.color.b]))
    if(texture)
    {
        if(square_size <= 1)
        {
            var img = build_texture(data)
            SaveImage(filename+".png",img)
        }
        else
        {
            var img = build_hd_texture(data,square_size)
            SaveImage(filename+".png",img)
        }
    }
    if(geometry)
    {
        var obj = build_obj_file(data)
        SaveText(filename+".obj",obj)
    }
}

function SaveText(name, data)
{
    var blob = new Blob([data], {type: "plain/text"});
    var url  = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.download    = name;
    a.href        = url;
    a.textContent = "Download";
    a.click();
    a.remove()
}
function SaveImage(name, data)
{
    var link = document.createElement('a');
    link.download = name;
    link.href = data;
    link.click();
    link.remove();
}