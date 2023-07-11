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
const { logOut } = require('../controllers/users');

router.use(requestLogger); // подключаем логгер запросов

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/', authRoutes);
router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('/logout', logOut);

/* router.use('/logout', (req, res, next) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: true,
  })
    .send();
  next();
}); */

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такая страница не найдена'));
});

router.use(errorLogger); // подключаем логгер ошибок

router.use(errors());
router.use(errorHandler);

module.exports = router;
