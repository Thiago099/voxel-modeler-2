export {lineBetweenPoints}
function lineBetweenPoints(x1, y1, z1, x2, y2, z2) {

    //if distance is greather than 1000 then return empty array
    if (Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)) > 1000) {
        return [];
    }
    return Bresenham3D(x1, y1, z1, x2, y2, z2);
    
    function Bresenham3D(x1, y1, z1, x2, y2, z2) {
        var ListOfPoints = [];
        ListOfPoints.push([x1, y1, z1]);
        const {abs} = Math;
        var dx = abs(x2 - x1);
        var dy = abs(y2 - y1);
        var dz = abs(z2 - z1);
        var xs;
        var ys;
        var zs;
        if (x2 > x1) xs = 1; else xs = -1;
        if (y2 > y1) ys = 1; else ys = -1;
        if (z2 > z1) zs = 1; else zs = -1;
        if (dx >= dy && dx >= dz) {
            var p1 = 2 * dy - dx;
            var p2 = 2 * dz - dx;
            while (x1 != x2) {
                x1 += xs;
                if (p1 >= 0) {
                    y1 += ys;
                    p1 -= 2 * dx;
                }
                if (p2 >= 0) {
                    z1 += zs;
                    p2 -= 2 * dx;
                }
                p1 += 2 * dy;
                p2 += 2 * dz;
                ListOfPoints.push([x1, y1, z1]);
            }
        } else if (dy >= dx && dy >= dz) {
            var p1 = 2 * dx - dy;
            var p2 = 2 * dz - dy;
            while (y1 != y2) {
                y1 += ys;
                if (p1 >= 0) {
                    x1 += xs;
                    p1 -= 2 * dy;
                }
                if (p2 >= 0) {
                    z1 += zs;
                    p2 -= 2 * dy;
                }
                p1 += 2 * dx;
                p2 += 2 * dz;
                ListOfPoints.push([x1, y1, z1]);
            }
        } else {
            var p1 = 2 * dy - dz;
            var p2 = 2 * dx - dz;
            while (z1 != z2) {
                z1 += zs;
                if (p1 >= 0) {
                    y1 += ys;
                    p1 -= 2 * dz;
                }
                if (p2 >= 0) {
                    x1 += xs;
                    p2 -= 2 * dz;
                }
                p1 += 2 * dy;
                p2 += 2 * dx;
                ListOfPoints.push([x1, y1, z1]);
            }
        }
        return ListOfPoints;
    }
  
  }