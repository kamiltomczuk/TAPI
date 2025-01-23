import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { fileURLToPath } from 'url';
import path from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, 'tapiService.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const tapiProto = grpc.loadPackageDefinition(packageDefinition).tapi;

// Tworzymy klienta dla każdego serwisu
const characterClient = new tapiProto.CharacterService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const creatureClient = new tapiProto.CreatureService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const spellClient = new tapiProto.SpellService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Przykładowe testy
console.log('Testing Character Service:');
characterClient.getAllCharacters({}, (error, response) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('All characters:', JSON.stringify(response, null, 2));
});

characterClient.searchCharacters({ house: 'Gryffindor' }, (error, response) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Gryffindor characters:', JSON.stringify(response, null, 2));
});

console.log('\nTesting Creature Service:');
creatureClient.getAllCreatures({}, (error, response) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('All creatures:', JSON.stringify(response, null, 2));
});

console.log('\nTesting Spell Service:');
spellClient.getAllSpells({}, (error, response) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('All spells:', JSON.stringify(response, null, 2));
});

// Test tworzenia nowego charakteru
const newCharacter = {
    firstName: "Luna",
    lastName: "Lovegood",
    fullName: "Luna Lovegood",
    house: "Ravenclaw",
    bloodStatus: "PURE_BLOOD",
    wand: {
      wood: "Unknown",
      core: "Unknown",
      length: 0,
      flexibility: "Unknown"
    },
    patronus: "Hare",
    isDeathEater: false,
    isOrderMember: false,
    role: "STUDENT",
    birthDate: "1981-02-13",
    deathDate: null,
    ancestry: "Pure-blood",
    skills: [{
      name: "Charms",
      description: "Exceptional at charms",
      proficiency: "ADVANCED"
    }],
    magicalCreatures: [{
      creature: { id: "2", type: "CREATURE" },
      relationshipType: "FRIEND",
      details: "Helped rescue from Malfoy Manor"
    }],
    friends: [{
      character: { id: "1" },
      relationshipType: "Friend"
    }],
    enemies: [],
    notableEvents: [{
      name: "Battle of the Department of Mysteries",
      date: "1996-06-18",
      description: "Fought alongside Harry Potter"
    }],
    favoriteSpells: ["1", "2"], // Tylko ID zaklęć
    affiliations: [{
      name: "Dumbledore's Army",
      role: "Member",
      description: "Original member"
    }],
    quotes: [{
      text: "You're just as sane as I am.",
      situation: "To Harry Potter"
    }]
  };

characterClient.createCharacter(newCharacter, (error, response) => {
  if (error) {
    console.error('Error creating character:', error);
    return;
  }
  console.log('Created character:', response);
  
  // Po utworzeniu, pobierz character by ID
  characterClient.getCharacterById({ id: response.id }, (error, character) => {
    if (error) {
      console.error('Error getting character:', error);
      return;
    }
    console.log('Retrieved created character:', character);
  });
});