import Tool from "./Tool";

class Brush extends Tool {
    constructor(canvas) {
        super(canvas);
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
        this.ctx.strokeStyle = 'rgba(226,9,9,0.1)';
        this.ctx.lineWidth = this.width[this.name];
        this.ctx.stroke();
        this.ctx.fillStyle = 'red';
        this.ctx.shadowColor = '#b6b6b6';
        this.ctx.shadowBlur = 1;
        // this.ctx.shadowOffsetX = 15;
        // this.ctx.shadowOffsetY = 15;
        // this.ctx.fill();
    }
}

export default Brush;