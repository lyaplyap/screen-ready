import cn from 'classnames';
import React, { useRef } from 'react';

import { useTabs, useIndicator } from './hooks';

import './index.css';

export type TabProps = {
    id: string;
    label: string;
};

export type TabsMenuProps = {
    tabs: TabProps[];
    activeTabId: string;
    onChange: (tabId: string) => void;
};

export const TabsMenu: React.FC<TabsMenuProps> = ({ tabs, activeTabId, onChange }) => {
    const { getTablistProps, getTabProps } = useTabs({ tabs, activeTabId, onChange });

    const tablistRef = useRef<HTMLDivElement | null>(null);
    const indicatorStyle = useIndicator({ tabs, activeTabId, tablistRef });

    return (
        <div className="tabs-menu__tablist" {...getTablistProps()} ref={tablistRef}>
            {tabs.map(({ id, label }) => (
                <button
                    key={`tabs-menu__tab-${id}`}
                    type="button"
                    className={cn('tabs-menu__tab',  { 'tabs-menu__tab--active': id === activeTabId })}
                    {...getTabProps(id)}
                >
                    {label}
                </button>
            ))}
            <div
                className="tabs-menu__indicator"
                style={indicatorStyle}
                aria-hidden={true}
            />
        </div>
    );
};
