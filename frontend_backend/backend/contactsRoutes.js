// contactsRoutes.js
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

const { getDatabase } = require('./database');

router.get('/', async (req, res) => {
  try {
    const db = getDatabase();
    const contacts = await db.collection('contacts').find().toArray();
    res.json({ 'contacts/': contacts });
  } catch (err) {
    console.error('Failed to fetch contacts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const db = getDatabase();
    const data = req.body;
    await db.collection('contacts').insertOne(data);
    const addedEntry = await db.collection('contacts').findOne({ name: data.name });
    res.status(201).json(addedEntry);
  } catch (err) {
    console.error('Failed to add contact:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const db = getDatabase();
      const id = req.params.id;
      await db.collection('contacts').deleteOne({ _id: new ObjectId(id) }); // Use new keyword
      res.send(`Deleted ${id}`);
    } catch (err) {
      console.error('Failed to delete contact:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const db = getDatabase();
      const id = req.params.id;
      const data = req.body;
  
      await db.collection('contacts').updateOne(
        { _id: new ObjectId(id) }, // Use new keyword
        { $set: { name: data.name, email: data.email } }
      );
  
      const addedEntry = await db.collection('contacts').findOne({ name: data.name });
      res.status(201).json(addedEntry);
    } catch (err) {
      console.error('Failed to update contact:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
