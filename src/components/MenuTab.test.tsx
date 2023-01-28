/* eslint-disable testing-library/prefer-screen-queries */

import react from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MenuTab from "./MenuTab";

test("MenuTab renders correctly", () => {
    const view = render(<MenuTab name="test" id="2" />);
    console.log(view);
    view.getByText("test");
});
