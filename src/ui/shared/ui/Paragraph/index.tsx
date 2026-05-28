import React, { type ReactNode } from 'react';

import { Text } from '../Text';

import './index.css';

type TextFragment = {
    text: string;
    highlighted?: boolean;
};

type TextBlock = TextFragment[];

type ParagraphText = string | TextFragment | TextBlock;

const unifyText = (text: ParagraphText): TextBlock => {
    if (typeof text === 'string') {
        return [{ text }];
    } else if (typeof text === 'object' && !Array.isArray(text)) {
        return [text];
    } else if (typeof text === 'object' && Array.isArray(text)) {
        return text;
    }

    throw new Error('Unexpected param');
};

type ParagraphProps = {
    icon?: ReactNode;
    title: string;
    text: ParagraphText[];
};

export const Paragraph: React.FC<ParagraphProps> = ({ icon, title, text: blocks }) => {
    return (
        <div className="paragraph">
            <h2 className="paragraph__title">
                {icon && <span className="paragraph__title-icon" aria-hidden="true">{icon}</span>}
                <Text color="primary" typography="text-s-medium">{title}</Text>
            </h2>
            <div className="paragraph__text-blocks">
                {blocks.map((block, blockIndex) => (
                    <p key={`paragraph-block-${blockIndex}`} className="paragraph__text-block">
                        {unifyText(block).map(({ text, highlighted }, textIndex) => (
                            <Text
                                key={`block-${blockIndex}-text-${textIndex}`}
                                color={highlighted ? 'brand' : 'secondary'}
                                typography="text-s"
                            >
                                {text}
                            </Text>
                        ))}
                    </p>
                ))}
            </div>
        </div>
    );
};
