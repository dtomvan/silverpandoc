var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@myriaddreamin/typst.ts/dist/esm/options.init.mjs
function disableDefaultFontAssets() {
  return loadFonts([], { assets: false });
}
function preloadFontAssets(options) {
  return loadFonts([], options);
}
function _resolveAssets(options) {
  const fonts = [];
  if (options && options?.assets !== false && options?.assets?.length && options?.assets?.length > 0) {
    let defaultPrefix = {
      text: "https://cdn.jsdelivr.net/gh/typst/typst-assets@v0.13.1/files/fonts/",
      _: "https://cdn.jsdelivr.net/gh/typst/typst-dev-assets@v0.13.1/files/fonts/"
    };
    let assetUrlPrefix = options.assetUrlPrefix ?? defaultPrefix;
    if (typeof assetUrlPrefix === "string") {
      assetUrlPrefix = { _: assetUrlPrefix };
    } else {
      assetUrlPrefix = { ...defaultPrefix, ...assetUrlPrefix };
    }
    for (const key of Object.keys(assetUrlPrefix)) {
      const u = assetUrlPrefix[key];
      if (u[u.length - 1] !== "/") {
        assetUrlPrefix[key] = u + "/";
      }
    }
    const prefix = (asset2, f) => f.map((font) => (assetUrlPrefix[asset2] || assetUrlPrefix["_"]) + font);
    for (const asset2 of options.assets) {
      switch (asset2) {
        case "text":
          fonts.push(...prefix(asset2, _textFonts));
          break;
        case "cjk":
          fonts.push(...prefix(asset2, _cjkFonts));
          break;
        case "emoji":
          fonts.push(...prefix(asset2, _emojiFonts));
          break;
      }
    }
  }
  return fonts;
}
function loadFonts(userFonts, options) {
  const assetFonts = _resolveAssets(options);
  const loader = async (_, { ref, builder }) => {
    if (options?.fetcher) {
      ref.setFetcher(options.fetcher);
    }
    await ref.loadFonts(builder, [...userFonts, ...assetFonts]);
  };
  loader._preloadRemoteFontOptions = options;
  loader._kind = "fontLoader";
  return loader;
}
function withPackageRegistry(packageRegistry) {
  return async (_, { builder }) => {
    return new Promise((resolve) => {
      builder.set_package_registry(packageRegistry, function(spec) {
        return packageRegistry.resolve(spec, this);
      });
      resolve();
    });
  };
}
function withAccessModel(accessModel) {
  return async (_, ctx) => {
    if (ctx.alreadySetAccessModel) {
      throw new Error(`already set some assess model before: ${ctx.alreadySetAccessModel.constructor?.name}(${ctx.alreadySetAccessModel})`);
    }
    ctx.alreadySetAccessModel = accessModel;
    return new Promise((resolve) => {
      ctx.builder.set_access_model(accessModel, (path) => {
        const lastModified = accessModel.getMTime(path);
        if (lastModified) {
          return lastModified.getTime();
        }
        return 0;
      }, (path) => {
        return accessModel.isFile(path) || false;
      }, (path) => {
        return accessModel.getRealPath(path) || path;
      }, (path) => {
        return accessModel.readAll(path);
      });
      resolve();
    });
  };
}
var _textFonts, _cjkFonts, _emojiFonts;
var init_options_init = __esm({
  "node_modules/@myriaddreamin/typst.ts/dist/esm/options.init.mjs"() {
    _textFonts = [
      "DejaVuSansMono-Bold.ttf",
      "DejaVuSansMono-BoldOblique.ttf",
      "DejaVuSansMono-Oblique.ttf",
      "DejaVuSansMono.ttf",
      "LibertinusSerif-Bold.otf",
      "LibertinusSerif-BoldItalic.otf",
      "LibertinusSerif-Italic.otf",
      "LibertinusSerif-Regular.otf",
      "LibertinusSerif-Semibold.otf",
      "LibertinusSerif-SemiboldItalic.otf",
      "NewCM10-Bold.otf",
      "NewCM10-BoldItalic.otf",
      "NewCM10-Italic.otf",
      "NewCM10-Regular.otf",
      "NewCMMath-Bold.otf",
      "NewCMMath-Book.otf",
      "NewCMMath-Regular.otf"
    ];
    _cjkFonts = [
      "InriaSerif-Bold.ttf",
      "InriaSerif-BoldItalic.ttf",
      "InriaSerif-Italic.ttf",
      "InriaSerif-Regular.ttf",
      "Roboto-Regular.ttf",
      "NotoSerifCJKsc-Regular.otf"
    ];
    _emojiFonts = ["TwitterColorEmoji.ttf", "NotoColorEmoji-Regular-COLR.subset.ttf"];
  }
});

// node_modules/@myriaddreamin/typst.ts/dist/esm/internal.types.mjs
var kObject, TypstDefaultParams;
var init_internal_types = __esm({
  "node_modules/@myriaddreamin/typst.ts/dist/esm/internal.types.mjs"() {
    kObject = /* @__PURE__ */ Symbol.for("reflexo-obj");
    (function(TypstDefaultParams2) {
      TypstDefaultParams2[TypstDefaultParams2["PIXEL_PER_PT"] = 3] = "PIXEL_PER_PT";
    })(TypstDefaultParams || (TypstDefaultParams = {}));
  }
});

// node_modules/@myriaddreamin/typst.ts/dist/esm/render/canvas/view.mjs
var RenderView;
var init_view = __esm({
  "node_modules/@myriaddreamin/typst.ts/dist/esm/render/canvas/view.mjs"() {
    init_internal_types();
    RenderView = class {
      pageInfos;
      loadPageCount;
      imageScaleFactor;
      container;
      canvasList;
      textLayerList;
      commonList;
      textLayerParentList;
      semanticLayerList;
      constructor(pageInfos, container, options) {
        this.pageInfos = pageInfos;
        this.imageScaleFactor = options.pixelPerPt ?? TypstDefaultParams.PIXEL_PER_PT;
        container.innerHTML = "";
        container.style.width = "100%";
        this.container = container;
        this.canvasList = new Array(this.loadPageCount);
        this.textLayerList = new Array(this.loadPageCount);
        this.commonList = new Array(this.loadPageCount);
        this.textLayerParentList = new Array(this.loadPageCount);
        this.semanticLayerList = new Array(this.loadPageCount);
        const createOver = (i, pageAst, commonDiv) => {
          const width = Math.ceil(pageAst.width) * this.imageScaleFactor;
          const height = Math.ceil(pageAst.height) * this.imageScaleFactor;
          const canvas = this.canvasList[i] = document.createElement("canvas");
          const semanticLayer = this.semanticLayerList[i] = document.createElement("div");
          const textLayer = this.textLayerList[i] = document.createElement("div");
          const textLayerParent = this.textLayerParentList[i] = document.createElement("div");
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const canvasDiv = document.createElement("div");
            canvas.width = width;
            canvas.height = height;
            canvasDiv.appendChild(canvas);
            commonDiv.appendChild(canvasDiv);
            canvasDiv.style.position = "absolute";
          }
          {
            textLayerParent.appendChild(textLayer);
            textLayerParent.className = "typst-html-semantics";
            const containerWidth = container.offsetWidth;
            const originalScale = containerWidth / pageAst.width;
            textLayerParent.style.width = `${containerWidth}px`;
            textLayerParent.style.height = `${pageAst.height * originalScale}px`;
            textLayerParent.style.setProperty("--data-text-width", `${originalScale}px`);
            textLayerParent.style.setProperty("--data-text-height", `${originalScale}px`);
            commonDiv.classList.add("typst-page");
            commonDiv.classList.add("canvas");
            commonDiv.style.width = `${containerWidth}px`;
            commonDiv.style.height = `${height * originalScale}px`;
            commonDiv.style.position = "relative";
            semanticLayer.appendChild(textLayerParent);
            commonDiv.appendChild(semanticLayer);
          }
        };
        for (let i = 0; i < this.pageInfos.length; i++) {
          const pageAst = this.pageInfos[i];
          let commonDiv = void 0;
          commonDiv = this.commonList[i] = document.createElement("div");
          container.appendChild(commonDiv);
          createOver(i, pageAst, commonDiv);
        }
      }
      resetLayout() {
        for (let i = 0; i < this.pageInfos.length; i++) {
          const pageAst = this.pageInfos[i];
          const width = Math.ceil(pageAst.width) * this.imageScaleFactor;
          const height = Math.ceil(pageAst.height) * this.imageScaleFactor;
          const canvasDiv = this.canvasList[i].parentElement;
          if (!canvasDiv) {
            throw new Error(`canvasDiv is null for page ${i}, canvas list length ${this.canvasList.length}`);
          }
          const commonDiv = this.commonList[i];
          const textLayerParent = this.textLayerParentList[i];
          const containerWidth = this.container.offsetWidth;
          const originalScale = containerWidth / width;
          textLayerParent.style.width = `${containerWidth}px`;
          textLayerParent.style.height = `${height * originalScale}px`;
          commonDiv.style.width = `${containerWidth}px`;
          commonDiv.style.height = `${height * originalScale}px`;
          const currentScale = this.container.offsetWidth / width;
          canvasDiv.style.transformOrigin = "0px 0px";
          canvasDiv.style.transform = `scale(${currentScale})`;
        }
      }
    };
  }
});

// node_modules/@myriaddreamin/typst.ts/dist/esm/wasm.mjs
var once, LazyWasmModule;
var init_wasm = __esm({
  "node_modules/@myriaddreamin/typst.ts/dist/esm/wasm.mjs"() {
    once = (fn) => {
      let called = false;
      let res;
      return () => {
        if (called) {
          return res;
        }
        called = true;
        return res = fn();
      };
    };
    LazyWasmModule = class {
      wasmBin;
      initOnce;
      constructor(initFn) {
        if (typeof initFn !== "function") {
          throw new Error("initFn is not a function");
        }
        this.initOnce = once(async () => {
          await initFn(this.wasmBin);
        });
      }
      async init(module) {
        this.wasmBin = module;
        await this.initOnce();
      }
    };
  }
});

// node_modules/@myriaddreamin/typst.ts/dist/esm/init.mjs
async function buildComponent(options, gModule, Builder, hooks) {
  await gModule.init(options?.getModule?.());
  return await new ComponentBuilder().build(options, new Builder(), hooks);
}
function loadFontSync(font) {
  return () => {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
    xhr.open("GET", font.url, false);
    xhr.send(null);
    if (xhr.status === 200 && (xhr.response instanceof String || typeof xhr.response === "string")) {
      return Uint8Array.from(xhr.response, (c) => c.charCodeAt(0));
    }
    return new Uint8Array();
  };
}
var ComponentBuilder;
var init_init = __esm({
  "node_modules/@myriaddreamin/typst.ts/dist/esm/init.mjs"() {
    ComponentBuilder = class {
      loadedFonts = /* @__PURE__ */ new Set();
      fetcher = fetch;
      setFetcher(fetcher) {
        this.fetcher = fetcher;
      }
      async loadFonts(builder, fonts) {
        const escapeImport = new Function("m", "return import(m)");
        const fetcher = this.fetcher ||= await (async function() {
          const { fetchBuilder, FileSystemCache } = await escapeImport("node-fetch-cache");
          const cache = new FileSystemCache({
            /// By default, we don't have a complicated cache policy.
            cacheDirectory: ".cache/typst/fonts"
          });
          const cachedFetcher = fetchBuilder.withCache(cache);
          return function(input, init) {
            const timeout = setTimeout(() => {
              console.warn("font fetching is stucking:", input);
            }, 15e3);
            return cachedFetcher(input, init).finally(() => {
              clearTimeout(timeout);
            });
          };
        })();
        const fontsToLoad = fonts.filter((font) => {
          if (font instanceof Uint8Array || typeof font === "object" && "info" in font) {
            return true;
          }
          if (this.loadedFonts.has(font)) {
            return false;
          }
          this.loadedFonts.add(font);
          return true;
        });
        const fontLists = await Promise.all(fontsToLoad.map(async (font) => {
          if (font instanceof Uint8Array) {
            await builder.add_raw_font(font);
            return;
          }
          if (typeof font === "object" && "info" in font) {
            await builder.add_lazy_font(font, "blob" in font ? font.blob : loadFontSync(font));
            return;
          }
          return new Uint8Array(await (await fetcher(font)).arrayBuffer());
        }));
        for (const font of fontLists) {
          if (!font) {
            continue;
          }
          await builder.add_raw_font(font);
        }
      }
      async build(options, builder, hooks) {
        const buildCtx = { ref: this, builder, hooks };
        for (const fn of options?.beforeBuild ?? []) {
          await fn(void 0, buildCtx);
        }
        if (hooks.latelyBuild) {
          hooks.latelyBuild(buildCtx);
        }
        return await builder.build();
      }
    };
  }
});

// node_modules/@myriaddreamin/typst.ts/dist/esm/contrib/dom/typst-doc.mjs
function provideDoc(Base) {
  return class TypstDocument {
    impl;
    kModule;
    constructor(options) {
      if (options.isContentPreview) {
        options.renderMode = "canvas";
      }
      this.kModule = options.kModule;
      this.impl = new Base(options);
      if (!this.impl.r) {
        throw new Error(`mode is not supported, ${options?.renderMode}`);
      }
      if (options.isContentPreview) {
        this.impl.partialRendering = true;
        this.impl.pixelPerPt = 1;
        this.impl.isMixinOutline = true;
      }
    }
    dispose() {
      this.impl.dispose();
    }
    reset() {
      this.impl.reset();
    }
    addChangement(change) {
      this.impl.addChangement(change);
    }
    addViewportChange() {
      this.impl.addViewportChange();
    }
    setPageColor(color) {
      this.impl.pageColor = color;
      this.addViewportChange();
    }
    setPartialRendering(partialRendering) {
      this.impl.partialRendering = partialRendering;
    }
    setCursor(page, x, y) {
      this.impl.cursorPosition = [page, x, y];
    }
    setPartialPageNumber(page) {
      if (page <= 0 || page > this.kModule.retrievePagesInfo().length) {
        return false;
      }
      this.impl.partialRenderPage = page - 1;
      this.addViewportChange();
      return true;
    }
    getPartialPageNumber() {
      return this.impl.partialRenderPage + 1;
    }
    setOutineData(outline) {
      this.impl.outline = outline;
      this.addViewportChange();
    }
  };
}
function composeDoc(Base, ...mixins) {
  return mixins.reduce((acc, mixin) => mixin(acc), Base);
}
var PreviewMode, TypstDocumentContext;
var init_typst_doc = __esm({
  "node_modules/@myriaddreamin/typst.ts/dist/esm/contrib/dom/typst-doc.mjs"() {
    (function(PreviewMode2) {
      PreviewMode2[PreviewMode2["Doc"] = 0] = "Doc";
      PreviewMode2[PreviewMode2["Slide"] = 1] = "Slide";
    })(PreviewMode || (PreviewMode = {}));
    TypstDocumentContext = class _TypstDocumentContext {
      hookedElem;
      kModule;
      opts;
      modes = [];
      /// Configuration fields
      /// enable partial rendering
      partialRendering = true;
      /// underlying renderer
      renderMode = "svg";
      r = void 0;
      /// preview mode
      previewMode = PreviewMode.Doc;
      /// whether this is a content preview
      isContentPreview = false;
      /// whether this content preview will mix outline titles
      isMixinOutline = false;
      /// background color
      backgroundColor = "black";
      /// default page color (empty string means transparent)
      pageColor = "white";
      /// pixel per pt
      pixelPerPt = 3;
      /// customized way to retrieving dom state
      retrieveDOMState;
      /// State fields
      /// whether svg is updating (in triggerSvgUpdate)
      isRendering = false;
      /// whether kModule is initialized
      moduleInitialized = false;
      /// patch queue for updating data.
      patchQueue = [];
      /// resources to dispose
      disposeList = [];
      /// canvas render ctoken
      canvasRenderCToken;
      /// There are two scales in this class: The real scale is to adjust the size
      /// of `hookedElem` to fit the svg. The virtual scale (scale ratio) is to let
      /// user zoom in/out the svg. For example:
      /// + the default value of virtual scale is 1, which means the svg is totally
      ///   fit in `hookedElem`.
      /// + if user set virtual scale to 0.5, then the svg will be zoomed out to fit
      ///   in half width of `hookedElem`. "real" current scale of `hookedElem`
      currentRealScale = 1;
      /// "virtual" current scale of `hookedElem`
      currentScaleRatio = 1;
      /// timeout for delayed viewport change
      vpTimeout = void 0;
      /// sampled by last render time.
      sampledRenderTime = 0;
      /// page to partial render
      partialRenderPage = 0;
      /// outline data
      outline = void 0;
      /// cursor position in form of [page, x, y]
      cursorPosition = void 0;
      // id: number = rnd++;
      /// Cache fields
      /// cached state of container, default to retrieve state from `this.hookedElem`
      cachedDOMState = {
        width: 0,
        height: 0,
        window: {
          innerWidth: 0,
          innerHeight: 0
        },
        boundingRect: {
          left: 0,
          top: 0,
          right: 0
        }
      };
      constructor(opts) {
        this.hookedElem = opts.hookedElem;
        this.kModule = opts.kModule;
        this.opts = opts || {};
        {
          const { renderMode, previewMode, isContentPreview, retrieveDOMState } = opts || {};
          this.partialRendering = false;
          this.renderMode = renderMode ?? this.renderMode;
          this.previewMode = previewMode ?? this.previewMode;
          this.isContentPreview = isContentPreview || false;
          this.retrieveDOMState = retrieveDOMState ?? (() => {
            return {
              width: this.hookedElem.offsetWidth,
              height: this.hookedElem.offsetHeight,
              window: {
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight
              },
              boundingRect: this.hookedElem.getBoundingClientRect()
            };
          });
          this.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--typst-preview-background-color");
        }
        this.hookedElem.classList.add("hide-scrollbar-x");
        this.hookedElem.parentElement?.classList.add("hide-scrollbar-x");
        if (this.previewMode === PreviewMode.Slide) {
          this.hookedElem.classList.add("hide-scrollbar-y");
          this.hookedElem.parentElement?.classList.add("hide-scrollbar-y");
        }
        this.installCtrlWheelHandler();
      }
      reset() {
        this.kModule.reset();
        this.moduleInitialized = false;
      }
      dispose() {
        const disposeList = this.disposeList;
        this.disposeList = [];
        disposeList.forEach((x) => x());
      }
      static derive(ctx, mode) {
        return ["rescale", "rerender", "postRender"].reduce((acc, x) => {
          acc[x] = ctx[`${x}$${mode}`].bind(ctx);
          console.assert(acc[x] !== void 0, `${x}$${mode} is undefined`);
          return acc;
        }, {});
      }
      registerMode(mode) {
        const facade = _TypstDocumentContext.derive(this, mode);
        this.modes.push([mode, facade]);
        if (mode === this.renderMode) {
          this.r = facade;
        }
      }
      installCtrlWheelHandler() {
        const factors = [
          0.1,
          0.2,
          0.3,
          0.4,
          0.5,
          0.6,
          0.7,
          0.8,
          0.9,
          1,
          1.1,
          1.3,
          1.5,
          1.7,
          1.9,
          2.1,
          2.4,
          2.7,
          3,
          3.3,
          3.7,
          4.1,
          4.6,
          5.1,
          5.7,
          6.3,
          7,
          7.7,
          8.5,
          9.4,
          10
        ];
        const wheelEventHandler = (event) => {
          if (event.ctrlKey) {
            event.preventDefault();
            this.cachedDOMState = this.retrieveDOMState();
            if (window.onresize !== null) {
              window.onresize = null;
            }
            const prevScaleRatio = this.currentScaleRatio;
            if (event.deltaY < 0) {
              if (this.currentScaleRatio >= factors.at(-1)) {
                return;
              } else {
                this.currentScaleRatio = factors.filter((x) => x > this.currentScaleRatio).at(0);
              }
            } else if (event.deltaY > 0) {
              if (this.currentScaleRatio <= factors.at(0)) {
                return;
              } else {
                this.currentScaleRatio = factors.filter((x) => x < this.currentScaleRatio).at(-1);
              }
            } else {
              return;
            }
            const scrollFactor = this.currentScaleRatio / prevScaleRatio;
            const scrollX = event.pageX * (scrollFactor - 1);
            const scrollY = event.pageY * (scrollFactor - 1);
            if (Math.abs(this.currentScaleRatio - 1) < 1e-5) {
              this.hookedElem.classList.add("hide-scrollbar-x");
              this.hookedElem.parentElement?.classList.add("hide-scrollbar-x");
              if (this.previewMode === PreviewMode.Slide) {
                this.hookedElem.classList.add("hide-scrollbar-y");
                this.hookedElem.parentElement?.classList.add("hide-scrollbar-y");
              }
            } else {
              this.hookedElem.classList.remove("hide-scrollbar-x");
              this.hookedElem.parentElement?.classList.remove("hide-scrollbar-x");
              if (this.previewMode === PreviewMode.Slide) {
                this.hookedElem.classList.remove("hide-scrollbar-y");
                this.hookedElem.parentElement?.classList.remove("hide-scrollbar-y");
              }
            }
            const svg = this.hookedElem.firstElementChild;
            if (svg) {
              const scaleRatio = this.getSvgScaleRatio();
              const dataHeight = Number.parseFloat(svg.getAttribute("data-height"));
              const scaledHeight = Math.ceil(dataHeight * scaleRatio);
              this.hookedElem.style.height = `${scaledHeight * 2}px`;
            }
            window.scrollBy(scrollX, scrollY);
            this.addViewportChange();
            return false;
          }
        };
        if (this.renderMode !== "dom") {
          const vscodeAPI = typeof acquireVsCodeApi !== "undefined";
          if (vscodeAPI) {
            window.addEventListener("wheel", wheelEventHandler, {
              passive: false
            });
            this.disposeList.push(() => {
              window.removeEventListener("wheel", wheelEventHandler);
            });
          } else {
            document.body.addEventListener("wheel", wheelEventHandler, {
              passive: false
            });
            this.disposeList.push(() => {
              document.body.removeEventListener("wheel", wheelEventHandler);
            });
          }
        }
      }
      /// Get current scale from html to svg
      // Note: one should retrieve dom state before rescale
      getSvgScaleRatio() {
        const svg = this.hookedElem.firstElementChild;
        if (!svg) {
          return 0;
        }
        const container = this.cachedDOMState;
        const svgWidth = Number.parseFloat(svg.getAttribute("data-width") || svg.getAttribute("width") || "1");
        const svgHeight = Number.parseFloat(svg.getAttribute("data-height") || svg.getAttribute("height") || "1");
        this.currentRealScale = this.previewMode === PreviewMode.Slide ? Math.min(container.width / svgWidth, container.height / svgHeight) : container.width / svgWidth;
        return this.currentRealScale * this.currentScaleRatio;
      }
      processQueue(svgUpdateEvent) {
        const eventName = svgUpdateEvent[0];
        switch (eventName) {
          case "new":
          case "diff-v1": {
            if (eventName === "new") {
              this.reset();
            }
            this.kModule.manipulateData({
              action: "merge",
              data: svgUpdateEvent[1]
            });
            this.moduleInitialized = true;
            return true;
          }
          case "viewport-change": {
            if (!this.moduleInitialized) {
              console.log("viewport-change before initialization");
              return false;
            }
            return true;
          }
          default:
            console.log("svgUpdateEvent", svgUpdateEvent);
            return false;
        }
      }
      triggerUpdate() {
        if (this.isRendering) {
          return;
        }
        this.isRendering = true;
        const doUpdate = async () => {
          this.cachedDOMState = this.retrieveDOMState();
          if (this.patchQueue.length === 0) {
            this.isRendering = false;
            this.postprocessChanges();
            return;
          }
          try {
            let t0 = performance.now();
            const ctoken = this.canvasRenderCToken;
            if (ctoken) {
              await ctoken.cancel();
              await ctoken.wait();
              this.canvasRenderCToken = void 0;
              console.log("cancel canvas rendering");
            }
            let needRerender = false;
            while (this.patchQueue.length > 0) {
              needRerender = this.processQueue(this.patchQueue.shift()) || needRerender;
            }
            let t1 = performance.now();
            if (needRerender) {
              this.r.rescale();
              await this.r.rerender();
              this.r.rescale();
            }
            let t2 = performance.now();
            const d = (e, x, y) => `${e} ${(y - x).toFixed(2)} ms`;
            this.sampledRenderTime = t2 - t0;
            requestAnimationFrame(doUpdate);
          } catch (e) {
            console.error(e);
            this.isRendering = false;
            this.postprocessChanges();
          }
        };
        requestAnimationFrame(doUpdate);
      }
      postprocessChanges() {
        this.r.postRender();
        if (this.previewMode === PreviewMode.Slide) {
          document.querySelectorAll(".typst-page-number-indicator").forEach((x) => {
            x.textContent = `${this.kModule.retrievePagesInfo().length}`;
          });
        }
      }
      addChangement(change) {
        if (change[0] === "new") {
          this.patchQueue.splice(0, this.patchQueue.length);
        }
        const pushChange = () => {
          this.vpTimeout = void 0;
          this.patchQueue.push(change);
          this.triggerUpdate();
        };
        if (this.vpTimeout !== void 0) {
          clearTimeout(this.vpTimeout);
        }
        if (change[0] === "viewport-change" && this.isRendering) {
          this.vpTimeout = setTimeout(pushChange, this.sampledRenderTime || 100);
        } else {
          pushChange();
        }
      }
      addViewportChange() {
        this.addChangement(["viewport-change", ""]);
      }
    };
  }
});

