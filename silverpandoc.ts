import { asset, clientStore, space, editor, markdown } from "@silverbulletmd/silverbullet/syscalls";
import { createPandocInstance } from "pandoc-wasm/core";
import { createTypstCompiler } from "@myriaddreamin/typst.ts";
import { CompileFormatEnum } from "@myriaddreamin/typst.ts/compiler";

// cache idea from https://github.com/LelouchHe/silversearch-chinese-tokenizer/blob/41f3c0d0f47958939f6a7226e1e6558056a4ec9d/silversearch-chinese-tokenizer.ts#L11

const PANDOC_VERSION = "3.9";
const TYPST_VERSION = "0.7.0";
const CACHE_KEY_PANDOC = "silverpandoc-wasm";
const CACHE_KEY_TYPST = "silverpandoc-typst-wasm";
const LIBRARY_PATH = "Library/dtomvan/silverpandoc";

let pandoc = null;
let typst = null;

async function loadPandoc() {
  if (pandoc) {
    return;
  }

  await editor.flashNotification("Loading pandoc.wasm...");

  let cache = await clientStore.get(CACHE_KEY_PANDOC);
  if (!cache || cache.version !== PANDOC_VERSION) {
    const pandocWasmModule = await import("./node_modules/pandoc-wasm/src/pandoc.wasm");
    const pandocWasmLocation = pandocWasmModule.default.replace(/^\.\//, "");

    cache = {
      version: PANDOC_VERSION,
      data: await space.readFile(`${LIBRARY_PATH}/${pandocWasmLocation}`),
    };
    await clientStore.set(CACHE_KEY_PANDOC, cache);
  }

  const pandocWasm = cache.data.buffer;
  pandoc = await createPandocInstance(pandocWasm);
}

async function loadTypst() {
  if (typst) {
    return;
  }

  await editor.flashNotification("Loading typst...");

  let cache = await clientStore.get(CACHE_KEY_TYPST);
  if (!cache || cache.version !== TYPST_VERSION) {
    const typstModule =
      await import("./node_modules/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm");
    const typstWasmLocation = typstModule.default.replace(/^\.\//, "");

    cache = {
      version: TYPST_VERSION,
      data: await space.readFile(`${LIBRARY_PATH}/${typstWasmLocation}`),
    };
    await clientStore.set(CACHE_KEY_TYPST, cache);
  }

  let wrapper = await import("@myriaddreamin/typst-ts-web-compiler");
  let importWasmModule = async function (wasm_name, url) {
    return cache.data.buffer;
  };
  wrapper.setImportWasmModule(importWasmModule);

  typst = createTypstCompiler();
  await typst.init();
}

export async function exportPDF() {
  const sourcePage = await editor.getCurrentPage();
  const destinationPath = await editor.prompt("Path to destination for PDF", `${sourcePage}.pdf`);

  const exists = await space.fileExists(destinationPath);
  if (exists) {
    const confirmed = await editor.confirm(
      `Output path ${destinationPath} already exists, overwrite?`,
      { destructive: true },
    );
    if (!confirmed) {
      return;
    }
  }

  const text = await editor.getText();
  const parsedMd = await markdown.parseMarkdown(text);
  const mdTree = await markdown.expandMarkdown(parsedMd);
  const rendered = await markdown.renderParseTree(mdTree);

  console.log(rendered);

  await loadPandoc();

  const options = {
    from: "markdown",
    to: "typst",
    standalone: true,
  };

  const result = await pandoc.convert(options, rendered, {});
  console.log(result.stdout);

  await loadTypst();

  await editor.flashNotification("Running typst...");

  console.log(typst);
  console.log(typst.compiler);
  const mainFilePath = "/main.typ";
  typst.addSource(mainFilePath, result.stdout);
  const typstOutput = await typst.compile({ mainFilePath, format: CompileFormatEnum.pdf });

  await space.writeFile(destinationPath, typstOutput.result);
  await editor.navigate(destinationPath);

  await typst.resetShadow();
}
