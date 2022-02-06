/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IonImg } from '@ionic/react';
import basic from '../../assets/images/soju/basic.svg';
import joy from '../../assets/images/soju/joy.svg';
import anger from '../../assets/images/soju/anger.svg';
import sadness from '../../assets/images/soju/sadness.svg';
import crying from '../../assets/images/soju/crying.svg';
import { useState } from 'react';


enum SojuEmotionEnum {
  BASIC = 'BASIC',
  JOY = 'JOY',
  ANGER = 'ANGER',
  SADNESS = 'SADNESS',
  CRYING = 'CRYING',
};


const SojuEmotionList = ({ onSelect }: { onSelect: Function}) => {
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

  const getImgStyle = (isSelected: boolean) => {
    return css`
      ${imgBaseStyle}
      opacity: ${isSelected ? 1 : 0.3};
    `;
  };

  const select = (selectedIndex: number) => {
    setList(
      list.map((item, index) => 
        index === selectedIndex ? { ...item, isSelected: true } : { ...item, isSelected: false }
      )
    );
    onSelect();
  };

  return (
    <ul css={imgListStyle}>
      {list.map((item, index) => (
        <li>
          <IonImg
            src={item.src}
            css={getImgStyle(item.isSelected)}
            onClick={select.bind(null, index)}
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