// node_modules/@myriaddreamin/typst.ts/dist/esm/contrib/dom/typst-cancel.mjs
var TypstCancellationToken;
var init_typst_cancel = __esm({
  "node_modules/@myriaddreamin/typst.ts/dist/esm/contrib/dom/typst-cancel.mjs"() {
    TypstCancellationToken = class {
      isCancellationRequested = false;
      _onCancelled;
      _onCancelledResolveResolved;
      constructor() {
        let resolveT = void 0;
        let resolveX = void 0;
        this._onCancelled = new Promise((resolve) => {
          resolveT = resolve;
          if (resolveX) {
            resolveX(resolve);
          }
        });
        this._onCancelledResolveResolved = new Promise((resolve) => {
          resolveX = resolve;
          if (resolveT) {
            resolve(resolveT);
          }
        });
      }
      async cancel() {
        await this._onCancelledResolveResolved;
        this.isCancellationRequested = true;
      }
      isCancelRequested() {
        return this.isCancellationRequested;
      }
      async consume() {
        (await this._onCancelledResolveResolved)();
      }
      wait() {
        return this._onCancelled;
      }
    };
  }
});

// node_modules/@myriaddreamin/typst.ts/dist/esm/dom.mjs
function provideDomDoc(Base) {
  return class DomDocument extends Base {
    /// The template element for creating DOM by string.
    tmpl = document.createElement("template");
    /// The stub element for replacing an invisible element.
    stub = this.createElement("<stub></stub>");
    /// Typescript side of lib.
    plugin;
    /// Rust side of kernel.
    docKernel;
    /// The element to track.
    resourceHeader = void 0;
    /// Expected exact state of the current DOM.
    /// Initially it is empty meaning no any page is rendered.
    pages = [];
    /// The virtual scale of the document.
    domScale = 1;
    /// Track mode.
    track_mode = TrackMode.Doc;
    /// Current executing task.
    current_task = void 0;
    /// The currently maintained viewport.
    viewport;
    constructor(...args) {
      super(...args);
      this.registerMode("dom");
      this.disposeList.push(() => {
        this.dispose();
      });
      this.plugin = this.opts.renderer;
      if (this.opts.domScale !== void 0) {
        if (this.opts.domScale <= 0) {
          throw new Error("domScale must be positive");
        }
        this.domScale = this.opts.domScale;
      }
    }
    dispose() {
      for (const page of this.pages) {
        page.dispose();
      }
      if (this.docKernel) {
        this.docKernel.free();
      }
    }
    createElement(tmpl) {
      this.tmpl.innerHTML = tmpl;
      return this.tmpl.content.firstElementChild;
    }
    async mountDom(pixelPerPt) {
      if (this.docKernel) {
        throw new Error("already mounted");
      }
      this.hookedElem.innerHTML = `<svg class="typst-svg-resources" viewBox="0 0 0 0" width="0" height="0" style="opacity: 0; position: absolute;"></svg>`;
      this.resourceHeader = this.hookedElem.querySelector(".typst-svg-resources");
      this.docKernel = await this.plugin.renderer.mount_dom(this.kModule[kObject], this.hookedElem);
      this.docKernel.bind_functions({
        populateGlyphs: (data) => {
          let svg = this.createElement(data);
          let content = svg.firstElementChild;
          this.resourceHeader.append(content);
        }
      });
    }
    async cancelAnyway$dom() {
      if (this.current_task) {
        const task = this.current_task;
        this.current_task = void 0;
        await task.cancel();
      }
    }
    retrieveDOMPages() {
      return Array.from(this.hookedElem.querySelectorAll(".typst-dom-page"));
    }
    // doesn't need to postRender
    postRender$dom() {
    }
    // doesn't need to rescale
    rescale$dom() {
    }
    getDomViewport(cachedWindow, cachedBoundingRect) {
      const left = cachedBoundingRect.left;
      const top = -cachedBoundingRect.top;
      const right = cachedBoundingRect.right;
      const bottom = cachedWindow.innerHeight - cachedBoundingRect.top;
      const rect = {
        x: 0,
        y: top / this.domScale,
        width: Math.max(right - left, 0) / this.domScale,
        height: Math.max(bottom - top, 0) / this.domScale
      };
      if (rect.width <= 0 || rect.height <= 0) {
        rect.x = rect.y = rect.width = rect.height = 0;
      }
      return rect;
    }
    // fast mode
    async rerender$dom() {
      const domState = this.retrieveDOMState();
      const { x, y, width, height } = this.getDomViewport(domState.window, domState.boundingRect);
      let dirty = await this.docKernel.relayout(x, y, width, height);
      if (!dirty) {
        return;
      }
      const cancel = new TypstCancellationToken();
      this.doRender$dom(cancel);
      this.current_task = cancel;
    }
    async doRender$dom(ctx) {
      const condOrExit = (needFrame, cb) => {
        if (needFrame && !ctx.isCancelRequested() && cb) {
          return cb();
        }
      };
      const pages = this.retrieveDOMPages().map((page) => {
        const { innerWidth, innerHeight } = window;
        const browserBBox = page.getBoundingClientRect();
        return {
          inWindow: !(browserBBox.left > innerWidth || browserBBox.right < 0 || browserBBox.top > innerHeight || browserBBox.bottom < 0),
          page
        };
      });
      const renderPage = async (i) => {
        await animationFrame();
        if (ctx.isCancelRequested()) {
          return void 0;
        }
        const page = pages[i].page;
        const browserBBox = page.getBoundingClientRect();
        const v = this.getDomViewport(window, browserBBox);
        const needCalc = (stage) => this.docKernel.need_repaint(i, v.x, v.y, v.width, v.height, stage);
        const repaint = (stage) => this.docKernel.repaint(i, v.x, v.y, v.width, v.height, stage);
        const calc = (stage) => {
          if (ctx.isCancelRequested()) {
            return void 0;
          }
          return condOrExit(needCalc(stage), () => repaint(stage));
        };
        await calc(RepaintStage.Layout);
        const wScale = (browserBBox.width ? Number.parseFloat(page.getAttribute("data-width")) / browserBBox.width : 1) * this.domScale;
        const hScale = (browserBBox.height ? Number.parseFloat(page.getAttribute("data-height")) / browserBBox.height : 1) * this.domScale;
        v.x *= wScale;
        v.y *= hScale;
        v.y -= 100;
        v.width *= wScale;
        v.height *= hScale;
        v.height += 200;
        await calc(RepaintStage.Svg);
        await calc(RepaintStage.Semantics);
        if (ctx.isCancelRequested()) {
          return void 0;
        }
        if (needCalc(RepaintStage.PrepareCanvas)) {
          const calcCanvasAfterPreparing = async () => {
            await repaint(RepaintStage.PrepareCanvas);
            if (ctx.isCancelRequested()) {
              return void 0;
            }
            return calc(RepaintStage.Canvas);
          };
          calcCanvasAfterPreparing();
        } else {
          await calc(RepaintStage.Canvas);
        }
      };
      const renderPages = async (inWindow) => {
        for (let idx = 0; idx < pages.length; ++idx) {
          if (ctx.isCancelRequested()) {
            return;
          }
          if (pages[idx].inWindow === inWindow) {
            await renderPage(idx);
          }
        }
      };
      this.cancelAnyway$dom();
      await renderPages(true);
      await renderPages(false);
      if (ctx.isCancelRequested()) {
        return;
      }
    }
  };
}
var animationFrame, TrackMode, RepaintStage, TypstDomDocument;
var init_dom = __esm({
  "node_modules/@myriaddreamin/typst.ts/dist/esm/dom.mjs"() {
    init_internal_types();
    init_typst_doc();
    init_typst_cancel();
    animationFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));
    (function(TrackMode2) {
      TrackMode2[TrackMode2["Doc"] = 0] = "Doc";
      TrackMode2[TrackMode2["Pages"] = 1] = "Pages";
    })(TrackMode || (TrackMode = {}));
    (function(RepaintStage2) {
      RepaintStage2[RepaintStage2["Layout"] = 0] = "Layout";
      RepaintStage2[RepaintStage2["Svg"] = 1] = "Svg";
      RepaintStage2[RepaintStage2["Semantics"] = 2] = "Semantics";
      RepaintStage2[RepaintStage2["PrepareCanvas"] = 3] = "PrepareCanvas";
      RepaintStage2[RepaintStage2["Canvas"] = 4] = "Canvas";
    })(RepaintStage || (RepaintStage = {}));
    TypstDomDocument = class extends provideDoc(composeDoc(TypstDocumentContext, provideDomDoc)) {
    };
  }
});

// node_modules/@myriaddreamin/typst.ts/dist/esm/renderer.mjs
var renderer_exports = {};
__export(renderer_exports, {
  RenderSession: () => RenderSession,
  TypstRendererDriver: () => TypstRendererDriver,
  TypstWorker: () => TypstWorker,
  createTypstRenderer: () => createTypstRenderer,
  rendererBuildInfo: () => rendererBuildInfo
});
function createTypstRenderer() {
  return new TypstRendererDriver();
}
async function rendererBuildInfo() {
  const renderModule = await import("@myriaddreamin/typst-ts-renderer");
  return renderModule.renderer_build_info();
}
var RenderSession, ManageStatus, TypstWorker, gRendererModule, warnOnceCanvasSet, TypstRendererDriver;
var init_renderer = __esm({
  "node_modules/@myriaddreamin/typst.ts/dist/esm/renderer.mjs"() {
    init_internal_types();
    init_view();
    init_wasm();
    init_init();
    init_dom();
    RenderSession = class {
      plugin;
      /**
       * @internal
       */
      [kObject];
      /**
       * @internal
       */
      constructor(plugin, o) {
        this.plugin = plugin;
        this[kObject] = o;
      }
      /**
       * @deprecated set in {@link RenderToCanvasOptions} instead
       *
       * Set the background color of the Typst document.
       * @param {string} t - The background color in format of `^#?[0-9a-f]{6}$`
       *
       * Note: Default to `#ffffff`.
       *
       * Note: Only available in canvas rendering mode.
       */
      set backgroundColor(t) {
        if (t !== void 0) {
          this[kObject].background_color = t;
        }
      }
      /**
       * Get the background color of the Typst document.
       *
       * Note: Default to `#ffffff`.
       *
       * Note: Only available in canvas rendering mode.
       */
      get backgroundColor() {
        return this[kObject].background_color;
      }
      /**
       * Set the pixel per point scale up the canvas panel.
       *
       * Note: Default to `3`.
       *
       * Note: Only available in canvas rendering mode.
       */
      set pixelPerPt(t) {
        if (t !== void 0) {
          this[kObject].pixel_per_pt = t;
        }
      }
      /**
       * @deprecated set in {@link RenderToCanvasOptions} instead
       *
       * Get the pixel per point scale up the canvas panel.
       *
       * Note: Default to `3`.
       *
       * Note: Only available in canvas rendering mode.
       */
      get pixelPerPt() {
        return this[kObject].pixel_per_pt;
      }
      /**
       * Reset state
       */
      reset() {
        this.plugin.resetSession(this);
      }
      /**
       * @deprecated
       * use {@link docWidth} instead
       */
      get doc_width() {
        return this[kObject].doc_width;
      }
      get docWidth() {
        return this[kObject].doc_width;
      }
      /**
       * @deprecated
       * use {@link docHeight} instead
       */
      get doc_height() {
        return this[kObject].doc_height;
      }
      get docHeight() {
        return this[kObject].doc_height;
      }
      retrievePagesInfo() {
        const pages_info = this[kObject].pages_info;
        const pageInfos = [];
        const pageCount = pages_info.page_count;
        for (let i = 0; i < pageCount; i++) {
          const pageAst = pages_info.page(i);
          pageInfos.push({
            pageOffset: pageAst.page_off,
            width: pageAst.width_pt,
            height: pageAst.height_pt
          });
        }
        return pageInfos;
      }
      getSourceLoc(path) {
        return this[kObject].source_span(path);
      }
      /**
       * See {@link TypstRenderer#renderSvg} for more details.
       */
      renderSvg(options) {
        return this.plugin.renderSvg({
          renderSession: this,
          ...options
        });
      }
      /**
       * See {@link TypstRenderer#renderToSvg} for more details.
       */
      renderToSvg(options) {
        return this.plugin.renderToSvg({
          renderSession: this,
          ...options
        });
      }
      /**
       * See {@link TypstRenderer#renderCanvas} for more details.
       */
      renderCanvas(options) {
        return this.plugin.renderCanvas({
          renderSession: this,
          ...options
        });
      }
      /**
       * See {@link TypstRenderer#manipulateData} for more details.
       */
      manipulateData(opts) {
        this.plugin.manipulateData({
          renderSession: this,
          ...opts
        });
      }
      /**
       * See {@link TypstRenderer#renderSvgDiff} for more details.
       */
      renderSvgDiff(opts) {
        return this.plugin.renderSvgDiff({
          renderSession: this,
          ...opts
        });
      }
      /**
       * @deprecated
       * use {@link getSourceLoc} instead
       */
      get_source_loc(path) {
        return this[kObject].source_span(path);
      }
      /**
       * @deprecated
       * use {@link renderSvgDiff} instead
       */
      render_in_window(rect_lo_x, rect_lo_y, rect_hi_x, rect_hi_y) {
        return this[kObject].render_in_window(rect_lo_x, rect_lo_y, rect_hi_x, rect_hi_y);
      }
      /**
       * @deprecated
       * use {@link manipulateData} instead
       */
      merge_delta(data) {
        this.plugin.manipulateData({
          renderSession: this,
          action: "merge",
          data
        });
      }
    };
    (function(ManageStatus2) {
      ManageStatus2[ManageStatus2["Delete"] = 0] = "Delete";
      ManageStatus2[ManageStatus2["New"] = 1] = "New";
      ManageStatus2[ManageStatus2["Update"] = 2] = "Update";
    })(ManageStatus || (ManageStatus = {}));
    TypstWorker = class {
      plugin;
      /**
       * @internal
       */
      [kObject];
      /**
       * @internal
       */
      constructor(plugin, o) {
        this.plugin = plugin;
        this[kObject] = o;
      }
      /**
       * See {@link TypstRenderer#manipulateData} for more details.
       */
      manipulateData(action, data) {
        return this[kObject].manipulate_data(action, data);
      }
      /**
       * @internal
       */
      managedCanvasElemList = /* @__PURE__ */ new Map();
      /**
       * @internal
       */
      canvasCounter = Math.random();
      /**
       * You must submit all canvas in pages to ensure synchronization with the background worker
       *
       * See {@link TypstRenderer#renderCanvas} for more details.
       */
      renderCanvas(canvasElemList) {
        const m = this.managedCanvasElemList;
        for (const [_, elem] of m) {
          elem[0] = ManageStatus.Delete;
        }
        for (const elem of canvasElemList) {
          const canvas = elem.canvas;
          let elemId = canvas.dataset.manageId;
          let action = ManageStatus.Update;
          if (!elemId) {
            elemId = this.canvasCounter.toFixed(5);
            this.canvasCounter += 1;
            canvas.dataset.manageId = elemId;
            action = ManageStatus.New;
          }
          let prev = m.get(elemId);
          if (prev && prev[0] !== ManageStatus.Delete) {
            throw new Error("cannot update a canvas for two times in batch");
          }
          m.set(elemId, [action, { ...elem }]);
        }
        const entries = Array.from(m.entries());
        const actions = new Uint8Array(entries.length);
        const elements = new Array(entries.length);
        const options = entries.map(([key, [action, elem]], index) => {
          if (!action) {
            m.delete(key);
          }
          actions[index] = action;
          elements[index] = elem.canvas;
          return this.plugin.canvasOptionsToRust(elem);
        });
        return this[kObject].render_canvas(actions, elements, options);
      }
      async retrievePagesInfo() {
        const pages_info = await this[kObject].get_pages_info();
        console.log(pages_info);
        const pageInfos = [];
        const pageCount = pages_info.page_count;
        for (let i = 0; i < pageCount; i++) {
          const pageAst = pages_info.page(i);
          pageInfos.push({
            pageOffset: pageAst.page_off,
            width: pageAst.width_pt,
            height: pageAst.height_pt
          });
        }
        return pageInfos;
      }
    };
    gRendererModule = (module) => new LazyWasmModule(async (bin) => {
      return await module.default(bin);
    });
    warnOnceCanvasSet = true;
    TypstRendererDriver = class {
      renderer;
      rendererJs;
      constructor() {
      }
      async init(options) {
        this.rendererJs = await (options?.getWrapper?.() || import("@myriaddreamin/typst-ts-renderer"));
        const TypstRendererBuilder = this.rendererJs.TypstRendererBuilder;
        this.renderer = await buildComponent(options, gRendererModule(this.rendererJs), TypstRendererBuilder, {});
      }
      loadGlyphPack(_pack) {
        return Promise.resolve();
      }
      createOptionsToRust(options) {
        const rustOptions = new this.rendererJs.CreateSessionOptions();
        if (options.format !== void 0) {
          rustOptions.format = options.format;
        }
        if (options.artifactContent !== void 0) {
          rustOptions.artifact_content = options.artifactContent;
        }
        return rustOptions;
      }
      canvasOptionsToRust(options) {
        const rustOptions = new this.rendererJs.RenderPageImageOptions();
        if (options.pageOffset === void 0) {
          throw new Error("pageOffset is required in reflexo v0.5.0");
        } else {
          rustOptions.page_off = options.pageOffset;
        }
        if (options.cacheKey !== void 0) {
          rustOptions.cache_key = options.cacheKey;
        }
        if (options.backgroundColor !== void 0) {
          rustOptions.background_color = options.backgroundColor;
        }
        if (options.pixelPerPt !== void 0) {
          rustOptions.pixel_per_pt = options.pixelPerPt;
        }
        if (options.dataSelection !== void 0) {
          let encoded = 0;
          if (options.dataSelection.body) {
            encoded |= 1 << 0;
          } else if (options.canvas && warnOnceCanvasSet) {
            warnOnceCanvasSet = false;
            console.warn("dataSelection.body is not set but providing canvas for body");
          }
          if (options.dataSelection.text || options.dataSelection.annotation) {
            console.error("dataSelection.text and dataSelection.annotation are deprecated");
          }
          if (options.dataSelection.semantics) {
            encoded |= 1 << 3;
          }
          rustOptions.data_selection = encoded;
        }
        return rustOptions;
      }
      retrievePagesInfoFromSession(session) {
        return session.retrievePagesInfo();
      }
      /**
       * Render a Typst document to canvas.
       */
      renderCanvas(options) {
        return this.withinOptionSession(options, async (sessionRef) => {
          return this.renderer.render_page_to_canvas(sessionRef[kObject], options.canvas || void 0, this.canvasOptionsToRust(options));
        });
      }
      // async renderPdf(artifactContent: string): Promise<Uint8Array> {
      // return this.renderer.render_to_pdf(artifactContent);
      // }
      async inAnimationFrame(fn) {
        return new Promise((resolve, reject) => {
          requestAnimationFrame(() => {
            try {
              resolve(fn());
            } catch (e) {
              reject(e);
            }
          });
        });
      }
      async renderDisplayLayer(session, canvasList, options) {
        const pages_info = session[kObject].pages_info;
        const page_count = pages_info.page_count;
        const doRender = async (i, page_off) => {
          const canvas = canvasList[i];
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            throw new Error("canvas context is null");
          }
          return await this.renderCanvas({
            ...options,
            canvas: ctx,
            renderSession: session,
            pageOffset: page_off
          });
        };
        const t = performance.now();
        const textContentList = await (async () => {
          const results = [];
          for (let i = 0; i < page_count; i++) {
            results.push(await this.inAnimationFrame(() => doRender(i, i)));
          }
          return results;
        })();
        const t2 = performance.now();
        console.log(`display layer used: render = ${(t2 - t).toFixed(1)}ms`);
        return textContentList;
      }
      renderTextLayer(layerList, textSourceList) {
        const t2 = performance.now();
        layerList.forEach((layer, i) => {
          layer.innerHTML = textSourceList[i].htmlSemantics[0];
        });
        const t3 = performance.now();
        console.log(`text layer used: render = ${(t3 - t2).toFixed(1)}ms`);
      }
      async render(options) {
        if ("format" in options) {
          if (options.format !== "vector") {
            const artifactFormats = ["serde_json", "js", "ir"];
            if (artifactFormats.includes(options.format)) {
              throw new Error(`deprecated format ${options.format}, please use vector format`);
            }
          }
        }
        return this.renderToCanvas(options);
      }
      async renderDom(options) {
        if ("format" in options) {
          if (options.format !== "vector") {
            const artifactFormats = ["serde_json", "js", "ir"];
            if (artifactFormats.includes(options.format)) {
              throw new Error(`deprecated format ${options.format}, please use vector format`);
            }
          }
        }
        return this.withinOptionSession(options, async (sessionRef) => {
          const t = new TypstDomDocument({
            ...options,
            renderMode: "dom",
            hookedElem: options.container,
            kModule: sessionRef,
            renderer: this
          });
          t;
          await t.impl.mountDom(options.pixelPerPt);
          return t;
        });
      }
      async renderToCanvas(options) {
        let session;
        let renderPageResults;
        const mountContainer = options.container;
        mountContainer.style.visibility = "hidden";
        const doRenderDisplayLayer = async (canvasList, resetLayout) => {
          try {
            renderPageResults = await this.renderDisplayLayer(session, canvasList, options);
            resetLayout();
          } finally {
            mountContainer.style.visibility = "visible";
          }
        };
        return this.withinOptionSession(options, async (sessionRef) => {
          session = sessionRef;
          if (session[kObject].pages_info.page_count === 0) {
            throw new Error(`No page found in session`);
          }
          if (options.pixelPerPt !== void 0 && options.pixelPerPt <= 0) {
            throw new Error("Invalid typst.RenderOptions.pixelPerPt, should be a positive number " + options.pixelPerPt);
          }
          let backgroundColor = options.backgroundColor;
          if (backgroundColor !== void 0) {
            if (!/^#[0-9a-f]{6}$/.test(backgroundColor)) {
              throw new Error("Invalid typst.backgroundColor color for matching ^#?[0-9a-f]{6}$ " + backgroundColor);
            }
          }
          session.pixelPerPt = options.pixelPerPt ?? TypstDefaultParams.PIXEL_PER_PT;
          session.backgroundColor = backgroundColor ?? "#ffffff";
          const t = performance.now();
          const pageView = new RenderView(this.retrievePagesInfoFromSession(session), mountContainer, options);
          const t2 = performance.now();
          console.log(`layer used: retrieve = ${(t2 - t).toFixed(1)}ms`);
          await doRenderDisplayLayer(pageView.canvasList, () => pageView.resetLayout());
          this.renderTextLayer(pageView.textLayerList, renderPageResults);
          return;
        });
      }
      createModule(b) {
        return Promise.resolve(new RenderSession(this, this.renderer.create_session(b && this.createOptionsToRust({
          format: "vector",
          artifactContent: b
        }))));
      }
      async createWorkerV0(worker) {
        return new TypstWorker(this, await this.renderer.create_worker(worker));
      }
      workerBridge() {
        return this.renderer.create_worker_bridge();
      }
      renderSvg(options, container) {
        if (options instanceof RenderSession || container) {
          throw new Error("removed api, please use renderToSvg({ renderSession, container }) instead");
        }
        return this.withinOptionSession(options, async (sessionRef) => {
          let parts = void 0;
          if (options.data_selection) {
            parts = 0;
            if (options.data_selection.body) {
              parts |= 1 << 0;
            }
            if (options.data_selection.defs) {
              parts |= 1 << 1;
            }
            if (options.data_selection.css) {
              parts |= 1 << 2;
            }
            if (options.data_selection.js) {
              parts |= 1 << 3;
            }
          }
          return Promise.resolve(this.renderer.svg_data(sessionRef[kObject], parts));
        });
      }
      renderSvgDiff(options) {
        if (!options.window) {
          return this.renderer.render_svg_diff(options.renderSession[kObject], 0, 0, 1e33, 1e33);
        }
        return this.renderer.render_svg_diff(options.renderSession[kObject], options.window.lo.x, options.window.lo.y, options.window.hi.x, options.window.hi.y);
      }
      renderToSvg(options) {
        return this.withinOptionSession(options, async (sessionRef) => {
          return Promise.resolve(this.renderer.render_svg(sessionRef[kObject], options.container));
        });
      }
      getCustomV1(options) {
        return Promise.resolve(this.renderer.get_customs(options.renderSession[kObject]));
      }
      resetSession(session) {
        return this.renderer.reset(session[kObject]);
      }
      manipulateData(opts) {
        return this.renderer.manipulate_data(opts.renderSession[kObject], opts.action ?? "reset", opts.data);
      }
      withinOptionSession(options, fn) {
        function isRenderByContentOption(options2) {
          return "artifactContent" in options2;
        }
        if ("renderSession" in options) {
          return fn(options.renderSession);
        }
        if (isRenderByContentOption(options)) {
          return this.runWithSession(options, fn);
        }
        throw new Error("Invalid render options, should be one of RenderByContentOptions|RenderBySessionOptions");
      }
      async runWithSession(arg1, arg2) {
        let options = arg1;
        let fn = arg2;
        if (!arg2) {
          options = void 0;
          fn = arg1;
        }
        const session = this.renderer.create_session(
          /* moved */
          options && this.createOptionsToRust(options)
        );
        try {
          const res = await fn(new RenderSession(this, session));
          session.free();
          return res;
        } catch (e) {
          session.free();
          throw e;
        }
      }
    };
  }
});

