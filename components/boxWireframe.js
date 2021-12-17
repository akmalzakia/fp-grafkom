import { Color, BoxGeometry, WireframeGeometry, LineSegments } from "../three/three.module.js";

function createBoxWireframe(size, color = 0xffff00) {
    const geo = new BoxGeometry(size.x , size.y, size.z);
    const wireframe = new WireframeGeometry(geo);
    const line = new LineSegments(wireframe);

    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = true;
    line.material.color = new Color(color);
    line.visible = false;
    return line;
}

export { createBoxWireframe };