import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SimpleLookupSASQ from '../SimpleLookupSASQ/SimpleLookupSASQ';
import FeedbackItem from '../FeedbackItem/FeedbackItem';

const propTypes = {
};

export default function ToDos({}) {

  let result_columns = [
    { label: "id", propertyPath:"id" },
    { label: "correlationId", propertyPath:"correlationId" },
    { label: "question", propertyPath:"question" },
    { label: "response", propertyPath:"response" },
  ]

  console.log("ToDos: %o",FeedbackItem);

  return (
    <SimpleLookupSASQ context={['ui-remote-sync', 'todos']}
                      target="remote-sync/feedback/todo"
                      result_columns={result_columns}
                      details={FeedbackItem} />
  );
}

ToDos.propTypes = propTypes;
