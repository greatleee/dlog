import { IonApp, IonButton, IonButtons, IonChip, IonContent, IonFooter, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { caretDownOutline } from 'ionicons/icons'
import { useRecordDispatch, useRecordState } from '../providers/RecordProvider';
import styles from './CreateRecordModal.module.css';

const CreateRecordModal = () => {
  const state = useRecordState();
  const dispatch = useRecordDispatch();

  const onClick = () => {
    dispatch({ type: 'TOGGLE_CREATE_MODAL', show: false, date: new Date() });
  }

  return (
    <IonModal isOpen={state.showCreateModal}>
      <IonApp>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonButtons>
            <IonButton onClick={onClick}>Back</IonButton>
          </IonButtons>
          <IonTitle>
            <IonChip>
              { state.createDate.toDateString() }
              <IonIcon icon={caretDownOutline} />
            </IonChip>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className={ styles.content } fullscreen={true}>
        <div>
          <h1>기분이 어땠오?</h1>
          <div>

          </div>
        </div>

        <div>
          <h1>얼마나 마셨오?</h1>
          <div>

          </div>
        </div>

        <div>
          <h1>사진 있오?</h1>
          <div></div>
        </div>
      </IonContent>

      <IonFooter collapse="fade">
        <IonToolbar>
          <IonButton color="dlog" size="large" expand="block">작성완료</IonButton>
        </IonToolbar>
      </IonFooter>
      </IonApp>
    </IonModal>
  );
};

export default CreateRecordModal;
