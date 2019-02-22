import styled from "styled-components";

const GameStatus = styled.div`
  margin: auto;
  border-radius: 5px;

  @media only screen and (min-width: 768px) {
    /* tablets and desktop */
    width: 50%;
  }

  @media only screen and (max-width: 767px) {
    /* phones */
    width: 100%;
  }

  .time {
    text-align: right;
    border: 1px solid #fefefe;
  }

  .score {
    text-align: left;
    border: 1px solid #fefefe;
    float: left;
  }

  &.warning {
    .time h1 {
      color: #cb4d58;
    }
  }
`;

export default GameStatus;
