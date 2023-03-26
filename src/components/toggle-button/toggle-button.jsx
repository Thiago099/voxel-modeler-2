export default ToggleButton

function ToggleButton({name,$get,$set}) {
    if(name === undefined)
    {
        name = () => []
        console.error("Toggle button: name is undefined")
    }
    if($get === undefined)
    {
        $get = () => {}
        console.error("Toggle button: get is undefined")
    }
    if($set === undefined)
    {
        set = () => {}
        console.error("Toggle button: set is undefined")
    }
    var active = $get()
    function update()
    {
        active = !active
        $set(active)
        result.$update()
    }
    const icon = ref()
    var result = <button class="button" on:click={update}><i class="fa-regular" ref={icon}></i> {name}</button>
    result.$class("button-selected",active)
    icon.$class("fa-circle-check circle-selected",active)
    icon.$class("fa-circle ",!active)
    return result
}