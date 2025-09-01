import { useEffect, useRef, useState } from 'react';

export const useKeyboardNavigation = (
    itemsCount: number,
    onSelect: (index: number) => void
) => {
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!listRef.current) return;

            const isWithinList = listRef.current.contains(event.target as Node);
            if (!isWithinList) return;

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    setFocusedIndex((prevIndex) => {
                        const nextIndex = prevIndex < itemsCount - 1 ? prevIndex + 1 : 0;
                        return nextIndex;
                    });
                    break;

                case 'ArrowUp':
                    event.preventDefault();
                    setFocusedIndex((prevIndex) => {
                        const nextIndex = prevIndex > 0 ? prevIndex - 1 : itemsCount - 1;
                        return nextIndex;
                    });
                    break;

                case 'Enter':
                case ' ':
                    event.preventDefault();
                    if (focusedIndex >= 0 && focusedIndex < itemsCount) {
                        onSelect(focusedIndex);
                    }
                    break;

                case 'Tab':
                    // Reset focus when tabbing out
                    if (!event.shiftKey && focusedIndex === itemsCount - 1) {
                        setFocusedIndex(-1);
                    } else if (event.shiftKey && focusedIndex === 0) {
                        setFocusedIndex(-1);
                    }
                    break;

                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [focusedIndex, itemsCount, onSelect]);

    useEffect(() => {
        if (focusedIndex >= 0 && listRef.current) {
            const items = listRef.current.querySelectorAll('li');
            const focusedItem = items[focusedIndex];
            
            if (focusedItem) {
                const button = focusedItem.querySelector('button');
                if (button) {
                    button.focus();
                }
            }
        }
    }, [focusedIndex]);

    const handleItemFocus = (index: number) => {
        setFocusedIndex(index);
    };

    return {
        listRef,
        focusedIndex,
        handleItemFocus,
    };
};
