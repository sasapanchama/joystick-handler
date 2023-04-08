// This interface defines the data structure for joystick inputs.
export interface JoystickData {
  angle: number | null;
  velocity: number;
}

// This class handles the joystick element.
export class JoystickHandler {
  $container: HTMLElement;
  $outerCircle: HTMLElement;
  $innerCircle: HTMLElement;
  centerX: number;
  centerY: number;
  limit: number;

  // The constructor takes an HTMLElement as an argument and creates the joystick element within it.
  constructor(container: HTMLElement) {
    this.$container = container;

    // Create the outer circle element.
    this.$outerCircle = document.createElement("div");
    this.$outerCircle.id = "JoystickHandler__OuterCircle";
    this.$outerCircle.style.margin = "0 auto";
    this.$outerCircle.style.width = "240px";
    this.$outerCircle.style.height = "240px";
    this.$outerCircle.style.boxSizing = "border-box";
    this.$outerCircle.style.border = "4px solid black";
    this.$outerCircle.style.borderRadius = "120px";
    this.$outerCircle.style.position = "relative";
    this.$container.appendChild(this.$outerCircle);

    // Create the inner circle element.
    this.$innerCircle = document.createElement("div");
    this.$innerCircle.id = "JoystickHandler__InnerCircle";
    this.$innerCircle.style.width = "120px";
    this.$innerCircle.style.height = "120px";
    this.$innerCircle.style.boxSizing = "border-box";
    this.$innerCircle.style.border = "4px solid black";
    this.$innerCircle.style.borderRadius = "60px";
    this.$innerCircle.style.backgroundColor = "black";
    this.$innerCircle.style.position = "absolute";
    this.$innerCircle.style.transform = "translate(50%, 50%)";
    this.$outerCircle.appendChild(this.$innerCircle);

    // Calculate the center coordinates and the limit of the joystick element.
    this.centerX = this.$outerCircle.getBoundingClientRect().left + this.$outerCircle.clientWidth / 2;
    this.centerY = this.$outerCircle.getBoundingClientRect().top + this.$outerCircle.clientHeight / 2;
    this.limit = this.$outerCircle.clientWidth / 2;

    // Bind the event handler methods to the instance.
    this.handleTouchMoveEvent = this.handleTouchMoveEvent.bind(this);
    this.handleTouchEndEvent = this.handleTouchEndEvent.bind(this);
  }

  // This method sets the size of the joystick element.
  public setSize(size: number): void {
    this.$outerCircle.style.width = `${size}px`;
    this.$outerCircle.style.height = `${size}px`;
    this.$outerCircle.style.borderRadius = `${size / 2}px`;
    this.$innerCircle.style.width = `${size / 2}px`;
    this.$innerCircle.style.height = `${size / 2}px`;
    this.$innerCircle.style.borderRadius = `${size / 4}px`;
    this.limit = size / 2;
  }

  // This method handles the touch move event on the joystick element and returns the joystick data.
  public handleTouchMoveEvent(event: TouchEvent): JoystickData {
    const touch: Touch = event.touches[0] as Touch;

    // Calculate the position of the inner circle and the joystick data.
    let touchX =
      Math.abs(touch.clientX - this.centerX) < this.limit
        ? touch.clientX - this.centerX
        : touch.clientX - this.centerX > 0
        ? this.limit
        : -this.limit;
    let touchY =
      Math.abs(touch.clientY - this.centerY) < this.limit
        ? touch.clientY - this.centerY
        : touch.clientY - this.centerY > 0
        ? this.limit
        : -this.limit;

    const v1 = { x: 0, y: -1 };
    const v2 = { x: touchX, y: touchY };
    let dot = v1.x * v2.x + v1.y * v2.y;
    let cross = v1.x * v2.y - v1.y * v2.x;
    let absV1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    let absV2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
    let cos = dot / (absV1 * absV2);
    let sin = cross / (absV1 * absV2);
    let radians = Math.acos(cos);
    let degrees = Math.floor((radians * 180) / Math.PI);

    this.$innerCircle.style.left = `${touchX}px`;
    this.$innerCircle.style.top = `${touchY}px`;

    return { angle: sin > 0 ? degrees : -degrees, velocity: absV2 };
  }

  public handleTouchEndEvent(): JoystickData {
    this.$innerCircle.style.left = `0px`;
    this.$innerCircle.style.top = `0px`;
    return { angle: null, velocity: 0 };
  }
}
