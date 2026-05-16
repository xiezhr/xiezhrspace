import { sidebar } from "vuepress-theme-hope";
import { growth } from "./growth.js";
import { ai } from "./ai.js";
import { pb } from "./pb.js";
import { git } from "./git.js";

export default sidebar({
	"/pb/": pb,
	"/ai/": ai,
	"/growth/": growth,
	"/growth/git/": git,
});
