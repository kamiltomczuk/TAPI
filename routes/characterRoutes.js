import express from "express";
import { validateId, validateCharacterData } from "../middleware/validation.js";
import {
  getAllCharacters,
  getCharacterById,
  searchCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  patchCharacter,
  getCharacterRelationships,
  getCharacterByHouse,
  getCharacterByRole,
} from "../controllers/characterController.js";

const router = express.Router();

router.get("/", getAllCharacters);
router.get("/search", searchCharacters);  // wywalic search
router.get("/house/:houseName", getCharacterByHouse); //
router.get("/:id", validateId, getCharacterById);
router.post("/", validateCharacterData, createCharacter);
router.put("/:id", validateId, validateCharacterData, updateCharacter);
router.delete("/:id", validateId, deleteCharacter);
router.patch("/:id", validateId, patchCharacter);
router.get("/:id/relationships", validateId, getCharacterRelationships);
router.get("/role/:role", getCharacterByRole);

export default router;
