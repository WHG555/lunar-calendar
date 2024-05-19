import { ItemView, WorkspaceLeaf } from 'obsidian';
import { createApp, App as VueApp } from 'vue';
import LunarCalendarView from "./LunarCalendar.vue"
import LunarCalendarView1 from "./LunarCalendar1.vue"
import HuangLi from "./HuangLi.vue"


import LunarCalendarPlugin from "./main";

export const VIEW_TYPE: string = 'lunar';
export const VIEW_TYPE1: string = 'lunar1';
export const VIEW_WEEK_TYPE: string = 'lunar-week';

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

export class LunarView1 extends ItemView {
    plugin: LunarCalendarPlugin;
    vueapp: VueApp;

    constructor(leaf: WorkspaceLeaf, plugin: LunarCalendarPlugin) {
        super(leaf);
        this.plugin = plugin;
    }
    getViewType(): string {
        return VIEW_TYPE1;
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
            cls: "lunar1"
        })

        this.vueapp = createApp(LunarCalendarView1);
        this.vueapp.config.globalProperties.plugin = this.plugin;
        this.vueapp.mount(contentEl);
    }
    async onClose() {
        this.vueapp.unmount();
    }

}

export class LunarWeekView extends ItemView {
    plugin: LunarCalendarPlugin;
    vueapp: VueApp;

    constructor(leaf: WorkspaceLeaf, plugin: LunarCalendarPlugin) {
        super(leaf);
        this.plugin = plugin;
    }
    getViewType(): string {
        return VIEW_WEEK_TYPE;
    }
    getDisplayText(): string {
        return "日历";
    }
    getIcon(): string {
        return "calendar-with-checkmark";
      }
    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        const contentEl = container.createEl("div", {
            cls: "lunarweek"
        })

        this.vueapp = createApp(HuangLi);
        this.vueapp.config.globalProperties.plugin = this.plugin;
        this.vueapp.mount(contentEl);
    }
    async onClose() {
        this.vueapp.unmount();
    }

}