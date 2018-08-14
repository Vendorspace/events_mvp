import React from 'react';

import { shallow } from 'enzyme';


import { Login } from '../auth/Login';

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