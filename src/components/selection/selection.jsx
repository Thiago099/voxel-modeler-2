import './selection.css';
export default Selection

function Selection({options,$get,$set}) {
    if(options === undefined)
    {
        options = () => []
        console.error("DropDownMenu: options is undefined")
    }
    if($get === undefined)
    {
        $get = () => {}
        console.error("DropDownMenu: get is undefined")
    }
    if($set === undefined)
    {
        $set = () => {}
        console.error("DropDownMenu: set is undefined")
    }

    var selected = $get()

    var container = 
    <div class="row">
    </div>
    for(const option of options)
    {
        function update()
        {
            $set(option)
            selected = option
            container.$update()
        }
        const icon = ref()
        var el = <button class="button" on:click={update}><i class="fa-regular" ref={icon}></i> {option}</button>
        el.$class("button-selected",option === selected)
        icon.$class("fa-circle",option !== selected)
        icon.$class("fa-circle-dot circle-selected",option === selected)
        
        el.$parent(container)
    }
    return container
}