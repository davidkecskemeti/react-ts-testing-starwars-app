import { PeopleListType } from "./types";

const URL = "https://swapi.dev/api/people";

export async function baseFetch(
  url: string,
  options = {}
): Promise<PeopleListType> {
  const response = await fetch(url, options);
  return await response.json();
}

export const getStarWars = async () => baseFetch(URL);
