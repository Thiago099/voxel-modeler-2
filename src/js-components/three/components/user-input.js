
import * as THREE from 'three'
export { createUserInput }
function createUserInput(orbit, container, meshes, mouseDown, onMouseMove, onMouseUp)
{
    container.addEventListener( 'mousedown', onDocumentMouseDown );
    container.addEventListener( 'mousemove', onDocumentMouseMove );
    container.addEventListener( 'mouseup', onDocumentMouseUp ); 

    function onDocumentTouchStart(event) {
        if (event.touches.length === 1) {
            // Single touch logic (equivalent to mouse down)
            let evt = event.touches[0];
            evt.button = 0
            onDocumentMouseDown(evt);
        }
    }
    
    function onDocumentTouchMove(event) {
        if (event.touches.length === 1) {
            let evt = event.touches[0];
            evt.button = 0
            // Single touch logic (equivalent to mouse move)
            onDocumentMouseMove(evt);
        }
    }
    
    function onDocumentTouchEnd(event) {
        let evt = event.changedTouches[0];
        evt.button = 0
        // Touch end logic (equivalent to mouse up)
        onDocumentMouseUp(evt);
    }

    container.addEventListener('touchstart', onDocumentTouchStart);
    container.addEventListener('touchmove', onDocumentTouchMove);
    container.addEventListener('touchend', onDocumentTouchEnd,);


    const raycaster = new THREE.Raycaster();
    function onDocumentMouseDown(event)
    {
        if(event.ctrlKey)
        {
            return
        }

        raycaster.setFromCamera( get_mouse(event), orbit.camera );
        ray_cast(meshes, raycaster, (props)=>mouseDown(event,{raycaster,...props}))
    }
    function onDocumentMouseMove(event)
    {
        if(event.ctrlKey)
        {
            return
        }
        raycaster.setFromCamera( get_mouse(event), orbit.camera );
        ray_cast(meshes, raycaster, (props)=>onMouseMove(event,{raycaster,...props}))
    }
    function onDocumentMouseUp(event)
    {
        onMouseUp(event)
    }
    function get_mouse(event) {
        const mouse = {};
        var width = Number(container.$get_computed_style("width").slice(0, -2));
        var height = Number(container.$get_computed_style("height").slice(0, -2));
        mouse.x = ((event.clientX - container.getBoundingClientRect().left) / width) * 2 - 1;
        mouse.y = -((event.clientY - container.getBoundingClientRect().top) / height) * 2 + 1;
        return mouse;
      }
}

const axis = new THREE.Vector3(0, 1, 0);

// define a point on the fixed axis
const point = new THREE.Vector3(0, 0, 0);

// define a plane that is perpendicular to the fixed axis and passes through the point
const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(axis, point);

function ray_cast(objects, raycaster,callback)
{

    const intersects = raycaster.intersectObjects( objects );
 
    if ( intersects.length > 0 ) {
        var point = intersects[0].point;
        var direction = intersects[0].face.normal.clone();
        var intersect_mesh = intersects[0].object;
        direction.transformDirection( intersect_mesh.matrixWorld );
        var point = intersects[0].point.clone();
        var origin = intersects[0].point.clone();
        
        point.addScaledVector(direction, 0.5);
        origin.addScaledVector(direction, -0.5);

        var snap_point =  snap_point_to_grid(point)
        var snap_origin =  snap_point_to_grid(origin)

        callback({
            point: snap_point,
            origin: snap_origin,
            axis: get_axis(direction),
            normal_direction: get_normal_direction(direction)
        })
    }
    else
    {
        const point = new THREE.Vector3();
        raycaster.ray.intersectPlane( plane ,point);
        point.y+=0.1
        var snap_point =  snap_point_to_grid(point)
        callback({point:snap_point,origin:null,axis:"y",normal_direction:1})
    }
}
function snap_point_to_grid(point)
{
    point.x = Math.floor(point.x);
    point.y = Math.floor(point.y);
    point.z = Math.floor(point.z);
    return point;
}


function get_axis(direction)
{
    if(direction.x != 0)
    {
        return "x"
    }
    if(direction.y != 0)
    {
        return "y"
    }
    if(direction.z != 0)
    {
        return "z"
    }
    return null;
}

function get_normal_direction(direction)
{
    if(direction.x > 0) return 1
    if(direction.y > 0) return 1
    if(direction.z > 0) return 1
    if(direction.x < 0) return -1
    if(direction.y < 0) return -1
    if(direction.z < 0) return -1
}
