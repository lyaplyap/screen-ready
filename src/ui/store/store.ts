import { makeAutoObservable, runInAction, toJS } from 'mobx';

import { AriaAttribute, AriaRole } from '../shared/a11y';
import { getInitialStore } from './utils';

class ScreenReadyStore {
    private store = getInitialStore();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    private getRoles() {
        return this.store.roles;
    }

    private getActiveRoleId() {
        return this.store.activeRoleId;
    }

    private getActiveRoleStore() {
        const activeRoleId = this.getActiveRoleId();
        const activeRoleStore = this.store.roles.find(({ id }) => id === activeRoleId);

        if (!activeRoleStore) {
            throw new Error('ROLE_STORE_NOT_FOUND');
        }

        return activeRoleStore;
    }

    private getActiveRole() {
        const activeRoleStore = this.getActiveRoleStore();

        return activeRoleStore.scheme;
    }

    private getAttributes() {
        const activeRoleStore = this.getActiveRoleStore();

        return activeRoleStore.attributes;
    }

    private getAddedAttributes() {
        const activeRoleStore = this.getActiveRoleStore();

        return activeRoleStore.addedAttributes;
    }

    private getActiveAttributeId() {
        return this.store.activeAttributeId;
    }

    private getActiveAttributeStore() {
        const activeAttributeId = this.getActiveAttributeId();
        
        if (!activeAttributeId) {
            return null;
        }

        const activeRoleStore = this.getActiveRoleStore();
        const activeAttributeStore = activeRoleStore.attributes.find(({ id }) => id === activeAttributeId) || null;

        return activeAttributeStore;
    }

    private getActiveAttribute() {
        const activeAttributeStore = this.getActiveAttributeStore();

        if (!activeAttributeStore) {
            return null;
        }

        return activeAttributeStore.scheme;
    }

    selectRole(roleId: AriaRole) {
        runInAction(() => {
            this.store.activeRoleId = roleId;
            this.store.activeAttributeId = null;
        });
    }

    selectAttribute(attributeId: AriaAttribute) {
        runInAction(() => {
            this.store.activeAttributeId = attributeId;
        });
    }

    pickAttributeValue(value: string) {
        const activeAttributeId = this.getActiveAttributeId();
        const activeAttributeStore = this.getActiveAttributeStore();

        if (!activeAttributeId || !activeAttributeStore) {
            throw new Error('ATTRIBUTE_STORE_NOT_FOUND');
        }

        runInAction(() => {
            activeAttributeStore.pickedValue = value;
        });
    }

    addAttribute() {
        const activeRoleStore = this.getActiveRoleStore();
        const activeAttributeId = this.getActiveAttributeId();
        const activeAttributeStore = this.getActiveAttributeStore();

        if (!activeAttributeId || !activeAttributeStore) {
            throw new Error('ATTRIBUTE_NOT_FOUND');
        }

        const { pickedValue } = activeAttributeStore;

        if (!pickedValue) {
            throw new Error('ATTRIBUTE_VALUE_NOT_SPECIFIED');
        }

        runInAction(() => {
            activeAttributeStore.isAdded = true;
            activeRoleStore.addedAttributes.push({
                id: activeAttributeId,
                value: pickedValue
            });
        });
    }

    removeAttribute() {
        const activeRoleStore = this.getActiveRoleStore();
        const activeAttributeId = this.getActiveAttributeId();
        const activeAttributeStore = this.getActiveAttributeStore();

        if (!activeAttributeId || !activeAttributeStore) {
            throw new Error('ATTRIBUTE_NOT_FOUND');
        }

        const addedAttribute = activeRoleStore.addedAttributes.find(({ id }) => id === activeAttributeId);

        if (!addedAttribute) {
            throw new Error('ADDED_ATTRIBUTE_NOT_FOUND');
        }

        runInAction(() => {
            activeAttributeStore.isAdded = false;
            activeRoleStore.addedAttributes = activeRoleStore.addedAttributes.filter(({ id }) => id !== activeAttributeId);
        });
    }

    generateComment() {
        const role = this.getActiveRoleId();
        const attributes = this.getAddedAttributes();

        const pluginMessage = {
            type: 'generate-comment',
            data: {
                role: toJS(role),
                attributes: toJS(attributes)
            }
        };

        window.parent.postMessage({ pluginMessage }, '*');
    }

    get roles() {
        return this.getRoles();
    }

    get activeRoleId() {
        return this.getActiveRoleId();
    }

    get activeRoleStore() {
        return this.getActiveRoleStore();
    }

    get activeRole() {
        return this.getActiveRole();
    }

    get attributes() {
        return this.getAttributes();
    }

    get addedAttributes() {
        return this.getAddedAttributes();
    }

    get activeAttributeId() {
        return this.getActiveAttributeId();
    }

    get activeAttributeStore() {
        return this.getActiveAttributeStore();
    }

    get activeAttribute() {
        return this.getActiveAttribute();
    }
}

export const store = new ScreenReadyStore();

export default ScreenReadyStore;
