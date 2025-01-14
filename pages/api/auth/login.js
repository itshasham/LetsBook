import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'database', 'adminLogin.json');

export default function handler(req, res) {
    const { email, password } = req.body; 
    const readDb = () => {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileData);
    };

    if (req.method === 'POST') {
        try {
            const db = readDb();
            const admin = db.admin.find(
                (user) => user.email === email && user.password === password
            );
            if (!admin) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            return res.status(200).json({ message: 'Login successful' });

        } catch (error) {
            console.error('Error reading or processing admin login data:', error);
            return res.status(500).json({ message: 'Error processing the login request', error });
        }
    }
    else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
