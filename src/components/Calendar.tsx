import useCalendar from '@veccu/react-calendar';
import { format } from 'date-fns'
import locale from 'date-fns/locale/ko'

const Calendar = () => {
  const { headers, body, view } = useCalendar()

  return (
    <table>
      <thead>
        <tr>
          {headers.weekDays.map(({key, value}) => {
            return <th key={ key }>{ format(value, 'E', { locale }) }</th>
          })}
        </tr>
      </thead>
      <tbody>
        {body.value.map(({ key, value: days }) => (
          <tr key={ key }>
            {days.map(({ key, date }) => (
              <td key={ key }>{ date }</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Calendar
