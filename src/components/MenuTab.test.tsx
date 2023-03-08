import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import MenuTab from "./MenuTab";

describe("MenuTab", () => {
    test("MenuTab renders correctly", () => {
        const view = render(<MenuTab name="test" id="2" />);
        console.log(view);
    });
    
    test("Menu tab changes color background when clicked", () => {
        userEvent.click(screen.getByText("test"));
        expect(screen.getByText("test")).toHaveStyle("background-color: white");
        userEvent.click(screen.getByText("test"));
        expect(screen.getByText("test")).toHaveStyle("background-color: #00171F");
    });
});

