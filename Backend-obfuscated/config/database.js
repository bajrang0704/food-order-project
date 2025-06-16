const mongoose = require('mongoose');

const connectDatabase = () => {
    const uri = process.env.NODE_ENV === 'PRODUCTION' 
        ? process.env.MONGODB_URI 
        : process.env.DB_LOCAL_URI;

    if (!uri) {
        console.error('MongoDB URI is not defined in environment variables');
        process.exit(1);
    }

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    })
    .catch(err => {
        console.log('Error connecting to database:', err);
        process.exit(1);
    });
};

module.exports = connectDatabase;