// node_modules/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler.mjs
function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
}
function debugString(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug2 = "[";
    if (length > 0) {
      debug2 += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug2 += ", " + debugString(val[i]);
    }
    debug2 += "]";
    return debug2;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
function dropObject(idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function getArrayJsValueFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  const mem = getDataViewMemory0();
  const result = [];
  for (let i = ptr; i < ptr + 4 * len; i += 4) {
    result.push(takeObject(mem.getUint32(i, true)));
  }
  return result;
}
function getArrayU32FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return decodeText(ptr, len);
}
function getUint32ArrayMemory0() {
  if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
    cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachedUint32ArrayMemory0;
}
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
function getObject(idx) {
  return heap[idx];
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_export3(addHeapObject(e));
  }
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      state.a = a;
      real._wbg_cb_unref();
    }
  };
  real._wbg_cb_unref = () => {
    if (--state.cnt === 0) {
      state.dtor(state.a, state.b);
      state.a = 0;
      CLOSURE_DTORS.unregister(state);
    }
  };
  CLOSURE_DTORS.register(real, state, state);
  return real;
}
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8ArrayMemory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function passArrayJsValueToWasm0(array, malloc) {
  const ptr = malloc(array.length * 4, 4) >>> 0;
  const mem = getDataViewMemory0();
  for (let i = 0; i < array.length; i++) {
    mem.setUint32(ptr + 4 * i, addHeapObject(array[i]), true);
  }
  WASM_VECTOR_LEN = array.length;
  return ptr;
}
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = cachedTextEncoder.encodeInto(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
function decodeText(ptr, len) {
  numBytesDecoded += len;
  if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
    cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    cachedTextDecoder.decode();
    numBytesDecoded = len;
  }
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
function __wasm_bindgen_func_elem_944(arg0, arg1, arg2) {
  wasm.__wasm_bindgen_func_elem_944(arg0, arg1, addHeapObject(arg2));
}
function __wasm_bindgen_func_elem_37350(arg0, arg1, arg2, arg3) {
  wasm.__wasm_bindgen_func_elem_37350(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}
function get_font_info(buffer) {
  const ret = wasm.get_font_info(addHeapObject(buffer));
  return takeObject(ret);
}
async function __wbg_load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        const validResponse = module.ok && EXPECTED_RESPONSE_TYPES.has(module.type);
        if (validResponse && module.headers.get("Content-Type") !== "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}
function __wbg_get_imports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbg_Error_52673b7de5a0ca89 = function(arg0, arg1) {
    const ret = Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_Number_2d1dcfcf4ec51736 = function(arg0) {
    const ret = Number(getObject(arg0));
    return ret;
  };
  imports.wbg.__wbg___wbindgen_bigint_get_as_i64_6e32f5e6aff02e1d = function(arg0, arg1) {
    const v = getObject(arg1);
    const ret = typeof v === "bigint" ? v : void 0;
    getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
  };
  imports.wbg.__wbg___wbindgen_boolean_get_dea25b33882b895b = function(arg0) {
    const v = getObject(arg0);
    const ret = typeof v === "boolean" ? v : void 0;
    return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
  };
  imports.wbg.__wbg___wbindgen_debug_string_adfb662ae34724b6 = function(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg___wbindgen_in_0d3e1e8f0c669317 = function(arg0, arg1) {
    const ret = getObject(arg0) in getObject(arg1);
    return ret;
  };
  imports.wbg.__wbg___wbindgen_is_bigint_0e1a2e3f55cfae27 = function(arg0) {
    const ret = typeof getObject(arg0) === "bigint";
    return ret;
  };
  imports.wbg.__wbg___wbindgen_is_function_8d400b8b1af978cd = function(arg0) {
    const ret = typeof getObject(arg0) === "function";
    return ret;
  };
  imports.wbg.__wbg___wbindgen_is_object_ce774f3490692386 = function(arg0) {
    const val = getObject(arg0);
    const ret = typeof val === "object" && val !== null;
    return ret;
  };
  imports.wbg.__wbg___wbindgen_is_string_704ef9c8fc131030 = function(arg0) {
    const ret = typeof getObject(arg0) === "string";
    return ret;
  };
  imports.wbg.__wbg___wbindgen_is_undefined_f6b95eab589e0269 = function(arg0) {
    const ret = getObject(arg0) === void 0;
    return ret;
  };
  imports.wbg.__wbg___wbindgen_jsval_eq_b6101cc9cef1fe36 = function(arg0, arg1) {
    const ret = getObject(arg0) === getObject(arg1);
    return ret;
  };
  imports.wbg.__wbg___wbindgen_jsval_loose_eq_766057600fdd1b0d = function(arg0, arg1) {
    const ret = getObject(arg0) == getObject(arg1);
    return ret;
  };
  imports.wbg.__wbg___wbindgen_number_get_9619185a74197f95 = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === "number" ? obj : void 0;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
  };
  imports.wbg.__wbg___wbindgen_string_get_a2a31e16edf96e42 = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === "string" ? obj : void 0;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg___wbindgen_throw_dd24417ed36fc46e = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbg__wbg_cb_unref_87dfb5aaa0cbcea7 = function(arg0) {
    getObject(arg0)._wbg_cb_unref();
  };
  imports.wbg.__wbg_call_3020136f7a2d6e44 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_call_78f94eb02ec7f9b2 = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4) {
      const ret = getObject(arg0).call(getObject(arg1), getObject(arg2), getObject(arg3), getObject(arg4));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_call_abb4ff46ce38be40 = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).call(getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_done_62ea16af4ce34b24 = function(arg0) {
    const ret = getObject(arg0).done;
    return ret;
  };
  imports.wbg.__wbg_entries_83c79938054e065f = function(arg0) {
    const ret = Object.entries(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
      deferred0_0 = arg0;
      deferred0_1 = arg1;
      console.error(getStringFromWasm0(arg0, arg1));
    } finally {
      wasm.__wbindgen_export4(deferred0_0, deferred0_1, 1);
    }
  };
  imports.wbg.__wbg_error_85faeb8919b11cc6 = function(arg0, arg1, arg2) {
    console.error(getObject(arg0), getObject(arg1), getObject(arg2));
  };
  imports.wbg.__wbg_getTimezoneOffset_45389e26d6f46823 = function(arg0) {
    const ret = getObject(arg0).getTimezoneOffset();
    return ret;
  };
  imports.wbg.__wbg_get_6b7bd52aca3f9671 = function(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_get_af9dab7e9603ea93 = function() {
    return handleError(function(arg0, arg1) {
      const ret = Reflect.get(getObject(arg0), getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_get_with_ref_key_1dc361bd10053bfe = function(arg0, arg1) {
    const ret = getObject(arg0)[getObject(arg1)];
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_info_ce6bcc489c22f6f0 = function(arg0) {
    console.info(getObject(arg0));
  };
  imports.wbg.__wbg_instanceof_ArrayBuffer_f3320d2419cd0355 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof ArrayBuffer;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Map_084be8da74364158 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Map;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Uint8Array_da54ccc9d3e09434 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Uint8Array;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_isArray_51fd9e6422c0a395 = function(arg0) {
    const ret = Array.isArray(getObject(arg0));
    return ret;
  };
  imports.wbg.__wbg_isSafeInteger_ae7d3f054d55fa16 = function(arg0) {
    const ret = Number.isSafeInteger(getObject(arg0));
    return ret;
  };
  imports.wbg.__wbg_iterator_27b7c8b35ab3e86b = function() {
    const ret = Symbol.iterator;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_length_22ac23eaec9d8053 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_length_d45040a40c570362 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_new_1ba21ce319a06297 = function() {
    const ret = new Object();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_25f239778d6112b9 = function() {
    const ret = new Array();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_6421f6084cc5bc5a = function(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
    const ret = new Error();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_b2db8aa2650f793a = function(arg0) {
    const ret = new Date(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_df1173567d5ff028 = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_ff12d2b041fb48f1 = function(arg0, arg1) {
    try {
      var state0 = { a: arg0, b: arg1 };
      var cb0 = (arg02, arg12) => {
        const a = state0.a;
        state0.a = 0;
        try {
          return __wasm_bindgen_func_elem_37350(a, state0.b, arg02, arg12);
        } finally {
          state0.a = a;
        }
      };
      const ret = new Promise(cb0);
      return addHeapObject(ret);
    } finally {
      state0.a = state0.b = 0;
    }
  };
  imports.wbg.__wbg_new_from_slice_db0691b69e9d3891 = function(arg0, arg1) {
    const ret = new Uint32Array(getArrayU32FromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_from_slice_f9c22b9153b26992 = function(arg0, arg1) {
    const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_no_args_cb138f77cf6151ee = function(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_with_args_df9e7125ffe55248 = function(arg0, arg1, arg2, arg3) {
    const ret = new Function(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_next_138a17bbf04e926c = function(arg0) {
    const ret = getObject(arg0).next;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_next_3cfe5c0fe2a4cc53 = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).next();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_now_69d776cd24f5215b = function() {
    const ret = Date.now();
    return ret;
  };
  imports.wbg.__wbg_prototypesetcall_dfe9b766cdc1f1fd = function(arg0, arg1, arg2) {
    Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), getObject(arg2));
  };
  imports.wbg.__wbg_proxycontext_new = function(arg0) {
    const ret = ProxyContext.__wrap(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_push_7d9be8f38fc13975 = function(arg0, arg1) {
    const ret = getObject(arg0).push(getObject(arg1));
    return ret;
  };
  imports.wbg.__wbg_queueMicrotask_9b549dfce8865860 = function(arg0) {
    const ret = getObject(arg0).queueMicrotask;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_queueMicrotask_fca69f5bfad613a5 = function(arg0) {
    queueMicrotask(getObject(arg0));
  };
  imports.wbg.__wbg_resolve_fd5bfbaa4ce36e1e = function(arg0) {
    const ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_set_3f1d0b984ed272ed = function(arg0, arg1, arg2) {
    getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
  };
  imports.wbg.__wbg_set_781438a03c0c3c81 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_set_7df433eea03a5c14 = function(arg0, arg1, arg2) {
    getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
  };
  imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_static_accessor_GLOBAL_769e6b65d6557335 = function() {
    const ret = typeof global === "undefined" ? null : global;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_static_accessor_GLOBAL_THIS_60cf02db4de8e1c1 = function() {
    const ret = typeof globalThis === "undefined" ? null : globalThis;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_static_accessor_SELF_08f5a74c69739274 = function() {
    const ret = typeof self === "undefined" ? null : self;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_static_accessor_WINDOW_a8924b26aa92d024 = function() {
    const ret = typeof window === "undefined" ? null : window;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_then_4f95312d68691235 = function(arg0, arg1) {
    const ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_typstcompiler_new = function(arg0) {
    const ret = TypstCompiler.__wrap(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_typstfontresolver_new = function(arg0) {
    const ret = TypstFontResolver.__wrap(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_value_57b7b035e117f7ee = function(arg0) {
    const ret = getObject(arg0).value;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_cast_2241b6af4c4b2941 = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_cast_3334ea73b4b28ba3 = function(arg0, arg1) {
    const ret = makeMutClosure(arg0, arg1, wasm.__wasm_bindgen_func_elem_957, __wasm_bindgen_func_elem_944);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_cast_4625c577ab2ec9ee = function(arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_cast_9ae0607507abb057 = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_cast_d6cd19b81560fd6e = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
  };
  return imports;
}
function __wbg_finalize_init(instance, module) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module;
  cachedDataViewMemory0 = null;
  cachedUint32ArrayMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  return wasm;
}
function initSync(module) {
  if (wasm !== void 0) return wasm;
  if (typeof module !== "undefined") {
    if (Object.getPrototypeOf(module) === Object.prototype) {
      ({ module } = module);
    } else {
      console.warn("using deprecated parameters for `initSync()`; pass a single object instead");
    }
  }
  const imports = __wbg_get_imports();
  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module);
  }
  const instance = new WebAssembly.Instance(module, imports);
  return __wbg_finalize_init(instance, module);
}
async function __wbg_init(module_or_path) {
  if (wasm !== void 0) return wasm;
  if (typeof module_or_path !== "undefined") {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path } = module_or_path);
    } else {
      console.warn("using deprecated parameters for the initialization function; pass a single object instead");
    }
  }
  if (typeof module_or_path === "undefined") {
    module_or_path = importWasmModule("typst_ts_web_compiler_bg.wasm", import.meta.url);
  }
  const imports = __wbg_get_imports();
  if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
    module_or_path = fetch(module_or_path);
  }
  const { instance, module } = await __wbg_load(await module_or_path, imports);
  return __wbg_finalize_init(instance, module);
}
function setImportWasmModule(importer) {
  importWasmModule = importer;
}
var wasm, CLOSURE_DTORS, cachedDataViewMemory0, cachedUint32ArrayMemory0, cachedUint8ArrayMemory0, heap, heap_next, cachedTextDecoder, MAX_SAFARI_DECODE_BYTES, numBytesDecoded, cachedTextEncoder, WASM_VECTOR_LEN, IncrServerFinalization, ProxyContextFinalization, TypstCompileWorldFinalization, TypstCompilerFinalization, TypstCompilerBuilderFinalization, TypstFontResolverFinalization, TypstFontResolverBuilderFinalization, IncrServer, ProxyContext, TypstCompileWorld, TypstCompiler, TypstCompilerBuilder, TypstFontResolver, TypstFontResolverBuilder, EXPECTED_RESPONSE_TYPES, typst_ts_web_compiler_default, importWasmModule;
var init_typst_ts_web_compiler = __esm({
  "node_modules/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler.mjs"() {
    CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((state) => state.dtor(state.a, state.b));
    cachedDataViewMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    heap = new Array(128).fill(void 0);
    heap.push(void 0, null, true, false);
    heap_next = heap.length;
    cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    cachedTextDecoder.decode();
    MAX_SAFARI_DECODE_BYTES = 2146435072;
    numBytesDecoded = 0;
    cachedTextEncoder = new TextEncoder();
    if (!("encodeInto" in cachedTextEncoder)) {
      cachedTextEncoder.encodeInto = function(arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
          read: arg.length,
          written: buf.length
        };
      };
    }
    WASM_VECTOR_LEN = 0;
    IncrServerFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((ptr) => wasm.__wbg_incrserver_free(ptr >>> 0, 1));
    ProxyContextFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((ptr) => wasm.__wbg_proxycontext_free(ptr >>> 0, 1));
    TypstCompileWorldFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((ptr) => wasm.__wbg_typstcompileworld_free(ptr >>> 0, 1));
    TypstCompilerFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((ptr) => wasm.__wbg_typstcompiler_free(ptr >>> 0, 1));
    TypstCompilerBuilderFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((ptr) => wasm.__wbg_typstcompilerbuilder_free(ptr >>> 0, 1));
    TypstFontResolverFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((ptr) => wasm.__wbg_typstfontresolver_free(ptr >>> 0, 1));
    TypstFontResolverBuilderFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((ptr) => wasm.__wbg_typstfontresolverbuilder_free(ptr >>> 0, 1));
    IncrServer = class _IncrServer {
      static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(_IncrServer.prototype);
        obj.__wbg_ptr = ptr;
        IncrServerFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
      }
      __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IncrServerFinalization.unregister(this);
        return ptr;
      }
      free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_incrserver_free(ptr, 0);
      }
      /**
       * @param {boolean} attach
       */
      set_attach_debug_info(attach) {
        wasm.incrserver_set_attach_debug_info(this.__wbg_ptr, attach);
      }
      /**
       * @returns {Uint8Array | undefined}
       */
      current() {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.incrserver_current(retptr, this.__wbg_ptr);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          let v1;
          if (r0 !== 0) {
            v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export4(r0, r1 * 1, 1);
          }
          return v1;
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      reset() {
        wasm.incrserver_reset(this.__wbg_ptr);
      }
    };
    if (Symbol.dispose) IncrServer.prototype[Symbol.dispose] = IncrServer.prototype.free;
    ProxyContext = class _ProxyContext {
      static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(_ProxyContext.prototype);
        obj.__wbg_ptr = ptr;
        ProxyContextFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
      }
      __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ProxyContextFinalization.unregister(this);
        return ptr;
      }
      free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_proxycontext_free(ptr, 0);
      }
      /**
       * Creates a new `ProxyContext` instance.
       * @param {any} context
       */
      constructor(context) {
        const ret = wasm.proxycontext_new(addHeapObject(context));
        this.__wbg_ptr = ret >>> 0;
        ProxyContextFinalization.register(this, this.__wbg_ptr, this);
        return this;
      }
      /**
       * Returns the JavaScript this.
       * @returns {any}
       */
      get context() {
        const ret = wasm.proxycontext_context(this.__wbg_ptr);
        return takeObject(ret);
      }
      /**
       * A convenience function to untar a tarball and call a callback for each
       * entry.
       * @param {Uint8Array} data
       * @param {Function} cb
       */
      untar(data, cb) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_export);
          const len0 = WASM_VECTOR_LEN;
          wasm.proxycontext_untar(retptr, this.__wbg_ptr, ptr0, len0, addHeapObject(cb));
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          if (r1) {
            throw takeObject(r0);
          }
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
    };
    if (Symbol.dispose) ProxyContext.prototype[Symbol.dispose] = ProxyContext.prototype.free;
    TypstCompileWorld = class _TypstCompileWorld {
      static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(_TypstCompileWorld.prototype);
        obj.__wbg_ptr = ptr;
        TypstCompileWorldFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
      }
      __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TypstCompileWorldFinalization.unregister(this);
        return ptr;
      }
      free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_typstcompileworld_free(ptr, 0);
      }
      /**
       * @param {number} kind
       * @param {number} diagnostics_format
       * @returns {any}
       */
      compile(kind, diagnostics_format) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.typstcompileworld_compile(retptr, this.__wbg_ptr, kind, diagnostics_format);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          if (r2) {
            throw takeObject(r1);
          }
          return takeObject(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {number} kind
       * @returns {string | undefined}
       */
      title(kind) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.typstcompileworld_title(retptr, this.__wbg_ptr, kind);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
          if (r3) {
            throw takeObject(r2);
          }
          let v1;
          if (r0 !== 0) {
            v1 = getStringFromWasm0(r0, r1).slice();
            wasm.__wbindgen_export4(r0, r1 * 1, 1);
          }
          return v1;
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {number} fmt
       * @param {number} diagnostics_format
       * @returns {any}
       */
      get_artifact(fmt, diagnostics_format) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.typstcompileworld_get_artifact(retptr, this.__wbg_ptr, fmt, diagnostics_format);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          if (r2) {
            throw takeObject(r1);
          }
          return takeObject(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {number} kind
       * @param {string} selector
       * @param {string | null} [field]
       * @returns {string}
       */
      query(kind, selector, field) {
        let deferred4_0;
        let deferred4_1;
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          const ptr0 = passStringToWasm0(selector, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          const len0 = WASM_VECTOR_LEN;
          var ptr1 = isLikeNone(field) ? 0 : passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          var len1 = WASM_VECTOR_LEN;
          wasm.typstcompileworld_query(retptr, this.__wbg_ptr, kind, ptr0, len0, ptr1, len1);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
          var ptr3 = r0;
          var len3 = r1;
          if (r3) {
            ptr3 = 0;
            len3 = 0;
            throw takeObject(r2);
          }
          deferred4_0 = ptr3;
          deferred4_1 = len3;
          return getStringFromWasm0(ptr3, len3);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
          wasm.__wbindgen_export4(deferred4_0, deferred4_1, 1);
        }
      }
      /**
       * @param {IncrServer} state
       * @param {number} diagnostics_format
       * @returns {any}
       */
      incr_compile(state, diagnostics_format) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          _assertClass(state, IncrServer);
          wasm.typstcompileworld_incr_compile(retptr, this.__wbg_ptr, state.__wbg_ptr, diagnostics_format);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          if (r2) {
            throw takeObject(r1);
          }
          return takeObject(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
    };
    if (Symbol.dispose) TypstCompileWorld.prototype[Symbol.dispose] = TypstCompileWorld.prototype.free;
    TypstCompiler = class _TypstCompiler {
      static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(_TypstCompiler.prototype);
        obj.__wbg_ptr = ptr;
        TypstCompilerFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
      }
      __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TypstCompilerFinalization.unregister(this);
        return ptr;
      }
      free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_typstcompiler_free(ptr, 0);
      }
      reset() {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.typstcompiler_reset(retptr, this.__wbg_ptr);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          if (r1) {
            throw takeObject(r0);
          }
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {TypstFontResolver} fonts
       */
      set_fonts(fonts) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          _assertClass(fonts, TypstFontResolver);
          wasm.typstcompiler_set_fonts(retptr, this.__wbg_ptr, fonts.__wbg_ptr);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          if (r1) {
            throw takeObject(r0);
          }
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {any} inputs
       */
      set_inputs(inputs) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.typstcompiler_set_inputs(retptr, this.__wbg_ptr, addHeapObject(inputs));
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          if (r1) {
            throw takeObject(r0);
          }
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {string} path
       * @param {string} content
       * @returns {boolean}
       */
      add_source(path, content) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(content, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.typstcompiler_add_source(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret !== 0;
      }
      /**
       * @param {string} path
       * @param {Uint8Array} content
       * @returns {boolean}
       */
      map_shadow(path, content) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(content, wasm.__wbindgen_export);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.typstcompiler_map_shadow(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret !== 0;
      }
      /**
       * @param {string} path
       * @returns {boolean}
       */
      unmap_shadow(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.typstcompiler_unmap_shadow(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
      }
      reset_shadow() {
        wasm.typstcompiler_reset_shadow(this.__wbg_ptr);
      }
      /**
       * @returns {string[]}
       */
      get_loaded_fonts() {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.typstcompiler_get_loaded_fonts(retptr, this.__wbg_ptr);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
          wasm.__wbindgen_export4(r0, r1 * 4, 4);
          return v1;
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {string} main_file_path
       * @returns {string}
       */
      get_ast(main_file_path) {
        let deferred3_0;
        let deferred3_1;
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          const ptr0 = passStringToWasm0(main_file_path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          const len0 = WASM_VECTOR_LEN;
          wasm.typstcompiler_get_ast(retptr, this.__wbg_ptr, ptr0, len0);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
          var ptr2 = r0;
          var len2 = r1;
          if (r3) {
            ptr2 = 0;
            len2 = 0;
            throw takeObject(r2);
          }
          deferred3_0 = ptr2;
          deferred3_1 = len2;
          return getStringFromWasm0(ptr2, len2);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
          wasm.__wbindgen_export4(deferred3_0, deferred3_1, 1);
        }
      }
      /**
       * @returns {any}
       */
      get_semantic_token_legend() {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.typstcompiler_get_semantic_token_legend(retptr, this.__wbg_ptr);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          if (r2) {
            throw takeObject(r1);
          }
          return takeObject(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {string} offset_encoding
       * @param {string | null} [file_path]
       * @param {string | null} [result_id]
       * @returns {object}
       */
      get_semantic_tokens(offset_encoding, file_path, result_id) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          const ptr0 = passStringToWasm0(offset_encoding, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          const len0 = WASM_VECTOR_LEN;
          var ptr1 = isLikeNone(file_path) ? 0 : passStringToWasm0(file_path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          var len1 = WASM_VECTOR_LEN;
          var ptr2 = isLikeNone(result_id) ? 0 : passStringToWasm0(result_id, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          var len2 = WASM_VECTOR_LEN;
          wasm.typstcompiler_get_semantic_tokens(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          if (r2) {
            throw takeObject(r1);
          }
          return takeObject(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {string | null} [root]
       * @param {string | null} [main_file_path]
       * @param {(Array<any>)[] | null} [inputs]
       * @returns {TypstCompileWorld}
       */
      snapshot(root, main_file_path, inputs) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          var ptr0 = isLikeNone(root) ? 0 : passStringToWasm0(root, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          var len0 = WASM_VECTOR_LEN;
          var ptr1 = isLikeNone(main_file_path) ? 0 : passStringToWasm0(main_file_path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          var len1 = WASM_VECTOR_LEN;
          var ptr2 = isLikeNone(inputs) ? 0 : passArrayJsValueToWasm0(inputs, wasm.__wbindgen_export);
          var len2 = WASM_VECTOR_LEN;
          wasm.typstcompiler_snapshot(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          if (r2) {
            throw takeObject(r1);
          }
          return TypstCompileWorld.__wrap(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {string} fmt
       * @param {number} diagnostics_format
       * @returns {any}
       */
      get_artifact(fmt, diagnostics_format) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          const ptr0 = passStringToWasm0(fmt, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          const len0 = WASM_VECTOR_LEN;
          wasm.typstcompiler_get_artifact(retptr, this.__wbg_ptr, ptr0, len0, diagnostics_format);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          if (r2) {
            throw takeObject(r1);
          }
          return takeObject(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {string | null | undefined} main_file_path
       * @param {(Array<any>)[] | null | undefined} inputs
       * @param {string} fmt
       * @param {number} diagnostics_format
       * @returns {any}
       */
      compile(main_file_path, inputs, fmt, diagnostics_format) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          var ptr0 = isLikeNone(main_file_path) ? 0 : passStringToWasm0(main_file_path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          var len0 = WASM_VECTOR_LEN;
          var ptr1 = isLikeNone(inputs) ? 0 : passArrayJsValueToWasm0(inputs, wasm.__wbindgen_export);
          var len1 = WASM_VECTOR_LEN;
          const ptr2 = passStringToWasm0(fmt, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          const len2 = WASM_VECTOR_LEN;
          wasm.typstcompiler_compile(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, diagnostics_format);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          if (r2) {
            throw takeObject(r1);
          }
          return takeObject(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {string} main_file_path
       * @param {(Array<any>)[] | null | undefined} inputs
       * @param {string} selector
       * @param {string | null} [field]
       * @returns {string}
       */
      query(main_file_path, inputs, selector, field) {
        let deferred6_0;
        let deferred6_1;
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          const ptr0 = passStringToWasm0(main_file_path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          const len0 = WASM_VECTOR_LEN;
          var ptr1 = isLikeNone(inputs) ? 0 : passArrayJsValueToWasm0(inputs, wasm.__wbindgen_export);
          var len1 = WASM_VECTOR_LEN;
          const ptr2 = passStringToWasm0(selector, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          const len2 = WASM_VECTOR_LEN;
          var ptr3 = isLikeNone(field) ? 0 : passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          var len3 = WASM_VECTOR_LEN;
          wasm.typstcompiler_query(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
          var ptr5 = r0;
          var len5 = r1;
          if (r3) {
            ptr5 = 0;
            len5 = 0;
            throw takeObject(r2);
          }
          deferred6_0 = ptr5;
          deferred6_1 = len5;
          return getStringFromWasm0(ptr5, len5);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
          wasm.__wbindgen_export4(deferred6_0, deferred6_1, 1);
        }
      }
      /**
       * @returns {IncrServer}
       */
      create_incr_server() {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.typstcompiler_create_incr_server(retptr, this.__wbg_ptr);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          if (r2) {
            throw takeObject(r1);
          }
          return IncrServer.__wrap(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {string} main_file_path
       * @param {(Array<any>)[] | null | undefined} inputs
       * @param {IncrServer} state
       * @param {number} diagnostics_format
       * @returns {any}
       */
      incr_compile(main_file_path, inputs, state, diagnostics_format) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          const ptr0 = passStringToWasm0(main_file_path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
          const len0 = WASM_VECTOR_LEN;
          var ptr1 = isLikeNone(inputs) ? 0 : passArrayJsValueToWasm0(inputs, wasm.__wbindgen_export);
          var len1 = WASM_VECTOR_LEN;
          _assertClass(state, IncrServer);
          wasm.typstcompiler_incr_compile(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, state.__wbg_ptr, diagnostics_format);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          if (r2) {
            throw takeObject(r1);
          }
          return takeObject(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
    };
    if (Symbol.dispose) TypstCompiler.prototype[Symbol.dispose] = TypstCompiler.prototype.free;
    TypstCompilerBuilder = class {
      __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TypstCompilerBuilderFinalization.unregister(this);
        return ptr;
      }
      free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_typstcompilerbuilder_free(ptr, 0);
      }
      constructor() {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.typstcompilerbuilder_new(retptr);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          if (r2) {
            throw takeObject(r1);
          }
          this.__wbg_ptr = r0 >>> 0;
          TypstCompilerBuilderFinalization.register(this, this.__wbg_ptr, this);
          return this;
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      set_dummy_access_model() {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.typstcompilerbuilder_set_dummy_access_model(retptr, this.__wbg_ptr);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          if (r1) {
            throw takeObject(r0);
          }
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {any} context
       * @param {Function} mtime_fn
       * @param {Function} is_file_fn
       * @param {Function} real_path_fn
       * @param {Function} read_all_fn
       * @returns {Promise<void>}
       */
      set_access_model(context, mtime_fn, is_file_fn, real_path_fn, read_all_fn) {
        const ret = wasm.typstcompilerbuilder_set_access_model(this.__wbg_ptr, addHeapObject(context), addHeapObject(mtime_fn), addHeapObject(is_file_fn), addHeapObject(real_path_fn), addHeapObject(read_all_fn));
        return takeObject(ret);
      }
      /**
       * @param {any} context
       * @param {Function} real_resolve_fn
       * @returns {Promise<void>}
       */
      set_package_registry(context, real_resolve_fn) {
        const ret = wasm.typstcompilerbuilder_set_package_registry(this.__wbg_ptr, addHeapObject(context), addHeapObject(real_resolve_fn));
        return takeObject(ret);
      }
      /**
       * @param {Uint8Array} data
       * @returns {Promise<void>}
       */
      add_raw_font(data) {
        const ret = wasm.typstcompilerbuilder_add_raw_font(this.__wbg_ptr, addHeapObject(data));
        return takeObject(ret);
      }
      /**
       * @param {any} font
       * @param {Function} blob
       * @returns {Promise<void>}
       */
      add_lazy_font(font, blob) {
        const ret = wasm.typstcompilerbuilder_add_lazy_font(this.__wbg_ptr, addHeapObject(font), addHeapObject(blob));
        return takeObject(ret);
      }
      /**
       * @returns {Promise<TypstCompiler>}
       */
      build() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.typstcompilerbuilder_build(ptr);
        return takeObject(ret);
      }
    };
    if (Symbol.dispose) TypstCompilerBuilder.prototype[Symbol.dispose] = TypstCompilerBuilder.prototype.free;
    TypstFontResolver = class _TypstFontResolver {
      static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(_TypstFontResolver.prototype);
        obj.__wbg_ptr = ptr;
        TypstFontResolverFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
      }
      __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TypstFontResolverFinalization.unregister(this);
        return ptr;
      }
      free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_typstfontresolver_free(ptr, 0);
      }
    };
    if (Symbol.dispose) TypstFontResolver.prototype[Symbol.dispose] = TypstFontResolver.prototype.free;
    TypstFontResolverBuilder = class {
      __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TypstFontResolverBuilderFinalization.unregister(this);
        return ptr;
      }
      free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_typstfontresolverbuilder_free(ptr, 0);
      }
      constructor() {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.typstfontresolverbuilder_new(retptr);
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          if (r2) {
            throw takeObject(r1);
          }
          this.__wbg_ptr = r0 >>> 0;
          TypstFontResolverBuilderFinalization.register(this, this.__wbg_ptr, this);
          return this;
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @param {Uint8Array} buffer
       * @returns {any}
       */
      get_font_info(buffer) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.typstfontresolverbuilder_get_font_info(retptr, this.__wbg_ptr, addHeapObject(buffer));
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          if (r2) {
            throw takeObject(r1);
          }
          return takeObject(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * Adds font data to the searcher.
       * @param {Uint8Array} buffer
       */
      add_raw_font(buffer) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.typstfontresolverbuilder_add_raw_font(retptr, this.__wbg_ptr, addHeapObject(buffer));
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          if (r1) {
            throw takeObject(r0);
          }
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * Adds callback that loads font data lazily to the searcher.
       * `get_font_info` can be used to get the font info.
       * @param {any} font
       * @param {Function} blob
       */
      add_lazy_font(font, blob) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.typstfontresolverbuilder_add_lazy_font(retptr, this.__wbg_ptr, addHeapObject(font), addHeapObject(blob));
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          if (r1) {
            throw takeObject(r0);
          }
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
       * @returns {Promise<TypstFontResolver>}
       */
      build() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.typstfontresolverbuilder_build(ptr);
        return takeObject(ret);
      }
    };
    if (Symbol.dispose) TypstFontResolverBuilder.prototype[Symbol.dispose] = TypstFontResolverBuilder.prototype.free;
    EXPECTED_RESPONSE_TYPES = /* @__PURE__ */ new Set(["basic", "cors", "default"]);
    typst_ts_web_compiler_default = __wbg_init;
    importWasmModule = async function(wasm_name, url) {
      throw new Error("Cannot import wasm module without importer: " + wasm_name + " " + url);
    };
  }
});

// node_modules/@myriaddreamin/typst-ts-web-compiler/pkg/wasm-pack-shim.mjs
var wasm_pack_shim_exports = {};
__export(wasm_pack_shim_exports, {
  IncrServer: () => IncrServer,
  ProxyContext: () => ProxyContext,
  TypstCompileWorld: () => TypstCompileWorld,
  TypstCompiler: () => TypstCompiler,
  TypstCompilerBuilder: () => TypstCompilerBuilder,
  TypstFontResolver: () => TypstFontResolver,
  TypstFontResolverBuilder: () => TypstFontResolverBuilder,
  default: () => wasm_pack_shim_default,
  get_font_info: () => get_font_info,
  initSync: () => initSync,
  setImportWasmModule: () => setImportWasmModule
});
var wasm_pack_shim_default, nodeJsImportWasmModule, isNode;
var init_wasm_pack_shim = __esm({
  "node_modules/@myriaddreamin/typst-ts-web-compiler/pkg/wasm-pack-shim.mjs"() {
    init_typst_ts_web_compiler();
    init_typst_ts_web_compiler();
    init_typst_ts_web_compiler();
    wasm_pack_shim_default = typst_ts_web_compiler_default;
    nodeJsImportWasmModule = async function(wasm_name, url) {
      const escapeImport = new Function("m", "return import(m)");
      const { readFileSync } = await escapeImport("fs");
      const wasmPath = new URL(wasm_name, url);
      return await readFileSync(wasmPath).buffer;
    };
    isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
    if (isNode) {
      setImportWasmModule(nodeJsImportWasmModule);
    }
  }
});

// node_modules/@myriaddreamin/typst.ts/dist/esm/compiler.mjs
var compiler_exports = {};
__export(compiler_exports, {
  CompileFormatEnum: () => CompileFormatEnum,
  IncrementalServer: () => IncrementalServer,
  TypstFontBuilderDriver: () => TypstFontBuilderDriver,
  TypstWorld: () => TypstWorld,
  createTypstCompiler: () => createTypstCompiler,
  createTypstFontBuilder: () => createTypstFontBuilder
});
function createTypstFontBuilder() {
  return new TypstFontBuilderDriver();
}
function createTypstCompiler() {
  return new TypstCompilerDriver();
}
function convertInputs(inputs) {
  return inputs ? Object.entries(inputs) : void 0;
}
function getDiagnosticsArg(diagnostics) {
  switch (diagnostics) {
    case "none":
      return 1;
    case "unix":
      return 2;
    case "full":
    default:
      return 3;
  }
}
var CompileFormatEnum, IncrementalServer, TypstFontResolverCons, TypstWorld, gCompilerModule, TypstFontBuilderDriver, TypstCompilerDriver;
var init_compiler = __esm({
  "node_modules/@myriaddreamin/typst.ts/dist/esm/compiler.mjs"() {
    init_init();
    init_internal_types();
    init_options_init();
    init_wasm();
    (function(CompileFormatEnum2) {
      CompileFormatEnum2[CompileFormatEnum2["vector"] = 0] = "vector";
      CompileFormatEnum2[CompileFormatEnum2["pdf"] = 1] = "pdf";
      CompileFormatEnum2[CompileFormatEnum2["_dummy"] = 2] = "_dummy";
    })(CompileFormatEnum || (CompileFormatEnum = {}));
    IncrementalServer = class {
      /**
       * @internal
       */
      [kObject];
      /**
       * @internal
       */
      constructor(s) {
        this[kObject] = s;
      }
      /**
       * Reset the incremental server to the initial state.
       */
      reset() {
        this[kObject].reset();
      }
      /**
       * Return current result.
       */
      current() {
        return this[kObject].current();
      }
      /**
       * Also attach the debug info to the result.
       */
      setAttachDebugInfo(enable) {
        this[kObject].set_attach_debug_info(enable);
      }
    };
    /* @__PURE__ */ (function(TypstFontResolverCons2) {
    })(TypstFontResolverCons || (TypstFontResolverCons = {}));
    TypstWorld = class {
      [kObject];
      constructor(world) {
        this[kObject] = world;
      }
      /**
       * Compile the paged document.
       *
       * @param {DiagnosticsFormat} format - The format of the diagnostics.
       * @returns {Promise<{ diagnostics?: DiagnosticsData[DiagnosticsFormat][] }>} - The result of the compilation.
       */
      compile(opts) {
        return this[kObject].compile(0, getDiagnosticsArg(opts?.diagnostics));
      }
      /**
       * Compile the paged document.
       *
       * @param {DiagnosticsFormat} format - The format of the diagnostics.
       * @returns {Promise<{ diagnostics?: DiagnosticsData[DiagnosticsFormat][] }>} - The result of the compilation.
       */
      compileHtml(opts) {
        return this[kObject].compile(1, getDiagnosticsArg(opts?.diagnostics));
      }
      /**
       * Runs query on the paged document.
       */
      async query(options) {
        return JSON.parse(this[kObject].query(0, options.selector, options.field));
      }
      /**
       * Get the title of the paged document.
       * Throw error if the world didn't compile the paged document.
       *
       * @returns {string | undefined} - The title of the paged document.
       */
      title() {
        return this[kObject].title(0);
      }
      /**
       * Export the paged document as vector format.
       *
       * @returns {Uint8Array | undefined} - The title of the paged document.
       */
      vector(opts) {
        return this[kObject].get_artifact(0, getDiagnosticsArg(opts?.diagnostics)) || {};
      }
      /**
       * Export the paged document to PDF.
       *
       * @returns {Uint8Array | undefined} - The title of the paged document.
       */
      pdf(opts) {
        return this[kObject].get_artifact(1, getDiagnosticsArg(opts?.diagnostics)) || {};
      }
    };
    gCompilerModule = (module) => new LazyWasmModule(async (bin) => {
      return await module.default(bin);
    });
    TypstFontBuilderDriver = class {
      fontBuilderJs;
      fontBuilder;
      async init(options) {
        this.fontBuilderJs = await (options?.getWrapper?.() || Promise.resolve().then(() => (init_wasm_pack_shim(), wasm_pack_shim_exports)));
        await gCompilerModule(this.fontBuilderJs).init(options?.getModule?.());
        this.fontBuilder = new this.fontBuilderJs.TypstFontResolverBuilder();
      }
      async getFontInfo(font_buffer) {
        return this.fontBuilder.get_font_info(font_buffer);
      }
      async addFontData(font_buffer) {
        this.fontBuilder.add_raw_font(font_buffer);
      }
      async addLazyFont(info, blob) {
        return this.fontBuilder.add_lazy_font(info, blob);
      }
      async build(cb) {
        const fonts = await this.fontBuilder.build();
        const result = await cb(fonts);
        fonts.free();
        return result;
      }
    };
    TypstCompilerDriver = class _TypstCompilerDriver {
      compiler;
      compilerJs;
      static defaultAssets = ["text"];
      constructor() {
      }
      async init(options) {
        this.compilerJs = await (options?.getWrapper?.() || Promise.resolve().then(() => (init_wasm_pack_shim(), wasm_pack_shim_exports)));
        const TypstCompilerBuilder2 = this.compilerJs.TypstCompilerBuilder;
        const compilerOptions = { ...options || {} };
        const beforeBuild = compilerOptions.beforeBuild ??= [];
        const hasPreloadRemoteFonts = beforeBuild.some((fn) => fn._preloadRemoteFontOptions !== void 0);
        const hasSpecifiedAssets = beforeBuild.some((fn) => fn._preloadRemoteFontOptions?.assets !== void 0);
        const hasDisableAssets = beforeBuild.some((fn) => fn._preloadRemoteFontOptions?.assets === false);
        if (!hasPreloadRemoteFonts || !hasSpecifiedAssets && !hasDisableAssets) {
          beforeBuild.push(loadFonts([], { assets: _TypstCompilerDriver.defaultAssets }));
        }
        const hasFontLoader = beforeBuild.some((fn) => fn._kind === "fontLoader");
        if (!hasFontLoader) {
          throw new Error("TypstCompiler: no font loader found, please use font loaders, e.g. loadFonts or preloadSystemFonts");
        }
        this.compiler = await buildComponent(options, gCompilerModule(this.compilerJs), TypstCompilerBuilder2, {});
      }
      setFonts(fonts) {
        this.compiler.set_fonts(fonts);
      }
      compile(options) {
        return new Promise((resolve) => {
          const world = this.compiler.snapshot(options.root, options.mainFilePath, convertInputs(options.inputs));
          if ("incrementalServer" in options) {
            resolve(world.incr_compile(options.incrementalServer[kObject], getDiagnosticsArg(options.diagnostics)));
            return;
          }
          resolve(world.get_artifact(options.format || CompileFormatEnum.vector, getDiagnosticsArg(options.diagnostics)));
        });
      }
      async runWithWorld(options, cb) {
        const world = this.compiler.snapshot(options.root, options.mainFilePath, convertInputs(options.inputs));
        let result = await cb(new TypstWorld(world));
        world.free();
        return result;
      }
      query(options) {
        return this.runWithWorld(options, async (world) => {
          return JSON.parse(await world.query(options));
        });
      }
      getSemanticTokenLegend() {
        return new Promise((resolve) => {
          resolve(this.compiler.get_semantic_token_legend());
        });
      }
      getSemanticTokens(opts) {
        return new Promise((resolve) => {
          this.compiler.reset();
          resolve(this.compiler.get_semantic_tokens(opts.offsetEncoding || "utf-16", opts.mainFilePath, opts.resultId));
        });
      }
      async withIncrementalServer(f) {
        const srv = new IncrementalServer(this.compiler.create_incr_server());
        try {
          return await f(srv);
        } finally {
          srv[kObject].free();
        }
      }
      async getAst(mainFilePath) {
        return this.compiler.get_ast(mainFilePath);
      }
      async reset() {
        await new Promise((resolve) => {
          this.compiler.reset();
          resolve(void 0);
        });
      }
      addSource(path, source) {
        if (arguments.length > 2) {
          throw new Error("use of addSource(path, source, isMain) is deprecated, please use addSource(path, source) instead");
        }
        this.compiler.add_source(path, source);
      }
      mapShadow(path, content) {
        this.compiler.map_shadow(path, content);
      }
      unmapShadow(path) {
        this.compiler.unmap_shadow(path);
      }
      resetShadow() {
        this.compiler.reset_shadow();
      }
      renderPageToCanvas() {
        throw new Error("Please use the api TypstRenderer.renderToCanvas in v0.4.0");
      }
    };
    createTypstCompiler._impl = TypstCompilerDriver;
  }
});

// node_modules/@myriaddreamin/typst.ts/dist/esm/contrib/global-compiler.mjs
var global_compiler_exports = {};
__export(global_compiler_exports, {
  createGlobalCompiler: () => createGlobalCompiler,
  getGlobalCompiler: () => getGlobalCompiler,
  withGlobalCompiler: () => withGlobalCompiler
});
function getGlobalCompiler() {
  return isReady ? globalCompiler : void 0;
}
function createGlobalCompiler(creator, initOptions) {
  const compiler = globalCompiler || creator();
  if (globalCompilerInitReady !== void 0) {
    return globalCompilerInitReady;
  }
  return globalCompilerInitReady = (async () => {
    isReady = true;
    await compiler.init(initOptions);
    return globalCompiler = compiler;
  })();
}
function withGlobalCompiler(creator, initOptions, resolve, reject) {
  const compiler = getGlobalCompiler();
  if (compiler) {
    resolve(compiler);
    return;
  }
  createGlobalCompiler(creator, initOptions).then(resolve).catch(reject);
}
var globalCompiler, globalCompilerInitReady, isReady;
var init_global_compiler = __esm({
  "node_modules/@myriaddreamin/typst.ts/dist/esm/contrib/global-compiler.mjs"() {
    globalCompiler = void 0;
    isReady = false;
  }
});

// node_modules/@myriaddreamin/typst.ts/dist/esm/contrib/global-renderer.mjs
var global_renderer_exports = {};
__export(global_renderer_exports, {
  createGlobalRenderer: () => createGlobalRenderer,
  getGlobalRenderer: () => getGlobalRenderer,
  withGlobalRenderer: () => withGlobalRenderer
});
function getGlobalRenderer() {
  return isReady2 ? globalRenderer : void 0;
}
function createGlobalRenderer(creator, initOptions) {
  const renderer = globalRenderer || creator();
  if (globalRendererInitReady !== void 0) {
    return globalRendererInitReady;
  }
  return globalRendererInitReady = (async () => {
    isReady2 = true;
    await renderer.init(initOptions);
    return globalRenderer = renderer;
  })();
}
function withGlobalRenderer(creator, initOptions, resolve, reject) {
  const renderer = getGlobalRenderer();
  if (renderer) {
    resolve(renderer);
    return;
  }
  createGlobalRenderer(creator, initOptions).then(resolve).catch(reject);
}
var globalRenderer, globalRendererInitReady, isReady2;
var init_global_renderer = __esm({
  "node_modules/@myriaddreamin/typst.ts/dist/esm/contrib/global-renderer.mjs"() {
    globalRenderer = void 0;
    isReady2 = false;
  }
});

// node_modules/pandoc-wasm/src/pandoc.wasm
var require_pandoc = __commonJS({
  "node_modules/pandoc-wasm/src/pandoc.wasm"(exports, module) {
    module.exports = "./pandoc-XXCK6AXK.wasm";
  }
});

// node_modules/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm
var require_typst_ts_web_compiler_bg = __commonJS({
  "node_modules/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm"(exports, module) {
    module.exports = "./typst_ts_web_compiler_bg-FUBS475R.wasm";
  }
});

// worker-runtime:worker-runtime
function base64Decode(s) {
  const binString = atob(s);
  const len = binString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}
function base64Encode(buffer) {
  if (typeof buffer === "string") {
    buffer = new TextEncoder().encode(buffer);
  }
  let binary = "";
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return btoa(binary);
}
var fixedCounter = new Uint8Array(16);
var Logger = class {
  constructor(prefix = "", maxCaptureSize = 1e3) {
    this.prefix = prefix;
    this.maxCaptureSize = maxCaptureSize;
    this.prefix = prefix;
    this.originalConsole = {
      log: console.log.bind(console),
      info: console.info.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console),
      debug: console.debug.bind(console)
    };
    this.patchConsole();
  }
  prefix;
  maxCaptureSize;
  originalConsole;
  logBuffer = [];
  patchConsole() {
    const createPatchedMethod = (level) => {
      return (...args) => {
        const prefixedArgs = this.prefix ? [this.prefix, ...args] : args;
        this.originalConsole[level](...prefixedArgs);
        this.captureLog(level, args);
      };
    };
    console.log = createPatchedMethod("log");
    console.info = createPatchedMethod("info");
    console.warn = createPatchedMethod("warn");
    console.error = createPatchedMethod("error");
    console.debug = createPatchedMethod("debug");
  }
  captureLog(level, args) {
    const entry = {
      level,
      timestamp: Date.now(),
      message: args.map((arg) => {
        if (typeof arg === "string") {
          return arg;
        }
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }).join(" ")
    };
    this.logBuffer.push(entry);
    if (this.logBuffer.length > this.maxCaptureSize) {
      this.logBuffer.shift();
    }
  }
  /**
   * Posts all buffered logs to a server endpoint
   */
  async postToServer(logEndpoint, source) {
    const logs = this.logBuffer;
    if (logs.length > 0) {
      const logCopy = [...this.logBuffer];
      this.logBuffer = [];
      try {
        const resp = await fetch(logEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(logCopy.map((entry) => ({ ...entry, source })))
        });
        if (!resp.ok) {
          throw new Error("Failed to post logs to server");
        }
      } catch (e) {
        console.warn("Could not post logs to server", e.message);
        this.logBuffer.unshift(...logCopy);
      }
    }
  }
};
var globalLogger;
function initLogger(prefix = "") {
  globalLogger = new Logger(prefix);
  return globalLogger;
}
var workerPostMessage = (_msg) => {
  throw new Error("Not initialized yet");
};
var runningAsWebWorker = typeof window === "undefined" && // @ts-expect-error: globalThis
typeof globalThis.WebSocketPair === "undefined";
var pendingRequests = /* @__PURE__ */ new Map();
var syscallReqId = 0;
if (runningAsWebWorker) {
  globalThis.syscall = async (name, ...args) => {
    return await new Promise((resolve, reject) => {
      syscallReqId++;
      pendingRequests.set(syscallReqId, { resolve, reject });
      workerPostMessage({
        type: "sys",
        id: syscallReqId,
        name,
        args
      });
    });
  };
}
function setupMessageListener(functionMapping2, manifest2, postMessageFn) {
  if (!runningAsWebWorker) {
    return;
  }
  workerPostMessage = postMessageFn;
  self.addEventListener("message", (event) => {
    (async () => {
      const data = event.data;
      switch (data.type) {
        case "inv":
          {
            const fn = functionMapping2[data.name];
            if (!fn) {
              throw new Error(`Function not loaded: ${data.name}`);
            }
            try {
              const result = await Promise.resolve(fn(...data.args || []));
              workerPostMessage({
                type: "invr",
                id: data.id,
                result
              });
            } catch (e) {
              console.error(
                "An exception was thrown as a result of invoking function",
                data.name,
                "error:",
                e.message
              );
              workerPostMessage({
                type: "invr",
                id: data.id,
                error: e.message
              });
            }
          }
          break;
        case "sysr":
          {
            const syscallId = data.id;
            const lookup = pendingRequests.get(syscallId);
            if (!lookup) {
              throw Error("Invalid request id");
            }
            pendingRequests.delete(syscallId);
            if (data.error) {
              lookup.reject(new Error(data.error));
            } else {
              lookup.resolve(data.result);
            }
          }
          break;
      }
    })().catch(console.error);
  });
  workerPostMessage({
    type: "manifest",
    manifest: manifest2
  });
  initLogger(`[${manifest2.name} plug]`);
}
async function sandboxFetch(reqInfo, options) {
  if (typeof reqInfo !== "string") {
    const body = new Uint8Array(await reqInfo.arrayBuffer());
    const encodedBody = body.length > 0 ? base64Encode(body) : void 0;
    options = {
      method: reqInfo.method,
      headers: Object.fromEntries(reqInfo.headers.entries()),
      base64Body: encodedBody
    };
    reqInfo = reqInfo.url;
  }
  return syscall("sandboxFetch.fetch", reqInfo, options);
}
globalThis.nativeFetch = globalThis.fetch;
function monkeyPatchFetch() {
  globalThis.fetch = async (reqInfo, init) => {
    const encodedBody = init?.body ? base64Encode(
      new Uint8Array(await new Response(init.body).arrayBuffer())
    ) : void 0;
    const r = await sandboxFetch(
      reqInfo,
      init && {
        method: init.method,
        headers: init.headers,
        base64Body: encodedBody
      }
    );
    return new Response(
      r.base64Body ? base64Decode(r.base64Body) : null,
      {
        status: r.status,
        headers: r.headers
      }
    );
  };
}
if (runningAsWebWorker) {
  monkeyPatchFetch();
}

// node_modules/@silverbulletmd/silverbullet/plug-api/syscalls/editor.ts
var editor_exports = {};
__export(editor_exports, {
  acceptCompletion: () => acceptCompletion,
  alert: () => alert,
  closeCompletion: () => closeCompletion,
  configureVimMode: () => configureVimMode,
  confirm: () => confirm,
  copyToClipboard: () => copyToClipboard,
  cursorCharLeft: () => cursorCharLeft,
  cursorCharRight: () => cursorCharRight,
  cursorDocEnd: () => cursorDocEnd,
  cursorDocStart: () => cursorDocStart,
  cursorGroupLeft: () => cursorGroupLeft,
  cursorGroupRight: () => cursorGroupRight,
  cursorLineBoundaryLeft: () => cursorLineBoundaryLeft,
  cursorLineBoundaryRight: () => cursorLineBoundaryRight,
  cursorLineDown: () => cursorLineDown,
  cursorLineEnd: () => cursorLineEnd,
  cursorLineStart: () => cursorLineStart,
  cursorLineUp: () => cursorLineUp,
  cursorPageDown: () => cursorPageDown,
  cursorPageUp: () => cursorPageUp,
  deleteCharBackward: () => deleteCharBackward,
  deleteCharForward: () => deleteCharForward,
  deleteGroupBackward: () => deleteGroupBackward,
  deleteGroupForward: () => deleteGroupForward,
  deleteLine: () => deleteLine,
  deleteLineBoundaryBackward: () => deleteLineBoundaryBackward,
  deleteLineBoundaryForward: () => deleteLineBoundaryForward,
  dispatch: () => dispatch,
  downloadFile: () => downloadFile,
  downloadSpaceFile: () => downloadSpaceFile,
  filterBox: () => filterBox,
  flashNotification: () => flashNotification,
  focus: () => focus,
  fold: () => fold,
  foldAll: () => foldAll,
  forceLint: () => forceLint,
  getCurrentEditor: () => getCurrentEditor,
  getCurrentPage: () => getCurrentPage,
  getCurrentPageMeta: () => getCurrentPageMeta,
  getCurrentPath: () => getCurrentPath,
  getCursor: () => getCursor,
  getDocumentCapabilities: () => getDocumentCapabilities,
  getFocusedPanelSlot: () => getFocusedPanelSlot,
  getLastOpenedMap: () => getLastOpenedMap,
  getRecentlyOpenedPages: () => getRecentlyOpenedPages,
  getSelection: () => getSelection,
  getText: () => getText,
  getUiOption: () => getUiOption,
  getViewableExtensions: () => getViewableExtensions,
  goHistory: () => goHistory,
  hidePanel: () => hidePanel,
  hideProgress: () => hideProgress,
  indentLess: () => indentLess,
  indentMore: () => indentMore,
  insertAtCursor: () => insertAtCursor,
  insertAtPos: () => insertAtPos,
  insertNewline: () => insertNewline,
  invokeCommand: () => invokeCommand,
  isMobile: () => isMobile,
  isNarrowScreen: () => isNarrowScreen,
  moveCursor: () => moveCursor,
  moveCursorToLine: () => moveCursorToLine,
  moveLineDown: () => moveLineDown,
  moveLineUp: () => moveLineUp,
  navigate: () => navigate,
  newWindow: () => newWindow,
  open: () => open,
  openCommandPalette: () => openCommandPalette,
  openNavigator: () => openNavigator,
  openPageNavigator: () => openPageNavigator,
  openSearchPanel: () => openSearchPanel,
  openUrl: () => openUrl,
  prompt: () => prompt,
  rebuildEditorState: () => rebuildEditorState,
  redo: () => redo,
  reloadConfigAndCommands: () => reloadConfigAndCommands,
  reloadPage: () => reloadPage,
  reloadUI: () => reloadUI,
  replaceRange: () => replaceRange,
  save: () => save,
  selectAll: () => selectAll,
  selectCharLeft: () => selectCharLeft,
  selectCharRight: () => selectCharRight,
  selectDocEnd: () => selectDocEnd,
  selectDocStart: () => selectDocStart,
  selectGroupLeft: () => selectGroupLeft,
  selectGroupRight: () => selectGroupRight,
  selectLineBoundaryLeft: () => selectLineBoundaryLeft,
  selectLineBoundaryRight: () => selectLineBoundaryRight,
  selectLineDown: () => selectLineDown,
  selectLineEnd: () => selectLineEnd,
  selectLineStart: () => selectLineStart,
  selectLineUp: () => selectLineUp,
  selectPageDown: () => selectPageDown,
  selectPageUp: () => selectPageUp,
  sendMessage: () => sendMessage,
  setSelection: () => setSelection,
  setText: () => setText,
  setUiOption: () => setUiOption,
  showPanel: () => showPanel,
  showProgress: () => showProgress,
  startCompletion: () => startCompletion,
  toggleComment: () => toggleComment,
  toggleFold: () => toggleFold,
  transposeChars: () => transposeChars,
  undo: () => undo,
  unfold: () => unfold,
  unfoldAll: () => unfoldAll,
  uploadFile: () => uploadFile,
  vimEx: () => vimEx
});

// node_modules/@silverbulletmd/silverbullet/plug-api/syscall.ts
if (typeof globalThis.syscall === "undefined") {
  globalThis.syscall = () => {
    throw new Error("Not implemented here");
  };
}
function syscall2(name, ...args) {
  return globalThis.syscall(name, ...args);
}

// node_modules/@silverbulletmd/silverbullet/plug-api/syscalls/editor.ts
function getCurrentPage() {
  return syscall2("editor.getCurrentPage");
}
function getCurrentPageMeta() {
  return syscall2("editor.getCurrentPageMeta");
}
function getCurrentPath() {
  return syscall2("editor.getCurrentPath");
}
function getRecentlyOpenedPages() {
  return syscall2("editor.getRecentlyOpenedPages");
}
function getLastOpenedMap() {
  return syscall2("editor.getLastOpenedMap");
}
function getViewableExtensions() {
  return syscall2("editor.getViewableExtensions");
}
function getDocumentCapabilities(documents) {
  return syscall2("editor.getDocumentCapabilities", documents);
}
function getCurrentEditor() {
  return syscall2("editor.getCurrentEditor");
}
function getText() {
  return syscall2("editor.getText");
}
function setText(newText, isolateHistory = false) {
  return syscall2("editor.setText", newText, isolateHistory);
}
function getCursor() {
  return syscall2("editor.getCursor");
}
function getSelection() {
  return syscall2("editor.getSelection");
}
function setSelection(from, to) {
  return syscall2("editor.setSelection", from, to);
}
function invokeCommand(name, args) {
  return syscall2("editor.invokeCommand", name, args);
}
function save() {
  return syscall2("editor.save");
}
function navigate(ref, replaceState = false, newWindow2 = false) {
  return syscall2("editor.navigate", ref, replaceState, newWindow2);
}
function open(ref, replaceState = false, newWindow2 = false) {
  return syscall2("editor.open", ref, replaceState, newWindow2);
}
function openPageNavigator(mode = "page") {
  return syscall2("editor.openPageNavigator", mode);
}
function openCommandPalette() {
  return syscall2("editor.openCommandPalette");
}
function openNavigator(name, opts) {
  return syscall2("editor.openNavigator", name, opts);
}
function reloadPage() {
  return syscall2("editor.reloadPage");
}
function forceLint() {
  return syscall2("editor.forceLint");
}
function reloadUI() {
  return syscall2("editor.reloadUI");
}
function rebuildEditorState() {
  return syscall2("editor.rebuildEditorState");
}
function reloadConfigAndCommands() {
  return syscall2("editor.reloadConfigAndCommands");
}
function openUrl(url, existingWindow = false) {
  return syscall2("editor.openUrl", url, existingWindow);
}
function newWindow() {
  return syscall2("editor.newWindow");
}
function goHistory(delta) {
  return syscall2("editor.goHistory", delta);
}
function downloadFile(filename, dataUrl) {
  return syscall2("editor.downloadFile", filename, dataUrl);
}
function downloadSpaceFile(name) {
  return syscall2("editor.downloadSpaceFile", name);
}
function uploadFile(accept, capture) {
  return syscall2("editor.uploadFile", accept, capture);
}
function flashNotification(message, type = "info") {
  return syscall2("editor.flashNotification", message, type);
}
function filterBox(label, options, helpText = "", placeHolder = "") {
  return syscall2("editor.filterBox", label, options, helpText, placeHolder);
}
function showPanel(id, mode, html, script = "") {
  return syscall2("editor.showPanel", id, mode, html, script);
}
function hidePanel(id) {
  return syscall2("editor.hidePanel", id);
}
function focus() {
  return syscall2("editor.focus");
}
function getFocusedPanelSlot() {
  return syscall2("editor.getFocusedPanelSlot");
}
function showProgress(progressType, progressPercentage) {
  return syscall2("editor.showProgress", progressType, progressPercentage);
}
function hideProgress(progressType) {
  return syscall2("editor.showProgress", progressType);
}
function insertAtPos(text, pos) {
  return syscall2("editor.insertAtPos", text, pos);
}
function replaceRange(from, to, text) {
  return syscall2("editor.replaceRange", from, to, text);
}
function moveCursor(pos, center = false) {
  return syscall2("editor.moveCursor", pos, center);
}
function moveCursorToLine(line, column = 1, center = false) {
  return syscall2("editor.moveCursorToLine", line, column, center);
}
function insertAtCursor(text, scrollIntoView = false, cursorPlaceHolder = false) {
  return syscall2(
    "editor.insertAtCursor",
    text,
    scrollIntoView,
    cursorPlaceHolder
  );
}
function dispatch(change) {
  return syscall2("editor.dispatch", change);
}
function prompt(message, defaultValue = "") {
  return syscall2("editor.prompt", message, defaultValue);
}
function confirm(message, options) {
  return syscall2("editor.confirm", message, options);
}
function alert(message) {
  return syscall2("editor.alert", message);
}
function getUiOption(key) {
  return syscall2("editor.getUiOption", key);
}
function setUiOption(key, value) {
  return syscall2("editor.setUiOption", key, value);
}
function fold() {
  return syscall2("editor.fold");
}
function unfold() {
  return syscall2("editor.unfold");
}
function toggleFold() {
  return syscall2("editor.toggleFold");
}
function foldAll() {
  return syscall2("editor.foldAll");
}
function unfoldAll() {
  return syscall2("editor.unfoldAll");
}
function undo() {
  return syscall2("editor.undo");
}
function redo() {
  return syscall2("editor.redo");
}
function openSearchPanel() {
  return syscall2("editor.openSearchPanel");
}
function copyToClipboard(data) {
  return syscall2("editor.copyToClipboard", data);
}
function deleteLine() {
  return syscall2("editor.deleteLine");
}
function selectAll() {
  return syscall2("editor.selectAll");
}
function indentMore() {
  return syscall2("editor.indentMore");
}
function indentLess() {
  return syscall2("editor.indentLess");
}
function toggleComment() {
  return syscall2("editor.toggleComment");
}
function moveLineUp() {
  return syscall2("editor.moveLineUp");
}
function moveLineDown() {
  return syscall2("editor.moveLineDown");
}
function cursorCharLeft() {
  return syscall2("editor.cursorCharLeft");
}
function cursorCharRight() {
  return syscall2("editor.cursorCharRight");
}
function cursorGroupLeft() {
  return syscall2("editor.cursorGroupLeft");
}
function cursorGroupRight() {
  return syscall2("editor.cursorGroupRight");
}
function cursorLineBoundaryLeft() {
  return syscall2("editor.cursorLineBoundaryLeft");
}
function cursorLineBoundaryRight() {
  return syscall2("editor.cursorLineBoundaryRight");
}
function cursorLineStart() {
  return syscall2("editor.cursorLineStart");
}
function cursorLineEnd() {
  return syscall2("editor.cursorLineEnd");
}
function cursorDocStart() {
  return syscall2("editor.cursorDocStart");
}
function cursorDocEnd() {
  return syscall2("editor.cursorDocEnd");
}
function cursorLineUp() {
  return syscall2("editor.cursorLineUp");
}
function cursorLineDown() {
  return syscall2("editor.cursorLineDown");
}
function cursorPageUp() {
  return syscall2("editor.cursorPageUp");
}
function cursorPageDown() {
  return syscall2("editor.cursorPageDown");
}
function selectCharLeft() {
  return syscall2("editor.selectCharLeft");
}
function selectCharRight() {
  return syscall2("editor.selectCharRight");
}
function selectGroupLeft() {
  return syscall2("editor.selectGroupLeft");
}
function selectGroupRight() {
  return syscall2("editor.selectGroupRight");
}
function selectLineBoundaryLeft() {
  return syscall2("editor.selectLineBoundaryLeft");
}
function selectLineBoundaryRight() {
  return syscall2("editor.selectLineBoundaryRight");
}
function selectLineStart() {
  return syscall2("editor.selectLineStart");
}
function selectLineEnd() {
  return syscall2("editor.selectLineEnd");
}
function selectDocStart() {
  return syscall2("editor.selectDocStart");
}
function selectDocEnd() {
  return syscall2("editor.selectDocEnd");
}
function selectLineUp() {
  return syscall2("editor.selectLineUp");
}
function selectLineDown() {
  return syscall2("editor.selectLineDown");
}
function selectPageUp() {
  return syscall2("editor.selectPageUp");
}
function selectPageDown() {
  return syscall2("editor.selectPageDown");
}
function deleteCharBackward() {
  return syscall2("editor.deleteCharBackward");
}
function deleteCharForward() {
  return syscall2("editor.deleteCharForward");
}
function deleteGroupBackward() {
  return syscall2("editor.deleteGroupBackward");
}
function deleteGroupForward() {
  return syscall2("editor.deleteGroupForward");
}
function deleteLineBoundaryBackward() {
  return syscall2("editor.deleteLineBoundaryBackward");
}
function deleteLineBoundaryForward() {
  return syscall2("editor.deleteLineBoundaryForward");
}
function transposeChars() {
  return syscall2("editor.transposeChars");
}
function insertNewline() {
  return syscall2("editor.insertNewline");
}
function acceptCompletion() {
  return syscall2("editor.acceptCompletion");
}
function startCompletion() {
  return syscall2("editor.startCompletion");
}
function closeCompletion() {
  return syscall2("editor.closeCompletion");
}
function vimEx(exCommand) {
  return syscall2("editor.vimEx", exCommand);
}
function configureVimMode() {
  return syscall2("editor.configureVimMode");
}
function sendMessage(type, data) {
  return syscall2("editor.sendMessage", type, data);
}
function isMobile() {
  return syscall2("editor.isMobile");
}
function isNarrowScreen() {
  return syscall2("editor.isNarrowScreen");
}

// node_modules/@silverbulletmd/silverbullet/plug-api/syscalls/markdown.ts
var markdown_exports = {};
__export(markdown_exports, {
  expandMarkdown: () => expandMarkdown,
  markdownToHtml: () => markdownToHtml,
  parseMarkdown: () => parseMarkdown,
  renderParseTree: () => renderParseTree
});
function parseMarkdown(text) {
  return syscall2("markdown.parseMarkdown", text);
}
function renderParseTree(tree) {
  return syscall2("markdown.renderParseTree", tree);
}
function expandMarkdown(tree) {
  return syscall2("markdown.expandMarkdown", tree);
}
function markdownToHtml(markdownText) {
  return syscall2("markdown.markdownToHtml", markdownText);
}

// node_modules/@silverbulletmd/silverbullet/plug-api/syscalls/space.ts
var space_exports = {};
__export(space_exports, {
  collidingBasenames: () => collidingBasenames,
  createRevisionSnapshot: () => createRevisionSnapshot,
  deleteDocument: () => deleteDocument,
  deleteFile: () => deleteFile,
  deletePage: () => deletePage,
  fileExists: () => fileExists,
  getDocumentMeta: () => getDocumentMeta,
  getFileMeta: () => getFileMeta,
  getGitConflictVersion: () => getGitConflictVersion,
  getGitConflicts: () => getGitConflicts,
  getGitSyncStatus: () => getGitSyncStatus,
  getPageMeta: () => getPageMeta,
  getRevision: () => getRevision,
  getRevisionDiff: () => getRevisionDiff,
  getSpaceLog: () => getSpaceLog,
  listDocuments: () => listDocuments,
  listFiles: () => listFiles,
  listPages: () => listPages,
  listPlugs: () => listPlugs,
  listRevisions: () => listRevisions,
  lookupPaths: () => lookupPaths,
  pageExists: () => pageExists,
  readDocument: () => readDocument,
  readFile: () => readFile,
  readFileWithMeta: () => readFileWithMeta,
  readPage: () => readPage,
  readPageWithMeta: () => readPageWithMeta,
  readRef: () => readRef,
  resolveGitConflict: () => resolveGitConflict,
  syncGitNow: () => syncGitNow,
  writeDocument: () => writeDocument,
  writeFile: () => writeFile,
  writePage: () => writePage
});
function listPages() {
  return syscall2("space.listPages");
}
function getPageMeta(name) {
  return syscall2("space.getPageMeta", name);
}
function pageExists(name) {
  return syscall2("space.pageExists", name);
}
function readPage(name) {
  return syscall2("space.readPage", name);
}
function readPageWithMeta(name) {
  return syscall2("space.readPageWithMeta", name);
}
function writePage(name, text) {
  return syscall2("space.writePage", name, text);
}
function deletePage(name) {
  return syscall2("space.deletePage", name);
}
function listPlugs() {
  return syscall2("space.listPlugs");
}
function listDocuments() {
  return syscall2("space.listDocuments");
}
function getDocumentMeta(name) {
  return syscall2("space.getDocumentMeta", name);
}
function readDocument(name) {
  return syscall2("space.readDocument", name);
}
function writeDocument(name, data) {
  return syscall2("space.writeDocument", name, data);
}
function deleteDocument(name) {
  return syscall2("space.deleteDocument", name);
}
function listFiles() {
  return syscall2("space.listFiles");
}
function readFile(name) {
  return syscall2("space.readFile", name);
}
function readRef(ref) {
  return syscall2("space.readRef", ref);
}
function readFileWithMeta(name) {
  return syscall2("space.readFileWithMeta", name);
}
function getFileMeta(name) {
  return syscall2("space.getFileMeta", name);
}
function writeFile(name, data) {
  return syscall2("space.writeFile", name, data);
}
function deleteFile(name) {
  return syscall2("space.deleteFile", name);
}
function fileExists(name) {
  return syscall2("space.fileExists", name);
}
function collidingBasenames() {
  return syscall2("space.collidingBasenames");
}
function lookupPaths(paths) {
  return syscall2("space.lookupPaths", paths);
}
function listRevisions(path, before) {
  return syscall2("space.listRevisions", path, before);
}
function getRevision(path, rev, parent) {
  return syscall2("space.getRevision", path, rev, parent);
}
function getRevisionDiff(path, rev) {
  return syscall2("space.getRevisionDiff", path, rev);
}
function getSpaceLog(before, q) {
  return syscall2("space.getSpaceLog", before, q);
}
function createRevisionSnapshot() {
  return syscall2("space.createRevisionSnapshot");
}
function getGitSyncStatus() {
  return syscall2("space.getGitSyncStatus");
}
function getGitConflicts() {
  return syscall2("space.getGitConflicts");
}
function syncGitNow() {
  return syscall2("space.syncGitNow");
}
function resolveGitConflict(id, generation, contentRevision, action) {
  return syscall2(
    "space.resolveGitConflict",
    id,
    generation,
    contentRevision,
    action
  );
}
function getGitConflictVersion(id, generation, side) {
  return syscall2("space.getGitConflictVersion", id, generation, side);
}

// node_modules/@silverbulletmd/silverbullet/plug-api/syscalls/client_store.ts
var client_store_exports = {};
__export(client_store_exports, {
  del: () => del,
  get: () => get,
  set: () => set
});
function set(key, value) {
  return syscall2("clientStore.set", key, value);
}
function get(key) {
  return syscall2("clientStore.get", key);
}
function del(key) {
  return syscall2("clientStore.delete", key);
}

// node_modules/@silverbulletmd/silverbullet/plug-api/lib/crypto.ts
var fixedCounter2 = new Uint8Array(16);

// node_modules/@bjorn3/browser_wasi_shim/dist/wasi_defs.js
var CLOCKID_REALTIME = 0;
var CLOCKID_MONOTONIC = 1;
var ERRNO_SUCCESS = 0;
var ERRNO_BADF = 8;
var ERRNO_EXIST = 20;
var ERRNO_INVAL = 28;
var ERRNO_ISDIR = 31;
var ERRNO_NAMETOOLONG = 37;
var ERRNO_NOENT = 44;
var ERRNO_NOSYS = 52;
var ERRNO_NOTDIR = 54;
var ERRNO_NOTEMPTY = 55;
var ERRNO_NOTSUP = 58;
var ERRNO_PERM = 63;
var ERRNO_NOTCAPABLE = 76;
var RIGHTS_FD_DATASYNC = 1 << 0;
var RIGHTS_FD_READ = 1 << 1;
var RIGHTS_FD_SEEK = 1 << 2;
var RIGHTS_FD_FDSTAT_SET_FLAGS = 1 << 3;
var RIGHTS_FD_SYNC = 1 << 4;
var RIGHTS_FD_TELL = 1 << 5;
var RIGHTS_FD_WRITE = 1 << 6;
var RIGHTS_FD_ADVISE = 1 << 7;
var RIGHTS_FD_ALLOCATE = 1 << 8;
var RIGHTS_PATH_CREATE_DIRECTORY = 1 << 9;
var RIGHTS_PATH_CREATE_FILE = 1 << 10;
var RIGHTS_PATH_LINK_SOURCE = 1 << 11;
var RIGHTS_PATH_LINK_TARGET = 1 << 12;
var RIGHTS_PATH_OPEN = 1 << 13;
var RIGHTS_FD_READDIR = 1 << 14;
var RIGHTS_PATH_READLINK = 1 << 15;
var RIGHTS_PATH_RENAME_SOURCE = 1 << 16;
var RIGHTS_PATH_RENAME_TARGET = 1 << 17;
var RIGHTS_PATH_FILESTAT_GET = 1 << 18;
var RIGHTS_PATH_FILESTAT_SET_SIZE = 1 << 19;
var RIGHTS_PATH_FILESTAT_SET_TIMES = 1 << 20;
var RIGHTS_FD_FILESTAT_GET = 1 << 21;
var RIGHTS_FD_FILESTAT_SET_SIZE = 1 << 22;
var RIGHTS_FD_FILESTAT_SET_TIMES = 1 << 23;
var RIGHTS_PATH_SYMLINK = 1 << 24;
var RIGHTS_PATH_REMOVE_DIRECTORY = 1 << 25;
var RIGHTS_PATH_UNLINK_FILE = 1 << 26;
var RIGHTS_POLL_FD_READWRITE = 1 << 27;
var RIGHTS_SOCK_SHUTDOWN = 1 << 28;
var Iovec = class _Iovec {
  static read_bytes(view, ptr) {
    const iovec = new _Iovec();
    iovec.buf = view.getUint32(ptr, true);
    iovec.buf_len = view.getUint32(ptr + 4, true);
    return iovec;
  }
  static read_bytes_array(view, ptr, len) {
    const iovecs = [];
    for (let i = 0; i < len; i++) {
      iovecs.push(_Iovec.read_bytes(view, ptr + 8 * i));
    }
    return iovecs;
  }
};
var Ciovec = class _Ciovec {
  static read_bytes(view, ptr) {
    const iovec = new _Ciovec();
    iovec.buf = view.getUint32(ptr, true);
    iovec.buf_len = view.getUint32(ptr + 4, true);
    return iovec;
  }
  static read_bytes_array(view, ptr, len) {
    const iovecs = [];
    for (let i = 0; i < len; i++) {
      iovecs.push(_Ciovec.read_bytes(view, ptr + 8 * i));
    }
    return iovecs;
  }
};
var WHENCE_SET = 0;
var WHENCE_CUR = 1;
var WHENCE_END = 2;
var FILETYPE_CHARACTER_DEVICE = 2;
var FILETYPE_DIRECTORY = 3;
var FILETYPE_REGULAR_FILE = 4;
var Dirent = class {
  head_length() {
    return 24;
  }
  name_length() {
    return this.dir_name.byteLength;
  }
  write_head_bytes(view, ptr) {
    view.setBigUint64(ptr, this.d_next, true);
    view.setBigUint64(ptr + 8, this.d_ino, true);
    view.setUint32(ptr + 16, this.dir_name.length, true);
    view.setUint8(ptr + 20, this.d_type);
  }
  write_name_bytes(view8, ptr, buf_len) {
    view8.set(this.dir_name.slice(0, Math.min(this.dir_name.byteLength, buf_len)), ptr);
  }
  constructor(next_cookie, d_ino, name, type) {
    const encoded_name = new TextEncoder().encode(name);
    this.d_next = next_cookie;
    this.d_ino = d_ino;
    this.d_namlen = encoded_name.byteLength;
    this.d_type = type;
    this.dir_name = encoded_name;
  }
};
var FDFLAGS_APPEND = 1 << 0;
var FDFLAGS_DSYNC = 1 << 1;
var FDFLAGS_NONBLOCK = 1 << 2;
var FDFLAGS_RSYNC = 1 << 3;
var FDFLAGS_SYNC = 1 << 4;
var Fdstat = class {
  write_bytes(view, ptr) {
    view.setUint8(ptr, this.fs_filetype);
    view.setUint16(ptr + 2, this.fs_flags, true);
    view.setBigUint64(ptr + 8, this.fs_rights_base, true);
    view.setBigUint64(ptr + 16, this.fs_rights_inherited, true);
  }
  constructor(filetype, flags) {
    this.fs_rights_base = 0n;
    this.fs_rights_inherited = 0n;
    this.fs_filetype = filetype;
    this.fs_flags = flags;
  }
};
var FSTFLAGS_ATIM = 1 << 0;
var FSTFLAGS_ATIM_NOW = 1 << 1;
var FSTFLAGS_MTIM = 1 << 2;
var FSTFLAGS_MTIM_NOW = 1 << 3;
var OFLAGS_CREAT = 1 << 0;
var OFLAGS_DIRECTORY = 1 << 1;
var OFLAGS_EXCL = 1 << 2;
var OFLAGS_TRUNC = 1 << 3;
var Filestat = class {
  write_bytes(view, ptr) {
    view.setBigUint64(ptr, this.dev, true);
    view.setBigUint64(ptr + 8, this.ino, true);
    view.setUint8(ptr + 16, this.filetype);
    view.setBigUint64(ptr + 24, this.nlink, true);
    view.setBigUint64(ptr + 32, this.size, true);
    view.setBigUint64(ptr + 38, this.atim, true);
    view.setBigUint64(ptr + 46, this.mtim, true);
    view.setBigUint64(ptr + 52, this.ctim, true);
  }
  constructor(ino, filetype, size) {
    this.dev = 0n;
    this.nlink = 0n;
    this.atim = 0n;
    this.mtim = 0n;
    this.ctim = 0n;
    this.ino = ino;
    this.filetype = filetype;
    this.size = size;
  }
};
var EVENTTYPE_CLOCK = 0;
var EVENTRWFLAGS_FD_READWRITE_HANGUP = 1 << 0;
var SUBCLOCKFLAGS_SUBSCRIPTION_CLOCK_ABSTIME = 1 << 0;
var Subscription = class _Subscription {
  static read_bytes(view, ptr) {
    return new _Subscription(view.getBigUint64(ptr, true), view.getUint8(ptr + 8), view.getUint32(ptr + 16, true), view.getBigUint64(ptr + 24, true), view.getUint16(ptr + 36, true));
  }
  constructor(userdata, eventtype, clockid, timeout, flags) {
    this.userdata = userdata;
    this.eventtype = eventtype;
    this.clockid = clockid;
    this.timeout = timeout;
    this.flags = flags;
  }
};
var Event = class {
  write_bytes(view, ptr) {
    view.setBigUint64(ptr, this.userdata, true);
    view.setUint16(ptr + 8, this.error, true);
    view.setUint8(ptr + 10, this.eventtype);
  }
  constructor(userdata, error, eventtype) {
    this.userdata = userdata;
    this.error = error;
    this.eventtype = eventtype;
  }
};
var RIFLAGS_RECV_PEEK = 1 << 0;
var RIFLAGS_RECV_WAITALL = 1 << 1;
var ROFLAGS_RECV_DATA_TRUNCATED = 1 << 0;
var SDFLAGS_RD = 1 << 0;
var SDFLAGS_WR = 1 << 1;
var PREOPENTYPE_DIR = 0;
var PrestatDir = class {
  write_bytes(view, ptr) {
    view.setUint32(ptr, this.pr_name.byteLength, true);
  }
  constructor(name) {
    this.pr_name = new TextEncoder().encode(name);
  }
};
var Prestat = class _Prestat {
  static dir(name) {
    const prestat = new _Prestat();
    prestat.tag = PREOPENTYPE_DIR;
    prestat.inner = new PrestatDir(name);
    return prestat;
  }
  write_bytes(view, ptr) {
    view.setUint32(ptr, this.tag, true);
    this.inner.write_bytes(view, ptr + 4);
  }
};

// node_modules/@bjorn3/browser_wasi_shim/dist/debug.js
var Debug = class Debug2 {
  enable(enabled) {
    this.log = createLogger(enabled === void 0 ? true : enabled, this.prefix);
  }
  get enabled() {
    return this.isEnabled;
  }
  constructor(isEnabled) {
    this.isEnabled = isEnabled;
    this.prefix = "wasi:";
    this.enable(isEnabled);
  }
};
function createLogger(enabled, prefix) {
  if (enabled) {
    const a = console.log.bind(console, "%c%s", "color: #265BA0", prefix);
    return a;
  } else {
    return () => {
    };
  }
}
var debug = new Debug(false);

// node_modules/@bjorn3/browser_wasi_shim/dist/wasi.js
var WASIProcExit = class extends Error {
  constructor(code) {
    super("exit with exit code " + code);
    this.code = code;
  }
};
var WASI = class WASI2 {
  start(instance) {
    this.inst = instance;
    try {
      instance.exports._start();
      return 0;
    } catch (e) {
      if (e instanceof WASIProcExit) {
        return e.code;
      } else {
        throw e;
      }
    }
  }
  initialize(instance) {
    this.inst = instance;
    if (instance.exports._initialize) {
      instance.exports._initialize();
    }
  }
  constructor(args, env, fds, options = {}) {
    this.args = [];
    this.env = [];
    this.fds = [];
    debug.enable(options.debug);
    this.args = args;
    this.env = env;
    this.fds = fds;
    const self2 = this;
    this.wasiImport = { args_sizes_get(argc, argv_buf_size) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      buffer.setUint32(argc, self2.args.length, true);
      let buf_size = 0;
      for (const arg of self2.args) {
        buf_size += arg.length + 1;
      }
      buffer.setUint32(argv_buf_size, buf_size, true);
      debug.log(buffer.getUint32(argc, true), buffer.getUint32(argv_buf_size, true));
      return 0;
    }, args_get(argv, argv_buf) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      const orig_argv_buf = argv_buf;
      for (let i = 0; i < self2.args.length; i++) {
        buffer.setUint32(argv, argv_buf, true);
        argv += 4;
        const arg = new TextEncoder().encode(self2.args[i]);
        buffer8.set(arg, argv_buf);
        buffer.setUint8(argv_buf + arg.length, 0);
        argv_buf += arg.length + 1;
      }
      if (debug.enabled) {
        debug.log(new TextDecoder("utf-8").decode(buffer8.slice(orig_argv_buf, argv_buf)));
      }
      return 0;
    }, environ_sizes_get(environ_count, environ_size) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      buffer.setUint32(environ_count, self2.env.length, true);
      let buf_size = 0;
      for (const environ of self2.env) {
        buf_size += new TextEncoder().encode(environ).length + 1;
      }
      buffer.setUint32(environ_size, buf_size, true);
      debug.log(buffer.getUint32(environ_count, true), buffer.getUint32(environ_size, true));
      return 0;
    }, environ_get(environ, environ_buf) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      const orig_environ_buf = environ_buf;
      for (let i = 0; i < self2.env.length; i++) {
        buffer.setUint32(environ, environ_buf, true);
        environ += 4;
        const e = new TextEncoder().encode(self2.env[i]);
        buffer8.set(e, environ_buf);
        buffer.setUint8(environ_buf + e.length, 0);
        environ_buf += e.length + 1;
      }
      if (debug.enabled) {
        debug.log(new TextDecoder("utf-8").decode(buffer8.slice(orig_environ_buf, environ_buf)));
      }
      return 0;
    }, clock_res_get(id, res_ptr) {
      let resolutionValue;
      switch (id) {
        case CLOCKID_MONOTONIC: {
          resolutionValue = 5000n;
          break;
        }
        case CLOCKID_REALTIME: {
          resolutionValue = 1000000n;
          break;
        }
        default:
          return ERRNO_NOSYS;
      }
      const view = new DataView(self2.inst.exports.memory.buffer);
      view.setBigUint64(res_ptr, resolutionValue, true);
      return ERRNO_SUCCESS;
    }, clock_time_get(id, precision, time) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      if (id === CLOCKID_REALTIME) {
        buffer.setBigUint64(time, BigInt((/* @__PURE__ */ new Date()).getTime()) * 1000000n, true);
      } else if (id == CLOCKID_MONOTONIC) {
        let monotonic_time;
        try {
          monotonic_time = BigInt(Math.round(performance.now() * 1e6));
        } catch (e) {
          monotonic_time = 0n;
        }
        buffer.setBigUint64(time, monotonic_time, true);
      } else {
        buffer.setBigUint64(time, 0n, true);
      }
      return 0;
    }, fd_advise(fd, offset, len, advice) {
      if (self2.fds[fd] != void 0) {
        return ERRNO_SUCCESS;
      } else {
        return ERRNO_BADF;
      }
    }, fd_allocate(fd, offset, len) {
      if (self2.fds[fd] != void 0) {
        return self2.fds[fd].fd_allocate(offset, len);
      } else {
        return ERRNO_BADF;
      }
    }, fd_close(fd) {
      if (self2.fds[fd] != void 0) {
        const ret = self2.fds[fd].fd_close();
        self2.fds[fd] = void 0;
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, fd_datasync(fd) {
      if (self2.fds[fd] != void 0) {
        return self2.fds[fd].fd_sync();
      } else {
        return ERRNO_BADF;
      }
    }, fd_fdstat_get(fd, fdstat_ptr) {
      if (self2.fds[fd] != void 0) {
        const { ret, fdstat } = self2.fds[fd].fd_fdstat_get();
        if (fdstat != null) {
          fdstat.write_bytes(new DataView(self2.inst.exports.memory.buffer), fdstat_ptr);
        }
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, fd_fdstat_set_flags(fd, flags) {
      if (self2.fds[fd] != void 0) {
        return self2.fds[fd].fd_fdstat_set_flags(flags);
      } else {
        return ERRNO_BADF;
      }
    }, fd_fdstat_set_rights(fd, fs_rights_base, fs_rights_inheriting) {
      if (self2.fds[fd] != void 0) {
        return self2.fds[fd].fd_fdstat_set_rights(fs_rights_base, fs_rights_inheriting);
      } else {
        return ERRNO_BADF;
      }
    }, fd_filestat_get(fd, filestat_ptr) {
      if (self2.fds[fd] != void 0) {
        const { ret, filestat } = self2.fds[fd].fd_filestat_get();
        if (filestat != null) {
          filestat.write_bytes(new DataView(self2.inst.exports.memory.buffer), filestat_ptr);
        }
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, fd_filestat_set_size(fd, size) {
      if (self2.fds[fd] != void 0) {
        return self2.fds[fd].fd_filestat_set_size(size);
      } else {
        return ERRNO_BADF;
      }
    }, fd_filestat_set_times(fd, atim, mtim, fst_flags) {
      if (self2.fds[fd] != void 0) {
        return self2.fds[fd].fd_filestat_set_times(atim, mtim, fst_flags);
      } else {
        return ERRNO_BADF;
      }
    }, fd_pread(fd, iovs_ptr, iovs_len, offset, nread_ptr) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const iovecs = Iovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
        let nread = 0;
        for (const iovec of iovecs) {
          const { ret, data } = self2.fds[fd].fd_pread(iovec.buf_len, offset);
          if (ret != ERRNO_SUCCESS) {
            buffer.setUint32(nread_ptr, nread, true);
            return ret;
          }
          buffer8.set(data, iovec.buf);
          nread += data.length;
          offset += BigInt(data.length);
          if (data.length != iovec.buf_len) {
            break;
          }
        }
        buffer.setUint32(nread_ptr, nread, true);
        return ERRNO_SUCCESS;
      } else {
        return ERRNO_BADF;
      }
    }, fd_prestat_get(fd, buf_ptr) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const { ret, prestat } = self2.fds[fd].fd_prestat_get();
        if (prestat != null) {
          prestat.write_bytes(buffer, buf_ptr);
        }
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, fd_prestat_dir_name(fd, path_ptr, path_len) {
      if (self2.fds[fd] != void 0) {
        const { ret, prestat } = self2.fds[fd].fd_prestat_get();
        if (prestat == null) {
          return ret;
        }
        const prestat_dir_name = prestat.inner.pr_name;
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        buffer8.set(prestat_dir_name.slice(0, path_len), path_ptr);
        return prestat_dir_name.byteLength > path_len ? ERRNO_NAMETOOLONG : ERRNO_SUCCESS;
      } else {
        return ERRNO_BADF;
      }
    }, fd_pwrite(fd, iovs_ptr, iovs_len, offset, nwritten_ptr) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const iovecs = Ciovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
        let nwritten = 0;
        for (const iovec of iovecs) {
          const data = buffer8.slice(iovec.buf, iovec.buf + iovec.buf_len);
          const { ret, nwritten: nwritten_part } = self2.fds[fd].fd_pwrite(data, offset);
          if (ret != ERRNO_SUCCESS) {
            buffer.setUint32(nwritten_ptr, nwritten, true);
            return ret;
          }
          nwritten += nwritten_part;
          offset += BigInt(nwritten_part);
          if (nwritten_part != data.byteLength) {
            break;
          }
        }
        buffer.setUint32(nwritten_ptr, nwritten, true);
        return ERRNO_SUCCESS;
      } else {
        return ERRNO_BADF;
      }
    }, fd_read(fd, iovs_ptr, iovs_len, nread_ptr) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const iovecs = Iovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
        let nread = 0;
        for (const iovec of iovecs) {
          const { ret, data } = self2.fds[fd].fd_read(iovec.buf_len);
          if (ret != ERRNO_SUCCESS) {
            buffer.setUint32(nread_ptr, nread, true);
            return ret;
          }
          buffer8.set(data, iovec.buf);
          nread += data.length;
          if (data.length != iovec.buf_len) {
            break;
          }
        }
        buffer.setUint32(nread_ptr, nread, true);
        return ERRNO_SUCCESS;
      } else {
        return ERRNO_BADF;
      }
    }, fd_readdir(fd, buf, buf_len, cookie, bufused_ptr) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        let bufused = 0;
        while (true) {
          const { ret, dirent } = self2.fds[fd].fd_readdir_single(cookie);
          if (ret != 0) {
            buffer.setUint32(bufused_ptr, bufused, true);
            return ret;
          }
          if (dirent == null) {
            break;
          }
          if (buf_len - bufused < dirent.head_length()) {
            bufused = buf_len;
            break;
          }
          const head_bytes = new ArrayBuffer(dirent.head_length());
          dirent.write_head_bytes(new DataView(head_bytes), 0);
          buffer8.set(new Uint8Array(head_bytes).slice(0, Math.min(head_bytes.byteLength, buf_len - bufused)), buf);
          buf += dirent.head_length();
          bufused += dirent.head_length();
          if (buf_len - bufused < dirent.name_length()) {
            bufused = buf_len;
            break;
          }
          dirent.write_name_bytes(buffer8, buf, buf_len - bufused);
          buf += dirent.name_length();
          bufused += dirent.name_length();
          cookie = dirent.d_next;
        }
        buffer.setUint32(bufused_ptr, bufused, true);
        return 0;
      } else {
        return ERRNO_BADF;
      }
    }, fd_renumber(fd, to) {
      if (self2.fds[fd] != void 0 && self2.fds[to] != void 0) {
        const ret = self2.fds[to].fd_close();
        if (ret != 0) {
          return ret;
        }
        self2.fds[to] = self2.fds[fd];
        self2.fds[fd] = void 0;
        return 0;
      } else {
        return ERRNO_BADF;
      }
    }, fd_seek(fd, offset, whence, offset_out_ptr) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const { ret, offset: offset_out } = self2.fds[fd].fd_seek(offset, whence);
        buffer.setBigInt64(offset_out_ptr, offset_out, true);
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, fd_sync(fd) {
      if (self2.fds[fd] != void 0) {
        return self2.fds[fd].fd_sync();
      } else {
        return ERRNO_BADF;
      }
    }, fd_tell(fd, offset_ptr) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const { ret, offset } = self2.fds[fd].fd_tell();
        buffer.setBigUint64(offset_ptr, offset, true);
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, fd_write(fd, iovs_ptr, iovs_len, nwritten_ptr) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const iovecs = Ciovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
        let nwritten = 0;
        for (const iovec of iovecs) {
          const data = buffer8.slice(iovec.buf, iovec.buf + iovec.buf_len);
          const { ret, nwritten: nwritten_part } = self2.fds[fd].fd_write(data);
          if (ret != ERRNO_SUCCESS) {
            buffer.setUint32(nwritten_ptr, nwritten, true);
            return ret;
          }
          nwritten += nwritten_part;
          if (nwritten_part != data.byteLength) {
            break;
          }
        }
        buffer.setUint32(nwritten_ptr, nwritten, true);
        return ERRNO_SUCCESS;
      } else {
        return ERRNO_BADF;
      }
    }, path_create_directory(fd, path_ptr, path_len) {
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
        return self2.fds[fd].path_create_directory(path);
      } else {
        return ERRNO_BADF;
      }
    }, path_filestat_get(fd, flags, path_ptr, path_len, filestat_ptr) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
        const { ret, filestat } = self2.fds[fd].path_filestat_get(flags, path);
        if (filestat != null) {
          filestat.write_bytes(buffer, filestat_ptr);
        }
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, path_filestat_set_times(fd, flags, path_ptr, path_len, atim, mtim, fst_flags) {
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
        return self2.fds[fd].path_filestat_set_times(flags, path, atim, mtim, fst_flags);
      } else {
        return ERRNO_BADF;
      }
    }, path_link(old_fd, old_flags, old_path_ptr, old_path_len, new_fd, new_path_ptr, new_path_len) {
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[old_fd] != void 0 && self2.fds[new_fd] != void 0) {
        const old_path = new TextDecoder("utf-8").decode(buffer8.slice(old_path_ptr, old_path_ptr + old_path_len));
        const new_path = new TextDecoder("utf-8").decode(buffer8.slice(new_path_ptr, new_path_ptr + new_path_len));
        const { ret, inode_obj } = self2.fds[old_fd].path_lookup(old_path, old_flags);
        if (inode_obj == null) {
          return ret;
        }
        return self2.fds[new_fd].path_link(new_path, inode_obj, false);
      } else {
        return ERRNO_BADF;
      }
    }, path_open(fd, dirflags, path_ptr, path_len, oflags, fs_rights_base, fs_rights_inheriting, fd_flags, opened_fd_ptr) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
        debug.log(path);
        const { ret, fd_obj } = self2.fds[fd].path_open(dirflags, path, oflags, fs_rights_base, fs_rights_inheriting, fd_flags);
        if (ret != 0) {
          return ret;
        }
        self2.fds.push(fd_obj);
        const opened_fd = self2.fds.length - 1;
        buffer.setUint32(opened_fd_ptr, opened_fd, true);
        return 0;
      } else {
        return ERRNO_BADF;
      }
    }, path_readlink(fd, path_ptr, path_len, buf_ptr, buf_len, nread_ptr) {
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
        debug.log(path);
        const { ret, data } = self2.fds[fd].path_readlink(path);
        if (data != null) {
          const data_buf = new TextEncoder().encode(data);
          if (data_buf.length > buf_len) {
            buffer.setUint32(nread_ptr, 0, true);
            return ERRNO_BADF;
          }
          buffer8.set(data_buf, buf_ptr);
          buffer.setUint32(nread_ptr, data_buf.length, true);
        }
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, path_remove_directory(fd, path_ptr, path_len) {
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
        return self2.fds[fd].path_remove_directory(path);
      } else {
        return ERRNO_BADF;
      }
    }, path_rename(fd, old_path_ptr, old_path_len, new_fd, new_path_ptr, new_path_len) {
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0 && self2.fds[new_fd] != void 0) {
        const old_path = new TextDecoder("utf-8").decode(buffer8.slice(old_path_ptr, old_path_ptr + old_path_len));
        const new_path = new TextDecoder("utf-8").decode(buffer8.slice(new_path_ptr, new_path_ptr + new_path_len));
        let { ret, inode_obj } = self2.fds[fd].path_unlink(old_path);
        if (inode_obj == null) {
          return ret;
        }
        ret = self2.fds[new_fd].path_link(new_path, inode_obj, true);
        if (ret != ERRNO_SUCCESS) {
          if (self2.fds[fd].path_link(old_path, inode_obj, true) != ERRNO_SUCCESS) {
            throw "path_link should always return success when relinking an inode back to the original place";
          }
        }
        return ret;
      } else {
        return ERRNO_BADF;
      }
    }, path_symlink(old_path_ptr, old_path_len, fd, new_path_ptr, new_path_len) {
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const old_path = new TextDecoder("utf-8").decode(buffer8.slice(old_path_ptr, old_path_ptr + old_path_len));
        const new_path = new TextDecoder("utf-8").decode(buffer8.slice(new_path_ptr, new_path_ptr + new_path_len));
        return ERRNO_NOTSUP;
      } else {
        return ERRNO_BADF;
      }
    }, path_unlink_file(fd, path_ptr, path_len) {
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
      if (self2.fds[fd] != void 0) {
        const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
        return self2.fds[fd].path_unlink_file(path);
      } else {
        return ERRNO_BADF;
      }
    }, poll_oneoff(in_ptr, out_ptr, nsubscriptions) {
      if (nsubscriptions === 0) {
        return ERRNO_INVAL;
      }
      if (nsubscriptions > 1) {
        debug.log("poll_oneoff: only a single subscription is supported");
        return ERRNO_NOTSUP;
      }
      const buffer = new DataView(self2.inst.exports.memory.buffer);
      const s = Subscription.read_bytes(buffer, in_ptr);
      const eventtype = s.eventtype;
      const clockid = s.clockid;
      const timeout = s.timeout;
      if (eventtype !== EVENTTYPE_CLOCK) {
        debug.log("poll_oneoff: only clock subscriptions are supported");
        return ERRNO_NOTSUP;
      }
      let getNow = void 0;
      if (clockid === CLOCKID_MONOTONIC) {
        getNow = () => BigInt(Math.round(performance.now() * 1e6));
      } else if (clockid === CLOCKID_REALTIME) {
        getNow = () => BigInt((/* @__PURE__ */ new Date()).getTime()) * 1000000n;
      } else {
        return ERRNO_INVAL;
      }
      const endTime = (s.flags & SUBCLOCKFLAGS_SUBSCRIPTION_CLOCK_ABSTIME) !== 0 ? timeout : getNow() + timeout;
      while (endTime > getNow()) {
      }
      const event = new Event(s.userdata, ERRNO_SUCCESS, eventtype);
      event.write_bytes(buffer, out_ptr);
      return ERRNO_SUCCESS;
    }, proc_exit(exit_code) {
      throw new WASIProcExit(exit_code);
    }, proc_raise(sig) {
      throw "raised signal " + sig;
    }, sched_yield() {
    }, random_get(buf, buf_len) {
      const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer).subarray(buf, buf + buf_len);
      if ("crypto" in globalThis && (typeof SharedArrayBuffer === "undefined" || !(self2.inst.exports.memory.buffer instanceof SharedArrayBuffer))) {
        for (let i = 0; i < buf_len; i += 65536) {
          crypto.getRandomValues(buffer8.subarray(i, i + 65536));
        }
      } else {
        for (let i = 0; i < buf_len; i++) {
          buffer8[i] = Math.random() * 256 | 0;
        }
      }
    }, sock_recv(fd, ri_data, ri_flags) {
      throw "sockets not supported";
    }, sock_send(fd, si_data, si_flags) {
      throw "sockets not supported";
    }, sock_shutdown(fd, how) {
      throw "sockets not supported";
    }, sock_accept(fd, flags) {
      throw "sockets not supported";
    } };
  }
};

// node_modules/@bjorn3/browser_wasi_shim/dist/fd.js
var Fd = class {
  fd_allocate(offset, len) {
    return ERRNO_NOTSUP;
  }
  fd_close() {
    return 0;
  }
  fd_fdstat_get() {
    return { ret: ERRNO_NOTSUP, fdstat: null };
  }
  fd_fdstat_set_flags(flags) {
    return ERRNO_NOTSUP;
  }
  fd_fdstat_set_rights(fs_rights_base, fs_rights_inheriting) {
    return ERRNO_NOTSUP;
  }
  fd_filestat_get() {
    return { ret: ERRNO_NOTSUP, filestat: null };
  }
  fd_filestat_set_size(size) {
    return ERRNO_NOTSUP;
  }
  fd_filestat_set_times(atim, mtim, fst_flags) {
    return ERRNO_NOTSUP;
  }
  fd_pread(size, offset) {
    return { ret: ERRNO_NOTSUP, data: new Uint8Array() };
  }
  fd_prestat_get() {
    return { ret: ERRNO_NOTSUP, prestat: null };
  }
  fd_pwrite(data, offset) {
    return { ret: ERRNO_NOTSUP, nwritten: 0 };
  }
  fd_read(size) {
    return { ret: ERRNO_NOTSUP, data: new Uint8Array() };
  }
  fd_readdir_single(cookie) {
    return { ret: ERRNO_NOTSUP, dirent: null };
  }
  fd_seek(offset, whence) {
    return { ret: ERRNO_NOTSUP, offset: 0n };
  }
  fd_sync() {
    return 0;
  }
  fd_tell() {
    return { ret: ERRNO_NOTSUP, offset: 0n };
  }
  fd_write(data) {
    return { ret: ERRNO_NOTSUP, nwritten: 0 };
  }
  path_create_directory(path) {
    return ERRNO_NOTSUP;
  }
  path_filestat_get(flags, path) {
    return { ret: ERRNO_NOTSUP, filestat: null };
  }
  path_filestat_set_times(flags, path, atim, mtim, fst_flags) {
    return ERRNO_NOTSUP;
  }
  path_link(path, inode, allow_dir) {
    return ERRNO_NOTSUP;
  }
  path_unlink(path) {
    return { ret: ERRNO_NOTSUP, inode_obj: null };
  }
  path_lookup(path, dirflags) {
    return { ret: ERRNO_NOTSUP, inode_obj: null };
  }
  path_open(dirflags, path, oflags, fs_rights_base, fs_rights_inheriting, fd_flags) {
    return { ret: ERRNO_NOTDIR, fd_obj: null };
  }
  path_readlink(path) {
    return { ret: ERRNO_NOTSUP, data: null };
  }
  path_remove_directory(path) {
    return ERRNO_NOTSUP;
  }
  path_rename(old_path, new_fd, new_path) {
    return ERRNO_NOTSUP;
  }
  path_unlink_file(path) {
    return ERRNO_NOTSUP;
  }
};
var Inode = class _Inode {
  static issue_ino() {
    return _Inode.next_ino++;
  }
  static root_ino() {
    return 0n;
  }
  constructor() {
    this.ino = _Inode.issue_ino();
  }
};
Inode.next_ino = 1n;

// node_modules/@bjorn3/browser_wasi_shim/dist/fs_mem.js
var OpenFile = class extends Fd {
  fd_allocate(offset, len) {
    if (this.file.size > offset + len) {
    } else {
      const new_data = new Uint8Array(Number(offset + len));
      new_data.set(this.file.data, 0);
      this.file.data = new_data;
    }
    return ERRNO_SUCCESS;
  }
  fd_fdstat_get() {
    return { ret: 0, fdstat: new Fdstat(FILETYPE_REGULAR_FILE, 0) };
  }
  fd_filestat_set_size(size) {
    if (this.file.size > size) {
      this.file.data = new Uint8Array(this.file.data.buffer.slice(0, Number(size)));
    } else {
      const new_data = new Uint8Array(Number(size));
      new_data.set(this.file.data, 0);
      this.file.data = new_data;
    }
    return ERRNO_SUCCESS;
  }
  fd_read(size) {
    const slice = this.file.data.slice(Number(this.file_pos), Number(this.file_pos + BigInt(size)));
    this.file_pos += BigInt(slice.length);
    return { ret: 0, data: slice };
  }
  fd_pread(size, offset) {
    const slice = this.file.data.slice(Number(offset), Number(offset + BigInt(size)));
    return { ret: 0, data: slice };
  }
  fd_seek(offset, whence) {
    let calculated_offset;
    switch (whence) {
      case WHENCE_SET:
        calculated_offset = offset;
        break;
      case WHENCE_CUR:
        calculated_offset = this.file_pos + offset;
        break;
      case WHENCE_END:
        calculated_offset = BigInt(this.file.data.byteLength) + offset;
        break;
      default:
        return { ret: ERRNO_INVAL, offset: 0n };
    }
    if (calculated_offset < 0) {
      return { ret: ERRNO_INVAL, offset: 0n };
    }
    this.file_pos = calculated_offset;
    return { ret: 0, offset: this.file_pos };
  }
  fd_tell() {
    return { ret: 0, offset: this.file_pos };
  }
  fd_write(data) {
    if (this.file.readonly) return { ret: ERRNO_BADF, nwritten: 0 };
    if (this.file_pos + BigInt(data.byteLength) > this.file.size) {
      const old = this.file.data;
      this.file.data = new Uint8Array(Number(this.file_pos + BigInt(data.byteLength)));
      this.file.data.set(old);
    }
    this.file.data.set(data, Number(this.file_pos));
    this.file_pos += BigInt(data.byteLength);
    return { ret: 0, nwritten: data.byteLength };
  }
  fd_pwrite(data, offset) {
    if (this.file.readonly) return { ret: ERRNO_BADF, nwritten: 0 };
    if (offset + BigInt(data.byteLength) > this.file.size) {
      const old = this.file.data;
      this.file.data = new Uint8Array(Number(offset + BigInt(data.byteLength)));
      this.file.data.set(old);
    }
    this.file.data.set(data, Number(offset));
    return { ret: 0, nwritten: data.byteLength };
  }
  fd_filestat_get() {
    return { ret: 0, filestat: this.file.stat() };
  }
  constructor(file) {
    super();
    this.file_pos = 0n;
    this.file = file;
  }
};
var OpenDirectory = class extends Fd {
  fd_seek(offset, whence) {
    return { ret: ERRNO_BADF, offset: 0n };
  }
  fd_tell() {
    return { ret: ERRNO_BADF, offset: 0n };
  }
  fd_allocate(offset, len) {
    return ERRNO_BADF;
  }
  fd_fdstat_get() {
    return { ret: 0, fdstat: new Fdstat(FILETYPE_DIRECTORY, 0) };
  }
  fd_readdir_single(cookie) {
    if (debug.enabled) {
      debug.log("readdir_single", cookie);
      debug.log(cookie, this.dir.contents.keys());
    }
    if (cookie == 0n) {
      return { ret: ERRNO_SUCCESS, dirent: new Dirent(1n, this.dir.ino, ".", FILETYPE_DIRECTORY) };
    } else if (cookie == 1n) {
      return { ret: ERRNO_SUCCESS, dirent: new Dirent(2n, this.dir.parent_ino(), "..", FILETYPE_DIRECTORY) };
    }
    if (cookie >= BigInt(this.dir.contents.size) + 2n) {
      return { ret: 0, dirent: null };
    }
    const [name, entry] = Array.from(this.dir.contents.entries())[Number(cookie - 2n)];
    return { ret: 0, dirent: new Dirent(cookie + 1n, entry.ino, name, entry.stat().filetype) };
  }
  path_filestat_get(flags, path_str) {
    const { ret: path_err, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_err, filestat: null };
    }
    const { ret, entry } = this.dir.get_entry_for_path(path);
    if (entry == null) {
      return { ret, filestat: null };
    }
    return { ret: 0, filestat: entry.stat() };
  }
  path_lookup(path_str, dirflags) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_ret, inode_obj: null };
    }
    const { ret, entry } = this.dir.get_entry_for_path(path);
    if (entry == null) {
      return { ret, inode_obj: null };
    }
    return { ret: ERRNO_SUCCESS, inode_obj: entry };
  }
  path_open(dirflags, path_str, oflags, fs_rights_base, fs_rights_inheriting, fd_flags) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_ret, fd_obj: null };
    }
    let { ret, entry } = this.dir.get_entry_for_path(path);
    if (entry == null) {
      if (ret != ERRNO_NOENT) {
        return { ret, fd_obj: null };
      }
      if ((oflags & OFLAGS_CREAT) == OFLAGS_CREAT) {
        const { ret: ret2, entry: new_entry } = this.dir.create_entry_for_path(path_str, (oflags & OFLAGS_DIRECTORY) == OFLAGS_DIRECTORY);
        if (new_entry == null) {
          return { ret: ret2, fd_obj: null };
        }
        entry = new_entry;
      } else {
        return { ret: ERRNO_NOENT, fd_obj: null };
      }
    } else if ((oflags & OFLAGS_EXCL) == OFLAGS_EXCL) {
      return { ret: ERRNO_EXIST, fd_obj: null };
    }
    if ((oflags & OFLAGS_DIRECTORY) == OFLAGS_DIRECTORY && entry.stat().filetype !== FILETYPE_DIRECTORY) {
      return { ret: ERRNO_NOTDIR, fd_obj: null };
    }
    return entry.path_open(oflags, fs_rights_base, fd_flags);
  }
  path_create_directory(path) {
    return this.path_open(0, path, OFLAGS_CREAT | OFLAGS_DIRECTORY, 0n, 0n, 0).ret;
  }
  path_link(path_str, inode, allow_dir) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return path_ret;
    }
    if (path.is_dir) {
      return ERRNO_NOENT;
    }
    const { ret: parent_ret, parent_entry, filename, entry } = this.dir.get_parent_dir_and_entry_for_path(path, true);
    if (parent_entry == null || filename == null) {
      return parent_ret;
    }
    if (entry != null) {
      const source_is_dir = inode.stat().filetype == FILETYPE_DIRECTORY;
      const target_is_dir = entry.stat().filetype == FILETYPE_DIRECTORY;
      if (source_is_dir && target_is_dir) {
        if (allow_dir && entry instanceof Directory) {
          if (entry.contents.size == 0) {
          } else {
            return ERRNO_NOTEMPTY;
          }
        } else {
          return ERRNO_EXIST;
        }
      } else if (source_is_dir && !target_is_dir) {
        return ERRNO_NOTDIR;
      } else if (!source_is_dir && target_is_dir) {
        return ERRNO_ISDIR;
      } else if (inode.stat().filetype == FILETYPE_REGULAR_FILE && entry.stat().filetype == FILETYPE_REGULAR_FILE) {
      } else {
        return ERRNO_EXIST;
      }
    }
    if (!allow_dir && inode.stat().filetype == FILETYPE_DIRECTORY) {
      return ERRNO_PERM;
    }
    parent_entry.contents.set(filename, inode);
    return ERRNO_SUCCESS;
  }
  path_unlink(path_str) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_ret, inode_obj: null };
    }
    const { ret: parent_ret, parent_entry, filename, entry } = this.dir.get_parent_dir_and_entry_for_path(path, true);
    if (parent_entry == null || filename == null) {
      return { ret: parent_ret, inode_obj: null };
    }
    if (entry == null) {
      return { ret: ERRNO_NOENT, inode_obj: null };
    }
    parent_entry.contents.delete(filename);
    return { ret: ERRNO_SUCCESS, inode_obj: entry };
  }
  path_unlink_file(path_str) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return path_ret;
    }
    const { ret: parent_ret, parent_entry, filename, entry } = this.dir.get_parent_dir_and_entry_for_path(path, false);
    if (parent_entry == null || filename == null || entry == null) {
      return parent_ret;
    }
    if (entry.stat().filetype === FILETYPE_DIRECTORY) {
      return ERRNO_ISDIR;
    }
    parent_entry.contents.delete(filename);
    return ERRNO_SUCCESS;
  }
  path_remove_directory(path_str) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return path_ret;
    }
    const { ret: parent_ret, parent_entry, filename, entry } = this.dir.get_parent_dir_and_entry_for_path(path, false);
    if (parent_entry == null || filename == null || entry == null) {
      return parent_ret;
    }
    if (!(entry instanceof Directory) || entry.stat().filetype !== FILETYPE_DIRECTORY) {
      return ERRNO_NOTDIR;
    }
    if (entry.contents.size !== 0) {
      return ERRNO_NOTEMPTY;
    }
    if (!parent_entry.contents.delete(filename)) {
      return ERRNO_NOENT;
    }
    return ERRNO_SUCCESS;
  }
  fd_filestat_get() {
    return { ret: 0, filestat: this.dir.stat() };
  }
  fd_filestat_set_size(size) {
    return ERRNO_BADF;
  }
  fd_read(size) {
    return { ret: ERRNO_BADF, data: new Uint8Array() };
  }
  fd_pread(size, offset) {
    return { ret: ERRNO_BADF, data: new Uint8Array() };
  }
  fd_write(data) {
    return { ret: ERRNO_BADF, nwritten: 0 };
  }
  fd_pwrite(data, offset) {
    return { ret: ERRNO_BADF, nwritten: 0 };
  }
  constructor(dir) {
    super();
    this.dir = dir;
  }
};
var PreopenDirectory = class extends OpenDirectory {
  fd_prestat_get() {
    return { ret: 0, prestat: Prestat.dir(this.prestat_name) };
  }
  constructor(name, contents) {
    super(new Directory(contents));
    this.prestat_name = name;
  }
};
var File = class extends Inode {
  path_open(oflags, fs_rights_base, fd_flags) {
    if (this.readonly && (fs_rights_base & BigInt(RIGHTS_FD_WRITE)) == BigInt(RIGHTS_FD_WRITE)) {
      return { ret: ERRNO_PERM, fd_obj: null };
    }
    if ((oflags & OFLAGS_TRUNC) == OFLAGS_TRUNC) {
      if (this.readonly) return { ret: ERRNO_PERM, fd_obj: null };
      this.data = new Uint8Array([]);
    }
    const file = new OpenFile(this);
    if (fd_flags & FDFLAGS_APPEND) file.fd_seek(0n, WHENCE_END);
    return { ret: ERRNO_SUCCESS, fd_obj: file };
  }
  get size() {
    return BigInt(this.data.byteLength);
  }
  stat() {
    return new Filestat(this.ino, FILETYPE_REGULAR_FILE, this.size);
  }
  constructor(data, options) {
    super();
    this.data = new Uint8Array(data);
    this.readonly = !!options?.readonly;
  }
};
var Path = class Path2 {
  static from(path) {
    const self2 = new Path2();
    self2.is_dir = path.endsWith("/");
    if (path.startsWith("/")) {
      return { ret: ERRNO_NOTCAPABLE, path: null };
    }
    if (path.includes("\0")) {
      return { ret: ERRNO_INVAL, path: null };
    }
    for (const component of path.split("/")) {
      if (component === "" || component === ".") {
        continue;
      }
      if (component === "..") {
        if (self2.parts.pop() == void 0) {
          return { ret: ERRNO_NOTCAPABLE, path: null };
        }
        continue;
      }
      self2.parts.push(component);
    }
    return { ret: ERRNO_SUCCESS, path: self2 };
  }
  to_path_string() {
    let s = this.parts.join("/");
    if (this.is_dir) {
      s += "/";
    }
    return s;
  }
  constructor() {
    this.parts = [];
    this.is_dir = false;
  }
};
var Directory = class _Directory extends Inode {
  parent_ino() {
    if (this.parent == null) {
      return Inode.root_ino();
    }
    return this.parent.ino;
  }
  path_open(oflags, fs_rights_base, fd_flags) {
    return { ret: ERRNO_SUCCESS, fd_obj: new OpenDirectory(this) };
  }
  stat() {
    return new Filestat(this.ino, FILETYPE_DIRECTORY, 0n);
  }
  get_entry_for_path(path) {
    let entry = this;
    for (const component of path.parts) {
      if (!(entry instanceof _Directory)) {
        return { ret: ERRNO_NOTDIR, entry: null };
      }
      const child = entry.contents.get(component);
      if (child !== void 0) {
        entry = child;
      } else {
        debug.log(component);
        return { ret: ERRNO_NOENT, entry: null };
      }
    }
    if (path.is_dir) {
      if (entry.stat().filetype != FILETYPE_DIRECTORY) {
        return { ret: ERRNO_NOTDIR, entry: null };
      }
    }
    return { ret: ERRNO_SUCCESS, entry };
  }
  get_parent_dir_and_entry_for_path(path, allow_undefined) {
    const filename = path.parts.pop();
    if (filename === void 0) {
      return { ret: ERRNO_INVAL, parent_entry: null, filename: null, entry: null };
    }
    const { ret: entry_ret, entry: parent_entry } = this.get_entry_for_path(path);
    if (parent_entry == null) {
      return { ret: entry_ret, parent_entry: null, filename: null, entry: null };
    }
    if (!(parent_entry instanceof _Directory)) {
      return { ret: ERRNO_NOTDIR, parent_entry: null, filename: null, entry: null };
    }
    const entry = parent_entry.contents.get(filename);
    if (entry === void 0) {
      if (!allow_undefined) {
        return { ret: ERRNO_NOENT, parent_entry: null, filename: null, entry: null };
      } else {
        return { ret: ERRNO_SUCCESS, parent_entry, filename, entry: null };
      }
    }
    if (path.is_dir) {
      if (entry.stat().filetype != FILETYPE_DIRECTORY) {
        return { ret: ERRNO_NOTDIR, parent_entry: null, filename: null, entry: null };
      }
    }
    return { ret: ERRNO_SUCCESS, parent_entry, filename, entry };
  }
  create_entry_for_path(path_str, is_dir) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_ret, entry: null };
    }
    let { ret: parent_ret, parent_entry, filename, entry } = this.get_parent_dir_and_entry_for_path(path, true);
    if (parent_entry == null || filename == null) {
      return { ret: parent_ret, entry: null };
    }
    if (entry != null) {
      return { ret: ERRNO_EXIST, entry: null };
    }
    debug.log("create", path);
    let new_child;
    if (!is_dir) {
      new_child = new File(new ArrayBuffer(0));
    } else {
      new_child = new _Directory(/* @__PURE__ */ new Map());
    }
    parent_entry.contents.set(filename, new_child);
    entry = new_child;
    return { ret: ERRNO_SUCCESS, entry };
  }
  constructor(contents) {
    super();
    this.parent = null;
    if (contents instanceof Array) {
      this.contents = new Map(contents);
    } else {
      this.contents = contents;
    }
    for (const entry of this.contents.values()) {
      if (entry instanceof _Directory) {
        entry.parent = this;
      }
    }
  }
};
var ConsoleStdout = class _ConsoleStdout extends Fd {
  fd_filestat_get() {
    const filestat = new Filestat(this.ino, FILETYPE_CHARACTER_DEVICE, BigInt(0));
    return { ret: 0, filestat };
  }
  fd_fdstat_get() {
    const fdstat = new Fdstat(FILETYPE_CHARACTER_DEVICE, 0);
    fdstat.fs_rights_base = BigInt(RIGHTS_FD_WRITE);
    return { ret: 0, fdstat };
  }
  fd_write(data) {
    this.write(data);
    return { ret: 0, nwritten: data.byteLength };
  }
  static lineBuffered(write) {
    const dec = new TextDecoder("utf-8", { fatal: false });
    let line_buf = "";
    return new _ConsoleStdout((buffer) => {
      line_buf += dec.decode(buffer, { stream: true });
      const lines = line_buf.split("\n");
      for (const [i, line] of lines.entries()) {
        if (i < lines.length - 1) {
          write(line);
        } else {
          line_buf = line;
        }
      }
    });
  }
  constructor(write) {
    super();
    this.ino = Inode.issue_ino();
    this.write = write;
  }
};

