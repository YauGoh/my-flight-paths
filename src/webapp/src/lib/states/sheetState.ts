import type { ComponentType, SvelteComponent, SvelteComponentTyped } from "svelte";
import { writable, type Readable } from "svelte/store";

interface SheetInfo {
    shown: boolean;
    title: string;
    component: ComponentType;
    props?: any;
}

interface SheetState {
    stack: SheetInfo[];

}

const defaultState: SheetState = {
    stack: []
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

    setTimeout(() => reveal());
}

const reveal = () => {
    state.update(s => ({
        ... s,
        stack: s.stack.map(sheet => {
            if (sheet.shown) return sheet;

            return {
                ... sheet,
                shown: true
            }
        })
    }));
}

export const sheetState: Readable<SheetState> = state;