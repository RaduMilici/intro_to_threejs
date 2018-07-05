import Tile from './Tile';
import Draw from './Draw';
export default class Canvas {
    constructor(selector, size) {
        this.size = size;
        this.rows = [];
        this._canvas = document.querySelector(selector);
        this.context = this._canvas.getContext('2d');
        this.setSize(size);
        this.draw = new Draw(this);
    }
    get canvas() {
        return this._canvas;
    }
    drawGrid(gridSize, tileSize) {
        this.boundingBox = this.getBoundingBox(gridSize, tileSize);
        for (let y = 0; y < gridSize.height; y++) {
            const row = [];
            for (let x = 0; x < gridSize.width; x++) {
                const coords = { x, y };
                const position = this.getTilePosition(coords, tileSize);
                const tile = new Tile(tileSize, position, coords, this.context);
                row.push(tile);
            }
            this.rows.push(row);
        }
    }
    getTile({ x, y }) {
        const row = this.rows[y];
        if (!row) {
            return null;
        }
        else if (row.length < x) {
            return null;
        }
        return row[x];
    }
    setSize({ width, height }) {
        this._canvas.width = width;
        this._canvas.height = height;
    }
    getTilePosition(coords, size) {
        const offset = {
            x: coords.x * size.width,
            y: coords.y * size.height,
        };
        return {
            x: this.boundingBox.left + offset.x,
            y: this.boundingBox.top + offset.y,
        };
    }
    getBoundingBox(gridSize, tileSize) {
        const center = {
            x: Math.round(this.canvas.width / 2),
            y: Math.round(this.canvas.height / 2),
        };
        const { width, height } = Canvas.getGridSizeInPixels(gridSize, tileSize);
        const halfHeight = Math.round(height / 2);
        const halfWidth = Math.round(width / 2);
        return {
            top: center.y - halfHeight,
            bottom: center.y + halfHeight,
            left: center.x - halfWidth,
            right: center.x + halfWidth,
        };
    }
    static getGridSizeInPixels(gridSize, tileSize) {
        return {
            width: gridSize.width * tileSize.width,
            height: gridSize.height * tileSize.height,
        };
    }
}
//# sourceMappingURL=Canvas.js.map