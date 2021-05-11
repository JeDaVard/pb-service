const { Router } = require('express');
const listsRouter = require('./lists');
const { errorHandler } = require('../middlewares/errors');

const router = Router();

router.use('/list', listsRouter);
router.use(errorHandler);

module.exports = router;
