import canvasResize from './js-components/resize.js'
import * as THREE from 'three';
import { OrbitControls } from './js-components/OrbitControls.js';
import { useGrid } from './js-components/Grid.js';

import { useVoxels } from './js-components/voxel.js';
import { useLights } from './js-components/Lights.js';
export default useMain
function useMain(canvas)
{
    var renderer = new THREE.WebGLRenderer({
        antialias:true,
        canvas
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( 0xffffff, 0);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 20, 20, 20 );
    canvasResize(canvas,(width,height)=>{
        renderer.setSize( width, height );
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
    })
    var controls = new OrbitControls( camera, canvas );

    var distance = 150; // desired distance
    var vector = new THREE.Vector3();
    vector.subVectors(camera.position, controls.target); // vector from target to camera
    vector.setLength(distance); // set vector length to desired distance
    camera.position.copy(controls.target).add(vector); // set camera position
    controls.zoomSpeed = 2;

    const lights = useLights();
    lights.forEach(light => scene.add(light));

    


    // shaded cube
    // var geometry = new THREE.BoxGeometry( 10, 10, 10 );
    // const material = new THREE.MeshStandardMaterial({
    //     color: 'cyan', // Set the base color to white
    //     metalness: 0.5, // Adjust the metalness and roughness properties
    //     roughness: 0.5,
    //   });
    // mesh = new THREE.Mesh( geometry, material );
    //     scene.add( mesh );    


    const gridSpacing = 5
    const gridLength = 50

    scene.add( useGrid(gridSpacing, gridLength) );

    const [voxel_mesh, add, remove] = useVoxels(gridSpacing)

    scene.add( voxel_mesh );



    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    canvas.addEventListener( 'mousemove', onMouseMove );
    canvas.addEventListener( 'keydown', keyDown );
    canvas.addEventListener( 'keyup', keyUp );
    canvas.tabIndex = 1;
    canvas.focus();

    function onMouseMove( event ) {
        mouse.x = ( event.offsetX / canvas.width ) * 2 - 1;
        mouse.y = - ( event.offsetY / canvas.height ) * 2 + 1;
    }
    
    controls.enablePan = false;
    controls.enableRotate = false;
    var control_key = false;

    function keyDown( event ) {
        if(event.key == "Control")
        {
            controls.enableRotate = true;
            controls.enablePan = true;
            control_key = true;

        }
    }
    function keyUp( event ) {
        if(event.key == "Control")
        {
            controls.enablePan = false;
            controls.enableRotate = false;
            control_key = false;

        }
    }


    // define the fixed axis (Y-axis in this case)
    const axis = new THREE.Vector3(0, 1, 0);

    // define a point on the fixed axis
    const point = new THREE.Vector3(0, 0, 0);

    // define a plane that is perpendicular to the fixed axis and passes through the point
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(axis, point);


    function snap_point_to_grid(point)
    {
        var snap = gridSpacing;
        point.x = Math.floor(point.x/snap);
        point.y = Math.floor(point.y/snap);
        point.z = Math.floor(point.z/snap);
        return point;
    }


    canvas.addEventListener( 'mousedown', onClick );

   
    function onClick( event ) {
        if(event.button != 0 && event.button != 2) return;
        if(control_key) return;
            // update the picking ray with the camera and mouse position
            raycaster.setFromCamera( mouse, camera );
            // calculate objects intersecting the picking ray
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
    
                var pp =  snap_point_to_grid(point)
                var po =  snap_point_to_grid(origin)
                if(event.button == 0)
                {
                    add([pp.x,pp.y,pp.z]);
           
                }
                else
                {
                    remove([po.x,po.y,po.z]);
                }
    
            }
            else
            {
                const point = new THREE.Vector3();
                raycaster.ray.intersectPlane( plane ,point);
    
                point.y+=1
                var pos =  snap_point_to_grid(point)

                add([pos.x,pos.y,pos.z]);
   
    
            }

     
        }

            // define the fixed axis (Y-axis in this case)
    const view_axis = new THREE.Vector3(0, 1, 0);

    // define a point on the fixed axis
    const view_point = new THREE.Vector3(0, 0, 0);

    // define a plane that is perpendicular to the fixed axis and passes through the point
    const view_plane = new THREE.Plane().setFromNormalAndCoplanarPoint(axis, point);
    //render plane
    
    
    function draw()
    {
            raycaster.setFromCamera( mouse, camera );
           // calculate objects intersecting the picking ray
        //    const intersects = raycaster.intersectObjects( [mm]/*scene.children*/ );

        // var p = GetSeepAxis(raycaster,"x");
        // mesh.position.copy( p );


        //rotate the x and z axis to the camera

        /*

        */
            
        //    if ( intersects.length > 0 ) {
        //        // set the position of the sphere to the intersection point
        //        var point = intersects[0].point;
   
        //        var direction = intersects[0].face.normal.clone();
   
        //        var intersect_mesh = intersects[0].object;
   
   
        //        direction.transformDirection( intersect_mesh.matrixWorld );
   
        //        var point = intersects[0].point.clone();
        //        var origin = intersects[0].point.clone();
        //        // increment the point by gridSpacing * direction
        //        point.addScaledVector(direction, gridSpacing/2);
        //        origin.addScaledVector(direction, -gridSpacing/2);
   
        //        mesh.position.copy(  snap_point_to_grid(point) );
   
        //    }
        //    else
        //    {
        //        const point = new THREE.Vector3();
        //        raycaster.ray.intersectPlane( plane ,point);
        //        mesh.position.copy(  snap_point_to_grid(point) );
   
        //    }
        renderer.render( scene, camera );
    }

    return {draw}

}

