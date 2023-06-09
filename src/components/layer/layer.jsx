import "./layer.css"
import global from "../../global"
import { uuidv4 } from "../../js-components/three/lib/uuid"

export default Layer

function Layer() {
    const layer_container = ref()


    global.add_layer = add_layer
    global.clearLayer = clearLayer

    function clearLayer() {
        layer_container.innerHTML = ""
        global.layers = {}
        global.selected_layer = null
    }

    function getLayerName() {
        var last_name = 0
        for(var {text} of  Object.values(global.layers))
        {
            var match = text.match(/New layer (\d+)/)
            if(match)
            {
                var num = parseInt(match[1])
                if(num > last_name)
                {
                    last_name = num
                }
            }
        }
        return `New layer ${last_name+1}`
    }
    function add_layer(id=null,text=null) {
        var self = state({deselect,select,isVisible,isSelected, text:text||getLayerName(), id:id || uuidv4()})
        var visible = true
        var selected = false
        function deselect()
        {
            selected = false
            layer.$update()
        }
  
        function destroy(e)
        {
            e.stopPropagation()
            global.voxel.clear_layer(self)
            layer.$remove()
            delete global.layers[self.id]
            if( Object.values(global.layers).length < 1)
            {
                add_layer()
            }
            if(selected)
            {
                 Object.values(global.layers)[0].select()
            }
        }

        function toggle(e)
        {
            if(e)
            e.stopPropagation()
            if(visible)
            {
                visible = false
                layer.$update()
            }
            else
            {
                visible = true
                layer.$update()
            }
            global.voxel.forceUpdate()
        }

        function select(e)
        {
            if(e)
            e.stopPropagation()
            for(var {deselect} of  Object.values(global.layers))
            {
                deselect()
            }
            selected = true
            global.selected_layer = self
            global.voxel.forceUpdate()
            layer.$update()
        }
        //get last new layer number
        var last = 0
        for(var {text} of  Object.values(global.layers))
        {
            //regex 
            var match = text.match(/New layer (\d+)/)
            if(match)
            {
                var num = parseInt(match[1])
                if(num > last)
                {
                    last = num
                }
            }
        }
        function isVisible()
        {
            return visible
        }

        function isSelected()
        {
            return selected
        }

         global.layers[self.id] = self

        const layer = 
        <div class={`layer ${selected?"layer-selected":""}`} on:click={select}>
            <i class={`fa-solid icon ${visible?"fa-eye":"fa-eye-slash"}`} on:click={toggle}></i>
            <i class="fa-solid fa-trash icon" on:click={destroy}></i>
            <input type="text" class="layer-input" model={self.text} />
        </div>
        layer.$parent(layer_container)
        select()

    }
    var result = 
    <div>
        <div class="row">
            <button class="button" on:click={()=>add_layer()}>Add</button>
        </div>
        <div class="col layer-container" ref={layer_container}>

        </div>
    </div>
    setTimeout(() => {
        add_layer()
    }, 0);
    return result
}
