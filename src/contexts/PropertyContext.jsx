import React from 'react'
import { createPropertyStore } from '../stores/PropertyStore'
import { useLocalObservable } from 'mobx-react'

const PropertyContext = React.createContext(null)

export const PropertyProvider = ({children}) => {
  const PropertyStore = useLocalObservable(() => new createPropertyStore())

  return (   
      <PropertyContext.Provider value={PropertyStore}>
        {children}
      </PropertyContext.Provider>

  )
}

export const usePropertyStore = () => React.useContext(PropertyContext)
