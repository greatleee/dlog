/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
      description: '그냥..'
    },
    {
      src: joy,
      value: SojuEmotionEnum.JOY,
      isSelected: false,
      description: '줗아'
    },
    {
      src: anger,
      value: SojuEmotionEnum.ANGER,
      isSelected: false,
      description: '빡침'
    },
    {
      src: sadness,
      value: SojuEmotionEnum.SADNESS,
      isSelected: false,
      description: '우울함'
    },
    {
      src: crying,
      value: SojuEmotionEnum.CRYING,
      isSelected: false,
      description: '눈물 흘림'
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
          <figure css={figureStyle}>
          <img
            src={item.src}
            css={getImgStyle(item.isSelected)}
            onClick={select.bind(null, item.value)}
            alt="emotion"
          />
          </figure>
          <p css={imgDescriptionStyle}>{item.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default SojuEmotionList;


const imgListStyle = css`
  height: 140px;
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  list-style: none;
`;

const imgBaseStyle = css`
  height: 100%;
  object-fit: cover;
`;

const figureStyle = css`
  width: 100%;
  height: 140px;
  margin: 0;
`;

const imgDescriptionStyle = css`
  font-size: 14px;
  text-align: center;
`;
