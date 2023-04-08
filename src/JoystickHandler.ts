// Define the structure of the data returned by the joystick handler
export interface JoystickData {
  angle: number;
  velocity: number;
}

// Define the JoystickHandler class
export class JoystickHandler {
  // Declare private variables to store the joystick UI elements and center coordinates
  private uiParent: HTMLElement;
  private uiChild: HTMLElement;
  private centerX: number;
  private centerY: number;

  // Constructor function to initialize the JoystickHandler instance with the UI elements
  constructor(uiParent: HTMLElement, uiChild: HTMLElement) {
    this.uiParent = uiParent;
    this.uiChild = uiChild;

    // Calculate the center coordinates of the joystick UI controller element
    this.centerX = uiParent.getBoundingClientRect().left + uiParent.clientWidth / 2;
    this.centerY = uiParent.getBoundingClientRect().top + uiParent.clientHeight / 2;

    // Bind the handleEvent method to the instance to ensure correct this binding
    this.handleEvent = this.handleEvent.bind(this);
  }

  // Event handler function for touch events on the joystick UI element
  public handleEvent(event: TouchEvent): JoystickData {
    // Cast the touch event objects to Touch objects
    const touch: Touch = event.touches[0] as Touch;

    // Calculate the x and y distance of the touch from the center of the joystick
    let touchX =
      Math.abs(touch.clientX - this.centerX) < 35
        ? touch.clientX - this.centerX
        : touch.clientX - this.centerX > 0
        ? 35
        : -35;
    let touchY =
      Math.abs(touch.clientY - this.centerY) < 35
        ? touch.clientY - this.centerY
        : touch.clientY - this.centerY > 0
        ? 35
        : -35;

    // Calculate the angle and velocity of the touch relative to the center of the joystick
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

    // Update the position of the joystick control element
    this.uiChild.style.left = `${touchX}px`;
    this.uiChild.style.top = `${touchY}px`;

    // Return the angle and velocity data
    return { angle: sin > 0 ? degrees : -degrees, velocity: absV2 };
  }
}
