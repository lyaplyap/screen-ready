import React from 'react';

import { useTranslation } from '@ui/shared/i18n';
import { useStore } from '@ui/shared/store';
import { SegmentedControl, TabsMenu } from '@ui/shared/ui';

import './index.css';

export const Header: React.FC = () => {
    const roles = useStore((state) => state.roles);
    const activeRoleId = useStore((state) => state.activeRoleId);
    const selectRole = useStore((state) => state.selectRole);
    const { t, currentLanguage, changeLanguage } = useTranslation();

    return (
        <header className="header">
            <TabsMenu
                activeTabId={activeRoleId}
                onChange={selectRole}
                tabs={roles.map(({ id }) => ({ id, label: t(`role-${id}__label`) }))}
            />
            <SegmentedControl
                onChange={changeLanguage}
                activeOptionId={currentLanguage}
                options={[
                    {
                        id: 'ru',
                        label: 'RU'
                    },
                    {
                        id: 'en',
                        label: 'EN'
                    }
                ]}
            />
        </header>
    );
};
