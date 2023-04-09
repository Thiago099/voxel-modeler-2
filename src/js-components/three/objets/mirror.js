import * as THREE from 'three';
export {CreateMirror}

function CreateMirror(global)
{
    var mirror = {}
    global.setMirror = function(axis)
    {
        mirror[axis]()
    }
    function symmetry_plane(axis)
    {
        
        var planeGeometry = new THREE.PlaneGeometry( 25, 25, 32 );
        var planeMaterial = new THREE.MeshBasicMaterial( {
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.1
        } );
        var plane = new THREE.Mesh( planeGeometry, planeMaterial );
        if(axis == 'x')
        {
            plane.rotation.y = Math.PI / 2;

        }
        else
        if(axis == 'y')
        {
            plane.rotation.x = Math.PI / 2;
        }

        // plane.position.x = -0.5
        // plane.position.z = -0.5

        planeMaterial.visible = false
        var active = false
        mirror[axis] = ()=>
        {
            active = !active
            if(active)
            {
                planeMaterial.visible = true
            }
            else
            {
                planeMaterial.visible = false
            }
            if(active)
            {
                global['mirror'+axis.toUpperCase()] = true
            }
            else
            {
                global['mirror'+axis.toUpperCase()] = false
            }
        }
        return plane
    }
    return [
        symmetry_plane('x'),
        symmetry_plane('y'),
        symmetry_plane('z')
    ]
}

