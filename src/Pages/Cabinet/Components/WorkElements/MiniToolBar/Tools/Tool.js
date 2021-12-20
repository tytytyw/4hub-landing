import {Component} from 'react';

class Tool extends Component {
    constructor(canvas) {
        super(canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.destroyEvents();
    }

    width = {
        pencil: '1px',
        pen: '2px',
        eraser: '5px',
        marker: '5px',
        brush: '5px',
        pointer: '1px'
    };

    destroyEvents() {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    }
}

export default Tool;