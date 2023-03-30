import * as THREE from 'three';

import data from './global';

import GreedyMesh from './GreedyMesh';
export {useVoxels}

function join_array(array) {
    return array.join(",");
}

function usePositionMap(voxels,colors) {
    var map = {};
    for (var i = 0; i < voxels.length; i++) {
        var key = join_array(voxels[i]);
        map[key] = i;
    }
    function clear() {
        map = {};
        voxels.splice(0,voxels.length);
        colors.splice(0,colors.length);
    }
    function get_at(...p) {
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

function useVoxels(gridSpacing,offset)
{
    var voxels = [
        [-1,0,0],
        [-1,0,1],
        ]
    var face_colors = [
        [
            [255,0,0],
            [255,0,0],
            [255,0,0],
            [255,0,0],
            [255,0,0],
            [255,0,0],
        ],
        [
            [0,255,0],
            [0,255,0],
            [0,255,0],
            [0,255,0],
            [0,255,0],
            [0,255,0],
        ],
    ]



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
    const texture = new THREE.TextureLoader().load( "image.jpg" );
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
        polygonOffsetFactor: offset, // adjust the amount of offset

    } );


    function replace(voxels,colors)
    {
        clearmap()
        copy_map(voxels,colors)
        compute()
    }
    function hide()
    {
        material.visible = false;
    }
    function show()
    {
        material.visible = true;
    }

    var geometry = new THREE.BufferGeometry();
    function add(voxel,colors)
    {
        if(colors == undefined)
        colors = []

        var color = data.rgb()

        for (var i = 0; i < voxel.length; i++) {
            if(colors[i] == undefined)
            var c = [
                [color.r,color.g,color.b],
                [color.r,color.g,color.b],
                [color.r,color.g,color.b],
                [color.r,color.g,color.b],
                [color.r,color.g,color.b],
                [color.r,color.g,color.b],
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
        compute()
    }
    function compute()
    {
        geometry.dispose();
        if(voxels.length == 0)
        {
            geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( 0 ), 1 ) );
            geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( 0 ), 3 ) );
            geometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( 0 ), 3 ) );
            geometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( 0 ), 2 ) );
            return;
        }
        var geometry_data = GreedyMesh(voxels,face_colors)
        for (var i = 0; i < geometry_data.vertices.length; i++) {
            geometry_data.vertices[i] = geometry_data.vertices[i] * gridSpacing;
            
        }
        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry_data.vertices ), 3 ) );
        geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( geometry_data.faces ), 1 ) );
        geometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array(  geometry_data.normals  ), 3 ) );
        geometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array(  geometry_data.uvs  ), 2 ) );
        geometry.computeBoundingSphere();

        // dispose the old texture
        texture.dispose();
        // create a new texture
        const canvas = geometry_data.texture;
        const new_texture = new THREE.CanvasTexture(canvas);
        //tile

        new_texture.magFilter = THREE.NearestFilter;
        new_texture.minFilter = THREE.NearestFilter;
        material.map = new_texture;
    }



    const mesh = new THREE.Mesh( geometry, material );
    compute()
    //cube primitive
    // const geo = new THREE.BoxGeometry( 1, 1, 1 );
    // const mesh = new THREE.Mesh( geo, material );
    return  {mesh,add,remove,clear,voxels,face_colors,hide,show}
}