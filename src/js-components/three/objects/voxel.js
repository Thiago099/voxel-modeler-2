import * as THREE from 'three'
export {CreateVoxel}
import { GreedyMesh, Cull } from "../lib/greedy-mesh"
import global from '../../../global'
function CreateVoxel(offset = 1)
{

    const chuck_size = 19
    const chunks = {}

    const callbacks = []

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


    function add(voxels,create=false, move=false)
    {
        if(!global.selected_layer.isVisible()) return
        for(var voxel of voxels)
        {
            if(create)
            {
                delete voxel.i;
                voxel.color = JSON.parse(JSON.stringify(global.foreground))
                voxel.layer = global.selected_layer.id
                for(var voxel of applyMirror(voxel))
                {
                    add_one(voxel,move)
                }
            }
            else
            {
                add_one(voxel,move)
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
    function getChuck(voxel)
    {
        var key = Math.floor(voxel.x / chuck_size) + ',' + Math.floor(voxel.y / chuck_size) + ',' + Math.floor(voxel.z / chuck_size)
        if(chunks[key] == undefined)
        {
            chunks[key] = {
                voxels:[],
                geometry: null,
                obj:{}
            }
        }
        return chunks[key]
    }
    function add_one(voxel,move=false)
    {
        if(voxel.x == undefined|| voxel.y == undefined || voxel.z == undefined) return
        var key = voxel.x + ',' + voxel.y + ',' + voxel.z
        if(global.voxel.getChuck(voxel).obj[key] != undefined && !move) return
        const chuck = getChuck(voxel)
        chuck.obj[key] = chuck.voxels.length
        chuck.voxels.push(voxel)
        chuck.modified = true
        chuck.modifiedAfterReplace = true
    }
    function getVoxels()
    {
        return Object.values(chunks).map(chunk => chunk.voxels).flat()
    }
    function remove_one(voxel)
    {
        if(voxel.x == undefined|| voxel.y == undefined || voxel.z == undefined) return
        var key = voxel.x + ',' + voxel.y + ',' + voxel.z
        const chuck = getChuck(voxel)
        if(chuck.obj[key] == undefined) return
        var index = chuck.obj[key]
        if(chuck.voxels[index].layer != global.selected_layer.id) return
        delete chuck.obj[key]
        var last = chuck.voxels.pop()
        if(index != chuck.voxels.length)
        {
            chuck.voxels[index] = last
            chuck.obj[last.x + ',' + last.y + ',' + last.z] = index
        }
        chuck.modified = true
        chuck.modifiedAfterReplace = true
    }
      
    function replace(object, ignore = false)
    {
        for(var key of Object.keys(chunks))
        {
            if(!object[key])
            {
                delete chunks[key]
            }
        }

        for(var key of Object.keys(object))
        {
            if(chunks[key] && !chunks[key].modifiedAfterReplace && !ignore) continue

            var original = object[key]
            var added = {}
            added.geometry = original.geometry
            added.edges = original.edges
            added.voxels = []
            for(var voxel of original.voxels)
            {
                var current = {}
                current.x = voxel.x
                current.y = voxel.y
                current.z = voxel.z
                current.color = {...voxel.color}
                current.layer = voxel.layer
                added.voxels.push(current)
            }
            added.obj = {...original.obj}
            added.texture = original.texture
            added.modifiedAfterReplace = false
            chunks[key] = added
        }

    }
    function clear()
    {
        for(var chunk of Object.keys(chunks))
        {
            delete chunks[chunk]
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
        for(var voxel of getVoxels())
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
                if(voxel.x == undefined|| voxel.y == undefined || voxel.z == undefined) continue
                var key = voxel.x + ',' + voxel.y + ',' + voxel.z
                const chuck = getChuck(voxel)
                if(chuck.obj[key] == undefined) continue
                var index = chuck.obj[key]
                if(index == undefined) continue

                if(chuck.voxels[index].layer != global.selected_layer.id) continue


                var new_color = {...color}
                if(chuck.voxels[index].originalColor) {
                    var original = chuck.voxels[index].originalColor
                    var mixed_new_color = mix(1-voxel.i,original,new_color)
                    var definitive_color = {}
                    //keep wich one is cloeset to the new color
                    definitive_color.r = Math.abs(mixed_new_color.r - new_color.r) < Math.abs(chuck.voxels[index].color.r - new_color.r) ? mixed_new_color.r : chuck.voxels[index].color.r
                    definitive_color.g = Math.abs(mixed_new_color.g - new_color.g) < Math.abs(chuck.voxels[index].color.g - new_color.g) ? mixed_new_color.g : chuck.voxels[index].color.g
                    definitive_color.b = Math.abs(mixed_new_color.b - new_color.b) < Math.abs(chuck.voxels[index].color.b - new_color.b) ? mixed_new_color.b : chuck.voxels[index].color.b
                    chuck.voxels[index].color = definitive_color
                }
                else
                {
                    var old_color = chuck.voxels[index].color
                    var mixed_color = mix(1-voxel.i,old_color,new_color)
                    chuck.voxels[index].originalColor = chuck.voxels[index].color
                    chuck.voxels[index].color = mixed_color
                }


                chuck.modified = true
                chuck.modifiedAfterReplace = true

                // new_color.r = old_color.r * (1 - new_color.a) + new_color.r * new_color.a
                // new_color.g = old_color.g * (1 - new_color.a) + new_color.g * new_color.a
                // new_color.b = old_color.b * (1 - new_color.a) + new_color.b * new_color.a

                // voxels[index].color = new_color

            }

        }
    }
    function getColor(item)
    {
        var chunck = getChuck(item)
        var index = chunck.obj[item.x + ',' + item.y + ',' + item.z]
        if(index == undefined) return
        return chunck.voxels[index].color
    }

    function forceUpdate()
    {
        for(var chunk of Object.values(chunks))
        {
            chunk.modified = true
        }
        update()
    }

    function update()
    {
        var geometry_data = {
            vertices: [],
            faces: [],
            normals: [],
            uvs: [],
        }
        var uvs = []
        var edge_data = []
        var face_offset = 0

        var textures = []
        var width = 0
        var height = 0
        
        for(var chunk of Object.values(chunks))
        {
            if(chunk.modified)
            {
                var render_voxels = []
                var render_obj = {}
                for(var i = 0; i < chunk.voxels.length; i++)
                {
                    var layer = global.layers[chunk.voxels[i].layer]
                    if(layer.isVisible())
                    {
                        render_voxels.push(chunk.voxels[i])
                        render_obj[chunk.voxels[i].x + ',' + chunk.voxels[i].y + ',' + chunk.voxels[i].z] = i
                    }
                }

                const {geometry:geometry_data,texture} = GreedyMesh(render_voxels, render_obj)
                chunk.geometry = geometry_data
                chunk.texture = texture
    
                var edges_voxels = []
                if(global.wireframeMode == "Wireframe selected")
                {
                    for(var i = 0; i < chunk.voxels.length; i++)
                    {
                        var layer = global.layers[chunk.voxels[i].layer]
                        if(layer.isSelected() && layer.isVisible())
                        {
                            edges_voxels.push(chunk.voxels[i])
                        }
                    }
                }
                else if(global.wireframeMode == "Wireframe all")
                {
                    edges_voxels = render_voxels
                }

                if(edges_voxels.length > 0)
                {
                    chunk.edges = Cull(edges_voxels, render_obj)
                }
                else
                {
                    chunk.edges = {vertices:[]}
                }
 

                chunk.modified = false
            }
            if(chunk.geometry == null || chunk.geometry.vertices.length == 0) continue
            geometry_data.vertices.push(chunk.geometry.vertices)
            geometry_data.faces.push(chunk.geometry.faces.map(face => face + face_offset))
            geometry_data.normals.push(chunk.geometry.normals)
            uvs.push(chunk.geometry.uvs)
            edge_data.push(chunk.edges.vertices)
            textures.push(chunk.texture)
            height += chunk.texture.height
            width = Math.max(width,chunk.texture.width)
            face_offset += chunk.geometry.vertices.length / 3
            
        }
        var canvas = document.createElement('canvas')
        var  ctx = canvas.getContext('2d')
        var image_offset = 0
        canvas.width = width
        canvas.height = height
        geometry_data.uvs = []
        for(var texture of textures)
        {
            ctx.drawImage(texture,0,image_offset)
            var uv = uvs.shift()
            for(var i = 0; i < uv.length; i++)
            {
                //draw uv on the canvas
                // ctx.fillStyle = 'rgba(255,0,0,1)'
                // ctx.fillRect(uv[i][0],uv[i][1] + image_offset,1,1)

                geometry_data.uvs.push(uv[i][0] / width)
                geometry_data.uvs.push(1-((uv[i][1] + image_offset) / height))
            }
            image_offset += texture.height
        }

        //download the texture
        // var a = document.createElement('a')
        // a.href = canvas.toDataURL()
        // a.download = 'texture.png'
        // a.click()





        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry_data.vertices.flat() ), 3 ) );
        geometry.setIndex( new THREE.BufferAttribute( new Uint32Array( geometry_data.faces.flat()), 1 ) );
        geometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array(  geometry_data.normals.flat()  ), 3 ) );
        geometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( geometry_data.uvs  ), 2 ) );
        geometry.computeBoundingSphere();
        
        wireframeGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( edge_data.flat() ), 3 ) );
        // geometry.computeBoundingSphere();



        var ct = new THREE.CanvasTexture( canvas );
        ct.magFilter = THREE.NearestFilter;
        ct.minFilter = THREE.NearestFilter;

        material.map = ct

        for(var callback of callbacks)
        {
            callback()
        }
    }

    function hasVoxelAt({x,y,z})
    {
        var chunck = getChuck({x,y,z})
        return chunck.obj[x + ',' + y + ',' + z] != undefined
    }

    function useComputeProxy(fn)
    {
        return (...a) => {
            fn(...a)
            update()
        }
    }

    function addCallback(callback)
    {
        callbacks.push(callback)
    }

    return {
        add:useComputeProxy(add),
        setColor:useComputeProxy(setColor),
        remove:useComputeProxy(remove),
        clear:useComputeProxy(clear),
        replace:useComputeProxy(replace),
        getColor,
        getChuck,
        clearPaintIteration,
        getVoxels,
        hide,
        hasVoxelAt,
        show,
        update,
        forceUpdate,
        addCallback,
        chunks,
        mesh,
        geometry,
        material,
        wireframeMesh
    }
}