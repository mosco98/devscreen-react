import axios from 'axios'

const url = 'https://cors-anywhere.herokuapp.com/https://quiet-bayou-45541.herokuapp.com/'

export const articles = async (myCancelToken) => {
  try {
    const { data } = await axios.get(url, {
      cancelToken: myCancelToken
    })
    return data
  } catch (error) {
    throw error
  }
}
