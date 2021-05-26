import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';

import SettingPage from './SettingPage';

import snakeToCamel from '../util/snakeToCamel';

function sortByLabelCaseInsensitive(a, b) {
  const al = a.label.toLowerCase();
  const bl = b.label.toLowerCase();
  return (al < bl) ? -1 : (al > bl) ? 1 : 0;
}

class ResourceSharingSettings extends React.Component {
  static manifest = Object.freeze({
    settings: {
      type: 'okapi',
      path: 'remote-sync/settings/appSettings',
      params: {
        max: '500',
      },
    },
  });

  static propTypes = {
    resources: PropTypes.shape({
      settings: PropTypes.shape({
        records: PropTypes.array
      })
    }),
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
  };

  pageList() {
    const { intl } = this.props;
    const rows = (this.props.resources.settings || {}).records || [];
    const sections = Array.from(new Set(rows.map(obj => obj.section)));

    const persistent = [
      {
        route: 'Definitions',
        label: 'definitions',
        component: <p>Hello</p>
      }
    ];

    const dynamic = sections.map(section => {
      const sectionFormatted = snakeToCamel(section);
      return (
        {
          route: sectionFormatted,
          label: intl.formatMessage({ id: `ui-remote-sync.settingsSection.${sectionFormatted}` }),
          component: (props) => <SettingPage sectionName={section} {...props} />,
        }
      );
    });

    const settingPageList = persistent.concat(dynamic).sort(sortByLabelCaseInsensitive);
    return settingPageList;
  }

  render() {
    const pageList = this.pageList();

    // XXX DO NOT REMOVE THE NEXT LINE. For reasons we do not
    // understand, if once this code renders an empty set of pages, it
    // will not re-render until you navigate away and return. This
    // apparently unnecessary check prevents that.
    if (pageList.length === 0) return null;

    return <p>
       Settings follow:
       <Settings paneTitle={<FormattedMessage id="ui-remote-sync.meta.title" />} {...this.props} pages={pageList} />
    </p>
  }
}

export default injectIntl(stripesConnect(ResourceSharingSettings));
