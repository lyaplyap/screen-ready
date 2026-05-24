import { type KeyboardEvent } from 'react';

import { type RadioGroupProps } from '.';

const nonNegative = (number: number) => Math.max(number, 0);

export const useRadioGroup = ({ value: checkedValue, options, onChange }: RadioGroupProps) => {
    const checkedOptionIndex = nonNegative(options.findIndex(({ value }) => value === checkedValue));

    const handleRadioGroupKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
        const { code, currentTarget } = event;

        if (['ArrowLeft', 'Left', 'ArrowUp', 'Up'].includes(code)) {
            event.stopPropagation();
            event.preventDefault();

            const previousIndex = checkedOptionIndex === 0 ? options.length - 1 : checkedOptionIndex - 1;
            const previousOption = options[previousIndex];

            onChange(previousOption.value);

            const previousNode = currentTarget.childNodes[previousIndex];

            if (previousNode instanceof HTMLElement) {
                previousNode?.focus();
            }
        }

        if (['ArrowRight', 'Right', 'ArrowDown', 'Down'].includes(code)) {
            event.stopPropagation();
            event.preventDefault();

            const nextIndex = checkedOptionIndex === options.length - 1 ? 0 : checkedOptionIndex + 1;
            const nextOption = options[nextIndex];

            onChange(nextOption.value);

            const nextNode = currentTarget.childNodes[nextIndex];

            if (nextNode instanceof HTMLElement) {
                nextNode?.focus();
            }
        }
    };

    const getRadioGroupProps = () => {
        return {
            role: 'radiogroup',
            onKeyDown: handleRadioGroupKeyboard
        };
    };

    const handleRadioKeyboard = (event: KeyboardEvent<HTMLDivElement>, value: string) => {
        if (['Enter', 'Space'].includes(event.code)) {
            event.stopPropagation();
            event.preventDefault();

            onChange(value);
        }
    };

    const getRadioProps = (value: string, index: number) => {
        const isChecked = checkedValue === value;

        return {
            role: 'radio',
            'aria-checked': isChecked,
            tabIndex: isChecked || (index === 0 && !checkedValue) ? 0 : -1,
            onClick: () => onChange(value),
            onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => handleRadioKeyboard(event, value)
        };
    };

    return {
        getRadioGroupProps,
        getRadioProps
    };
};
