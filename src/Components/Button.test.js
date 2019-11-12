import React from 'react';
import Button from './Button';
import renderer from 'react-test-renderer';

test("Button should accept text, type, style, onClick as props", () => {
	const component = renderer.create(
		<Button onClick={() => null} type={''} text={'TEST'} style={{}}/>
	)
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})