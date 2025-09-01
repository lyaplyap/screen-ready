import { PLUGIN_WIDTH, PLUGIN_HEIGHT, MESSAGE_TYPES } from '../constants';
import { Message, ChangeLanguageMessageData, GenerateCommentMessageData } from '../types';
import { Language } from '../i18n';

import { generateCommentHandler } from './generate-comment';

class App {
    private language: Language = 'en';

    constructor() {
        figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
    }

    private changeLanguage(data: ChangeLanguageMessageData) {
        this.language = data.language;
    }

    private getLanguage() {
        return this.language;
    }

    private generateComment(data: GenerateCommentMessageData) {
        const language = this.getLanguage();

        generateCommentHandler(data, language);
    }

    start() {
        figma.showUI(__html__, { width: PLUGIN_WIDTH, height: PLUGIN_HEIGHT, themeColors: true });

        figma.ui.onmessage = async (message: Message) => {
            if (message.type === MESSAGE_TYPES.CHANGE_LANGUAGE) {
                this.changeLanguage(message.data);
            }
        
            if (message.type === MESSAGE_TYPES.GENERATE_COMMENT) {
                this.generateComment(message.data);
            }
        };
    }
}

export const app = new App();
