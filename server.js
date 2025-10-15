const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_51234567890abcdef') // Тестовый секретный ключ

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Создание PaymentIntent для Stripe
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // в центах
      currency: currency,
      metadata: {
        integration_check: 'accept_a_payment',
      },
    })

    res.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    res.status(500).json({ error: error.message })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Payment server is running' })
})

app.listen(PORT, () => {
  console.log(`Payment server running on port ${PORT}`)
})