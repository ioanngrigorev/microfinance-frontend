import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_51234567890abcdef') // Тестовый ключ

const PaymentForm = ({ onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setError(null)

    const cardElement = elements.getElement(CardElement)

    try {
      // Создаем PaymentIntent на бэкенде
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100, // $1.00 в центах
          currency: 'usd',
        }),
      })

      const { clientSecret } = await response.json()

      // Подтверждаем платеж
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        }
      })

      if (error) {
        setError(error.message)
        onPaymentError(error)
      } else if (paymentIntent.status === 'succeeded') {
        onPaymentSuccess(paymentIntent)
      }
    } catch (err) {
      setError('Произошла ошибка при обработке платежа')
      onPaymentError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white p-4 border border-gray-300 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 px-8 rounded-lg text-lg font-semibold transition"
      >
        {loading ? 'Обработка...' : 'Оплатить $1'}
      </button>
    </form>
  )
}

const StripePayment = ({ onPaymentSuccess, onPaymentError }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm 
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
      />
    </Elements>
  )
}

export default StripePayment
