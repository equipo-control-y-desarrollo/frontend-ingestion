import React from "react";
import { render, screen } from "@testing-library/react";

import MenuTab, { Props } from "../components/UI/MenuTab";

describe("<MenuTab />", () => {
  test("should render without crashing", () => {
    const props: Props = {
      name: "test",
      id: "test",
    };
    render(<MenuTab {...props} />);
    const element = screen.getByText("test");
    expect(element).toBeInTheDocument();
  });

  test("should render with correct props", () => {
    const props: Props = {
      name: "test",
      id: "test",
    };
    render(<MenuTab {...props} />);
    const element = screen.getByText("test");
    expect(element).toHaveTextContent("test");
  });
});
