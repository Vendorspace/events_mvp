import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { Navbar } from '../layout/Navbar'

describe ('<Navbar />', () => {
    it('should shallow render', () => {
        const props = {
            auth: {user: {
                avatar: 'test'
            }},
            logoutUser: jest.fn()
        }
        const Wrapper = shallow(<Navbar {...props} />)
        expect(Wrapper)
    })
})