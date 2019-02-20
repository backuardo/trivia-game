import styled from "styled-components";

const Button = styled.button`
  background: linear-gradient(to right, #2948ff, #396afc);
  height: 100px;
  color: white;
  font-weight: 500;
  font-family: inherit;
  border: 0;
  border-radius: 5px;
  font-size: 200%;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  outline: none;

  @media only screen and (min-width: 768px) {
    /* tablets and desktop */
    width: 50%;
  }

  @media only screen and (max-width: 767px) {
    /* phones */
    width: 100%;
  }
`;

export default Button;