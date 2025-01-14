import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(),'database', 'accessories.json');

const readDb = async () => {
  const fileData = await fs.promises.readFile(filePath, 'utf-8');
  return JSON.parse(fileData);
};

const writeDb = async (db) => {
  await fs.promises.writeFile(filePath, JSON.stringify(db, null, 2));
};

export default async function handler(req, res) {
  const { accessoryId } = req.query; 

  switch (req.method) {
    case 'GET':
      try {
        const db = await readDb();
        if (!db.accessories) {
          throw new Error('Accessories data not found');
        }

        if (accessoryId) {
          const accessory = db.accessories.find(
            (accessory) => accessory.id === parseInt(accessoryId, 10)
          );

          if (!accessory) {
            return res.status(404).json({ message: 'Accessory not found' });
          }

          return res.status(200).json({ product: accessory });
        }

        return res.status(200).json({ accessories: db.accessories });
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching accessories', error: error.message });
      }

    case 'PUT':
      try {
        const { name, price, description, stock } = req.body; 

        const db = await readDb();
        const accessoryIndex = db.accessories.findIndex(
          (accessory) => accessory.id === parseInt(accessoryId, 10)
        );

        if (accessoryIndex === -1) {
          return res.status(404).json({ message: 'Accessory not found' });
        }

        db.accessories[accessoryIndex] = {
          ...db.accessories[accessoryIndex],
          name,
          price,
          description,
          stock,
        };

        await writeDb(db);
        return res.status(200).json({ message: 'Accessory updated successfully' });
      } catch (error) {
        return res.status(500).json({ message: 'Error updating the accessory', error: error.message });
      }

    case 'DELETE':
      try {
        const db = await readDb();
        const accessoryIndex = db.accessories.findIndex(
          (accessory) => accessory.id === parseInt(accessoryId, 10)
        );

        if (accessoryIndex === -1) {
          return res.status(404).json({ message: 'Accessory not found' });
        }

        db.accessories.splice(accessoryIndex, 1);

        await writeDb(db);

        return res.status(200).json({ message: 'Accessory deleted successfully' });
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting the accessory', error: error.message });
      }

    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
