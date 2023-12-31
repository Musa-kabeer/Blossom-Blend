const router = require('express').Router();
const { protect } = require('../controller/authController');
const {
     getCheckoutSession,
     getAllOrders,
} = require('../controller/orderController');

router.post('/checkout-session', protect, getCheckoutSession);

router.get('/', protect, getAllOrders);

module.exports = router;
