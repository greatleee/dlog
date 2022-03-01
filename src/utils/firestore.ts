import {
  collection,
  addDoc,
  query,
  where,
  Timestamp,
  getDocs,
  doc,
  setDoc,
} from 'firebase/firestore';
import { Device } from '@capacitor/device';
import { Record } from '../components/CreateRecordModal';
import firebaseConfig from '../firebase.config.json';
import { firestore } from '../index';


const getDeviceId = async () => {
  const deviceId = await Device.getId();
  return deviceId.uuid;
};

const setRecord = async (record: Record|undefined, timestamp: Date) => {
  if (!record) return;

  const deviceId = await getDeviceId();
  const data = {
    emotion: record.emotion,
    status: record.status,
    timestamp: timestamp,
  };
  if (!!record.id) {
    const ref = doc(
      firestore,
      firebaseConfig.collections[0],
      deviceId,
      firebaseConfig.collections[1],
      record.id,
    );
    await setDoc(ref, data);
  } else {
    const ref = collection(
      firestore,
      firebaseConfig.collections[0],
      deviceId,
      firebaseConfig.collections[1],
    );
    await addDoc(ref, data);
  }
};

const getMonthRecords = async (timestamp: Date) => {
  const deviceId = await getDeviceId();
  const ref = collection(
    firestore,
    firebaseConfig.collections[0],
    deviceId,
    firebaseConfig.collections[1],
  );

  const year = timestamp.getFullYear();
  const month = timestamp.getMonth();
  const start = new Date(year, month, 1);
  const last = new Date(year, month + 1, 1);

  const q = query(
    ref,
    where('timestamp', '>=', Timestamp.fromDate(start)),
    where('timestamp', '<', Timestamp.fromDate(last))
  );
  const result = await getDocs(q);

  let records = {};
  result.forEach((doc) => {
    const record = doc.data();
    const timestamp = new Date(record.timestamp.seconds * 1000);
    records = Object.assign(records, {
      [timestamp.getDate()]: {
        id: doc.id,
        ...record,
      }
    });
  });

  return records;
};

const getRecord = async (timestamp: Date) => {
  const deviceId = await getDeviceId();
  const ref = collection(
    firestore,
    firebaseConfig.collections[0],
    deviceId,
    firebaseConfig.collections[1],
  );

  const target = new Date(
    timestamp.getFullYear(),
    timestamp.getMonth(),
    timestamp.getDate(),
  );

  const q = query(ref, where('timestamp', '==', Timestamp.fromDate(target)));
  const result = await getDocs(q);

  let record = undefined;
  result.forEach((doc) => {
    record = doc.data();
  });
  return record;
};

export default {
  setRecord,
  getMonthRecords,
  getRecord,
};
