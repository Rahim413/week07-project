import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// Connect to DataBase
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Login 
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
  if (result.rows.length > 0) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

//Store item
app.post('/add-item', async (req, res) => {
  const { name, barcode, price, quantity_in_stock } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO store_items (name, barcode, price, quantity_in_stock) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, barcode, price, quantity_in_stock]
    );
    const newItem = result.rows[0];
    res.json(newItem); 
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Search item from BD
app.get('/search-item', async (req, res) => {
  const { barcode } = req.query;
  try {
    const result = await db.query('SELECT * FROM store_items WHERE barcode = $1', [barcode]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(8080, () => {
  console.log('Server running on port 8080');
});
