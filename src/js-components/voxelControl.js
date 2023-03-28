

import * as THREE from 'three';
export {UseVoxelControl}
// define the fixed axis (Y-axis in this case)
const axis = new THREE.Vector3(0, 1, 0);

// define a point on the fixed axis
const point = new THREE.Vector3(0, 0, 0);

// define a plane that is perpendicular to the fixed axis and passes through the point
const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(axis, point);
function UseVoxelControl(gridSpacing,[voxel_mesh, add, remove])
{
    
    function snap_point_to_grid(point)
    {
        var snap = gridSpacing;
        point.x = Math.floor(point.x/snap);
        point.y = Math.floor(point.y/snap);
        point.z = Math.floor(point.z/snap);
        return point;
    }

    function MouseDown(event, raycaster)
    {
        const intersects = raycaster.intersectObjects( [voxel_mesh]/*scene.children*/ );
     
        if ( intersects.length > 0 ) {
            // set the position of the sphere to the intersection point
            var point = intersects[0].point;
            var direction = intersects[0].face.normal.clone();
            var intersect_mesh = intersects[0].object;
            direction.transformDirection( intersect_mesh.matrixWorld );
            var point = intersects[0].point.clone();
            var origin = intersects[0].point.clone();
            // increment the point by gridSpacing * direction
            point.addScaledVector(direction, gridSpacing/2);
            origin.addScaledVector(direction, -gridSpacing/2);

            var snap_point =  snap_point_to_grid(point)
            var snap_origin =  snap_point_to_grid(origin)
            if(event.button == 0)
            {
                add([snap_point.x,snap_point.y,snap_point.z]);
       
            }
            else
            {
                remove([snap_origin.x,snap_origin.y,snap_origin.z]);
            }

        }
        else
        {
            if(event.button != 0) return;
            const point = new THREE.Vector3();
            raycaster.ray.intersectPlane( plane ,point);

            point.y+=1
            var snap_point =  snap_point_to_grid(point)
            add([snap_point.x,snap_point.y,snap_point.z]);
        }
    }
    return [MouseDown]
}
