import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Dialog, hideDialog } from '../../base/dialog';
import Range from '@atlaskit/range';


import { connect } from '../../base/redux';

import { setVolumeLevel } from '../../base/sounds/actions';
import {
    BACKGROUND_MUSIC_SOUND_ID,
    BACKGROUND_NOISE_SOUND_ID
} from '../constants';


class AudioMixerDialog extends Component {

  static propTypes = {
      audioLevels: PropTypes.object,
      dispatch: PropTypes.func
  };

  constructor(props) {
      super(props);

      this._onSubmit = this._onSubmit.bind(this);
      this.setAudioLevel = this.setAudioLevel.bind(this);
      this.state = {

      };
  }
  _onSubmit() {
      this.props.dispatch(hideDialog());
  }
  setAudioLevel(soundId, level) {
      console.log(soundId, level);
      this.props.dispatch(setVolumeLevel(soundId, level / 100));
  }

  render() {
      return (
          <Dialog
              hideCancelButton = { true }
              okKey = 'Okay'
              onSubmit = { this._onSubmit }
              titleKey = 'Audio Mixer'
              width = 'medium'>
              <div>
              Background Noise
                  <Range
                      defaultValue = { 100 * this.props.audioLevels[BACKGROUND_NOISE_SOUND_ID] }
                      onChange = { e => this.setAudioLevel(BACKGROUND_NOISE_SOUND_ID, e) }
                      step = { 10 } />
              </div>
              <div>
              Music
                  <Range
                      defaultValue = { 100 * this.props.audioLevels[BACKGROUND_MUSIC_SOUND_ID] }
                      onChange = { e => this.setAudioLevel(BACKGROUND_MUSIC_SOUND_ID, e) }
                      step = { 10 } />
              </div>
          </Dialog>
      );
  }

}

function _mapStateToProps(state) {
    const audioLevels = state['features/audio-ambience'];

    return {
        audioLevels
    };
}
export default connect(_mapStateToProps)(AudioMixerDialog);
