import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useOkapiKy } from '@folio/stripes/core';
import {
  Button
} from '@folio/stripes/components';

const propTypes = {
  resource: PropTypes.object,
  question: PropTypes.object,
  answer: PropTypes.object
};


export default function ValueMappingCase({resource, question, answer}:props) {

  const parsed_response = resource.response && JSON.parse(resource.response)

  const [answerData, setAnswerData] = useState(parsed_response ? parsed_response : {} );
 
  const ky = useOkapiKy();

  //const setMappedResource = (mappedResource) => {
  //  setAnswerData(prevState => ({...prevState, mappedResource: mappedResource }));
  //}

  const selectAnswerType = (answerType) => {
    // answerData.answerType=answerType;
    console.log("select answer type answerData is now",answerData);
    setAnswerData(prevState => ({...prevState, answerType: answerType }));
  }

  const saveFeedback = (event) => {
    console.log("Save feedback %o",answerData);
    event.preventDefault()

    let feedback_response = {
      id: resource.id,
      status: 1,
      response: JSON.stringify(answerData)
    }

    console.log("post to /remote-sync/feedback values %o",feedback_response);

    // We need to post to /remote-sync/feedback/{id}
    // JSON: { id:{id},
    //         response: stringified-answer }
    let post_feedback_request = async (data_to_send) => {
      console.log("Post %o",data_to_send);
      const json = await ky.put('remote-sync/feedback/'+resource.id, {json: data_to_send}).json();
      return json
    }
    post_feedback_request(feedback_response).then(console.log)
  }

  return (
    <div>
      <h2>Map a reference value</h2>
      <p>{question?.prompt}<br/>
         Source context: {question?.context}<br/>
         Target context: {question?.target_context}</p>
      <form>
        <table width="100%" style={{border: "1px solid black"}}>
          <thead>
            <tr>
              <td align="center">Map Existing<br/> <input type="radio"
                                                          name="answer"
                                                          value="map"
                                                          onClick={() => selectAnswerType('map')}
                                                          checked={answerData.answerType === "map"}/>
              </td>
              <td align="center">Ignore<br/>       <input type="radio"
                                                          name="answer"
                                                          value="ignore"
                                                          onClick={() => selectAnswerType('ignore')}
                                                          checked={answerData.answerType === "ignore"}/>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="3">
                { answerData.answerType=='map' && (
                  <>{question.prompt} : <input type="text" name="mappedValue" /></>
                ) }
                { answerData.answerType=='ignore' && <p>This item will be ignored indefinitely</p> }
              </td>
            </tr>
          </tbody>
        </table>
        <br/>
        <Button type="submit" onClick={saveFeedback} >Save Feedback</Button>
      </form>
    </div>

  );
}

ValueMappingCase.propTypes = propTypes;
