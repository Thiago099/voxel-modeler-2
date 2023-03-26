attribute vec4 position;

uniform mat4 projection_matrix;
uniform mat4 view_matrix;
uniform mat4 model_matrix;

void main(void) {
  gl_Position = projection_matrix*view_matrix*model_matrix*position;
}