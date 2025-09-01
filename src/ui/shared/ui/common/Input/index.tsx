import React, { ChangeEventHandler } from 'react';
import cn from 'classnames';

import { Text } from '../Text';

import './index.css';

type InputProps = {
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    className?: string;
};

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder, className }) => {
    return (
        <label className={cn('input__container', className)}>
            <span className="input__label">
                <Text>string</Text>
            </span>
            <input
                className="input__input"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </label>
    );
};
