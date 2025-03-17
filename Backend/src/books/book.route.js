const express = require('express');
const router = express.Router();

router.post('/create-book', async (req, res) => {
    console.log("posted book is:\n", req.body);
});
router.get('/get-book', async (req, res) => {

});
router.put('/update-book', async (req, res) => {

});
router.delete('/delete-book', async (req, res) => {

});

module.exports = router;