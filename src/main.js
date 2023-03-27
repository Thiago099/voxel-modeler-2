import canvasResize from './js-components/resize.js'
import * as THREE from 'three';
import { OrbitControls } from './js-components/OrbitControls.js';

import GreedyMesh from './js-components/GreedyMesh';

export default useMain
function useMain(canvas)
{
    var mesh, renderer, scene, camera, controls;
    // renderer
    renderer = new THREE.WebGLRenderer({
        antialias:true,
        canvas
    });

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( 0xffffff, 0);
    renderer.setPixelRatio( window.devicePixelRatio );


    // scene
    scene = new THREE.Scene();


    
    // camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );


    canvasResize(canvas,(width,height)=>{
        renderer.setSize( width, height );
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    })

    camera.position.set( 20, 20, 20 );

    enableRendererShadows(renderer,camera)

    // controls
    controls = new OrbitControls( camera, renderer.domElement );



    
    controls.zoomSpeed = 2;
    
    // ambient
    scene.add( new THREE.AmbientLight( 0x222222 ) );
    
    // light
    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 20,20, 0 );
    light.castShadow = true;
    scene.add( light );
    


    // geometry cube
    var geometry = new THREE.BoxGeometry( 10, 10, 10 );
    
    // material
    //transparent
    var material = new THREE.MeshPhongMaterial( {
        color: 0x00ffff, 
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
        depthWrite: false,
        depthTest: false,


    } );
    
    // mesh
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );


    
    const gridSpacing = 10; // the spacing between grid lines
    const gridLength = 100; // the length of the grid lines
    const floor = 0; // the y position of the grid
    const left = 0; // the x position of the grid


    // create the grid material with 3 width
    const gridMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

    // create the geometry for the grid
    const gridGeometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = -gridLength; i <= gridLength-1; i += gridSpacing) {
        vertices.push(-gridLength+left, floor, i+left);
        vertices.push(gridLength+left-gridSpacing, floor, i+left);

        vertices.push(i+left, floor, -gridLength+left);
        vertices.push(i+left, floor, gridLength+left-gridSpacing);
    }

    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // create the grid lines and add them to the scene
    const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
    scene.add(grid);


    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    canvas.addEventListener( 'mousemove', onMouseMove );

    canvas.addEventListener( 'keydown', keyDown );
    canvas.addEventListener( 'keyup', keyUp );
    //enable canvas to receive keyboard events
    canvas.tabIndex = 1;
    canvas.focus();

    function onMouseMove( event ) {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
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


    
   const [mm, add,remove] = useVoxels()

        
    scene.add( mm );
            
    

    // define the fixed axis (Y-axis in this case)
    const axis = new THREE.Vector3(0, 1, 0);

    // define a point on the fixed axis
    const point = new THREE.Vector3(0, 0, 0);

    // define a plane that is perpendicular to the fixed axis and passes through the point
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(axis, point);

    function snap_point_to_grid(point)
    {
        var snap = 10;
        point.x = Math.floor(point.x/snap)*snap;
        point.y = Math.floor(point.y/snap)*snap;
        point.z = Math.floor(point.z/snap)*snap;
        point.x += snap/2;
        point.y += snap/2;
        point.z += snap/2;
        return point;
    }
    function snap_point_to_grid2(point)
    {
        var snap = 10;
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
            const intersects = raycaster.intersectObjects( [mm]/*scene.children*/ );
     
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
    
                var pp =  snap_point_to_grid2(point)
                var po =  snap_point_to_grid2(origin)
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
    
                var pos =  snap_point_to_grid2(point)
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
    function GetSeepAxis(raycaster,axis)
    {
        view_axis.x = axis == "x"?0:camera.position.x;
        view_axis.y = axis == "y"?0:camera.position.y;
        view_axis.z = axis == "z"?0:camera.position.z;

        console.log(view_axis);
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

function enableShadownMap(mesh)
{
    mesh.castShadow = true;
    mesh.receiveShadow = true;
}
function enableRendererShadows(renderer,camera)
{
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    

}

function join_array(array) {
    return array.join(",");
}
function useMap(voxels) {
    var map = {};
    for (var i = 0; i < voxels.length; i++) {
        var key = join_array(voxels[i]);
        map[key] = i;
    }
    function get_at(...p) {
        var key = join_array(p)
        return map[key];
    }
    function add(p) {
        var key = join_array(p)
        map[key] = voxels.length;
        voxels.push(p);
    }
    function remove(p) {
        var key = join_array(p)
        var id = map[key];
        delete map[key];
        var last = voxels.pop();
        if (id != voxels.length) {
            voxels[id] = last;
            map[join_array(last)] = id;
        }
    }
    return [get_at,add,remove];
}

function useVoxels()
{
    var voxels = []
    var [get_at,add_map,remove_map] = useMap(voxels)

    // material
    var material = new THREE.MeshPhongMaterial( {
        color: 0xffffff ,
    } );


    var geometry = new THREE.BufferGeometry();
    function add(voxel)
    {
        add_map(voxel)
        compute()
    }
    function remove(voxel)
    {
        remove_map(voxel)
        compute()
    }
    function compute()
    {

        if(voxels.length == 0)
        {
            geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( 0 ), 1 ) );
            geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( 0 ), 3 ) );
            geometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( 0 ), 3 ) );
            return;
        }
        var geometry_data = GreedyMesh(voxels)
        //multiply positions by 10
        for (var i = 0; i < geometry_data.vertices.length; i++) {
            geometry_data.vertices[i] = geometry_data.vertices[i] * 10;

        }


        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry_data.vertices ), 3 ) );
        // quad faces
        geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( geometry_data.faces ), 1 ) );
        geometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array(  geometry_data.normals  ), 3 ) );

        //update to raycast
        geometry.computeBoundingSphere();
    }



    const mesh = new THREE.Mesh( geometry, material );
    enableShadownMap(mesh)
    return  [mesh,add,remove]
}
    // var {grid_program,draw:drawGrid} = await gridShaderProgram(gl)

    // update the display
    // gl.enable(gl.DEPTH_TEST);
    // gl.depthFunc(gl.LEQUAL);
    // gl.enable(gl.CULL_FACE);
    // gl.clearDepth(1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);