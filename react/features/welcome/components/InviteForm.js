import React, { Component, Fragment } from 'react';

import { DateTimePicker } from '@atlaskit/datetime-picker';
import TextField from '@atlaskit/textfield';
import Form, {

    // FormHeader,
    FormSection,
    FormFooter,
    Field,

    // HelperMessage,
    ErrorMessage

    // ValidMessage
} from '@atlaskit/form';
import moment from 'moment';

class InviteForm extends Component {
    /**
    * Initializes a new InviteForm instance.
    *
    * @param {Object} props - The read-only properties with which the new
    * instance is to be initialized.
    */
    constructor(props) {
        super(props);
        this.validateDate = this.validateDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Removes the classname used for custom styling of the welcome page.
     *
     * @param {Object} value - The string that the DateTimePicker's value is changed to.
     * @returns {(string|undefined)} If there is an error, return the error, otherwise return undefined.
     */
    validateDate(value) {
        const today = moment();
        const mmt = moment(value);
        if (mmt.isBefore(today)) {
            return 'This day has passed.';
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
                <Form onSubmit = { this.onSubmit }>
                    {({ formProps }) => (
                        <form { ...formProps }>
                            <FormSection>
                                <div className = 'date-creation-title enter-room-title'>
                  Reserve a table:
                                </div>
                                <div className = 'date-creation-subtitle'>
                  Pick a date and time and we'll send the invite to your date
                                </div>
                                <div className = 'date-creation-row'>
                                    <div className = 'date-creation-row-child'>
                                        <Field
                                            isRequired = { true }
                                            name = 'datetime'
                                            validate = { this.validateDate }>
                                            {({ fieldProps, error }) => (
                                                <Fragment>
                                                    <DateTimePicker
                                                        id = 'date-creation-picker'
                                                        { ...fieldProps } />
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
                                <div className = 'date-creation-row'>
                                    <div className = 'date-creation-row-child'>
                                        <Field
                                            defaultValue = ''
                                            isRequired = { true }
                                            label = 'Your Name'
                                            name = 'user-name'>
                                            {({ fieldProps, error }) => (
                                                <Fragment>

                                                    {error && (
                                                        <ErrorMessage>
                              This user name is already in use, try another one.
                                                        </ErrorMessage>
                                                    )}
                                                    <TextField
                                                        autoComplete = 'off'
                                                        { ...fieldProps } />
                                                </Fragment>
                                            )}
                                        </Field>
                                    </div>
                                    <div className = 'date-creation-row-child'>
                                        <Field
                                            defaultValue = ''
                                            isRequired = { true }
                                            label = 'Your Email'
                                            name = 'user-email'>
                                            {({ fieldProps, error }) => (
                                                <Fragment>

                                                    {error && (
                                                        <ErrorMessage>
                              This user name is already in use, try another one.
                                                        </ErrorMessage>
                                                    )}
                                                    <TextField
                                                        autoComplete = 'off'
                                                        type = 'email'
                                                        { ...fieldProps } />
                                                </Fragment>
                                            )}
                                        </Field>
                                    </div>
                                </div>
                                <div className = 'date-creation-row'>
                                    <div className = 'date-creation-row-child'>
                                        <Field
                                            defaultValue = ''
                                            isRequired = { true }
                                            label = "Date's Name"
                                            name = 'date-name'>
                                            {({ fieldProps, error }) => (
                                                <Fragment>

                                                    {error && (
                                                        <ErrorMessage>
                              This user name is already in use, try another one.
                                                        </ErrorMessage>
                                                    )}
                                                    <TextField
                                                        autoComplete = 'off'
                                                        { ...fieldProps } />
                                                </Fragment>
                                            )}
                                        </Field>
                                    </div>
                                    <div className = 'date-creation-row-child'>
                                        <Field
                                            defaultValue = ''
                                            isRequired = { true }
                                            label = "Date's Email"
                                            name = 'date-email'>
                                            {({ fieldProps, error }) => (
                                                <Fragment>

                                                    {error && (
                                                        <ErrorMessage>
                              This user name is already in use, try another one.
                                                        </ErrorMessage>
                                                    )}
                                                    <TextField
                                                        autoComplete = 'off'
                                                        type = 'email'
                                                        { ...fieldProps } />
                                                </Fragment>
                                            )}
                                        </Field>
                                    </div>
                                </div>
                            </FormSection>
                            <div className = 'date-creation-row'>
                                <FormFooter>
                                    <button
                                        className = 'date-creation-submit-button'
                                        type = 'submit'>Create Invite</button>
                                </FormFooter>
                            </div>
                        </form>
                    )}</Form>
            </div>
        );
    }
}


export default InviteForm;
