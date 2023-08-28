const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data//data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // Creating a new id
  const newId = tours[tours.length - 1].id + 1;

  // Creating new tour with the new id using object.assign (We don't want to mutate the original object).

  const newTour = Object.assign({ id: newId }, req.body);

  // Push the new tour to the tours array
  tours.push(newTour);

  // Persist the data in to the file

  fs.writeFile(
    `${__dirname}/dev-data//data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
