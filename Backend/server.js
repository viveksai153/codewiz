const express = require('express');
const http = require('http');
const connectDB = require('./config/db_connect');
const cors = require('cors');
const { Server } = require('socket.io'); // Import socket.io

require('dotenv').config();

const authRoutes = require('./routes/authrouter');
const notificationRoutes = require('./routes/notificationRoutes');
const snippetRoutes = require('./routes/snippetRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const communityRoutes = require('./routes/communityRoutes');
const adminRoutes = require('./routes/adminRoutes');
const communitysnippetroutes = require('./routes/communitySnippetRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "auth-token"],
    credentials: true
  }
});

// Store the socket.io instance in the app object
app.set('socketio', io);

// Connect to database
connectDB();

// Use the cors middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "auth-token"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/snippets', snippetRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/community-snippets', communitysnippetroutes);
app.use('/api/messages', messageRoutes);

// Error handling middleware (after all other middleware and routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinCommunity', (communityId) => {
    socket.join(communityId);
    console.log(`User joined community: ${communityId}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
