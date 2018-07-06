import uniqueId from './uniqueID';
import { NavigatorTile } from 'pulsar-pathfinding';
import { start, obstacle, outline, empty } from './draw_const';
export default class Tile {
    constructor(size, position, _gridCoords, context) {
        this.size = size;
        this.position = position;
        this._gridCoords = _gridCoords;
        this.context = context;
        this.id = uniqueId();
        this.navigatorTile = null;
        this._isObstacle = false;
        this._isStart = false;
        this.navigatorTile = new NavigatorTile(_gridCoords);
        this.stroke(outline);
    }
    get isObstacle() {
        return this._isObstacle;
    }
    get isStart() {
        return this._isStart;
    }
    get canBeStart() {
        return !this.isObstacle && !this.isStart;
    }
    get gridCoords() {
        return this._gridCoords;
    }
    get centroid() {
        return {
          x: this.position.x + this.size.width / 2,
          y: this.position.y + this.size.height / 2
        }
    }
    becomeStart() {
        if (!this.canBeStart) {
            return false;
        }
        this.fill(start);
        this.stroke(outline);
        return true;
    }
    reset() {
        this._isStart = false;
        this.fill(empty);
        this.stroke(outline);
    }
    becomeObstacle() {
        this._isObstacle = true;
        this.fill(obstacle);
    }
    containsPoint({ x, y }) {
        return (x >= this.position.x &&
            x <= this.position.x + this.size.width &&
            y >= this.position.y &&
            y <= this.position.y + this.size.height);
    }
    fill(color) {
        this.draw(() => {
            this.context.fillStyle = color;
            this.context.fill();
        });
    }
    stroke(color = 'black', width = 1) {
        this.draw(() => {
            this.context.strokeStyle = color;
            this.context.lineWidth = width;
            this.context.stroke();
        });
    }
    draw(drawAction) {
        const { x, y } = this.position;
        const { width, height } = this.size;
        this.context.beginPath();
        this.context.rect(x, y, width, height);
        drawAction();
        this.context.closePath();
    }
    drawCurrent() {
        this.stroke('black', 10);
    }
    drawStart(color = 'red') {
        this.fill(color);
    }

    drawEnd(color = 'blue') {
        this.fill(color);
    }
}
//# sourceMappingURL=Tile.js.map