import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  resource: PropTypes.object,
  question: PropTypes.object
};

export default function ManualResourceMappingCase({resource, question}:props) {

  return (
    <div>
      ManualResourceMappingCase
      <hr/>
      ID : {resource.id} <br/>
      correlationId : {resource.correlationId} <br/>
      caseIndicator : {resource.caseIndicator} <br/>
      <p>{resource.description}</p>
      <p>{question.prompt}</p>
    </div>
  );
}

ManualResourceMappingCase.propTypes = propTypes;
