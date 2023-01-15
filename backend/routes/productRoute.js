const express = require('express')
const {
	getALlProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductDetails,
	createProductReview,
	getProductReviews,
	deleteReview,
	getAdminProducts,
} = require('../controllers/productController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

const router = express.Router()

// Get product
router.route('/products').get(getALlProducts)

// Get product --ADMIN
router
	.route('/admin/products')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts)

// Create Product
router
	.route('/admin/product/new')
	.post(isAuthenticatedUser, authorizeRoles('admin'), createProduct)

// update & Delete Produt
router
	.route('/admin/product/:id')
	.put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router.route('/product/:id').get(getProductDetails)

router.route('/review').put(isAuthenticatedUser, createProductReview)

router
	.route('/reviews')
	.get(getProductReviews)
	.delete(isAuthenticatedUser, deleteReview)

module.exports = router
