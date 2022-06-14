import Tool from "./Tool";

class Marker extends Tool {
  constructor(canvas, options) {
    super(canvas, options);
    setTimeout(() => this.listen(), 0);
  }

  name = "marker";

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
    this.ctx.stroke();
    this.ctx.globalAlpha = 0.05;
  }
}

export default Marker;
