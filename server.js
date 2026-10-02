import app from './app.js';
import {connectDB} from './config/db.js'; 

const uri = process.env.URI || "mongodb://localhost:27017/backend_db";
const PORT = process.env.PORT || 5000;

await connectDB(uri);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});