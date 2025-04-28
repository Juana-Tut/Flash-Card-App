import express from "express";
import path from "path";

const router = express.Router();

//Render the home page
router.get('/',getHomePage);

//API routes
router.get('/api/flashcards',getFlashCards); // render the flashcards page
router.post('/api/flashcards',createFlashCard); // create a new flashcard
router.delete('/api/flashcards/:id',deleteFlashCard); // delete a flashcard
router.put('/api/flashcards/:id',updateFlashCard); // update a flashcard

export default router;