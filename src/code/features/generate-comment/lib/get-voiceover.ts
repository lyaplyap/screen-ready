import { TFunc } from '@code/shared/i18n';
import { extractTextFromFrame } from '@code/shared/lib';

import { Attribute, Role } from '../types';

const getRoleLabel = (role: string, t: TFunc) => t(`role--${role}`);

const getAttributeLabel = ({ id, value }: Attribute, t: TFunc): string | undefined => {
    switch (id) {
        case 'aria-level':
            return `${t('aria-level')} ${value}`;
        default:
            return t(`${id}--${value}`);
    }
};

const getStatesLabel = (attributes: Attribute[], t: TFunc) => {
    const label = attributes
        .map((attribute) => getAttributeLabel(attribute, t))
        .filter(Boolean)
        .join(', ');

    return label;
};

const getNameLabel = (attributes: Attribute[], frame: SceneNode) => {
    const ariaLabel = attributes.find(({ id }) => id === 'aria-label');

    if (ariaLabel) {
        return ariaLabel.value;
    }

    const nativeName = extractTextFromFrame(frame);

    return nativeName;
};

export const getVoiceover = ({ role, attributes }: Role, frame: SceneNode, t: TFunc) => {
    const nameLabel = getNameLabel(attributes, frame);
    const roleLabel = getRoleLabel(role, t);
    const statesLabel = getStatesLabel(attributes, t);

    return [nameLabel, roleLabel, statesLabel]
        .filter(Boolean)
        .join(', ');
};
