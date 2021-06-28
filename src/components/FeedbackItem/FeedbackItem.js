import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Pane
} from '@folio/stripes/components';

import UnhandledFeedbackCase from './UnhandledFeedbackCase';
import ManualResourceMappingCase from './ManualResourceMappingCase';


const propTypes = {
  resource: PropTypes.object,
};

export default function FeedbackItem({resource} : props) {

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
    default:
      FeedbackComponent = UnhandledFeedbackCase
      break;
  }


  return (
    <Pane>
      {JSON.stringify(resource)}
      <hr/>
      <FeedbackComponent resource={resource} question={question} answer={answer}/>
    </Pane>
  );
}

FeedbackItem.propTypes = propTypes;
