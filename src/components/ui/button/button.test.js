import React from "react";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";
import { DELAY_IN_MS } from "../../../constants/delays";

describe("Button Component", () => {
  it("should render button with text", () => {
    const tree = renderer.create(<Button text="Text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render button without text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render locked button", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render loading button", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should fire callback function with parameter", () => {
    const callbackFunction = jest.fn();
    render(
      <Button
        text="Test Button"
        onClick={() => callbackFunction(DELAY_IN_MS)}
      />,
    );
    const button = screen.getByText("Test Button");

    fireEvent.click(button);

    expect(callbackFunction).toHaveBeenCalledWith(DELAY_IN_MS);
  });
});
