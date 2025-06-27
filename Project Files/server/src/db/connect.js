const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://shopsmart:test123@cluster0.jsjtxes.mongodb.net/grocerydb?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));
