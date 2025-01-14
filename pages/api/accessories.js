import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(),'database', 'accessories.json');

const readDb = () => {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
};

const writeDb = (db) => {
  fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
};

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
  try {
    const db = readDb();
    res.status(200).json({ accessories: db.accessories }); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accessories', error });
  }
  break;


    case 'POST':
      try {
        const db = readDb();
        const newAccessory = req.body;

        newAccessory.id = (db.accessories.length > 0 ? db.accessories[db.accessories.length - 1].id : 0) + 1;
        db.accessories.push(newAccessory);
        
        writeDb(db);
        res.status(201).json({ message: 'Accessory added successfully', data: newAccessory });
      } catch (error) {
        res.status(500).json({ message: 'Error adding the accessory', error });
      }
      break;

    case 'DELETE':
      const { accessoryId } = req.query;
      try {
        const db = readDb();
        const accessoryIndex = db.accessories.findIndex((accessory) => accessory.id === parseInt(accessoryId));

        if (accessoryIndex === -1) {
          return res.status(404).json({ message: 'Accessory not found' });
        }

        db.accessories.splice(accessoryIndex, 1);
        writeDb(db);
        res.status(200).json({ message: 'Accessory deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting the accessory', error });
      }
      break;

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}