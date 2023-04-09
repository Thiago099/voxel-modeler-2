import * as THREE from 'three'
export {CreateVoxel}
import { GreedyMesh } from "../lib/greedy-mesh"
import global from '../../../global'
function CreateVoxel(offset = 1)
{
    const voxels = []
    const voxel_obj = {}

    var geometry = new THREE.BufferGeometry();
    var material = new THREE.MeshStandardMaterial( { 
        color: 0xffffff,
        polygonOffset: true, // enable polygon offset
        polygonOffsetFactor: offset, // adjust the amount of offset
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

    function add(voxels,create)
    {
        var voxelColor = null
        var layer = null
        if(create)
        {
            voxelColor = []
            for(var i = 0; i < 6; i++)
            {
                voxelColor.push(JSON.parse(JSON.stringify(global.foreground)))
            }
            layer = global.selected_layer
        }
        for(var voxel of voxels)
        {
            if(voxelColor != null)
            {
                voxel.color = JSON.parse(JSON.stringify(voxelColor))
            }
            if(layer != null)
            {
                voxel.layer = layer
            }
            add_one(voxel)
        }
    }
    function remove(voxels)
    {
        for(var voxel of voxels)
        {
            remove_one(voxel)
        }
    }
    function add_one(voxel)
    {
        var key = voxel.x + ',' + voxel.y + ',' + voxel.z
        if(voxel_obj[key] != undefined) return
        voxel_obj[key] = voxels.length
        voxels.push(voxel)
    }
    function remove_one(voxel)
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
    function replace(voxel)
    {
        clear()
        add(voxel)
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
        var render_voxels = []
        var render_obj = {}
        
        for(var i = 0; i < voxels.length; i++)
        {
            if(voxels[i].layer == undefined || voxels[i].layer.isVisible())
            {
                render_voxels.push(voxels[i])
                render_obj[voxels[i].x + ',' + voxels[i].y + ',' + voxels[i].z] = i
            }
        }

        const {geometry:geometry_data,edges,texture} = GreedyMesh(render_voxels, render_obj)
        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry_data.vertices ), 3 ) );
        geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( geometry_data.faces ), 1 ) );
        geometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array(  geometry_data.normals  ), 3 ) );
        geometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( geometry_data.uvs  ), 2 ) );
        // geometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( geometry_data.uvs  ), 2 ) );
        geometry.computeBoundingSphere();

        wireframeGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( edges.vertices ), 3 ) );
        // wireframeGeometry.setIndex( new THREE.BufferAttribute( new Uint16Array( edges.faces ), 1 ) );
        geometry.computeBoundingSphere();


        var ct = new THREE.CanvasTexture( texture );
        ct.magFilter = THREE.NearestFilter;
        ct.minFilter = THREE.NearestFilter;

        material.map = ct
    }

    function useComputeProxy(fn)
    {
        return (a,b) => {
            fn(a,b)
            compute()
        }
    }

    return {
        add:useComputeProxy(add),
        remove:useComputeProxy(remove),
        clear:useComputeProxy(clear),
        replace:useComputeProxy(replace),
        hide,
        show,
        compute,
        voxels,
        mesh,
        wireframeMesh
    }
}