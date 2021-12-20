import Tool from "./Tool";

class Marker extends Tool {
    constructor(canvas) {
        super(canvas);
        this.listen();
    }

    name = 'marker';

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
        this.ctx.globalAlpha = 0.2;
        this.ctx.strokeStyle = 'rgba(226,9,9,0.1)';
        this.ctx.lineWidth = this.width[this.name];
        this.ctx.stroke();
    }
}

export default Marker;