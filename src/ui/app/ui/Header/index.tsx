import { observer } from 'mobx-react-lite';
import React from 'react';

import { useTranslation } from '@ui/shared/i18n';
import { TabsMenu, SegmentedControl } from '@ui/shared/ui';
import { store } from '@ui/store';

import './index.css';

export const Header: React.FC = observer(() => {
    const { roles, activeRoleId, selectRole } = store;
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
});
