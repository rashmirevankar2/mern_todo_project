const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> {
  console.log('MongoDB connected');
  app.listen(PORT, ()=> console.log('Server running on port', PORT));
}).catch(err=> {
  console.error('MongoDB connection error', err);
});
