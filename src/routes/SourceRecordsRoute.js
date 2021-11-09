import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  AppIcon
} from '@folio/stripes/core';

import { SASQRoute } from '@k-int/stripes-kint-components';
import TransformationProcessRecord from '../components/TransformationProcessRecord';

const SourceRecordsRoute = ({ path }) => {

  const fetchParameters = {
    //endpoint: "remote-sync/records",
    endpoint: "erm/jobs",
    SASQ_MAP: {
      searchKey: 'label',
      filterKeys: {
      }
    }
  };

  // TODO translations
  const resultColumns = [
    { propertyPath:"selected", label: ' ' },
    { propertyPath:"id", label: "id" },
    // TODO remove
    { propertyPath:"name", label: "name" },
    { propertyPath:"label", label: "label" },
    { propertyPath:"sourceRecordId", label: "Source Record ID" },
    { propertyPath:"transformationStatus", label: "Transformation Status" },
    { propertyPath:"processControlStatus", label: "Process Control Status" },
  ];

  return (
    <SASQRoute
      fetchParameters={fetchParameters}
      id="source-records"
      mainPaneProps={{
        appIcon: <AppIcon app="remote-sync" iconKey="app" size="small" />,
        paneTitle: <FormattedMessage id="ui-remote-sync.recordList.sourceRecords.title" />
      }}
      resultColumns={resultColumns}
      path={path}
      ViewComponent={TransformationProcessRecord}
    />
  );
};

export default SourceRecordsRoute;
