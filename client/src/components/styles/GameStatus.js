import styled from "styled-components";

const GameStatus = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  padding-bottom: 12px;
  display: inline-block;

  @media only screen and (min-width: 768px) {
    /* tablets and desktop */
    width: 50%;
  }

  @media only screen and (max-width: 767px) {
    /* phones */
    width: 100%;
  }

  h1 {
    display: inline;
  }

  .score {
    margin-right: 12px;
  }

  .time {
    margin-left: 12px;
  }

  &.warning {
    .time {
      color: #cb4d58;
    }
  }
`;

export default GameStatus;
