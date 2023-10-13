import { ItemView, WorkspaceLeaf } from 'obsidian';
import { createApp, App as VueApp } from 'vue';
import LunarCalendarView from "./LunarCalendar.vue"
import LunarCalendarPlugin from "./main";

export const VIEW_TYPE: string = 'lunar';

export class LunarView extends ItemView {
    plugin: LunarCalendarPlugin;
    vueapp: VueApp;

    constructor(leaf: WorkspaceLeaf, plugin: LunarCalendarPlugin) {
        super(leaf);
        this.plugin = plugin;
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
        const contentEl = container.createEl("div", {
            cls: "lunar"
        })

        this.vueapp = createApp(LunarCalendarView);
        this.vueapp.config.globalProperties.plugin = this.plugin;
        this.vueapp.mount(contentEl);
    }
    async onClose() {
        this.vueapp.unmount();
    }

}