const express = require('express');
const router = express.Router();
const {classifiedModel} = require('../models/Classified');

//create a classified ad 
router.post('/add', async (req, res) => { 
  console.log('inside post')
  try {
    const new_classified = new classifiedModel(req.body);
    await new_classified.save();
    res.json(new_classified);
  } catch (error) {
    console.log(error)
    res.status(500).send('Error creating classified ad');
  }
});

//get the classifieds with all the queries and search params 
router.get('/', async (req, res) => {
  try {
    const { category, sort, q, page } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (q) {
      query.name = { $regex: q, $options: 'i' };
    }

    // const totalResults = await classifiedModel.countDocuments(query);
    // const totalPages = Math.ceil(totalResults / 4);
    const skip = (page - 1) * 4;

    const classifieds = await classifiedModel.find(query)
      .sort({ postedAt: sort === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(4);

    res.status(200).json(classifieds);
  } catch (error) {
    console.log(error)
    res.status(500).send('Error fetching classified ads');
  }
});



// Update a classified ad
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClassified = await classifiedModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedClassified);
  } catch (error) {
    res.status(500).send( 'Error updating classified ad' );
  }
});

// Delete a classified ad
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await classifiedModel.findByIdAndRemove(id);
    res.status(200).json({ message: 'Classified ad deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting classified ad' });
  }
});


module.exports = router;
