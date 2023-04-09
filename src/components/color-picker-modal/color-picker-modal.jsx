import './color-picker-modal.css'
import modal from "../modal/modal";
export default color_picker_modal

function color_picker_modal()
{
    const canvas = ref()
    var content = 
    <div class="modal-regular">

    <div class="color-picker-container">
        <div class="bright"></div>
        <div class="hue"></div>
    </div>


    </div>

    var {close} = modal(content)
    function open()
    {

    }
}
