const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);
router.put('/', categoryController.updateCategory);

module.exports = router;
