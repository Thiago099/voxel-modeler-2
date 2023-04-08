import * as THREE from 'three';

import data from './global';

import {GreedyMesh,GreedyMeshRaytrace,Culled} from './GreedyMesh';
export {useVoxels}



function useVoxels(gridSpacing,offset,renderer)
{
    // var voxels = [
    //     [-1,0,0],
    //     // [-1,0,1],
    //     ]
    // var face_colors = [
    //     [
    //         [255,0,0],
    //         [255,0,0],
    //         [255,0,0],
    //         [255,0,0],
    //         [255,0,0],
    //         [255,0,0],
    //     ],
    //     // [
    //     //     [0,255,0],
    //     //     [0,255,0],
    //     //     [0,255,0],
    //     //     [0,255,0],
    //     //     [0,255,0],
    //     //     [0,255,0],
    //     // ],
    // ]
    var voxels = []
    var face_colors = []




    //fill a really big box with voxels
    // for (var x = -32; x < 32; x++) {
    //     for (var y = -32; y < 32; y++) {
    //         for (var z = -32; z < 32; z++) {
    //             voxels.push([x,y,z])
    //         }
    //     }
    // }




    var [get_at,add_map,remove_map,clearmap,copy_map] = usePositionMap(voxels,face_colors)


    //    var texture = new THREE.CanvasTexture(canvas);
    const texture = new THREE.TextureLoader().load( "textures/background.png" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    // material that receives shadows
    // const material = new THREE.MeshPhongMaterial( {
    //     color: 0xaaaaaa,

    // } );


    // material that receives shadows
    const material = new THREE.MeshPhongMaterial( {
        color: 0xaaaaaa,
        map: texture,
        polygonOffset: true, // enable polygon offset
        polygonOffsetFactor: offset+1, // adjust the amount of offset
        transparent: true,
    } );

    const transparent_material = new THREE.MeshPhongMaterial( {
        color: 0xaaaaaa,
        map: texture,
        polygonOffset: true, // enable polygon offset
        polygonOffsetFactor: offset+1, // adjust the amount of offset
        transparent: true,
        opacity: 0.5,
    } );


    const ghost_material = new THREE.MeshPhongMaterial( {
        color: 0xaaaaaa,
        map: texture,
        polygonOffset: true, // enable polygon offset
        polygonOffsetFactor: offset+1, // adjust the amount of offset
        transparent: true,
        opacity: 0.5,
    } );



    const line_material = new THREE.LineBasicMaterial( { 
        color: 0xffffff ,
        //far away from the camera
    } );
    var line_geometry = new THREE.BufferGeometry();


    function replace(voxels,colors)
    {
        clearmap()
        copy_map(voxels,colors)

        compute()
    }


    var geometry = new THREE.BufferGeometry();
    var transparent_geometry = new THREE.BufferGeometry();
    function add(voxel,colors)
    {
        if(colors == undefined)
        colors = []

        var color = data.rgb()

        for (var i = 0; i < voxel.length; i++) {
            if(colors[i] == undefined)
            var c =[
                [color.r,color.g,color.b,data.material[0],data.material[1],data.material[2],data.material[3]],
                [color.r,color.g,color.b,data.material[0],data.material[1],data.material[2],data.material[3]],
                [color.r,color.g,color.b,data.material[0],data.material[1],data.material[2],data.material[3]],
                [color.r,color.g,color.b,data.material[0],data.material[1],data.material[2],data.material[3]],
                [color.r,color.g,color.b,data.material[0],data.material[1],data.material[2],data.material[3]],
                [color.r,color.g,color.b,data.material[0],data.material[1],data.material[2],data.material[3]],
            ]
            else
            var c = colors[i]
            add_map(voxel[i],c)
        }
        compute()
    }
    function remove(...voxel)
    {
        for (var i = 0; i < voxel.length; i++) {
            remove_map(voxel[i])
        }
        compute()
    }
    function clear()
    {
        clearmap()
        material.map = null;
        material.pbr = null;
        material.emission = null;
        voxels.splice(0,voxels.length)
        face_colors.splice(0,face_colors.length)
        compute()
    }
    function has(voxel)
    {
        return get_at(voxel) != undefined
    }

    function compute_line()
    {
        line_geometry.dispose();
        if(voxels.length == 0)
        {
            // line_geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( 0 ), 1 ) );
            line_geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( 0 ), 3 ) );
            return;
        }
        var geometry_data = Culled(voxels)
        for (var i = 0; i < geometry_data.vertices.length; i++) {
            geometry_data.vertices[i] = geometry_data.vertices[i] * gridSpacing;
        }

        // line_geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( geometry_data.faces ), 1 ) );
        line_geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry_data.vertices ), 3 ) );
    }


    function EmptyGeometry(geometry)
    {
        geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( 0 ), 1 ) );
        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( 0 ), 3 ) );
        geometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( 0 ), 3 ) );
        geometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( 0 ), 2 ) );
    }
    function buildFrom(voxels,face_colors,geometry,material,GreedyMesh,has,callback)
    {
        if(voxels.length == 0)
        {
            EmptyGeometry(geometry)
            return;
        }
        var geometry_data = GreedyMesh(voxels,face_colors,has)

        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry_data.vertices ), 3 ) );
        geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( geometry_data.faces ), 1 ) );
        geometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array(  geometry_data.normals  ), 3 ) );
        geometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( geometry_data.uvs  ), 2 ) );
        geometry.computeBoundingSphere();

        // dispose the old texture
        texture.dispose();
        // create a new texture

        callback(material,geometry_data)
    }

    function compute(target = null)
    {
        console.log("target",target)
        if (target == null) target = renderer.getRenderTarget();
        if(geometry)
        {
            geometry.dispose();
        }
        if(transparent_geometry)
        {
            transparent_geometry.dispose();
        }
        if(target == "raster")
        {
            compute_line()
            buildFrom(voxels,face_colors,geometry,material,GreedyMesh,has, (material, geometry_data)=>{
                const new_texture = new THREE.CanvasTexture(geometry_data.texture);
                material.map = new_texture;
            })

        }
        else 
        if(target == "raytrace")
        {

            var transparent_voxels = []
            var transparent_face_colors = []
            var opaque_voxels = []
            var opaque_face_colors = []
            for (var i = 0; i < voxels.length; i++) {
                if(face_colors[i].some(x=>x[3] > 0))
                {
                    transparent_voxels.push(voxels[i])
                    transparent_face_colors.push(face_colors[i])
                }
                else
                {
                    opaque_voxels.push(voxels[i])
                    opaque_face_colors.push(face_colors[i])
                }
            }

            if(transparent_voxels.length == 0)
            {
                transparent_mesh.has_any_geometry = false;
            }
            else 
            {
                transparent_mesh.has_any_geometry = true;
            }

            if(opaque_voxels.length == 0)
            {
                mesh.has_any_geometry = false;
            }
            else 
            {
                mesh.has_any_geometry = true;
            }
            
            var [get_at_opaque] = usePositionMap(opaque_voxels,opaque_face_colors)
            var [get_at_transparent] = usePositionMap(transparent_voxels,transparent_face_colors)

            const has_opaque = (voxel)=>get_at_opaque(voxel) != undefined
            const has_transparent = (voxel)=>get_at_transparent(voxel) != undefined

    
            buildFrom(opaque_voxels,opaque_face_colors,geometry,material,GreedyMeshRaytrace,has_opaque, (material, geometry_data)=>{
                const new_texture = new THREE.CanvasTexture(geometry_data.texture);
                const pbr_texture = new THREE.CanvasTexture(geometry_data.pbr);
                const emission_texture = new THREE.CanvasTexture(geometry_data.emission);
                emission_texture.minFilter = THREE.NearestFilter;
                new_texture.canvas = geometry_data.texture;
                new_texture.canvas.type = "albedo"
                pbr_texture.canvas = geometry_data.pbr;
                pbr_texture.canvas.type = "pbr"
                emission_texture.canvas = geometry_data.emission;
                emission_texture.canvas.type = "emission"
        
        
                material.map = new_texture;
                material.pbr = pbr_texture;
                material.emission = emission_texture;
            })

            buildFrom(transparent_voxels,transparent_face_colors,transparent_geometry,transparent_material,GreedyMeshRaytrace,has_transparent, (material, geometry_data)=>{
                const new_texture = new THREE.CanvasTexture(geometry_data.texture);
                const pbr_texture = new THREE.CanvasTexture(geometry_data.pbr);
                const emission_texture = new THREE.CanvasTexture(geometry_data.emission);
                emission_texture.minFilter = THREE.NearestFilter;
                new_texture.canvas = geometry_data.texture;
                new_texture.canvas.type = "albedo"
                pbr_texture.canvas = geometry_data.pbr;
                pbr_texture.canvas.type = "pbr"
                emission_texture.canvas = geometry_data.emission;
                emission_texture.canvas.type = "emission"
        
        
                material.map = new_texture;
                material.pbr = pbr_texture;
                material.emission = emission_texture;
            })
        }
        
        
        setTimeout(()=>{
            renderer.build();
        },0)
    }

    function destroy()
    {
        geometry.dispose();
        line_geometry.dispose();
        material.dispose();
        line_material.dispose();
    }
    function hide_wireframe()
    {
        line_material.visible = false;
    }
    function show_wireframe()
    {
        line_material.visible = true;
    }

    



    const mesh = new THREE.Mesh( geometry, material );
    const transparent_mesh = new THREE.Mesh( transparent_geometry, transparent_material );
    const line_mesh = new THREE.LineSegments( line_geometry, line_material );

    function enable_ghost()
    {
        mesh.material.opacity = 0.5;
    }
    function disable_ghost()
    {
        mesh.material.opacity = 1;
    }
    compute()


    var visible = true;
    function hide(disable =false)
    {
        if(disable)
        visible = false;
        renderer.hide(mesh)
        material.visible = false;
        line_material.visible = false;
    }
    function show(disable = false)
    {
        if(disable)
        visible = true;
        renderer.show(mesh)
        material.visible = true;
        line_material.visible = true;
    }
    
    function is_visible()
    {
        return visible;
    }
    mesh.compute = compute;


    //cube primitive
    // const geo = new THREE.BoxGeometry( 1, 1, 1 );
    // const mesh = new THREE.Mesh( geo, material );
    return  {
        mesh,
        transparent_mesh,
        line_mesh,
        add,
        remove,
        clear,
        voxels,
        face_colors,
        hide,
        show,
        has,
        destroy,
        hide_wireframe,
        show_wireframe,
        enable_ghost,
        disable_ghost,
        is_visible,
        compute
    }
}


