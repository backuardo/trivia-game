import styled from "styled-components";

const AnswerButton = styled.button`
  background: linear-gradient(to right, #52c291, #74cea7);
  height: 100px;
  color: white;
  font-weight: 500;
  font-family: inherit;
  border: 0;
  border-radius: 2px;
  font-size: 150%;
  padding: 5px;
  margin-top: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  outline: none;
  /* text-transform: uppercase; */

  @media only screen and (min-width: 768px) {
    /* tablets and desktop */
    width: 50%;
  }

  @media only screen and (max-width: 767px) {
    /* phones */
    width: 100%;
  }
`;

export default AnswerButton;
