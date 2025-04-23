import axios from 'axios'

import { IPet, staticTxt } from '#/lib'

const { baseUrl } = staticTxt

export const PetAPI = {
  async getAllPets(): Promise<IPet[]> {
    try {
      const response = await axios.get<IPet[]>(`${baseUrl}/pets`)
      return response.data
    } catch (error) {
      console.error('Error fetching pets:', error)
      return []
    }
  },
}
