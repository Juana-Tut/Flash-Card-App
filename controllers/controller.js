import pool from '../config/db.js';

export const getHomePage = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM flashcards');
        res.render('index', { flashcards: result.rows });
    } catch (err) {
        res.status(500).send('Error retrieving flashcards');
    }
};
