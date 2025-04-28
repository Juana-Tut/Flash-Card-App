import pool from '../config/db.js';

export const getHomePage = async (req, res) => {
    try {
        res.render('index');
    } catch (err) {
        res.status(500).send('Error loading home page');
    }
};

export const getAddFlashCards = async (req, res) => {
    try {
        res.render('addFlashCards');
    } catch (err) {
        res.status(500).send('Error loading add flashcards page');
    }
};

export const createFlashCard = async (req, res) => {
    const { front, back } = req.body;   
    try {
        const query = 'INSERT INTO flashcards (front, back) VALUES ($1, $2)';
        await pool.query(query, [front, back]);
        res.status(201).redirect('/api/flashcards/view');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating flashcard');
    }
};

export const getFlashCards = async (req, res) => {
    try {
        const query = 'SELECT * FROM flashcards';
        const { rows } = await pool.query(query);
        res.render('viewFlashCards', { flashcards: rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving flashcards');
    }
};

export const updateFlashCard = async (req, res) => {
    const { id } = req.params;
    const { front, back } = req.body;
    try {
        const query = 'UPDATE flashcards SET front = $1, back = $2 WHERE id = $3';
        await pool.query(query, [front, back, id]);
        res.status(200).redirect('/api/flashcards/view');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating flashcard');
    }
};

export const deleteFlashCard = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM flashcards WHERE id = $1';
        await pool.query(query, [id]);
        res.status(200).redirect('/api/flashcards/view');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting flashcard');
    }
};