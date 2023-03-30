import modal from "../modal/modal";
import data from "../../js-components/global";
export default color_picker_modal

function color_picker_modal(initial_color, callback)
{

    function open()
    {
        var color = <input type="color" model={data.color} />
        color.click()
        color.onchange = function()
        {
            console.log(data.rgb())
            close()
        }
    }
    open()

    var content = 
    <div class="modal-regular">
            {initial_color}
    </div>
    var {close} = modal(content)
}
