const express = require('express');
const router = express();

router.get('/', (req, res) => {
    res.send('API Working');
});

router.use('/api/users', require('./UserRoutes'));

module.exports = router;
