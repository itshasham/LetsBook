import fs from 'fs';
import path from 'path';

const ordersFilePath = path.join(process.cwd(), 'database', 'orders.json');
const completedOrdersFilePath = path.join(process.cwd(), 'database', 'completedOrders.json');

const readDb = (filePath) => {
  return fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : [];
};

const writeDb = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const orders = readDb(ordersFilePath);
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching orders.', error });
    }
  }
  else if (req.method === 'POST') {
    try {
      const order = req.body;
      const ordersFilePath = path.join(process.cwd(), 'database', 'orders.json');
      let ordersData = [];
      if (fs.existsSync(ordersFilePath)) {
        const fileContent = fs.readFileSync(ordersFilePath, 'utf-8');
        ordersData = fileContent ? JSON.parse(fileContent) : [];
      } else {
        fs.writeFileSync(ordersFilePath, JSON.stringify(ordersData, null, 2));
      }
      const newOrder = { ...order, date: new Date().toISOString() };
      ordersData.push(newOrder);
      fs.writeFileSync(ordersFilePath, JSON.stringify(ordersData, null, 2));
      res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
      console.error('Error saving order:', error);
      res.status(500).json({ error: 'Failed to place the order' });
    }
  }
  else if (req.method === 'DELETE') {
    try {
      const { name, phone, date } = req.body;

      const orders = readDb(ordersFilePath);
      const completedOrders = readDb(completedOrdersFilePath);
      const orderIndex = orders.findIndex(
        (order) => order.name === name && order.phone === phone && order.date === date
      );

      if (orderIndex === -1) {
        return res.status(404).json({ message: 'Order not found.' });
      }
      const [completedOrder] = orders.splice(orderIndex, 1);
      completedOrders.push(completedOrder);
      writeDb(ordersFilePath, orders);
      writeDb(completedOrdersFilePath, completedOrders);
      return res.status(200).json({ message: 'Order completed successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Error completing the order.', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
