import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useOkapiKy, CalloutContext } from '@folio/stripes/core';
import { Registry } from '@folio/handler-stripes-registry';
import { Button } from '@folio/stripes/components';

const propTypes = {
  resource: PropTypes.object,
  question: PropTypes.object,
};

export default function ManualResourceMappingCase({
  resource,
  question,
}) {
  const parsedResponse = resource.response && JSON.parse(resource.response);

  // initialise answer data to an empty map
  const [answerData, setAnswerData] = useState(
    // parsedResponse || {}
    {}
  );

  // Initialise - because this component may be left in place we overwrite the answer data state with
  // the currently selected row response, or empty if the parsedResponse is null (not yet set)
  setAnswerData(parsedResponse || {});

  const ky = useOkapiKy();
  const callout = useContext(CalloutContext);

  const selectAnswerType = (answerType) => {
    // answerData.answerType=answerType;
    // console.log('select answer type answerData is now', answerData);
    setAnswerData((prevState) => ({ ...prevState, answerType }));
  };

  const setMappedResource = (mappedResource) => {
    setAnswerData((prevState) => ({
      ...prevState,
      mappedResource,
    }));
  };

  // console.log('Answer: %o', answerData);

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

    postFeedbackRequest(feedbackResponse).then(() => {
      callout.sendCallout({ message: 'Resource mapping feedback saved' });
    });
  };

  const onResourceSelected = (r) => {
    // console.log('resource selected: %o', r);
    // Man this is fugly. We stash the whole resource because the link license plugin needs the whole representation

    setMappedResource(r);
  };

  const registryEntry = Registry.getResource(question?.folioResourceType);
  const LookupComponent = registryEntry ? registryEntry.getLookupComponent() : null;

  // console.log( 'Registry entry: %o, lookup_component: %o', registryEntry, LookupComponent);

  return (
    <div>
      <h2>Map a remote resource</h2>
      <p>{question.prompt}</p>
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
                Create
                <br />{' '}
                <input
                  checked={answerData.answerType === 'create'}
                  name="answer"
                  onClick={() => selectAnswerType('create')}
                  type="radio"
                  value="create"
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
                  <div>
                    <LookupComponent
                      input={{
                        name: 'ResourceLookup',
                        value: answerData.mappedResource,
                      }}
                      onResourceSelected={onResourceSelected}
                      resource={answerData.mappedResource}
                    />
                  </div>
                )}
                {answerData.answerType === 'create' && (
                  <p>A new FOLIO resource will be created for this item</p>
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

ManualResourceMappingCase.propTypes = propTypes;
