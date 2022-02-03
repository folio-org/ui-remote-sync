import React from 'react';
import PropTypes from 'prop-types';
import { Pane, PaneHeader } from '@folio/stripes/components';

import UnhandledFeedbackCase from './UnhandledFeedbackCase';
import ManualResourceMappingCase from './ManualResourceMappingCase';
import ValueMappingCase from './ValueMappingCase';

const propTypes = {
  onClose: PropTypes.function,
  resource: PropTypes.object,
};

export default function ActionItem({ resource, onClose }) {
  // If no resource, just null out
  if (!resource?.id) {
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

  const question = JSON.parse(resource.question);
  const answer = resource.answer ? JSON.parse(resource.question) : {};

  let FeedbackComponent = null;

  switch (resource.caseIndicator) {
    case 'MANUAL-RESOURCE-MAPPING':
      FeedbackComponent = ManualResourceMappingCase;
      break;
    case 'MANUAL-VALUE-MAPPING':
      FeedbackComponent = ValueMappingCase;
      break;
    default:
      FeedbackComponent = UnhandledFeedbackCase;
      break;
  }

  return (
    <Pane
      renderHeader={(renderProps) => (
        <PaneHeader
          {...renderProps}
          dismissible
          onClose={onClose}
          paneTitle={resource.caseIndicator + ' : ' + resource.description}
        />
      )}
    >
      <FeedbackComponent
        answer={answer}
        question={question}
        resource={resource}
      />
    </Pane>
  );
}

ActionItem.propTypes = propTypes;
