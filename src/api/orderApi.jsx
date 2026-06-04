import axios from 'axios'

export const getOrders = async () => {
  const response = await axios.get(
    'https://fakestoreapi.com/products'
  )

  return response.data
}