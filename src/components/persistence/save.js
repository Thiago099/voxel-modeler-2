import { SaveModal } from "./save-modal"
export {Save}
function Save(extension,callback)
{
    SaveModal(extension,(filename)=>{
        var a = document.createElement("a")
        a.href = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(callback()))
        a.download = filename + "." + extension
        a.click()

    })
}