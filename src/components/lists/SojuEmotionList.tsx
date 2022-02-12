/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IonImg } from '@ionic/react';
import { useEffect, useState } from 'react';
import basic from '../../assets/images/soju/basic.svg';
import joy from '../../assets/images/soju/joy.svg';
import anger from '../../assets/images/soju/anger.svg';
import sadness from '../../assets/images/soju/sadness.svg';
import crying from '../../assets/images/soju/crying.svg';


export enum SojuEmotionEnum {
  BASIC = 'BASIC',
  JOY = 'JOY',
  ANGER = 'ANGER',
  SADNESS = 'SADNESS',
  CRYING = 'CRYING',
};

type SojuEmotionImagesType = {
  [key: string]: string;
};

export const SojuEmotionImages: SojuEmotionImagesType = {
  BASIC: basic,
  JOY: joy,
  ANGER: anger,
  SADNESS: sadness,
  CRYING: crying,
};

const SojuEmotionList = ({ value, onSelect }: { value: SojuEmotionEnum|undefined, onSelect: Function}) => {
  const [list, setList] = useState([
    {
      src: basic,
      value: SojuEmotionEnum.BASIC,
      isSelected: false,
    },
    {
      src: joy,
      value: SojuEmotionEnum.JOY,
      isSelected: false,
    },
    {
      src: anger,
      value: SojuEmotionEnum.ANGER,
      isSelected: false,
    },
    {
      src: sadness,
      value: SojuEmotionEnum.SADNESS,
      isSelected: false,
    },
    {
      src: crying,
      value: SojuEmotionEnum.CRYING,
      isSelected: false,
    },
  ]);

  useEffect(() => {
    select(value);
  }, [value]);

  const getImgStyle = (isSelected: boolean) => {
    return css`
      ${imgBaseStyle}
      opacity: ${isSelected ? 1 : 0.3};
    `;
  };

  const select = (value: SojuEmotionEnum|undefined) => {
    setList(
      list.map((item) => 
        item.value === value ? { ...item, isSelected: true } : { ...item, isSelected: false }
      )
    );
    onSelect(value);
  };

  return (
    <ul css={imgListStyle}>
      {list.map((item, index) => (
        <li key={index}>
          <IonImg
            src={item.src}
            css={getImgStyle(item.isSelected)}
            onClick={select.bind(null, item.value)}
          />
        </li>
      ))}
    </ul>
  );
};

export default SojuEmotionList;


const imgBaseStyle = css`
  height: 100%;
  object-fit: cover;
`;

const imgListStyle = css`
  height: 150px;
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  list-style: none;
`;
