export const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) {
        throw new Error('CANNOT_CONVERT_HEX_TO_RGB');
    }
    
    return {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
    };
};

export const parsePadding = (paddingString: string) => {
    const values = paddingString.trim().split(/\s+/);
    const numbers = values.map((value) => parseFloat(value));
    
    let paddingTop: number;
    let paddingRight: number;
    let paddingBottom: number;
    let paddingLeft: number;
    
    switch (numbers.length) {
        case 1:
            paddingTop = paddingRight = paddingBottom = paddingLeft = numbers[0];
            break;
        case 2:
            paddingTop = paddingBottom = numbers[0];
            paddingRight = paddingLeft = numbers[1];
            break;
        case 3:
            paddingTop = numbers[0];
            paddingRight = paddingLeft = numbers[1];
            paddingBottom = numbers[2];
            break;
        case 4:
            paddingTop = numbers[0];
            paddingRight = numbers[1];
            paddingBottom = numbers[2];
            paddingLeft = numbers[3];
            break;
        default:
            paddingTop = numbers[0] || 0;
            paddingRight = numbers[1] || 0;
            paddingBottom = numbers[2] || 0;
            paddingLeft = numbers[3] || 0;
    }
  
    return {
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
    };
};