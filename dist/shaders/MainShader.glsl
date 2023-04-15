precision highp float;
precision highp int;
precision highp sampler2D;

#include <pathtracing_uniforms_and_defines>
#include <pathtracing_bvhTriangle_intersect>
#include <pathtracing_boundingbox_intersect>
uniform mat4 uTorusInvMatrix;


uniform vec3 uSunDirection;
uniform sampler2D tTriangleTexture;
uniform sampler2D tAABBTexture;
uniform sampler2D tAlbedoTextures[8]; // 8 = max number of diffuse albedo textures per model
uniform sampler2D tHDRTexture;
uniform float uSkyLightIntensity;
uniform float uSunLightIntensity;
uniform vec3 uSunColor;

// (1 / 2048 texture width)
#define INV_TEXTURE_WIDTH 0.00048828125

// recorded intersection data:
vec3 metalicRoughness;
float hitOpacity;
int hitAlbedoTextureID;

vec2 stackLevels[28];



#define N_LIGHTS 3.0
#define N_SPHERES 6
#define N_PLANES 1
#define N_DISKS 1
#define N_TRIANGLES 1
#define N_QUADS 1
#define N_BOXES 2
#define N_ELLIPSOIDS 1
#define N_PARABOLOIDS 1
#define N_OPENCYLINDERS 1
#define N_CAPPEDCYLINDERS 1
#define N_CONES 1
#define N_CAPSULES 1
#define N_TORII 1

#define DIFF_CORNER 10


#define INV_TEXTURE_WIDTH 0.00048828125


//-----------------------------------------------------------------------

vec3 rayOrigin, rayDirection;
// recorded intersection data:
vec3 hitNormal, hitEmission, hitColor;
vec2 hitUV;
float hitObjectID;
int hitType = -100;

struct Sphere { float radius; vec3 position; vec3 emission; vec3 color; int type; };
struct Ellipsoid { vec3 radii; vec3 position; vec3 emission; vec3 color; int type; };
struct Paraboloid { float rad; float height; vec3 pos; vec3 emission; vec3 color; int type; };
struct OpenCylinder { float radius; float height; vec3 position; vec3 emission; vec3 color; int type; };
struct CappedCylinder { float radius; vec3 cap1pos; vec3 cap2pos; vec3 emission; vec3 color; int type; };
struct Cone { vec3 pos0; float radius0; vec3 pos1; float radius1; vec3 emission; vec3 color; int type; };
struct Capsule { vec3 pos0; float radius0; vec3 pos1; float radius1; vec3 emission; vec3 color; int type; };
struct UnitTorus { float parameterK; vec3 emission; vec3 color; int type; };
struct Box { vec3 minCorner; vec3 maxCorner; vec3 emission; vec3 color; int type; };

Sphere spheres[N_SPHERES];
Ellipsoid ellipsoids[N_ELLIPSOIDS];
Paraboloid paraboloids[N_PARABOLOIDS];
OpenCylinder openCylinders[N_OPENCYLINDERS];
CappedCylinder cappedCylinders[N_CAPPEDCYLINDERS];
Cone cones[N_CONES];
Capsule capsules[N_CAPSULES];
UnitTorus torii[N_TORII];
Box boxes[N_BOXES];


#include <pathtracing_random_functions>

#include <pathtracing_calc_fresnel_reflectance>

#include <pathtracing_sphere_intersect>

#include <pathtracing_unit_bounding_sphere_intersect>

#include <pathtracing_ellipsoid_intersect>

#include <pathtracing_opencylinder_intersect>

#include <pathtracing_cappedcylinder_intersect>

#include <pathtracing_cone_intersect>

#include <pathtracing_capsule_intersect>

#include <pathtracing_paraboloid_intersect>

#include <pathtracing_unit_torus_intersect>

#include <pathtracing_box_intersect>

#include <pathtracing_sample_sphere_light>
// ----------------------------------------------------------------------------------------
vec3 Get_HDR_Color(vec3 rayDirection)
{
	vec2 sampleUV;
	sampleUV.x = atan(rayDirection.z, rayDirection.x) * ONE_OVER_TWO_PI + 0.5;
	sampleUV.y = asin(clamp(rayDirection.y, -1.0, 1.0)) * ONE_OVER_PI + 0.5;
	
	vec3 texColor = texture( tHDRTexture, sampleUV ).rgb;
	
	// tone mapping
	// texColor = ACESFilmicToneMapping(texColor.rgb);

	return texColor;
}

//-------------------------------------------------------------------------------------------------------------------

