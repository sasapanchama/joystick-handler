import { JSDOM } from "jsdom";
import { JoystickHandler, JoystickData } from "../src/JoystickHandler";

describe("JoystickHandler", () => {
  let joystick: JoystickHandler;
  let uiParent: HTMLElement;
  let uiChild: HTMLElement;

  beforeEach(() => {
    const dom = new JSDOM();
    global.document = dom.window.document;
    global.TouchEvent = dom.window.TouchEvent;

    // Create mock elements for the joystick UI
    uiParent = document.createElement("div");
    uiChild = document.createElement("div");

    // Initialize the joystick handler instance
    joystick = new JoystickHandler(uiParent, uiChild);
  });

  describe("handleEvent", () => {
    it("should calculate angle and velocity correctly for a touch event", () => {
      // Create a mock touch event object
      const touchEvent = new TouchEvent("touchstart", {
        touches: [
          {
            clientX: 50,
            clientY: 50,
            force: 1,
            identifier: 1,
            pageX: 50,
            pageY: 50,
            radiusX: 1,
            radiusY: 1,
            rotationAngle: 0,
            screenX: 50,
            screenY: 50,
            target: uiParent,
          },
        ],
      });

      // Call the handleEvent method and check the returned data
      const result: JoystickData = joystick.handleEvent(touchEvent);
      expect(result.angle).toBeGreaterThan(-181);
      expect(result.angle).toBeLessThan(181);
      expect(result.velocity).toBeGreaterThan(-1);
    });

    it("should update the position of the joystick control element", () => {
      // Create a mock touch event object
      const touchEvent = new TouchEvent("touchstart", {
        touches: [
          {
            clientX: 50,
            clientY: 50,
            force: 1,
            identifier: 1,
            pageX: 50,
            pageY: 50,
            radiusX: 1,
            radiusY: 1,
            rotationAngle: 0,
            screenX: 50,
            screenY: 50,
            target: uiParent,
          },
        ],
      });

      // Call the handleEvent method
      joystick.handleEvent(touchEvent);

      // Check that the position of the joystick control element has been updated
      expect(uiChild.style.left).toBe("35px");
      expect(uiChild.style.top).toBe("35px");
    });
  });
});
