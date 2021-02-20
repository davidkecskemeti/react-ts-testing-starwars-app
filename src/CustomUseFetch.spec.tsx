import { CustomUseFetch, ResultProps } from "./CustomUseFetch";
import { renderHook } from "@testing-library/react-hooks";
import { render, waitFor } from "@testing-library/react";
import { getStarWars } from "./StarWarsService";
import { act } from "react-dom/test-utils";
import React from "react";
import ReactDOM from "react-dom";
import CharacterDetails from "./CharacterDetails";
import { PeopleListType } from "./types";
import ListCharacters from "./ListCharacters";

jest.mock("./StarWarsService.ts");

describe("CustomerUseFetch", () => {
  it("initial data state is loading and data empty", async () => {
    await act(async () => {
      const { result } = renderHook(() => CustomUseFetch());
      await expect(result.current).toStrictEqual({
        loading: true,
        data: { results: [] },
      });
    });
  });

  it("data is fetched and not loading", async () => {
    await act(async () => {
      const getStarWarsMock = getStarWars as jest.MockedFunction<
        () => Promise<PeopleListType>
      >;

      const starWarsFakeData = new Promise<PeopleListType>((resolve) => {
        resolve({ results: [{ name: "Luke Skywalker" }] });
      });

      getStarWarsMock.mockReturnValue(starWarsFakeData);

      const { container } = render(<CharacterDetails />);

      await waitFor(() => {
        expect(getStarWars).toHaveBeenCalled();
        expect(getStarWars).toHaveBeenCalledTimes(1);
        expect(container).toHaveTextContent("Luke Skywalker");
      });
    });
  });
});
