import React from "react";
import { shallow } from "enzyme";
import { Header } from "../../components/Header";

let startLogout, wrapper;

beforeEach(() => {
  startLogout = jest.fn();
  wrapper = shallow(<Header startLogout={startLogout} />);
});

test("should render Header correcly", () => {
  // startLogout = jest.fn();
  // const wrapper = shallow(<Header startLogout={startLogout} />);
  expect(wrapper).toMatchSnapshot();

  //expect(wrapper.find("h1").length).toBe(1);
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test("should call startLogout on button click", () => {
  wrapper.find("button").simulate("click");
  expect(startLogout).toHaveBeenCalled();
});
