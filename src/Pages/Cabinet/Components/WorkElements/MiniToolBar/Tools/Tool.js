import {Component} from 'react';

class Tool extends Component {
    constructor(canvas, options) {
        super(canvas, options);
        this.color = options.color;
        this.pushInDrawHistory = options.pushInDrawHistory;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.destroyEvents();
    }

    //TODO - check and delete
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

    set lineWidth(width) {
        this.ctx.lineWidth = width;
    }

    destroyEvents() {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
        this.ctx.shadowBlur = 0;
        this.ctx.globalAlpha = 1;
        this.ctx.strokeStyle = this.color;
    }
}

export default Tool;