attribute vec3 position;

uniform mat4 projection_matrix;
uniform mat4 view_matrix;
uniform mat4 model_matrix;
uniform vec3 mouse;
void main(void) {
  gl_Position = projection_matrix*view_matrix*model_matrix*vec4(position+mouse, 1.);
}