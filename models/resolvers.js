import { characters, spells } from '../data/data.js';

const resolvers = {
  Query: {
    character: (parent, args) => characters.find(character => character.id === args.id),
    characters: () => characters,
    spell: (parent, args) => spells.find(spell => spell.id === args.id),
    spells: () => spells
  },
  Character: {
    favoriteSpells: (character) => character.favoriteSpells.map(spellId => spells.find(spell => spell.id === spellId)),
    friends: (character) => character.friends.map(friend => {
      const friendCharacter = characters.find(c => c.id === friend.character.id);
      if (friendCharacter) {
        return {
          id: friend.character.id,
          relationshipType: friend.relationshipType,
          character: {
            id: friendCharacter.id,
            firstName: friendCharacter.firstName,
            lastName: friendCharacter.lastName,
            fullName: friendCharacter.fullName
          }
        };
      } else {
        return null;
      }
    }).filter(friend => friend !== null),
    enemies: (character) => character.enemies.map(enemy => {
      const enemyCharacter = characters.find(c => c.id === enemy.character.id);
      if (enemyCharacter) {
        return {
          id: enemy.character.id,
          relationshipType: enemy.relationshipType,
          character: {
            id: enemyCharacter.id,
            firstName: enemyCharacter.firstName,
            lastName: enemyCharacter.lastName,
            fullName: enemyCharacter.fullName
          }
        };
      } else {
        return null;
      }
    }).filter(enemy => enemy !== null)
  }
};

export default resolvers;