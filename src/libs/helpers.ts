// Add 0 before month if month is less than 10.
import { format } from 'date-fns'

//eslint-disable-next-line
export const addZeroToNumber = num => {
    const intger = parseInt(num as string, 10)
    if (intger < 10) {
        return '0' + intger
    }
    return num
}

//eslint-disable-next-line
export const monthFormatter = (year, month): string => {
    const currentMonth = addZeroToNumber(month)
    return format(new Date(`${year}-${currentMonth}-01T00:00`), 'MMMM')
}
