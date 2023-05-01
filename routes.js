const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getUserSummary,
  getAllStocks,
  getStockBySymbol,
  getStockHistory,
  getPortfolio,
  buyStock,
  sellStock,
} = require('./server');

// Define isAuthenticated middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

// User routes
router.post('/user/register', register);
router.post('/user/login', login);
router.get('/user/logout', logout);
router.get('/user/summary', isAuthenticated, getUserSummary);

// Stock routes
router.get('/stocks', getAllStocks);
router.get('/stocks/:symbol', getStockBySymbol);
router.get('/stocks/:symbol/history', getStockHistory);

// Portfolio routes
router.get('/portfolio', isAuthenticated, getPortfolio);
router.post('/portfolio/buy', isAuthenticated, buyStock);
router.post('/portfolio/sell', isAuthenticated, sellStock);

module.exports = router;
