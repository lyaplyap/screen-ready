import React from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from '../../../shared/i18n';
import { store } from '../../../store';
import { TabsMenu, SegmentedControl } from '../../../shared/ui';

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