import { creatures } from "../data/data.js";

export const getAllCreatures = (req, res) => {
  res.json(creatures);
};

export const getCreatureById = (req, res) => {
  const creature = creatures.find((c) => c.id === req.params.id);
  if (creature) {
    res.json(creature);
  } else {
    res.status(404).json({ error: "Creature not found" });
  }
};

export const searchCreatures = (req, res) => {
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
};

// export const getCreatureByCharacter = (req, res) => {
//   const character = characters.find((c) => c.id === req.params.characterId);
//   if (!character) {
//     res.status(404).send("Character not found");
//     return;
//   }

//   if (!character.magicalCreatures) {
//     res.json([]);
//     return;
//   }

//   const characterCreatures = character.magicalCreatures
//     .map((relation) => {
//       const creature = creatures.find((c) => c.id === relation.creature?.id);
//       if (creature) {
//         return {
//           ...creature,
//           relationshipType: relation.relationshipType,
//           details: relation.details,
//         };
//       }
//       return null;
//     })
//     .filter((creature) => creature !== null);

//   res.json(characterCreatures);
// };

export const getCreatureByCharacterInteraction = (req, res) => {
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
            link: `/characters/${char.id}`,
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
};

export const createCreature = (req, res) => {
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
};

export const updateCreature = (req, res) => {
  const { id } = req.params;
  const updatedCreature = req.body;
  const index = creatures.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Creature not found" });
  }

  // Validate required fields
  if (!updatedCreature.name || !updatedCreature.species) {
    return res.status(400).json({
      error: "name and species are required",
    });
  }

  creatures[index] = {
    ...creatures[index],
    ...updatedCreature,
  };

  res.json(creatures[index]);
};

export const patchCreature = (req, res) => {
  const { id } = req.params;
  const updatedCreature = req.body;
  const index = creatures.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Creature not found" });
  }

  creatures[index] = {
    ...creatures[index],
    ...updatedCreature,
  };

  res.json(creatures[index]);
};
export const deleteCreature = (req, res) => {
  const { id } = req.params;
  const index = creatures.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Creature not found" });
  }

  creatures.splice(index, 1);
  res.status(204).send();
};
