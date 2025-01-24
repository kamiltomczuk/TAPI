export const validateId = (req, res, next) => {
  const id = req.params.id;
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid ID format or missing ID" });
  }
  next();
};

export const validateCharacterData = (req, res, next) => {
  const character = req.body;
  const errors = [];

  if (!character.firstName) errors.push("firstName is required");
  if (!character.lastName) errors.push("lastName is required");

  if (
    character.house &&
    !["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"].includes(
      character.house
    )
  ) {
    errors.push("Invalid house name");
  }

  if (
    character.bloodStatus &&
    !["PURE_BLOOD", "HALF_BLOOD", "MUGGLE_BORN", "UNKNOWN"].includes(
      character.bloodStatus
    )
  ) {
    errors.push("Invalid blood status");
  }

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

export const validateSpellData = (req, res, next) => {
  const spell = req.body;
  const errors = [];

  if (!spell.name?.trim()) errors.push("name is required and cannot be empty");
  if (!spell.type) errors.push("type is required");

  if (spell.name && spell.name.length > 100) {
    errors.push("name must be less than 100 characters");
  }
  if (spell.description && spell.description.length > 1000) {
    errors.push("description must be less than 1000 characters");
  }

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

export const validateCreatureData = (req, res, next) => {
  const creature = req.body;
  const errors = [];

  // Required fields
  if (!creature.name) errors.push("name is required");
  if (!creature.species) errors.push("species is required");

  // Validate dangerLevel if provided
  const validDangerLevels = ["HARMLESS", "LOW", "MODERATE", "HIGH", "EXTREME"];
  if (
    creature.dangerLevel &&
    !validDangerLevels.includes(creature.dangerLevel)
  ) {
    errors.push(`dangerLevel must be one of: ${validDangerLevels.join(", ")}`);
  }

  // Validate alignment if provided
  const validAlignments = ["GOOD", "NEUTRAL", "EVIL", "UNKNOWN"];
  if (creature.alignment && !validAlignments.includes(creature.alignment)) {
    errors.push(`alignment must be one of: ${validAlignments.join(", ")}`);
  }

  // Validate abilities array if provided
  if (creature.abilities && !Array.isArray(creature.abilities)) {
    errors.push("abilities must be an array");
  }

  // Validate boolean fields if provided
  if (
    creature.isProtected !== undefined &&
    typeof creature.isProtected !== "boolean"
  ) {
    errors.push("isProtected must be a boolean");
  }

  if (creature.canTalk !== undefined && typeof creature.canTalk !== "boolean") {
    errors.push("canTalk must be a boolean");
  }

  // Validate habitat if provided (can be empty but not null)
  if (creature.habitat === null) {
    errors.push("habitat cannot be null");
  }

  // Validate that description and knownFor are strings if provided
  if (creature.description && typeof creature.description !== "string") {
    errors.push("description must be a string");
  }

  if (creature.knownFor && typeof creature.knownFor !== "string") {
    errors.push("knownFor must be a string");
  }

  // Validate interactions if provided
  if (creature.interactions) {
    if (!Array.isArray(creature.interactions)) {
      errors.push("interactions must be an array");
    } else {
      const validInteractionTypes = [
        "FRIENDLY",
        "HOSTILE",
        "NEUTRAL",
        "GUARDIAN",
        "SERVANT",
      ];
      creature.interactions.forEach((interaction, index) => {
        if (!interaction.characterId) {
          errors.push(`interaction at index ${index} must have a characterId`);
        }
        if (
          interaction.type &&
          !validInteractionTypes.includes(interaction.type)
        ) {
          errors.push(
            `interaction type at index ${index} must be one of: ${validInteractionTypes.join(
              ", "
            )}`
          );
        }
        if (
          interaction.description &&
          typeof interaction.description !== "string"
        ) {
          errors.push(
            `interaction description at index ${index} must be a string`
          );
        }
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors,
    });
  }

  next();
};
