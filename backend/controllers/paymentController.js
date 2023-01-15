const catchAsyncErrors = require('../middleware/catchAsyncErrors')

const Stripe = require('stripe')
const stripe = Stripe(
	'sk_test_51KNhHGSGs0f4DP1JSX3GU8OpgbgpRsk649gUWQxotEZHF45ZlLiwoRnDXaHn6BUtROqtSGXDoH8Xg3yn45nf5ZPn00wtKyLvdt'
)

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
	const myPayment = await stripe.paymentIntents.create({
		amount: req.body.amount,
		currency: 'inr',
		metadata: {
			company: 'Ecommerce',
		},
	})

	res
		.status(200)
		.json({ success: true, client_secret: myPayment.client_secret })
})

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
	res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY })
})
