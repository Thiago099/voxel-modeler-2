export {GreedyMesh}
//Cache buffer internally
var mask = new Int32Array(4096);

function GreedyMesh(voxels,voxel_obj)
{
    if(voxels.length == 0)
    {
        return {vertices:[],faces:[],normals:[]}
    }
    // const color = computeColor(voxels,voxel_obj)
    const volume = buildVolume(voxels)

    return {geometry:buildGreedyGeometry(volume),edges:BuildCulledGeometry(volume)}
}
function buildGreedyGeometry({volume,dims,bounds})
{
    const {min_x,min_y,min_z} = bounds
    let {vertices,faces,normals,uvs} = process(volume,dims)
    for(var i = 0; i < vertices.length; i++)
    {
        vertices[i][0] += min_x
        vertices[i][1] += min_y
        vertices[i][2] += min_z 
    }
    faces = faces.map(toTriangle)
    vertices = vertices.flat()
    faces = faces.flat()
    normals = normals.flat()
    uvs = uvs.flat()
    return  {vertices, faces, normals};
}

function BuildCulledGeometry({volume,dims,bounds})
{
    const {min_x,min_y,min_z} = bounds
    var {vertices, faces} = cull(volume,dims)

    for(var i = 0; i < vertices.length; i++)
    {
        vertices[i][0] += min_x
        vertices[i][1] += min_y
        vertices[i][2] += min_z 
    }

    for(var i = 0; i < vertices.length; i+=4)
    {
        var v1 = vertices[i];
        var v2 = vertices[i+1];
        var v3 = vertices[i+2];
        var v4 = vertices[i+3];
        
        var normal = [    
            (v2[1]-v1[1])*(v3[2]-v1[2]) - (v2[2]-v1[2])*(v3[1]-v1[1]),
            (v2[2]-v1[2])*(v3[0]-v1[0]) - (v2[0]-v1[0])*(v3[2]-v1[2]),
            (v2[0]-v1[0])*(v3[1]-v1[1]) - (v2[1]-v1[1])*(v3[0]-v1[0])
        ];

        var factor = 0.001

        v1[0] = v1[0]+normal[0]*factor
        v1[1] = v1[1]+normal[1]*factor
        v1[2] = v1[2]+normal[2]*factor

        v2[0] = v2[0]+normal[0]*factor
        v2[1] = v2[1]+normal[1]*factor
        v2[2] = v2[2]+normal[2]*factor

        v3[0] = v3[0]+normal[0]*factor
        v3[1] = v3[1]+normal[1]*factor
        v3[2] = v3[2]+normal[2]*factor

        v4[0] = v4[0]+normal[0]*factor
        v4[1] = v4[1]+normal[1]*factor
        v4[2] = v4[2]+normal[2]*factor


    }


    var new_vertices = []
    for(var i = 0; i < vertices.length; i+=2)
    {
        new_vertices.push(vertices[i])
        new_vertices.push(vertices[i+1])
        new_vertices.push(vertices[i+1])

    }

    vertices = new_vertices.flat()
    faces = faces.flat()

    return {vertices, faces}
}

