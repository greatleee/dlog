import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Calendar from '../components/Calendar';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent={true} role="banner">
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Calendar/>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
