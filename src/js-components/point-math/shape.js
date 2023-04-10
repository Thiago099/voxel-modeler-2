import global from '../../global.js';
export {getPointsInShape}

function getPointsInShape(center, radius) {
  if(radius == 0) return [{x:center.x,y:center.y,z:center.z,i:0}];
  if(global.shape == "Sphere"){
    return getPointsInSphere(center, radius);
  }
  else if(global.shape == "Cube"){
    return getPointsInCube(center, radius);
  }
    
}


  function getPointsInSphere(center,radius)
  {
    const points = [];
    radius -= 1
    
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
    radius -= 1;
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