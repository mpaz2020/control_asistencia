export function formatDateUTC(val) {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
  }).format(new Date(val))
}

export function formatDateLocal(val) {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Lima',
  }).format(new Date(val))
}

export function formatNumber(val, decimales = 3, suffix = '') {
  if (!val || val === '') return null
  return `${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(parseFloat(val))}${suffix}`
}

export const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

export const MIN_YEAR_MONTH = '2010/01'
export const FORMATO_FECHA = 'DD/MM/YYYY'

export const PERMISSIONS = {
  ADMIN: 'Admin',
  ADMINISTRADOR: 'Administrador',
  OPERADOR: 'Operador',
  SUPERVISOR: 'Supervisor',
  'quality:batch:approve': ['Admin', 'Administrador', 'Supervisor'],
  'user:read': ['*'],
  'user:create': ['Admin', 'Administrador'],
  'user:update': ['Admin', 'Administrador'],
  'user:delete': ['Admin', 'Administrador'],
}
