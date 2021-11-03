import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useQuery } from 'react-query';

import { generateKiwtQuery, useKiwtSASQuery } from '@k-int/stripes-kint-components';

import {
  AppIcon,
  useNamespace,
  useOkapiKy
} from '@folio/stripes/core';

import {
  SearchAndSortQuery,
  PersistedPaneset,
} from '@folio/stripes/smart-components';

import {
  Button,
  MultiColumnList,
  Pane,
  SearchField
} from '@folio/stripes/components';

import SimpleLookupSASQ from '../SimpleLookupSASQ/SimpleLookupSASQ';
import FeedbackItem from './FeedbackItem';

const propTypes = {
};

 const Feedback = ({ children }) => {
  const { query, queryGetter, querySetter } = useKiwtSASQuery();
  const { 0: namespace } = useNamespace();

  const SASQ_MAP = {
    searchKey: 'description',
    filterKeys: {
    }
  };

  const ky = useOkapiKy();

  const { data: feedbackProvided = {} } = useQuery(
    ['ui-oa', 'oaRoute', 'publicationRequests', query],
    () => ky(`remote-sync/feedback/done${generateKiwtQuery(SASQ_MAP, query)}`).json()
  );

  let result_columns = [
    { label: " ", propertyPath: "selected" },
    { label: <FormattedMessage id="ui-remote-sync.prop.feedback.description" />, propertyPath:"description" },
    { label: <FormattedMessage id="ui-remote-sync.prop.feedback.id" />, propertyPath:"id" },
    { label: <FormattedMessage id="ui-remote-sync.prop.feedback.correlationId" />, propertyPath:"correlationId" },
    { label: <FormattedMessage id="ui-remote-sync.prop.feedback.caseIndicator" />, propertyPath:"caseIndicator" },
    { label: <FormattedMessage id="ui-remote-sync.prop.feedback.status" />, propertyPath:"status" },
  ]

  return (
    /* <SimpleLookupSASQ context={['ui-remote-sync', 'todos']}
                      target="remote-sync/feedback/done"
                      result_columns={result_columns} 
                      details={FeedbackItem} 
                      paneTitle="Feedback Provided"
    /> */
    <SearchAndSortQuery
      initialSearchState={{ query: '' }}
      queryGetter={queryGetter}
      querySetter={querySetter}
    >
      {
        ({
          searchValue,
          getSearchHandlers,
          onSubmitSearch,
          activeFilters,
          getFilterHandlers,
          onSort
        }) => {
          const searchHandlers = getSearchHandlers()
          return (
            <PersistedPaneset
              appId={namespace}
              id="feedback-provided-paneset"
            >
              <Pane
                defaultWidth="20%"
                paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
              >
                <form onSubmit={onSubmitSearch}>
                <SearchField
                  autoFocus
                  name="query"
                  onChange={searchHandlers.query}
                  onClear={searchHandlers.reset}
                  value={searchValue.query}
                />
                <Button
                  buttonStyle="primary"
                  disabled={!searchValue.query}
                  fullWidth
                  type="submit"
                >
                  <FormattedMessage id="stripes-smart-components.search" />
                </Button>
                  <div>
                    Filters go here
                  </div>
                </form>
              </Pane>
              <Pane
                appIcon={<AppIcon app="remote-sync" iconKey="app" size="small" />}
                defaultWidth="fill"
                paneSub={feedbackProvided?.results?.length ?
                  `FOUND ${feedbackProvided?.total} (CHANGE TRANSLATION)`
                  : ''
                }
                paneTitle={"FEEDBACK PROVIDED CHANGE TRANSLATION"}
              >
                <MultiColumnList
                  autosize
                  columnMapping={{
                    selected: " ",
                    description: <FormattedMessage id="ui-remote-sync.prop.feedback.description" />,
                    id: <FormattedMessage id="ui-remote-sync.prop.feedback.id" />,
                    correlationId: <FormattedMessage id="ui-remote-sync.prop.feedback.correlationId" />,
                    caseIndicator: <FormattedMessage id="ui-remote-sync.prop.feedback.caseIndicator" />,
                    status: <FormattedMessage id="ui-remote-sync.prop.feedback.status" />
                  }}
                  contentData={feedbackProvided?.results}
                  onHeaderClick={onSort}
                  onRowClick={(_e, rowData) =>
                    console.log("GO TO VIEW")
                  }
                  visibleColumns={[
                    "selected",
                    "description",
                    "id",
                    "correlationId",
                    "caseIndicator",
                    "status"
                  ]}
                />
              </Pane>
              {children}
            </PersistedPaneset>
          )
        }
      }
    </SearchAndSortQuery>
  );
}

Feedback.propTypes = propTypes;

export default Feedback;
