import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useOkapiKy } from '@folio/stripes/core';

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
      <h2>Map a value</h2>
      <p>{question.prompt}</p>
      {JSON.stringify(question)}
    </div>
  );
}

ValueMappingCase.propTypes = propTypes;
