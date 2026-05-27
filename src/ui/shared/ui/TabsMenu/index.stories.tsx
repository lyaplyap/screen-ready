import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';

import { TabsMenu } from './index';

const meta: Meta<typeof TabsMenu> = {
    title: 'Shared/UI/TabsMenu',
    component: TabsMenu,
    argTypes: {
        onChange: { action: 'change' }
    },
    args: {
        tabs: [
            { id: 'button', label: 'Button' },
            { id: 'link', label: 'Link' },
            { id: 'heading', label: 'Heading' },
            { id: 'radio', label: 'Radio' },
            { id: 'checkbox', label: 'Checkbox' },
            { id: 'switch', label: 'Switch' }
        ],
        activeTabId: 'button'
    }
};

export default meta;

type Story = StoryObj<typeof TabsMenu>;

export const Default: Story = {};

export const HeadingActive: Story = {
    args: { activeTabId: 'heading' }
};

export const Interactive: Story = {
    render: (args) => {
        const InteractiveTabsMenu = () => {
            const [activeTabId, setActiveTabId] = useState(args.activeTabId);

            return (
                <TabsMenu
                    {...args}
                    activeTabId={activeTabId}
                    onChange={setActiveTabId}
                />
            );
        };

        return <InteractiveTabsMenu />;
    }
};