function buildVolume(voxels)
{
    var bounds = get_bounds(voxels)
    const {min_x,min_y,min_z,max_x,max_y,max_z} = bounds

    var volume = new Int32Array((max_x-min_x+1)*(max_y-min_y+1)*(max_z-min_z+1))

    var dims = [max_x-min_x+1,max_y-min_y+1,max_z-min_z+1]

    for(var i = 0; i < voxels.length; i++)
    {
        var voxel = voxels[i]
        volume[
            (voxel.x-min_x) +
            (voxel.y-min_y) * dims[0] +
            (voxel.z-min_z) * dims[0] * dims[1]
        ] = 1
    }
    return {volume,dims,bounds}

}
function toTriangle(quad)
{
    return [
        quad[0], quad[1], quad[2],
        quad[0], quad[2], quad[3],
    ];
}
function computeColor(voxel,voxel_obj)
{
    var color = {}

    function has(voxel)
    {
        var key = voxel.x + ',' + voxel.y + ',' + voxel.z
        return voxel_obj[key] !== undefined
    }

    for(var i = 0; i < voxels.length; i++)
    {
        var voxel = voxels[i]
        if(!has([voxel.x-1,voxel.y,voxel.z]))
        {
            var face_0_from = [voxel.x,voxel.y,voxel.z]
            var face_0_to = [voxel.x,voxel.y+1,voxel.z+1]
            color[join_array(face_0_from)+"|"+join_array(face_0_to)] = voxels[i].color[0]
        }
        if(!has([voxel.x,voxel.y-1,voxel.z]))
        {
            var face_1_from = [voxel.x,voxel.y,voxel.z]
            var face_1_to = [voxel.x+1,voxel.y,voxel.z+1]
            color[join_array(face_1_from)+"|"+join_array(face_1_to)] = voxels[i].color[1]
        }
        if(!has([voxel.x,voxel.y,voxel.z-1]))
        {
            var face_2_from = [voxel.x,voxel.y,voxel.z]
            var face_2_to = [voxel.x+1,voxel.y+1,voxel.z]
            color[join_array(face_2_from)+"|"+join_array(face_2_to)] = voxels[i].color[2]
        }

        if(!has([voxel.x+1,voxel.y,voxel.z]))
        {
            var face_3_from = [voxel.x+1,voxel.y,voxel.z]
            var face_3_to = [voxel.x+1,voxel.y+1,voxel.z+1]
            color[join_array(face_3_from)+"|"+join_array(face_3_to)] = voxels[i].color[3]
        }
        if(!has([voxel.x,voxel.y+1,voxel.z]))
        {

            var face_4_from = [voxel.x,voxel.y+1,voxel.z]
            var face_4_to = [voxel.x+1,voxel.y+1,voxel.z+1]
            color[join_array(face_4_from)+"|"+join_array(face_4_to)] = voxels[i].color[4]
        }

        if(!has([voxel.x,voxel.y,voxel.z+1]))
        {
            var face_5_from = [voxel.x,voxel.y,voxel.z+1]
            var face_5_to = [voxel.x+1,voxel.y+1,voxel.z+1]
            color[join_array(face_5_from)+"|"+join_array(face_5_to)] = voxels[i].color[5]
        }
    }
    return color
}
function get_bounds(points)
{
    var min_x = points[0].x
    var max_x = points[0].x
    var min_y = points[0].y
    var max_y = points[0].y
    var min_z = points[0].z
    var max_z = points[0].z
    for(var i = 1; i < points.length; i++)
    {
        var point = points[i]
        if(point.x < min_x)
        {
            min_x = point.x
        }
        if(point.x > max_x)
        {
            max_x = point.x
        }
        if(point.y < min_y)
        {
            min_y = point.y
        }
        if(point.y > max_y)
        {
            max_y = point.y
        }
        if(point.z < min_z)
        {
            min_z = point.z
        }
        if(point.z > max_z)
        {
            max_z = point.z
        }
    }
    return {min_x,min_y,min_z,max_x,max_y,max_z}
}


function process(volume, dims) {
    var vertices = [], faces = [], normals = [], uvs = [], rotate = []
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

function cull(volume, dims) {
    //Precalculate direction vectors for convenience
    var dir = new Array(3);
    for(var i=0; i<3; ++i) {
      dir[i] = [[0,0,0], [0,0,0]];
      dir[i][0][(i+1)%3] = 1;
      dir[i][1][(i+2)%3] = 1;
    }
    //March over the volume
    var vertices = []
      , faces = []
      , x = [0,0,0]
      , B = [[false,true]    //Incrementally update bounds (this is a bit ugly)
            ,[false,true]
            ,[false,true]]
      , n = -dims[0]*dims[1];
    for(           B[2]=[false,true],x[2]=-1; x[2]<dims[2]; B[2]=[true,(++x[2]<dims[2]-1)])
    for(n-=dims[0],B[1]=[false,true],x[1]=-1; x[1]<dims[1]; B[1]=[true,(++x[1]<dims[1]-1)])
    for(n-=1,      B[0]=[false,true],x[0]=-1; x[0]<dims[0]; B[0]=[true,(++x[0]<dims[0]-1)], ++n) {
      //Read current voxel and 3 neighboring voxels using bounds check results
      var p =   (B[0][0] && B[1][0] && B[2][0]) ? volume[n]                 : 0
        , b = [ (B[0][1] && B[1][0] && B[2][0]) ? volume[n+1]               : 0
              , (B[0][0] && B[1][1] && B[2][0]) ? volume[n+dims[0]]         : 0
              , (B[0][0] && B[1][0] && B[2][1]) ? volume[n+dims[0]*dims[1]] : 0
            ];
      //Generate faces
      for(var d=0; d<3; ++d)
      if((!!p) !== (!!b[d])) {
        var s = !p ? 1 : 0;
        var t = [x[0],x[1],x[2]]
          , u = dir[d][s]
          , v = dir[d][s^1];
        ++t[d];
        
        var vertex_count = vertices.length;
        vertices.push([t[0],           t[1],           t[2]          ]);
        vertices.push([t[0]+u[0],      t[1]+u[1],      t[2]+u[2]     ]);
        vertices.push([t[0]+u[0]+v[0], t[1]+u[1]+v[1], t[2]+u[2]+v[2]]);
        vertices.push([t[0]     +v[0], t[1]     +v[1], t[2]     +v[2]]);
        faces.push([vertex_count, vertex_count+1, vertex_count+2, vertex_count+3, s ? b[d] : p]);
      }
    }
    return { vertices:vertices, faces:faces };
  }
  