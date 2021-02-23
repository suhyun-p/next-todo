import { NextPage } from "next";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
`;

const index: NextPage = () => {
    return (
        <Container>
            <h1>hello Styled-components</h1>
            <h2>hello Styled-components</h2>
            <p>hello Styled-components</p>
            <ul>
                <li>hello Styled-components</li>
            </ul>
            <a>hello Styled-components</a>
            <span>hello Styled-components</span>
        </Container>
    )
};

export default index;