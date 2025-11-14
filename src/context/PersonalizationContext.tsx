// src/context/PersonalizationContext.tsx
import React, { createContext, useContext, useMemo } from 'react'
import { useBirthdayParams } from '../hooks/useBirthdayParams'
import { PERSONALIZATION_DEFAULTS } from '../config/personalization'

type PersonalizationContextValue = {
  nickname: string
  fromName: string
}

const PersonalizationContext = createContext<PersonalizationContextValue | undefined>(undefined)

export const PersonalizationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const params = useBirthdayParams()

  const value = useMemo<PersonalizationContextValue>(() => {
    const nicknameRaw =
      params.nickname || params.name || PERSONALIZATION_DEFAULTS.nickname
    const fromRaw = params.from || PERSONALIZATION_DEFAULTS.fromName

    return {
      nickname: nicknameRaw.trim(),
      fromName: fromRaw.trim(),
    }
  }, [params])

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  )
}

export const usePersonalization = (): PersonalizationContextValue => {
  const ctx = useContext(PersonalizationContext)

  if (!ctx) {
    throw new Error('usePersonalization must be used within PersonalizationProvider')
  }
  return ctx
}
