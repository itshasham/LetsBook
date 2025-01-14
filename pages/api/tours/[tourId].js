import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { tourId } = req.query; 
  const filePath = path.join(process.cwd(), 'database', 'db.json');

  if (req.method === 'GET') {
    try {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const db = JSON.parse(fileData);
      const tour = db.tours.find((tour) => tour.id === parseInt(tourId, 10));
      if (!tour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      return res.status(200).json({ data: tour });
    } catch (error) {
      console.error('Error fetching tour details:', error);
      return res.status(500).json({ message: 'Error fetching the tour', error });
    }
  }
  else if (req.method === 'DELETE') {
    try {
      console.log('TourId from query:', tourId);
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const db = JSON.parse(fileData);
      console.log('Tours in DB:', db.tours);
      const tourIndex = db.tours.findIndex((tour) => tour.id === parseInt(tourId, 10));
      if (tourIndex === -1) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      db.tours.splice(tourIndex, 1);
      fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
      return res.status(200).json({ message: 'Tour deleted successfully' });
    } catch (error) {
      console.error('Error deleting tour:', error);
      return res.status(500).json({ message: 'Error deleting the tour', error });
    }
  }
  else if (req.method === 'PUT') {
    try {
      const { tourName, cost, tripStartDate, tripEndDate, lahorePickupTime, pickupLocation } = req.body;
      console.log('TourId from query:', tourId);
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const db = JSON.parse(fileData);
      console.log('Tours in DB:', db.tours);
      const tourIndex = db.tours.findIndex((tour) => tour.id === parseInt(tourId, 10));
      if (tourIndex === -1) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      db.tours[tourIndex] = {
        ...db.tours[tourIndex],
        tourName,
        cost,
        tripStartDate,
        tripEndDate,
        lahorePickupTime,
        pickupLocation
      };
      fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
      return res.status(200).json({ message: 'Tour updated successfully' });
    } catch (error) {
      console.error('Error updating tour:', error);
      return res.status(500).json({ message: 'Error updating the tour', error });
    }
  }
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
