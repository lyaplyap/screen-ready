import React, { type ReactElement, type PropsWithChildren } from 'react';

import { useTranslation } from './context';

type TransProps = {
    i18nKey: string;
    components?: (ReactElement | string)[];
};

export const Trans: React.FC<TransProps> = ({ i18nKey, components = [] }) => {
    const { t } = useTranslation();
    const translation = t(i18nKey);

    if (!components || components.length === 0) {
        return <>{translation}</>;
    }

    const parts: (string | ReactElement)[] = [];
    const regex = /<(\d+)>(.*?)<\/\1>/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(translation)) !== null) {
        if (match.index > lastIndex) {
            parts.push(translation.substring(lastIndex, match.index));
        }

        const index = parseInt(match[1], 10);
        const innerText = match[2];

        if (components[index] && React.isValidElement(components[index])) {
            parts.push(React.cloneElement(components[index] as ReactElement<PropsWithChildren>, {
                key: `${i18nKey}_${index}`,
                children: innerText
            }));
        } else {
            parts.push(innerText);
        }

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < translation.length) {
        parts.push(translation.substring(lastIndex));
    }

    return <>{parts}</>;
};
