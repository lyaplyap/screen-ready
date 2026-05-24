export const sendMessage = <T extends object>(type: string, payload?: T) => {
    const pluginMessage = {
        type: `screen-ready:${type}`,
        payload
    };

    window.parent.postMessage({ pluginMessage }, '*');
};

export const onChangeLanguage = (language: string) => sendMessage('change-language', { language });

export const onUIReady = (language: string) => sendMessage('ui-ready', { language });
