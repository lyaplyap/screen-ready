export const onChangeLanguage = (language: string) => {
    const pluginMessage = {
            type: 'change-language',
            data: {
                language
            }
        };
    
    window.parent.postMessage({ pluginMessage }, '*');
};
