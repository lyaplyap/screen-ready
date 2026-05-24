import React from 'react';

import { selectActiveAttributeState } from '@ui/entities/attribute';
import { selectAddedAttributes, selectAttributes } from '@ui/entities/role';
import { AttributePanel, PlaceholderPanel } from '@ui/features/edit-attribute';
import { TriggerBar } from '@ui/features/generate-comment';
import { AttributeList } from '@ui/features/select-attribute';
import { useStore } from '@ui/shared/store';

import './index.css';

export const Main: React.FC = () => {
    const attributes = useStore(selectAttributes);
    const addedAttributes = useStore(selectAddedAttributes);
    const activeAttributeState = useStore(selectActiveAttributeState);
    const selectAttribute = useStore((state) => state.selectAttribute);
    const pickAttributeValue = useStore((state) => state.pickAttributeValue);
    const addAttribute = useStore((state) => state.addAttribute);
    const removeAttribute = useStore((state) => state.removeAttribute);
    const generateComment = useStore((state) => state.generateComment);

    return (
        <main className="main">
            <div className="steering-wheel">
                <AttributeList
                    attributes={attributes.map(({ id, isAdded }) => ({ id, isAdded }))}
                    selectAttribute={selectAttribute}
                />
                {!activeAttributeState && <PlaceholderPanel />}
                {activeAttributeState && (
                    <AttributePanel
                        scheme={activeAttributeState.scheme}
                        pickedValue={activeAttributeState.pickedValue}
                        isAdded={activeAttributeState.isAdded}
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
};
