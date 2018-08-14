import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { Login } from './react-ui/src/components/auth/Login';

describe ('<Login />', () => {
    it('should shallow render', () => {
        const props = {
            auth: {user: {
                avatar: 'test'
            }},
            logoutUser: jest.fn(),
            errors: {test: 'test'}
        }
        const Wrapper = shallow(<Login {...props} />)
        expect(Wrapper)
    })
})