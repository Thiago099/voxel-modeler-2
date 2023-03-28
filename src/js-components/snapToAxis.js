import * as THREE from 'three';
export {SnapToAxis}
function SnapToAxis(raycaster,axis,camera)
{
    const view_point = new THREE.Vector3();
    const view_axis = new THREE.Vector3();
    const view_plane = new THREE.Plane();
    view_axis.x = axis == "x"?0:camera.position.x;
    view_axis.y = axis == "y"?0:camera.position.y;
    view_axis.z = axis == "z"?0:camera.position.z;

    view_plane.setFromNormalAndCoplanarPoint(view_axis, view_point);
    const point = new THREE.Vector3();
    raycaster.ray.intersectPlane( view_plane ,point);
    if(axis != "x")
    {
        point.x = 0;
    }
    if(axis != "y")
    {
        point.y = 0;
    }
    if(axis != "z")
    {
        point.z = 0;
    }
    return point;
}