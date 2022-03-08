import React, { useState } from 'react';
import {
  Button,
  Pane,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { useOkapiKy } from '@folio/stripes/core';

export default function DefinitionsPage() {
  const ky = useOkapiKy();
  const [definitionsUrl, setDefinitionsURL] = useState();
  const [uploadResult, setUploadResult] = useState();

  // https://github.com/sindresorhus/ky
  // const json = await ky.post('https://example.com', {json: {foo: true}}).json();

  const getLastMenu = () => {
    return (
      <Button
        buttonStyle="primary"
        id="clickable-save-agreements-general-settings"
        marginBottom0
        type="submit"
      >
        <FormattedMessage id="stripes-core.button.save" />
      </Button>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const configCall = async (urlToSubmit) => {
      const json = await ky
        .post('remote-sync/settings/configureFromRegister', {
          json: { url: urlToSubmit },
        })
        .json();
      setUploadResult(json);
    };
    configCall(definitionsUrl);
  };

  const formStyle = {
    width: '100%',
  };

  let ctr = 0;
  const uploadStatusReport = uploadResult?.status != null && (
    <div>
      <h1>Upload Status : {uploadResult.status}</h1>
      <ul>
        {uploadResult?.messages?.map((m) => (
          <li key={'message-' + ctr++}>{m}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <form
      id="remote-sync-settings-definitions-form"
      onSubmit={handleSubmit}
      style={formStyle}
    >
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        id="pane-remote-sync-definitions"
        lastMenu={getLastMenu()}
        paneTitle="Definitions"
      >
        URL of new or updated definitions:{' '}
        <input
          name="definitionsURL"
          onChange={(e) => setDefinitionsURL(e.target.value)}
          type="text"
        />
        <br />
        {uploadStatusReport}
      </Pane>
    </form>
  );
}
