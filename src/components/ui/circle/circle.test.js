import React from "react";
import renderer from "react-test-renderer";

import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Circle Component", () => {
  it("should render without characters", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render with characters", () => {
    const tree = renderer.create(<Circle letter="TEST" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render with string head", () => {
    const tree = renderer.create(<Circle head="TEST" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render with React element head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render with string tail", () => {
    const tree = renderer.create(<Circle tail="TEST" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render with React element tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render with index", () => {
    const tree = renderer.create(<Circle index={7} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render small", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render in default state", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render in changing state", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render in modified state", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
