import './color-display.css';

export default ColorDisplay

function ColorDisplay({get}) {
    if(get === undefined)
    {
        get = () => [[0,0,0,0],[255,255,255,1]]
    }

    var [background,foreground] = get()
    var result = 
    <div class="color-box-container">
        <div class="color-box">
            <div class="color-box-background color-box-item">
                <div class="color-box-grid"></div>
                <div class="color-box-color" style={`background-color:rgba(${background[0]},${background[1]},${background[2]},${background[3]})`}></div>
            </div>
            <div class="color-box-foreground color-box-item">
                <div class="color-box-grid"></div>
                <div class="color-box-color" style={`background-color:rgba(${foreground[0]},${foreground[1]},${foreground[2]},${foreground[3]})`}></div>
            </div>
        </div>
        <i class="fa-solid fa-arrows-rotate icon swap-icon" on:click={swap}></i>
    </div>

    function swap() {
        var temp = background
        background = foreground
        foreground = temp
        result.$update()
    }
    return result
}