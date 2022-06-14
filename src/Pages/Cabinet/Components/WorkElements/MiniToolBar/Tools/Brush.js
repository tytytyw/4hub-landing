import Tool from "./Tool";

class Brush extends Tool {
  constructor(canvas, options) {
    super(canvas, options);
    setTimeout(() => this.listen(), 0);
  }

  name = "brush";

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
    this.ctx.moveTo(e.pageX - e.target.getBoundingClientRect().x, e.pageY - e.target.getBoundingClientRect().y);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.draw(e.pageX - e.target.getBoundingClientRect().x, e.pageY - e.target.getBoundingClientRect().y);
    }
  }

  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.globalAlpha = 1;
    this.ctx.stroke();
    this.ctx.shadowColor = this.ctx.strokeStyle;
    this.ctx.shadowBlur = 5;
  }
}

export default Brush;
