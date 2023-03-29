export default GreedyMesh
//Cache buffer internally
var mask = new Int32Array(4096);

function toTriangle(quad)
{
    return [
        quad[0], quad[1], quad[2],
        quad[0], quad[2], quad[3],
    ];
}
function GreedyMesh(voxels,face_colors, triangles = true, flatten = true)
{
    console.clear()

    var face_color = {}

    for(var i = 0; i < voxels.length; i++)
    {
        var voxel = voxels[i]
        var face_0_from = [voxel[0],voxel[1],voxel[2]]
        var face_0_to = [voxel[0],voxel[1]+1,voxel[2]+1]

        var face_1_from = [voxel[0],voxel[1],voxel[2]]
        var face_1_to = [voxel[0]+1,voxel[1],voxel[2]+1]

        var face_2_from = [voxel[0],voxel[1],voxel[2]]
        var face_2_to = [voxel[0]+1,voxel[1]+1,voxel[2]]

        var face_3_from = [voxel[0]+1,voxel[1],voxel[2]]
        var face_3_to = [voxel[0]+1,voxel[1]+1,voxel[2]+1]

        var face_4_from = [voxel[0],voxel[1]+1,voxel[2]]
        var face_4_to = [voxel[0]+1,voxel[1]+1,voxel[2]+1]

        var face_5_from = [voxel[0],voxel[1],voxel[2]+1]
        var face_5_to = [voxel[0]+1,voxel[1]+1,voxel[2]+1]

        face_color[face_0_from.join(",")+"|"+face_0_to.join(",")] = face_colors[i][0]
        face_color[face_1_from.join(",")+"|"+face_1_to.join(",")] = face_colors[i][1]
        face_color[face_2_from.join(",")+"|"+face_2_to.join(",")] = face_colors[i][2]
        face_color[face_3_from.join(",")+"|"+face_3_to.join(",")] = face_colors[i][3]
        face_color[face_4_from.join(",")+"|"+face_4_to.join(",")] = face_colors[i][4]
        face_color[face_5_from.join(",")+"|"+face_5_to.join(",")] = face_colors[i][5]
        
    }


    var [min_x,min_y,min_z,max_x,max_y,max_z] = get_bounds(voxels)

    
    var volume = new Int32Array((max_x-min_x+1)*(max_y-min_y+1)*(max_z-min_z+1))


    var dims = [max_x-min_x+1,max_y-min_y+1,max_z-min_z+1]

    for(var i = 0; i < voxels.length; i++)
    {
        var voxel = voxels[i]
        volume[
            (voxel[0]-min_x) +
            (voxel[1]-min_y)*dims[0] +
            (voxel[2]-min_z)*dims[0]*dims[1]
        ] = 1
    }
    var { vertices, faces,normals, uvs, uv_faces } = process(volume,dims); 

    for(var i = 0; i < vertices.length; i++)
    {
        vertices[i][0] += min_x
        vertices[i][1] += min_y
        vertices[i][2] += min_z 
    }


    var colors = []

    for(var i = 0; i < vertices.length; i+=4)
    {
        var normal = normals[i]
        var direction = normal[0] != 0 ? 0 : normal[1] != 0 ? 1 : 2

        var s = [...vertices[i]]
        var e = [...vertices[i+2]]

        var min = [Math.min(s[0],e[0]),Math.min(s[1],e[1]),Math.min(s[2],e[2])]
        var max = [Math.max(s[0],e[0]),Math.max(s[1],e[1]),Math.max(s[2],e[2])]


        max[direction] += 1
        var current_color = []
        colors.push(current_color)

        for(var j = min[0]; j < max[0]; j++)
        for(var k = min[1]; k < max[1]; k++)
        for(var l = min[2]; l < max[2]; l++)
        {
            var start = [j,k,l]
            var end = [j+1,k+1,l+1]
            end[direction] -= 1
            var color = face_color[start.join(",")+"|"+end.join(",")]
            var rotate = 0
            if(normal[0] < 0) rotate = -90
            if(normal[1] > 0) rotate = -90
            if(normal[2] > 0) rotate = -90
            var position = start.map((v,i)=>v-min[i])
            position.splice(direction,1)
            if(rotate == -90) position.reverse()
            current_color.push({color,position})
        }
    }

    var canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 512
    var ctx = canvas.getContext("2d")

    var x = 0
    for(var i = 0; i < colors.length; i++)
    {
        var w = 1
        for(var j = 0; j < colors[i].length; j++)
        {
            var color = colors[i][j].color
            var position = colors[i][j].position
            ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`
            ctx.fillRect((position[0]+x)*16,position[1]*16,16,16)

            // uvs[i*4][0] += x
            // uvs[i*4+1][0] += x
            // uvs[i*4+2][0] += x
            // uvs[i*4+3][0] += x
            w = Math.max(w,position[0]+1)
        }
        x+=w
    }

    // console.log(uvs)

    var link = document.createElement("a")
    link.download = "image.png"
    link.href = canvas.toDataURL()
    link.click()
    link.remove()


    if(triangles)
    {
        faces = faces.map(toTriangle)
        // uv_faces = uv_faces.map(toTriangle)
    }

    if(flatten)
    {
        vertices = vertices.flat()
        faces = faces.flat()
        normals = normals.flat()
        uvs = uvs.flat()
    }
    return {vertices,faces,normals,uvs}

}

function get_bounds(points)
{
    var min_x = points[0][0]
    var max_x = points[0][0]
    var min_y = points[0][1]
    var max_y = points[0][1]
    var min_z = points[0][2]
    var max_z = points[0][2]
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
        if(point[2] < min_z)
        {
            min_z = point[2]
        }
        if(point[2] > max_z)
        {
            max_z = point[2]
        }
    }
    return [min_x,min_y,min_z,max_x,max_y,max_z]
}

function process(volume, dims) {
    var vertices = [], faces = [], normals = [], uvs = []
    , dimsX = dims[0]
    , dimsY = dims[1]
    , dimsXY = dimsX * dimsY;
    //Sweep over 3-axes
    for(var d=0; d<3; ++d) {
    var i, j, k, l, w, W, h, n, c
        , u = (d+1)%3
        , v = (d+2)%3
        , x = [0,0,0]
        , q = [0,0,0]
        , du = [0,0,0]
        , dv = [0,0,0]
        , dimsD = dims[d]
        , dimsU = dims[u]
        , dimsV = dims[v]
        , qdimsX, qdimsXY
        , xd

    if (mask.length < dimsU * dimsV) {
        mask = new Int32Array(dimsU * dimsV);
    }

    q[d] =  1;
    x[d] = -1;

    qdimsX  = dimsX  * q[1]
    qdimsXY = dimsXY * q[2]

    // Compute mask
    while (x[d] < dimsD) {
        xd = x[d]
        n = 0;

        for(x[v] = 0; x[v] < dimsV; ++x[v]) {
        for(x[u] = 0; x[u] < dimsU; ++x[u], ++n) {
            var a = xd >= 0      && volume[x[0]      + dimsX * x[1]          + dimsXY * x[2]          ]
            , b = xd < dimsD-1 && volume[x[0]+q[0] + dimsX * x[1] + qdimsX + dimsXY * x[2] + qdimsXY]
            if (a ? b : !b) {
            mask[n] = 0; continue;
            }
            mask[n] = a ? a : -b;
        }
        }

        ++x[d];

        // Generate mesh for mask using lexicographic ordering
        n = 0;
        for (j=0; j < dimsV; ++j) {
        for (i=0; i < dimsU; ) {
            c = mask[n];
            if (!c) {
            i++;  n++; continue;
            }

            //Compute width
            w = 1;
            while (c === mask[n+w] && i+w < dimsU) w++;

            //Compute height (this is slightly awkward)
            for (h=1; j+h < dimsV; ++h) {
            k = 0;
            while (k < w && c === mask[n+k+h*dimsU]) k++
            if (k < w) break;
            }

            // Add quad
            // The du/dv arrays are reused/reset
            // for each iteration.
            du[d] = 0; dv[d] = 0;
            x[u]  = i;  x[v] = j;

            if (c > 0) {
                dv[v] = h; dv[u] = 0;
                du[u] = w; du[v] = 0;
            } else {
                c = -c;
                du[v] = h; du[u] = 0;
                dv[u] = w; dv[v] = 0;
            }
            var vertex_count = vertices.length;
            vertices.push([x[0],             x[1],             x[2]            ]);
            vertices.push([x[0]+du[0],       x[1]+du[1],       x[2]+du[2]      ]);
            vertices.push([x[0]+du[0]+dv[0], x[1]+du[1]+dv[1], x[2]+du[2]+dv[2]]);
            vertices.push([x[0]      +dv[0], x[1]      +dv[1], x[2]      +dv[2]]);
            faces.push([vertex_count, vertex_count+1, vertex_count+2, vertex_count+3, c]);


            var v1 = vertices[vertex_count];
            var v2 = vertices[vertex_count+1];
            var v3 = vertices[vertex_count+2];
            var v4 = vertices[vertex_count+3];
            
            var normal = [    
                (v2[1]-v1[1])*(v3[2]-v1[2]) - (v2[2]-v1[2])*(v3[1]-v1[1]),
                (v2[2]-v1[2])*(v3[0]-v1[0]) - (v2[0]-v1[0])*(v3[2]-v1[2]),
                (v2[0]-v1[0])*(v3[1]-v1[1]) - (v2[1]-v1[1])*(v3[0]-v1[0])
            ];


            // get the uv coordinates flat on the direction where the normal is 0
            var width = 0
            var height = 0

            var rotate = 0
            
            function bound_box(u0,u1,u2,u3) {
                var min_x = Math.min(u0[0], u1[0], u2[0], u3[0]);
                var max_x = Math.max(u0[0], u1[0], u2[0], u3[0]);
                var min_y = Math.min(u0[1], u1[1], u2[1], u3[1]);
                var max_y = Math.max(u0[1], u1[1], u2[1], u3[1]);
                return [min_x, max_x, min_y, max_y];
            }

            function exclude_axis(vector,axis)
            {
                var result = [...vector];
                result.splice(axis,1);
                return result
            }
            if(normal[0] != 0)
            {
                var u0 = exclude_axis(v1,0);
                var u1 = exclude_axis(v2,0);
                var u2 = exclude_axis(v3,0);
                var u3 = exclude_axis(v4,0);
                var bb = bound_box(u0,u1,u2,u3);
                if(normal[0] > 0)
                {
                    rotate = -90
                }
                width = bb[3] - bb[2];
                height = bb[1] - bb[0];
            }
            else if(normal[1] != 0)
            {
                var u0 = exclude_axis(v1,1);
                var u1 = exclude_axis(v2,1);
                var u2 = exclude_axis(v3,1);
                var u3 = exclude_axis(v4,1);
                var bb = bound_box(u0,u1,u2,u3);
                if(normal[1] < 0)
                {
                    rotate = -90
                }
                width = bb[3] - bb[2];
                height = bb[1] - bb[0];
            }
            else if(normal[2] != 0)
            {
                var u0 = exclude_axis(v1,2);
                var u1 = exclude_axis(v2,2);
                var u2 = exclude_axis(v3,2);
                var u3 = exclude_axis(v4,2);
                var bb = bound_box(u0,u1,u2,u3);
                if(normal[2] < 0)
                {
                    rotate = -90
                }
                width = bb[1] - bb[0];
                height = bb[3] - bb[2];
            }
                
            if(rotate == 0)
            {
                uvs.push([0,0]);
                uvs.push([width,0]);
                uvs.push([width,height]);
                uvs.push([0,height]);
            }
            else if (rotate == -90)
            {
                uvs.push([0,0]);
                uvs.push([0,height]);
                uvs.push([width,height]);
                uvs.push([width,0]);
            }


            
            
            // normalize the normal vector
            var length = Math.sqrt(normal[0]*normal[0] + normal[1]*normal[1] + normal[2]*normal[2]);
            normal[0] /= length;
            normal[1] /= length;
            normal[2] /= length;
            
            // Add the normal vector to the normals array for each vertex of the face
            normals.push(normal);
            normals.push(normal);
            normals.push(normal);
            normals.push(normal);


            //Zero-out mask
            W = n + w;
            for(l=0; l<h; ++l) {
            for(k=n; k<W; ++k) {
                mask[k+l*dimsU] = 0;
            }
            }

            //Increment counters and continue
            i += w; n += w;
        }
        }
    }
    }
    return { vertices, faces, normals, uvs };
}