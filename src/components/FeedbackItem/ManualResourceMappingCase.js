import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  resource: PropTypes.object,
  question: PropTypes.object,
  answer: PropTypes.object
};

export default function ManualResourceMappingCase({resource, question, answer}:props) {

  const [answerData, setAnswerData] = useState(answer);

  const selectAnswerType = (answerType) => {
    answerData.answerType=answerType;
    console.log("select answer type answerData is now",answerData);
    setAnswerData(prevState => ({...prevState, answerType: answerType }));
  }

  let answer_detail_pane = null;

  console.log("Answer: %o",answerData);

  return (
    <div>
      ManualResourceMappingCase
      <hr/>
      ID : {resource.id} <br/>
      correlationId : {resource.correlationId} <br/>
      caseIndicator : {resource.caseIndicator} <br/>
      <p>{resource.description}</p>
      <p>{question.prompt}</p>
      <table width="100%" style={{border: "1px solid black"}}>
        <thead>
          <tr>
            <td align="center">Map Existing<br/> <input type="radio" name="answer" value="map"    onClick={() => selectAnswerType('map')} /></td>
            <td align="center">Create<br/>       <input type="radio" name="answer" value="create" onClick={() => selectAnswerType('create')} /></td>
            <td align="center">Ignore<br/>       <input type="radio" name="answer" value="ignore" onClick={() => selectAnswerType('ignore')} /></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3">
              { answer_detail_pane }
              <hr/>
              { answerData.answerType=='map' && <p>MAP</p> }
              { answerData.answerType=='create' && <p>CREATE</p> }
              { answerData.answerType=='ignore' && <p>IGNORE</p> }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

ManualResourceMappingCase.propTypes = propTypes;