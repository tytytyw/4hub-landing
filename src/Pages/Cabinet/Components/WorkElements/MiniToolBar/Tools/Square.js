import Tool from "./Tool";

class Square extends Tool {
  constructor(canvas, options) {
    super(canvas, options);
    setTimeout(() => this.listen(), 0);
  }

  name = "square";
  startX = undefined;
  startY = undefined;
  defaultImage = "";

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.startX = undefined;
    this.startY = undefined;
    this.defaultImage = "";
  }

  mouseDownHandler(e) {
    this.pushInDrawHistory(this.canvas.toDataURL());
    this.mouseDown = true;
    this.startX = e.offsetX;
    this.startY = e.offsetY;
    this.defaultImage = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const currentX = e.offsetX;
      const currentY = e.offsetY;
      const width = currentX - this.startX;
      const height = currentY - this.startY;
      this.draw(this.startX, this.startY, width, height);
    }
  }

  draw(x, y, width, height) {
    const img = new Image();
    img.src = this.defaultImage;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, width, height);
      this.ctx.stroke();
    };
  }
}

export default Square;
