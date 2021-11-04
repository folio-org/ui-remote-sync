import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  AppIcon
} from '@folio/stripes/core';

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
      propertyPath:"status",
      label: <FormattedMessage id="ui-remote-sync.prop.feedback.status" />,
    },
    {
      propertyPath:"correlationId",
      label: <FormattedMessage id="ui-remote-sync.prop.feedback.correlationId" />
    },
    {
      propertyPath:"caseIndicator",
      label: <FormattedMessage id="ui-remote-sync.prop.feedback.caseIndicator" />
    }
  ];

  return (
    <SASQRoute
      fetchParameters={fetchParameters}
      id="feedback-provided"
      mainPaneProps={{
        appIcon: <AppIcon app="remote-sync" iconKey="app" size="small" />,
        paneTitle: <FormattedMessage id="ui-remote-sync.recordList.forAction.title" />
      }}
      resultColumns={resultColumns}
      path={path}
      ViewComponent={FeedbackItem}
    />
  );
};

export default FeedbackRoute;
