import { hexToRgb } from '../lib';

type IconStyles = {
    size?: number;
    color?: string;
    strokeWidth?: number;
    opacity?: number;
};

export const createIcon = (content: string, styles: IconStyles = {}) => {
    const { size = 16, color = '#000000', strokeWidth = 0, opacity = 1 } = styles;

    const iconFrame = figma.createFrame();
    iconFrame.resize(size, size);

    iconFrame.fills = [];
    iconFrame.clipsContent = false;

    const svgNode = figma.createNodeFromSvg(content);        
    const scaleFactor = size / Math.max(svgNode.width, svgNode.height);

    svgNode.resize(svgNode.width * scaleFactor, svgNode.height * scaleFactor);

    function applyColorToChildren(node: SceneNode) {
        if ('fills' in node && node.type !== 'FRAME') {
            if (node.fills !== figma.mixed && Array.isArray(node.fills)) {
                node.fills = [{
                    type: 'SOLID',
                    color: hexToRgb(color),
                    opacity
                }];
            }
        }

        if ('strokes' in node) {
            node.strokeWeight = strokeWidth;
            node.strokes = [{
                type: 'SOLID',
                color: hexToRgb(color),
                opacity
            }];
        }
        
        if ('children' in node) {
            node.children.forEach((child) => applyColorToChildren(child));
        }
    }

    applyColorToChildren(svgNode);
    
    iconFrame.appendChild(svgNode);
    
    svgNode.x = (size - svgNode.width) / 2;
    svgNode.y = (size - svgNode.height) / 2;
    
    return iconFrame;
}

