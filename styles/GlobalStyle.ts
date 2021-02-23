import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const globalStyle = css`
    ${reset}
    * {
        box_sizing: border-box;
    }
    body {
        font-family: NotoSans, Noto Sans KR;
    }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle}
`;

export default GlobalStyle;