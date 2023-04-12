import * as THREE from 'three';
export {CreateGrid}

function CreateGrid(gridLength) {

    const gridMaterial = new THREE.LineBasicMaterial({
         color: 0xffffff ,
        });

    const gridGeometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = -gridLength; i <= gridLength-1; i += 1) {
        vertices.push(-gridLength, -0.001, i);
        vertices.push(gridLength-1, -0.001, i);
        vertices.push(i, -0.001, -gridLength);
        vertices.push(i, -0.001, gridLength-1);
    }
    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    return new THREE.LineSegments(gridGeometry, gridMaterial);
}