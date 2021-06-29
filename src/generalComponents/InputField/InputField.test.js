import InputField from './index';
import styles from './InputField.module.sass';
import {shallow, mount} from 'enzyme';
import React from 'react';

describe('InputField check tests', () => {
    it('renders input', () => {
        const props = {
            value: '',
            set: (e) => {props.value = e.target.value},
            placeholder: 'renderer',
        };
        const wrapper = shallow(<InputField {...props} />);
        console.log(wrapper.find('inputField'));

        expect(wrapper.find('.inputField')).to.equal('');
        // expect(wrapper.props('placeholder')).toBe('renderer');
    });
});