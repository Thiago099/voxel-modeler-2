import * as THREE from 'three';
import { BVH_Build_Iterative } from './BVH_Acc_Structure_Iterative_SAH_Builder';



export {CreateRaytraceScene}




async function CreateRaytraceScene(skybox=null)
{

	var result = {add,Build}
	if(!skybox)
	{
		const canvas = document.createElement('canvas');
		canvas.width = 1;
		canvas.height = 1;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = 'rgb(80, 128, 255)';
		ctx.fillRect(0, 0, 1, 1);
		skybox = new THREE.CanvasTexture(canvas);
	}
	skybox.encoding = THREE.LinearEncoding;
	skybox.minFilter = THREE.NearestFilter;
	skybox.magFilter = THREE.NearestFilter;
	skybox.flipY = true;

	var _geometry = null;
	var _textures = null;
	async function Build()
	{
		const scene_data = await buildGeometry(_geometry??[],_textures??[]);
		initSceneData(scene_data, skybox, result.pathTracingUniforms)
	}

	

	function add(...data)
	{
		_geometry = data.map(x=>x.geometry);
		_textures = data.map(x=>[x.albedo,x.pbr,x.emission]);
		Build();
	}


	return result
}

// called automatically from within initTHREEjs() function (located in InitCommon.js file)
function initSceneData({ triangleDataTexture, aabbDataTexture,uniqueMaterialTextures},hdrTexture, pathTracingUniforms) {
	let skyLightIntensity = 50.0, 
	sunLightIntensity = 2.0, 
	sunColor = [1.0, 0.98, 0.92];
	// scene/demo-specific uniforms go here
	pathTracingUniforms.tTriangleTexture = { value: triangleDataTexture };
	pathTracingUniforms.tAABBTexture = { value: aabbDataTexture };
	pathTracingUniforms.tHDRTexture = { value: hdrTexture };
	pathTracingUniforms.tAlbedoTextures = { value: uniqueMaterialTextures };
	pathTracingUniforms.uSkyLightIntensity = { value: skyLightIntensity };
	pathTracingUniforms.uSunLightIntensity = { value: sunLightIntensity };
	pathTracingUniforms.uSunColor = { value: new THREE.Color().fromArray(sunColor.map(x => x)) };
	pathTracingUniforms.uSunDirection = { value: new THREE.Vector3() };

} // end function initSceneData()


function mergeGeometry(geometries)
{
	const mergedGeometry = new THREE.BufferGeometry();

	var material_start_offset = new Uint32Array(geometries.length);
	let totalVertices = 0;
	let totalFaces = 0;
	let totalUvs = 0;
	for (let i = 0; i < geometries.length; i++)
	{
		totalVertices += geometries[i].attributes.position.array.length;
		totalFaces += geometries[i].index.array.length;
		totalUvs += geometries[i].attributes.uv.array.length;
	}
	const positionArray = new Float32Array(totalVertices);
	const normalArray = new Float32Array(totalVertices);
	const uvArray = new Float32Array(totalUvs);
	const indexArray = new Uint32Array(totalFaces);
	let vertexOffset = 0;
	let faceOffset = 0;
	let uvOffset = 0;
	let triangleOffset = 0;
	for (let i = 0; i < geometries.length; i++)
	{
		const geometry = geometries[i];
		positionArray.set(geometry.attributes.position.array, vertexOffset);
		normalArray.set(geometry.attributes.normal.array, vertexOffset);
		uvArray.set(geometry.raytrace_uvs, uvOffset);
		indexArray.set(geometry.index.array, faceOffset);
		for (let j = 0; j < geometry.index.array.length; j++)
			indexArray[faceOffset + j] += vertexOffset / 3;
		var currentLength = geometry.index.array.length / 3; 
		triangleOffset += currentLength;
		material_start_offset[i] =	triangleOffset;
		vertexOffset += geometry.attributes.position.array.length;
		faceOffset += geometry.index.array.length;
		uvOffset += geometry.raytrace_uvs.length;
	}
	
	mergedGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
	mergedGeometry.setAttribute('normal', new THREE.BufferAttribute(normalArray, 3));
	mergedGeometry.setAttribute('uv', new THREE.BufferAttribute(uvArray, 2));
	mergedGeometry.setIndex(new THREE.BufferAttribute(indexArray, 1));
	return {mergedGeometry,material_start_offset};
}




