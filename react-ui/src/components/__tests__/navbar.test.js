import React from "react";

import { shallow } from "enzyme";


import { Navbar } from "../layout/Navbar";

describe("<Navbar />", () => {
  it("should shallow render", () => {
    const props = {
      auth: {
        user: {
          avatar: "test"
        }
      },
      logoutUser: jest.fn()
    };
    const Wrapper = shallow(<Navbar {...props} />);
    expect(Wrapper);
  });
});
