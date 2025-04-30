import { query } from '../config/db.js';

export const getHomePage = async (req, res) => {
    try {
        console.log('Home page loaded');
        res.render("index");
    } catch (err) {
        res.status(500).send('Error loading home page');
    }
};

export const getAddFlashCards = async (req, res) => {
    try {
        res.render('addFlashcard');
    } catch (err) {
        res.status(500).send('Error loading add flashcards page');
    }
};

export const createFlashCard = async (req, res) => {
    const { front, back } = req.body;   
    try {
        await query('INSERT INTO flashcards (front, back) VALUES ($1, $2)', [front, back]);
        res.status(201).redirect('/api/flashcards/view');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating flashcard');
    }
};

export const getFlashCards = async (req, res) => {
    try {
        const { rows } = await query('SELECT * FROM flashcards');
        res.render('studyModeCards', { flashcards: rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving flashcards');
    }
};
export const getUpdateFlashCard = async (req, res) => {
    const cardId = req.params.id; // Get the card ID from the URL
    try {
        // Fetch the flashcard from the database
        const result = await query('SELECT * FROM flashcards WHERE id = $1', [cardId]);
        const card = result.rows[0]; // Assuming you're using PostgreSQL

        if (!card) {
            return res.status(404).send('Flashcard not found');
        }

        // Render the update.ejs template and pass the card object
        res.render('update', { card });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching flashcard');
    }
}; // render the page to update a flashcard

export const updateFlashCard = async (req, res) => {
    const id  = parseInt(req.params.id);
    const { front, back } = req.body;
    try {
        await query('UPDATE flashcards SET front = $1, back = $2 WHERE id = $3', [front, back, id]);
        res.status(200).redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating flashcard');
    }
};

export const deleteFlashCard = async (req, res) => {
    const id  = parseInt(req.params.id);
    try {
        await query('DELETE FROM flashcards WHERE id = $1', [id]);
        res.status(200).redirect('/api/flashcards/view');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting flashcard');
    }
};

export const getAllFlashCards = async (req, res) => {
    try {
        const { rows } = await query('SELECT * FROM flashcards');
        res.render('allCards', { flashcards: rows }); // Render EJS template
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving flashcards');
    }
};