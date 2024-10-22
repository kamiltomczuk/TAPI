import { characters, spells } from '../data/data.js';

const resolvers = {
  Query: {
    character: (parent, args) => characters.find(character => character.id === args.id),
    characters: () => characters,
    spell: (parent, args) => spells.find(spell => spell.id === args.id),
    spells: () => spells
  },
  Character: {
    favoriteSpells: (character) => character.favoriteSpells.map(spellId => spells.find(spell => spell.id === spellId))
  }
};

export default resolvers;