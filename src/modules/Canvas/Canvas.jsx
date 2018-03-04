import React, { Component } from "react";
import { l, noop } from "../../utils";

const collectPointTouch = ({ touches }) => {
  const [touch, ...otherTouches] = [...touches];
  if (
    touch !== void 0 &&
    touch !== null &&
    Number.isFinite(touch.clientX) &&
    Number.isFinite(touch.clientY)
  ) {
    return { x: touch.clientX, y: touch.clientY, otherTouches };
  }
  throw new Error("Something is wrong in collectPointTouch");
};

const collectPointCursor = ({ offsetX, offsetY }) => {
  return { x: offsetX, y: offsetY };
  throw new Error("Something is wrong in collectPointCursor");
};

export default class Canvas extends Component {
  static defaultProps = {
    onDrawStart: noop,
    onDraw: noop,
    onDrawEnd: noop,
    background: "transparent"
  };

  componentDidMount() {
    this.readyToStartDraw();
  }

  readyToStartDraw = () => {
    this.canvas.addEventListener("mousedown", this.onDrawStart);
    this.canvas.addEventListener("touchstart", this.onDrawStart);
  };

  notReadyToStartDraw = () => {
    this.canvas.removeEventListener("mousedown", this.onDrawStart);
    this.canvas.removeEventListener("touchstart", this.onDrawStart);
  };

  readyToFinishDraw = () => {
    this.canvas.addEventListener("touchend", this.onDrawEnd);
    this.canvas.addEventListener("mouseup", this.onDrawEnd);
  };

  notReadyToFinishDraw = () => {
    this.canvas.removeEventListener("touchend", this.onDrawEnd);
    this.canvas.removeEventListener("mouseup", this.onDrawEnd);
  };

  notReadyToDraw = () => {
    this.canvas.removeEventListener("mousemove", this.passPointCursor);
    this.canvas.removeEventListener("touchmove", this.passPointTouch);
  };

  passPoint = method => e => {
    this.props.onDraw(method(e));
  };

  passPointCursor = e => {
    this.props.onDraw(collectPointCursor(e));
  };

  passPointTouch = e => {
    this.props.onDraw(collectPointTouch(e));
  };

  componentWillUnmount() {
    this.notReadyToStartDraw();
  }

  onDrawStart = e => {
    this.props.onDrawStart();
    this.notReadyToStartDraw();
    this.readyToFinishDraw();
    if (!!e.touches) {
      this.passPointTouch(e);
      this.canvas.addEventListener("touchmove", this.passPointTouch);
    } else {
      this.passPointCursor(e);
      this.canvas.addEventListener("mousemove", this.passPointCursor);
    }
  };

  onDrawEnd = () => {
    this.props.onDrawEnd();
    this.notReadyToDraw();
    this.readyToStartDraw();
  };

  render() {
    const {
      width,
      height,
      background,
      children,
      PatternBackground,
      className
    } = this.props;
    return (
      <svg
        className={className}
        ref={canvas => (this.canvas = canvas)}
        width={width}
        height={height}
        style={{ background }}
      >
        {PatternBackground && <defs>{<PatternBackground />}</defs>}
        {PatternBackground && (
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={`url(#PatternBackground)`}
          />
        )}

        {children}
      </svg>
    );
  }
}
