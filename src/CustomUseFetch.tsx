import { useState, useEffect } from "react";
import { getStarWars } from "./StarWarsService";
import { PeopleListType } from "./types";

interface ResultProps {
  loading: boolean;
  data: PeopleListType;
}
export function CustomUseFetch() {
  const [result, setResult] = useState<ResultProps>({
    loading: true,
    data: { results: [] },
  });

  async function fetchData() {
    const data = await getStarWars();
    console.log(data);

    setResult({ loading: false, data });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return result;
}
