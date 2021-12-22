import Tool from "./Tool";

class Eraser extends Tool {
    constructor(canvas, color) {
        super(canvas, color);
        this.listen();
    }

    name = 'eraser';

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.layerX, e.layerY);
    }

    mouseMoveHandler(e) {
        if(this.mouseDown) {
            this.draw(e.layerX, e.layerY);
        }
    }

    draw(x, y) {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = this.width[this.name];
    }
}

export default Eraser;