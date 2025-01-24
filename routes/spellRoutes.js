import express from "express";
import { validateId, validateSpellData } from "../middleware/validation.js";
import {
  getAllSpells,
  getSpellById,
  searchSpells,
  getSpellByDifficulty,
  getSpellByType,
  createSpell,
  updateSpell,
  deleteSpell,
  patchSpell,
} from "../controllers/spellController.js";

const router = express.Router();

router.get("/", getAllSpells);
router.get("/search", searchSpells);
router.get("/:id", validateId, getSpellById);
router.get("/level/:level", getSpellByDifficulty);
router.get("/type/:type", getSpellByType);

// POST/PUT/DELETE routes
router.post("/", validateSpellData, createSpell);
router.put("/:id", validateId, validateSpellData, updateSpell);
router.delete("/:id", validateId, deleteSpell);
router.patch("/:id", validateId, patchSpell);

// Mutation routes
router.post("/", validateSpellData, createSpell);
router.put("/:id", validateId, validateSpellData, updateSpell);
router.delete("/:id", validateId, deleteSpell);

export default router;
