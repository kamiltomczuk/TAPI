import express from "express";
import { validateId, validateCreatureData } from "../middleware/validation.js";
import {
  getAllCreatures,
  getCreatureById,
  getCreatureByCharacterInteraction,
  searchCreatures,
  createCreature,
  updateCreature,
  deleteCreature,
  patchCreature,
} from "../controllers/creatureController.js";

const router = express.Router();

router.get("/", getAllCreatures);
router.get("/:id", validateId, getCreatureById);
router.get("/search", searchCreatures);
router.post("/", validateCreatureData, createCreature);
router.put("/:id", validateId, validateCreatureData, updateCreature);
router.delete("/:id", validateId, deleteCreature);
router.patch("/:id", validateId, patchCreature);
router.get(
  "/:characterId/interactions",
  validateId,
  getCreatureByCharacterInteraction
);

export default router;
