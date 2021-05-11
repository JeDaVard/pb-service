require('express-async-errors');
const { Router } = require('express');
const routes = require('./api');
const response = require('./helpers/response');

const router = Router();

router.get('/health', (req, res) => {
    res.send('ok');
});

router.use('/v1', routes);
router.use((req, res) => response(res, 404));

module.exports = router;
