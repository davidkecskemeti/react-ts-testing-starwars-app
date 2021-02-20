import { CustomUseFetch } from "./CustomUseFetch";
import { PeopleType } from "./types";

export interface ListCharactersProps {
  onChange: (value: PeopleType | undefined) => void;
}

const ListCharacters: React.FC<ListCharactersProps> = ({ onChange }) => {
  const { loading, data } = CustomUseFetch();

  function selectedCharacter(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange(data.results[Number(e.target.value)]);
  }

  return (
    <select role="character-select" onChange={selectedCharacter}>
      {!loading &&
        data?.results.map((character, i: number) => (
          <option value={i} key={character.name}>
            {character.name}
          </option>
        ))}
      {loading && <option>Loading ...</option>}
    </select>
  );
};

export default ListCharacters;
