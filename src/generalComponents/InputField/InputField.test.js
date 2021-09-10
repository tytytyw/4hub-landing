import React from 'react';
import InputField from './index';
import {mount} from 'enzyme';

describe('InputField check tests', () => {
    it('renders input', () => {
        const props = {
            value: '',
            // set: (e) => {props.value = e.target.value},
            // placeholder: 'renderer',
        };
        const wrapper = mount(<InputField {...props} />);
        console.log(wrapper.find('inputField'));

        // expect(wrapper.find('.inputField')).to.equal('');
        // expect(wrapper.props('placeholder')).toBe('renderer');
    });
});