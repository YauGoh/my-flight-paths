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

    setTimeout(() => reveal());
}

export const dismissTopSheet = () => {

    let top: SheetInfo | undefined = undefined;

    state.update(s => {
        
        if (!s.stack.length) return s;

        top = s.stack[s.stack.length - 1];
        top.shown = false;

        return {
            ... s,
            stack: [... s.stack]
        }
    });

    // If there is something from the top, wait 1 second to give it a chance to animate away before
    // cleaning it up
    if (top) cleanUp(top);
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

const cleanUp =(lastDismissed: SheetInfo) => {

    // Wait 1 second to remove last dismissed sheet so it has a chance to animate away
    setTimeout(
        () => state.update(s => ({
            ... s,
            stack: s.stack.filter(d => d !== lastDismissed)
        })), 
        1000);   
}

export const sheetState: Readable<SheetState> = state;


