import { JSDOM, DOMWindow } from "jsdom";
import { JoystickHandler } from "../src/JoystickHandler";

describe("JoystickHandler", () => {
  let container: HTMLElement;
  let joystickHandler: JoystickHandler;

  beforeAll(() => {
    // Set up the DOM.
    const dom = new JSDOM(`<!DOCTYPE html><div id="container"></div>`);
    global.window = dom.window as DOMWindow & typeof globalThis;
    global.document = dom.window.document;
    container = document.getElementById("container")!;
  });

  beforeEach(() => {
    // Set up the JoystickHandler instance.
    joystickHandler = new JoystickHandler(container);
  });

  afterEach(() => {
    // Clean up the JoystickHandler instance.
    joystickHandler.$container.removeChild(joystickHandler.$outerCircle);
  });

  it("should create the joystick element within the container", () => {
    expect(container.contains(joystickHandler.$outerCircle)).toBe(true);
  });

  it("should create the outer circle element with the correct styles", () => {
    expect(joystickHandler.$outerCircle.style.margin).toBe("0 auto");
    expect(joystickHandler.$outerCircle.style.width).toBe("240px");
    expect(joystickHandler.$outerCircle.style.height).toBe("240px");
    expect(joystickHandler.$outerCircle.style.boxSizing).toBe("border-box");
    expect(joystickHandler.$outerCircle.style.border).toBe("4px solid black");
    expect(joystickHandler.$outerCircle.style.borderRadius).toBe("120px");
    expect(joystickHandler.$outerCircle.style.position).toBe("relative");
  });

  it("should create the inner circle element with the correct styles", () => {
    expect(joystickHandler.$innerCircle.style.width).toBe("120px");
    expect(joystickHandler.$innerCircle.style.height).toBe("120px");
    expect(joystickHandler.$innerCircle.style.boxSizing).toBe("border-box");
    expect(joystickHandler.$innerCircle.style.border).toBe("4px solid black");
    expect(joystickHandler.$innerCircle.style.borderRadius).toBe("60px");
    expect(joystickHandler.$innerCircle.style.backgroundColor).toBe("black");
    expect(joystickHandler.$innerCircle.style.position).toBe("absolute");
    expect(joystickHandler.$innerCircle.style.transform).toBe("translate(50%, 50%)");
  });

  it("should calculate the center coordinates and the limit of the joystick element", () => {
    expect(joystickHandler.centerX).toBeCloseTo(container.getBoundingClientRect().left + container.clientWidth / 2);
    expect(joystickHandler.centerY).toBeCloseTo(container.getBoundingClientRect().top + container.clientHeight / 2);
    expect(joystickHandler.limit).toBe(container.clientWidth / 2);
  });
});
