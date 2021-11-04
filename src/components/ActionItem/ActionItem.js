import React from 'react';
import PropTypes from 'prop-types';
import {
  Pane,
  PaneHeader
} from '@folio/stripes/components';

import UnhandledFeedbackCase from './UnhandledFeedbackCase';
import ManualResourceMappingCase from './ManualResourceMappingCase';
import ValueMappingCase from './ValueMappingCase';


const propTypes = {
  resource: PropTypes.object,
};

export default function FeedbackItem({resource, onClose}) {

  // If no resource, just null out
  if (!Object.keys(resource).length) {
    return null;
  }

  /* 
  let feedback_component = null;

  switch ( resource.caseIndicator ) {
    case 'MANUAL-RESOURCE-MAPPING':
      feedback_component = <ManualResourceMappingCase case={resource} />
      break;
    default:
      feedback_component = <UnhandledFeedbackCase case={resource} />
      break;
  }
  */

  let question = JSON.parse(resource.question)
  let answer = resource.answer ? JSON.parse(resource.question) : {};

  let FeedbackComponent = null

  switch ( resource.caseIndicator ) {
    case 'MANUAL-RESOURCE-MAPPING':
      FeedbackComponent = ManualResourceMappingCase
      break;
    case 'MANUAL-VALUE-MAPPING':
      FeedbackComponent = ValueMappingCase
      break;
    default:
      FeedbackComponent = UnhandledFeedbackCase
      break;
  }


  return (
    <Pane
      renderHeader={renderProps => (
        <PaneHeader
          {...renderProps}
          dismissible
          onClose={onClose}
          paneTitle={resource.caseIndicator+" : "+resource.description}
        />
      )}

    >
      <FeedbackComponent resource={resource} question={question} answer={answer}/>
    </Pane>
  );
}

FeedbackItem.propTypes = propTypes;
