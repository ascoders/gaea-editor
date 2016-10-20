"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const mobx_1 = require("mobx");
const _ = require("lodash");
const LZString = require("lz-string");
class Viewport {
    constructor(application) {
        this.components = mobx_1.map();
        this.isMovingComponent = false;
        this.showLayoutBorder = false;
        this.viewportHoverComponentSpec = {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            hovering: false
        };
        this.treeHoverComponentSpec = {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            hovering: false
        };
        this.dragStartParentElement = null;
        this.dragStartIndex = 0;
        this.currentHoverElement = null;
        this.currentEditComponentMapUniqueKey = null;
        this.oldProps = null;
        this.lastSelectMapUniqueKey = null;
        this.operates = [];
        this.nowOperateIndex = -1;
        this.dragTargetMapUniqueKey = null;
        this.dragTargetIndex = -1;
        this.hoveringComponentMapUniqueKey = null;
        this.copyComponent = null;
        this.isShowSidebarAddon = false;
        this.isShowLeftBar = false;
        this.leftBarType = '';
        this.application = application;
    }
    createRootUniqueId() {
        this.rootMapUniqueKey = this.createUniqueId();
        return this.rootMapUniqueKey;
    }
    setRootUniqueId(uniqueId) {
        this.rootMapUniqueKey = uniqueId;
    }
    setComponents(mapUniqueKey, componentInfo) {
        if (!componentInfo.props.gaeaEventData) {
            componentInfo.props.gaeaEventData = mobx_1.observable([]);
        }
        this.components.set(mapUniqueKey, componentInfo);
    }
    createUniqueId() {
        return _.uniqueId('gaea-component-' + new Date().getTime() + '-');
    }
    resetComponent(mapUniqueKey) {
        const component = this.components.get(mapUniqueKey);
        const ComponentClass = this.application.getComponentByUniqueKey(component.props.gaeaUniqueKey);
        this.saveOperate({
            type: 'reset',
            mapUniqueKey: mapUniqueKey,
            reset: {
                beforeProps: JSON.parse(JSON.stringify(component.props)),
                beforeName: component.props.name
            }
        });
        const event = JSON.parse(JSON.stringify(component.props.gaeaEvent));
        mobx_1.transaction(() => {
            component.props = mobx_1.extendObservable({}, _.cloneDeep(ComponentClass.defaultProps));
            component.props.gaeaEvent = mobx_1.extendObservable({}, event);
        });
    }
    addComponent(parentMapUniqueKey, index) {
        if (this.currentMovingComponent.uniqueKey === 'combo') {
            const copyCombo = this.createCopyComponentWithNewUniqueKey(this.application.comboComponents[this.dragStartIndex], parentMapUniqueKey);
            this.addComplexComponent(parentMapUniqueKey, copyCombo.mapUniqueKey, index, copyCombo);
            return {
                mapUniqueKey: copyCombo.mapUniqueKey,
                component: copyCombo
            };
        }
        else if (this.currentMovingComponent.uniqueKey === 'source') {
            const copySource = this.createCopyComponentWithNewUniqueKey(JSON.parse(LZString.decompressFromBase64(this.currentMovingComponent.source)), parentMapUniqueKey);
            this.addComplexComponent(parentMapUniqueKey, copySource.mapUniqueKey, index, copySource);
            return {
                mapUniqueKey: copySource.mapUniqueKey,
                component: copySource
            };
        }
        else {
            let mapUniqueKey;
            if (this.currentMovingComponent.isNew) {
                mapUniqueKey = this.createUniqueId();
                this.addNewComponent(mapUniqueKey, parentMapUniqueKey, this.currentMovingComponent.uniqueKey, index);
            }
            else {
                mapUniqueKey = this.currentMovingComponent.mapUniqueKey;
                this.addToParent(mapUniqueKey, parentMapUniqueKey, index);
            }
            return {
                mapUniqueKey: mapUniqueKey,
                component: null
            };
        }
    }
    sortComponents(parentMapUniqueKey, beforeIndex, afterIndex) {
        const layoutChilds = this.components.get(parentMapUniqueKey).layoutChilds;
        if (beforeIndex < afterIndex) {
            mobx_1.transaction(() => {
                for (let index = beforeIndex; index < afterIndex; index++) {
                    const beforeUniqueKey = layoutChilds[index];
                    const afterUniqueKey = layoutChilds[index + 1];
                    layoutChilds[index] = afterUniqueKey;
                    layoutChilds[index + 1] = beforeUniqueKey;
                }
            });
        }
        else {
            mobx_1.transaction(() => {
                for (let index = beforeIndex; index > afterIndex; index--) {
                    const beforeUniqueKey = layoutChilds[index];
                    const afterUniqueKey = layoutChilds[index - 1];
                    layoutChilds[index] = afterUniqueKey;
                    layoutChilds[index - 1] = beforeUniqueKey;
                }
            });
        }
    }
    startDragging(childMapUniqueKey, uniqueKey, isNew, dragStartParentElement = null, dragStartIndex = 0, source = '') {
        this.isMovingComponent = true;
        this.dragStartParentElement = dragStartParentElement;
        this.dragStartIndex = dragStartIndex;
        this.currentMovingComponent = {
            mapUniqueKey: childMapUniqueKey,
            uniqueKey,
            isNew,
            source
        };
    }
    endDragging() {
        this.isMovingComponent = false;
    }
    setShowLayoutBorder(isShow) {
        this.showLayoutBorder = isShow;
    }
    setRootDomInstance(rootDomInstance) {
        this.rootDomInstance = rootDomInstance;
    }
    setViewportDomInstance(viewportDomInstance) {
        this.viewportDomInstance = viewportDomInstance;
    }
    setSectionContainerDomInstance(sectionContainerDomInstance) {
        this.sectionContainerDomInstance = sectionContainerDomInstance;
    }
    setHoverComponent(element) {
        this.currentHoverElement = element;
        this.resetComponentOutline();
    }
    resetComponentOutline() {
        if (this.currentHoverElement === null) {
            return;
        }
        const targetBoundingClientRect = this.currentHoverElement.getBoundingClientRect();
        const viewportBoundingClientRect = this.viewportDomInstance.getBoundingClientRect();
        mobx_1.transaction(() => {
            this.viewportHoverComponentSpec = {
                left: targetBoundingClientRect.left - viewportBoundingClientRect.left,
                top: targetBoundingClientRect.top - viewportBoundingClientRect.top,
                width: targetBoundingClientRect.width,
                height: targetBoundingClientRect.height,
                hovering: true
            };
        });
    }
    setLeaveHover() {
        this.viewportHoverComponentSpec.hovering = false;
        this.currentHoverElement = null;
    }
    setTreeLeaveHover() {
        this.treeHoverComponentSpec.hovering = false;
    }
    setTreeDomInstance(treeDomInstance) {
        this.treeDomInstance = treeDomInstance;
    }
    setHoverTreeComponent(element) {
        const targetBoundingClientRect = element.getBoundingClientRect();
        const treeBoundingClientRect = this.treeDomInstance.getBoundingClientRect();
        mobx_1.transaction(() => {
            this.treeHoverComponentSpec = {
                left: targetBoundingClientRect.left - treeBoundingClientRect.left,
                top: targetBoundingClientRect.top - treeBoundingClientRect.top,
                width: element.clientWidth,
                height: element.clientHeight,
                hovering: true
            };
        });
    }
    setCurrentEditComponentMapUniqueKey(mapUniqueKey) {
        this.currentEditComponentMapUniqueKey = mapUniqueKey;
        this.showSidebarAddon();
    }
    cancelEditComponent() {
        this.currentEditComponentMapUniqueKey = null;
        this.hideSidebarAddon();
        if (this.lastSelectMapUniqueKey !== null) {
            this.application.event.emit(this.application.event.changeComponentSelectStatusEvent, {
                mapUniqueKey: this.lastSelectMapUniqueKey,
                selected: false
            });
            this.setLastSelectMapUniqueKey(null);
        }
    }
    findComponentPathFromRoot(mapUniqueKey) {
        let finderPath = [mapUniqueKey];
        let nowComponent = this.components.get(mapUniqueKey);
        if (nowComponent.parentMapUniqueKey === null) {
            return [];
        }
        while (this.components.get(nowComponent.parentMapUniqueKey).parentMapUniqueKey !== null) {
            finderPath.unshift(nowComponent.parentMapUniqueKey);
            nowComponent = this.components.get(nowComponent.parentMapUniqueKey);
        }
        return finderPath;
    }
    updateComponentOptionsValue(editOptions, value) {
        let componentInfo = this.components.get(this.currentEditComponentMapUniqueKey);
        const oldValue = JSON.parse(JSON.stringify(componentInfo.props));
        this.updateComponentOptionsValueByOptions(this.currentEditComponentMapUniqueKey, editOptions, value);
        const newValue = JSON.parse(JSON.stringify(componentInfo.props));
        this.saveOperate({
            type: 'update',
            mapUniqueKey: this.currentEditComponentMapUniqueKey,
            update: {
                oldValue,
                newValue
            }
        });
    }
    updateComponentValue(field, value) {
        let componentInfo = this.components.get(this.currentEditComponentMapUniqueKey);
        const oldValue = JSON.parse(JSON.stringify(componentInfo.props));
        this.setPropsByField(componentInfo.props, field, value);
        const newValue = JSON.parse(JSON.stringify(componentInfo.props));
        this.saveOperate({
            type: 'update',
            mapUniqueKey: this.currentEditComponentMapUniqueKey,
            update: {
                oldValue,
                newValue
            }
        });
    }
    prepareWriteHistory() {
        let componentInfo = this.components.get(this.currentEditComponentMapUniqueKey);
        this.oldProps = JSON.parse(JSON.stringify(componentInfo.props));
    }
    writeHistory() {
        let componentInfo = this.components.get(this.currentEditComponentMapUniqueKey);
        const newValue = JSON.parse(JSON.stringify(componentInfo.props));
        this.saveOperate({
            type: 'update',
            mapUniqueKey: this.currentEditComponentMapUniqueKey,
            update: {
                oldValue: this.oldProps,
                newValue
            }
        });
    }
    updateComponentValueWithNoHistory(field, value) {
        let componentInfo = this.components.get(this.currentEditComponentMapUniqueKey);
        this.setPropsByField(componentInfo.props, field, value);
    }
    updateComponentOptionsValueByOptions(mapUniqueKey, editOptions, value) {
        let componentInfo = this.components.get(mapUniqueKey);
        this.setPropsByFieldWithEditor(componentInfo.props, editOptions, value);
    }
    getPropsByField(props, editOptions) {
        return _.at(props, editOptions.field);
    }
    getPropsByFieldWithEditor(props, editOptions) {
        let value = this.getPropsByField(props, editOptions);
        if (value === null || value === editOptions.emptyValue) {
            return '';
        }
        return value;
    }
    setPropsByField(props, field, value) {
        _.set(props, field, value);
    }
    setPropsByFieldWithEditor(props, editOptions, value) {
        switch (editOptions.type) {
            case 'string':
                value = value.toString();
                break;
            case 'number':
                value = Number(value);
                break;
            case 'boolean':
                value = Boolean(value);
                break;
        }
        if (value === '') {
            value = editOptions.emptyValue || null;
        }
        this.setPropsByField(props, editOptions.field, value);
    }
    setLastSelectMapUniqueKey(mapUniqueKey) {
        this.lastSelectMapUniqueKey = mapUniqueKey;
    }
    getIncrementComponentsInfo() {
        const cloneComponents = JSON.parse(JSON.stringify(this.components.toJSON()));
        Object.keys(cloneComponents).map(key => {
            cloneComponents[key] = this.application.cleanComponent(cloneComponents[key]);
        });
        return LZString.compressToBase64(JSON.stringify(cloneComponents));
    }
    addNewComponent(mapUniqueKey, parentMapUniqueKey, uniqueId, index) {
        const ComponentClass = this.application.getComponentByUniqueKey(uniqueId);
        const newProps = mobx_1.extendObservable({}, _.cloneDeep(ComponentClass.defaultProps));
        let component = {
            props: newProps,
            parentMapUniqueKey: parentMapUniqueKey
        };
        if (uniqueId === 'gaea-layout') {
            component.layoutChilds = [];
        }
        this.setComponents(mapUniqueKey, component);
        this.components.get(parentMapUniqueKey).layoutChilds.splice(index, 0, mapUniqueKey);
    }
    addToParent(mapUniqueKey, parentMapUniqueKey, index) {
        this.components.get(mapUniqueKey).parentMapUniqueKey = parentMapUniqueKey;
        this.components.get(parentMapUniqueKey).layoutChilds.splice(index, 0, mapUniqueKey);
    }
    addComplexComponent(parentMapUniqueKey, mapUniqueKey, index, componentFullInfo) {
        Object.keys(componentFullInfo.childs).forEach(childMapUniqueKey => {
            const expendComponentInfo = this.application.expendComponent(JSON.parse(JSON.stringify(componentFullInfo.childs[childMapUniqueKey])));
            let component = {
                props: mobx_1.extendObservable({}, expendComponentInfo.props),
                parentMapUniqueKey: expendComponentInfo.parentMapUniqueKey
            };
            if (expendComponentInfo.props.gaeaUniqueKey === 'gaea-layout') {
                component.layoutChilds = expendComponentInfo.layoutChilds || [];
            }
            this.setComponents(childMapUniqueKey, component);
        });
        const expendRootComponentInfo = this.application.expendComponent(JSON.parse(JSON.stringify(componentFullInfo.componentInfo)));
        let rootComponent = {
            props: mobx_1.extendObservable({}, expendRootComponentInfo.props),
            parentMapUniqueKey: expendRootComponentInfo.parentMapUniqueKey
        };
        if (expendRootComponentInfo.props.gaeaUniqueKey === 'gaea-layout') {
            rootComponent.layoutChilds = expendRootComponentInfo.layoutChilds || [];
        }
        this.setComponents(mapUniqueKey, rootComponent);
        this.addToParent(mapUniqueKey, parentMapUniqueKey, index);
    }
    initLastOperateComponents(lastOperateComponents) {
        this.lastOperateComponents = lastOperateComponents;
    }
    saveOperate(diff) {
        this.operates.splice(this.nowOperateIndex + 1);
        this.operates.push(diff);
        this.nowOperateIndex = this.operates.length - 1;
    }
    deleteComponent(mapUniqueKey, deleteChildComponents = {}) {
        const parentComponent = this.components.get(this.components.get(mapUniqueKey).parentMapUniqueKey);
        const childIndex = parentComponent.layoutChilds.findIndex(item => item === mapUniqueKey);
        parentComponent.layoutChilds.splice(childIndex, 1);
        const component = this.components.get(mapUniqueKey);
        if (component.props.gaeaUniqueKey === 'gaea-layout') {
            JSON.parse(JSON.stringify(component.layoutChilds)).forEach((componentMapUniqueKey) => {
                deleteChildComponents[componentMapUniqueKey] = JSON.parse(JSON.stringify(this.components.get(componentMapUniqueKey)));
                this.deleteComponent(componentMapUniqueKey, deleteChildComponents);
            });
        }
        this.components.delete(mapUniqueKey);
        return deleteChildComponents;
    }
    undo() {
        if (this.nowOperateIndex <= -1) {
            return;
        }
        this.cancelEditComponent();
        const operate = this.operates[this.nowOperateIndex];
        switch (operate.type) {
            case 'add':
                this.deleteComponent(operate.mapUniqueKey);
                break;
            case 'update':
                this.components.get(operate.mapUniqueKey).props = mobx_1.extendObservable({}, _.cloneDeep(operate.update.oldValue));
                break;
            case 'exchange':
                this.sortComponents(operate.mapUniqueKey, operate.exchange.newIndex, operate.exchange.oldIndex);
                break;
            case 'move':
                const mapUniqueKey = this.components.get(operate.move.targetParentMapUniqueKey).layoutChilds.splice(operate.move.targetIndex, 1)[0];
                this.addToParent(mapUniqueKey, operate.move.sourceParentMapUniqueKey, operate.move.sourceIndex);
                break;
            case 'remove':
                this.addComplexComponent(operate.remove.parentMapUniqueKey, operate.mapUniqueKey, operate.remove.index, operate.remove);
                break;
            case 'paste':
                this.deleteComponent(operate.mapUniqueKey);
                break;
            case 'reset':
                this.components.get(operate.mapUniqueKey).props = operate.reset.beforeProps;
                break;
            case 'addCombo':
                this.deleteComponent(operate.mapUniqueKey);
                break;
            case 'addSource':
                this.deleteComponent(operate.mapUniqueKey);
                break;
        }
        this.nowOperateIndex -= 1;
    }
    redo() {
        if (this.nowOperateIndex >= this.operates.length - 1) {
            return;
        }
        this.cancelEditComponent();
        this.nowOperateIndex += 1;
        const operate = this.operates[this.nowOperateIndex];
        switch (operate.type) {
            case 'add':
                this.addNewComponent(operate.mapUniqueKey, operate.add.parentMapUniqueKey, operate.add.uniqueId, operate.add.index);
                break;
            case 'update':
                this.components.get(operate.mapUniqueKey).props = mobx_1.extendObservable({}, _.cloneDeep(operate.update.newValue));
                break;
            case 'exchange':
                this.sortComponents(operate.mapUniqueKey, operate.exchange.oldIndex, operate.exchange.newIndex);
                break;
            case 'move':
                const mapUniqueKey = this.components.get(operate.move.sourceParentMapUniqueKey).layoutChilds.splice(operate.move.sourceIndex, 1)[0];
                this.addToParent(mapUniqueKey, operate.move.targetParentMapUniqueKey, operate.move.targetIndex);
                break;
            case 'remove':
                this.deleteComponent(operate.mapUniqueKey);
                break;
            case 'paste':
                this.addComplexComponent(operate.paste.parentMapUniqueKey, operate.mapUniqueKey, operate.paste.index, operate.paste);
                break;
            case 'reset':
                const ComponentClass = this.application.getComponentByUniqueKey(operate.reset.beforeProps.gaeaUniqueKey);
                this.components.get(operate.mapUniqueKey).props = mobx_1.extendObservable({}, _.cloneDeep(ComponentClass.defaultProps));
                break;
            case 'addCombo':
                this.addComplexComponent(operate.addCombo.parentMapUniqueKey, operate.mapUniqueKey, operate.addCombo.index, operate.addCombo.componentInfo);
                break;
            case 'addSource':
                this.addComplexComponent(operate.addSource.parentMapUniqueKey, operate.mapUniqueKey, operate.addSource.index, operate.addSource.componentInfo);
                break;
        }
    }
    get canUndo() {
        return this.nowOperateIndex > -1;
    }
    get canRedo() {
        return this.nowOperateIndex < this.operates.length - 1;
    }
    setDragTarget(mapUniqueKey, index) {
        this.dragTargetMapUniqueKey = mapUniqueKey;
        this.dragTargetIndex = index;
    }
    setHoveringComponentMapUniqueKey(mapUniqueKey) {
        this.hoveringComponentMapUniqueKey = mapUniqueKey;
    }
    copy(mapUniqueKey) {
        if (!mapUniqueKey) {
            return true;
        }
        this.copyComponent = this.getComponentFullInfoByMapUniqueKey(mapUniqueKey);
    }
    createCopyComponentWithNewUniqueKey(originComponent, parentMapUniqueKey) {
        const uniqueKeyMap = new Map();
        uniqueKeyMap.set(originComponent.mapUniqueKey, this.createUniqueId());
        if (originComponent.componentInfo.props.gaeaUniqueKey === 'gaea-layout') {
            Object.keys(originComponent.childs).forEach(childMapUniqueKey => {
                uniqueKeyMap.set(childMapUniqueKey, this.createUniqueId());
            });
        }
        let childs = {};
        Object.keys(originComponent.childs).forEach(mapUniqueKey => {
            const originChild = originComponent.childs[mapUniqueKey];
            childs[uniqueKeyMap.get(mapUniqueKey)] = {
                parentMapUniqueKey: uniqueKeyMap.get(originChild.parentMapUniqueKey),
                props: JSON.parse(JSON.stringify(originChild.props))
            };
            if (originChild.layoutChilds) {
                childs[uniqueKeyMap.get(mapUniqueKey)].layoutChilds = originChild.layoutChilds.map(childMapUniqueKey => uniqueKeyMap.get(childMapUniqueKey));
            }
        });
        let newCopyComponent = {
            mapUniqueKey: uniqueKeyMap.get(originComponent.mapUniqueKey),
            componentInfo: {
                parentMapUniqueKey: parentMapUniqueKey,
                props: JSON.parse(JSON.stringify(originComponent.componentInfo.props))
            },
            childs: childs
        };
        if (originComponent.componentInfo.layoutChilds) {
            newCopyComponent.componentInfo.layoutChilds = originComponent.componentInfo.layoutChilds.map(childMapUniqueKey => uniqueKeyMap.get(childMapUniqueKey));
        }
        return newCopyComponent;
    }
    paste(parentMapUniqueKey) {
        if (!parentMapUniqueKey) {
            return true;
        }
        if (!this.copyComponent) {
            return true;
        }
        const parentComponent = this.components.get(parentMapUniqueKey);
        if (parentComponent.props.gaeaUniqueKey !== 'gaea-layout') {
            return false;
        }
        const newCopyComponent = this.createCopyComponentWithNewUniqueKey(this.copyComponent, parentMapUniqueKey);
        const parentChildCount = this.components.get(parentMapUniqueKey).layoutChilds.length;
        this.addComplexComponent(parentMapUniqueKey, newCopyComponent.mapUniqueKey, parentChildCount, newCopyComponent);
        this.saveOperate({
            type: 'paste',
            mapUniqueKey: newCopyComponent.mapUniqueKey,
            paste: {
                parentMapUniqueKey,
                index: parentChildCount,
                mapUniqueKey: newCopyComponent.mapUniqueKey,
                componentInfo: newCopyComponent.componentInfo,
                childs: newCopyComponent.childs
            }
        });
        return true;
    }
    getComponentFullInfoByMapUniqueKey(mapUniqueKey) {
        const componentInfo = this.components.get(mapUniqueKey);
        let childs = {};
        const mapChilds = (component, childs) => {
            if (component.props.gaeaUniqueKey === 'gaea-layout' && component.layoutChilds) {
                JSON.parse(JSON.stringify(component.layoutChilds)).forEach((componentMapUniqueKey) => {
                    const childInfo = this.components.get(componentMapUniqueKey);
                    childs[componentMapUniqueKey] = JSON.parse(JSON.stringify(childInfo));
                    mapChilds(childInfo, childs);
                });
            }
        };
        mapChilds(componentInfo, childs);
        return {
            mapUniqueKey,
            componentInfo: JSON.parse(JSON.stringify(componentInfo)),
            childs: childs
        };
    }
    showSidebarAddon() {
        this.isShowSidebarAddon = true;
        setTimeout(() => {
            this.resetComponentOutline();
        }, 210);
    }
    hideSidebarAddon() {
        this.isShowSidebarAddon = false;
        setTimeout(() => {
            this.resetComponentOutline();
        }, 210);
    }
    showLeftBar(leftBarType) {
        this.leftBarType = leftBarType;
        this.isShowLeftBar = true;
    }
    hideLeftBar() {
        this.leftBarType = '';
        this.isShowLeftBar = false;
    }
    deleteComponentByMapUniqueKeyWithHistory(mapUniqueKey) {
        const parentMapUniqueKey = this.components.get(mapUniqueKey).parentMapUniqueKey;
        if (parentMapUniqueKey === null) {
            return;
        }
        const componentInfo = JSON.parse(JSON.stringify(this.components.get(mapUniqueKey)));
        const index = this.components.get(parentMapUniqueKey).layoutChilds.findIndex(item => item === mapUniqueKey);
        this.cancelEditComponent();
        const deleteChildsComponents = this.deleteComponent(mapUniqueKey);
        this.saveOperate({
            type: 'remove',
            mapUniqueKey: mapUniqueKey,
            remove: {
                mapUniqueKey: mapUniqueKey,
                parentMapUniqueKey,
                index,
                componentInfo: componentInfo,
                childs: deleteChildsComponents
            }
        });
    }
    addEvent(mapUniqueKey) {
        const componentInfo = this.components.get(mapUniqueKey);
        if (!componentInfo.props.gaeaEvent) {
            return;
        }
        const eventData = {
            type: 'init',
            event: 'none',
            typeIndex: -1,
            eventIndex: -1
        };
        componentInfo.props.gaeaEventData.push(eventData);
    }
    removeEvent(mapUniqueKey, index) {
        const componentInfo = this.components.get(mapUniqueKey);
        componentInfo.props.gaeaEventData.splice(index, 1);
    }
    updateEventTriggerCondition(mapUniqueKey, dataIndex, typeIndex) {
        const componentInfo = this.components.get(mapUniqueKey);
        if (isNaN(Number(typeIndex))) {
            mobx_1.transaction(() => {
                _.set(componentInfo.props, `gaeaEventData.${dataIndex}.type`, typeIndex);
                _.set(componentInfo.props, `gaeaEventData.${dataIndex}.typeIndex`, -1);
            });
            switch (typeIndex) {
                case 'listen':
                    componentInfo.props.gaeaEventData[dataIndex].typeData = mobx_1.observable({
                        listen: ''
                    });
                    break;
            }
            return;
        }
        const eventType = componentInfo.props.gaeaEvent.types[Number(typeIndex)];
        mobx_1.transaction(() => {
            _.set(componentInfo.props, `gaeaEventData.${dataIndex}.type`, eventType.type);
            _.set(componentInfo.props, `gaeaEventData.${dataIndex}.typeIndex`, Number(typeIndex));
        });
    }
    updateEventAction(mapUniqueKey, dataIndex, eventIndex) {
        const componentInfo = this.components.get(mapUniqueKey);
        if (isNaN(Number(eventIndex))) {
            mobx_1.transaction(() => {
                _.set(componentInfo.props, `gaeaEventData.${dataIndex}.event`, eventIndex);
                _.set(componentInfo.props, `gaeaEventData.${dataIndex}.eventIndex`, -1);
            });
            switch (eventIndex) {
                case 'emit':
                    componentInfo.props.gaeaEventData[dataIndex].eventData = mobx_1.observable({
                        emit: ''
                    });
                    break;
            }
            return;
        }
        const eventAction = componentInfo.props.gaeaEvent.events[Number(eventIndex)];
        mobx_1.transaction(() => {
            _.set(componentInfo.props, `gaeaEventData.${dataIndex}.event`, eventAction.event);
            _.set(componentInfo.props, `gaeaEventData.${dataIndex}.eventIndex`, Number(eventIndex));
        });
        switch (eventAction.event) {
            case 'jumpUrl':
                componentInfo.props.gaeaEventData[dataIndex].eventData = mobx_1.observable({
                    url: ''
                });
                break;
            case 'call':
                let fields = {};
                eventAction.call.param && eventAction.call.param.forEach(param => {
                    fields[param.field] = null;
                });
                componentInfo.props.gaeaEventData[dataIndex].eventData = mobx_1.observable(fields);
                break;
        }
    }
    updateEventData(mapUniqueKey, field, value) {
        const componentInfo = this.components.get(mapUniqueKey);
        _.set(componentInfo.props, field, value);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Viewport;
__decorate([
    mobx_1.observable
], Viewport.prototype, "components", void 0);
__decorate([
    mobx_1.observable
], Viewport.prototype, "rootMapUniqueKey", void 0);
__decorate([
    mobx_1.observable
], Viewport.prototype, "isMovingComponent", void 0);
__decorate([
    mobx_1.observable
], Viewport.prototype, "showLayoutBorder", void 0);
__decorate([
    mobx_1.observable
], Viewport.prototype, "viewportHoverComponentSpec", void 0);
__decorate([
    mobx_1.observable
], Viewport.prototype, "treeHoverComponentSpec", void 0);
__decorate([
    mobx_1.observable
], Viewport.prototype, "currentEditComponentMapUniqueKey", void 0);
__decorate([
    mobx_1.observable
], Viewport.prototype, "nowOperateIndex", void 0);
__decorate([
    mobx_1.action('保存历史记录')
], Viewport.prototype, "saveOperate", null);
__decorate([
    mobx_1.computed
], Viewport.prototype, "canUndo", null);
__decorate([
    mobx_1.computed
], Viewport.prototype, "canRedo", null);
__decorate([
    mobx_1.observable
], Viewport.prototype, "isShowSidebarAddon", void 0);
__decorate([
    mobx_1.observable
], Viewport.prototype, "isShowLeftBar", void 0);
__decorate([
    mobx_1.observable
], Viewport.prototype, "leftBarType", void 0);
