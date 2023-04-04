function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
const data = {
    color: "#ffffff",
    material: [0,0,0,0],
    kind: "Regular",
    layers: [],
    rgb()
    {
        return hexToRgb(this.color)
    }
}

export default data;