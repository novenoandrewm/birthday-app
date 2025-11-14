// src/hooks/useBirthdayParams.ts
import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

export interface BirthdayParams {
  name?: string
  nickname?: string
  from?: string
}

export const useBirthdayParams = (): BirthdayParams => {
  const { search } = useLocation()

  return useMemo(() => {
    if (!search) return {}

    const params = new URLSearchParams(search)

    const name = params.get('name') ?? undefined
    const nickname = params.get('nickname') ?? undefined
    const from = params.get('from') ?? undefined

    return { name, nickname, from }
  }, [search])
}
