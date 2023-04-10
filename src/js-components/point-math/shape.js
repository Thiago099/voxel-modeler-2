import global from '../../global.js';
export {getPointsInShape}

function getPointsInShape(center, radius, axis) {
  radius -= 1
  if(radius == 0) return [{x:center.x,y:center.y,z:center.z,i:0}];
  if(global.shape == "Sphere"){
    return getPointsInSphere(center, radius);
  }
  else if(global.shape == "Cube"){
    return getPointsInCube(center, radius);
  }
  else if(global.shape == "Circle"){
    return getPointsInCircle(center, radius, axis);
  }
  else if(global.shape == "Square"){
    return getPointsInSquare(center, radius, axis);
  }
    
}


  function getPointsInSphere(center,radius)
  {
    const points = [];
    for (let x = center.x - radius; x <= center.x + radius; x++) {
      for (let y = center.y - radius; y <= center.y + radius; y++) {
        for (let z = center.z - radius; z <= center.z + radius; z++) {
          const distance = Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2) + Math.pow(z - center.z, 2));
          
          if (distance <= radius) {
            points.push({ x, y, z , i:distance/radius});
          }
        }
      }
    }
    
    return points;
  }

  function getPointsInCube(center,radius)
  {
    const points = [];
    for (let x = center.x - radius; x <= center.x + radius; x++) {
      for (let y = center.y - radius; y <= center.y + radius; y++) {
        for (let z = center.z - radius; z <= center.z + radius; z++) {
          var distance = Math.max(Math.abs(x - center.x),Math.abs(y - center.y),Math.abs(z - center.z));
          points.push({ x, y, z , i:distance/radius});
        }
      }
    }
    return points;
  }

  function getPointsInCircle(center,radius,axis)
  {
    const points = [];

    var a,b,c;
    if(axis == "x"){
      a = "y";
      b = "z";
      c = "x";
    }
    else if(axis == "y"){
      a = "x";
      b = "z";
      c = "y";
    }
    else if(axis == "z"){
      a = "x";
      b = "y";
      c = "z";
    }
    for (let x = center[a] - radius; x <= center[a] + radius; x++) {
      for (let y = center[b] - radius; y <= center[b] + radius; y++) {
        const distance = Math.sqrt(Math.pow(x - center[a], 2) + Math.pow(y - center[b], 2));
        if (distance <= radius) {
          var point = {};
          point[a] = x;
          point[b] = y;
          point[c] = center[c];
          point.i = distance/radius;
          points.push(point);
        }
      }
    }
    

    return points;
  }
  function getPointsInSquare(center,radius,axis)
  {
    const points = [];

    var a,b,c;
    if(axis == "x"){
      a = "y";
      b = "z";
      c = "x";
    }
    else if(axis == "y"){
      a = "x";
      b = "z";
      c = "y";
    }
    else if(axis == "z"){
      a = "x";
      b = "y";
      c = "z";
    }
    for (let x = center[a] - radius; x <= center[a] + radius; x++) {
      for (let y = center[b] - radius; y <= center[b] + radius; y++) {
        var distance = Math.max(Math.abs(x - center[a]),Math.abs(y - center[b]));
        var point = {};
        point[a] = x;
        point[b] = y;
        point[c] = center[c];
        point.i = distance/radius;
        points.push(point);
      }
    }
    

    return points;
  }