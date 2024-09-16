// server/uploadData.js
const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const Medicine = require('./models/Medicine');

mongoose.connect('mongodb://localhost:27017/MediTalker', { useNewUrlParser: true, useUnifiedTopology: true })
    //mongodb+srv://dhanyataphule4263:esHdFLkB9A4adszE@cluster0.jjuoyxu.mongodb.net/MediTalker
    .then(() => {
        console.log('Connected to MongoDB');
        uploadData();
    })
    .catch(err => console.error('Error connecting to MongoDB', err));

const uploadData = () => {
    const results = [];
    const csvFilePath = path.join(__dirname, 'medicine_dataset.csv'); // Correct path

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            const substitutes = [];
            const sideEffects = [];
            const uses = [];

            for (let i = 0; i < 5; i++) {
                if (row[`substitute${i}`]) substitutes.push(row[`substitute${i}`]);
            }

            for (let i = 0; i < 42; i++) {
                if (row[`sideEffect${i}`]) sideEffects.push(row[`sideEffect${i}`]);
            }

            for (let i = 0; i < 5; i++) {
                if (row[`use${i}`]) uses.push(row[`use${i}`]);
            }

            results.push({
                name: row['name'],
                substitutes,
                sideEffects,
                uses,
                chemicalClass: row['Chemical Class'],
                habitForming: row['Habit Forming'],
                therapeuticClass: row['Therapeutic Class'],
                actionClass: row['Action Class'],
            });
        })
        .on('end', () => {
            Medicine.insertMany(results)
                .then(() => {
                    console.log('Data successfully uploaded');
                    mongoose.disconnect();
                })
                .catch(err => console.error('Error uploading data', err));
        });
};
