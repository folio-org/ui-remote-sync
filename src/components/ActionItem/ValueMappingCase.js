import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useOkapiKy } from '@folio/stripes/core';
import { Button } from '@folio/stripes/components';

const propTypes = {
  resource: PropTypes.object,
  question: PropTypes.object,
};

export default function ValueMappingCase({ resource, question }) {
  const parsedResponse = resource.response && JSON.parse(resource.response);

  const [answerData, setAnswerData] = useState(
    parsedResponse || {}
  );

  const ky = useOkapiKy();

  // const setMappedResource = (mappedResource) => {
  //  setAnswerData(prevState => ({...prevState, mappedResource: mappedResource }));
  // }

  const selectAnswerType = (answerType) => {
    // answerData.answerType=answerType;
    // console.log('select answer type answerData is now', answerData);
    setAnswerData((prevState) => ({ ...prevState, answerType }));
  };

  const saveFeedback = (event) => {
    // console.log('Save feedback %o', answerData);
    event.preventDefault();

    const feedbackResponse = {
      id: resource.id,
      status: 1,
      response: JSON.stringify(answerData),
    };

    // console.log('post to /remote-sync/feedback values %o', feedbackResponse);

    // We need to post to /remote-sync/feedback/{id}
    // JSON: { id:{id},
    //         response: stringified-answer }
    const postFeedbackRequest = async (dataToSend) => {
      // console.log('Post %o', dataToSend);
      const json = await ky
        .put('remote-sync/feedback/' + resource.id, { json: dataToSend })
        .json();
      return json;
    };
    postFeedbackRequest(feedbackResponse); // .then(console.log);
  };

  return (
    <div>
      <h2>Map a reference value</h2>
      <p>
        {question?.prompt}
        <br />
        Source context: {question?.context}
        <br />
        Target context: {question?.target_context}
      </p>
      <form>
        <table style={{ border: '1px solid black' }} width="100%">
          <thead>
            <tr>
              <td align="center">
                Map Existing
                <br />{' '}
                <input
                  checked={answerData.answerType === 'map'}
                  name="answer"
                  onClick={() => selectAnswerType('map')}
                  type="radio"
                  value="map"
                />
              </td>
              <td align="center">
                Ignore
                <br />{' '}
                <input
                  checked={answerData.answerType === 'ignore'}
                  name="answer"
                  onClick={() => selectAnswerType('ignore')}
                  type="radio"
                  value="ignore"
                />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="3">
                {answerData.answerType === 'map' && (
                  <>
                    {question.prompt} : <input name="mappedValue" type="text" />
                  </>
                )}
                {answerData.answerType === 'ignore' && (
                  <p>This item will be ignored indefinitely</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <Button onClick={saveFeedback} type="submit">
          Save Feedback
        </Button>
      </form>
    </div>
  );
}

ValueMappingCase.propTypes = propTypes;
