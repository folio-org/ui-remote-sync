import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SimpleLookupSASQ from '../SimpleLookupSASQ/SimpleLookupSASQ';
import FeedbackItem from '../FeedbackItem/FeedbackItem';
import { FormattedMessage } from 'react-intl';

const propTypes = {
};

export default function Feedback({}) {

  let result_columns = [
    { label: " ", propertyPath: "selected" },
    { label: <FormattedMessage id="ui-remote-sync.prop.feedback.id" />, propertyPath:"id" },
    { label: <FormattedMessage id="ui-remote-sync.prop.feedback.correlationId" />, propertyPath:"correlationId" },
    { label: <FormattedMessage id="ui-remote-sync.prop.feedback.caseIndicator" />, propertyPath:"caseIndicator" },
    { label: <FormattedMessage id="ui-remote-sync.prop.feedback.status" />, propertyPath:"status" },
    { label: <FormattedMessage id="ui-remote-sync.prop.feedback.description" />, propertyPath:"description" }
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
