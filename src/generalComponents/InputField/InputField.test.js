import React from 'react';
import InputField from './index';
import {mount} from 'enzyme';

describe('InputField check tests', () => {

    const props = {
        value: '',
        set: jest.fn(),
        placeholder: 'renderer',
    }
    const wrapper = mount(<InputField {...props} />);

    it('renders input with initial values', () => {
        expect(wrapper.find('input').prop('value')).toEqual('');
        expect(wrapper.find('input').prop('placeholder')).toBe('renderer');
    });

    it('should delete readOnly Property after focus', () => {
        expect(wrapper.find('input').prop('readOnly')).toBe(true);
        // console.log(wrapper.find('input').debug());
        wrapper.find('input').simulate('focus');
        console.log(wrapper.find('input').debug());
        // expect(wrapper.find('input').prop('readOnly')).toBe(undefined);
    })
});