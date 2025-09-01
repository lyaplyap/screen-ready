# Screen Ready - Figma Plugin

Figma plugin for adding screen reader-like comments

## Description

Screen Ready helps designers and developers create more accessible interfaces by adding comments with information about how a screen reader should announce each element.

## Features

- **ARIA role selection**: button, link, heading, checkbox, radio, switch
- **ARIA attributes configuration**: aria-label, aria-disabled, aria-checked, aria-pressed, aria-expanded, aria-haspopup, aria-level
- **Screen reader text generation**: automatic creation of text describing how the element will be announced by screen readers
- **Visual comment creation**: adding comments as yellow blocks next to selected frames

## How to use

1. **Select a frame** in Figma that you want to add a comment to
2. **Launch the plugin** Screen Ready
3. **Choose the element role** (button, link, heading, etc.)
4. **Configure attributes** - add necessary ARIA attributes and their values
5. **Click "Done"** - the plugin will create a comment next to the selected frame

## Comment structure

Each comment contains:

```
🔊 Screen Reader: "text that the screen reader will announce"

📋 HTML Attributes:
role="button"
aria-label="Submit button"
aria-disabled="false"
```

## Supported roles

- **button** - buttons and interactive elements
- **link** - links and navigation elements  
- **heading** - headings with levels 1-6
- **checkbox** - checkboxes with checked/unchecked states
- **radio** - radio buttons in groups
- **switch** - on/off toggles

## Supported attributes

- **aria-label** - text label for the element
- **aria-disabled** - accessibility state (true/false)
- **aria-checked** - checked state for checkbox, radio, switch
- **aria-pressed** - pressed state for buttons
- **aria-expanded** - expanded state for dropdown elements
- **aria-haspopup** - type of popup content
- **aria-level** - heading level (1-6)

## Requirements

- Figma Desktop App or Figma in browser
- Selected frame, component, or instance to add comment to

## Development

```bash
# Install dependencies
npm install

# Development build
npm run dev

# Production build
npm run build
```

## Project structure

```
src/
├── code    # Plugin logic for Figma API
├── ui      # React plugin interface
```
