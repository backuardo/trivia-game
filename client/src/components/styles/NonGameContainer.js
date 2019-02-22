import styled from "styled-components";

const PreGameContainer = styled.div`
  margin: 0 auto;

  @media only screen and (min-width: 768px) {
    /* tablets and desktop */
    hr {
      margin-left: 25%;
    }
  }

  @media only screen and (max-width: 767px) {
    /* phones */
    hr {
      margin-left: 0;
    }
  }

  h1 {
    margin-top: 60px;
  }

  hr {
    margin-top: 60px;
    border: 0;
    height: 3px;
    background: linear-gradient(
      to right,
      #282828,
      #e4e4e4,
      #fefefe,
      #fefefe,
      #fefefe
    );
  }
`;

export default PreGameContainer;
