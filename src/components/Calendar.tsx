import { format } from 'date-fns'
import locale from 'date-fns/locale/ko'
import useCalendar from '@veccu/react-calendar';
import styles from './Calendar.module.css';
import sojuBasicImage from '../assets/images/soju_basic.svg'

const Calendar = () => {
  const { headers, body } = useCalendar()

  return (
    <table className={ styles.table }>
      <thead>
        <tr>
          {headers.weekDays.map(({key, value}) => (
            <th key={ key }>
              { format(value, 'E', { locale }) }
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.value.map(({ key, value: days }) => (
          <tr key={ key }>
            {days.map(({ key, date }) => (
              <td key={ key }>
                <div className={ styles.item }>
                  <div>{ date }</div>

                  <figure>
                    <img src={sojuBasicImage} alt="" />
                  </figure>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Calendar
