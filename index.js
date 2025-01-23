import express from "express";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { specifiedRules } from "graphql";
import cors from "cors"; // For handling CORS
import morgan from "morgan"; // For logging
import helmet from "helmet"; // For security headers
import rateLimit from "express-rate-limit"; // For rate limiting
import characterSchema from "./models/characterModel.js";
import spellSchema from "./models/spellModel.js";
import creatureSchema from "./models/creatureModel.js";
import resolvers from "./models/resolvers.js";
import { validateFriendEnemyCharacterFields } from "./validationRules.js";
import characterRoutes from "./routes/characterRoutes.js";
import spellRoutes from "./routes/spellRoutes.js";
import creatureRoutes from "./routes/creatureRoutes.js";
import { fileURLToPath } from 'url';
import path from 'path';
import protoLoader from '@grpc/proto-loader';
import grpc from '@grpc/grpc-js';
import { characters, creatures, spells } from './data/data.js';  // Dodaj ten import


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.resolve(__dirname, 'grpc/tapiService.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const tapiProto = grpc.loadPackageDefinition(packageDefinition).tapi;

const typeDefs = `
  scalar Date
  
  ${characterSchema}
  ${spellSchema}
  ${creatureSchema}
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
};

// Request validation middleware
const validateRequest = (req, res, next) => {
  // Validate Content-Type for POST and PUT requests
  if (
    (req.method === "POST" || req.method === "PUT") &&
    !req.is("application/json")
  ) {
    return res
      .status(415)
      .json({ error: "Content-Type must be application/json" });
  }
  next();
};

// Logging middleware for debugging
const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};


const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Request logging
app.use(express.json({ limit: "10mb" })); // Body parsing with size limit
app.use(express.urlencoded({ extended: true }));
app.use(limiter); // Rate limiting
app.use(requestLogger); // Custom request logging
app.use(validateRequest); // Request validation
app.use(errorHandler);

app.use("/characters", characterRoutes);
app.use("/spells", spellRoutes);
app.use("/creatures", creatureRoutes);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    validationRules: [...specifiedRules, validateFriendEnemyCharacterFields],
  })
);

const grpcServer = new grpc.Server();

grpcServer.addService(tapiProto.CharacterService.service, {
  getAllCharacters: (call, callback) => {
    const formattedCharacters = characters.map(char => ({
      id: char.id,
      firstName: char.firstName || '',
      lastName: char.lastName || '',
      fullName: char.fullName || `${char.firstName} ${char.lastName}`,
      house: char.house || '',
      bloodStatus: char.bloodStatus || '',
      wand: char.wand || '',
      patronus: char.patronus || '',
      isDeathEater: char.isDeathEater || false,
      isOrderMember: char.isOrderMember || false,
      role: char.role || '',
      birthDate: char.birthDate || '',
      deathDate: char.deathDate || '',
      ancestry: char.ancestry || '',
      skills: char.skills || [],
      magicalCreatures: char.magicalCreatures || [],
      friends: char.friends || [],
      enemies: char.enemies || [],
      notableEvents: char.notableEvents || [],
      avoriteSpells: (char.favoriteSpells || []).map(spellId => 
        spells.find(spell => spell.id === spellId) || { id: spellId, name: 'Unknown Spell' }
      ),
      affiliations: char.affiliations || [],
      quotes: char.quotes || []
    }));
    callback(null, { characters: formattedCharacters });
  },
  getCharacterById: (call, callback) => {
    const character = characters.find(c => c.id === call.request.id);
    if (!character) {
      callback({
        code: grpc.status.NOT_FOUND,
        message: "Character not found"
      });
      return;
    }
    const characterWithFullData = {
      ...character,
      favoriteSpells: character.favoriteSpells.map(spellId => {
        const spell = spells.find(s => s.id === spellId);
        return spell || null;
      }).filter(Boolean),
      magicalCreatures: character.magicalCreatures.map(rel => ({
        ...rel,
        character: creatures.find(c => c.id === rel.creature?.id) || null
      })),
      friends: character.friends.map(rel => ({
        ...rel,
        character: characters.find(c => c.id === rel.character?.id) || null
      }))
    };

    callback(null, characterWithFullData);
  },
  searchCharacters: (call, callback) => {
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
  },
  patchCharacter: (call, callback) => {
    const { id, ...updates } = call.request;
    const character = characters.find((c) => c.id === id);
    if (character) {
      Object.assign(character, updates);
      callback(null, character);
    } else callback({ code: grpc.status.NOT_FOUND, message: "Character not found" });
  },
  createCharacter: (call, callback) => {
    const maxId = Math.max(...characters.map(c => parseInt(c.id, 10)), 0);
    const newId = String(maxId + 1);
    const newCharacter = {
      ...call.request,
      id: newId,
      // Używamy danych z request lub inicjalizujemy puste tablice jeśli ich nie ma
      favoriteSpells: call.request.favoriteSpells || [],
      magicalCreatures: call.request.magicalCreatures || [],
      friends: call.request.friends || [],
      enemies: call.request.enemies || [],
      skills: call.request.skills || [],
      notableEvents: call.request.notableEvents || [],
      affiliations: call.request.affiliations || [],
      quotes: call.request.quotes || []
    };
    characters.push(newCharacter);
    callback(null, newCharacter);
  },
  deleteCharacter: (call, callback) => {
    const { id } = call.request;
    const index = characters.findIndex((c) => c.id === id);
    if (index !== -1) {
      characters.splice(index, 1);
      callback(null, { message: "Character deleted" });
    } else callback({ code: grpc.status.NOT_FOUND, message: "Character not found" });
  },
});


const expressServer = app.listen(3000, () => {
  console.log("Express server is running on port 3000");
  
  grpcServer.bindAsync(
    '127.0.0.1:50051',
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error('Failed to bind gRPC server:', err);
        return;
      }
      // Usuwamy grpcServer.start()
      console.log(`gRPC server running at http://127.0.0.1:${port}`);
    }
  );
});

