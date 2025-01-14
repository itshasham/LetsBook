import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'database', 'db.json');


const readDb = () => {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
};

const writeDb = (db) => {
  fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
};

export default function handler(req, res) {
  const { tourId } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const db = readDb();
        res.status(200).json(db.tours);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching tours', error });
      }
      break;

    case 'POST':
      try {
        const db = readDb();
        const newTour = req.body;
        newTour.id = (db.tours.length > 0 ? db.tours[db.tours.length - 1].id : 0) + 1;
        db.tours.push(newTour);
        
        writeDb(db);
        res.status(201).json({ message: 'Tour added successfully', data: newTour });
      } catch (error) {
        res.status(500).json({ message: 'Error adding the tour', error });
      }
      break;

    case 'DELETE':
      try {
        const db = readDb();
        const tourIndex = db.tours.findIndex((tour) => tour.id === parseInt(tourId));

        if (tourIndex === -1) {
          return res.status(404).json({ message: 'Tour not found' });
        }

        db.tours.splice(tourIndex, 1);
        writeDb(db);
        res.status(200).json({ message: 'Tour deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting the tour', error });
      }
      break;

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
