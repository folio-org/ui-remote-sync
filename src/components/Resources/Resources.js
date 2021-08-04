import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SimpleLookupSASQ from '../SimpleLookupSASQ/SimpleLookupSASQ';

import TransformationProcessRecord from './TransformationProcessRecord'

const propTypes = {
};

export default function Resources({}) {

  let result_columns = [
    { propertyPath:"selected", label: ' ' },
    { propertyPath:"id", label: "id" },
    { propertyPath:"label", label: "label" },
    { propertyPath:"sourceRecordId", label: "Source Record ID" },
    { propertyPath:"transformationStatus", label: "Transformation Status" },
    { propertyPath:"processControlStatus", label: "Process Control Status" },
  ]

  return (
    <SimpleLookupSASQ context={['ui-remote-sync', 'resources']}
                      target="remote-sync/records"
                      result_columns={result_columns}
                      details={TransformationProcessRecord}
                      defaultSort="sourceRecordId"
    />
  );
}

Resources.propTypes = propTypes;
