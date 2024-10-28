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
import resolvers from "./models/resolvers.js";
import { validateFriendEnemyCharacterFields } from "./validationRules.js";
import { characters, spells, creatures } from "./data/data.js";

const typeDefs = `
  ${characterSchema}
  ${spellSchema}
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error handling middleware
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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Request logging
app.use(express.json({ limit: "10mb" })); // Body parsing with size limit
app.use(express.urlencoded({ extended: true }));
app.use(limiter); // Rate limiting
app.use(requestLogger); // Custom request logging
app.use(validateRequest); // Request validation

// Add route-specific middleware
const validateId = (req, res, next) => {
  const id = req.params.id;
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid ID format or missing ID" });
  }
  next();
};

// Validation middleware for character creation/updates
const validateCharacterData = (req, res, next) => {
  const character = req.body;
  const errors = [];

  // Required fields
  if (!character.firstName) errors.push("firstName is required");
  if (!character.lastName) errors.push("lastName is required");

  // Validate house if provided
  if (
    character.house &&
    !["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"].includes(
      character.house
    )
  ) {
    errors.push("Invalid house name");
  }

  // Validate bloodStatus if provided
  if (
    character.bloodStatus &&
    !["PURE_BLOOD", "HALF_BLOOD", "MUGGLE_BORN", "UNKNOWN"].includes(
      character.bloodStatus
    )
  ) {
    errors.push("Invalid blood status");
  }

  // Validate role if provided
  if (
    character.role &&
    ![
      "STUDENT",
      "TEACHER",
      "AUROR",
      "MINISTER_OF_MAGIC",
      "DEATH_EATER",
      "ORDER_MEMBER",
      "OTHER",
    ].includes(character.role)
  ) {
    errors.push("Invalid role");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors,
    });
  }

  next();
};

// Validation middleware for spell creation/updates
const validateSpellData = (req, res, next) => {
  const spell = req.body;
  const errors = [];

  if (!spell.name) errors.push("name is required");
  if (!spell.type) errors.push("type is required");

  const validTypes = [
    "CHARM",
    "CURSE",
    "HEX",
    "JINX",
    "TRANSFIGURATION",
    "OTHER",
  ];
  const validLevels = ["EASY", "MEDIUM", "HARD", "EXTREME"];

  if (spell.type && !validTypes.includes(spell.type)) {
    errors.push("Invalid spell type");
  }

  if (spell.level && !validLevels.includes(spell.level)) {
    errors.push("Invalid spell level");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors,
    });
  }

  next();
};

// Helper function to format character relationships
const formatCharacterRelationships = (character) => {
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
            link: `/creature/${creature.id}`,
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

  // Return with ID first
  return {
    id: character.id,
    ...character,
    favoriteSpells,
    friends,
    enemies,
    magicalCreatures,
  };
};

const getNextId = (collection) => {
  if (collection.length === 0) return "1";

  // Find the maximum ID and add 1
  const maxId = Math.max(...collection.map((item) => parseInt(item.id)));
  return (maxId + 1).toString();
};

// Get all characters
app.get("/characters", (req, res) => {
  const formattedCharacters = characters.map(formatCharacterRelationships);
  res.json(formattedCharacters);
});

// Get character by ID
app.get("/character/:id", (req, res) => {
  const character = characters.find((c) => c.id === req.params.id);
  if (character) {
    const formattedCharacter = formatCharacterRelationships(character);
    res.json(formattedCharacter);
  } else {
    res.status(404).send("Character not found");
  }
});

// Search characters by name, house, or other attributes
app.get("/characters/search", (req, res) => {
  const { name, house, bloodStatus, isDeathEater, isOrderMember } = req.query;
  let filteredCharacters = [...characters];

  if (name) {
    const searchTerm = name.toLowerCase();
    filteredCharacters = filteredCharacters.filter(
      (char) =>
        (char.fullName && char.fullName.toLowerCase().includes(searchTerm)) ||
        (char.firstName && char.firstName.toLowerCase().includes(searchTerm)) ||
        (char.lastName && char.lastName.toLowerCase().includes(searchTerm))
    );
  }

  if (house) {
    filteredCharacters = filteredCharacters.filter(
      (char) => char.house?.toLowerCase() === house.toLowerCase()
    );
  }

  if (bloodStatus) {
    filteredCharacters = filteredCharacters.filter(
      (char) => char.bloodStatus?.toLowerCase() === bloodStatus.toLowerCase()
    );
  }

  if (isDeathEater !== undefined) {
    filteredCharacters = filteredCharacters.filter(
      (char) => char.isDeathEater === (isDeathEater === "true")
    );
  }

  if (isOrderMember !== undefined) {
    filteredCharacters = filteredCharacters.filter(
      (char) => char.isOrderMember === (isOrderMember === "true")
    );
  }

  const formattedCharacters = filteredCharacters.map(
    formatCharacterRelationships
  );
  res.json(formattedCharacters);
});

// Get all characters from a specific house
app.get("/houses/:houseName/members", (req, res) => {
  const { houseName } = req.params;
  const houseMembers = characters.filter(
    (char) => char.house?.toLowerCase() === houseName.toLowerCase()
  );

  if (houseMembers.length === 0) {
    res.status(404).send("No characters found in this house");
    return;
  }

  const formattedMembers = houseMembers.map(formatCharacterRelationships);
  res.json(formattedMembers);
});

// Get characters who know a specific spell
app.get("/spells/:spellId/users", (req, res) => {
  const { spellId } = req.params;
  const charactersWithSpell = characters.filter((char) =>
    char.favoriteSpells.includes(spellId)
  );

  if (charactersWithSpell.length === 0) {
    res.status(404).send("No characters found who use this spell");
    return;
  }

  const formattedCharacters = charactersWithSpell.map(
    formatCharacterRelationships
  );
  res.json(formattedCharacters);
});

// Get characters by role
app.get("/characters/role/:role", (req, res) => {
  const { role } = req.params;
  const charactersByRole = characters.filter(
    (char) => char.role?.toLowerCase() === role.toLowerCase()
  );

  if (charactersByRole.length === 0) {
    res.status(404).send("No characters found with this role");
    return;
  }

  const formattedCharacters = charactersByRole.map(
    formatCharacterRelationships
  );
  res.json(formattedCharacters);
});

// Get all relationships for a character
app.get("/characters/:id/relationships", (req, res) => {
  const character = characters.find((c) => c.id === req.params.id);

  if (!character) {
    res.status(404).send("Character not found");
    return;
  }

  const formattedCharacter = formatCharacterRelationships(character);
  res.json({
    friends: formattedCharacter.friends,
    enemies: formattedCharacter.enemies,
  });
});

// Create new character
// Update the character POST route to use the validation middleware
app.post("/character", validateCharacterData, (req, res) => {
  const newCharacter = req.body;

  // Set default values for arrays if not provided
  newCharacter.friends = newCharacter.friends || [];
  newCharacter.enemies = newCharacter.enemies || [];
  newCharacter.favoriteSpells = newCharacter.favoriteSpells || [];
  newCharacter.magicalCreatures = newCharacter.magicalCreatures || [];

  // Generate new ID based on highest existing ID
  newCharacter.id = getNextId(characters);

  // Set other default values
  newCharacter.fullName =
    newCharacter.fullName ||
    `${newCharacter.firstName} ${newCharacter.lastName}`.trim();
  newCharacter.isDeathEater = newCharacter.isDeathEater || null;
  newCharacter.isOrderMember = newCharacter.isOrderMember || null;
  newCharacter.skills = newCharacter.skills || [];
  newCharacter.notableEvents = newCharacter.notableEvents || [];
  newCharacter.affiliations = newCharacter.affiliations || [];
  newCharacter.quotes = newCharacter.quotes || [];

  characters.push(newCharacter);

  // Format the response to ensure ID is first
  const formattedResponse = {
    id: newCharacter.id,
    firstName: newCharacter.firstName,
    lastName: newCharacter.lastName,
    fullName: newCharacter.fullName,
    house: newCharacter.house,
    bloodStatus: newCharacter.bloodStatus,
    wand: newCharacter.wand,
    patronus: newCharacter.patronus,
    isDeathEater: newCharacter.isDeathEater,
    isOrderMember: newCharacter.isOrderMember,
    role: newCharacter.role,
    birthDate: newCharacter.birthDate,
    deathDate: newCharacter.deathDate,
    ancestry: newCharacter.ancestry,
    skills: newCharacter.skills,
    magicalCreatures: newCharacter.magicalCreatures,
    friends: newCharacter.friends,
    enemies: newCharacter.enemies,
    notableEvents: newCharacter.notableEvents,
    favoriteSpells: newCharacter.favoriteSpells,
    affiliations: newCharacter.affiliations,
    quotes: newCharacter.quotes,
  };

  res.status(201).json(formatCharacterRelationships(formattedResponse));
});

// Update character (Full update)
app.put("/character/:id", (req, res) => {
  const { id } = req.params;
  const updatedCharacter = req.body;
  const index = characters.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Character not found" });
  }

  // Validate required fields
  if (!updatedCharacter.firstName || !updatedCharacter.lastName) {
    return res.status(400).json({
      error: "firstName and lastName are required",
    });
  }

  // Preserve the ID
  updatedCharacter.id = id;

  // Update the character
  characters[index] = updatedCharacter;
  res.json(formatCharacterRelationships(updatedCharacter));
});

// Update character (Partial update)
app.patch("/character/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const index = characters.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Character not found" });
  }

  // Create updated character by merging existing data with updates
  const updatedCharacter = {
    ...characters[index],
    ...updates,
    id, // Ensure ID doesn't get overwritten
  };

  characters[index] = updatedCharacter;
  res.json(formatCharacterRelationships(updatedCharacter));
});

// Delete character
app.delete("/character/:id", (req, res) => {
  const { id } = req.params;
  const index = characters.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Character not found" });
  }

  // Remove character from all friend/enemy relationships
  characters.forEach((char) => {
    if (char.friends) {
      char.friends = char.friends.filter((f) => f.character.id !== id);
    }
    if (char.enemies) {
      char.enemies = char.enemies.filter((e) => e.character.id !== id);
    }
  });

  characters.splice(index, 1);
  res.status(204).send();
});

// Get all spells of a specific type
app.get("/spells/type/:type", (req, res) => {
  const { type } = req.params;
  const spellsOfType = spells.filter(
    (spell) => spell.type?.toLowerCase() === type.toLowerCase()
  );

  if (spellsOfType.length === 0) {
    res.status(404).send("No spells found of this type");
    return;
  }

  res.json(spellsOfType);
});

// Get all spells by difficulty level
app.get("/spells/level/:level", (req, res) => {
  const { level } = req.params;
  const spellsByLevel = spells.filter(
    (spell) => spell.level?.toLowerCase() === level.toLowerCase()
  );

  if (spellsByLevel.length === 0) {
    res.status(404).send("No spells found of this difficulty level");
    return;
  }

  res.json(spellsByLevel);
});

// Search spells by name or effect
app.get("/spells/search", (req, res) => {
  const { name, effect } = req.query;
  let filteredSpells = [...spells];

  if (name) {
    const searchTerm = name.toLowerCase();
    filteredSpells = filteredSpells.filter((spell) =>
      spell.name.toLowerCase().includes(searchTerm)
    );
  }

  if (effect) {
    const searchTerm = effect.toLowerCase();
    filteredSpells = filteredSpells.filter((spell) =>
      spell.effect?.toLowerCase().includes(searchTerm)
    );
  }

  res.json(filteredSpells);
});

// Get spell by ID
app.get("/spell/:id", (req, res) => {
  const spell = spells.find((s) => s.id === req.params.id);
  if (spell) {
    res.json(spell);
  } else {
    res.status(404).send("Spell not found");
  }
});

// Get all spells
app.get("/spells", (req, res) => {
  res.json(spells);
});

app.post("/spells", (req, res) => {
  const newSpell = req.body;

  // Validate required fields
  if (!newSpell.name || !newSpell.type) {
    return res.status(400).json({
      error: "name and type are required",
    });
  }

  // Generate new ID based on highest existing ID
  newSpell.id = getNextId(spells);

  // Set default values
  newSpell.level = newSpell.level || "EASY";
  newSpell.description = newSpell.description || "";

  spells.push(newSpell);
  res.status(201).json(newSpell);
});

// create new spell
app.post("/spells", (req, res) => {
  const newSpell = req.body;

  // Validate required fields
  if (!newSpell.name || !newSpell.type) {
    return res.status(400).json({
      error: "name and type are required",
    });
  }

  // Generate new ID based on highest existing ID
  newSpell.id = getNextId(spells);

  // Set default values
  newSpell.level = newSpell.level || "EASY";
  newSpell.description = newSpell.description || "";

  spells.push(newSpell);
  res.status(201).json(newSpell);
});

// Get all creatures
app.get("/creatures", (req, res) => {
  res.json(creatures);
});

// Get creature by ID
app.get("/creature/:id", (req, res) => {
  const creature = creatures.find((c) => c.id === req.params.id);
  if (creature) {
    res.json(creature);
  } else {
    res.status(404).send("Creature not found");
  }
});

//Show creatures with character interactions
app.get("/creatureinteractions/:id", (req, res) => {
  const creature = creatures.find((c) => c.id === req.params.id);
  if (creature) {
    const interactions = characters.flatMap((char) => {
      // Check if magicalCreatures exists before filtering
      if (!char.magicalCreatures) return [];

      return char.magicalCreatures
        .filter((mc) => mc.creature.id === creature.id)
        .map((mc) => ({
          characterId: char.id,
          character: {
            id: char.id,
            firstName: char.firstName,
            lastName: char.lastName,
            fullName: char.fullName,
            link: `/character/${char.id}`,
          },
          type: mc.relationshipType,
          details: mc.details,
        }));
    });

    res.json({
      ...creature,
      interactions,
    });
  } else {
    res.status(404).send("Creature not found");
  }
});

app.get("/creatures/search", (req, res) => {
  const { species, dangerLevel, alignment } = req.query;
  let filteredCreatures = [...creatures];

  if (species) {
    filteredCreatures = filteredCreatures.filter((creature) =>
      creature.species.toLowerCase().includes(species.toLowerCase())
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

  res.json(filteredCreatures);
});

app.get("/creatures/by-character/:characterId", (req, res) => {
  const character = characters.find((c) => c.id === req.params.characterId);
  if (!character) {
    res.status(404).send("Character not found");
    return;
  }

  if (!character.magicalCreatures) {
    res.json([]);
    return;
  }

  const characterCreatures = character.magicalCreatures
    .map((relation) => {
      const creature = creatures.find((c) => c.id === relation.creature?.id);
      if (creature) {
        return {
          ...creature,
          relationshipType: relation.relationshipType,
          details: relation.details,
        };
      }
      return null;
    })
    .filter((creature) => creature !== null);

  res.json(characterCreatures);
});

// Create new creature
app.post("/creature", (req, res) => {
  const newCreature = req.body;

  // Validate required fields
  if (!newCreature.name || !newCreature.species) {
    return res.status(400).json({
      error: "name and species are required",
    });
  }

  // Generate new ID based on highest existing ID
  newCreature.id = getNextId(creatures);

  // Set default values
  newCreature.abilities = newCreature.abilities || [];
  newCreature.isProtected = newCreature.isProtected || false;
  newCreature.canTalk = newCreature.canTalk || false;
  newCreature.alignment = newCreature.alignment || "NEUTRAL";
  newCreature.dangerLevel = newCreature.dangerLevel || "LOW";

  creatures.push(newCreature);
  res.status(201).json(newCreature);
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    validationRules: [...specifiedRules, validateFriendEnemyCharacterFields],
  })
);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
