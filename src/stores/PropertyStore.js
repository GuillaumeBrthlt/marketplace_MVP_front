import { runInAction} from 'mobx'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000/';

export function createPropertyStore() {
  return {
    loading: null,
    hasErrors: null,
    properties: [],
    sellers: [],
    propertyDetails: {
      id: null,
      title: null,
      description: null,
      user_id: null,
    },
    sellerDetails: {
      id: null,
      email: null,
    },

    async getProperties() {
      runInAction(() => {
        this.loading = true
        this.hasErrors = false
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
        this.hasErrors = false
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

      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      let payload = propertyData
      
      try {
        let response = await axios.post(`${BASE_URL}properties`, payload);
        if (response.status == 201) {
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

    async editProperty(propertyData, id) {
      localStore.getItem('properties', this.properties)
      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      let payload = propertyData
      
      try {
        let response = await axios.put(`${BASE_URL}properties/${id}`, payload);
        if (response.status == 200) {
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


    async deleteProperty(id) {
      

      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      
      try {
        let response = await axios.delete(`${BASE_URL}properties/${id}`);
        if (response.status == 204) {
          runInAction (() => {
            this.loading = false
         })
        } else {
          throw new Error('annonce non supprimée')
        }  
      } catch (error) {
        runInAction (() => {
          this.loading = false
          this.hasErrors = true
        })
      }
    },

    async setPropertyDetails(page_id) {
      runInAction(() => {
        this.loading = true
        this.hasErrors = false
      })
      try {
        await this.getProperties()
        let thisproperty = this.properties.filter(property => property.id == page_id)[0]
        runInAction(() => {
          this.loading = false
          this.propertyDetails = thisproperty
          })
      } catch(error) {
        console.error(error)
        runInAction(() => {
          this.hasErrors = true
        })
      }
    },

    async setSellerDetails(user_id) {
      runInAction(() => {
        this.loading = true
        this.hasErrors = false
      })
      try {
        await this.getSellers()
        let thisseller = this.sellers.filter(seller => seller.id == user_id)[0]
        runInAction(() => {
          this.loading = false
          this.sellerDetails = thisseller
          })
      } catch(error) {
        console.error(error)
        runInAction(() => {
          this.hasErrors = true
        })
      }
    },
  }
}