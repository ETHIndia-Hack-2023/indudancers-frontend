'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type DancerData = {
  lvl: number
  coins_per_minute: number
  price: number
}

type DanceFloor = {
  id: number
  dancers: DancerData[][]
}

type DancerContextProps = {
  children: ReactNode
}

type DancerContextValue = {
  dancers: DancerData[]
  danceFloors: DanceFloor[]
  addDancer: (dancer: DancerData) => void
  removeDancer: (index: number) => void
  addDancerToFloor: (floorId: number, dancer: DancerData) => void
  getDancersByFloorId: (floorId: number) => DancerData[] | undefined
  getAllFloors: () => number[]
}

const DancerContext = createContext<DancerContextValue | undefined>(undefined)

export const DancerProvider: React.FC<DancerContextProps> = ({ children }) => {
  const [dancers, setDancers] = useState<DancerData[]>([])
  const [danceFloors, setDanceFloors] = useState<DanceFloor[]>([])

  const addDancer = (dancer: DancerData) => {
    setDancers((prevDancers) => [...prevDancers, dancer])
  }

  const removeDancer = (index: number) => {
    setDancers((prevDancers) => {
      const newDancers = [...prevDancers]
      newDancers.splice(index, 1)
      return newDancers
    })
  }

  const addDancerToFloor = (floorId: number, dancer: DancerData) => {
    setDanceFloors((prevFloors) => {
      const updatedFloors = prevFloors.map((floor) => {
        if (floor.id === floorId) {
          return {
            ...floor,
            dancers: [...floor.dancers, [dancer]],
          }
        }
        return floor
      })
      return updatedFloors
    })
  }

  const getDancersByFloorId = (floorId: number) => {
    const floor = danceFloors.find((floor) => floor.id === floorId)
    return floor?.dancers[0]
  }

  const getAllFloors = () => danceFloors.map((floor) => floor.id)

  const value: DancerContextValue = {
    dancers,
    danceFloors,
    addDancer,
    removeDancer,
    addDancerToFloor,
    getDancersByFloorId,
    getAllFloors,
  }

  return (
    <DancerContext.Provider value={value}>{children}</DancerContext.Provider>
  )
}

export const useDancerContext = () => {
  const context = useContext(DancerContext)
  if (!context) {
    throw new Error('useDancerContext must be used within a DancerProvider')
  }
  return context
}
