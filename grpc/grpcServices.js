const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Path to .proto file
const PROTO_PATH = "./grpc/tapiService.proto";

// Load .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const tapiProto = grpc.loadPackageDefinition(packageDefinition).tapi;

// CharacterService Implementation
function getAllCharacters(call, callback) {
  const formattedCharacters = characters.map(char => {
    // Znajdź pełne obiekty zaklęć
    const fullSpells = (char.favoriteSpells || []).map(spellId => {
      const spell = spells.find(s => s.id === spellId);
      return spell ? {
        id: spell.id,
        name: spell.name,
        type: spell.type,
        description: spell.description,
        level: spell.level,
        effect: spell.effect
      } : null;
    }).filter(Boolean);

    // Znajdź pełne obiekty stworzeń
    const fullCreatures = char.magicalCreatures.map(rel => {
      const creature = creatures.find(c => c.id === rel.creature.id);
      return creature ? {
        id: creature.id,
        name: creature.name,
        species: creature.species,
        relationshipType: rel.relationshipType,
        details: rel.details,
        link: `/creatures/${creature.id}`
      } : null;
    }).filter(Boolean);

    // Znajdź pełne obiekty przyjaciół
    const fullFriends = char.friends.map(rel => {
      const friend = characters.find(c => c.id === rel.character.id);
      if (!friend) return null;

      const friendCreatures = friend.magicalCreatures.map(mcRel => {
        const creature = creatures.find(c => c.id === mcRel.creature.id);
        return creature ? {
          id: creature.id,
          name: creature.name,
          species: creature.species,
          relationshipType: mcRel.relationshipType,
          details: mcRel.details,
          link: `/creatures/${creature.id}`
        } : null;
      }).filter(Boolean);

      return {
        id: friend.id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        fullName: friend.fullName,
        relationshipType: rel.relationshipType,
        link: `/characters/${friend.id}`,
        magicalCreatures: friendCreatures
      };
    }).filter(Boolean);


    // Znajdź pełne obiekty wrogów
    const fullEnemies = char.enemies.map(rel => {
      const enemy = characters.find(c => c.id === rel.character.id);
      if (!enemy) return null;

      const enemyCreatures = enemy.magicalCreatures.map(mcRel => {
        const creature = creatures.find(c => c.id === mcRel.creature.id);
        return creature ? {
          id: creature.id,
          name: creature.name,
          species: creature.species,
          relationshipType: mcRel.relationshipType,
          details: mcRel.details,
          link: `/creatures/${creature.id}`
        } : null;
      }).filter(Boolean);

      return {
        id: enemy.id,
        firstName: enemy.firstName,
        lastName: enemy.lastName,
        fullName: enemy.fullName,
        relationshipType: rel.relationshipType,
        link: `/characters/${enemy.id}`,
        magicalCreatures: enemyCreatures
      };
    }).filter(Boolean);

    return {
      ...char,
      id: char.id,
      firstName: char.firstName,
      lastName: char.lastName,
      fullName: char.fullName,
      house: char.house,
      bloodStatus: char.bloodStatus,
      wand: char.wand,
      patronus: char.patronus,
      isDeathEater: char.isDeathEater,
      isOrderMember: char.isOrderMember,
      role: char.role,
      birthDate: char.birthDate,
      deathDate: char.deathDate || "",
      ancestry: char.ancestry,
      skills: char.skills,
      magicalCreatures: fullCreatures,
      friends: fullFriends,
      enemies: fullEnemies,
      notableEvents: char.notableEvents,
      favoriteSpells: fullSpells,
      affiliations: char.affiliations,
      quotes: char.quotes
    };
  });

  callback(null, { characters: formattedCharacters });
}

function getCharacterById(call, callback) {
  const character = characters.find(c => c.id === call.request.id);
  if (!character) {
    callback({ code: grpc.status.NOT_FOUND, message: "Character not found" });
    return;
  }

  const formattedCharacter = {
    ...character,
    favoriteSpells: character.favoriteSpells.map(spellId => {
      const spell = spells.find(s => s.id === spellId);
      return spell || null;
    }).filter(Boolean),
    magicalCreatures: character.magicalCreatures.map(rel => {
      const creature = creatures.find(c => c.id === rel.creature?.id);
      return creature ? {
        id: creature.id,
        name: creature.name,
        species: creature.species,
        relationshipType: rel.relationshipType,
        details: rel.details,
        link: `/creatures/${creature.id}`
      } : null;
    }).filter(Boolean),
    friends: character.friends.map(rel => {
      const friend = characters.find(c => c.id === rel.character?.id);
      return friend ? {
        id: friend.id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        fullName: friend.fullName,
        relationshipType: rel.relationshipType,
        link: `/characters/${friend.id}`,
        magicalCreatures: friend.magicalCreatures.map(mcRel => {
          const mc = creatures.find(c => c.id === mcRel.creature?.id);
          return mc ? {
            id: mc.id,
            name: mc.name,
            species: mc.species,
            relationshipType: mcRel.relationshipType,
            details: mcRel.details,
            link: `/creatures/${mc.id}`
          } : null;
        }).filter(Boolean)
      } : null;
    }).filter(Boolean),
    enemies: character.enemies.map(rel => {
      const enemy = characters.find(c => c.id === rel.character?.id);
      return enemy ? {
        id: enemy.id,
        firstName: enemy.firstName,
        lastName: enemy.lastName,
        fullName: enemy.fullName,
        relationshipType: rel.relationshipType,
        link: `/characters/${enemy.id}`,
        magicalCreatures: enemy.magicalCreatures.map(mcRel => {
          const mc = creatures.find(c => c.id === mcRel.creature?.id);
          return mc ? {
            id: mc.id,
            name: mc.name,
            species: mc.species,
            relationshipType: mcRel.relationshipType,
            details: mcRel.details,
            link: `/creatures/${mc.id}`
          } : null;
        }).filter(Boolean)
      } : null;
    }).filter(Boolean)
  };
  callback(null, formattedCharacter);
}

