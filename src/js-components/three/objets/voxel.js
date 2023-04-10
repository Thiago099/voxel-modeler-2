import * as THREE from 'three'
export {CreateVoxel}
import { GreedyMesh, Cull } from "../lib/greedy-mesh"
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
    update()

    function applyMirror(voxel,create)
    {
        var voxel_list = [voxel]
        if(global.mirrorX)
        {
            var tmp = []
            for(var voxel of voxel_list)
            {
                var current = JSON.parse(JSON.stringify(voxel))
                current.x = -voxel.x-1
                tmp.push(current)
            }
            voxel_list = voxel_list.concat(tmp)
        }
        if(global.mirrorY)
        {
            var tmp = []
            for(var voxel of voxel_list)
            {
                var current = JSON.parse(JSON.stringify(voxel))
                current.y = -voxel.y-1
                tmp.push(current)
            }
            voxel_list = voxel_list.concat(tmp)
        }
        if(global.mirrorZ)
        {
            var tmp = []
            for(var voxel of voxel_list)
            {
                var current = JSON.parse(JSON.stringify(voxel))
                current.z = -voxel.z-1
                tmp.push(current)
            }
            voxel_list = voxel_list.concat(tmp)
        }
        return voxel_list
    }

    function add(voxels,create)
    {
        if(!global.selected_layer.isVisible()) return
        for(var voxel of voxels)
        {
            if(create)
            {
                voxel.color = JSON.parse(JSON.stringify(global.foreground))
                voxel.layer = global.selected_layer.id
                for(var voxel of applyMirror(voxel))
                {
                    add_one(voxel)
                }
            }
            else
            {
                add_one(voxel)
            }
            
        }
    }
    function remove(voxels)
    {
        if(!global.selected_layer.isVisible()) return
        for(var voxel of voxels)
        {
            for(var voxel of applyMirror(voxel))
            {
                remove_one(voxel)
            }
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
        if(voxels[index].layer != global.selected_layer.id) return
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
    function clearPaintIteration()
    {
        for(var voxel of voxels)
        {
            delete voxel.originalColor 
        }
    }

    function mix(distance,original,actor)
    {
        var k = parseFloat(global.feather)
        if(k > 0)
        {
            var d = distance / k
        }
        else
        {
            var d = 1
        }
        if(d > 1) d = 1
        var result = {}

        result.r =  (original.r * (1 - actor.a*d))+(actor.r*actor.a*d )
        result.g =  (original.g * (1 - actor.a*d))+(actor.g*actor.a*d )
        result.b =  (original.b * (1 - actor.a*d))+(actor.b*actor.a*d )

        return result
    }

    function setColor(items,color)
    {
        for(var voxel of items)
        {
            for(var voxel of applyMirror(voxel))
            {
                var index = voxel_obj[voxel.x + ',' + voxel.y + ',' + voxel.z]
                if(index == undefined) continue


                var new_color = {...color}
                if(voxels[index].originalColor) {
                    var original = voxels[index].originalColor
                    var mixed_new_color = mix(1-voxel.i,original,new_color)
                    var definitive_color = {}
                    //keep wich one is cloeset to the new color
                    definitive_color.r = Math.abs(mixed_new_color.r - new_color.r) < Math.abs(voxels[index].color.r - new_color.r) ? mixed_new_color.r : voxels[index].color.r
                    definitive_color.g = Math.abs(mixed_new_color.g - new_color.g) < Math.abs(voxels[index].color.g - new_color.g) ? mixed_new_color.g : voxels[index].color.g
                    definitive_color.b = Math.abs(mixed_new_color.b - new_color.b) < Math.abs(voxels[index].color.b - new_color.b) ? mixed_new_color.b : voxels[index].color.b
                    voxels[index].color = definitive_color
                }
                else
                {
                    var old_color = voxels[index].color
                    var mixed_color = mix(1-voxel.i,old_color,new_color)
                    voxels[index].originalColor = voxels[index].color
                    voxels[index].color = mixed_color
    
                }

                // new_color.r = old_color.r * (1 - new_color.a) + new_color.r * new_color.a
                // new_color.g = old_color.g * (1 - new_color.a) + new_color.g * new_color.a
                // new_color.b = old_color.b * (1 - new_color.a) + new_color.b * new_color.a

                // voxels[index].color = new_color

            }

        }
    }
    function getColor(item)
    {
        var index = voxel_obj[item.x + ',' + item.y + ',' + item.z]
        if(index == undefined) return
        return voxels[index].color
    }
    function update()
    {
        var render_voxels = []
        var render_obj = {}
        
        for(var i = 0; i < voxels.length; i++)
        {
            var layer = global.layers.find(layer => layer.id == voxels[i].layer)
            if(layer.isVisible())
            {
                render_voxels.push(voxels[i])
                render_obj[voxels[i].x + ',' + voxels[i].y + ',' + voxels[i].z] = i
            }
        }

        var edges_voxels = []
        if(global.wireframeMode == "Wireframe selected")
        {
            for(var i = 0; i < voxels.length; i++)
            {
                 var layer = global.layers.find(layer => layer.id == voxels[i].layer)
                if(layer.isSelected() && layer.isVisible())
                {
                    edges_voxels.push(voxels[i])
                }
            }
        }
        else if(global.wireframeMode == "Wireframe all")
        {
            edges_voxels = render_voxels
        }

        const {geometry:geometry_data,texture} = GreedyMesh(render_voxels, render_obj)
        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry_data.vertices ), 3 ) );
        geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( geometry_data.faces ), 1 ) );
        geometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array(  geometry_data.normals  ), 3 ) );
        geometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( geometry_data.uvs  ), 2 ) );
        // geometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( geometry_data.uvs  ), 2 ) );
        geometry.computeBoundingSphere();
        
        // wireframeGeometry.setIndex( new THREE.BufferAttribute( new Uint16Array( edges.faces ), 1 ) );
        geometry.computeBoundingSphere();

        if(edges_voxels.length == 0)
        {
            wireframeGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( [] ), 3 ) );
        }
        else
        {
            const edges = Cull(edges_voxels, render_obj)
            wireframeGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( edges.vertices ), 3 ) );
        }


        var ct = new THREE.CanvasTexture( texture );
        ct.magFilter = THREE.NearestFilter;
        ct.minFilter = THREE.NearestFilter;

        material.map = ct
    }

    function useComputeProxy(fn)
    {
        return (a,b) => {
            fn(a,b)
            update()
        }
    }

    return {
        add:useComputeProxy(add),
        setColor:useComputeProxy(setColor),
        remove:useComputeProxy(remove),
        clear:useComputeProxy(clear),
        replace:useComputeProxy(replace),
        getColor,
        clearPaintIteration,
        hide,
        show,
        update,
        voxels,
        mesh,
        wireframeMesh
    }
}