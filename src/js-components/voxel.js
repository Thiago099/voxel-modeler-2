import * as THREE from 'three';

import GreedyMesh from './GreedyMesh';
export {useVoxels}

function join_array(array) {
    return array.join(",");
}

function usePositionMap(voxels) {
    var map = {};
    for (var i = 0; i < voxels.length; i++) {
        var key = join_array(voxels[i]);
        map[key] = i;
    }
    function get_at(...p) {
        var key = join_array(p)
        return map[key];
    }
    function add(p) {
        var key = join_array(p)
        if (key in map) return;
        map[key] = voxels.length;
        voxels.push(p);
    }
    function remove(p) {
        var key = join_array(p)
        if (!(key in map)) return;
        var id = map[key];
        delete map[key];
        var last = voxels.pop();
        if (id != voxels.length) {
            voxels[id] = last;
            map[join_array(last)] = id;
        }
    }
    return [get_at,add,remove];
}

function useVoxels(gridSpacing)
{
    var voxels = []
    var [get_at,add_map,remove_map] = usePositionMap(voxels)

    // material that receives shadows
    const material = new THREE.MeshPhongMaterial( {
        color: 0xaaaaaa,
    } );

    var geometry = new THREE.BufferGeometry();
    function add(...voxel)
    {
        for (var i = 0; i < voxel.length; i++) {
            add_map(voxel[i])
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
    function compute()
    {
        geometry.dispose();
        if(voxels.length == 0)
        {
            geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( 0 ), 1 ) );
            geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( 0 ), 3 ) );
            geometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( 0 ), 3 ) );
            return;
        }
        var geometry_data = GreedyMesh(voxels)
        for (var i = 0; i < geometry_data.vertices.length; i++) {
            geometry_data.vertices[i] = geometry_data.vertices[i] * gridSpacing;
            
        }
        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry_data.vertices ), 3 ) );
        geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( geometry_data.faces ), 1 ) );
        geometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array(  geometry_data.normals  ), 3 ) );
        geometry.computeBoundingSphere();
    }



    const mesh = new THREE.Mesh( geometry, material );
    return  [mesh,add,remove]
}