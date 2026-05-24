import cn from 'classnames';
import React from 'react';

import { Text } from '../Text';

import { useRadioGroup } from './hooks';

import './index.css';

type Option = {
    label: string;
    value: string;
};

export type RadioGroupProps = {
    value?: string;
    onChange: (value: string) => void;
    onDoubleClick?: (value: string) => void;
    options: Option[];
};

export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
    const { value: checkedValue, options } = props;

    const { getRadioGroupProps, getRadioProps } = useRadioGroup(props);

    return (
        <div {...getRadioGroupProps()} className="radiogroup">
            {options.map(({ value, label }, index) => {
                const isChecked = checkedValue === value;

                return (
                    <div
                        key={`radiogroup__option--${value}`}
                        {...getRadioProps(value, index)}
                        className={cn('radiogroup__option', { 'radiogroup__option--checked': isChecked })}
                    >
                        <Text>
                            {label}
                        </Text>
                    </div>
                );
            })}
        </div>
    );
};
