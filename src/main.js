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

    // controls
    controls = new OrbitControls( camera, renderer.domElement );



    
    controls.zoomSpeed = 2;
    
    // ambient
    scene.add( new THREE.AmbientLight( 0x222222 ) );
    
    // light
    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 20,20, 0 );
    scene.add( light );
    


    // geometry cube
    var geometry = new THREE.BoxGeometry( 10, 10, 10 );
    
    // material
    var material = new THREE.MeshPhongMaterial( {
        color: 0x00ffff, 
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
    function keyDown( event ) {
        if(event.key == "Control")
        {
            controls.enableRotate = true;
            controls.enablePan = true;

        }
    }
    function keyUp( event ) {
        if(event.key == "Control")
        {
            controls.enablePan = false;
            controls.enableRotate = false;

        }
    }


    
    var voxels = [
        [0,0,0],
        [1,0,0],
        [2,0,0],
    ]
    var geometry_data = GreedyMesh(voxels)
    // material
    var m = new THREE.MeshPhongMaterial( {
        color: 0xffffff ,
    } );


    //multiply positions by 10
    for (var i = 0; i < geometry_data.vertices.length; i++) {
        geometry_data.vertices[i] = geometry_data.vertices[i] * 10;

    }

    var g = new THREE.BufferGeometry();
    g.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry_data.vertices ), 3 ) );
    // quad faces
    g.setIndex( new THREE.BufferAttribute( new Uint16Array( geometry_data.faces ), 1 ) );
    g.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array(  geometry_data.normals  ), 3 ) );


    // mesh
    var mm = new THREE.Mesh( g, m );

        
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
    function draw()
    {
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

            mesh.position.copy(  snap_point_to_grid(point) );

        }
        else
        {
            const point = new THREE.Vector3();
            raycaster.ray.intersectPlane( plane ,point);



            mesh.position.copy(  snap_point_to_grid(point) );

        }
            // enable depth test
        renderer.render( scene, camera );
    }

    return {draw}

}




    // var {grid_program,draw:drawGrid} = await gridShaderProgram(gl)

    // update the display
    // gl.enable(gl.DEPTH_TEST);
    // gl.depthFunc(gl.LEQUAL);
    // gl.enable(gl.CULL_FACE);
    // gl.clearDepth(1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);