void GetBoxNodeData(const in float i, inout vec4 boxNodeData0, inout vec4 boxNodeData1)
{
	// each bounding box's data is encoded in 2 rgba(or xyzw) texture slots 
	float ix2 = i * 2.0;
	// (ix2 + 0.0) corresponds to .x = idTriangle,  .y = aabbMin.x, .z = aabbMin.y, .w = aabbMin.z 
	// (ix2 + 1.0) corresponds to .x = idRightChild .y = aabbMax.x, .z = aabbMax.y, .w = aabbMax.z 

	ivec2 uv0 = ivec2( mod(ix2 + 0.0, 2048.0), (ix2 + 0.0) * INV_TEXTURE_WIDTH ); // data0
	ivec2 uv1 = ivec2( mod(ix2 + 1.0, 2048.0), (ix2 + 1.0) * INV_TEXTURE_WIDTH ); // data1
	
	boxNodeData0 = texelFetch(tAABBTexture, uv0, 0);
	boxNodeData1 = texelFetch(tAABBTexture, uv1, 0);
}

float fmod(float x, float y) {
    return x - y * floor(x / y);
}

//-------------------------------------------------------------------------------------------------------------------
float SceneIntersect( out int finalIsRayExiting )
//-------------------------------------------------------------------------------------------------------------------
{


	vec4 currentBoxNodeData0, nodeAData0, nodeBData0, tmpNodeData0;
	vec4 currentBoxNodeData1, nodeAData1, nodeBData1, tmpNodeData1;
	
	vec4 vd0, vd1, vd2, vd3, vd4, vd5, vd6, vd7;

	vec3 inverseDir = 1.0 / rayDirection;
	vec3 normal;

	vec2 currentStackData, stackDataA, stackDataB, tmpStackData;
	ivec2 uv0, uv1, uv2, uv3, uv4, uv5, uv6, uv7;

        float stackptr = 0.0;
	float id = 0.0;
	float tu, tv;
	float triangleID = 0.0;
	float triangleU = 0.0;
	float triangleV = 0.0;
	float triangleW = 0.0;

	
	hitObjectID = -INFINITY;

	int skip = FALSE;
	int triangleLookupNeeded = FALSE;





	vec3 rObjOrigin, rObjDirection;
	vec3 n;
	float d, dt;
	float t = INFINITY;
	int isRayExiting = FALSE;
	int insideSphere = FALSE;
	int objectCount = 0;
	
	hitObjectID = -INFINITY;
	

	// for (int i = 0; i < N_SPHERES; i++)
	// {
	// 	d = SphereIntersect( spheres[i].radius, spheres[i].position, rayOrigin, rayDirection );
	// 	if (d < t)
	// 	{
	// 		t = d;
	// 		hitNormal = (rayOrigin + rayDirection * t) - spheres[i].position;
	// 		hitEmission = spheres[i].emission;
	// 		hitColor = spheres[i].color;
	// 		hitType = spheres[i].type;
	// 		hitObjectID = float(objectCount);
	// 	}
	// 	objectCount++;
	// }
	
	// for (int i = 0; i < N_BOXES; i++)
    //     {
	// 	d = BoxIntersect( boxes[i].minCorner, boxes[i].maxCorner, rayOrigin, rayDirection, n, isRayExiting );
	// 	if (d < t)
	// 	{
	// 		t = d;
	// 		hitNormal = n;
	// 		hitEmission = boxes[i].emission;
	// 		hitColor = boxes[i].color;
	// 		hitType = boxes[i].type;
	// 		finalIsRayExiting = isRayExiting;
	// 		hitObjectID = float(objectCount);
	// 	}
	// 	objectCount++;
    //     }
	
	// d = EllipsoidIntersect( ellipsoids[0].radii, ellipsoids[0].position, rayOrigin, rayDirection );
	// if (d < t)
	// {
	// 	t = d;
	// 	hitNormal = ((rayOrigin + rayDirection * t) - 
	// 		ellipsoids[0].position) / (ellipsoids[0].radii * ellipsoids[0].radii);
	// 	hitEmission = ellipsoids[0].emission;
	// 	hitColor = ellipsoids[0].color;
	// 	hitType = ellipsoids[0].type;
	// 	hitObjectID = float(objectCount);
	// }
	// objectCount++;
	
	// d = ParaboloidIntersect( paraboloids[0].rad, paraboloids[0].height, paraboloids[0].pos, rayOrigin, rayDirection, n );
	// if (d < t)
	// {
	// 	t = d;
	// 	hitNormal = n;
	// 	hitEmission = paraboloids[0].emission;
	// 	hitColor = paraboloids[0].color;
	// 	hitType = paraboloids[0].type;
	// 	hitObjectID = float(objectCount);
	// }
	// objectCount++;
	
	// d = OpenCylinderIntersect( openCylinders[0].position, openCylinders[0].position + vec3(0,30,30), openCylinders[0].radius, rayOrigin, rayDirection, n );
	// if (d < t)
	// {
	// 	t = d;
	// 	hitNormal = n;
	// 	hitEmission = openCylinders[0].emission;
	// 	hitColor = openCylinders[0].color;
	// 	hitType = openCylinders[0].type;
	// 	hitObjectID = float(objectCount);
	// }
	// objectCount++;
        
	// d = CappedCylinderIntersect( cappedCylinders[0].cap1pos, cappedCylinders[0].cap2pos, cappedCylinders[0].radius, rayOrigin, rayDirection, n);
	// if (d < t)
	// {
	// 	t = d;
	// 	hitNormal = n;
	// 	hitEmission = cappedCylinders[0].emission;
	// 	hitColor = cappedCylinders[0].color;
	// 	hitType = cappedCylinders[0].type;
	// 	hitObjectID = float(objectCount);
	// }
	// objectCount++;
        
	// d = ConeIntersect( cones[0].pos0, cones[0].radius0, cones[0].pos1, cones[0].radius1, rayOrigin, rayDirection, n );
	// if (d < t)
	// {
	// 	t = d;
	// 	hitNormal = n;
	// 	hitEmission = cones[0].emission;
	// 	hitColor = cones[0].color;
	// 	hitType = cones[0].type;
	// 	hitObjectID = float(objectCount);
	// }
	// objectCount++;
        
	// d = CapsuleIntersect( capsules[0].pos0, capsules[0].radius0, capsules[0].pos1, capsules[0].radius1, rayOrigin, rayDirection, n );
	// if (d < t)
	// {
	// 	t = d;
	// 	hitNormal = n;
	// 	hitEmission = capsules[0].emission;
	// 	hitColor = capsules[0].color;
	// 	hitType = capsules[0].type;
	// 	hitObjectID = float(objectCount);
	// }
	// objectCount++;
        
	// // transform ray into Torus's object space
	// rObjOrigin = vec3( uTorusInvMatrix * vec4(rayOrigin, 1.0) );
	// rObjDirection = vec3( uTorusInvMatrix * vec4(rayDirection, 0.0) );
	// // first check that the ray hits the bounding sphere around the torus
	// d = UnitBoundingSphereIntersect( rObjOrigin, rObjDirection, insideSphere );
	// if (d < INFINITY)
	// {	// if outside the sphere, move the ray up close to the Torus, for numerical stability
	// 	d = insideSphere == TRUE ? 0.0 : d;
	// 	rObjOrigin += rObjDirection * d;

	// 	dt = d + UnitTorusIntersect( rObjOrigin, rObjDirection, torii[0].parameterK, n );
	// 	if (dt < t)
	// 	{
	// 		t = dt;
	// 		hitNormal = transpose(mat3(uTorusInvMatrix)) * n;
	// 		hitEmission = torii[0].emission;
	// 		hitColor = torii[0].color;
	// 		hitType = torii[0].type;
	// 		hitObjectID = float(objectCount);
	// 	}
	// }
        

	GetBoxNodeData(stackptr, currentBoxNodeData0, currentBoxNodeData1);
	currentStackData = vec2(stackptr, BoundingBoxIntersect(currentBoxNodeData0.yzw, currentBoxNodeData1.yzw, rayOrigin, inverseDir));
	stackLevels[0] = currentStackData;
	skip = (currentStackData.y < t) ? TRUE : FALSE;

	int edge = FALSE;

	while (true)
        {
		if (skip == FALSE) 
                {
                        // decrease pointer by 1 (0.0 is root level, 27.0 is maximum depth)
                        if (--stackptr < 0.0) // went past the root level, terminate loop
                                break;

                        currentStackData = stackLevels[int(stackptr)];
			
			if (currentStackData.y >= t)
				continue;
			
			GetBoxNodeData(currentStackData.x, currentBoxNodeData0, currentBoxNodeData1);
                }
		skip = FALSE; // reset skip
		
		if (currentBoxNodeData0.x < 0.0) // // < 0.0 signifies an inner node 
		{
			GetBoxNodeData(currentStackData.x + 1.0, nodeAData0, nodeAData1);
			GetBoxNodeData(currentBoxNodeData1.x, nodeBData0, nodeBData1);
			stackDataA = vec2(currentStackData.x + 1.0, BoundingBoxIntersect(nodeAData0.yzw, nodeAData1.yzw, rayOrigin, inverseDir));
			stackDataB = vec2(currentBoxNodeData1.x, BoundingBoxIntersect(nodeBData0.yzw, nodeBData1.yzw, rayOrigin, inverseDir));
			
			// first sort the branch node data so that 'a' is the smallest
			if (stackDataB.y < stackDataA.y)
			{
				tmpStackData = stackDataB;
				stackDataB = stackDataA;
				stackDataA = tmpStackData;

				tmpNodeData0 = nodeBData0;   tmpNodeData1 = nodeBData1;
				nodeBData0   = nodeAData0;   nodeBData1   = nodeAData1;
				nodeAData0   = tmpNodeData0; nodeAData1   = tmpNodeData1;
			} // branch 'b' now has the larger rayT value of 'a' and 'b'

			if (stackDataB.y < t) // see if branch 'b' (the larger rayT) needs to be processed
			{
				currentStackData = stackDataB;
				currentBoxNodeData0 = nodeBData0;
				currentBoxNodeData1 = nodeBData1;
				skip = TRUE; // this will prevent the stackptr from decreasing by 1
			}
			if (stackDataA.y < t) // see if branch 'a' (the smaller rayT) needs to be processed 
			{
				if (skip == TRUE) // if larger branch 'b' needed to be processed also,
					stackLevels[int(stackptr++)] = stackDataB; // cue larger branch 'b' for future round
							// also, increase pointer by 1
				
				currentStackData = stackDataA;
				currentBoxNodeData0 = nodeAData0; 
				currentBoxNodeData1 = nodeAData1;
				skip = TRUE; // this will prevent the stackptr from decreasing by 1
			}

			continue;
		} // end if (currentBoxNodeData0.x < 0.0) // inner node


		// else this is a leaf

		// each triangle's data is encoded in 8 rgba(or xyzw) texture slots
		
		id = 8.0 * currentBoxNodeData0.x;

		uv0 = ivec2( mod(id + 0.0, 2048.0), (id + 0.0) * INV_TEXTURE_WIDTH );
		uv1 = ivec2( mod(id + 1.0, 2048.0), (id + 1.0) * INV_TEXTURE_WIDTH );
		uv2 = ivec2( mod(id + 2.0, 2048.0), (id + 2.0) * INV_TEXTURE_WIDTH );
		
		vd0 = texelFetch(tTriangleTexture, uv0, 0);
		vd1 = texelFetch(tTriangleTexture, uv1, 0);
		vd2 = texelFetch(tTriangleTexture, uv2, 0);

		d = BVH_TriangleIntersect( vec3(vd0.xyz), vec3(vd0.w, vd1.xy), vec3(vd1.zw, vd2.x), rayOrigin, rayDirection, tu, tv );

		if (d < t)
		{
			// float threshold = 0.005;

			// float threshold = 0.01;
			// if(fmod(id/8.0,2.0) == 0.0 )
			// {
			// 	if ((1.0 - tu - tv) < threshold || tv < threshold ) {//|| tu < threshold
			// 		edge = TRUE;
			// 		// discard;
			// 	}
			// }
			// else
			// {
			// 	if ((1.0 - tu - tv) < threshold || tu < threshold ) {//
			// 		edge = TRUE;
			// 		// discard;
			// 	}
			// }
			
			// else
			// {
				t = d;
				triangleID = id;
				triangleU = tu;
				triangleV = tv;
				triangleLookupNeeded = TRUE;
			// }

		}
	      
        } // end while (TRUE)

	vec4 texColor;

	if (triangleLookupNeeded == TRUE)
	{
		uv0 = ivec2( mod(triangleID + 0.0, 2048.0), floor((triangleID + 0.0) * INV_TEXTURE_WIDTH) );
		uv1 = ivec2( mod(triangleID + 1.0, 2048.0), floor((triangleID + 1.0) * INV_TEXTURE_WIDTH) );
		uv2 = ivec2( mod(triangleID + 2.0, 2048.0), floor((triangleID + 2.0) * INV_TEXTURE_WIDTH) );
		uv3 = ivec2( mod(triangleID + 3.0, 2048.0), floor((triangleID + 3.0) * INV_TEXTURE_WIDTH) );
		uv4 = ivec2( mod(triangleID + 4.0, 2048.0), floor((triangleID + 4.0) * INV_TEXTURE_WIDTH) );
		uv5 = ivec2( mod(triangleID + 5.0, 2048.0), floor((triangleID + 5.0) * INV_TEXTURE_WIDTH) );
		uv6 = ivec2( mod(triangleID + 6.0, 2048.0), floor((triangleID + 6.0) * INV_TEXTURE_WIDTH) );
		uv7 = ivec2( mod(triangleID + 7.0, 2048.0), floor((triangleID + 7.0) * INV_TEXTURE_WIDTH) );
		
		vd0 = texelFetch(tTriangleTexture, uv0, 0);
		vd1 = texelFetch(tTriangleTexture, uv1, 0);
		vd2 = texelFetch(tTriangleTexture, uv2, 0);
		vd3 = texelFetch(tTriangleTexture, uv3, 0);
		vd4 = texelFetch(tTriangleTexture, uv4, 0);
		vd5 = texelFetch(tTriangleTexture, uv5, 0);
		vd6 = texelFetch(tTriangleTexture, uv6, 0);
		vd7 = texelFetch(tTriangleTexture, uv7, 0);

		// face normal for flat-shaded polygon look
		//hitNormal = ( cross(vec3(vd0.w, vd1.xy) - vec3(vd0.xyz), vec3(vd1.zw, vd2.x) - vec3(vd0.xyz)) );

		// interpolated normal using triangle intersection's uv's
		triangleW = 1.0 - triangleU - triangleV;

		// if(edge == FALSE)
		// {
			hitNormal = (triangleW * vec3(vd2.yzw) + triangleU * vec3(vd3.xyz) + triangleV * vec3(vd3.w, vd4.xy));
		// }
		// else
		// {
			//diagonal normal
			// hitNormal = (triangleW * vec3(vd2.yzw) + triangleU * vec3(vd3.w, vd4.xy) + triangleV * vec3(vd4.zw, vd5.xy));
			
		// }
		hitEmission = vec3(1, 0, 1); // use this if hitType will be LIGHT
		hitColor = vd6.yzw;
		hitOpacity = vd7.y;
		hitUV = triangleW * vec2(vd4.zw) + triangleU * vec2(vd5.xy) + triangleV * vec2(vd5.zw);
		//hitType = SPEC;//int(vd6.x);
		hitAlbedoTextureID = int(vd7.x);
		int hitPbrTextureId = int(vd7.z);
		int hitEmissiveTextureId = int(vd7.w);
		hitObjectID = float(objectCount);





			 if(hitAlbedoTextureID == 0) texColor = texture(tAlbedoTextures[0], hitUV);
		else if(hitAlbedoTextureID == 1)  texColor = texture(tAlbedoTextures[1], hitUV);
		else if(hitAlbedoTextureID == 2)  texColor = texture(tAlbedoTextures[2], hitUV);
		else if(hitAlbedoTextureID == 3)  texColor = texture(tAlbedoTextures[3], hitUV);
		else if(hitAlbedoTextureID == 4)  texColor = texture(tAlbedoTextures[4], hitUV);
		else if(hitAlbedoTextureID == 5)  texColor = texture(tAlbedoTextures[5], hitUV);
		else if(hitAlbedoTextureID == 6)  texColor = texture(tAlbedoTextures[6], hitUV);
		else if(hitAlbedoTextureID == 7)  texColor = texture(tAlbedoTextures[7], hitUV);

		hitColor = pow(texColor.rgb, vec3(2.2));	

			 if (hitPbrTextureId == 0) metalicRoughness = pow((texture(tAlbedoTextures[0], hitUV)).rgb, vec3(2.2));
		else if (hitPbrTextureId == 1) metalicRoughness = pow((texture(tAlbedoTextures[1], hitUV)).rgb, vec3(2.2));
		else if (hitPbrTextureId == 2) metalicRoughness = pow((texture(tAlbedoTextures[2], hitUV)).rgb, vec3(2.2));
		else if (hitPbrTextureId == 3) metalicRoughness = pow((texture(tAlbedoTextures[3], hitUV)).rgb, vec3(2.2));
		else if (hitPbrTextureId == 4) metalicRoughness = pow((texture(tAlbedoTextures[4], hitUV)).rgb, vec3(2.2));
		else if (hitPbrTextureId == 5) metalicRoughness = pow((texture(tAlbedoTextures[5], hitUV)).rgb, vec3(2.2));
		else if (hitPbrTextureId == 6) metalicRoughness = pow((texture(tAlbedoTextures[6], hitUV)).rgb, vec3(2.2));
		else if (hitPbrTextureId == 7) metalicRoughness = pow((texture(tAlbedoTextures[6], hitUV)).rgb, vec3(2.2));

		vec4 emissiveColor;

			 if(hitEmissiveTextureId == 0) 	emissiveColor = texture(tAlbedoTextures[0], hitUV);
		else if(hitEmissiveTextureId == 1)  emissiveColor = texture(tAlbedoTextures[1], hitUV);
		else if(hitEmissiveTextureId == 2)  emissiveColor = texture(tAlbedoTextures[2], hitUV);
		else if(hitEmissiveTextureId == 3)  emissiveColor = texture(tAlbedoTextures[3], hitUV);
		else if(hitEmissiveTextureId == 4)  emissiveColor = texture(tAlbedoTextures[4], hitUV);
		else if(hitEmissiveTextureId == 5)  emissiveColor = texture(tAlbedoTextures[5], hitUV);
		else if(hitEmissiveTextureId == 6)  emissiveColor = texture(tAlbedoTextures[6], hitUV);
		else if(hitEmissiveTextureId == 7)  emissiveColor = texture(tAlbedoTextures[7], hitUV);
		
		hitType = DIFF;
		/*
		if(emissiveColor.r > 0.0)
		{
			hitType = LIGHT;
			hitEmission = texColor.rgb * emissiveColor.r * 100.0;
		}
		else if(metalicRoughness.r > 0.0) 
		{
			hitType = REFR;
		}
		else if (metalicRoughness.b > 0.0) // metalness
		{
			hitType = SPEC;
		}
		else if (metalicRoughness.g > 0.0) // roughness
		{
			hitType = COAT;
		}

		if(edge == TRUE && hitType == DIFF)
		{
			hitType = DIFF_CORNER;
		}
*/

		


		// hitType = LIGHT;
		// hitEmission = vec3(1.0, 1.0, 1.0) * 5.0;

	}
	
	return t;
	
} // end float SceneIntersect( out int finalIsRayExiting )


