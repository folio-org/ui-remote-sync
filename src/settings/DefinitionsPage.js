import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Layout,
  List,
  Pane,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { useOkapiKy } from '@folio/stripes/core';


export default function DefinitionsPage({}) {

  const ky = useOkapiKy();
  const [definitionsUrl, setDefinitionsURL] = useState();

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
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("submit2 %s", definitionsUrl);
    let config_call = async (url_to_submit) => {
      console.log("Post to....%s",url_to_submit);
      const json = await ky.post('remote-sync/settings/configureFromRegister', {json: {url: url_to_submit}}).json();
      return json
    }

    config_call(definitionsUrl).then(console.log)
  }

  const formStyle = {
    width: "100%"
  };


  return (
    <form id="remote-sync-settings-definitions-form" onSubmit={handleSubmit} style={formStyle}>
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        id="pane-remote-sync-definitions"
        lastMenu={getLastMenu()}
        paneTitle="Definitions"
      >
        URL of definitions page: <input type="text" name="definitionsURL" onChange={e => setDefinitionsURL(e.target.value)} />
      </Pane>
    </form>
  );
}
