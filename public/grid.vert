attribute vec3 position;
uniform mat4 modelViewProjectionMatrix;

void main() {
  vec3 pos = position;
  pos.xy *= 100.0; // adjust the size of the grid
  gl_Position = modelViewProjectionMatrix * vec4(pos, 1.0);
}