import { FormattedMessage } from 'react-intl';

const resultColumns = [
  { propertyPath: "selected", label: " " },
  { propertyPath:"description", label: <FormattedMessage id="ui-remote-sync.prop.feedback.description" /> },
  { propertyPath:"status", label: <FormattedMessage id="ui-remote-sync.prop.feedback.status" /> },
  { propertyPath:"correlationId", label: <FormattedMessage id="ui-remote-sync.prop.feedback.correlationId" /> },
  { propertyPath:"caseIndicator", label: <FormattedMessage id="ui-remote-sync.prop.feedback.caseIndicator" /> }
];

export default resultColumns;
