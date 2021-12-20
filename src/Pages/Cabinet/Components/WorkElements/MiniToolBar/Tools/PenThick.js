import Tool from "./Tool";

class PenThick extends Tool {
    constructor(canvas) {
        super(canvas);
        this.listen();
    }

    name = 'penThick';

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
        this.ctx.lineWidth = this.width[this.name];
        this.ctx.globalAlpha = 1;
    }
}

export default PenThick;