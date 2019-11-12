import React from 'react'
import InputText from './InputText'
import renderer from 'react-test-renderer'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test('Input should accept default or shadow as type', () => {
  const defaultInput = renderer.create(<InputText />).toJSON()

  expect(defaultInput).toMatchSnapshot()
})

test('Input value should change when user type', () => {
  const wrapper = shallow(<InputText />)
  wrapper.find('input').simulate('change', {target:{value: 'Test 1'}})
  expect(wrapper.state('value')).toEqual('Test 1')
})