async function buildGeometry(geometry,textures)
{


	let modelPositionOffset = new THREE.Vector3(0,0,0);

	//move up


	const {mergedGeometry,material_start_offset} = mergeGeometry(geometry);

		
	// Merge geometry from all models into one new mesh
	let modelMesh = new THREE.Mesh(mergedGeometry);
	if (modelMesh.geometry.index)
		modelMesh.geometry = modelMesh.geometry.toNonIndexed(); // why do we need NonIndexed geometry?

	// divide by 9 because of nonIndexed geometry (each triangle has 3 floats with each float constisting of 3 components)
	let total_number_of_triangles = modelMesh.geometry.attributes.position.array.length / 9;

	const dict = {
		"albedo": 0,
		"pbr": 1,
		"emissive": 2,
	}

	function joinTextures(type)
	{

		var t = textures.map(x=>x[dict[type]]);
		var width = 0
		var height = 0
		var item_width = [0]
		var item_height = [0]
		for(var texture of t)
		{
			if(texture == null)
			{
				item_width.push(0);
				item_height.push(0);
				continue;
			}
			width = Math.max(width,texture.canvas.width-1);
			height += texture.canvas.height;
			item_width.push(texture.canvas.width);
			item_height.push(texture.canvas.height);
		}
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;
		var y = 0;

		for(var texture of t)
		{
			if(texture == null)
			{
				continue
			}
			ctx.drawImage(texture.canvas,0,y);
			y+= texture.canvas.height;
		}
	

		texture = new THREE.CanvasTexture(canvas);
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.NearestFilter;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;

		//download the canvas
		// var link = document.createElement('a');
		// link.download = 'texture.png';
		// link.href = canvas.toDataURL("image/png")
		// link.click();


		return {texture,canvas,max_width:width,max_height:height,item_width,item_height};
	}
	const pbr = joinTextures('pbr');
	const emissive = joinTextures('emissive');
	const albedo = joinTextures('albedo');
	
	// albedo.canvas.style['image-rendering'] = 'pixelated';
	// albedo.canvas.style.width = '500px';
	// var cc = document.getElementById('canvas-container');
	// cc.innerHTML = '';
	// cc.appendChild(albedo.canvas);

	const pathTracingMaterialList = [];


	// for(var texture of textures)
	// {
	// 	if(texture[0] == null) continue;
	// 	var material = {};

	// 	material.UV_Offset_Y = albedo.uuid_y[texture[0].uuid];

		

	// 	// material.emissiveTextureID = -1;
	// 	// material.pbrTextureID = -1;
	// 	// for(var unique_texture in uniqueMaterialTextures)
	// 	// {
	// 	// 	if (texture[0].uuid == uniqueMaterialTextures[unique_texture].uuid)
	// 	// 	material.albedoTextureID = Number(unique_texture);
	// 	// }
		
	// 	// if (texture.length > 1 && texture[1]!=null)
	// 	// {
	// 	// 	for(var unique_texture in uniqueMaterialTextures)
	// 	// 	{
	// 	// 		if (texture[1].uuid == uniqueMaterialTextures[unique_texture].uuid)
	// 	// 		material.pbrTextureID =  Number(unique_texture);
	// 	// 	}
	// 	// }
	// 	// if (texture.length > 2&& texture[2]!=null)
	// 	// {
	// 	// 	for(var unique_texture in uniqueMaterialTextures)
	// 	// 	{
	// 	// 		if (texture[2].uuid == uniqueMaterialTextures[unique_texture].uuid)
	// 	// 		material.emissiveTextureID =  Number(unique_texture);
	// 	// 	}
	// 	// }
	// 	pathTracingMaterialList.push(material);
	// }


	// modelMesh.geometry.rotateY(Math.PI*2);

	let totalWork = new Uint32Array(total_number_of_triangles);

	// Initialize triangle and aabb arrays where 2048 = width and height of texture and 4 are the r, g, b and a components
	let triangle_array = new Float32Array(2048 * 2048 * 4);
	const aabb_array = new Float32Array(2048 * 2048 * 4);
	const modelScale = 1.0;


	var triangle_b_box_min = new THREE.Vector3();
	var triangle_b_box_max = new THREE.Vector3();
	var triangle_b_box_centroid = new THREE.Vector3();

	var vpa = new Float32Array(modelMesh.geometry.attributes.position.array);
	if (modelMesh.geometry.attributes.normal === undefined)
		modelMesh.geometry.computeVertexNormals();
	var vna = new Float32Array(modelMesh.geometry.attributes.normal.array);

	var modelHasUVs = false;
	if (modelMesh.geometry.attributes.uv !== undefined)
	{
		var vta = new Float32Array(modelMesh.geometry.attributes.uv.array);
		modelHasUVs = true;
	}

	var cctx = albedo.canvas.getContext('2d');
	//rectangle
	cctx.fillStyle = "rgba(255, 0, 0, 0.5)";

	
	var uvs = []
	var y = 0;
	var materialNumber = 0
	for (let i = 0; i < total_number_of_triangles; i++)
	{
		var i6 = i * 6;
		if (i >= material_start_offset[materialNumber])
		{
			materialNumber++;
			y+=albedo.item_height[materialNumber];
			// y += height+1;
			// height = 0;
		}

		const vt0 = new THREE.Vector2();
		const vt1 = new THREE.Vector2();
		const vt2 = new THREE.Vector2();
		if (modelHasUVs)
		{
			vt0.set(vta[i6 + 0], vta[i6 + 1]);
			vt1.set(vta[i6 + 2], vta[i6 + 3]);
			vt2.set(vta[i6 + 4], vta[i6 + 5]);

		} else
		{
			vt0.set(-1, -1);
			vt1.set(-1, -1);
			vt2.set(-1, -1);
		}
		vt0.y += y;
		vt1.y += y;
		vt2.y += y;

		// cctx.beginPath();
		// cctx.moveTo(vt0.x, vt0.y);
		// cctx.lineTo(vt1.x, vt1.y);
		// cctx.lineTo(vt2.x, vt2.y);
		// cctx.closePath();
		// cctx.fill();

		uvs.push([vt0,vt1,vt2]);
	}
	// console.log("==================================");
	// console.log(full_width);
	//draw a rectangle from 0 to full width and height
	// cctx.fillRect(0, 0, full_width, full_height);
	for(var i = 0; i < uvs.length; i++)
	{
		uvs[i][0].y = 1-(uvs[i][0].y / albedo.max_height);
		uvs[i][1].y = 1-(uvs[i][1].y / albedo.max_height);
		uvs[i][2].y = 1-(uvs[i][2].y / albedo.max_height);
		uvs[i][0].x = uvs[i][0].x / albedo.max_width;
		uvs[i][1].x = uvs[i][1].x / albedo.max_width;
		uvs[i][2].x = uvs[i][2].x / albedo.max_width;
	}

		


	for (let i = 0; i < total_number_of_triangles; i++)
	{

		


		var i6 = i * 6;
		var i9 = i * 9;
		var i32 = i * 32;

		triangle_b_box_min.set(Infinity, Infinity, Infinity);
		triangle_b_box_max.set(-Infinity, -Infinity, -Infinity);

		// let vt0 = new THREE.Vector3();
		// let vt1 = new THREE.Vector3();
		// let vt2 = new THREE.Vector3();
		const [vt0,vt1,vt2] = uvs[i]
		// record vertex texture coordinates (UVs)


		// record vertex normals
		let vn0 = new THREE.Vector3(vna[i9 + 0], vna[i9 + 1], vna[i9 + 2]).normalize();
		let vn1 = new THREE.Vector3(vna[i9 + 3], vna[i9 + 4], vna[i9 + 5]).normalize();
		let vn2 = new THREE.Vector3(vna[i9 + 6], vna[i9 + 7], vna[i9 + 8]).normalize();

		// record vertex positions
		let vp0 = new THREE.Vector3(vpa[i9 + 0], vpa[i9 + 1], vpa[i9 + 2]);
		let vp1 = new THREE.Vector3(vpa[i9 + 3], vpa[i9 + 4], vpa[i9 + 5]);
		let vp2 = new THREE.Vector3(vpa[i9 + 6], vpa[i9 + 7], vpa[i9 + 8]);

		vp0.multiplyScalar(modelScale);
		vp1.multiplyScalar(modelScale);
		vp2.multiplyScalar(modelScale);

		vp0.add(modelPositionOffset);
		vp1.add(modelPositionOffset);
		vp2.add(modelPositionOffset);

		//slot 0
		triangle_array[i32 + 0] = vp0.x; // r or x
		triangle_array[i32 + 1] = vp0.y; // g or y
		triangle_array[i32 + 2] = vp0.z; // b or z
		triangle_array[i32 + 3] = vp1.x; // a or w

		//slot 1
		triangle_array[i32 + 4] = vp1.y; // r or x
		triangle_array[i32 + 5] = vp1.z; // g or y
		triangle_array[i32 + 6] = vp2.x; // b or z
		triangle_array[i32 + 7] = vp2.y; // a or w

		//slot 2
		triangle_array[i32 + 8] = vp2.z; // r or x
		triangle_array[i32 + 9] = vn0.x; // g or y
		triangle_array[i32 + 10] = vn0.y; // b or z
		triangle_array[i32 + 11] = vn0.z; // a or w

		//slot 3
		triangle_array[i32 + 12] = vn1.x; // r or x
		triangle_array[i32 + 13] = vn1.y; // g or y
		triangle_array[i32 + 14] = vn1.z; // b or z
		triangle_array[i32 + 15] = vn2.x; // a or w

		//slot 4
		triangle_array[i32 + 16] = vn2.y; // r or x
		triangle_array[i32 + 17] = vn2.z; // g or y
		triangle_array[i32 + 18] = vt0.x; // b or z
		triangle_array[i32 + 19] = vt0.y; // a or w

		//slot 5
		triangle_array[i32 + 20] = vt1.x; // r or x
		triangle_array[i32 + 21] = vt1.y; // g or y
		triangle_array[i32 + 22] = vt2.x; // b or z
		triangle_array[i32 + 23] = vt2.y; // a or w

		// the remaining slots are used for PBR material properties

		//slot 6
		triangle_array[i32 + 24] = 0//pathTracingMaterialList[materialNumber].type; // r or x
		triangle_array[i32 + 25] = 0//pathTracingMaterialList[materialNumber].color.r; // g or y
		triangle_array[i32 + 26] = 0//pathTracingMaterialList[materialNumber].color.g; // b or z
		triangle_array[i32 + 27] = 0//pathTracingMaterialList[materialNumber].color.b; // a or w

		//slot 7
		triangle_array[i32 + 28] = 0//pathTracingMaterialList[materialNumber].albedoTextureID; // r or x
		triangle_array[i32 + 29] = 1//pathTracingMaterialList[materialNumber].opacity; // g or y
		triangle_array[i32 + 30] = 1//pathTracingMaterialList[materialNumber].pbrTextureID;; // b or z
		triangle_array[i32 + 31] = 2//pathTracingMaterialList[materialNumber].emissiveTextureID;; // a or w

		triangle_b_box_min.copy(triangle_b_box_min.min(vp0));
		triangle_b_box_max.copy(triangle_b_box_max.max(vp0));
		triangle_b_box_min.copy(triangle_b_box_min.min(vp1));
		triangle_b_box_max.copy(triangle_b_box_max.max(vp1));
		triangle_b_box_min.copy(triangle_b_box_min.min(vp2));
		triangle_b_box_max.copy(triangle_b_box_max.max(vp2));

		triangle_b_box_centroid.copy(triangle_b_box_min).add(triangle_b_box_max).multiplyScalar(0.5);
		//triangle_b_box_centroid.copy(vp0).add(vp1).add(vp2).multiplyScalar(0.3333);

		aabb_array[i9 + 0] = triangle_b_box_min.x;
		aabb_array[i9 + 1] = triangle_b_box_min.y;
		aabb_array[i9 + 2] = triangle_b_box_min.z;
		aabb_array[i9 + 3] = triangle_b_box_max.x;
		aabb_array[i9 + 4] = triangle_b_box_max.y;
		aabb_array[i9 + 5] = triangle_b_box_max.z;
		aabb_array[i9 + 6] = triangle_b_box_centroid.x;
		aabb_array[i9 + 7] = triangle_b_box_centroid.y;
		aabb_array[i9 + 8] = triangle_b_box_centroid.z;

		totalWork[i] = i;

	} // end for (let i = 0; i < total_number_of_triangles; i++)


	BVH_Build_Iterative(totalWork, aabb_array);


	const triangleDataTexture = new THREE.DataTexture(triangle_array,
		2048,
		2048,
		THREE.RGBAFormat,
		THREE.FloatType,
		THREE.Texture.DEFAULT_MAPPING,
		THREE.ClampToEdgeWrapping,
		THREE.ClampToEdgeWrapping,
		THREE.NearestFilter,
		THREE.NearestFilter,
		1,
		THREE.LinearEncoding
	);

	triangleDataTexture.flipY = false;
	triangleDataTexture.generateMipmaps = false;
	triangleDataTexture.needsUpdate = true;

	const aabbDataTexture = new THREE.DataTexture(aabb_array,
		2048,
		2048,
		THREE.RGBAFormat,
		THREE.FloatType,
		THREE.Texture.DEFAULT_MAPPING,
		THREE.ClampToEdgeWrapping,
		THREE.ClampToEdgeWrapping,
		THREE.NearestFilter,
		THREE.NearestFilter,
		1,
		THREE.LinearEncoding
	);

	aabbDataTexture.flipY = false;
	aabbDataTexture.generateMipmaps = false;
	aabbDataTexture.needsUpdate = true;
	return { triangleDataTexture, aabbDataTexture,uniqueMaterialTextures:[albedo.texture, pbr.texture, emissive.texture]}

} // end function buildGeometry(meshList, pathTracingMaterialList, triangleMaterialMarkers)











