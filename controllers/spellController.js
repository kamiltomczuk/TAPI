import { spells } from "../data/data.js";

export const getAllSpells = (req, res) => {
  res.json(spells);
};

export const getSpellById = (req, res) => {
  const spell = spells.find((s) => s.id === req.params.id);
  if (spell) {
    res.json(spell);
  } else {
    res.status(404).json({ error: "Spell not found" });
  }
};

export const searchSpells = (req, res) => {
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

  if (filteredSpells.length === 0) {
    res.status(404).send("No spells found with the given search criteria");
    return;
  }

  res.json(filteredSpells);
};

export const getSpellByDifficulty = (req, res) => {
  const { level } = req.params;
  const spellsByLevel = spells.filter(
    (spell) => spell.level?.toLowerCase() === level.toLowerCase()
  );

  if (spellsByLevel.length === 0) {
    res.status(404).send("No spells found of this difficulty level");
    return;
  }

  res.json(spellsByLevel);
};

export const getSpellByType = (req, res) => {
  const { type } = req.params;
  const spellsOfType = spells.filter(
    (spell) => spell.type?.toLowerCase() === type.toLowerCase()
  );

  if (spellsOfType.length === 0) {
    res.status(404).send("No spells found of this type");
    return;
  }

  res.json(spellsOfType);
};

export const createSpell = (req, res) => {
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
};

export const updateSpell = (req, res) => {
  const { id } = req.params;
  const spellIndex = spells.findIndex((spell) => spell.id === id);

  if (spellIndex === -1) {
    res.status(404).json({ error: "Spell not found" });
    return;
  }

  const updatedSpell = { ...spells[spellIndex], ...req.body };
  spells[spellIndex] = updatedSpell;

  res.json(updatedSpell);
};

export const patchSpell = (req, res) => {
  const { id } = req.params;
  const spellIndex = spells.findIndex((spell) => spell.id === id);

  if (spellIndex === -1) {
    res.status(404).json({ error: "Spell not found" });
    return;
  }

  spells[spellIndex] = {
    ...spells[spellIndex],
    ...req.body,
  };

  res.json(spells[spellIndex]);
};

export const deleteSpell = (req, res) => {
  const { id } = req.params;
  const spellIndex = spells.findIndex((spell) => spell.id === id);

  if (spellIndex === -1) {
    res.status(404).json({ error: "Spell not found" });
    return;
  }

  spells.splice(spellIndex, 1);
  res.status(204).send();
};
