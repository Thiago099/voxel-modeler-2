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


    add({x:0,y:0,z:0})
    add({x:1,y:0,z:0})
    add({x:0,y:1,z:0})
    compute()

    function add(voxel)
    {
        voxels.push(voxel)
        var key = voxel.x + ',' + voxel.y + ',' + voxel.z
        voxel_obj[key] = voxel
    }
    function remove(voxel)
    {
        var key = voxel.x + ',' + voxel.y + ',' + voxel.z
        voxels.splice(voxels.indexOf(voxel_obj[key]),1)
        delete voxel_obj[key]
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

    }

    return {add,remove,compute,mesh,wireframeMesh}
}