type AnyNode = Record<string, any>;

const makeFrame = (): AnyNode => {
    const children: AnyNode[] = [];

    const frame: AnyNode = {
        type: 'FRAME',
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        children,
        fills: [],
        strokes: [],
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        cornerRadius: 0,
        layoutMode: 'NONE',
        itemSpacing: 0,
        primaryAxisSizingMode: 'AUTO',
        counterAxisSizingMode: 'AUTO',
        layoutAlign: 'INHERIT',
        layoutGrow: 0,
        layoutPositioning: 'AUTO',
        clipsContent: true,
        name: '',
        resize(w: number, h: number) {
            this.width = w;
            this.height = h;
        },
        appendChild(child: AnyNode) {
            children.push(child);
            child.parent = frame;
        }
    };

    return frame;
};

const makeText = (): AnyNode => ({
    type: 'TEXT',
    characters: '',
    fontName: { family: 'Inter', style: 'Regular' },
    fontSize: 12,
    lineHeight: { value: 16, unit: 'PIXELS' },
    fills: [],
    textAutoResize: 'NONE',
    layoutAlign: 'INHERIT'
});

const makeLine = (): AnyNode => ({
    type: 'LINE',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strokes: [],
    rotation: 0,
    strokeWeight: 1,
    dashPattern: [],
    layoutPositioning: 'AUTO',
    resize(w: number, h: number) {
        this.width = w;
        this.height = h;
    }
});

const makeEllipse = (): AnyNode => ({
    type: 'ELLIPSE',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    fills: [],
    layoutPositioning: 'AUTO',
    resize(w: number, h: number) {
        this.width = w;
        this.height = h;
    }
});

const makeSvgRoot = (): AnyNode => {
    const children: AnyNode[] = [];

    const svgRoot: AnyNode = {
        type: 'FRAME',
        width: 10,
        height: 10,
        x: 0,
        y: 0,
        fills: [],
        strokes: [],
        strokeWeight: 0,
        children,
        resize(w: number, h: number) {
            this.width = w;
            this.height = h;
        },
        appendChild(child: AnyNode) {
            children.push(child);
            child.parent = svgRoot;
        }
    };

    // Add a child VECTOR node so applyColorToChildren has something to recolor.
    const vector: AnyNode = {
        type: 'VECTOR',
        fills: [],
        strokes: [],
        strokeWeight: 0,
        children: []
    };

    children.push(vector);

    return svgRoot;
};

const figmaMock = {
    mixed: Symbol('figma.mixed'),
    createFrame: jest.fn(() => makeFrame()),
    createText: jest.fn(() => makeText()),
    createLine: jest.fn(() => makeLine()),
    createEllipse: jest.fn(() => makeEllipse()),
    createNodeFromSvg: jest.fn(() => makeSvgRoot()),
    loadFontAsync: jest.fn(() => Promise.resolve()),
    showUI: jest.fn(),
    closePlugin: jest.fn(),
    notify: jest.fn(),
    ui: {
        show: jest.fn(),
        onmessage: null as ((event: any) => void) | null
    },
    currentPage: {
        selection: [] as AnyNode[],
        appendChild: jest.fn()
    }
};

(globalThis as any).figma = figmaMock;
(globalThis as any).__html__ = '<html></html>';
