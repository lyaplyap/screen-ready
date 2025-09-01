import { GenerateCommentMessageData as MessageData } from '../types';

export const getHTMLAttributes = ({ role, attributes }: MessageData) => {
    const htmlAttributes: string[] = [];

    htmlAttributes.push(`role="${role}"`);

    for (const { id, value } of attributes) {
        htmlAttributes.push(`${id}="${value}"`);
    }

    return htmlAttributes;
};
