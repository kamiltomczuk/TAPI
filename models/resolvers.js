import { characters, spells, creatures } from '../data/data.js';
import { DateScalar } from '../customScalars.js';


const applyFilters = (collection, filter) => {
  if (!filter) return collection;

  return collection.filter(item => {
    return Object.entries(filter).every(([key, filterValue]) => {
      if (!filterValue) return true;
      
      if (filterValue.eq !== undefined) {
        return item[key] === filterValue.eq;
      }
      if (filterValue.contains !== undefined) {
        return item[key].includes(filterValue.contains);
      }
      if (filterValue.notEq !== undefined) {
        return item[key] !== filterValue.notEq;
      }
      if (filterValue.notContains !== undefined) {
        return !item[key].includes(filterValue.notContains);
      }
      if (filterValue.gt !== undefined) {
        return item[key] > filterValue.gt;
      }
      if (filterValue.lt !== undefined) {
        return item[key] < filterValue.lt;
      }
      if (filterValue.gte !== undefined) {
        return item[key] >= filterValue.gte;
      }
      if (filterValue.lte !== undefined) {
        return item[key] <= filterValue.lte;
      }
      
      return item[key] === filterValue;
    });
  });
};


const applySorting = (collection, sort) => {
  if (!sort) return collection;

  return [...collection].sort((a, b) => {
    const aVal = a[sort.field];
    const bVal = b[sort.field];
    const order = sort.order === 'DESC' ? -1 : 1;
    
    if (typeof aVal === 'string') {
      return aVal.localeCompare(bVal) * order;
    }
    return (aVal - bVal) * order;
  });
};

const applyPagination = (collection, page, pageSize) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return collection.slice(start, end);
};

const createConnection = (items, page, pageSize, totalCount) => {
  return {
    edges: items.map(item => ({
      node: item,
      cursor: Buffer.from(item.id.toString()).toString('base64'),
    })),
    pageInfo: {
      hasNextPage: page * pageSize < totalCount,
      hasPreviousPage: page > 1,
      startCursor: items[0] ? Buffer.from(items[0].id.toString()).toString('base64') : null,
      endCursor: items[items.length - 1] 
        ? Buffer.from(items[items.length - 1].id.toString()).toString('base64') 
        : null,
    },
    totalCount,
  };
};

const resolvers = {
  Date: DateScalar,

  Query: {
    // Character resolvers
    character: (_, { id }) => characters.find(c => c.id === id),
    characters: (_, { filter, sort, page, pageSize }) => {
      let result = applyFilters(characters, filter);
      result = applySorting(result, sort);
      const totalCount = result.length;
      result = applyPagination(result, page, pageSize);
      return createConnection(result, page, pageSize, totalCount);
    },

    // Spell resolvers
    spell: (_, { id }) => spells.find(s => s.id === id),
    spells: (_, { filter, sort, page, pageSize }) => {
      let result = applyFilters(spells, filter);
      result = applySorting(result, sort);
      const totalCount = result.length;
      result = applyPagination(result, page, pageSize);
      return createConnection(result, page, pageSize, totalCount);
    },

    // Creature resolvers
    creature: (_, { id }) => creatures.find(c => c.id === id),
    creatures: (_, { filter, sort, page, pageSize }) => {
      let result = applyFilters(creatures, filter);
      result = applySorting(result, sort);
      const totalCount = result.length;
      result = applyPagination(result, page, pageSize);
      return createConnection(result, page, pageSize, totalCount);
    },
  },

  Mutation: {
    // Character mutations
    createCharacter: (_, { character }) => {
      const newCharacter = { id: String(characters.length + 1), ...character };
      characters.push(newCharacter);
      return newCharacter;
    },
    updateCharacter: (_, { id, character }) => {
      const index = characters.findIndex(c => c.id === id);
      if (index === -1) return null;
      characters[index] = { ...characters[index], ...character };
      return characters[index];
    },
    deleteCharacter: (_, { id }) => {
      const index = characters.findIndex(c => c.id === id);
      if (index === -1) return false;
      characters.splice(index, 1);
      return true;
    },

    // Creature mutations
    createCreature: (_, { creature }) => {
      const newCreature = { id: String(creatures.length + 1), ...creature };
      creatures.push(newCreature);
      return newCreature;
    },
    updateCreature: (_, { id, creature }) => {
      const index = creatures.findIndex(c => c.id === id);
      if (index === -1) return null;
      creatures[index] = { ...creatures[index], ...creature };
      return creatures[index];
    },
    deleteCreature: (_, { id }) => {
      const index = creatures.findIndex(c => c.id === id);
      if (index === -1) return false;
      creatures.splice(index, 1);
      return true;
    },

    // Spell mutations
    createSpell: (_, { spell }) => {
      const newSpell = { id: String(spells.length + 1), ...spell };
      spells.push(newSpell);
      return newSpell;
    },
    updateSpell: (_, { id, spell }) => {
      const index = spells.findIndex(s => s.id === id);
      if (index === -1) return null;
      spells[index] = { ...spells[index], ...spell };
      return spells[index];
    },
    deleteSpell: (_, { id }) => {
      const index = spells.findIndex(s => s.id === id);
      if (index === -1) return false;
      spells.splice(index, 1);
      return true;
    },
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
            fullName: friendCharacter.fullName,
            link: `/character/${friendCharacter.id}`
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
            fullName: enemyCharacter.fullName,
            link: `/character/${enemyCharacter.id}`
          }
        };
      } else {
        return null;
      }
    }).filter(enemy => enemy !== null),
    magicalCreatures: (character) => {
      if (!character.magicalCreatures) return [];
      
      return character.magicalCreatures.map(relation => {
        const creature = creatures.find(c => c.id === relation.creature.id);
        if (!creature) return null;
        
        return {
          relationshipType: relation.relationshipType,
          details: relation.details,
          creature: {
            id: creature.id,
            name: creature.name,
            species: creature.species,
            description: creature.description,
            dangerLevel: creature.dangerLevel,
            habitat: creature.habitat,
            abilities: creature.abilities,
            knownFor: creature.knownFor,
            isProtected: creature.isProtected,
            canTalk: creature.canTalk,
            alignment: creature.alignment
          }
        };
      }).filter(relation => relation !== null);
    }
  }
};

export default resolvers;