// node_modules/pandoc-wasm/src/core.js
function createPandocInstance(wasmBinary) {
  const args = ["pandoc.wasm", "+RTS", "-H64m", "-RTS"];
  const env = [];
  const fileSystem = /* @__PURE__ */ new Map();
  const fds = [
    new OpenFile(new File(new Uint8Array(), { readonly: true })),
    ConsoleStdout.lineBuffered((msg) => console.log(`[WASI stdout] ${msg}`)),
    ConsoleStdout.lineBuffered((msg) => console.warn(`[WASI stderr] ${msg}`)),
    new PreopenDirectory("/", fileSystem)
  ];
  const options = { debug: false };
  const wasi = new WASI(args, env, fds, options);
  return WebAssembly.instantiate(wasmBinary, {
    wasi_snapshot_preview1: wasi.wasiImport
  }).then(({ instance }) => {
    wasi.initialize(instance);
    instance.exports.__wasm_call_ctors();
    function memory_data_view() {
      return new DataView(instance.exports.memory.buffer);
    }
    const argc_ptr = instance.exports.malloc(4);
    memory_data_view().setUint32(argc_ptr, args.length, true);
    const argv = instance.exports.malloc(4 * (args.length + 1));
    for (let i = 0; i < args.length; ++i) {
      const arg = instance.exports.malloc(args[i].length + 1);
      new TextEncoder().encodeInto(
        args[i],
        new Uint8Array(
          instance.exports.memory.buffer,
          arg,
          args[i].length
        )
      );
      memory_data_view().setUint8(arg + args[i].length, 0);
      memory_data_view().setUint32(argv + 4 * i, arg, true);
    }
    memory_data_view().setUint32(argv + 4 * args.length, 0, true);
    const argv_ptr = instance.exports.malloc(4);
    memory_data_view().setUint32(argv_ptr, argv, true);
    instance.exports.hs_init_with_rtsopts(argc_ptr, argv_ptr);
    async function addFile(filename, data, readonly) {
      let uint8Array;
      if (typeof data === "string") {
        uint8Array = new TextEncoder().encode(data);
      } else {
        const buffer = await data.arrayBuffer();
        uint8Array = new Uint8Array(buffer);
      }
      const file = new File(uint8Array, { readonly });
      fileSystem.set(filename, file);
    }
    function query(options2) {
      const opts_str = JSON.stringify(options2);
      const encoded = new TextEncoder().encode(opts_str);
      const opts_ptr = instance.exports.malloc(encoded.length);
      new TextEncoder().encodeInto(
        opts_str,
        new Uint8Array(
          instance.exports.memory.buffer,
          opts_ptr,
          encoded.length
        )
      );
      fileSystem.clear();
      const out_file = new File(new Uint8Array(), { readonly: false });
      const err_file = new File(new Uint8Array(), { readonly: false });
      fileSystem.set("stdout", out_file);
      fileSystem.set("stderr", err_file);
      instance.exports.query(opts_ptr, encoded.length);
      const err_text = new TextDecoder("utf-8", { fatal: true }).decode(
        err_file.data
      );
      if (err_text) {
        console.log(err_text);
      }
      const out_text = new TextDecoder("utf-8", { fatal: true }).decode(
        out_file.data
      );
      return JSON.parse(out_text);
    }
    async function convert(options2, stdin, files) {
      const opts_str = JSON.stringify(options2);
      const encoded = new TextEncoder().encode(opts_str);
      const opts_ptr = instance.exports.malloc(encoded.length);
      new TextEncoder().encodeInto(
        opts_str,
        new Uint8Array(
          instance.exports.memory.buffer,
          opts_ptr,
          encoded.length
        )
      );
      files = { ...files };
      fileSystem.clear();
      const in_file = new File(new Uint8Array(), { readonly: true });
      const out_file = new File(new Uint8Array(), { readonly: false });
      const err_file = new File(new Uint8Array(), { readonly: false });
      const warnings_file = new File(new Uint8Array(), { readonly: false });
      fileSystem.set("stdin", in_file);
      fileSystem.set("stdout", out_file);
      fileSystem.set("stderr", err_file);
      fileSystem.set("warnings", warnings_file);
      const knownFiles = /* @__PURE__ */ new Set([
        "stdin",
        "stdout",
        "stderr",
        "warnings"
      ]);
      for (const filename in files) {
        await addFile(filename, files[filename], true);
        knownFiles.add(filename);
      }
      const outputFileName = options2["output-file"] || null;
      const extractMediaPath = options2["extract-media"] || null;
      if (outputFileName) {
        await addFile(outputFileName, new Blob(), false);
        knownFiles.add(outputFileName);
      }
      if (extractMediaPath && extractMediaPath.endsWith(".zip")) {
        await addFile(extractMediaPath, new Blob(), false);
        knownFiles.add(extractMediaPath);
      }
      if (stdin) {
        in_file.data = new TextEncoder().encode(stdin);
      }
      instance.exports.convert(opts_ptr, encoded.length);
      if (options2["output-file"]) {
        const outputFile = fileSystem.get(options2["output-file"]);
        if (outputFile && outputFile.data && outputFile.data.length > 0) {
          files[options2["output-file"]] = new Blob([outputFile.data]);
        }
      }
      if (options2["extract-media"]) {
        const mediaFile = fileSystem.get(options2["extract-media"]);
        if (mediaFile && mediaFile.data && mediaFile.data.length > 0) {
          files[options2["extract-media"]] = new Blob(
            [mediaFile.data],
            {
              type: "application/zip"
            }
          );
        }
      }
      const mediaFiles = {};
      const collectNewFiles = (map, prefix) => {
        for (const [name, entry] of map.entries()) {
          const path = prefix ? `${prefix}/${name}` : name;
          if (entry instanceof Directory) {
            collectNewFiles(entry.contents, path);
          } else if (!knownFiles.has(path) && entry.data && entry.data.length > 0) {
            const blob = new Blob([entry.data]);
            files[path] = blob;
            mediaFiles[path] = blob;
          }
        }
      };
      collectNewFiles(fileSystem, "");
      const rawWarnings = new TextDecoder("utf-8", { fatal: true }).decode(
        warnings_file.data
      );
      let warnings = [];
      if (rawWarnings) {
        try {
          warnings = JSON.parse(rawWarnings);
        } catch (e) {
          console.warn("Failed to parse warnings:", e);
        }
      }
      return {
        stdout: new TextDecoder("utf-8", { fatal: true }).decode(
          out_file.data
        ),
        stderr: new TextDecoder("utf-8", { fatal: true }).decode(
          err_file.data
        ),
        warnings,
        files,
        mediaFiles
      };
    }
    async function toUint8Array(inData) {
      let uint8Array;
      if (typeof inData === "string") {
        const encoder = new TextEncoder();
        uint8Array = encoder.encode(inData);
      } else if (inData instanceof Blob) {
        const arrayBuffer = await inData.arrayBuffer();
        uint8Array = new Uint8Array(arrayBuffer);
      } else {
        throw new Error(
          "Unsupported type: inData must be a string or a Blob"
        );
      }
      return uint8Array;
    }
    const textDecoder = new TextDecoder("utf-8", { fatal: true });
    function convertData(data) {
      let outData;
      try {
        outData = textDecoder.decode(data);
      } catch (_e) {
        outData = new Blob([data]);
      }
      return outData;
    }
    async function pandoc2(args_str, inData, resources = []) {
      const argParts = args_str.trim().split(/\s+/);
      const options2 = {};
      const files = {};
      let i = 0;
      while (i < argParts.length) {
        const arg = argParts[i];
        if (arg === "-f" || arg === "--from") {
          options2.from = argParts[++i];
        } else if (arg === "-t" || arg === "--to") {
          options2.to = argParts[++i];
        } else if (arg === "-o" || arg === "--output") {
          options2["output-file"] = argParts[++i];
        } else if (arg === "-s" || arg === "--standalone") {
          options2.standalone = true;
        } else if (arg === "--extract-media") {
          options2["extract-media"] = argParts[++i];
        } else if (arg === "--toc" || arg === "--table-of-contents") {
          options2["table-of-contents"] = true;
        }
        i++;
      }
      for (const resource of resources) {
        if (typeof resource.contents === "string") {
          files[resource.filename] = resource.contents;
        } else {
          const contents = await toUint8Array(resource.contents);
          files[resource.filename] = new Blob([contents]);
        }
      }
      let stdin = null;
      if (inData) {
        if (typeof inData === "string") {
          stdin = inData;
        } else {
          const uint8Array = await toUint8Array(inData);
          stdin = new TextDecoder("utf-8").decode(uint8Array);
        }
      }
      const result = await convert(options2, stdin, files);
      const mediaFiles = /* @__PURE__ */ new Map();
      for (const [name, blob] of Object.entries(result.mediaFiles)) {
        mediaFiles.set(
          name,
          convertData(new Uint8Array(await blob.arrayBuffer()))
        );
      }
      let out;
      if (options2["output-file"] && result.files[options2["output-file"]]) {
        out = convertData(
          new Uint8Array(
            await result.files[options2["output-file"]].arrayBuffer()
          )
        );
      } else {
        out = result.stdout;
      }
      return {
        out,
        mediaFiles
      };
    }
    return {
      convert,
      query,
      pandoc: pandoc2
    };
  });
}

