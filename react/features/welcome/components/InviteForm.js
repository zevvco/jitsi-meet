import React, {Component, Fragment} from 'react';

import { DateTimePicker } from '@atlaskit/datetime-picker';
import TextField from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import Form, {
  FormHeader,
  FormSection,
  FormFooter,
  Field,
  HelperMessage,
  ErrorMessage,
  ValidMessage,
} from '@atlaskit/form';
import moment from 'moment';

class InviteForm extends Component {
  constructor(props) {
    super(props);
    this.validateDate = this.validateDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  validateDate(value) {
    const today = moment();
    const mmt = moment(value);
    if (mmt.isBefore(today)) {
      return "This day has passed.";
    }

    return;
  }
  onSubmit(data) {
     console.log('form data', data);
     this.props.onSubmit(true);
  }
  render() {
    return (
      <div className = 'date-creation-wrap'>
        <Form onSubmit={this.onSubmit}>
          {({ formProps }) => (
            <form {...formProps}>
              <FormSection>
                <div className="date-creation-title enter-room-title">
                  Reserve a table:
                </div>
                <div className="date-creation-subtitle">
                  Pick a date and time and we'll send the invite to your date
                </div>
                <div className="date-creation-row">
                  <div className="date-creation-row-child">
                    <Field name="datetime" isRequired validate={this.validateDate}>
                      {({ fieldProps, error }) => (
                        <Fragment>
                          <DateTimePicker
                            id = 'date-creation-picker'
                            {...fieldProps}
                          />
                          {error && (
                            <ErrorMessage>
                              {error}
                            </ErrorMessage>
                          )}
                        </Fragment>
                      )}
                    </Field>
                  </div>
                </div>
                <div className="date-creation-row">
                  <div className="date-creation-row-child">
                    <Field name="user-name" label="Your Name" isRequired defaultValue="">
                      {({ fieldProps, error }) => (
                        <Fragment>

                          {error && (
                            <ErrorMessage>
                              This user name is already in use, try another one.
                            </ErrorMessage>
                          )}
                          <TextField autoComplete="off" {...fieldProps} />
                        </Fragment>
                      )}
                    </Field>
                  </div>
                  <div className="date-creation-row-child">
                    <Field name="user-email" label="Your Email" isRequired defaultValue="">
                      {({ fieldProps, error }) => (
                        <Fragment>

                          {error && (
                            <ErrorMessage>
                              This user name is already in use, try another one.
                            </ErrorMessage>
                          )}
                          <TextField autoComplete="off" type="email" {...fieldProps} />
                        </Fragment>
                      )}
                    </Field>
                  </div>
                </div>
                <div className="date-creation-row">
                  <div className="date-creation-row-child">
                    <Field name="date-name" label="Date's Name" isRequired defaultValue="">
                      {({ fieldProps, error }) => (
                        <Fragment>

                          {error && (
                            <ErrorMessage>
                              This user name is already in use, try another one.
                            </ErrorMessage>
                          )}
                          <TextField autoComplete="off" {...fieldProps} />
                        </Fragment>
                      )}
                    </Field>
                  </div>
                  <div className="date-creation-row-child">
                    <Field name="date-email" label="Date's Email" isRequired defaultValue="">
                      {({ fieldProps, error }) => (
                        <Fragment>

                          {error && (
                            <ErrorMessage>
                              This user name is already in use, try another one.
                            </ErrorMessage>
                          )}
                          <TextField autoComplete="off" type="email" {...fieldProps} />
                        </Fragment>
                      )}
                    </Field>
                  </div>
                </div>
              </FormSection>
              <div className="date-creation-row">
                <FormFooter>
                  <button className="date-creation-submit-button" type="submit">Create Invite</button>
                </FormFooter>
              </div>
            </form>
        )}</Form>
      </div>
    )
  }
}


export default InviteForm;
