export const getTypography = (size?: 's' | 'xs') => {
    if (size === 's') {
        return 'text-s';
    }

    if (size === 'xs') {
        return 'caption';
    }

    return;
};
