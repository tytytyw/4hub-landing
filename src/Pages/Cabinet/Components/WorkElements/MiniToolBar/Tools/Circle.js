import Tool from "./Tool";

class Circle extends Tool {
    constructor(canvas, options) {
        super(canvas, options);
        setTimeout(() => this.listen(), 0);
    }

    name = 'circle';
    startX = undefined;
    startY = undefined;
    defaultImage = '';

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        this.startX = undefined;
        this.startY = undefined;
        this.defaultImage = '';
    }

    mouseDownHandler(e) {
        this.pushInDrawHistory(this.canvas.toDataURL());
        this.mouseDown = true;
        this.startX = e.offsetX;
        this.startY = e.offsetY;
        this.defaultImage = this.canvas.toDataURL();
    }

    mouseMoveHandler(e) {
        if(this.mouseDown) {
            const currentX = e.offsetX;
            const currentY = e.offsetY;
            const width = currentX - this.startX;
            const height = currentY - this.startY;
            const radius = Math.sqrt(width**2 + height**2)
            this.draw(this.startX, this.startY, radius)
        }
    }

    draw(x, y, radius) {
        const img = new Image();
        img.src = this.defaultImage;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, 2*Math.PI);
            this.ctx.stroke();
        }
    }
}

export default Circle;