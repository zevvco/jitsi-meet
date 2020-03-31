// @flow

import { AtlasKitThemeProvider } from '@atlaskit/theme';
import React from 'react';

import { DialogContainer } from '../../base/dialog';

// import { ChromeExtensionBanner } from '../../chrome-extension-banner';
import '../../base/user-interaction';
import '../../chat';
import '../../external-api';
import '../../no-audio-signal';
import '../../noise-detection';
import '../../power-monitor';
import '../../room-lock';
import '../../talk-while-muted';
import '../../audio-ambience';
import '../../video-layout';

import { AbstractApp } from './AbstractApp';

/**
* Root app {@code Component} on Web/React.
*
* @extends AbstractApp
*/
export class App extends AbstractApp {
    /**
  * Overrides the parent method to inject {@link AtlasKitThemeProvider} as
  * the top most component.
  *
  * @override
  */
    _createMainElement(component, props) {
        return (
            <AtlasKitThemeProvider >
                <div style = {{ background: '#fdfdfa' }}>
                    {/* <ChromeExtensionBanner /> */}
                    { super._createMainElement(component, props) }
                </div>
            </AtlasKitThemeProvider>
        );
    }

    /**
  * Renders the platform specific dialog container.
  *
  * @returns {React$Element}
  */
    _renderDialogContainer() {
        return (
            <AtlasKitThemeProvider>
                <DialogContainer />
            </AtlasKitThemeProvider>
        );
    }
}
