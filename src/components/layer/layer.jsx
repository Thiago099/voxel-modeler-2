export default Layer
import "./layer.css"

function Layer(props) {
    const layer_container = ref()

    function add_layer() {
        var layer = 
        <div class="layer">
            <i class="fa-solid fa-eye icon "></i>
            <i class="fa-solid fa-eye-slash icon"></i>
            <i class="fa-solid fa-trash icon"></i>
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
    add_layer()
    return result
}
