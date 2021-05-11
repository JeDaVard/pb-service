const response = require('../helpers/response');
const { Router } = require('express');
const domainService = require('../../service/handlers/domain');

const router = Router();

router.get('/', async (req, res) => {
    const data = await domainService.getUrlsLists(); // don't await for this
    response(res, 200, true, data);
});

router.get('/:id', async (req, res) => {
    const data = await domainService.getDomainsByList(req.params.id); // don't await for this
    response(res, 200, true, data);
});

module.exports = router;
