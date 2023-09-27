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
        const container = this.containerEl.children[1];
        container.empty();
        let content = container.createEl("div", {
            cls: "lunar"
        });

        this.vueapp = createApp(LunarCalendarView);
        this.vueapp.mount(content);
    }
    async onClose() {
        this.vueapp.unmount();
    }

}