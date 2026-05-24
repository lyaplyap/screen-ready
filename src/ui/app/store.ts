import { createAttributeSlice } from '@ui/entities/attribute';
import { createRoleSlice } from '@ui/entities/role';
import { createEditAttributeSlice } from '@ui/features/edit-attribute';
import { createGenerateCommentSlice } from '@ui/features/generate-comment';
import { configureStore } from '@ui/shared/store';

import './styles/reset.css';
import './styles/main.css';

export const initStore = () =>
    configureStore((...a) => ({
        ...createRoleSlice(...a),
        ...createAttributeSlice(...a),
        ...createEditAttributeSlice(...a),
        ...createGenerateCommentSlice(...a)
    }));