//-----------------------------------------------------------------------------------------------------------------------------
vec3 CalculateRadiance( out vec3 objectNormal, out vec3 objectColor, out float objectID, out float pixelSharpness )
//-----------------------------------------------------------------------------------------------------------------------------
{
	Sphere lightChoice;

	vec3 accumCol = vec3(0);
        vec3 mask = vec3(1);
	vec3 reflectionMask = vec3(1);
	vec3 reflectionRayOrigin = vec3(0);
	vec3 reflectionRayDirection = vec3(0);
	vec3 checkCol0 = vec3(1);
	vec3 checkCol1 = vec3(0.5);
	vec3 dirToLight;
	vec3 tdir;
	vec3 x, n, nl;
        
	float t;
	float nc, nt, ratioIoR, Re, Tr;
	//float P, RP, TP;
	float weight;
	float thickness = 0.1;

	int diffuseCount = 0;
	int previousIntersecType = -100;
	hitType = -100;
	
	int coatTypeIntersected = FALSE;
	int bounceIsSpecular = TRUE;
	int sampleLight = FALSE;
	int isRayExiting;
	int willNeedReflectionRay = FALSE;

	float epsIntersect = 0.01;
		vec3 randVec = vec3(rand() * 2.0 - 1.0, rand() * 2.0 - 1.0, rand() * 2.0 - 1.0);


	lightChoice = spheres[int(rand() * N_LIGHTS)];

	
	for (int bounces = 0; bounces < 7; bounces++)
	{
		previousIntersecType = hitType;

		t = SceneIntersect(isRayExiting);

		if (t == INFINITY)
		{
			// ray hits sky first
			if (bounces == 0)
			{
				pixelSharpness = 1.01;
				// accumCol += vec3(1.0, 0.0, 0.0, 0.0);

				// accumCol += Get_HDR_Color(rayDirection);
				//transparent color
				// accumCol = vec3(1.0, 0.0, 0.0);
				break;
			}

			// if ray bounced off of diffuse material and hits sky
			if (previousIntersecType == DIFF || previousIntersecType == DIFF_CORNER)
			{

					accumCol += mask * Get_HDR_Color(rayDirection) * uSkyLightIntensity * 0.5;
			}

			if (previousIntersecType == SPEC)
			{
					accumCol += mask * Get_HDR_Color(rayDirection) * uSkyLightIntensity * 0.5;
			}

			if (previousIntersecType == COAT)
			{
					accumCol += mask * Get_HDR_Color(rayDirection) * uSkyLightIntensity * 0.5;
			}

			// if ray bounced off of glass and hits sky
			if (previousIntersecType == REFR)
			{
				if (diffuseCount == 0) // camera looking through glass, hitting the sky
				{
					pixelSharpness = 1.01;
					mask *= Get_HDR_Color(rayDirection);
				}	
				mask *= Get_HDR_Color(rayDirection) * uSkyLightIntensity;

				if (bounceIsSpecular == TRUE) // prevents sun 'fireflies' on diffuse surfaces
					accumCol += mask;
			}

			if (willNeedReflectionRay == TRUE)
			{
				mask = reflectionMask;
				rayOrigin = reflectionRayOrigin;
				rayDirection = reflectionRayDirection;

				willNeedReflectionRay = FALSE;
				bounceIsSpecular = TRUE;
				sampleLight = FALSE;
				diffuseCount = 0;
				continue;
			}
			// reached a light, so we can exit
			break;

		} // end if (t == INFINITY)
		
		/*
		//not used in this scene because we are inside a huge sphere - no rays can escape
		*/
		// if (t == INFINITY)
		// {
        //                 break;
		// }

		// useful data 
		n = normalize(hitNormal);
                nl = dot(n, rayDirection) < 0.0 ? n : -n;
		x = rayOrigin + rayDirection * t;

		if (bounces == 0)
		{
			objectNormal = nl;
			objectColor = hitColor;
			objectID = hitObjectID;
			
		}
		if (bounces == 1 && diffuseCount == 0 && previousIntersecType == SPEC)
		{
			objectNormal = nl;
		}
		
		
		if (hitType == LIGHT)
		{	
			if (bounces == 0 || (bounces == 1 && previousIntersecType == SPEC))
				pixelSharpness = 1.01;

			if (diffuseCount == 0)
			{
				objectNormal = nl;
				objectColor = hitColor;
				objectID = hitObjectID;
			}

			// if (bounceIsSpecular == TRUE || sampleLight == TRUE)
				accumCol += mask * hitEmission;

			if (willNeedReflectionRay == TRUE)
			{
				mask = reflectionMask;
				rayOrigin = reflectionRayOrigin;
				rayDirection = reflectionRayDirection;

				willNeedReflectionRay = FALSE;
				bounceIsSpecular = TRUE;
				sampleLight = FALSE;
				diffuseCount = 0;
				continue;
			}
			// reached a light, so we can exit
			break;
		} // end if (hitType == LIGHT)


		// if we get here and sampleLight is still TRUE, shadow ray failed to find the light source 
		// the ray hit an occluding object along its way to the light
		if (sampleLight == TRUE)
		{
			if (willNeedReflectionRay == TRUE)
			{
				mask = reflectionMask;
				rayOrigin = reflectionRayOrigin;
				rayDirection = reflectionRayDirection;

				willNeedReflectionRay = FALSE;
				bounceIsSpecular = TRUE;
				sampleLight = FALSE;
				diffuseCount = 0;
				continue;
			}

			break;
		}
			


	

		if (hitType == DIFF|| hitType == DIFF_CORNER) // Ideal DIFFUSE reflection
		{

			diffuseCount++;

			mask *= hitColor;

			bounceIsSpecular = FALSE;

			// if(hitType == DIFF_CORNER)
			// {
			// 	mask *= 0.5;
			// }
			
			rayDirection = randomCosWeightedDirectionInHemisphere(nl);
			rayOrigin = x + nl * uEPS_intersect;
			continue;

                        
		} // end if (hitType == DIFF)
		
		if (hitType == SPEC)  // Ideal SPECULAR reflection
		{
			mask *= hitColor;

			rayDirection = randomDirectionInSpecularLobe(reflect(rayDirection, nl), metalicRoughness.g);//reflect(rayDirection, nl);
			rayOrigin = x + nl * uEPS_intersect;

			if (diffuseCount == 1)
				bounceIsSpecular = TRUE; // turn on reflective mirror caustics

			continue;
		}

		
		if (hitType == REFR)  // Ideal dielectric REFRACTION
		{
			pixelSharpness = diffuseCount == 0 && coatTypeIntersected == FALSE ? -1.0 : pixelSharpness;
			
			nc = 1.0; // IOR of Air
			nt = 1.5; // IOR of common Glass
			Re = calcFresnelReflectance(rayDirection, n, nc, nt, ratioIoR);
			Tr = 1.0 - Re;

			if (bounces == 0 || (bounces == 1 && hitObjectID != objectID && bounceIsSpecular == TRUE))
			{
				reflectionMask = mask * Re;
				reflectionRayDirection = randomDirectionInSpecularLobe(reflect(rayDirection, nl), metalicRoughness.g); // reflect ray from surface
				reflectionRayOrigin = x + nl * uEPS_intersect;
				willNeedReflectionRay = TRUE;
			}

			if (Re == 1.0)
			{
				mask = reflectionMask;
				rayOrigin = reflectionRayOrigin;
				rayDirection = reflectionRayDirection;

				willNeedReflectionRay = FALSE;
				bounceIsSpecular = TRUE;
				sampleLight = FALSE;
				continue;
			}

			// transmit ray through surface

			// is ray leaving a solid object from the inside? 
			// If so, attenuate ray color with object color by how far ray has travelled through the medium
			if (isRayExiting == TRUE)
			{
				isRayExiting = FALSE;
				mask *= exp(log(hitColor) * thickness * t);
			}
			else 
				mask *= hitColor;

			mask *= Tr;
			
			tdir =  randomDirectionInSpecularLobe(refract(rayDirection, nl, ratioIoR), metalicRoughness.g);
			rayDirection = tdir;
			rayOrigin = x - nl * uEPS_intersect;

			if (diffuseCount == 1)
				bounceIsSpecular = TRUE; // turn on refracting caustics

			continue;
			
		} // end if (hitType == REFR)
		
		if (hitType == COAT)  // Diffuse object underneath with ClearCoat on top
		{
			coatTypeIntersected = TRUE;
			
			nc = 1.0; // IOR of Air
			nt = 1.4; // IOR of Clear Coat
			Re = calcFresnelReflectance(rayDirection, nl, nc, nt, ratioIoR);
			Tr = 1.0 - Re;
			
			if (bounces == 0 || (bounces == 1 && hitObjectID != objectID && bounceIsSpecular == TRUE))
			{
				reflectionMask = mask * Re;
				reflectionRayDirection = randomDirectionInSpecularLobe(reflect(rayDirection, nl), metalicRoughness.g); // reflect ray from surface
				reflectionRayOrigin = x + nl * uEPS_intersect;
				willNeedReflectionRay = TRUE;
			}

			diffuseCount++;

			//if (bounces == 0)
				mask *= Tr;
			mask *= hitColor;

			bounceIsSpecular = FALSE;

			if (diffuseCount == 1 && rand() < 0.5)
			{
				mask *= 2.0;
				// choose random Diffuse sample vector
				rayDirection = randomCosWeightedDirectionInHemisphere(nl);
				rayOrigin = x + nl * uEPS_intersect;
				continue;
			}
			
			if (hitColor.r == 1.0 && rand() < 0.9) // this makes white capsule more 'white'
				dirToLight = sampleSphereLight(x, nl, spheres[0], weight);
			else
				dirToLight = sampleSphereLight(x, nl, lightChoice, weight);
			
			mask *= diffuseCount == 1 ? 2.0 : 1.0;
			mask *= weight * N_LIGHTS;
			
			rayDirection = dirToLight;
			rayOrigin = x + nl * uEPS_intersect;

			sampleLight = TRUE;
			continue;
			
		} //end if (hitType == COAT)

		
	} // end for (int bounces = 0; bounces < 6; bounces++)
	
	
	return max(vec3(0), accumCol);

} // end vec3 CalculateRadiance( out vec3 objectNormal, out vec3 objectColor, out float objectID, out float pixelSharpness )


