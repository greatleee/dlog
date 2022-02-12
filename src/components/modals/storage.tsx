import { Storage } from '@capacitor/storage';
import { Record } from '../CreateRecordModal';


export const createRecord = async (yyyyMM: string, d: string, record: object) => {
  const { value } = await Storage.get({ key: yyyyMM })
  const jsonValue = JSON.parse(value!);

  let newJsonValue = {
    ...jsonValue,
    [d]: record,
  };
  await Storage.set({
    key: yyyyMM,
    value: JSON.stringify(newJsonValue),
  });
};

export const getMonthRecords = async (yyyyMM: string) => {
  const { value } = await Storage.get({ key: yyyyMM });
  return JSON.parse(value!);
};

export const getRecord = async (yyyyMM: string, d: string) => {
  const records = await getMonthRecords(yyyyMM);
  return records?.[d];
};
