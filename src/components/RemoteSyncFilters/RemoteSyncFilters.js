import React from 'react';
import PropTypes from 'prop-types';

import { CheckboxFilter } from '@folio/stripes-smart-components';
import { FormattedMessage } from 'react-intl';
import { Headline, Layout } from '@folio/stripes/components';

export default function RemoteSyncFilters({ filterData }) {
  const filterValues = {
    resourceType: [
      'agreements',
      'agreementLines',
      'eResources',
      'orders',
      'orderLines',
      'inventoryInstances',
      'inventoryHoldings',
      'inventoryItems'
    ],
    publicationType: [
      'monograph',
      'serial'
    ]
  };

  const onFilterGroupChange = (groupName, groupFilters) => {
    const newSelectedFilters = { ...filterData.currentFilters };
    newSelectedFilters[groupName] = groupFilters;
    filterData.onFilterChange(newSelectedFilters);
  };

  // Maybe factor out into a separate "filter component" in ./components directory
  const renderCheckboxFilter = (group) => {
    const dataOptions = filterValues[group].map(
      name => {
        return ({
          value: name,
          label: <FormattedMessage id={`ui-remote-sync.remoteSyncFilters.filter.${group}.${name}`} />
        });
      }
    );

    return (
      <Layout className="padding-bottom-gutter">
        <Headline margin="none" size="large">
          <FormattedMessage id={`ui-remote-sync.remoteSyncFilters.section.${group}`} />
        </Headline>
        <CheckboxFilter
          dataOptions={dataOptions}
          name={group}
          onChange={(grp) => onFilterGroupChange(grp.name, grp.values)}
          selectedValues={filterData.currentFilters[group]}
        />
      </Layout>
    );
  };

  return (
    <>
      {renderCheckboxFilter('resourceType')}
      {renderCheckboxFilter('publicationType')}
    </>
  );
}

const propTypes = {
  filterData: PropTypes.shape({
    currentFilters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  })
};

RemoteSyncFilters.propTypes = propTypes;