// node_modules/@myriaddreamin/typst.ts/dist/esm/index.mjs
init_options_init();
init_options_init();
init_renderer();

// node_modules/@myriaddreamin/typst.ts/dist/esm/fs/memory.mjs
var MemoryAccessModel = class {
  mTimes = /* @__PURE__ */ new Map();
  mData = /* @__PURE__ */ new Map();
  constructor() {
  }
  reset() {
    this.mTimes.clear();
    this.mData.clear();
  }
  insertFile(path, data, mtime) {
    this.mTimes.set(path, mtime);
    this.mData.set(path, data);
  }
  removeFile(path) {
    this.mTimes.delete(path);
    this.mData.delete(path);
  }
  getMTime(path) {
    if (!path.startsWith("/@memory/")) {
      return void 0;
    }
    if (this.mTimes.has(path)) {
      return this.mTimes.get(path);
    }
    return void 0;
  }
  isFile() {
    return true;
  }
  getRealPath(path) {
    return path;
  }
  readAll(path) {
    if (!path.startsWith("/@memory/")) {
      return void 0;
    }
    if (this.mData.has(path)) {
      return this.mData.get(path);
    }
    return void 0;
  }
};

// node_modules/@myriaddreamin/typst.ts/dist/esm/fs/package.mjs
var FetchPackageRegistry = class {
  am;
  cache = /* @__PURE__ */ new Map();
  constructor(am) {
    this.am = am;
  }
  resolvePath(path) {
    return `https://packages.typst.org/preview/${path.name}-${path.version}.tar.gz`;
  }
  pullPackageData(path) {
    const request = new XMLHttpRequest();
    request.overrideMimeType("text/plain; charset=x-user-defined");
    request.open("GET", this.resolvePath(path), false);
    request.send(null);
    if (request.status === 200 && (request.response instanceof String || typeof request.response === "string")) {
      return Uint8Array.from(request.response, (c) => c.charCodeAt(0));
    }
    return void 0;
  }
  resolve(spec, context) {
    if (spec.namespace !== "preview") {
      return void 0;
    }
    const path = this.resolvePath(spec);
    if (this.cache.has(path)) {
      return this.cache.get(path)();
    }
    const data = this.pullPackageData(spec);
    if (!data) {
      return void 0;
    }
    const previewDir = `/@memory/fetch/packages/${spec.namespace}/${spec.name}/${spec.version}`;
    const entries = [];
    context.untar(data, (path2, data2, mtime) => {
      entries.push([previewDir + "/" + path2, data2, new Date(mtime)]);
    });
    const cacheClosure = () => {
      for (const [path2, data2, mtime] of entries) {
        this.am.insertFile(path2, data2, mtime);
      }
      return previewDir;
    };
    this.cache.set(path, cacheClosure);
    return cacheClosure();
  }
};

