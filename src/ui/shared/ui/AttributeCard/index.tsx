import React from 'react';

import { IconCheck } from '../../icons';

import './index.css';

type AttributeCardProps = {
    title: string;
    description: string;
    onSelect: () => void; 
    isAdded: boolean;
    onFocus?: () => void;
};

export const AttributeCard: React.FC<AttributeCardProps> = ({ title, description, onSelect, isAdded, onFocus }) => {
    return (
        <button className="attribute-card" onClick={onSelect} onFocus={onFocus}>
            <div className="attribute-card__content">
                <span className="attribute-card__title">
                    {title}
                </span>
                <span className="attribute-card__description">
                    {description}
                </span>
            </div>
            <div className="attribute-card__check">
                {isAdded && <IconCheck />}
            </div>
        </button>
    );
};
