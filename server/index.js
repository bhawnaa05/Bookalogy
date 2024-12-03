const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bookRouter = require('./router/bookRouter');
const Payrouter = require('./router/Payrouter');
const authRoutes = require('./router/auth');
const orderRouter = require('./router/orderRouter');
const cartRouter = require('./router/cartRouter');
const Order = require('./models/orderModel');
 
require('dotenv').config()

const app = express();

// Middleware setup
app.use(cors({
  // origin: 'http://localhost:3000', // Replace with your frontend URL
  origin:'https://bookalogy-bhawna-bhandaris-projects.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
}).catch(err => {
  console.error('Database connection error:', err);
});

app.get('/',(req,res)=>{
  console.log('Site is working ');
})

// Webhook route
app.post('/api/webhook', async (req, res) => {
  const data = req.body;

  console.log('Webhook received:', data);

  const paymentStatus = data.data.payment['payment_status'];
  const paymentId = data.data.payment['cf_payment_id'];
  const orderId = data.data.order['order_id'];

  try {
    const order = await Order.findOneAndUpdate(
      { orderId },
      {
        $set: {
          'paymentDetails.paymentId': paymentId,
          'paymentDetails.paymentStatus': paymentStatus,
          isPaid: paymentStatus === 'SUCCESS',
          paidAt: paymentStatus === 'SUCCESS' ? new Date() : null
        }
      },
      { new: true }
    );

    if (!order) {
      console.error(`Order with ID ${orderId} not found.`);
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log(`Payment for order ${orderId} was ${paymentStatus.toLowerCase()}.`);
    res.status(200).json({ message: 'Webhook received successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Routes setup
app.use('/api/books', bookRouter);
app.use('/api/pay', Payrouter);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
