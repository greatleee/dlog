import {
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import { format } from 'date-fns'
import locale from 'date-fns/locale/ko'
import { caretDownOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import MonthPickerBottomsheet from '../components/bottomsheets/MonthPickerBottomsheet';
import Calendar from '../components/Calendar';
import { useRecordsDispatch } from '../providers/RecordsContext';
import { checkFuture } from '../utils/date';


const todayYearMonth = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth());
};

const Tab1: React.FC = () => {
  const selectedDate = useRef<Date>(todayYearMonth());
  const [yearMonth, setYearMonth] = useState<Date>(todayYearMonth());
  const [showBottomsheet, setShowBottomsheet] = useState(false);

  const [showToast, dismissToast] = useIonToast();

  const dispatch = useRecordsDispatch();

  const changeYearMonth = (value: string) => {
    const date = new Date(value);
    const yearMonthDate = new Date(date.getFullYear(), date.getMonth());
    selectedDate.current = yearMonthDate;
  };

  const confirm = () => {
    if (checkFuture(selectedDate.current)) {
      showToast({ message: '미래의 음주는 기록할 수 없오!', color: 'danger', duration: 2000 });
    } else {
      setYearMonth(selectedDate.current);
      dispatch({ type: 'SET_CALENDAR_DATE', date: selectedDate.current });
    }
    setShowBottomsheet(false);
  };

  return (
    <>
      <IonPage>
        <IonHeader collapse="fade">
          <IonToolbar>
            <IonTitle>
              <IonChip onClick={() => setShowBottomsheet(true)}>
                { format(yearMonth, 'yyyy년 M월', { locale }) }
                <IonIcon icon={caretDownOutline}/>
              </IonChip>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <Calendar/>
        </IonContent>
      </IonPage>

      <MonthPickerBottomsheet
        isOpen={showBottomsheet}
        datetime={format(yearMonth, 'yyyy-MM', { locale })}
        onChangeYearMonth={changeYearMonth}
        onDismiss={confirm}
      />
    </>
  );
};

export default Tab1;
