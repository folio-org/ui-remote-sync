import React from 'react';
import PropTypes from 'prop-types';
import {
  Pane,
  PaneHeader
} from '@folio/stripes/components';

const propTypes = {
  resource: PropTypes.object,
};

export default function TransformationProcessRecord({
  onClose,
  resource
}) {

  // This function really should re-pull the transformation process record with a FULL element set name so that
  // we don't transfer the entire inputDataString for every line in the table
  const folioResourceLink = (resourceLink) => {
    let result = null;
    if ( resourceLink != null ) {
      result = (
        <span>{resourceLink.folioContext}/{resourceLink.folioId}</span>
      );
    }

    return result;
  };

  return (
    <Pane
      renderHeader={renderProps => (
        <PaneHeader
          {...renderProps}
          dismissible
          onClose={onClose}
          paneTitle={resource.label != null ? resource.label : resource.sourceRecordId}
        />
      )}
    >
      <table>
        <tbody>
          <tr><td>label</td><td>{resource.label}</td></tr>
          <tr><td>processControlStatus</td><td>{resource.processControlStatus}</td></tr>
          <tr><td>transformationStatus</td><td>{resource.transformationStatus}</td></tr>
          <tr><td>sourceRecordId</td><td>{resource.sourceRecordId}</td></tr>
          <tr><td>last processing attempt</td><td>{resource.lastProcessAttempt}</td></tr>
          <tr><td>last success</td><td>{resource.lastProcessComplete}</td></tr>
          <tr><td>Status Report</td><td>
            <table>
              <tbody>
                { resource.statusReport && JSON.parse(resource.statusReport).map( (sr) => (
                    <tr>
                      <td>{sr.ts}</td>
                      <td>{sr.msg}</td>
                    </tr>
                  ) ) }
              </tbody>
            </table>
          </td></tr>
          <tr><td>Corresponding Resource</td><td>{folioResourceLink(resource.correspondingResource)}</td></tr>
          <tr><td>Data</td><td>{resource.inputDataString}</td></tr>
        </tbody>
      </table>
    </Pane>
  );
}

TransformationProcessRecord.propTypes = propTypes;

