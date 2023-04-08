import * as THREE from 'three';
export {CreateLights};

function CreateLights() {
    var directionalLights = [];
    var directions = [
        new THREE.Vector3(-1, 1, -1),
        new THREE.Vector3(1, 0, -1),
        new THREE.Vector3(1, 1, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(1, 0, 1),
        new THREE.Vector3(0, -1,0)
        
      ];
      var intensities = [0.5, 0.2, 0.5, 0.2, 0.5, 0.2];
      
      for (var i = 0; i < directions.length; i++) {
        var directionalLight = new THREE.DirectionalLight(0xffffff, intensities[i]);
        directionalLight.position.copy(directions[i]);
        directionalLights.push(directionalLight);
    }
    return directionalLights;
}