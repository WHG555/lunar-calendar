import {
    App,
    Plugin,
    PluginSettingTab,
    Setting,
    WorkspaceLeaf
} from 'obsidian';

import { LunarView, VIEW_TYPE } from './view'

interface LunarCalendarPluginSettings {
    calendarpath: string;
    dateformat: string;
}

const DEFAULT_SETTINGS: LunarCalendarPluginSettings = {
    calendarpath: '日历',
    dateformat: "YYYY-MM-DD"
}

export var gsetting = DEFAULT_SETTINGS;

export default class LunarCalendarPlugin extends Plugin {
    settings: LunarCalendarPluginSettings;
    private view: LunarView;

    async onload() {
        await this.loadSettings();

        console.log("load Lunar Calendar")

        this.registerView(
            VIEW_TYPE,
            (leaf: WorkspaceLeaf) => new LunarView(leaf, this)
        );

        // 这添加了一个设置选项卡，以便用户可以配置插件的各个方面
		this.addSettingTab(new LunarSettingTab(this.app, this));

        this.addCommand({
            id: 'lunar-calendar',
            name: '打开农历',
            callback: () => {
                this.activateView()
                // this.view.onOpen()
            }
        });

    }

    onunload() {
        
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
        gsetting = this.settings;
    }

    async saveSettings() {
        gsetting = this.settings;
        await this.saveData(this.settings);
    }
    async activateView() {
        if (this.app.workspace.getLeavesOfType(VIEW_TYPE).length === 0) {
            await this.app.workspace.getRightLeaf(false).setViewState({
                type: VIEW_TYPE,
                active: true,
            })
        }

        this.app.workspace.revealLeaf(
            this.app.workspace.getLeavesOfType(VIEW_TYPE)[0]
        )
    }
}


// 插件设置
class LunarSettingTab extends PluginSettingTab {
	plugin: LunarCalendarPlugin;

	constructor(app: App, plugin: LunarCalendarPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('日记保存路径') 		// 设置名称
			.setDesc('日历生成的日记保存的路径。默认为`日历`')	// 设置描述
			.addText(text => text
				.setPlaceholder('输入要保存的日记路径')
				.setValue(this.plugin.settings.calendarpath)
				.onChange(async (value) => {
					this.plugin.settings.calendarpath = value;
                    gsetting.calendarpath = this.plugin.settings.calendarpath;
					await this.plugin.saveSettings();
				}));

        new Setting(containerEl)
            .setName('日记名保存格式') 		// 设置名称
            .setDesc('参考moment的时间格式。默认为`YYYY-MM-DD`')	// 设置描述
            .addText(text => text
                .setPlaceholder('时间格式')
                .setValue(this.plugin.settings.dateformat)
                .onChange(async (value) => {
                    this.plugin.settings.dateformat = value;
                    gsetting.dateformat = this.plugin.settings.dateformat;
                    await this.plugin.saveSettings();
                }));
	}
}
