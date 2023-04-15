import type { ComponentType } from "svelte";
import { get, writable, type Readable } from "svelte/store";

interface SheetInfo {
    shown: boolean;
    title: string;
    component: ComponentType;
    props?: any;
}

interface SheetState {
    stack: SheetInfo[];
    dismissed: SheetInfo[];

}

const defaultState: SheetState = {
    stack: [],
    dismissed: []
}

const state = writable<SheetState>(defaultState);

export const showSheet = (component: ComponentType, title: string, props?: any) => {
    const sheetInfo: SheetInfo = {
        shown: false,
        component,
        title,
        props
    };

    state.update(s => ({
        ... s,
        stack: [ ...s.stack, sheetInfo ]
    }));

    setTimeout(() => reveal(sheetInfo));
}

export const popAllThenShowSheet = (component: ComponentType, title: string, props?: any) => {
    const sheetInfo: SheetInfo = {
        shown: false,
        component,
        title,
        props
    };

    state.update(s => ({
        ... s,
        stack: [ ...s.stack.map(sheet => ({... sheet, shown: false})), sheetInfo ]
    }));

    setTimeout(() => reveal(sheetInfo));
}

export const getCurrentSheet = (): SheetInfo | undefined => {
    const { stack } = get(state);

    if (stack.length === 0) return undefined;

    return stack[stack.length - 1];
}

export const dismissCurrentSheet = () => {

    const { stack } = get(state);

    if (!stack.length) return;

    let top: SheetInfo = stack[stack.length - 1];
    dismissSheet(top);
}

export const dismissSheet = (sheet: SheetInfo) => {
    sheet.shown = false;

    state.update(s => {
        return {
            ... s,
            stack: [... s.stack]
        }
    });

    //cleanUp(sheet);
}

const reveal = (sheet: SheetInfo) => {
    sheet.shown = true;

    state.update(s => ({
        ... s,
        stack: [... s.stack]
    }));
}

const cleanUp = async (lastDismissed: SheetInfo) => {
    // Wait 1 second to remove last dismissed sheet so it has a chance to animate away
    setTimeout(
        () => state.update(s => ({
            ... s,
            stack: s.stack.filter(d => d !== lastDismissed)
        })), 
        1000);   
}

export const sheetState: Readable<SheetState> = state;


