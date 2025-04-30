import express from "express";
import path from "path";
import {getHomePage,getAddFlashCards,createFlashCard,getFlashCards,deleteFlashCard,updateFlashCard,getUpdateFlashCard, getAllFlashCards} from "../controllers/controller.js";

const router = express.Router();

//Render the home page
router.get('/',getHomePage);

//API routes
router.get('/api/flashcards',getAddFlashCards); // render the page to add new flashcards
router.post('/api/flashcards/add',createFlashCard); // create a new flashcard
router.get('/api/flashcards/view', getFlashCards); // view all flashcards in study mode 
router.post('/api/flashcards/delete/:id',deleteFlashCard); // delete a flashcard
router.get('/api/flashcards/update/:id', getUpdateFlashCard); // render the page to update a flashcard
router.post('/api/flashcards/update/:id',updateFlashCard); // update a flashcard
router.get('/api/flashcards/allFlashcards', getAllFlashCards); // get all flashcards

export default router;