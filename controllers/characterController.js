import { characters } from "../data/data.js";
import { formatCharacterRelationships } from "../utils/helper.js";

// Get all characters
export const getAllCharacters = (req, res) => {
  const formattedCharacters = characters.map(formatCharacterRelationships);
  const hateoasLinks = formattedCharacters.map((character) => ({
    ...character,
    links: {
      self: `/characters/${character.id}`,
      friendsOrEnemies: `/characters/${character.id}/relationships`,
      friends: `/characters/${character.id}/friends`,
      enemies: `/characters/${character.id}/enemies`,
      spells: `/characters/${character.id}/spells`,
      magicalCreatures: `/characters/${character.id}/magicalCreatures`,
    },
  }));
  res.json(hateoasLinks);
};

export const getCharacterById = (req, res) => {
  const character = characters.find((c) => c.id === req.params.id);
  if (character) {
    const formattedCharacter = formatCharacterRelationships(character);
    res.json(formattedCharacter);
  } else {
    res.status(404).json({ error: "Character not found" });
  }
};

export const searchCharacters = (req, res) => {
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
};

export const createCharacter = (req, res) => {
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
};

export const updateCharacter = (req, res) => {
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
};

export const patchCharacter = (req, res) => {
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
};

export const deleteCharacter = (req, res) => {
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
};

export const getCharacterRelationships = (req, res) => {
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
};

export const getCharacterByRole = (req, res) => {
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
};

export const getCharacterByHouse = (req, res) => {
  const { houseName } = req.params;

  // Validate house name
  const validHouses = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
  if (
    !validHouses.includes(
      houseName.charAt(0).toUpperCase() + houseName.slice(1).toLowerCase()
    )
  ) {
    return res.status(400).json({
      error: "Invalid house name",
      validHouses,
    });
  }

  const houseMembers = characters.filter(
    (char) => char.house?.toLowerCase() === houseName.toLowerCase()
  );

  if (houseMembers.length === 0) {
    return res.status(404).json({
      error: "No characters found in this house",
    });
  }

  const formattedMembers = houseMembers.map(formatCharacterRelationships);
  res.json(formattedMembers);
};

export const getCharacterBySpell = (req, res) => {
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
};
