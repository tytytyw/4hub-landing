import {Component} from 'react';

class Tool extends Component {
    constructor(canvas) {
        super(canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.destroyEvents();
    }

    width = {
        pencil: 1,
        penThin: 1,
        penThick: 1.5,
        eraser: 10,
        marker: 5,
        brush: 10,
    };

    destroyEvents() {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    }
}

export default Tool;