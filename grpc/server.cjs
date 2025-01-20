const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { characters, creatures, spells } = require("../data/data.js");

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
  callback(null, { characters });
}

function getCharacterById(call, callback) {
  const character = characters.find((c) => c.id === call.request.id);
  if (character) callback(null, character);
  else callback({ code: grpc.status.NOT_FOUND, message: "Character not found" });
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
  const newCharacter = { id: `${Date.now()}`, ...call.request };
  characters.push(newCharacter);
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
