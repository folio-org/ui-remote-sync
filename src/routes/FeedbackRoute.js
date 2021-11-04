import React from 'react';
import { FormattedMessage } from 'react-intl';

import SASQRoute from '@k-int/stripes-kint-components/src/lib/SASQRoute/SASQRoute';
import FeedbackItem from '../components/FeedbackItem';

const FeedbackRoute = ({ path }) => {

  const fetchParameters = {
    endpoint: "remote-sync/feedback/done",
    SASQ_MAP: {
      searchKey: 'description',
      filterKeys: {
      }
    }
  };

  const resultColumns = [
    {
      propertyPath: "selected",
      label: " "
    },
    {
      propertyPath:"description",
      label: <FormattedMessage id="ui-remote-sync.prop.feedback.description" />
    },
    {
      propertyPath:"id",
      label: <FormattedMessage id="ui-remote-sync.prop.feedback.id" />
    },
    {
      propertyPath:"correlationId",
      label: <FormattedMessage id="ui-remote-sync.prop.feedback.correlationId" />
    },
    {
      propertyPath:"caseIndicator",
      label: <FormattedMessage id="ui-remote-sync.prop.feedback.caseIndicator" />
    },
    {
      propertyPath:"status",
      label: <FormattedMessage id="ui-remote-sync.prop.feedback.status" />,
    }
  ];

  return (
    <SASQRoute
      fetchParameters={fetchParameters}
      id="feedback-provided"
      resultColumns={resultColumns}
      path={path}
      ViewComponent={FeedbackItem}
    />
  );
};

export default FeedbackRoute;
