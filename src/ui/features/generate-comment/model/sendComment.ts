import { type AddedAttribute } from '@ui/entities/attribute';
import { type AriaRole } from '@ui/entities/role';
import { sendMessage } from '@ui/shared/lib/plugin-messages';

export const sendComment = (role: AriaRole, attributes: AddedAttribute[]) =>
    sendMessage('generate-comment', { role, attributes });