function join_array(value) {
    return value[0]+","+value[1]+","+value[2]
}

function usePositionMap(voxels,colors) {
    var map = {};
    for (var i = 0; i < voxels.length; i++) {
        var key = join_array(voxels[i]);
        map[key] = i;
    }
    function clear() {
        map = {};
    }
    function get_at(p) {
        var key = join_array(p)
        return map[key];
    }
    function add(p,c) {
        var key = join_array(p)
        if (key in map) return;
        map[key] = voxels.length;
        voxels.push(p);
        colors.push(c)
    }
    function copy(p,c) {
        for(var i = 0; i < p.length; i++)
        {
            var key = join_array(p[i])
            if (key in map) return;
            map[key] = voxels.length;
            voxels.push(p[i]);
            colors.push(c[i])
        }
    }

    function remove(p) {
        var key = join_array(p)
        if (!(key in map)) return;
        var id = map[key];
        delete map[key];
        var last = voxels.pop();
        var lastc = colors.pop();
        if (id != voxels.length) {
            voxels[id] = last;
            colors[id] = lastc;
            map[join_array(last)] = id;
        }
    }
    return [get_at,add,remove,clear,copy];
}
function weld(ids,vertexes)
{
    var vert_map = {}
    var result_vertexes = []
    var idx = 1
    for(var i = 0;i<vertexes.length;i++)
    {
        var key = vertexes[i].join(",")
        if(vert_map[key] == undefined)
        {
            vert_map[key] = idx
            result_vertexes.push(vertexes[i])
            idx ++
        }
    }
    for(var face of ids)
    {
        for(var id in face)
        {
            face[id] = vert_map[vertexes[face[id]].join(",")]
        }
    }

  return [ids, result_vertexes];
}
