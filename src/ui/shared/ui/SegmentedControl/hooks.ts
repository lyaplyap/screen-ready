import { type KeyboardEvent, type CSSProperties, type RefObject, useEffect, useRef, useState } from 'react';

import { type SegmentedControlProps } from '.';

export const useSegmentedControl = ({ options, activeOptionId, onChange }: SegmentedControlProps) => {
    const activeOptionIndex = options.findIndex(({ id }) => id === activeOptionId);

    const handleSegmentedControlKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
        const { code, currentTarget } = event;

        if (['ArrowLeft', 'Left'].includes(code)) {
            event.stopPropagation();
            event.preventDefault();

            const previousIndex = activeOptionIndex === 0 ? options.length - 1 : activeOptionIndex - 1;
            const previousOption = options[previousIndex];

            onChange(previousOption.id);

            const previousNode = currentTarget.childNodes[previousIndex];

            if (previousNode instanceof HTMLElement) {
                previousNode?.focus();
            }
        }

        if (['ArrowRight', 'Right'].includes(code)) {
            event.stopPropagation();
            event.preventDefault();

            const nextIndex = activeOptionIndex === options.length - 1 ? 0 : activeOptionIndex + 1;
            const nextOption = options[nextIndex];

            onChange(nextOption.id);

            const nextNode = currentTarget.childNodes[nextIndex];

            if (nextNode instanceof HTMLElement) {
                nextNode?.focus();
            }
        }

        if (['Home'].includes(code)) {
            event.stopPropagation();
            event.preventDefault();

            const firstOption = options[0];
            onChange(firstOption.id);

            const firstNode = currentTarget.childNodes[0];
            if (firstNode instanceof HTMLElement) {
                firstNode?.focus();
            }
        }

        if (['End'].includes(code)) {
            event.stopPropagation();
            event.preventDefault();

            const lastOption = options[options.length - 1];
            onChange(lastOption.id);

            const lastNode = currentTarget.childNodes[options.length - 1];
            if (lastNode instanceof HTMLElement) {
                lastNode?.focus();
            }
        }
    };

    const getSegmentedControlProps = () => {
        return {
            role: 'radiogroup',
            'aria-orientation': 'horizontal' as const,
            onKeyDown: handleSegmentedControlKeyboard
        };
    };

    const handleOptionKeyboard = (event: KeyboardEvent<HTMLButtonElement>, optionId: string) => {
        if (['Enter', 'Space'].includes(event.code)) {
            event.stopPropagation();
            event.preventDefault();

            onChange(optionId);
        }
    };

    const getOptionProps = (optionId: string) => {
        return {
            id: `segmented-control-option-${optionId}`,
            role: 'radio',
            'aria-checked': optionId === activeOptionId,
            tabIndex: optionId === activeOptionId ? 0 : -1,
            onClick: () => onChange(optionId),
            onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => handleOptionKeyboard(event, optionId)
        };
    };

    return {
        getSegmentedControlProps,
        getOptionProps
    };
};

type UseBackgroundOptions = Pick<SegmentedControlProps, 'options' | 'activeOptionId'> & {
    containerRef: RefObject<HTMLDivElement | null>;
};

export const useBackground = ({ options, activeOptionId, containerRef }: UseBackgroundOptions) => {
    const [backgroundStyle, setBackgroundStyle] = useState<CSSProperties>({});
    const previousOptionIdRef = useRef<string>(activeOptionId);

    useEffect(() => {
        if (containerRef.current) {
            const activeOptionIndex = options.findIndex(({ id }) => id === activeOptionId);
            const activeOptionElement = containerRef.current.children[activeOptionIndex] as HTMLElement;

            if (activeOptionElement) {
                const { offsetLeft, offsetWidth, offsetHeight } = activeOptionElement;

                setBackgroundStyle({
                    left: `${offsetLeft}px`,
                    width: `${offsetWidth}px`,
                    height: `${offsetHeight}px`
                });
            }

            previousOptionIdRef.current = activeOptionId;
        }
    }, [activeOptionId, options, containerRef]);

    return backgroundStyle;
};
