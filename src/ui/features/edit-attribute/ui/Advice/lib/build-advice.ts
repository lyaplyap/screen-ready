import { type AttributeScheme } from '@ui/entities/attribute';

type Translate = (key: string) => string;

type TextFragment = {
    text: string;
    highlighted?: boolean;
};

type BuildAdviceParams = {
    scheme: AttributeScheme;
    t: Translate;
};

const HIGHLIGHT_REGEX = /<(\d+)>(.*?)<\/\1>/g;

const parseHighlights = (translation: string): TextFragment[] => {
    const fragments: TextFragment[] = [];

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    HIGHLIGHT_REGEX.lastIndex = 0;

    while ((match = HIGHLIGHT_REGEX.exec(translation)) !== null) {
        if (match.index > lastIndex) {
            fragments.push({ text: translation.substring(lastIndex, match.index) });
        }

        fragments.push({ text: match[2], highlighted: true });

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < translation.length) {
        fragments.push({ text: translation.substring(lastIndex) });
    }

    return fragments;
};

export const buildAdvice = ({ scheme, t }: BuildAdviceParams): TextFragment[][] => {
    if (!scheme.advice || scheme.advice.length === 0) {
        return [];
    }

    return scheme.advice.map((key) => parseHighlights(t(`advice--${key}`)));
};
