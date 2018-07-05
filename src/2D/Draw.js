import { c_pointStroke, c_pointFill, s_point, c_line, s_line, c_triangleLine, c_triangleFill, s_triangle, } from './draw_const';
export default class Draw {
    constructor({ context }) {
        this.context = context;
    }
    point({ x, y }, strokeColor = c_pointStroke, fillColor = c_pointFill, size = s_point) {
        this.context.beginPath();
        this.context.arc(x, y, size, 0, 2 * Math.PI);
        this.context.strokeStyle = strokeColor;
        this.context.fillStyle = fillColor;
        this.context.lineWidth = 1;
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
    }
    points(points, strokeColor, fillColor, size) {
        points.forEach((point) => {
            this.point(point, strokeColor, fillColor, size);
        });
    }
    line({ a, b }, color = c_line, size = s_line) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = size;
        this.context.moveTo(a.x, a.y);
        this.context.lineTo(b.x, b.y);
        this.context.stroke();
    }
    lines(lines, color, size) {
        lines.forEach((line) => this.line(line, color, size));
    }
    triangle({ lines, a, b, c }, strokeColor = c_triangleLine, fillColor = c_triangleFill, size = s_triangle) {
        this.context.beginPath();
        this.context.moveTo(a.x, a.y);
        this.context.lineTo(b.x, b.y);
        this.context.lineTo(c.x, c.y);
        this.context.closePath();
        this.context.fillStyle = fillColor;
        this.context.fill();
        this.lines([lines.ab, lines.bc, lines.ca], strokeColor, size);
    }
    triangles(triangles, strokeColor, fillColor, size) {
        triangles.forEach((triangle) => {
            this.triangle(triangle, strokeColor, fillColor, size);
        });
    }
    text(text, { x, y }, size = 10, color = 'black') {
        this.context.font = `${size}px Arial`;
        this.context.fillStyle = color;
        this.context.fillText(text, x, y);
    }
}
//# sourceMappingURL=Draw.js.map