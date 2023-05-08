import { render, screen, waitFor } from "@testing-library/react";

import ModulesMenu, { Props } from "../components/UI/ModulesMenu";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => ({
    navigate: mockedNavigate,
  }),
}));

describe("<ModulesMenu />", () => {
  test("should render without crashing", () => {
    render(<ModulesMenu />);
    const element = screen.findByText("Registros");
    waitFor(() => expect(element).toBeInTheDocument());
  });
});
