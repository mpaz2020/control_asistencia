export function formatDate(date) {
  return new Date(date).toLocaleString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Lima',
  })
}

/**
 * Evalua si una fecha esta entre dos horas
 * @param {Date} time Date to evaluate
 * @param {number} from Hour from
 * @param {number} to Hour to
 * @param {boolean} nextDay Evaluate 'to' parameter on next day
 * @returns {boolean}
 */
export function timeIsBetween(time, from, to, nextDay = false) {
  const timeFrom = new Date(time).setHours(from, 0, 0, 0)
  const nextDayMillis = nextDay ? 1 * 24 * 60 * 60 * 1000 : 0
  const timeTo = new Date(time).setHours(to, 59, 59, 999) + nextDayMillis
  return time.getTime() >= timeFrom && time.getTime() <= timeTo
}

/**
 * Convierte una fecha fecha a UTC
 * @param {Date} date
 * @returns new Date in UTC
 */
export function convertDateToUTC(date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  )
}

export function convertDateFromExcel(date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )
}
