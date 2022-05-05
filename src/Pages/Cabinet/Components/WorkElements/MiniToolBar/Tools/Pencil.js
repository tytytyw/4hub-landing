import Tool from "./Tool";

class Pencil extends Tool {
  constructor(canvas, options) {
    super(canvas, options);
    setTimeout(() => this.listen(), 0);
  }

  name = "pencil";

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
  }

  mouseDownHandler(e) {
    this.pushInDrawHistory(this.canvas.toDataURL());
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(e.layerX, e.layerY);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.draw(e.layerX, e.layerY);
    }
  }

  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}

export default Pencil;
