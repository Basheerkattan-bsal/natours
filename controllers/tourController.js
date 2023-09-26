const fs = require('fs');
const Tour = require('./../models/tourModel');

/* const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
); */

/* exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length || req.params.id !== val) {
    console.log('INVALID ID'); //
  } else {
    console.log(`The id is : ${val}`);
  }
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'INVALID ID',
    }); // ===> The return here is important so that express does not keep running the code and call the next function
  }
  next(); // ===> As it's a middleware we should write next so the middleware stack does not get stuck so if there is no error, the next function will be triggered
}; */

/* exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Bad request: Missing name or price',
    });
  }
  next();
}; */

// All tours function
exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    const query = Tour.find(queryObj);

    const tours = await query;

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Wrong request',
    });
  }
};

// Single tour function
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Wrong request',
    });
  }
  // Get the id and convert it to a number
  // Abstract the tour using .find method
  /* const tour = tours.find(el => el.id === id);

  // Handling the error incase there is no such id tour
  
  res.status(201).json({
    status: 'success',
    data: {
      tour,
    },
  }); */
};

// Creating new tour function
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'deleted',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
};
