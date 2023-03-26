import modal from "../modal/modal";

export default color_picker_modal

function color_picker_modal(initial_color, callback)
{
    var content = 
    <div class="modal-regular">
            {initial_color}
    </div>
    var {close} = modal(content)
}
