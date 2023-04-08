import * as THREE from 'three';
export {CreateLights};

function CreateLights() {
    var directionalLights = [];

      var ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    directionalLights.push(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 0.2);
  mainLight.position.set(-10, 10, 10);
  mainLight.castShadow = true;
  //res
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;

  directionalLights.push(mainLight);


  // var helperLight;
  // helperLight = new THREE.DirectionalLight(0xffffff, 0.2);
  // helperLight.position.set(0, 1, 0);
  // directionalLights.push(helperLight);

  // helperLight = new THREE.DirectionalLight(0xffffff, 0.1);
  // helperLight.position.set(0, 0, 1);
  // directionalLights.push(helperLight);

  // helperLight = new THREE.DirectionalLight(0xffffff, 0.1);
  // helperLight.position.set(1, 0, 0);
  // directionalLights.push(helperLight);

  // helperLight = new THREE.DirectionalLight(0xffffff, 0.05);
  // helperLight.position.set(-1, 0, 0);
  // directionalLights.push(helperLight);

  // helperLight = new THREE.DirectionalLight(0xffffff, 0.1);
  // helperLight.position.set(0, 0, -1);
  // directionalLights.push(helperLight);



    return directionalLights;
}