const router = require('express').Router();
// const httpConstants = require('http2').constants;
const { errors } = require('celebrate');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const authRoutes = require('./auth');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const errorHandler = require('../middlewares/errorHandler');

router.use(requestLogger); // подключаем логгер запросов

router.use('/', authRoutes);
router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такая страница не найдена'));
});

router.use(errorLogger); // подключаем логгер ошибок

router.use(errors());
router.use(errorHandler);

module.exports = router;
