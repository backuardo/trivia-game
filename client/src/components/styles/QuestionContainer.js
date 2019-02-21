import styled from "styled-components";

const QuestionContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 12px;
  display: inline-block;
  text-align: left;
  @media only screen and (min-width: 768px) {
    /* tablets and desktop */
    width: 50%;
  }

  @media only screen and (max-width: 767px) {
    /* phones */
    width: 90%;
  }
`;

export default QuestionContainer;
