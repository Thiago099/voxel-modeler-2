
import './style.css'
import { useDragElement } from './dragElement'

const app =
<div>
    <div class="dock-area dock-area-left"></div>
    <div class="dock-area dock-area-right"></div>
</div>
const { dragElement } = useDragElement(app)

for(var i = 0; i < 2; i++) {
    var header = ref()
    var window = 
    <div class="window">
        <div>
            <div class="window-header" ref={header}>
                Hello world
            </div>
            <div class="window-content">
                <div>
                    aaa
                </div>
                <div>
                    aaa
                </div>
            </div>
        </div>
    </div>
    dragElement(window,header)
    window.$parent(app)
}

app.$parent(document.body)