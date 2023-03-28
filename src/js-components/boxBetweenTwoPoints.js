export {boxBetweenTwoPoints}
function boxBetweenTwoPoints(x1, y1, z1, x2, y2, z2) {
    var result = [];
    if(x1 > x2) [x1,x2] = [x2,x1];
    if(y1 > y2) [y1,y2] = [y2,y1];
    if(z1 > z2) [z1,z2] = [z2,z1];

    for(var x = x1; x <= x2; x++)
    {
        for(var y = y1; y <= y2; y++)
        {
            for(var z = z1; z <= z2; z++)
            {
                result.push([x,y,z])
            }
        }
    }
    return result;
}