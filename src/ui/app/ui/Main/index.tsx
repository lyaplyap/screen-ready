import { observer } from 'mobx-react-lite';
import React from 'react';

import { AttributeList, AttributePanel, PlaceholderPanel, TriggerBar } from '@ui/shared/ui';
import { store } from '@ui/store';

import './index.css';

export const Main: React.FC = observer(() => {
    const {
        attributes,
        addedAttributes,
        activeAttributeStore,
        selectAttribute,
        pickAttributeValue,
        addAttribute,
        removeAttribute,
        generateComment
    } = store;

    return (
        <main className="main">
            <div className="steering-wheel">
                <AttributeList
                    attributes={attributes}
                    selectAttribute={selectAttribute}
                />
                {!activeAttributeStore && <PlaceholderPanel />}
                {activeAttributeStore && (
                    <AttributePanel
                        {...activeAttributeStore}
                        pickAttributeValue={pickAttributeValue}
                        addAttribute={addAttribute}
                        removeAttribute={removeAttribute}
                    />
                )}
            </div>
            <TriggerBar
                values={addedAttributes.map(({ id }) => id)}
                onTrigger={generateComment}
            />
        </main>
    );
});
