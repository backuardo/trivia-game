import styled from "styled-components";

const NewGameButton = styled.button`
  background: linear-gradient(to right, #516eab, #738bbb);
  height: 100px;
  color: white;
  font-weight: 500;
  font-family: inherit;
  border: 0;
  border-radius: 2px;
  font-size: 200%;
  padding: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  outline: none;
  /* text-transform: uppercase; */

  background: ${props =>
    props.gameOver
      ? "linear-gradient(to right, #fab864, #fbc683)"
      : "linear-gradient(to right, #516eab, #738bbb)"};

  @media only screen and (min-width: 768px) {
    /* tablets and desktop */
    width: 50%;
  }

  @media only screen and (max-width: 767px) {
    /* phones */
    width: 100%;
  }
`;

export default NewGameButton;
