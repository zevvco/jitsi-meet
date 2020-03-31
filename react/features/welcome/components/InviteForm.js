import React, { Component, Fragment } from 'react';

import axios from 'axios';

import { DateTimePicker } from '@atlaskit/datetime-picker';
import TextField from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('2346789ABDEFGHJLMNPQRTVWXYZ', 10);

import Form, {

    // FormHeader,
    FormSection,
    FormFooter,
    Field,

    // HelperMessage,
    ErrorMessage

    // ValidMessage
} from '@atlaskit/form';

import moment from 'moment-timezone';


const timePickerOptions = [
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30'
];

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
        this.defaultDate = moment().add(10, 'm')
                          .format('YYYY-MM-DDTHH:mm');
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
    onSubmit(formData, formControl, complete) {
        const {
            fromName,
            fromEmail,
            toName,
            toEmail,
            datetime
        } = formData;

        const roomName = nanoid();
        const timezone = moment.tz(moment.tz.guess(true)).format('z');
        const data = {
            fromName,
            fromEmail,
            toName,
            toEmail: [ toEmail ],
            datetime,
            unixDatetime: moment(datetime).format('x'),
            meetingTime: moment(datetime).format('h:mm A ') + timezone,
            meetingDate: moment(datetime).format('dddd, MMMM Do'),
            roomName
        };

        const initialValues = {
            fromName: '',
            fromEmail: '',
            toName: '',
            toEmail: '',
            datetime: this.defaultDate
        };

        return axios({
            url: 'https://epc915mrt9.execute-api.us-east-1.amazonaws.com/prod/invite',
            method: 'POST',
            data
        }).then(() => {
            // form.reset() wasnt working like it should, so below is the manual reset
            Object.keys(initialValues).forEach(key => {
                this.form.form.change(key, initialValues[key]);
            });
            this.props.onSubmit(true);
        })
        .then(complete)
        .catch(error => `Error: ${error}`);
    }
    render() {
        return (
            <div className = 'date-creation-wrap'>
                <Form
                    onSubmit = { this.onSubmit }
                    ref = { el => {
                        this.form = el;
                    } }>{formobj => {
                        const { formProps, submitting } = formobj;

                        return (
                            <form
                                id = 'invite-form'
                                { ...formProps }>
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
                                                appearance = 'subtle'
                                                defaultValue = { this.defaultDate }
                                                id = 'date-creation-picker'
                                                isRequired = { true }
                                                name = 'datetime'
                                                timePickerProps = { timePickerOptions }
                                                validate = { this.validateDate }>
                                                {({ fieldProps, error }) => (
                                                    <Fragment>
                                                        <DateTimePicker { ...fieldProps } />
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
                                                autoComplete = 'off'
                                                defaultValue = ''
                                                isRequired = { true }
                                                label = 'Your Name'
                                                name = 'fromName'>
                                                {({ fieldProps, error }) => (
                                                    <Fragment>
                                                        {error && (
                                                            <ErrorMessage>
                              This user name is already in use, try another one.
                                                            </ErrorMessage>
                                                        )}
                                                        <TextField { ...fieldProps } />
                                                    </Fragment>
                                                )}
                                            </Field>
                                        </div>
                                        <div className = 'date-creation-row-child'>
                                            <Field
                                                defaultValue = ''
                                                isRequired = { true }
                                                label = 'Your Email'
                                                name = 'fromEmail'>
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
                                    <div>
                                        <br />

                                  Guests

                                        <div className = 'date-creation-row'>
                                            <div className = 'date-creation-row-child'>
                                                <Field
                                                    defaultValue = ''
                                                    isRequired = { true }
                                                    label = "Date's Name"
                                                    name = 'toName'>
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
                                                    name = 'toEmail'>
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
                                    </div>
                                </FormSection>
                                <div className = 'date-creation-row'>
                                    <FormFooter>
                                        <Button
                                            className = 'date-creation-submit-button'
                                            isLoading = { submitting }
                                            type = 'submit'>Create Invite</Button>
                                    </FormFooter>
                                </div>
                            </form>
                        );
                    }}</Form>
            </div>
        );
    }
}


export default InviteForm;
