import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'database', 'contactUs.json');

const readDb = () => {

    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
};

const writeDb = (data) => {

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const db = readDb();
            return res.status(200).json(db.contacts);
        } catch (error) {
            console.error('Error fetching contact queries:', error);
            return res.status(500).json({ message: 'Error reading the database', error });
        }
    }
    else if (req.method === 'POST') {
        try {
            const { email, phoneno, message } = req.body; 

            const db = readDb();

            const newContact = {
                email,
                phoneno,
                message,
                date: new Date().toISOString(), 
            };

            db.contacts.push(newContact);

            writeDb(db);

            return res.status(200).json({ message: 'Message sent successfully' });
        } catch (error) {
            console.error('Error processing contact message:', error);
            return res.status(500).json({ message: 'Error storing the message', error });
        }
    } else {
        return res.status(405).json({ message: 'Err' });
    }
}
