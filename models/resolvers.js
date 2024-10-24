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
      console.log(`Searching for friend with id: ${friend.character.id}`);
      const friendCharacter = characters.find(c => c.id === friend.character.id);
      if (friendCharacter) {
        console.log(`Found friend: ${friendCharacter.firstName} ${friendCharacter.lastName}`);
      } else {
        console.log(`Friend with id ${friend.character.id} not found`);
      }
      return {
        id: friend.character.id,
        relationshipType: friend.relationshipType,
        character: friendCharacter
      };
    }),
    enemies: (character) => character.enemies.map(enemy => {
      console.log(`Searching for enemy with id: ${enemy.character.id}`);
      const enemyCharacter = characters.find(c => c.id === enemy.character.id);
      if (enemyCharacter) {
        console.log(`Found enemy: ${enemyCharacter.firstName} ${enemyCharacter.lastName}`);
      } else {
        console.log(`Enemy with id ${enemy.character.id} not found`);
      }
      return {
        id: enemy.character.id,
        relationshipType: enemy.relationshipType,
        character: enemyCharacter
      };
    })
  }
};

export default resolvers;