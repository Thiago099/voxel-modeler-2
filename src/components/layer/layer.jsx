import "./layer.css"
export default Layer

function Layer({config}) {
    const layer_container = ref()
    var layers = []
    function getLayerName() {
        var last_name = 0
        for(var {text} of layers)
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
    config.layers = layers
    function add_layer() {
        var self = state({deselect,select,isVisible, text:getLayerName()})
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
            config.voxel.remove(config.voxel.voxels.filter(v=>v.layer == self))
            layer.$remove()
            layers.splice(layers.indexOf(self), 1)
            if(layers.length < 1)
            {
                add_layer()
            }
            if(selected && layers.length > 0)
            {
                layers[0].select()
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
            config.voxel.compute()
        }

        function select(e)
        {
            if(e)
            e.stopPropagation()
            for(var {deselect} of layers)
            {
                deselect()
            }
            selected = true
            config.selected_layer = self
            layer.$update()
        }
        //get last new layer number
        var last = 0
        for(var {text} of layers)
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

        layers.push(self)
        
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
            <button class="button" on:click={add_layer}>Add</button>
        </div>
        <div class="col layer-container" ref={layer_container}>

        </div>
    </div>
    setTimeout(() => {
        add_layer()
    }, 0);
    return result
}
