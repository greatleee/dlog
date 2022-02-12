/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SojuEmotionImages } from '../lists/SojuEmotionList';
import empty from '../../assets/images/soju/empty.svg';


type Props = {
  value: string | undefined;
};

const DateImage: React.FC<Props> = ({ value }) => {
  const image = value ? SojuEmotionImages[value] : null;

  const imgStyle = css`
    ${styles.img}
    background: url(${image}) no-repeat center/cover;
  `;

  return (image ? <div css={imgStyle}></div> : <div css={styles.mask}></div>);
};

export default DateImage;


const styles = {
  img: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  mask: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: url(${empty}) no-repeat center/cover;
    opacity: 0.2;
  `,
}
