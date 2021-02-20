import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CustomUseFetch, ResultProps } from "./CustomUseFetch";
import ListCharacters from "./ListCharacters";

jest.mock("./CustomUseFetch.tsx");

describe("list characters", () => {
  it("loading state", () => {
    (CustomUseFetch as jest.MockedFunction<() => ResultProps>).mockReturnValue({
      loading: true,
      data: { results: [] },
    });

    const { container } = render(<ListCharacters onChange={() => {}} />);

    expect(CustomUseFetch).toHaveBeenCalled();
    expect(container).toHaveTextContent("Loading");
  });

  it("lists three", () => {
    (CustomUseFetch as jest.MockedFunction<() => ResultProps>).mockReturnValue({
      loading: false,
      data: {
        results: [
          {
            name: "Luke Skywalker",
          },
          {
            name: "C-3PO",
          },
          {
            name: "Darth Vader",
          },
        ],
      },
    });

    const { container } = render(<ListCharacters onChange={() => {}} />);

    expect(CustomUseFetch).toHaveBeenCalled();
    expect(CustomUseFetch).toHaveBeenCalledTimes(1);
    expect(container).toHaveTextContent("Luke Skywalker");
  });

  it("select a different character to get details", () => {
    (CustomUseFetch as jest.MockedFunction<() => ResultProps>).mockReturnValue({
      loading: false,
      data: {
        results: [
          {
            name: "Luke Skywalker",
            height: "177",
          },
          {
            name: "C-3PO",
            height: "169",
          },
          {
            name: "Darth Vader",
            height: "201",
          },
        ],
      },
    });
    const handleNewCharacter = jest.fn();

    const { getByRole } = render(
      <ListCharacters onChange={handleNewCharacter} />
    );

    fireEvent.change(getByRole("character-select"), {
      target: {
        value: 2,
      },
    });

    expect(handleNewCharacter).toBeCalledWith({
      name: "Darth Vader",
      height: "201",
    });
  });
});
