import React from 'react';

import { AriaAttribute } from '../../a11y';
import { AttributeStore } from '../../../store';
import { useTranslation } from '../../../shared/i18n';
import { AttributeCard } from '../../../shared/ui';
import { useKeyboardNavigation } from './hooks';

import './index.css';

type AttributeListProps = {
    attributes: AttributeStore[];
    selectAttribute: (attributeId: AriaAttribute) => void;
};

export const AttributeList: React.FC<AttributeListProps> = ({ attributes, selectAttribute }) => {
    const { t } = useTranslation();
    
    const handleSelect = (index: number) => {
        const attribute = attributes[index];

        if (attribute) {
            selectAttribute(attribute.id);
        }
    };

    const { listRef, handleItemFocus } = useKeyboardNavigation(
        attributes.length,
        handleSelect
    );

    return (
        <ul 
            ref={listRef}
            className="attribute-list" 
            aria-orientation="vertical"
            role="listbox"
        >
            {attributes.map(({ id, isAdded }, index) => (
                <li key={id} role="option" aria-selected={isAdded}>
                    <AttributeCard
                        title={t(`attribute-card-${id}__title`)}
                        description={t(`attribute-card-${id}__description`)}
                        onSelect={() => selectAttribute(id)}
                        isAdded={isAdded}
                        onFocus={() => handleItemFocus(index)}
                    />
                </li>
            ))}
        </ul>
    );
};
