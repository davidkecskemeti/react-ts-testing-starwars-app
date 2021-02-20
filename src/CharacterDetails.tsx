import React, { useState } from "react";
import ListCharacters from "./ListCharacters";
import { PeopleType } from "./types";

const CharacterDetails: React.FC = () => {
  const [character, setCharacter] = useState<PeopleType | undefined>(undefined);
  const charProps = character && Object.entries(character);

  return (
    <div>
      Characters <ListCharacters onChange={setCharacter} />
      {charProps &&
        charProps.map(([key, value]) => {
          if (typeof value === "string")
            return (
              <p key={key}>
                {key}: {value}
              </p>
            );
          return null;
        })}
    </div>
  );
};

export default CharacterDetails;
