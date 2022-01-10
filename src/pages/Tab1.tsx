import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { caretDownOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import styles from './Tab1.module.css'
import Calendar from '../components/Calendar';

const Tab1: React.FC = () => {
  const datetimeValue = useRef(new Date().toISOString());
  const [yearMonth, setYearMonth] = useState('');

  useEffect(() => {
    confirm();
  }, []);

  const onChangeYearMonth = (value: string) => {
    datetimeValue.current = value;
  };

  const confirm = () => {
    const date = new Date(datetimeValue.current);
    setYearMonth(`${date.getFullYear()}년 ${date.getMonth() + 1}월`)
  }

  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonTitle>
            <IonChip id="picker">
              { yearMonth }
              <IonIcon icon={caretDownOutline}/>
            </IonChip>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Calendar date={new Date(datetimeValue.current)}/>
      </IonContent>
      <IonModal className={ styles.modal } trigger="picker" onWillDismiss={confirm}>
        <IonDatetime value={datetimeValue.current} presentation="month-year" onIonChange={e => onChangeYearMonth(e.detail.value!)}/>
      </IonModal>
    </IonPage>
  );
};

export default Tab1;
