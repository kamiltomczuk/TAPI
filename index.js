import express from "express";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { specifiedRules } from "graphql";
import characterSchema from "./models/characterModel.js";
import spellSchema from "./models/spellModel.js";
import resolvers from "./models/resolvers.js";
import { validateFriendEnemyCharacterFields } from "./validationRules.js";
import { characters, spells } from "./data/data.js";

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

// Helper function to format character relationships
const formatCharacterRelationships = (character) => {
  const favoriteSpells = character.favoriteSpells.map((spellId) =>
    spells.find((spell) => spell.id === spellId)
  );

  const friends = character.friends
    .map((friend) => {
      const friendCharacter = characters.find(
        (c) => c.id === friend.character.id
      );
      if (friendCharacter) {
        return {
          id: friend.character.id,
          firstName: friendCharacter.firstName,
          lastName: friendCharacter.lastName,
          fullName: friendCharacter.fullName,
          relationshipType: friend.relationshipType,
          link: `/character/${friend.character.id}`,
        };
      }
      return null;
    })
    .filter((friend) => friend !== null);

  const enemies = character.enemies
    .map((enemy) => {
      const enemyCharacter = characters.find(
        (c) => c.id === enemy.character.id
      );
      if (enemyCharacter) {
        return {
          id: enemy.character.id,
          firstName: enemyCharacter.firstName,
          lastName: enemyCharacter.lastName,
          fullName: enemyCharacter.fullName,
          relationshipType: enemy.relationshipType,
          link: `/character/${enemy.character.id}`,
        };
      }
      return null;
    })
    .filter((enemy) => enemy !== null);

  return {
    ...character,
    favoriteSpells,
    friends,
    enemies,
  };
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

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    validationRules: [...specifiedRules, validateFriendEnemyCharacterFields],
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
