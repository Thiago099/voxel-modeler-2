import modal from "../modal/modal";
import data from "../../js-components/global";
export default color_picker_modal

function color_picker_modal(initial_color, callback)
{
    var {close} = modal(content)
    function open()
    {
        var color = <input type="color" model={data.color} />
        color.click()
        color.onchange = function()
        {
            close()
        }
    }
    open()

    var content = 
    <div class="modal-regular">
            {initial_color}
    </div>

}
