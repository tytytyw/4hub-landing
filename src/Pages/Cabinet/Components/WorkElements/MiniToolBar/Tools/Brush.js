import Tool from "./Tool";

class Brush extends Tool {
    constructor(canvas) {
        super(canvas);
        this.listen();
    }

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
    }

    mouseMoveHandler(e) {
        if(this.mouseDown) {
            this.draw();
        }
    }

    draw() {

    }
}

export default Brush;