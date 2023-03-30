import "./layer.css"
import data from "@/js-components/global"
export default Layer

function Layer(props) {
    const layer_container = ref()

    var layers = []
    function add_layer() {
        var visible = true
        var selected = false
        function deselect()
        {
            selected = false
            layer.$update()
        }
  
        const obj = data.addLayer()

        function destroy()
        {
            obj.destroy()
            layer.$remove()
        }

        function toggle(e)
        {
            if(e)
            e.stopPropagation()
            if(visible)
            {
                obj.hide()
                visible = false
                layer.$update()
            }
            else
            {
                obj.show()
                visible = true
                layer.$update()
            }
        }

        function select(e)
        {
            if(e)
            e.stopPropagation()

            for(var {deselect} of layers)
            {
                console.log(deselect)
                deselect()
            }
            obj.select()
            selected = true
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
        var self = state({deselect, text: `New layer ${last+1}`})
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
