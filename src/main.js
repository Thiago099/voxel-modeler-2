import canvasResize from './js-components/resize.js'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
    //set scroll weight
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

    var geometry2 = new THREE.BoxGeometry( 10, 10, 10 );
    var material2 = new THREE.MeshPhongMaterial( {
        color: 0xff0000,
    } );
    var mesh2 = new THREE.Mesh( geometry2, material2 );
    scene.add( mesh2 );

    
    const gridSpacing = 10; // the spacing between grid lines
    const gridLength = 100/2; // the length of the grid lines
    const floor = -gridSpacing/2; // the y position of the grid
    const left = gridSpacing/2; // the x position of the grid


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

    function onMouseMove( event ) {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        mouse.x = ( event.offsetX / canvas.width ) * 2 - 1;
        mouse.y = - ( event.offsetY / canvas.height ) * 2 + 1;
    }


    // define the fixed axis (Y-axis in this case)
    const axis = new THREE.Vector3(0, 1, 0);

    // define a point on the fixed axis
    const point = new THREE.Vector3(0, 0, 0);

    // define a plane that is perpendicular to the fixed axis and passes through the point
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(axis, point);

    function draw()
    {
        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera( mouse, camera );

        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects( [mesh2]/*scene.children*/ );

        if ( intersects.length > 0 ) {
            // set the position of the sphere to the intersection point
            var point = intersects[0].point;

            var direction = intersects[0].face.normal.clone();

            var intersect_mesh = intersects[0].object;

            direction.transformDirection( intersect_mesh.matrixWorld );

            var point = intersects[0].point.clone();
            // increment the point by gridSpacing * direction
            point.addScaledVector(direction, gridSpacing/2);

            var snap = 10;
            point.x = Math.round(point.x/snap)*snap;
            point.y = Math.round(point.y/snap)*snap;
            point.z = Math.round(point.z/snap)*snap;

            mesh.position.copy(  point );

        }
        else
        {
            const point = new THREE.Vector3();
            raycaster.ray.intersectPlane( plane ,point);


            var snap = 10;
            point.x = Math.round(point.x/snap)*snap;
            point.y = Math.round(point.y/snap)*snap;
            point.z = Math.round(point.z/snap)*snap;

            mesh.position.copy(  point );
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