grpcServer.addService(tapiProto.CreatureService.service, {
  getAllCreatures: (call, callback) => {
    callback(null, { creatures });
  },
  getCreatureById: (call, callback) => {
    const creature = creatures.find((c) => c.id === call.request.id);
    if (creature) callback(null, creature);
    else callback({ code: grpc.status.NOT_FOUND, message: "Creature not found" });
  },
  searchCreatures: (call, callback) => {
    const { name, type } = call.request;
    let filteredCreatures = [...creatures];
    if (name) filteredCreatures = filteredCreatures.filter((c) => c.name.toLowerCase().includes(name.toLowerCase()));
    if (type) filteredCreatures = filteredCreatures.filter((c) => c.type.toLowerCase() === type.toLowerCase());
    callback(null, { creatures: filteredCreatures });
  },
  createCreature: (call, callback) => {
    const newCreature = call.request;
    creatures.push(newCreature);
    callback(null, newCreature);
  },
  deleteCreature: (call, callback) => {
    const { id } = call.request;
    const index = creatures.findIndex((c) => c.id === id);
    if (index !== -1) {
      creatures.splice(index, 1);
      callback(null, { message: "Creature deleted" });
    } else callback({ code: grpc.status.NOT_FOUND, message: "Creature not found" });
  },
  patchCreature: (call, callback) => {
    const { id, ...updates } = call.request;
    const creature = creatures.find((c) => c.id === id);
    if (creature) { Object.assign(creature, updates); callback(null, creature); }
    else callback({ code: grpc.status.NOT_FOUND, message: "Creature not found" });
  },
});

grpcServer.addService(tapiProto.SpellService.service, {
  getAllSpells: (call, callback) => {
    callback(null, { spells });
  },
  searchSpells: (call, callback) => {
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
  },
  patchSpell: (call, callback) => {
    const { id, ...updates } = call.request;
    const spell = spells.find((s) => s.id === id);
    if (spell) { Object.assign(spell, updates); callback(null, spell); }
    else callback({ code: grpc.status.NOT_FOUND, message: "Spell not found" });
  },
  createSpell: (call, callback) => {
    const newSpell = call.request;
    spells.push(newSpell);
    callback(null, newSpell);
  },
  deleteSpell: (call, callback) => {
    const { id } = call.request;
    const index = spells.findIndex((s) => s.id === id);
    if (index !== -1) { spells.splice(index, 1); callback(null, { message: "Spell deleted" }); }
    else callback({ code: grpc.status.NOT_FOUND, message: "Spell not found" });
  },
});

// Obsługa zamknięcia serwerów
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received');
  expressServer.close(() => {
    console.log('Express server closed');
  });
  grpcServer.tryShutdown(() => {
    console.log('gRPC server closed');
  });
});
