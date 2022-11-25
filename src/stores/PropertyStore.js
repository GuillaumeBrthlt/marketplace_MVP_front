import { runInAction, toJS } from 'mobx'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000/';

export function createPropertyStore() {
  return {
    loading: null,
    hasErrors: null,
    properties: [],
    sellers: [],

    async getProperties() {
      runInAction(() => {
        this.loading = true
      })
      try {
        let response = await axios(`${BASE_URL}properties`)
        let data = await response.data
        if (data) {
          runInAction(() => {
            this.loading = false
            this.properties = data
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getSellers() {
      runInAction(() => {
        this.loading = true
      })
      try {
        let response = await axios(`${BASE_URL}members`)
        let data = await response.data
        if (data) {
          runInAction(() => {
            this.loading = false
            this.sellers = data
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async createProperty(propertyData) {
      token = localStorage.getItem('auth_token')

      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      let payload = {
        headers: {
          'Authorization': `${token}`
        },
        body: `${propertyData}`
      }
      
      try {
        let response = await axios.post(`${BASE_URL}properties`, payload);
        if (response.ok) {
          runInAction (() => {
            this.loading = false
          })
        } else {
          throw new Error('informations non valides')
        }  
      } catch (error) {
        runInAction (() => {
          this.loading = false
          this.hasErrors = true
        })
      }
    },
  }
}