// node_modules/@myriaddreamin/typst.ts/dist/esm/index.mjs
init_compiler();

// node_modules/@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs
init_options_init();
init_init();

// node_modules/@myriaddreamin/typst.ts/dist/esm/utils.mjs
function randstr(prefix) {
  return Math.random().toString(36).replace("0.", prefix || "");
}

// node_modules/@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs
init_compiler();
var isNode2 = (
  // @ts-ignore
  typeof process !== "undefined" && process.versions != null && process.versions.node != null
);
var TypstSnippet = class _TypstSnippet {
  /** @internal */
  mainFilePath;
  /** @internal */
  cc;
  /** @internal */
  fr;
  /** @internal */
  ex;
  /**
   * Create a new instance of {@link TypstSnippet}.
   * @param cc the compiler instance, see {@link PromiseJust} and {@link TypstCompiler}.
   * @param ex the renderer instance, see {@link PromiseJust} and {@link TypstRenderer}.
   *
   * @example
   *
   * Passes a global shared compiler instance that get initialized lazily:
   * ```typescript
   * const $typst = new TypstSnippet(() => {
   *  return createGlobalCompiler(createTypstCompiler, initOptions);
   * });
   *
   */
  constructor(options) {
    this.cc = options?.compiler || _TypstSnippet.buildLocalCompiler;
    this.fr = options?.fontResolver || _TypstSnippet.buildLocalFontResolver;
    this.ex = options?.renderer || _TypstSnippet.buildLocalRenderer;
    this.mainFilePath = "/main.typ";
    this.providers = [];
  }
  /**
   * Set lazy initialized compiler instance for the utility instance.
   * @param cc the compiler instance, see {@link PromiseJust} and {@link TypstCompiler}.
   */
  setCompiler(cc) {
    this.cc = cc;
  }
  async getFontResolver() {
    return typeof this.fr === "function" ? this.fr = await this.fr() : this.fr;
  }
  /**
   * Get an initialized compiler instance from the utility instance.
   */
  async getCompiler() {
    return typeof this.cc === "function" ? this.cc = await this.cc() : this.cc;
  }
  async getCompilerReset() {
    const compiler = await this.getCompiler();
    await compiler.reset();
    return compiler;
  }
  /**
   * Set lazy initialized renderer instance for the utility instance.
   * @param ex the renderer instance, see {@link PromiseJust} and {@link TypstRenderer}.
   */
  setRenderer(ex) {
    this.ex = ex;
  }
  /**
   * Get an initialized renderer instance from the utility instance.
   */
  async getRenderer() {
    return typeof this.ex === "function" ? this.ex = await this.ex() : this.ex;
  }
  providers;
  /**
   * add providers for bullding the compiler or renderer component.
   */
  use(...providers) {
    if (!this.providers) {
      throw new Error("already prepare uses for instances");
    }
    this.providers.push(...providers);
  }
  /**
   * todo: add docs
   */
  static preloadFontFromUrl(fontUrl) {
    return _TypstSnippet.preloadFonts([fontUrl]);
  }
  /**
   * todo: add docs
   */
  static preloadFontData(fontData) {
    return _TypstSnippet.preloadFonts([fontData]);
  }
  /**
   * todo: add docs
   */
  static preloadFonts(userFonts) {
    return {
      key: "access-model",
      forRoles: ["compiler"],
      provides: [loadFonts(userFonts)]
    };
  }
  /**
   * don't load any default font assets.
   * todo: add docs
   */
  static disableDefaultFontAssets() {
    return {
      key: "access-model",
      forRoles: ["compiler"],
      provides: [disableDefaultFontAssets()]
    };
  }
  /**
   * todo: add docs
   */
  static preloadFontAssets(options) {
    return {
      key: "access-model",
      forRoles: ["compiler"],
      provides: [preloadFontAssets(options)]
    };
  }
  /**
   * Set accessl model for the compiler instance
   * @example
   *
   * use memory access model
   *
   * ```typescript
   * const m = new MemoryAccessModel();
   * $typst.use(TypstSnippet.withAccessModel(m));
   * ```
   */
  static withAccessModel(accessModel) {
    return {
      key: "access-model",
      forRoles: ["compiler"],
      provides: [withAccessModel(accessModel)]
    };
  }
  /**
   * Set package registry for the compiler instance
   * @example
   *
   * use a customized package registry
   *
   * ```typescript
   * const n = new NodeFetchPackageRegistry();
   * $typst.use(TypstSnippet.withPackageRegistry(n));
   * ```
   */
  static withPackageRegistry(registry) {
    return {
      key: "package-registry",
      forRoles: ["compiler"],
      provides: [withPackageRegistry(registry)]
    };
  }
  /**
   * Retrieve an access model to store the data of fetched files.
   * Provide a PackageRegistry instance for the compiler instance.
   *
   * @example
   *
   * use default (memory) access model
   *
   * ```typescript
   * $typst.use(await TypstSnippet.fetchPackageRegistry());
   * ```
   *
   * @example
   *
   * use external access model
   *
   * ```typescript
   * const m = new MemoryAccessModel();
   * $typst.use(TypstSnippet.withAccessModel(m), await TypstSnippet.fetchPackageRegistry(m));
   * ```
   */
  static fetchPackageRegistry(accessModel) {
    const m = accessModel || new MemoryAccessModel();
    const provides = [
      ...accessModel ? [] : [withAccessModel(m)],
      withPackageRegistry(new FetchPackageRegistry(m))
    ];
    return {
      key: "package-registry$fetch",
      forRoles: ["compiler"],
      provides
    };
  }
  /**
   * Retrieve a fetcher for fetching package data.
   * Provide a PackageRegistry instance for the compiler instance.
   * @example
   *
   * use a customized fetcher
   *
   * ```typescript
   * import request from 'sync-request-curl';
   * const m = new MemoryAccessModel();
   * $typst.use(TypstSnippet.withAccessModel(m), await TypstSnippet.fetchPackageBy(m, (_, httpUrl) => {
   *   const response = request('GET', this.resolvePath(path), {
   *     insecure: true,
   *   });
   *
   *   if (response.statusCode === 200) {
   *     return response.getBody(undefined);
   *   }
   *   return undefined;
   * }));
   * ```
   */
  static fetchPackageBy(accessModel, fetcher) {
    class HttpPackageRegistry extends FetchPackageRegistry {
      pullPackageData(path) {
        return fetcher(path, this.resolvePath(path));
      }
    }
    return {
      key: "package-registry$lambda",
      forRoles: ["compiler"],
      provides: [withPackageRegistry(new HttpPackageRegistry(accessModel))]
    };
  }
  /** @internal */
  ccOptions;
  /**
   * Set compiler init options for initializing global instance {@link $typst}.
   * See {@link InitOptions}.
   */
  setCompilerInitOptions(options) {
    this.requireIsUninitialized("compiler", this.cc);
    this.ccOptions = options;
  }
  /** @internal */
  exOptions;
  /**
   * Set renderer init options for initializing global instance {@link $typst}.
   * See {@link InitOptions}.
   */
  setRendererInitOptions(options) {
    this.requireIsUninitialized("renderer", this.ex);
    this.exOptions = options;
  }
  /**
   * Set shared main file path.
   */
  setMainFilePath(path) {
    this.mainFilePath = path;
  }
  /**
   * Get shared main file path.
   */
  getMainFilePath() {
    return this.mainFilePath;
  }
  removeTmp(opts) {
    if (opts.mainFilePath.startsWith("/tmp/")) {
      return this.unmapShadow(opts.mainFilePath);
    }
    return Promise.resolve();
  }
  /**
   * Adds a font to the compiler.
   *
   * @example
   *
   * ```typescript
   * const fonts = await fetch('fontInfo.json').then(res => res.json());
   * $typst.addFonts(fonts.map(font => $typst.loadFont(font.url)));
   * ```
   *
   * @param fontInfos the font infos to add.
   */
  async setFonts(fontInfos) {
    const fb = await this.getFontResolver();
    for (const font of fontInfos) {
      await fb.addLazyFont(font, "blob" in font ? font.blob : loadFontSync(font), font);
    }
    const compiler = await this.getCompiler();
    await fb.build(async (fonts) => compiler.setFonts(fonts));
  }
  /**
   * Add a source file to the compiler.
   * See {@link TypstCompiler#addSource}.
   */
  async addSource(path, content) {
    (await this.getCompiler()).addSource(path, content);
  }
  /**
   * Reset the shadow files.
   * Note: this function is independent to the {@link reset} function.
   * See {@link TypstCompiler#resetShadow}.
   */
  async resetShadow() {
    (await this.getCompiler()).resetShadow();
  }
  /**
   * Add a shadow file to the compiler.
   * See {@link TypstCompiler#mapShadow}.
   */
  async mapShadow(path, content) {
    (await this.getCompiler()).mapShadow(path, content);
  }
  /**
   * Remove a shadow file from the compiler.
   * See {@link TypstCompiler#unmapShadow}.
   */
  async unmapShadow(path) {
    (await this.getCompiler()).unmapShadow(path);
  }
  /**
   * Compile the document to vector (IR) format.
   * See {@link SweetCompileOptions}.
   */
  async vector(o) {
    const opts = await this.getCompileOptions(o);
    const compiler = await this.getCompilerReset();
    return compiler.compile(opts).then((res) => res.result).finally(() => this.removeTmp(opts));
  }
  /**
   * Compile the document to PDF format.
   * See {@link SweetCompileOptions}.
   */
  async pdf(o) {
    const opts = await this.getCompileOptions(o);
    opts.format = CompileFormatEnum.pdf;
    const compiler = await this.getCompilerReset();
    return compiler.compile(opts).then((res) => res.result).finally(() => this.removeTmp(opts));
  }
  /**
   * Compile the document to SVG format.
   * See {@link SweetRenderOptions} and {@link RenderSvgOptions}.
   */
  async svg(o) {
    return this.transientRender(o, (renderer, renderSession) => renderer.renderSvg({
      ...o,
      renderSession
    }));
  }
  /**
   * Compile the document to canvas operations.
   * See {@link SweetRenderOptions} and {@link RenderToCanvasOptions}.
   */
  async canvas(container, o) {
    return this.transientRender(o, (renderer, renderSession) => renderer.renderToCanvas({
      container,
      ...o,
      renderSession
    }));
  }
  /**
   * Get semantic tokens for the document.
   */
  async query(o) {
    const opts = await this.getCompileOptions(o);
    const compiler = await this.getCompilerReset();
    return compiler.query({
      ...o,
      ...opts
    }).finally(() => this.removeTmp(opts));
  }
  /**
   * Get token legend for semantic tokens.
   */
  async getSemanticTokenLegend() {
    const compiler = await this.getCompilerReset();
    return compiler.getSemanticTokenLegend();
  }
  /**
   * Get semantic tokens for the document.
   * See {@link SweetCompileOptions}.
   * See {@link TypstCompiler#getSemanticTokens}.
   */
  async getSemanticTokens(o) {
    const opts = await this.getCompileOptions(o);
    const compiler = await this.getCompilerReset();
    return compiler.getSemanticTokens({
      mainFilePath: opts.mainFilePath,
      resultId: o.resultId
    }).finally(() => this.removeTmp(opts));
  }
  async getCompileOptions(opts) {
    if (opts === void 0) {
      return { mainFilePath: this.mainFilePath, diagnostics: "none" };
    } else if (typeof opts === "string") {
      throw new Error(`please specify opts as {mainContent: '...'} or {mainFilePath: '...'}`);
    } else if ("mainFilePath" in opts) {
      return { ...opts, diagnostics: "none" };
    } else {
      const destFile = `/tmp/${randstr()}.typ`;
      await this.addSource(destFile, opts.mainContent);
      return { mainFilePath: destFile, inputs: opts.inputs, diagnostics: "none" };
    }
  }
  async getVector(o) {
    if (o && "vectorData" in o) {
      return o.vectorData;
    }
    const opts = await this.getCompileOptions(o);
    return (await this.getCompiler()).compile(opts).then((res) => res.result).finally(() => this.removeTmp(opts));
  }
  async transientRender(opts, f) {
    const rr = await this.getRenderer();
    if (!rr) {
      throw new Error("does not provide renderer instance");
    }
    const data = await this.getVector(opts);
    return await rr.runWithSession(async (session) => {
      rr.manipulateData({
        renderSession: session,
        action: "reset",
        data
      });
      return f(rr, session);
    });
  }
  prepareUseOnce = void 0;
  async prepareUse() {
    if (this.prepareUseOnce) {
      return this.prepareUseOnce;
    }
    return this.prepareUseOnce = this.doPrepareUse();
  }
  async doPrepareUse() {
    if (!this.providers) {
      return;
    }
    const providers = await Promise.all(this.providers.map((p) => typeof p === "function" ? p() : p));
    this.providers = [];
    if ($typst == this && !providers.some((p) => p.key.includes("package-registry") || p.key.includes("access-model"))) {
      if (isNode2) {
        const escapeImport = new Function("m", "return import(m)");
        try {
          const m = new MemoryAccessModel();
          const { default: request } = await escapeImport("sync-request");
          $typst.use(_TypstSnippet.withAccessModel(m), _TypstSnippet.fetchPackageBy(m, (_, path) => {
            const response = request("GET", path);
            if (response.statusCode === 200) {
              return response.getBody(void 0);
            }
            return void 0;
          }));
        } catch (e) {
        }
      } else {
        $typst.use(_TypstSnippet.fetchPackageRegistry());
      }
    }
    const providers2 = await Promise.all(this.providers.map((p) => typeof p === "function" ? p() : p));
    const ccOptions = this.ccOptions ||= {};
    const ccBeforeBuild = ccOptions.beforeBuild ||= [];
    const exOptions = this.exOptions ||= {};
    const exBeforeBuild = exOptions.beforeBuild ||= [];
    for (const provider of [...providers, ...providers2]) {
      if (provider.forRoles.includes("compiler")) {
        this.requireIsUninitialized("compiler", this.cc);
        ccBeforeBuild.push(...provider.provides);
      }
      if (provider.forRoles.includes("renderer")) {
        this.requireIsUninitialized("renderer", this.ex);
        exBeforeBuild.push(...provider.provides);
      }
    }
    this.providers = void 0;
  }
  requireIsUninitialized(role, c, e) {
    if (c && typeof c !== "function") {
      throw new Error(`${role} has been initialized: ${c}`);
    }
  }
  /** @internal */
  static async buildLocalCompiler() {
    const { createTypstCompiler: createTypstCompiler2 } = await Promise.resolve().then(() => (init_compiler(), compiler_exports));
    await this.prepareUse();
    const compiler = createTypstCompiler2();
    await compiler.init(this.ccOptions);
    return compiler;
  }
  /** @internal */
  static async buildLocalFontResolver() {
    const { createTypstFontBuilder: createTypstFontBuilder2 } = await Promise.resolve().then(() => (init_compiler(), compiler_exports));
    await this.prepareUse();
    const fonts = createTypstFontBuilder2();
    await fonts.init(this.ccOptions);
    return fonts;
  }
  /** @internal */
  static async buildGlobalCompiler() {
    const { createGlobalCompiler: createGlobalCompiler2 } = await Promise.resolve().then(() => (init_global_compiler(), global_compiler_exports));
    const { createTypstCompiler: createTypstCompiler2 } = await Promise.resolve().then(() => (init_compiler(), compiler_exports));
    await this.prepareUse();
    return createGlobalCompiler2(createTypstCompiler2, this.ccOptions);
  }
  /** @internal */
  static async buildLocalRenderer() {
    const { createTypstRenderer: createTypstRenderer2 } = await Promise.resolve().then(() => (init_renderer(), renderer_exports));
    await this.prepareUse();
    const renderer = createTypstRenderer2();
    await renderer.init(this.exOptions);
    return renderer;
  }
  /** @internal */
  static async buildGlobalRenderer() {
    const { createGlobalRenderer: createGlobalRenderer2 } = await Promise.resolve().then(() => (init_global_renderer(), global_renderer_exports));
    const { createTypstRenderer: createTypstRenderer2 } = await Promise.resolve().then(() => (init_renderer(), renderer_exports));
    await this.prepareUse();
    return createGlobalRenderer2(createTypstRenderer2, this.exOptions);
  }
};
var $typst = new TypstSnippet({
  compiler: TypstSnippet.buildGlobalCompiler,
  renderer: TypstSnippet.buildGlobalRenderer
});

