export interface JoystickData {
  angle: number | null; // Angle of joystick handle in radians (null if center)
  velocity: number; // Distance of joystick handle from center normalized between 0 and 1
}

export class JoystickHandler {
  $parent: HTMLElement; // Parent element that contains the joystick
  $child: HTMLElement; // Child element that represents the joystick handle
  private centerX: number; // X coordinate of center of parent element
  private centerY: number; // Y coordinate of center of parent element
  private limit: number; // Maximum distance from center that joystick handle can be moved

  constructor() {
    // Create parent element and style it
    this.$parent = document.createElement("div");
    this.$parent.id = "JoystickHandler__Parent";
    this.$parent.style.margin = "0 auto";
    this.$parent.style.width = "240px";
    this.$parent.style.height = "240px";
    this.$parent.style.boxSizing = "border-box";
    this.$parent.style.border = "4px solid black";
    this.$parent.style.borderRadius = "120px";
    this.$parent.style.position = "relative";
    document.body.appendChild(this.$parent);

    // Create child element and style it
    this.$child = document.createElement("div");
    this.$child.id = "JoystickHandler__Child";
    this.$child.style.width = "120px";
    this.$child.style.height = "120px";
    this.$child.style.boxSizing = "border-box";
    this.$child.style.border = "4px solid black";
    this.$child.style.borderRadius = "60px";
    this.$child.style.backgroundColor = "black";
    this.$child.style.position = "absolute";
    this.$child.style.transform = "translate(50%, 50%)";
    this.$parent.appendChild(this.$child);

    // Calculate center coordinates and limit of joystick handle movement
    this.centerX = this.$parent.getBoundingClientRect().left + this.$parent.clientWidth / 2;
    this.centerY = this.$parent.getBoundingClientRect().top + this.$parent.clientHeight / 2;
    this.limit = this.$parent.clientWidth / 2;

    // Bind touch event handlers to the instance of the class
    this.handleTouchMoveEvent = this.handleTouchMoveEvent.bind(this);
    this.handleTouchEndEvent = this.handleTouchEndEvent.bind(this);
  }

  // Set the size of the joystick
  public setSize(size: number): void {
    this.$parent.style.width = `${size}px`;
    this.$parent.style.height = `${size}px`;
    this.$parent.style.borderRadius = `${size / 2}px`;
    this.$child.style.width = `${size / 2}px`;
    this.$child.style.height = `${size / 2}px`;
    this.$child.style.borderRadius = `${size / 4}px`;
    this.limit = size / 2;
  }

  // Handle the touch move event and return joystick data
  public handleTouchMoveEvent(event: TouchEvent): JoystickData {
    const touch: Touch = event.touches[0] as Touch;

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

    this.$child.style.left = `${touchX}px`;
    this.$child.style.top = `${touchY}px`;

    return { angle: sin > 0 ? degrees : -degrees, velocity: absV2 };
  }

  // Handle the touch end event and reset the joystick to center position
  public handleTouchEndEvent(): JoystickData {
    this.$child.style.left = `0px`;
    this.$child.style.top = `0px`;
    return { angle: null, velocity: 0 };
  }
}
