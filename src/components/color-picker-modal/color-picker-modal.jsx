import modal from "../modal/modal";
export default color_picker_modal

function color_picker_modal()
{
    const canvas = ref()
    var content = 
    <div class="modal-regular">
        <canvas ref={canvas}></canvas>
    </div>

    var {close} = modal(content)
    function open()
    {

    }
}
