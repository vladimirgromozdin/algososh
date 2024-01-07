import React from "react";
import renderer from 'react-test-renderer'

import {Button} from "./button";

it('should render button with text', () => {
    const tree = renderer
        .create(<Button text='Text'/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('should render button without text', () => {
    const tree = renderer
        .create(<Button />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('should render locked button', () => {
    const tree = renderer
        .create(<Button disabled={true}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('should render loading button', () => {
    const tree = renderer
        .create(<Button isLoader={true}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});