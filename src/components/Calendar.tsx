import { format } from 'date-fns'
import locale from 'date-fns/locale/ko'
import useCalendar from '@veccu/react-calendar';
import { IonContent } from '@ionic/react';
import styles from './Calendar.module.css';
import sojuBasicImage from '../assets/images/soju_basic.svg'

const Calendar = () => {
  const { headers, body } = useCalendar()

  return (
    <IonContent>
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
              {days.map(({ key, date, value, isCurrentDate, isCurrentMonth }) => (
                <td key={ key }>
                  { isCurrentMonth && <div className={ styles.item }>
                    <div className={ isCurrentDate ? styles.today : '' }>
                      <div>{ date }</div>
                    </div>

                    <figure>
                      <img src={sojuBasicImage} alt=""/>
                    </figure>
                  </div> }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </IonContent>
  )
}

export default Calendar
