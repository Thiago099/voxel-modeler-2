import './drop-down-menu.css';

export default DropDownMenu

function DropDownMenu({options,name})
{
    if(options === undefined)
    {
        console.error("DropDownMenu: options is undefined")
    }
    options = options()
    if(name === undefined)
    {
        var name = "[missing]"
        console.error("DropDownMenu: name is undefined")
    }
    var open = false;


    
    const container = ref()
    const button = ref()
    const result =     
    <div class="drop-down-container" >
        <div class="drop-down" ref={button}>
            {name}
        </div>
        <div class="drop-down-content" ref={container}>
        </div>
    </div>
    
    result.$class("drop-down-container-active",open)

    for(const option of options)
    {
        if(Object.keys(option).length === 0)
        {
            var item = <div class="drop-down-separator"></div>
            item.$parent(container)
        }
        else
        {
            var item = <div class="drop-down-menu-item" on:click={option.action}>{option.text}</div>
            item.$parent(container)
        }
    }
    button.$on('click', () => {
        open = !open
        result.$update()
    })
    document.addEventListener('click', (e) => {
        //check if event target is inside the drop down menu
        if(!container.$element.contains(e.target) && !button.$element.contains(e.target))
        {
            open = false
            result.$update()
        }
    })

    return result
}