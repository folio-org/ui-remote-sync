import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useOkapiKy } from '@folio/stripes/core';

const propTypes = {
  resource: PropTypes.object,
  question: PropTypes.object,
  answer: PropTypes.object
};


export default function ManualResourceMappingCase({resource, question, answer}:props) {

  const [answerData, setAnswerData] = useState(answer);
  const ky = useOkapiKy();


  const selectAnswerType = (answerType) => {
    // answerData.answerType=answerType;
    console.log("select answer type answerData is now",answerData);
    setAnswerData(prevState => ({...prevState, answerType: answerType }));
  }

  const setMappedResourceId = (mappedResource) => {
    setAnswerData(prevState => ({...prevState, mappedResource: mappedResource }));
  }

  let answer_detail_pane = null;

  console.log("Answer: %o",answerData);

  const saveFeedback = (event) => {
    console.log("Save feedback %o",answerData);
    event.preventDefault()
    // let config_call = async (url_to_submit) => {
    //   console.log("Post to....%s",url_to_submit);
    //   const json = await ky.post('remote-sync/settings/configureFromRegister', {json: {url: url_to_submit}}).json();
    //   return json
    // }
    // config_call(definitionsUrl).then(console.log)
  }

  return (
    <div>
      ManualResourceMappingCase
      <hr/>
      ID : {resource.id} <br/>
      correlationId : {resource.correlationId} <br/>
      caseIndicator : {resource.caseIndicator} <br/>
      <p>{resource.description}</p>
      <p>{question.prompt}</p>
      <form>
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
                { answerData.answerType=='map' && (
                  <div>
                      Map to {question.folioResourceType} : <input type="text" value={answerData.mappedResource} name="MappedId" onChange={ e => setMappedResourceId(e.target.value) }/>
                  </div> 
                ) }
                { answerData.answerType=='create' && <p>A new FOLIO resource will be created for this item</p> }
                { answerData.answerType=='ignore' && <p>This item will be ignored indefinitely</p> }
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" onclick={saveFeedback} >Save Feedback</button>
      </form>
      <hr/>
        Data will be
      <hr/>
      {JSON.stringify(answerData)}
    </div>
  );
}

ManualResourceMappingCase.propTypes = propTypes;
