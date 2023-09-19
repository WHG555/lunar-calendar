import { ItemView, WorkspaceLeaf } from 'obsidian';
import { createApp, App as VueApp } from 'vue';
import LunarCalendarView from "./LunarCalendar.vue"

export const VIEW_TYPE: string = 'lunar';

export class LunarView extends ItemView {
    vueapp: VueApp;
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }
    getViewType(): string {
        return VIEW_TYPE;
    }
    getDisplayText(): string {
        return "农历";
    }
    getIcon(): string {
        return "calendar-with-checkmark";
      }
    async onOpen() {
        const {contentEl} = this;
        contentEl.empty();
        contentEl.createEl("div", {
            cls: "lunar"
        });
        let app = createApp(LunarCalendarView);
        app.mount('.lunar');
    }
    async onClose() {
        this.vueapp.unmount();
    }

}