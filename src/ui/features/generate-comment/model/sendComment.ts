import { type AddedAttribute } from '@ui/entities/attribute';
import { type AriaRole } from '@ui/entities/role';

export const sendComment = (role: AriaRole, attributes: AddedAttribute[]) => {
    const pluginMessage = {
        type: 'screen-ready:generate-comment',
        payload: {
            role,
            attributes
        }
    };

    window.parent.postMessage({ pluginMessage }, '*');
};
