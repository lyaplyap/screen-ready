import { KeyboardEvent, CSSProperties, RefObject, useEffect, useRef, useState } from 'react';

import { TabsMenuProps } from '.';

export const useTabs = ({ tabs, activeTabId, onChange }: TabsMenuProps) => {
    const activeTabIndex = tabs.findIndex(({ id }) => id === activeTabId);

    const handleTablistKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
        const { code, currentTarget } = event;

        if (['ArrowLeft', 'Left'].includes(code)) {
            event.stopPropagation();
            event.preventDefault();

            const previousIndex = activeTabIndex === 0 ? tabs.length - 1 : activeTabIndex - 1;
            const previousTab = tabs[previousIndex];

            onChange(previousTab.id);

            const previousNode = currentTarget.childNodes[previousIndex];

            if (previousNode instanceof HTMLElement) {
                previousNode?.focus();
            }
        }

        if (['ArrowRight', 'Right'].includes(code)) {
            event.stopPropagation();
            event.preventDefault();

            const nextIndex = activeTabIndex === tabs.length - 1 ? 0 : activeTabIndex + 1;
            const nextTab = tabs[nextIndex];

            onChange(nextTab.id);

            const nextNode = currentTarget.childNodes[nextIndex];

            if (nextNode instanceof HTMLElement) {
                nextNode?.focus();
            }
        }
    };

    const getTablistProps = () => {
        return {
            role: 'tablist',
            'aria-orientation': 'horizontal' as const,
            onKeyDown: handleTablistKeyboard
        };
    };

    const handleTabKeyboard = (event: KeyboardEvent<HTMLButtonElement>, tabId: string) => {
        if (['Enter', 'Space'].includes(event.code)) {
            event.stopPropagation();
            event.preventDefault();

            onChange(tabId);
        }
    };

    const getTabProps = (tabId: string) => {
        return {
            id: `tab-${tabId}`,
            role: 'tab',
            'aria-selected': tabId === activeTabId,
            'aria-controls': `tabpanel-${tabId}`,
            tabIndex: tabId === activeTabId ? 0 : -1,
            onClick: () => onChange(tabId),
            onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => handleTabKeyboard(event, tabId)
        }
    };

    return {
        getTablistProps,
        getTabProps
    }
};

type UseIndicatorOptions = Pick<TabsMenuProps, 'tabs' | 'activeTabId'> & {
    tablistRef: RefObject<HTMLDivElement | null>;
};

export const useIndicator = ({ tabs, activeTabId, tablistRef }: UseIndicatorOptions) => {
    const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({});
    const previousTabIdRef = useRef<string>(activeTabId);

    useEffect(() => {
        if (tablistRef.current) {
            const activeTabIndex = tabs.findIndex(({ id }) => id === activeTabId);
            const activeTabElement = tablistRef.current.children[activeTabIndex] as HTMLElement;
            
            const previousTabIndex = tabs.findIndex(({ id }) => id === previousTabIdRef.current);
            const previousTabElement = tablistRef.current.children[previousTabIndex] as HTMLElement;
            
            if (activeTabElement && previousTabElement && previousTabIdRef.current !== activeTabId) {
                // Calculate positions for stretch animation
                const activeLeft = activeTabElement.offsetLeft;
                const activeWidth = activeTabElement.offsetWidth;
                const previousLeft = previousTabElement.offsetLeft;
                const previousWidth = previousTabElement.offsetWidth;
                
                // Determine stretch direction
                const stretchLeft = Math.min(activeLeft, previousLeft);
                const stretchRight = Math.max(activeLeft + activeWidth, previousLeft + previousWidth);
                const stretchWidth = stretchRight - stretchLeft;
                
                // First phase: stretch to cover both tabs
                setIndicatorStyle({
                    left: `${stretchLeft}px`,
                    width: `${stretchWidth}px`
                });
                
                // Second phase: shrink to active tab
                setTimeout(() => {
                    setIndicatorStyle({
                        left: `${activeLeft}px`,
                        width: `${activeWidth}px`
                    });
                }, 120);
            } else if (activeTabElement) {
                // Initial positioning or same tab
                const { offsetLeft, offsetWidth } = activeTabElement;
                setIndicatorStyle({
                    left: `${offsetLeft}px`,
                    width: `${offsetWidth}px`
                });
            }
            
            previousTabIdRef.current = activeTabId;
        }
    }, [activeTabId, tabs]);

    return indicatorStyle;
};
