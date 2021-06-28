import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SimpleLookupSASQ from '../SimpleLookupSASQ/SimpleLookupSASQ';
import FeedbackItem from '../FeedbackItem/FeedbackItem';

const propTypes = {
};

export default function Feedback({}) {

  let result_columns = [
    { label: "id", propertyPath:"id" },
    { label: "correlationId", propertyPath:"correlationId" },
    { label: "question", propertyPath:"question" },
    { label: "response", propertyPath:"response" },
  ]

  return (
    <SimpleLookupSASQ context={['ui-remote-sync', 'todos']}
                      target="remote-sync/feedback/done"
                      result_columns={result_columns} 
                      details={FeedbackItem} 
    />
  );
}

Feedback.propTypes = propTypes;
