import Tool from "./Tool";

class Brush extends Tool {
    constructor(canvas, color) {
        super(canvas, color);
        this.listen();
    }

    name = 'brush';

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
        this.ctx.globalAlpha = 1;
        this.ctx.lineWidth = this.width[this.name];
        this.ctx.stroke();
        this.ctx.shadowColor = this.ctx.strokeStyle;
        this.ctx.shadowBlur = 5;
    }
}

export default Brush;