function searchCharacters(call, callback) {
  const { name, house, role } = call.request;
  let filteredCharacters = [...characters];

  if (name) {
    filteredCharacters = filteredCharacters.filter((c) =>
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (house) {
    filteredCharacters = filteredCharacters.filter((c) =>
      c.house?.toLowerCase() === house.toLowerCase()
    );
  }
  if (role) {
    filteredCharacters = filteredCharacters.filter((c) =>
      c.role?.toLowerCase() === role.toLowerCase()
    );
  }

  callback(null, { characters: filteredCharacters });
}

function createCharacter(call, callback) {
  const spellIds = call.request.favoriteSpells || [];
  
  // Mapuj ID zaklęć na pełne obiekty Spell
  const spellObjects = spellIds.map(spellId => {
    const spell = spells.find(s => s.id === spellId);
    if (!spell) return null;
    return {
      id: spell.id,
      name: spell.name,
      type: spell.type,
      description: spell.description,
      level: spell.level,
      effect: spell.effect
    };
  }).filter(Boolean);

  const newCharacter = {
    id: `${Date.now()}`,
    ...call.request,
    favoriteSpells: spellObjects  // Używamy pełnych obiektów Spell
  };

  // W bazie przechowujemy tylko ID
  const characterForDb = {
    ...newCharacter,
    favoriteSpells: spellIds
  };
  
  characters.push(characterForDb);
  callback(null, newCharacter);
}

function updateCharacter(call, callback) {
  const characterIndex = characters.findIndex((c) => c.id === call.request.id);
  if (characterIndex === -1) {
    callback({ code: grpc.status.NOT_FOUND, message: "Character not found" });
    return;
  }

  characters[characterIndex] = { ...characters[characterIndex], ...call.request };
  callback(null, characters[characterIndex]);
}

function deleteCharacter(call, callback) {
  const characterIndex = characters.findIndex((c) => c.id === call.request.id);
  if (characterIndex === -1) {
    callback({ code: grpc.status.NOT_FOUND, message: "Character not found" });
    return;
  }

  characters.splice(characterIndex, 1);
  callback(null, {});
}

function patchCharacter(call, callback) {
  const characterIndex = characters.findIndex((c) => c.id === call.request.id);
  if (characterIndex === -1) {
    callback({ code: grpc.status.NOT_FOUND, message: "Character not found" });
    return;
  }

  const patchedCharacter = { ...characters[characterIndex], ...call.request };
  characters[characterIndex] = patchedCharacter;
  callback(null, patchedCharacter);
}

// Additional Character Methods
function getCharacterRelationships(call, callback) {
  const { id } = call.request;
  const character = characters.find((c) => c.id === id);
  if (!character) {
    callback({ code: grpc.status.NOT_FOUND, message: "Character not found" });
    return;
  }

  const relationships = character.friends.map((friend) => ({
    id: friend.id,
    type: "FRIEND",
    details: "",
  }));
  callback(null, { relationships });
}

// CreatureService Implementation
function getAllCreatures(call, callback) {
  callback(null, { creatures });
}

function getCreatureById(call, callback) {
  const creature = creatures.find((c) => c.id === call.request.id);
  if (creature) callback(null, creature);
  else callback({ code: grpc.status.NOT_FOUND, message: "Creature not found" });
}

function searchCreatures(call, callback) {
  const { species, dangerLevel, alignment } = call.request;
  let filteredCreatures = [...creatures];

  if (species) {
    filteredCreatures = filteredCreatures.filter((creature) =>
      creature.species?.toLowerCase().includes(species.toLowerCase())
    );
  }
  if (dangerLevel) {
    filteredCreatures = filteredCreatures.filter(
      (creature) => creature.dangerLevel === dangerLevel
    );
  }
  if (alignment) {
    filteredCreatures = filteredCreatures.filter(
      (creature) => creature.alignment === alignment
    );
  }

  callback(null, { creatures: filteredCreatures });
}

function createCreature(call, callback) {
  const newCreature = { id: `${Date.now()}`, ...call.request };
  creatures.push(newCreature);
  callback(null, newCreature);
}

// SpellService Implementation
function getAllSpells(call, callback) {
  callback(null, { spells });
}

function searchSpells(call, callback) {
  const { name, effect } = call.request;
  let filteredSpells = [...spells];

  if (name) {
    filteredSpells = filteredSpells.filter((spell) =>
      spell.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (effect) {
    filteredSpells = filteredSpells.filter((spell) =>
      spell.effect?.toLowerCase().includes(effect.toLowerCase())
    );
  }

  callback(null, { spells: filteredSpells });
}

// Server Setup
function main() {
  const server = new grpc.Server();

  server.addService(tapiProto.CharacterService.service, {
    GetAllCharacters: getAllCharacters,
    GetCharacterById: getCharacterById,
    SearchCharacters: searchCharacters,
    CreateCharacter: createCharacter,
    UpdateCharacter: updateCharacter,
    DeleteCharacter: deleteCharacter,
    PatchCharacter: patchCharacter,
  });

  server.addService(tapiProto.CreatureService.service, {
    GetAllCreatures: getAllCreatures,
    GetCreatureById: getCreatureById,
    SearchCreatures: searchCreatures,
    CreateCreature: createCreature,
  });

  server.addService(tapiProto.SpellService.service, {
    GetAllSpells: getAllSpells,
    SearchSpells: searchSpells,
  });

  server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error("Failed to bind server:", err);
      return;
    }
    console.log(`Server running at http://127.0.0.1:${port}`);
  });
}

main();