// silverpandoc.ts
init_compiler();
var PANDOC_VERSION = "3.9";
var TYPST_VERSION = "0.7.0";
var CACHE_KEY_PANDOC = "silverpandoc-wasm";
var CACHE_KEY_TYPST = "silverpandoc-typst-wasm";
var LIBRARY_PATH = "Library/dtomvan/silverpandoc";
var pandoc = null;
var typst = null;
async function loadPandoc() {
  if (pandoc) {
    return;
  }
  await editor_exports.flashNotification("Loading pandoc.wasm...");
  let cache = await client_store_exports.get(CACHE_KEY_PANDOC);
  if (!cache || cache.version !== PANDOC_VERSION) {
    const pandocWasmModule = await Promise.resolve().then(() => __toESM(require_pandoc()));
    const pandocWasmLocation = pandocWasmModule.default.replace(/^\.\//, "");
    cache = {
      version: PANDOC_VERSION,
      data: await space_exports.readFile(`${LIBRARY_PATH}/${pandocWasmLocation}`)
    };
    await client_store_exports.set(CACHE_KEY_PANDOC, cache);
  }
  const pandocWasm = cache.data.buffer;
  pandoc = await createPandocInstance(pandocWasm);
}
async function loadTypst() {
  if (typst) {
    return;
  }
  await editor_exports.flashNotification("Loading typst...");
  let cache = await client_store_exports.get(CACHE_KEY_TYPST);
  if (!cache || cache.version !== TYPST_VERSION) {
    const typstModule = await Promise.resolve().then(() => __toESM(require_typst_ts_web_compiler_bg()));
    const typstWasmLocation = typstModule.default.replace(/^\.\//, "");
    cache = {
      version: TYPST_VERSION,
      data: await space_exports.readFile(`${LIBRARY_PATH}/${typstWasmLocation}`)
    };
    await client_store_exports.set(CACHE_KEY_TYPST, cache);
  }
  let wrapper = await Promise.resolve().then(() => (init_wasm_pack_shim(), wasm_pack_shim_exports));
  let importWasmModule2 = async function(wasm_name, url) {
    return cache.data.buffer;
  };
  wrapper.setImportWasmModule(importWasmModule2);
  typst = createTypstCompiler();
  await typst.init();
}
async function exportPDF() {
  const sourcePage = await editor_exports.getCurrentPage();
  const destinationPath = await editor_exports.prompt("Path to destination for PDF", `${sourcePage}.pdf`);
  const exists = await space_exports.fileExists(destinationPath);
  if (exists) {
    const confirmed = await editor_exports.confirm(
      `Output path ${destinationPath} already exists, overwrite?`,
      { destructive: true }
    );
    if (!confirmed) {
      return;
    }
  }
  const text = await editor_exports.getText();
  const parsedMd = await markdown_exports.parseMarkdown(text);
  const mdTree = await markdown_exports.expandMarkdown(parsedMd);
  const rendered = await markdown_exports.renderParseTree(mdTree);
  console.log(rendered);
  await loadPandoc();
  const options = {
    from: "markdown",
    to: "typst",
    standalone: true
  };
  const result = await pandoc.convert(options, rendered, {});
  console.log(result.stdout);
  await loadTypst();
  await editor_exports.flashNotification("Running typst...");
  console.log(typst);
  console.log(typst.compiler);
  const mainFilePath = "/main.typ";
  typst.addSource(mainFilePath, result.stdout);
  const typstOutput = await typst.compile({ mainFilePath, format: CompileFormatEnum.pdf });
  await space_exports.writeFile(destinationPath, typstOutput.result);
  await editor_exports.navigate(destinationPath);
  await typst.resetShadow();
}

// ../../../../tmp/plug-compile-6m4Qxk/input.js
var functionMapping = {
  exportPDF
};
var manifest = {
  "name": "silverpandoc",
  "functions": {
    "exportPDF": {
      "path": "silverpandoc.ts:exportPDF",
      "command": {
        "name": "Silverpandoc: export as PDF",
        "requireEditor": "page"
      }
    }
  },
  "assets": {}
};
var plug = { manifest, functionMapping };
setupMessageListener(functionMapping, manifest, self.postMessage);
export {
  plug
};
//# sourceMappingURL=silverpandoc.plug.js.map
