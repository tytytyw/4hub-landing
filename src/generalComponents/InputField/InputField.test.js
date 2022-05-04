import React from "react";
import { mount } from "enzyme";
import InputField from "./index";

describe("InputField check tests", () => {
  const props = {
    value: "",
    set: jest.fn(),
    placeholder: "renderer"
  };
  const wrapper = mount(<InputField {...props} />);
  const input = wrapper.find("input");

  it("renders input with initial values", () => {
    expect(input.prop("value")).toEqual("");
    expect(input.prop("placeholder")).toBe("renderer");
  });

  it("should delete readOnly Property after focus", () => {
    expect(input.prop("readOnly")).toBe(true);
    // console.log(wrapper.find('input').debug());
    // jest.spyOn(input, 'focus');
    input.simulate("focus");
    // console.log(wrapper.debug());
    // expect(wrapper.find('input').prop('readOnly')).toBe(undefined);
  });
});
