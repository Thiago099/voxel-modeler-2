import modal from "../modal/modal"
export {SaveModal}


function SaveModal(extension, data)
{
    
    const saveButton = ref()
    const model = state({filename:"New project"})
    //if has name on local storage, use it
    var item = localStorage.getItem("filename")
    if(item)
    {
        model.filename = item
    }


    const content = <div class="modal-small">
        <div class="row">
            <div class="input-group flex">
                <label>File name</label>
                <input type="text" class="input" model={model.filename}/>
            </div>
        </div>
        <button class="button corner" ref={saveButton}>Save</button>
    </div>
    const {close} = modal(content)
    saveButton.$on("click", () => {
        data(model.filename)
        localStorage.setItem("filename", model.filename)
        close()
    })
}