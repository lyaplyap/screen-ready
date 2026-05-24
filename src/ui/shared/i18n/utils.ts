export const onChangeLanguage = (language: string) => {
    const pluginMessage = {
        type: 'screen-ready:change-language',
        payload: {
            language
        }
    };

    window.parent.postMessage({ pluginMessage }, '*');
};

export const onUiReady = (language: string) => {
    const pluginMessage = {
        type: 'screen-ready:ui-ready',
        payload: {
            language
        }
    };

    window.parent.postMessage({ pluginMessage }, '*');
};
