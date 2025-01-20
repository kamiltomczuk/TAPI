import { spells, creatures, characters } from "../data/data.js";

export const getNextId = (collection) => {
  if (collection.length === 0) return "1";
  const maxId = Math.max(...collection.map((item) => parseInt(item.id)));
  return (maxId + 1).toString();
};

export const formatCharacterRelationships = (character) => {
  const favoriteSpells =
    character.favoriteSpells?.map((spellId) =>
      spells.find((spell) => spell.id === spellId)
    ) || [];

  const formatCreatures = (relatedCharacter) => {
    if (!relatedCharacter?.magicalCreatures) return [];

    return relatedCharacter.magicalCreatures
      .map((creatureRel) => {
        const creature = creatures.find(
          (c) => c.id === creatureRel.creature?.id
        );
        if (creature) {
          return {
            id: creature.id,
            name: creature.name,
            species: creature.species,
            relationshipType: creatureRel.relationshipType,
            details: creatureRel.details,
            link: `/creatures/${creature.id}`,
          };
        }
        return null;
      })
      .filter((creature) => creature !== null);
  };

  const formatRelationships = (relationships = []) => {
    return relationships
      .map((relation) => {
        const relatedCharacter = characters.find(
          (c) => c.id === relation.character?.id
        );
        if (relatedCharacter) {
          return {
            id: relation.character.id,
            firstName: relatedCharacter.firstName,
            lastName: relatedCharacter.lastName,
            fullName: relatedCharacter.fullName,
            relationshipType: relation.relationshipType,
            link: `/character/${relation.character.id}`,
            magicalCreatures: formatCreatures(relatedCharacter),
          };
        }
        return null;
      })
      .filter((rel) => rel !== null);
  };

  const friends = formatRelationships(character.friends);
  const enemies = formatRelationships(character.enemies);
  const magicalCreatures = formatCreatures(character);

  return {
    id: character.id,
    ...character,
    favoriteSpells,
    friends,
    enemies,
    magicalCreatures,
  };
};
