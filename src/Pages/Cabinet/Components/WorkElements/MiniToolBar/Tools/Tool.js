import {Component} from 'react';

class Tool extends Component {
    constructor(canvas, color) {
        super(canvas, color);
        this.color = color;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.destroyEvents();
    }

    width = {
        pencil: 1,
        penThin: 1,
        penThick: 2.5,
        eraser: 10,
        marker: 7,
        brush: 10,
    };

    set strokeStyle(color) {
        this.ctx.strokeStyle = color;
    }

    destroyEvents() {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
        this.ctx.shadowBlur = 0;
        this.ctx.globalAlpha = 1;
        this.ctx.strokeStyle = this.color;
        console.log(this.color);
    }
}

export default Tool;