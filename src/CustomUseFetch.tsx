import { useState, useEffect } from "react";
import { getStarWars } from "./StarWarsService";
import { PeopleListType } from "./types";

export interface ResultProps {
  loading: boolean;
  data: PeopleListType;
}
export function CustomUseFetch(): ResultProps {
  const [result, setResult] = useState<ResultProps>({
    loading: true,
    data: { results: [] },
  });

  async function fetchData() {
    const data = await getStarWars();
    setResult({ loading: false, data });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return result;
}
