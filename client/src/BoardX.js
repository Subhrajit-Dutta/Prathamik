import React from 'react';
import './BoardX.css';

class Board extends React.Component {
  timeout;
  isDrawing = false;

  componentDidMount() {
    this.drawOnCanvas();
    this.setupSocketListeners();
  }

  componentWillReceiveProps(newProps) {
    this.ctx.strokeStyle = newProps.color;
    this.ctx.lineWidth = newProps.size;
  }

  drawOnCanvas() {
    const canvas = document.querySelector('#board');
    this.ctx = canvas.getContext('2d');
    const ctx = this.ctx;

    const sketch = document.querySelector('#sketch');
    const sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    const mouse = { x: 0, y: 0 };
    const last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      'mousemove',
      function(e) {
        const rect = canvas.getBoundingClientRect();
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = this.props.size;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = this.props.color;

    canvas.addEventListener(
      'mousedown',
      function (e) {
        canvas.addEventListener('mousemove', onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      'mouseup',
      function () {
        canvas.removeEventListener('mousemove', onPaint, false);
      },
      false
    );

    const onPaint = () => {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (this.timeout != undefined) clearTimeout(this.timeout);

      const base64ImageData = canvas.toDataURL('image/png');
      this.props.socket.emit('canvas-data', {value: base64ImageData, roomid: this.props.meetingId});
    };
  }

  setupSocketListeners() {
    this.props.socket.on('canvas-data', (data) => {
      const image = new Image();
      const canvas = document.querySelector('#board');
      const ctx = canvas.getContext('2d');
      image.onload = function () {
        ctx.drawImage(image, 0, 0);
      };
      image.src = data;
    });
  }

  render() {
    return (
      <div className="sketch" id="sketch">
        <canvas className="board" id="board" ref={this.props.canvasRef}></canvas>
      </div>
    );
  }
}

export default Board;