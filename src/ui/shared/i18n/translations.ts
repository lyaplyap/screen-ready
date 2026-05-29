import { type Translations } from './types';

export const TRANSLATIONS: Translations = {
    ru: {
        // common
        'footer__made-by': 'Создано <0>Никитой Ляпиным</0> и <1>Крис Пижевской</1>',
        'string-field__placeholder': 'Введите название элемента',
        // roles
        'role-button__label': 'Button',
        'role-link__label': 'Link',
        'role-heading__label': 'Heading',
        'role-radio__label': 'Radio',
        'role-checkbox__label': 'Checkbox',
        'role-switch__label': 'Switch',
        // attribute cards
        'attribute-card-aria-disabled__title': 'disabled',
        'attribute-card-aria-disabled__description': 'элемент недоступен для взаимодействия',
        'attribute-card-aria-haspopup__title': 'haspopup',
        'attribute-card-aria-haspopup__description': 'открывает оверлейный элемент',
        'attribute-card-aria-expanded__title': 'expanded',
        'attribute-card-aria-expanded__description': 'раскрывает и сворачивает контент',
        'attribute-card-aria-pressed__title': 'pressed',
        'attribute-card-aria-pressed__description': 'элемент интерактивен подобно переключателю',
        'attribute-card-aria-label__title': 'label',
        'attribute-card-aria-label__description': 'переопределяет нативную озвучку элемента',
        'attribute-card-aria-level__title': 'level',
        'attribute-card-aria-level__description': 'показывает место элемета в иерархии',
        'attribute-card-aria-checked__title': 'checked',
        'attribute-card-aria-checked__description': 'показывает состояние элемента (вкл/выкл/другое)',
        // attribute panel
        'w3c__description--aria-disabled': 'неактивное состояние элемента',
        'w3c__description--aria-haspopup': 'вызывает всплывающий элемент',
        'w3c__description--aria-expanded': 'разворачивающийся элемент',
        'w3c__description--aria-pressed': 'элемент, на которой можно нажать',
        'w3c__description--aria-level': 'уровень элемента',
        'w3c__description--aria-checked': 'элемент, который можно отметить',
        'w3c__description--aria-label': 'новая озвучка элемента',
        // placeholder panel
        'placeholder-panel__hint': 'Выберите атрибут из списка',
        'placeholder-panel__support': 'Нет нужного атрибута? <0>Свяжитесь с нами</0>',
        'aria-header__caption': 'выберите значение',
        'aria-header__action-add': 'Добавить',
        'aria-header__action-delete': 'Удалить',
        // trigger bar
        'trigger-bar__action-done': 'Готово',
        'trigger-bar__added-values': 'Выбранные атрибуты:',
        // voiceover — UI block
        'voiceover__title': 'Озвучится как:',
        'voiceover__placeholder--укажите': 'укажите',
        'voiceover__placeholder--выберите': 'выберите',
        // voiceover — roles
        'voiceover-role--button': 'кнопка',
        'voiceover-role--link': 'ссылка',
        'voiceover-role--heading': 'заголовок',
        'voiceover-role--radio': 'радиокнопка',
        'voiceover-role--checkbox': 'чекбокс',
        'voiceover-role--switch': 'переключатель',
        // voiceover — attribute states
        'voiceover-aria-disabled--true': 'недоступно',
        'voiceover-aria-haspopup--true': 'есть попап с меню',
        'voiceover-aria-haspopup--menu': 'есть попап с меню',
        'voiceover-aria-haspopup--listbox': 'есть попап со списком',
        'voiceover-aria-haspopup--tree': 'есть попап с деревом',
        'voiceover-aria-haspopup--grid': 'есть попап с сеткой',
        'voiceover-aria-haspopup--dialog': 'есть попап с модальным окном',
        'voiceover-aria-expanded--false': 'свёрнуто',
        'voiceover-aria-expanded--true': 'развёрнуто',
        'voiceover-aria-pressed--false': 'не нажато',
        'voiceover-aria-pressed--true': 'нажато',
        'voiceover-aria-pressed--mixed': 'частично нажато',
        'voiceover-aria-level': 'уровень',
        'voiceover-aria-checked--true': 'отмечено',
        'voiceover-aria-checked--false': 'не отмечено',
        'voiceover-aria-checked--mixed': 'частично отмечено',
        // advice — UI block
        'advice__title': 'Совет',
        // advice — aria-haspopup
        'advice--not-for-tooltips-or-nav': 'Не используйте этот атрибут для <0>тултипов (role="tooltip")</0> и простой <0>навигации</0> по сайту со ссылками на другие страницы',
        'advice--pair-with-expanded': 'Если подразумевается раскрытие и скрытие каких либо элементов, то используйте кроме aria-haspopup aria-expanded',
        // advice — aria-disabled
        'advice--prefer-html-disabled': 'Если у элемента есть нативный атрибут <0>disabled</0> (button, input), предпочтительно использовать его',
        'advice--still-focusable': 'В отличие от disabled, элемент с aria-disabled остаётся <0>в фокусе</0> и читается скринридером',
        // advice — aria-expanded
        'advice--only-on-trigger': 'Ставьте атрибут на <0>триггер</0>, который раскрывает контент, а не на сам раскрываемый контейнер',
        // advice — aria-pressed
        'advice--toggle-only': 'Используйте только для кнопок-<0>переключателей</0> (toggle), у которых есть два или три устойчивых состояния',
        'advice--not-for-button-link': 'Не используйте на обычных кнопках и ссылках — у них нет состояния «нажато»',
        // advice — aria-label
        'advice--only-when-no-visible-text': 'Добавляйте только когда у элемента <0>нет видимого текста</0> (иконочная кнопка, аватар)',
        'advice--avoid-duplication': 'Не дублируйте видимый текст — скринридер озвучит элемент дважды',
        // advice — aria-level
        'advice--only-with-heading-role': 'Применяйте только вместе с <0>role="heading"</0> — на нативных h1–h6 уровень уже задан тегом',
        // advice — aria-checked
        'advice--only-with-checkbox-radio': 'Используйте на элементах с ролью <0>checkbox</0>, <0>radio</0> или <0>switch</0> — нативные input их уже описывают',
        'advice--mixed-for-tristate': 'Значение <0>mixed</0> подходит только для tri-state чекбоксов (например, «выделить всё»)',
        // warning — aria-haspopup
        'warning--match-role-and-interactive': 'Важно, чтобы значение aria-haspopup совпадало с ролью попапа, и чтобы элемент, который открывает попап, обязательно был интерактивным',
        // warning — aria-expanded
        'warning--sync-with-state': 'Значение aria-expanded обязательно должно меняться вместе с реальным состоянием элемента — иначе скринридер озвучит неверное состояние',
        // preview — labels
        'preview-button__label': 'Button',
        'preview-link__label': 'Link',
        'preview-heading__label': 'Заголовок',
        'preview-heading__label--1': 'Заголовок 1 уровня',
        'preview-heading__label--2': 'Заголовок 2 уровня',
        'preview-heading__label--3': 'Заголовок 3 уровня',
        'preview-heading__label--4': 'Заголовок 4 уровня',
        'preview-heading__label--5': 'Заголовок 5 уровня',
        'preview-heading__label--6': 'Заголовок 6 уровня',
        'preview-link__expand-label': 'Подробнее',
        'preview-accordion__content': 'Развёрнутое содержимое',
        'preview-icon-button__fallback-label': 'добавить',
        'preview-icon-link__fallback-label': 'открыть в новой вкладке',
        'preview-option__label': 'Опция',
        // preview — haspopup items
        'preview-haspopup-item--menu': 'пункт меню',
        'preview-haspopup-item--listbox': 'элемент списка',
        'preview-haspopup-item--tree': 'узел дерева',
        'preview-haspopup-item--grid': 'ячейка',
        'preview-haspopup-item--dialog': 'Это диалог'
    },
    en: {
        // common
        'footer__made-by': 'Made by <0>Nikita Liapin</0> & <1>Kris Pizhevskaya</1>',
        'string-field__placeholder': 'Enter the label of the item',
        // roles
        'role-button__label': 'Button',
        'role-link__label': 'Link',
        'role-heading__label': 'Heading',
        'role-radio__label': 'Radio',
        'role-checkbox__label': 'Checkbox',
        'role-switch__label': 'Switch',
        // attribute cards
        'attribute-card-aria-disabled__title': 'disabled',
        'attribute-card-aria-disabled__description': 'the element is unavailable for interaction',
        'attribute-card-aria-haspopup__title': 'haspopup',
        'attribute-card-aria-haspopup__description': 'opens the overlay element',
        'attribute-card-aria-expanded__title': 'expanded',
        'attribute-card-aria-expanded__description': 'expands and collapses content',
        'attribute-card-aria-pressed__title': 'pressed',
        'attribute-card-aria-pressed__description': 'the element is interactive like a switch',
        'attribute-card-aria-label__title': 'label',
        'attribute-card-aria-label__description': 'redefines the native voiceover of an element',
        'attribute-card-aria-level__title': 'level',
        'attribute-card-aria-level__description': 'shows the position of the element in the hierarchy',
        'attribute-card-aria-checked__title': 'checked',
        'attribute-card-aria-checked__description': 'shows the item\'s status (on/off/other)',
        // attribute panel
        'w3c__description--aria-disabled': 'inactive state of the element',
        'w3c__description--aria-haspopup': 'causes a popup element',
        'w3c__description--aria-expanded': 'unfolding element',
        'w3c__description--aria-pressed': 'an element that can be clicked on',
        'w3c__description--aria-level': 'element level',
        'w3c__description--aria-checked': 'an element that can be marked',
        'w3c__description--aria-label': 'new element voiceover',
        // placeholder panel
        'placeholder-panel__hint': 'Select an attribute from the list',
        'placeholder-panel__support': 'No required attribute? <0>Contact us</0>',
        'aria-header__caption': 'select the attribute value',
        'aria-header__action-add': 'Add',
        'aria-header__action-delete': 'Delete',
        // trigger bar
        'trigger-bar__action-done': 'Done',
        'trigger-bar__added-values': 'Selected attributes:',
        // voiceover — UI block
        'voiceover__title': 'It will sound like:',
        'voiceover__placeholder--укажите': 'fill in',
        'voiceover__placeholder--выберите': 'choose',
        // voiceover — roles
        'voiceover-role--button': 'button',
        'voiceover-role--link': 'link',
        'voiceover-role--heading': 'heading',
        'voiceover-role--radio': 'radio',
        'voiceover-role--checkbox': 'checkbox',
        'voiceover-role--switch': 'switch',
        // voiceover — attribute states
        'voiceover-aria-disabled--true': 'dimmed',
        'voiceover-aria-haspopup--true': 'menu pop-up',
        'voiceover-aria-haspopup--menu': 'menu pop-up',
        'voiceover-aria-haspopup--listbox': 'listbox pop-up',
        'voiceover-aria-haspopup--tree': 'tree pop-up',
        'voiceover-aria-haspopup--grid': 'grid pop-up',
        'voiceover-aria-haspopup--dialog': 'dialogue pop-up',
        'voiceover-aria-expanded--false': 'collapsed',
        'voiceover-aria-expanded--true': 'expanded',
        'voiceover-aria-pressed--false': 'not pressed',
        'voiceover-aria-pressed--true': 'pressed',
        'voiceover-aria-pressed--mixed': 'partially pressed',
        'voiceover-aria-level': 'level',
        'voiceover-aria-checked--true': 'checked',
        'voiceover-aria-checked--false': 'not checked',
        'voiceover-aria-checked--mixed': 'partially checked',
        // advice — UI block
        'advice__title': 'Hint',
        // advice — aria-haspopup
        'advice--not-for-tooltips-or-nav': 'Do not use this attribute for <0>tooltips (role="tooltip")</0> or simple <0>navigation</0> across pages',
        'advice--pair-with-expanded': 'If you also show/hide the popup, pair aria-haspopup with aria-expanded',
        // advice — aria-disabled
        'advice--prefer-html-disabled': 'If the element has a native <0>disabled</0> attribute (button, input), prefer it',
        'advice--still-focusable': 'Unlike disabled, an aria-disabled element remains <0>focusable</0> and is announced by screen readers',
        // advice — aria-expanded
        'advice--only-on-trigger': 'Put the attribute on the <0>trigger</0> that expands the content, not on the container itself',
        // advice — aria-pressed
        'advice--toggle-only': 'Use only for <0>toggle</0> buttons that have two or three stable states',
        'advice--not-for-button-link': 'Do not use on regular buttons or links — they have no "pressed" state',
        // advice — aria-label
        'advice--only-when-no-visible-text': 'Add only when the element has <0>no visible label</0> (icon button, avatar)',
        'advice--avoid-duplication': 'Do not duplicate the visible text — the screen reader will announce the element twice',
        // advice — aria-level
        'advice--only-with-heading-role': 'Use only together with <0>role="heading"</0> — native h1–h6 already encode the level via the tag',
        // advice — aria-checked
        'advice--only-with-checkbox-radio': 'Use on elements with role <0>checkbox</0>, <0>radio</0>, or <0>switch</0> — native inputs already expose this',
        'advice--mixed-for-tristate': 'The <0>mixed</0> value only fits tri-state checkboxes (e.g. "select all")',
        // warning — aria-haspopup
        'warning--match-role-and-interactive': 'The aria-haspopup value must match the popup\'s role, and the element opening the popup must be interactive',
        // warning — aria-expanded
        'warning--sync-with-state': 'The aria-expanded value must change together with the actual element state, otherwise the screen reader will announce the wrong state',
        // preview — labels
        'preview-button__label': 'Button',
        'preview-link__label': 'Link',
        'preview-heading__label': 'Heading',
        'preview-heading__label--1': 'Heading 1st level',
        'preview-heading__label--2': 'Heading 2nd level',
        'preview-heading__label--3': 'Heading 3rd level',
        'preview-heading__label--4': 'Heading 4th level',
        'preview-heading__label--5': 'Heading 5th level',
        'preview-heading__label--6': 'Heading 6th level',
        'preview-link__expand-label': 'Show more',
        'preview-accordion__content': 'Expanded content',
        'preview-icon-button__fallback-label': 'add',
        'preview-icon-link__fallback-label': 'open in a new tab',
        'preview-option__label': 'Option',
        // preview — haspopup items
        'preview-haspopup-item--menu': 'menu item',
        'preview-haspopup-item--listbox': 'list option',
        'preview-haspopup-item--tree': 'tree node',
        'preview-haspopup-item--grid': 'cell',
        'preview-haspopup-item--dialog': 'This is a dialog'
    }
};
