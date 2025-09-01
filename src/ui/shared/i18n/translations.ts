import { Translations } from './types';

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
        'trigger-bar__added-values': 'Выбранные атрибуты:'
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
    }
};