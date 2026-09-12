import { useEffect, useState } from 'react'

export type Schedule = {
  /** Días abiertos según Date.getDay(): 0 = domingo ... 6 = sábado */
  days: number[]
  /** Hora de apertura en formato "HH:MM" de 24 h (hora de Caracas) */
  opens: string
  /** Hora de cierre en formato "HH:MM" de 24 h */
  closes: string
}

export type OpenStatus = {
  openNow: boolean
  openToday: boolean
  label: string
}

const WEEKDAY_MAP: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function formatClock(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const period = h >= 12 ? 'p.m.' : 'a.m.'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

function caracasNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Caracas',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())

  const value = (type: string) => parts.find((p) => p.type === type)?.value ?? ''

  const weekday = WEEKDAY_MAP[value('weekday')] ?? -1
  const minutes = toMinutes(`${value('hour')}:${value('minute')}`)

  return { weekday, minutes }
}

export function useOpenNow(schedule?: Schedule): OpenStatus {
  const [, setTick] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 60_000)
    return () => window.clearInterval(id)
  }, [])

  if (!schedule) {
    return { openNow: false, openToday: false, label: 'Cerrado hoy' }
  }

  const { weekday, minutes } = caracasNow()
  const openToday = schedule.days.includes(weekday)
  const opens = toMinutes(schedule.opens)
  const closes = toMinutes(schedule.closes)
  const openNow = openToday && minutes >= opens && minutes < closes

  let label: string
  if (!openToday) {
    label = 'Cerrado hoy'
  } else if (openNow) {
    label = 'Abierto ahora'
  } else if (minutes < opens) {
    label = `Abre hoy a las ${formatClock(schedule.opens)}`
  } else {
    label = `Abierto hasta las ${formatClock(schedule.closes)}`
  }

  return { openNow, openToday, label }
}