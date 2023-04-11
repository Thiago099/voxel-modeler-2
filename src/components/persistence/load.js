export {Load}

function Load(extension, callback)
{
    //load prompt
    var file = document.createElement("input")
    file.type = "file"
    file.accept = "."+extension
    file.onchange = function()
    {
        var reader = new FileReader()
        reader.onload = function()
        {
            var data = JSON.parse(reader.result)
            callback(data)
        }
        reader.readAsText(file.files[0])
    }
    file.click()
}