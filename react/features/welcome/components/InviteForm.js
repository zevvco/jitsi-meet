import React, { Component, Fragment } from 'react';

import axios from 'axios';

import { DateTimePicker } from '@atlaskit/datetime-picker';
import TextField from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('2346789ABDEFGHJLMNPQRTVWXYZ', 6);

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

const cleanString = s => s.trim().replace(/[^\d\w\s]+/g, '');

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
        this.increaseGuests = this.increaseGuests.bind(this);
        this.defaultDate = moment().add(10, 'm')
                          .format('YYYY-MM-DDTHH:mm');

        this.state = {
            numberOfGuests: 1
        };
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
    validateNonEmpty(value) {
        if (!value.trim().length) {
            return 'Cannot be empty';
        }

        return;
    }
    increaseGuests() {

        const { numberOfGuests } = this.state;
        if (numberOfGuests < 5) {
            console.log('increasing', numberOfGuests);
            this.setState({
                numberOfGuests: numberOfGuests + 1
            });
        }
    }
    onSubmit(formData, formControl, complete) {
        const {
            fromName,
            fromEmail,
            datetime
        } = formData;

        const { numberOfGuests } = this.state;
        const toNameArray = [];
        const toEmailArray = [];

        for (let i = 0; i < numberOfGuests; i++) {
            toNameArray.push(cleanString(formData[`toName-${i}`]));
            toEmailArray.push(formData[`toEmail-${i}`]);
        }

        const toNameString = numberOfGuests > 1
            ? `${toNameArray.slice(0, -1).join(', ')} and ${toNameArray.slice(-1)}`
            : toNameArray[0];

        //  array of names, ui
        const reservationCode = `${cleanString(fromName.split(' ')[0])}-${nanoid()}`;
        const timezone = moment.tz(moment.tz.guess(true)).format('z');
        const data = {
            fromName: cleanString(fromName),
            fromEmail: fromEmail.trim(),
            toName: toNameString,
            toEmail: [ toEmailArray ],
            datetime,
            unixDatetime: moment(datetime).format('x'),
            meetingTime: moment(datetime).format('h:mm A ') + timezone,
            meetingDate: moment(datetime).format('dddd, MMMM Do'),
            reservationCode
        };
        console.log(data);

        const initialValues = {
            fromName: '',
            fromEmail: '',
            'toName-0': '',
            'toEmail-0': '',
            'toName-1': '',
            'toEmail-1': '',
            'toName-2': '',
            'toEmail-2': '',
            'toName-3': '',
            'toEmail-3': '',
            'toName-4': '',
            'toEmail-4': '',
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
        const { numberOfGuests } = this.state;

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
                                                validate = { this.validateDate }>
                                                {({ fieldProps, error }) => (
                                                    <Fragment>
                                                        <DateTimePicker
                                                            { ...fieldProps }
                                                            timePickerProps = {{ times: timePickerOptions }} />
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
                                                name = 'fromName'
                                                validate = { this.validateNonEmpty }>
                                                {({ fieldProps, error }) => (
                                                    <Fragment>
                                                        <TextField { ...fieldProps } />
                                                        {error && (
                                                            <ErrorMessage>
                                  Cannot be empty.
                                                            </ErrorMessage>
                                                        )}
                                                    </Fragment>
                                                )}
                                            </Field>
                                        </div>
                                        <div className = 'date-creation-row-child'>
                                            <Field
                                                defaultValue = ''
                                                isRequired = { true }
                                                label = 'Your Email'
                                                name = 'fromEmail'
                                                validate = { this.validateNonEmpty }>
                                                {({ fieldProps, error }) => (
                                                    <Fragment>


                                                        <TextField
                                                            autoComplete = 'off'
                                                            type = 'email'
                                                            { ...fieldProps } />
                                                        {error && (
                                                            <ErrorMessage>
                                      Cannot be empty.
                                                            </ErrorMessage>
                                                        )}
                                                    </Fragment>
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                    <div>
                                        <div className = 'guest-section'>Guests</div>
                                        {[ ...Array(numberOfGuests) ].map((_, index) => (
                                            <div
                                                className = 'date-creation-row'
                                                key = { index }>
                                                <div className = 'date-creation-row-child'>
                                                    <Field
                                                        defaultValue = ''
                                                        isRequired = { true }
                                                        label = "Guest's Name"
                                                        name = { `toName-${index}` }
                                                        validate = { this.validateNonEmpty }>
                                                        {({ fieldProps, error }) => (
                                                            <Fragment>
                                                                <TextField
                                                                    autoComplete = 'off'
                                                                    { ...fieldProps } />
                                                                {error && (
                                                                    <ErrorMessage>
                                                                              Cannot be empty.
                                                                    </ErrorMessage>
                                                                )}
                                                            </Fragment>
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className = 'date-creation-row-child'>
                                                    <Field
                                                        defaultValue = ''
                                                        isRequired = { true }
                                                        label = "Guest's Email"
                                                        name = { `toEmail-${index}` }
                                                        validate = { this.validateNonEmpty }>
                                                        {({ fieldProps, error }) => (
                                                            <Fragment>
                                                                <TextField
                                                                    autoComplete = 'off'
                                                                    type = 'email'
                                                                    { ...fieldProps } />

                                                                {error && (
                                                                    <ErrorMessage>
                                                                          Cannot be empty.
                                                                    </ErrorMessage>
                                                                )}
                                                            </Fragment>
                                                        )}
                                                    </Field>
                                                </div>
                                            </div>
                                        ))}
                                        <div className = 'guest-buttons'>
                                            {numberOfGuests < 5 ? (
                                                <button
                                                    onClick = { this.increaseGuests }
                                                    type = 'button'>Add Guest</button>
                                            ) : <span>Sorry, maximum party size is 6 people.</span>}
                                        </div>

                                    </div>
                                </FormSection>
                                <div className = 'date-creation-row'>
                                    <FormFooter>
                                        <Button
                                            className = 'date-creation-submit-button'
                                            isLoading = { submitting }
                                            type = 'submit'>Create Reservation</Button>
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
