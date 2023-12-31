import { Locales } from '@/types/Locations'

interface filterUnitsProps {
  open_hour: string
  close_hour: string
  results: Locales[]
  showOfClosedUnits?: boolean
}

const filterUnits = ({
  open_hour,
  close_hour,
  results,
  showOfClosedUnits,
}: filterUnitsProps) => {
  const transform_weekday = (weekdays: number) => {
    switch (weekdays) {
      case 0:
        return 'Dom.'
      case 6:
        return 'Sáb.'
      default:
        return 'Seg. à Sex.'
    }
  }
  const start_hour_filter = parseInt(open_hour, 10)
  const end_hour_filter = parseInt(close_hour, 10)

  const filteredResults = results.filter((item) => {
    const todays_weekday = transform_weekday(new Date().getDay())
    const hour = new Date().getHours()
    
    if (!item.schedules) return false

    const schedules = item.schedules.find((schedule) => schedule)
    if (!schedules) return false

    const schedule_hour = schedules.hour
    const schedule_weekday = schedules.weekdays

    if (todays_weekday === schedule_weekday) {
      if (schedule_hour !== 'Fechada') {
        const [open_hour, close_hour] = schedule_hour.split(' às ')
        const open_hour_int = parseInt(open_hour.replace(/h.*/, ''), 10)
        const close_hour_int = parseInt(close_hour.replace('/h.*/', ''), 10)

        if (
          hour >= start_hour_filter &&
          hour <= end_hour_filter &&
          hour >= open_hour_int &&
          hour <= close_hour_int
        ) {
          return true
        } else {
          item.opened = false
          return showOfClosedUnits
        }
      } else if (schedule_hour === 'Fechada') {
        item.opened = false
        return showOfClosedUnits
      }
    }
    return false
  })
  return filteredResults
}

export default filterUnits
