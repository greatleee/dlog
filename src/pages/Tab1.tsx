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
import { caretDownOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import MonthPickerBottomsheet from '../components/bottomsheets/MonthPickerBottomsheet';
import Calendar from '../components/Calendar';
import { checkFuture } from '../utils/date';


const Tab1: React.FC = () => {
  const selectedDatetime = useRef(new Date().toISOString());
  const confirmedDatetime = useRef(new Date().toISOString());

  const [yearMonth, setYearMonth] = useState('');
  const [showBottomsheet, setShowBottomsheet] = useState(false);

  const [showToast, dismissToast] = useIonToast();

  useEffect(() => {
    confirm();
  }, []);

  const changeYearMonth = (value: string) => {
    selectedDatetime.current = value;
  };

  const confirm = () => {
    const selectedDate = new Date(selectedDatetime.current);

    if (checkFuture(selectedDate)) {
      showToast({ message: '미래의 음주는 기록할 수 없오!', color: 'danger', duration: 2000 });
    } else {
      confirmedDatetime.current = selectedDatetime.current;
      const confirmedDate = new Date(confirmedDatetime.current);
      setYearMonth(`${confirmedDate.getFullYear()}년 ${confirmedDate.getMonth() + 1}월`);
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
                { yearMonth }
                <IonIcon icon={caretDownOutline}/>
              </IonChip>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <Calendar date={new Date(confirmedDatetime.current)}/>
        </IonContent>
      </IonPage>

      <MonthPickerBottomsheet
        isOpen={showBottomsheet}
        datetime={confirmedDatetime.current}
        onChangeYearMonth={changeYearMonth}
        onDismiss={confirm}
      />
    </>
  );
};

export default Tab1;
