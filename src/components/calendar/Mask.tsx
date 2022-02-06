/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import sojuBasicImage from '../../assets/images/soju/basic.svg';


const Mask = () => <div css={style}></div>;

export default Mask;


const style = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-mask: url(${sojuBasicImage}) no-repeat center/cover;
  background-color: gray;
`;
