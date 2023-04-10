import modal from "../modal/modal"
export {ConfirmModal}


function ConfirmModal(text,action)
{

    const content = 
    <div class="modal-confirm">
        <p style="margin:20px 0;text-align:center">{text}</p>
        <div class="corner">
            <button on:click={act} class="button">Yes</button>
            <button on:click={closeModal} class="button">No</button>
        </div>
    </div>
    const {close} = modal(content)
    function closeModal()
    {
        close()
    }
    function act()
    {
        close()
        action()
    }


}