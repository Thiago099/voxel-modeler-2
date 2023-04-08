import * as THREE from 'three'
export {CreateVoxel}
import { GreedyMesh } from "../lib/greedy-mesh"

function CreateVoxel()
{
    const voxels = []
    const voxel_obj = {}

    var geometry = new THREE.BufferGeometry();
    var material = new THREE.MeshStandardMaterial( { 
        color: 0xffffff,
        polygonOffset: true, // enable polygon offset
        polygonOffsetFactor: 1, // adjust the amount of offset
    } );

    var wireframeGeometry = new THREE.BufferGeometry();
    var wireframeMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 0 } );


    var wireframeMesh = new THREE.LineSegments( wireframeGeometry, wireframeMaterial );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.receiveShadow = true;
    mesh.castShadow = true;


    // add({x:0,y:0,z:0})
    // add({x:1,y:0,z:0})
    // add({x:1,y:0,z:1})
    // add({x:0,y:0,z:1})
    compute()

    function add(voxel)
    {
        var key = voxel.x + ',' + voxel.y + ',' + voxel.z
        if(voxel_obj[key] != undefined) return
        voxel_obj[key] = voxels.length
        voxels.push(voxel)
    }
    function remove(voxel)
    {
        var key = voxel.x + ',' + voxel.y + ',' + voxel.z
        if(voxel_obj[key] == undefined) return
        var index = voxel_obj[key]
        delete voxel_obj[key]
        var last = voxels.pop()
        if(index != voxels.length)
        {
            voxels[index] = last
            voxel_obj[last.x + ',' + last.y + ',' + last.z] = index
        }

    }
    function copyFrom(voxel)
    {
        for(var item of voxel.voxels)
        {
            add(item)
        }
    }
    function clear()
    {
        voxels.splice(0,voxels.length)
        for(var key in voxel_obj)
        {
            delete voxel_obj[key]
        }
    }
    function hide()
    {
        material.visible = false
        wireframeMaterial.visible = false
    }
    function show()
    {
        material.visible = true
        wireframeMaterial.visible = true
    }
    function compute()
    {
        const {geometry:geometry_data,edges} = GreedyMesh(voxels, voxel_obj)
        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry_data.vertices ), 3 ) );
        geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( geometry_data.faces ), 1 ) );
        geometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array(  geometry_data.normals  ), 3 ) );
        // geometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( geometry_data.uvs  ), 2 ) );
        geometry.computeBoundingSphere();

        wireframeGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( edges.vertices ), 3 ) );
        // wireframeGeometry.setIndex( new THREE.BufferAttribute( new Uint16Array( edges.faces ), 1 ) );
        geometry.computeBoundingSphere();
    }

    function useComputeProxy(fn)
    {
        return (parm) => {
            fn(parm)
            compute()
        }
    }

    return {
        add:useComputeProxy(add),
        remove:useComputeProxy(remove),
        clear:useComputeProxy(clear),
        copyFrom:useComputeProxy(copyFrom),
        hide,
        show,
        compute,
        voxels,
        mesh,
        wireframeMesh
    }
}