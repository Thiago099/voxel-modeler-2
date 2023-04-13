
var normals = `
vn -0.000000 0.000000 1.000000
vn 0.000000 0.000000 -1.000000
vn 0.000000 1.000000 0.000000
vn 0.000000 -1.000000 0.000000
vn 1.000000 0.000000 0.000000
vn -1.000000 -0.000000 -0.000000
`
function build_obj_file({vert,index,normal,uv_position,uv_index,uv_color,width,height})
{
    var result = ""
    for(var i = 0;i<vert.length;i++)
    {
        result += `v ${vert[i][0]} ${vert[i][1]} ${vert[i][2]}\n`
    }
    result += "\n"
    for(var i = 0;i<uv_position.length;i++)
    {
        result += `vt ${uv_position[i][0]} ${uv_position[i][1]}\n`
    }
    result += "\n"
    result += normals
    result += "\n"
    for(var i = 0;i<index.length;i++)
    {
        result +=`f ${index[i][0]}/${uv_index[i][0]}/${normal[i]} ${index[i][1]}/${uv_index[i][1]}/${normal[i]} ${index[i][2]}/${uv_index[i][2]}/${normal[i]}\n`
    }
    return result
}

function build_hd_texture({uv_color,width,height},scale = 32)
{
    var canvas = document.createElement("canvas")
    canvas.width = width * scale
    canvas.height = height * scale
    var ctx = canvas.getContext("2d")

    for(var item of uv_color)
    {
        var [x,y] = item.position
        var [r,g,b] = item.color
        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.fillRect(x*scale,y*scale,scale,scale)
    }

    var dataURL = canvas.toDataURL("image/png");
    canvas.remove();

    return dataURL
}
    
function build_texture({uv_color,width,height})
{
    var canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    var ctx = canvas.getContext("2d")
    var imgData = ctx.createImageData(width, height);


    for (var x = 0; x < imgData.width; x++) {
        for (var y = 0; y < imgData.height; y++) {
          // Calculate the index of the current pixel
          var index = (x + y * imgData.width) * 4;
      
          // Set the color of the current pixel
          imgData.data[index] = 255; // red
          imgData.data[index + 1] = 1; // green
          imgData.data[index + 2] = 1; // blue
          imgData.data[index + 3] = 1; // alpha
        }
      }
    for(var item of uv_color)
    {
        var [x,y] = item.position
        var [r,g,b] = item.color
        var index = (x + y * width) * 4;
        imgData.data[index + 0] = r;
        imgData.data[index + 1] = g ;
        imgData.data[index + 2] = b;
        imgData.data[index + 3] = 255; // alpha
    }
    ctx.putImageData(imgData, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    canvas.remove();
    return dataURL

}
    
export {build_obj_file,build_texture,build_hd_texture}