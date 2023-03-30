import "./layer.css"
import data from "@/js-components/global"
export default Layer

function Layer(props) {
    const layer_container = ref()

    function add_layer() {
        const obj = data.addLayer()
        obj.select()
        function destroy()
        {
            obj.destroy()
            layer.$remove()
        }
        const layer = 
        <div class="layer">
            <i class="fa-solid fa-pen-to-square icon" on:click={obj.select}></i>
            <i class="fa-solid fa-eye icon " on:click={obj.show}></i>
            <i class="fa-solid fa-eye-slash icon" on:click={obj.hide}></i>
            <i class="fa-solid fa-trash icon" on:click={destroy}></i>
        </div>
        layer.$parent(layer_container)

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
