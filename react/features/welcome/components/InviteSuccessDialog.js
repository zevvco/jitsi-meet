import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Dialog, hideDialog } from '../../base/dialog';

import { connect } from '../../base/redux';

class InviteSuccesDialog extends Component {

  static propTypes = {
      calendarLink: PropTypes.string,
      dispatch: PropTypes.func
  };

  constructor(props) {
      super(props);
      console.log('created dialog', props);
      this._onSubmit = this._onSubmit.bind(this);
      this.state = {

      };

  }
  _onSubmit() {
      this.props.dispatch(hideDialog());
  }


  render() {
      return (
          <Dialog
              hideCancelButton = { true }
              okKey = 'Okay'
              onSubmit = { this._onSubmit }
              titleKey = 'Success'
              width = 'medium'>
              <div>
                Invites are on the way!
                  <br />
                  <br /><br />
                  <a
                      href = { this.props.calendarLink }
                      rel = 'noreferrer noopener'
                      target = '_blank'>
                  Add to calendar
                  </a>
              </div>
          </Dialog>
      );
  }

}

export default connect()(InviteSuccesDialog);
