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