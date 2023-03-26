attribute vec3 position;
attribute vec2 texCoord;
varying vec2 vTexCoord;


uniform mat4 projection_matrix;
uniform mat4 view_matrix;
uniform mat4 model_matrix;


void main() {
    gl_Position = projection_matrix*view_matrix*model_matrix*vec4(position.xy,position.z, 1.0);
    vTexCoord = texCoord ;
}