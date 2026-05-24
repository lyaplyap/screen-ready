import cn from 'classnames';
import React, { useRef } from 'react';

import { useSegmentedControl, useBackground } from './hooks';

import './index.css';

export type OptionProps = {
    id: string;
    label: string;
};

export type SegmentedControlProps = {
    options: OptionProps[];
    activeOptionId: string;
    onChange: (optionId: string) => void;
};

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
    options,
    activeOptionId,
    onChange
}) => {
    const { getSegmentedControlProps, getOptionProps } = useSegmentedControl({
        options,
        activeOptionId,
        onChange
    });

    const containerRef = useRef<HTMLDivElement | null>(null);
    const backgroundStyle = useBackground({ options, activeOptionId, containerRef });

    return (
        <div
            className="segmented-control"
            {...getSegmentedControlProps()}
            ref={containerRef}
        >
            {options.map(({ id, label }) => (
                <button
                    key={`segmented-control-option-${id}`}
                    type="button"
                    className={cn('segmented-control__option', {
                        'segmented-control__option--active': id === activeOptionId
                    })}
                    {...getOptionProps(id)}
                >
                    {label}
                </button>
            ))}
            <div
                className="segmented-control__background"
                style={backgroundStyle}
                aria-hidden={true}
            />
        </div>
    );
};
