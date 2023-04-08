export {getPointsInSphere}

function getPointsInSphere(center, radius) {
    const points = [];
    radius -= 1
    
    for (let x = center.x - radius; x <= center.x + radius; x++) {
      for (let y = center.y - radius; y <= center.y + radius; y++) {
        for (let z = center.z - radius; z <= center.z + radius; z++) {
          const distance = Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2) + Math.pow(z - center.z, 2));
          
          if (distance <= radius) {
            points.push({ x, y, z });
          }
        }
      }
    }
    
    return points;
  }