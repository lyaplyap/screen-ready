import { type AttributeScheme } from '@ui/entities/attribute';
import { type AriaRole } from '@ui/entities/role';

type Translate = (key: string) => string;

type BuildVoiceoverParams = {
    role: AriaRole;
    scheme: AttributeScheme;
    pickedValue?: string;
    t: Translate;
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const getPlaceholder = (scheme: AttributeScheme, t: Translate) => {
    const prefixKey = scheme.type === 'string'
        ? 'voiceover__placeholder--укажите'
        : 'voiceover__placeholder--выберите';

    return `[${t(prefixKey)} ${scheme.id}]`;
};

const getStateLabel = (scheme: AttributeScheme, pickedValue: string, t: Translate): string => {
    if (scheme.id === 'aria-level') {
        return `${t('voiceover-aria-level')} ${pickedValue}`;
    }

    const key = `voiceover-${scheme.id}--${pickedValue}`;
    const translation = t(key);

    return translation === key ? '' : translation;
};

export const buildVoiceover = ({ role, scheme, pickedValue, t }: BuildVoiceoverParams): string => {
    const roleLabel = t(`voiceover-role--${role}`);

    let nameLabel = '';
    let stateLabel = '';

    if (scheme.id === 'aria-label') {
        if (pickedValue) {
            nameLabel = pickedValue;
        } else {
            stateLabel = getPlaceholder(scheme, t);
        }
    } else if (pickedValue) {
        stateLabel = getStateLabel(scheme, pickedValue, t);
    } else {
        stateLabel = getPlaceholder(scheme, t);
    }

    const voiceover = [nameLabel, roleLabel, stateLabel].filter(Boolean).join(', ');

    return capitalize(voiceover);
};
