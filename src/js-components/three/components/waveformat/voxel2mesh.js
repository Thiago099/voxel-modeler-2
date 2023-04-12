import {getGeometry,weld} from './get_voxel_shape'

const directions = [
    [0,0,1],
    [0,0,-1],
    [0,1,0],
    [0,-1,0],
    [1,0,0],
    [-1,0,0],
]
const relevant =[2,2,1,1,0,0]
const pad = [1,0,1,0,1,0]

function get_bounds(points)
{
    var min_x = points[0][0]
    var max_x = points[0][0]
    var min_y = points[0][1]
    var max_y = points[0][1]
    for(var i = 1; i < points.length; i++)
    {
        var point = points[i]
        if(point[0] < min_x)
        {
            min_x = point[0]
        }
        if(point[0] > max_x)
        {
            max_x = point[0]
        }
        if(point[1] < min_y)
        {
            min_y = point[1]
        }
        if(point[1] > max_y)
        {
            max_y = point[1]
        }
    }
    return [min_x,min_y,max_x,max_y]
}

function voxel2mesh(points,faces,colors)
{
    var layers = {}
    for(var i=0;i<faces.length;i++)
    {
        var direction_id = 0
        for(var j = 0; j < faces[i].length; j++)
        {
            if(faces[i][j] == 0)
            {
                direction_id += 1
                continue
            }
            var id = `${points[i][relevant[direction_id]]},${direction_id}`
            if(layers[id] == undefined)
            {
                layers[id] = {
                    direction:direction_id,
                    relevant:relevant[direction_id],
                    position:points[i][relevant[direction_id]]+pad[direction_id],
                    data:[],
                    colors:[]
                }
            }
            layers[id].data.push(points[i].filter((_,index)=>index!=relevant[direction_id]))
            layers[id].colors.push(colors[i])
            direction_id += 1
        }
    }
    for(var i in layers)
    {
        layers[i].geometry = getGeometry(layers[i].data)
    }

    var uv_position = []
    var uv_index = []

    var result_position = []
    var result_index = []
    var normal = []
    var uv_color = []
    var offset = 0

    var x = 0
    var y = 0
    var max_height = 0
    var max_width = 0

    var all_bounds = Object.values(layers).map(x=>get_bounds(x.data))
    var full_width = all_bounds.reduce((a,b)=>a+b[2]-b[0]+1,0)
    var full_height = all_bounds.reduce((a,b)=>Math.max(a,b[3]-b[1]+1),0)

    var row_width_for_sqaure = Math.ceil(Math.sqrt(full_width * full_height))


    var local_height = 0
    for(var i in layers)
    {
        var layer = layers[i]

        var reverse = false
        if(layer.direction == 4 || layer.direction == 5)
        {
            reverse = true
        }

        var [min_x,min_y,max_x,max_y] = get_bounds(layer.data)



        if(x > row_width_for_sqaure)
        {
            x = 0;
            y += local_height + 1
            local_height = 0
        }
        if(h > local_height)
        {
            local_height = h
        }

        
        if(reverse)
        {
            var w = max_y
            var h = max_x - min_x
            x-=min_y
        }
        else
        {
            var w = max_x
            var h = max_y - min_y
            x-=min_x
        }

        if(reverse)
        {
            var cy = y - min_x
        }
        else
        {
            var cy = y - min_y
        }



        for(var index in layer.data)
        {
            var color = layer.colors[index]
            var position = layer.data[index]

            if(reverse)
            {
                uv_color.push({
                    color,
                    position:[position[1]+x,cy+position[0]],
                })
            }
            else
            {
                uv_color.push({
                    color,
                    position:[position[0]+x,cy+position[1]],
                })
            }
        }

        for(var index in layer.geometry)
        {
            var result = layer.geometry[index]
            for(var j =0;j<result.positions.length;j+=2)
            {
                var current = [result.positions[j],result.positions[j+1]]
                current.splice(layer.relevant,0,layer.position)
                result_position.push(current)
                if(reverse)
                {
                    uv_position.push([result.positions[j+1]+x,cy+result.positions[j]])
                }
                else
                {
                    uv_position.push([result.positions[j]+x,cy+result.positions[j+1]])
                }
            }
            for(var j =0;j<result.indices.length;j+=3)
            {
                normal.push(layer.direction+1)
                var face = [result.indices[j]+offset,result.indices[j+1]+offset,result.indices[j+2]+offset]
                // fix the orientation
                if(layer.direction == 1)
                {
                    var temp = face[0]
                    face[0] = face[1]
                    face[1] = temp
                }
                if(layer.direction == 2)
                {
                    var temp = face[0]
                    face[0] = face[2]
                    face[2] = temp
                }
                if(layer.direction == 5)
                {
                    var temp = face[1]
                    face[1] = face[2]
                    face[2] = temp
                }
                uv_index.push(face.map(x=>x+1))
                result_index.push(face)
            }
            offset += result.positions.length / 2
            
        }
        x += w + 1

        if(x > max_width)
        {
            max_width = x
        }
        if(y > max_height)
        {
            max_height = y
        }

    }
    max_height += local_height + 1
    uv_position = uv_position.map(z=>[z[0]/max_width,z[1]/max_height])


    for(var i in uv_color)
    {
        uv_color[i].position = [uv_color[i].position[0],max_height-1-uv_color[i].position[1]]
    }

    var [vert,index] = weld(result_index,result_position)
    return {vert,index,normal,uv_position,uv_index,uv_color,width:max_width,height:max_height}
}

export {voxel2mesh}