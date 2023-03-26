precision mediump float;

uniform vec2 offset;
uniform vec2 size; 

void main() {

  float scaleFactor = 10000.0;

  float offsetX = (scaleFactor * offset[0]) + gl_FragCoord.x;
  float offsetY = (scaleFactor * offset[1]) + (1.0 - gl_FragCoord.y);

  float checker = mod(floor(offsetX / size.x) + floor(offsetY / size.y), 2.0);
  checker = checker * 0.5 + 0.5;
  gl_FragColor = vec4(checker, checker, checker, 1.0);
  
}