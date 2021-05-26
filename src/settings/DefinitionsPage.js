import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Layout,
  List,
  Pane,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';


class DefinitionsPage extends React.Component {

  getLastMenu = () => {
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

  handleSubmit = (event) => {
    console.log("submit");
    event.preventDefault()
  }


  render() {

    const formStyle = {
      width: "100%"
    };

    return (
      <form id="remote-sync-settings-definitions-form" onSubmit={this.handleSubmit} style={formStyle}>
        <Pane
          defaultWidth="fill"
          fluidContentWidth
          id="pane-remote-sync-definitions"
          lastMenu={this.getLastMenu()}
          paneTitle="Definitions"
        >
          URL of definitions page: <input type="text" name="definitionsURL"/>
        </Pane>
      </form>
    );
  }
}

export default DefinitionsPage;
