import { createTranslate, TFunc } from '@code/shared/i18n';
import { determineNearestPosition } from '@code/shared/lib';

import { ScreenReadyEventHandler as Handler, ScreenReadyEvent as Event } from '../core';

import { createComment } from './lib/create-comment';
import { createConnector } from './lib/create-connector';
import { positionComment } from './lib/position-comment';

import { Role } from './types';

const createComments = (data: Role, frames: SceneNode[], t: TFunc) => {
    for (const frame of frames) {
        const comment = createComment(data, frame, t);

        figma.currentPage.appendChild(comment);

        const position = determineNearestPosition(frame);

        positionComment(comment, frame, position);
        createConnector(comment, frame, position);
    }
};

export type GenerateCommentPayload = Role;

export type GenerateCommentEvent = Event<'generate-comment', GenerateCommentPayload>;

export const generateCommentHandler: Handler<GenerateCommentPayload> = (ctx, payload) => {
    const t = createTranslate(ctx.getLanguage());

    const selectedNodes = figma.currentPage.selection;

    if (selectedNodes.length === 0) {
        figma.notify(t('notification--EMPTY'), { error: true, timeout: 3000 });

        return;
    }

    const validNodes = selectedNodes.filter((node) =>
        node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE'
    );

    if (validNodes.length === 0) {
        ctx.notify(t('notification--INVALID'), { error: true, timeout: 3000 });

        return;
    }

    if (!payload || !payload.role || !payload.attributes) {
        ctx.notify(t('notification--INITIAL_DATA_ERROR'), { error: true });

        return;
    }

    try {
        createComments(payload, validNodes, t);

        ctx.notify(t('notification--GENERATE_SUCCESS'), { timeout: 2000 });
        ctx.closeUI();
    } catch (error) {
        console.error('[screen-ready] generate-comment failed:', error);
        ctx.notify(t('notification--GENERATE_ERROR'), { error: true });
    }
};
