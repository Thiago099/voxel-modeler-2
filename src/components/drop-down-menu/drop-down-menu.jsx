import './drop-down-menu.css';

export default DropDownMenu

function DropDownMenu({options,name})
{
    if(options === undefined)
    {
        console.error("DropDownMenu: options is undefined")
    }
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
        if(option == null )
        {
            const item = <div class="drop-down-separator"></div>
            item.$parent(container)
        }
        else if(option.action)
        {
            const item = <div class="drop-down-menu-item" on:click={execute}>{option.text}</div>
            function execute(e) {
                option.action(e)
                open = false
                result.$update()
            }
            item.$parent(container)
        }
        else if (option.options)
        {
            let selected = option.options[0]
            for(const i of option.options)
            {
                const icon = ref()
                const el = <div class="drop-down-menu-item" ><i class="fa-regular" ref={icon}></i>&nbsp;{i}</div>
                el.$class("button-selected",i === selected)
                icon.$class("fa-circle",i !== selected)
                icon.$class("fa-circle-dot circle-selected",i === selected)
                el.$parent(container)
                el.$on('click', () => {
                    selected = i
                    result.$update()
                    option.set(i)
                })
            }
        }
        else
        {
            option.active = option.get()
            const icon = ref()
            const item = <div class="drop-down-menu-item" on:click={update}><i class="fa-regular" ref={icon}></i>&nbsp;{option.text}</div>
            function update()
            {
                option.active = !option.active
                option.set(option.active)
                result.$update()
            }
            item.$class("drop-down-menu-item-selected",option.active)
            icon.$class("fa-circle-check circle-selected",option.active)
            icon.$class("fa-circle ",!option.active)
            item.$parent(container)
        }
    }
    button.$on('click', () => {
        open = !open
        result.$update()
    })
    document.addEventListener('click', (e) => {
        //check if event target is inside the drop down menu
        if(!container.contains(e.target) && !button.contains(e.target))
        {
            open = false
            result.$update()
        }
    })

    return result
}