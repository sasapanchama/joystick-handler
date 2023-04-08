import { JSDOM } from "jsdom";
import { JoystickHandler, JoystickData } from "../src/JoystickHandler";

describe("JoystickHandler", () => {
  let joystickHandler: JoystickHandler;

  beforeEach(() => {
    joystickHandler = new JoystickHandler();
  });

  describe("constructor", () => {
    it("should create a parent and child element with default styles", () => {
      expect(joystickHandler.$parent).toBeInstanceOf(HTMLElement);
      expect(joystickHandler.$child).toBeInstanceOf(HTMLElement);
      expect(joystickHandler.$parent.style.margin).toBe("0px auto");
      expect(joystickHandler.$parent.style.width).toBe("240px");
      expect(joystickHandler.$parent.style.height).toBe("240px");
      expect(joystickHandler.$parent.style.boxSizing).toBe("border-box");
      expect(joystickHandler.$parent.style.border).toBe("4px solid black");
      expect(joystickHandler.$parent.style.borderRadius).toBe("120px");
      expect(joystickHandler.$parent.style.position).toBe("relative");
      expect(joystickHandler.$child.style.width).toBe("120px");
      expect(joystickHandler.$child.style.height).toBe("120px");
      expect(joystickHandler.$child.style.boxSizing).toBe("border-box");
      expect(joystickHandler.$child.style.border).toBe("4px solid black");
      expect(joystickHandler.$child.style.borderRadius).toBe("60px");
      expect(joystickHandler.$child.style.backgroundColor).toBe("black");
      expect(joystickHandler.$child.style.position).toBe("absolute");
      expect(joystickHandler.$child.style.transform).toBe("translate(50%, 50%)");
    });
  });

  describe("setSize", () => {
    it("should set the size of the joystick", () => {
      joystickHandler.setSize(320);
      expect(joystickHandler.$parent.style.width).toBe("320px");
      expect(joystickHandler.$parent.style.height).toBe("320px");
      expect(joystickHandler.$parent.style.borderRadius).toBe("160px");
      expect(joystickHandler.$child.style.width).toBe("160px");
      expect(joystickHandler.$child.style.height).toBe("160px");
      expect(joystickHandler.$child.style.borderRadius).toBe("80px");
    });
  });

  describe("handleTouchEndEvent", () => {
    it("should reset the joystick to center position and return joystick data with null angle and 0 velocity", () => {
      const joystickData = joystickHandler.handleTouchEndEvent();
      expect(joystickHandler.$child.style.left).toBe("0px");
      expect(joystickHandler.$child.style.top).toBe("0px");
      expect(joystickData.angle).toBeNull();
      expect(joystickData.velocity).toBe(0);
    });
  });
});
