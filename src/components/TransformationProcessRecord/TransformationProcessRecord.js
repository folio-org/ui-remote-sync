import React from 'react';
import PropTypes from 'prop-types';
import { Pane, PaneHeader, Button } from '@folio/stripes/components';
import { useOkapiKy } from '@folio/stripes/core';

const propTypes = {
  onClose: PropTypes.func,
  resource: PropTypes.object,
};

export default function TransformationProcessRecord({ onClose, resource }) {
  const ky = useOkapiKy();

  // This function really should re-pull the transformation process record with a FULL element set name so that
  // we don't transfer the entire inputDataString for every line in the table
  const folioResourceLink = (resourceLink) => {
    let result = null;
    if (resourceLink != null) {
      result = (
        <span>
          {resourceLink.folioContext}/{resourceLink.folioId}
        </span>
      );
    }

    return result;
  };

  // If the user requests the full record (This may be large - for example LASER subscrptions contain title lists) then
  // re-request the transformation record using setname=full which gives us the full record that includes a string encoding
  // of the source record. Once we have that simulate the user clicking a download link for a pseudo file
  const getSourceData = () => {
    ky('remote-sync/records/' + resource.id + '?setname=full').then(
      (record) => {
        record.json().then((jsonRecord) => {
          const blob = new Blob([jsonRecord.inputDataString], {
            type: 'application/json',
          });
          // Create an anchor element and dispatch a click event on it
          // to trigger a download
          const a = document.createElement('a');
          a.download = '' + resource.sourceRecordId;
          a.href = window.URL.createObjectURL(blob);
          const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          a.dispatchEvent(clickEvt);
          a.remove();
        });
      }
    );
  };

  return (
    <Pane
      renderHeader={(renderProps) => (
        <PaneHeader
          {...renderProps}
          dismissible
          onClose={onClose}
          paneTitle={
            resource.label != null ? resource.label : resource.sourceRecordId
          }
        />
      )}
    >
      <table>
        <tbody>
          <tr>
            <td>label</td>
            <td>{resource.label}</td>
          </tr>
          <tr>
            <td>processControlStatus</td>
            <td>{resource.processControlStatus}</td>
          </tr>
          <tr>
            <td>transformationStatus</td>
            <td>{resource.transformationStatus}</td>
          </tr>
          <tr>
            <td>sourceRecordId</td>
            <td>
              {resource.sourceRecordId}{' '}
              <Button onClick={() => getSourceData()}>Source Data</Button>
            </td>
          </tr>
          <tr>
            <td>last processing attempt</td>
            <td>{resource.lastProcessAttempt}</td>
          </tr>
          <tr>
            <td>last success</td>
            <td>{resource.lastProcessComplete}</td>
          </tr>
          <tr>
            <td>Status Report</td>
            <td>
              <table>
                <tbody>
                  {resource.statusReport &&
                    JSON.parse(resource.statusReport).map((sr) => (
                      <tr>
                        <td>{sr.ts}</td>
                        <td>{sr.msg}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>Corresponding Resource</td>
            <td>{folioResourceLink(resource.correspondingResource)}</td>
          </tr>
        </tbody>
      </table>
    </Pane>
  );
}

TransformationProcessRecord.propTypes = propTypes;
