import * as THREE from 'three';
export {CreateGrid}

function CreateGrid(gridSpacing, gridLength) {

    const gridMaterial = new THREE.LineBasicMaterial({
         color: 0xffffff ,
        });

    const gridGeometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = -gridLength; i <= gridLength-1; i += gridSpacing) {
        vertices.push(-gridLength, 0, i);
        vertices.push(gridLength-gridSpacing, 0, i);
        vertices.push(i, 0, -gridLength);
        vertices.push(i, 0, gridLength-gridSpacing);
    }
    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    return new THREE.LineSegments(gridGeometry, gridMaterial);
}