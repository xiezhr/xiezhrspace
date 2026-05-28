import { sidebar } from "vuepress-theme-hope";
import { growth } from "./growth.js";
import { ai } from "./ai.js";
import { claudeCode } from "./ai/claude-code/index.js";
import { pb } from "./pb.js";
import { git } from "./growth/git/index.js";
import { linux } from "./growth/linux/index.js";
import { idea } from "./growth/idea/index.js";
import { springbootVue } from "./growth/springboot-vue/index.js";
import { docker } from "./growth/docker/index.js";
import { maven } from "./growth/maven/index.js";
import { nginx } from "./growth/nginx/index.js";

export default sidebar({
	"/pb/": pb,
	"/ai/": ai,
	"/ai/claude-code/": claudeCode,
	"/growth/": growth,
	"/growth/git/": git,
	"/growth/linux/": linux,
	"/growth/idea/": idea,
	"/growth/springboot-vue/": springbootVue,
	"/growth/docker/": docker,
	"/growth/maven/": maven,
	"/growth/nginx/": nginx,
});