//-----------------------------------------------------------------------
void SetupScene(void)
//-----------------------------------------------------------------------
{
	vec3 z  = vec3(0);          
	vec3 L1 = uSunColor  * 100.0;// White light
	vec3 L2 = vec3(1.0, 0.8, 0.2) * 4.0;// Yellow light
	vec3 L3 = vec3(0.1, 0.7, 1.0) * 2.0;// Blue light

		// boxes[0] = Box( vec3(-100, -6, -100), vec3(100, -5, 100), vec3(0), vec3(0.45), DIFF);
		


		
        // spheres[0] = Sphere(1000.0, uSunDirection*10000.0, L1, z, LIGHT);//spherical white Light1 
	// spheres[1] = Sphere(100.0, vec3( 300, 400,-300), L2, z, LIGHT);//spherical yellow Light2
	// spheres[2] = Sphere( 50.0, vec3( 500, 250,-100), L3, z, LIGHT);//spherical blue Light3
	
	// // spheres[3] = Sphere(1000.0, vec3(  0.0, 990.0,  0.0), z, vec3(1.0, 1.0, 1.0), CHECK);//Checkered Floor
    //     spheres[4] = Sphere(  16.5, vec3(-26.0,   17.2,  5.0), z, vec3(0.95, 0.95, 0.95), DIFF);//Mirror sphere
        // spheres[5] = Sphere(  15.0, vec3( 32.0,   16.1, 30.0), z, vec3(1.0, 1.0, 1.0), REFR);//Glass sphere
        
	// ellipsoids[0] = Ellipsoid(  vec3(30,40,16), vec3(90,5,-30), z, vec3(1.0, 0.765557, 0.336057), SPEC);//metallic gold ellipsoid
	
	// paraboloids[0] = Paraboloid(  16.5, 50.0, vec3(20,1.5,-50), z, vec3(1.0, 0.2, 0.7), REFR);//paraboloid
	
	// openCylinders[0] = OpenCylinder( 15.0, 30.0, vec3(-70,7,-80), z, vec3(0.9,0.01,0.01), REFR);//red glass open Cylinder

	// cappedCylinders[0] = CappedCylinder( 14.0, vec3(-60,0,20), vec3(-60,14,20), z, vec3(0.04,0.04,0.04), COAT);//dark gray capped Cylinder
	
	// cones[0] = Cone( vec3(1,20,-12), 15.0, vec3(1,0,-12), 0.0, z, vec3(0.01,0.1,0.5), REFR);//blue Cone
	
	// capsules[0] = Capsule( vec3(80,13,15), 10.0, vec3(110,15.8,15), 10.0, z, vec3(1.0, 1.0, 1.0), COAT);//white Capsule
	
	// torii[0] = UnitTorus( 0.75, z, vec3(0.955008, 0.637427, 0.538163), SPEC);//copper Torus
	
	// boxes[0] = Box( vec3(50.0,21.0,-60.0), vec3(100.0,28.0,-130.0), z, vec3(0.2,0.9,0.7), REFR);//Glass Box
	// boxes[1] = Box( vec3(56.0,23.0,-66.0), vec3(94.0,26.0,-124.0), z, vec3(0.0,0.0,0.0), DIFF);//Diffuse Box
}


#include <pathtracing_main>
