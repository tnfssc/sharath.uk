import SimpleIconsMdx from "~icons/simple-icons/mdx";
import DeviconPlainBash from "~icons/devicon-plain/bash";
import DeviconPlainJson from "~icons/devicon-plain/json";
import DeviconPlainRust from "~icons/devicon-plain/rust";
import DeviconPlainYaml from "~icons/devicon-plain/yaml";
import DeviconPlainHtml5 from "~icons/devicon-plain/html5";
import SimpleIconsDotenv from "~icons/simple-icons/dotenv";
import DeviconPlainPostcss from "~icons/devicon-plain/postcss";
import DeviconPlainJavascript from "~icons/devicon-plain/javascript";
import DeviconPlainTypescript from "~icons/devicon-plain/typescript";
import MaterialSymbolsMarkdown from "~icons/material-symbols/markdown";

export const LangIcons = {
  mdx: SimpleIconsMdx,
  sh: DeviconPlainBash,
  rust: DeviconPlainRust,
  bash: DeviconPlainBash,
  json: DeviconPlainJson,
  env: SimpleIconsDotenv,
  yaml: DeviconPlainYaml,
  html: DeviconPlainHtml5,
  md: MaterialSymbolsMarkdown,
  postcss: DeviconPlainPostcss,
  typescript: DeviconPlainTypescript,
  javascript: DeviconPlainJavascript,
};

export type Language = keyof typeof LangIcons;
