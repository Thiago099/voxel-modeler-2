import * as THREE from 'three';
import "./PathTracingCommon.js"


export {CreateRaytraceWorker}

let fovScale;

let pixelRatio = 1;
let windowIsBeingResized = false;

let sampleCounter = 0.0; // will get increased by 1 in animation loop before rendering
let frameCounter = 1.0; // 1 instead of 0 because it is used as a rng() seed in pathtracing shader
let cameraIsMoving = false;
let cameraRecentlyMoving = false;

let blueNoiseTexture;


const fileLoader = new THREE.FileLoader();
const textureLoader = new THREE.TextureLoader();


async function CreateRaytraceWorker(canvas,scene,worldCamera)
{

	// load a resource
	blueNoiseTexture = await textureLoader.load('textures/BlueNoise_RGBA256.png')
	blueNoiseTexture.wrapS = THREE.RepeatWrapping;
	blueNoiseTexture.wrapT = THREE.RepeatWrapping;
	blueNoiseTexture.flipY = false;
	blueNoiseTexture.minFilter = THREE.NearestFilter;
	blueNoiseTexture.magFilter = THREE.NearestFilter;
	blueNoiseTexture.generateMipmaps = false;


	const EPS_intersect= 0.001;
	const apertureSize = 0.0;
	const focusDistance =  100.0;

	let pixelEdgeSharpness = 1.0;
	let edgeSharpenSpeed = 0.05;
	let filterDecaySpeed = 0.0002;

	let useToneMapping = true;
	let sceneIsDynamic = false;


	const renderer = new THREE.WebGLRenderer({ canvas: canvas, context: canvas.getContext('webgl2') });

	//suggestion: set to false for production
	renderer.debug.checkShaderErrors = true;

	renderer.autoClear = false;

	renderer.toneMapping = THREE.ReinhardToneMapping;

	//required by WebGL 2.0 for rendering to FLOAT textures
	const context = renderer.getContext();
	context.getExtension('EXT_color_buffer_float');
	context.getExtension('EXT_float_blend');




	const clock = new THREE.Clock();

	const pathTracingScene = new THREE.Scene();
	const screenCopyScene = new THREE.Scene();
	const screenOutputScene = new THREE.Scene();

	// quadCamera is simply the camera to help render the full screen quad (2 triangles),
	// hence the name.  It is an Orthographic camera that sits facing the view plane, which serves as
	// the window into our 3d world. This camera will not move or rotate for the duration of the app.
	const quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	screenCopyScene.add(quadCamera);
	screenOutputScene.add(quadCamera);

	// worldCamera is the dynamic camera 3d object that will be positioned, oriented and 
	// constantly updated inside the 3d scene.  Its view will ultimately get passed back to the 
	// stationary quadCamera, which renders the scene to a fullscreen quad (made up of 2 large triangles).
	pathTracingScene.add(worldCamera);

	

	// setup render targets...
	const pathTracingRenderTarget = new THREE.WebGLRenderTarget(context.drawingBufferWidth, context.drawingBufferHeight, {
		minFilter: THREE.NearestFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBAFormat,
		type: THREE.FloatType,
		depthBuffer: false,
		stencilBuffer: false
	});
	pathTracingRenderTarget.texture.generateMipmaps = false;

	const  screenCopyRenderTarget = new THREE.WebGLRenderTarget(context.drawingBufferWidth, context.drawingBufferHeight, {
		minFilter: THREE.NearestFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBAFormat,
		type: THREE.FloatType,
		depthBuffer: false,
		stencilBuffer: false
	});
	screenCopyRenderTarget.texture.generateMipmaps = false;

	const pathTracingUniforms = {}

	scene.pathTracingUniforms = pathTracingUniforms;
	

	await scene.Build(pathTracingUniforms)
	

	// setup screen-size quad geometry and shaders....

	// this full-screen quad mesh performs the path tracing operations and produces a screen-sized image
	const pathTracingGeometry = new THREE.PlaneGeometry(2, 2);

	pathTracingUniforms.tPreviousTexture = { type: "t", value: screenCopyRenderTarget.texture };
	pathTracingUniforms.tBlueNoiseTexture = { type: "t", value: blueNoiseTexture };

	pathTracingUniforms.uCameraMatrix = { type: "m4", value: new THREE.Matrix4() };

	pathTracingUniforms.uResolution = { type: "v2", value: new THREE.Vector2() };
	pathTracingUniforms.uRandomVec2 = { type: "v2", value: new THREE.Vector2() };

	pathTracingUniforms.uEPS_intersect = { type: "f", value: EPS_intersect };
	pathTracingUniforms.uTime = { type: "f", value: 0.0 };
	pathTracingUniforms.uSampleCounter = { type: "f", value: 0.0 }; //0.0
	pathTracingUniforms.uPreviousSampleCount = { type: "f", value: 1.0 };
	pathTracingUniforms.uFrameCounter = { type: "f", value: 1.0 }; //1.0
	pathTracingUniforms.uULen = { type: "f", value: 1.0 };
	pathTracingUniforms.uVLen = { type: "f", value: 1.0 };
	pathTracingUniforms.uApertureSize = { type: "f", value: apertureSize };
	pathTracingUniforms.uFocusDistance = { type: "f", value: focusDistance };

	pathTracingUniforms.uCameraIsMoving = { type: "b1", value: false };
	pathTracingUniforms.uUseOrthographicCamera = { type: "b1", value: false };


	const pathTracingDefines = {
		//NUMBER_OF_TRIANGLES: total_number_of_triangles
	};

	let pathTracingVertexShader
	var pathTracingMesh = null;
	// load vertex and fragment shader files that are used in the pathTracing material, mesh and scene
	fileLoader.load('shaders/common_PathTracing_Vertex.glsl', function (vertexShaderText)
	{
		pathTracingVertexShader = vertexShaderText;

		fileLoader.load('shaders/MainShader.glsl', function (fragmentShaderText)
		{

			const pathTracingFragmentShader = fragmentShaderText;

			const pathTracingMaterial = new THREE.ShaderMaterial({
				uniforms: pathTracingUniforms,
				// uniformsGroups: pathTracingUniformsGroups,
				defines: pathTracingDefines,
				vertexShader: pathTracingVertexShader,
				fragmentShader: pathTracingFragmentShader,
				depthTest: false,
				depthWrite: false
			});

			pathTracingMesh = new THREE.Mesh(pathTracingGeometry, pathTracingMaterial);
			pathTracingScene.add(pathTracingMesh);

			// the following keeps the large scene ShaderMaterial quad right in front 
			//   of the camera at all times. This is necessary because without it, the scene 
			//   quad will fall out of view and get clipped when the camera rotates past 180 degrees.

		});
	});


	// this full-screen quad mesh copies the image output of the pathtracing shader and feeds it back in to that shader as a 'previousTexture'
	const screenCopyGeometry = new THREE.PlaneGeometry(2, 2);

	const screenCopyUniforms = {
		tPathTracedImageTexture: { type: "t", value: pathTracingRenderTarget.texture }
	};

	fileLoader.load('shaders/ScreenCopy_Fragment.glsl', function (shaderText)
	{

		const screenCopyFragmentShader = shaderText;

		const screenCopyMaterial = new THREE.ShaderMaterial({
			uniforms: screenCopyUniforms,
			vertexShader: pathTracingVertexShader,
			fragmentShader: screenCopyFragmentShader,
			depthWrite: false,
			depthTest: false
		});

		const screenCopyMesh = new THREE.Mesh(screenCopyGeometry, screenCopyMaterial);
		screenCopyScene.add(screenCopyMesh);
	});


	// this full-screen quad mesh takes the image output of the path tracing shader (which is a continuous blend of the previous frame and current frame),
	// and applies gamma correction (which brightens the entire image), and then displays the final accumulated rendering to the screen
	const screenOutputGeometry = new THREE.PlaneGeometry(2, 2);

	const screenOutputUniforms = {
		tPathTracedImageTexture: { type: "t", value: pathTracingRenderTarget.texture },
		uSampleCounter: { type: "f", value: 0.0 },
		uOneOverSampleCounter: { type: "f", value: 0.0 },
		uPixelEdgeSharpness: { type: "f", value: pixelEdgeSharpness },
		uEdgeSharpenSpeed: { type: "f", value: edgeSharpenSpeed },
		uFilterDecaySpeed: { type: "f", value: filterDecaySpeed },
		uSceneIsDynamic: { type: "b1", value: sceneIsDynamic },
		uUseToneMapping: { type: "b1", value: useToneMapping }
	};

	fileLoader.load('shaders/ScreenOutput_Fragment.glsl', function (shaderText)
	{

		const screenOutputFragmentShader = shaderText;

		const screenOutputMaterial = new THREE.ShaderMaterial({
			uniforms: screenOutputUniforms,
			vertexShader: pathTracingVertexShader,
			fragmentShader: screenOutputFragmentShader,
			depthWrite: false,
			depthTest: false
		});

		const screenOutputMesh = new THREE.Mesh(screenOutputGeometry, screenOutputMaterial);
		screenOutputScene.add(screenOutputMesh);
	});


	// this 'jumpstarts' the initial dimensions and parameters for the window and renderer
	onWindowResize();

	renderer.toneMappingExposure =  1.0


	var sunAngle = Math.PI / 2.5
	var sunDirection = new THREE.Vector3();
	sunDirection.set(Math.cos(sunAngle) * 1.2, Math.sin(sunAngle), -Math.cos(sunAngle) * 3.0);
	sunDirection.normalize();
	pathTracingUniforms.uSunDirection.value.copy(sunDirection);

	pathTracingUniforms.uSunLightIntensity.value = 2.0

	var sunColor = [1.0, 0.98, 0.92]
	pathTracingUniforms.uSunColor.value.setRGB(sunColor[0], sunColor[1], sunColor[2]);
	// cameraIsMoving = true;


	function render()
	{
		var elapsedTime = clock.getElapsedTime() % 1000;

		if (windowIsBeingResized)
		{
			cameraIsMoving = true;
			windowIsBeingResized = false;
		}

		// now update uniforms that are common to all scenes
		if (!cameraIsMoving)
		{
			if (sceneIsDynamic)
				sampleCounter = 1.0; // reset for continuous updating of image
			else sampleCounter += 1.0; // for progressive refinement of image

			frameCounter += 1.0;

			cameraRecentlyMoving = false;
		}

		if (cameraIsMoving)
		{
			frameCounter += 1.0;

			if (!cameraRecentlyMoving)
			{
				// record current sampleCounter before it gets set to 1.0 below
				pathTracingUniforms.uPreviousSampleCount.value = sampleCounter;
				frameCounter = 1.0;
				cameraRecentlyMoving = true;
			}

			sampleCounter = 1.0;
		}

		pathTracingUniforms.uTime.value = elapsedTime;
		pathTracingUniforms.uCameraIsMoving.value = cameraIsMoving;
		pathTracingUniforms.uSampleCounter.value = sampleCounter;
		pathTracingUniforms.uFrameCounter.value = frameCounter;
		pathTracingUniforms.uRandomVec2.value.set(Math.random(), Math.random());

		// CAMERA
		worldCamera.updateMatrixWorld(true);
		pathTracingUniforms.uCameraMatrix.value.copy(worldCamera.matrixWorld);

		screenOutputUniforms.uSampleCounter.value = sampleCounter;
		// PROGRESSIVE SAMPLE WEIGHT (reduces intensity of each successive animation frame's image)
		screenOutputUniforms.uOneOverSampleCounter.value = 1.0 / sampleCounter;


		// RENDERING in 3 steps

		// STEP 1
		// Perform PathTracing and Render(save) into pathTracingRenderTarget, a full-screen texture.
		// Read previous screenCopyRenderTarget(via texelFetch inside fragment shader) to use as a new starting point to blend with
		renderer.setRenderTarget(pathTracingRenderTarget);
		renderer.render(pathTracingScene, worldCamera);

		// STEP 2
		// Render(copy) the pathTracingScene output(pathTracingRenderTarget above) into screenCopyRenderTarget.
		// This will be used as a new starting point for Step 1 above (essentially creating ping-pong buffers)
		renderer.setRenderTarget(screenCopyRenderTarget);
		renderer.render(screenCopyScene, quadCamera);

		// STEP 3
		// Render full screen quad with generated pathTracingRenderTarget in STEP 1 above.
		// After applying tonemapping and gamma-correction to the image, it will be shown on the screen as the final accumulated output
		renderer.setRenderTarget(null);
		renderer.render(screenOutputScene, quadCamera);


		cameraIsMoving = false;
	} // end function render()

	function onWindowResize()
	{

		windowIsBeingResized = true;

		// the following change to document.body.clientWidth and Height works better for mobile, especially iOS
		// suggestion from Github user q750831855  - Thank you!
		var SCREEN_WIDTH = canvas.clientWidth; //window.innerWidth; 
		var SCREEN_HEIGHT = canvas.clientHeight; //window.innerHeight;


		renderer.setPixelRatio(pixelRatio);
		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

		var fontAspect = (SCREEN_WIDTH / 175) * (SCREEN_HEIGHT / 200);
		if (fontAspect > 25) fontAspect = 25;
		if (fontAspect < 4) fontAspect = 4;
		fontAspect *= 2;

		pathTracingUniforms.uResolution.value.x = context.drawingBufferWidth;
		pathTracingUniforms.uResolution.value.y = context.drawingBufferHeight;

		pathTracingRenderTarget.setSize(context.drawingBufferWidth, context.drawingBufferHeight);
		screenCopyRenderTarget.setSize(context.drawingBufferWidth, context.drawingBufferHeight);

		worldCamera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
		// the following is normally used with traditional rasterized rendering, but it is not needed for our fragment shader raytraced rendering 
		///worldCamera.updateProjectionMatrix();

		// the following scales all scene objects by the worldCamera's field of view,
		// taking into account the screen aspect ratio and multiplying the uniform uULen,
		// the x-coordinate, by this ratio
		fovScale = worldCamera.fov * 0.5 * (Math.PI / 180.0);
		pathTracingUniforms.uVLen.value = Math.tan(fovScale);
		pathTracingUniforms.uULen.value = pathTracingUniforms.uVLen.value * worldCamera.aspect;

	}
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('orientationchange', onWindowResize, false);

	function setMovingCamera()
	{
		cameraIsMoving = true;
	}
	function removeCamera()
	{
		pathTracingScene.remove(worldCamera);
		worldCamera.remove(pathTracingMesh);
	}
	function addCamera()
	{
		pathTracingScene.add(worldCamera);
		worldCamera.add(pathTracingMesh);
		cameraIsMoving = true;
	}
	return {render,setMovingCamera,addCamera,removeCamera}

} // end function init()

