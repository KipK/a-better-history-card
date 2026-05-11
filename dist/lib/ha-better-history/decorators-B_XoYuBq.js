//#region ../ha-better-history/node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, _ = g ? g.emptyScript : "", v = h.reactiveElementPolyfillSupport, y = (e, t) => e, b = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? _ : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, x = (e, t) => !l(e, t), S = {
	attribute: !0,
	type: String,
	converter: b,
	reflect: !1,
	useDefault: !1,
	hasChanged: x
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var C = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = S) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? S;
	}
	static _$Ei() {
		if (this.hasOwnProperty(y("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(y("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(y("properties"))) {
			let e = this.properties, t = [...f(e), ...p(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(Infinity).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? b : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? b : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? x)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[y("elementProperties")] = /* @__PURE__ */ new Map(), C[y("finalized")] = /* @__PURE__ */ new Map(), v?.({ ReactiveElement: C }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region ../ha-better-history/node_modules/lit-html/lit-html.js
var w = globalThis, T = (e) => e, E = w.trustedTypes, ee = E ? E.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, D = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, te = "?" + O, ne = `<${te}>`, k = document, A = () => k.createComment(""), j = (e) => e === null || typeof e != "object" && typeof e != "function", M = Array.isArray, re = (e) => M(e) || typeof e?.[Symbol.iterator] == "function", N = "[ 	\n\f\r]", P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ie = /-->/g, ae = />/g, F = RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), oe = /'/g, se = /"/g, ce = /^(?:script|style|textarea|title)$/i, le = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), I = le(1), ue = le(2), L = Symbol.for("lit-noChange"), R = Symbol.for("lit-nothing"), de = /* @__PURE__ */ new WeakMap(), z = k.createTreeWalker(k, 129);
function fe(e, t) {
	if (!M(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ee === void 0 ? t : ee.createHTML(t);
}
var pe = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = P;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === P ? c[1] === "!--" ? o = ie : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = F) : (ce.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = F) : o = ae : o === F ? c[0] === ">" ? (o = i ?? P, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? F : c[3] === "\"" ? se : oe) : o === se || o === oe ? o = F : o === ie || o === ae ? o = P : (o = F, i = void 0);
		let d = o === F && e[t + 1].startsWith("/>") ? " " : "";
		a += o === P ? n + ne : l >= 0 ? (r.push(s), n.slice(0, l) + D + n.slice(l) + O + d) : n + O + (l === -2 ? t : d);
	}
	return [fe(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, B = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = pe(t, n);
		if (this.el = e.createElement(l, r), z.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = z.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(D)) {
					let t = u[o++], n = i.getAttribute(e).split(O), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? he : r[1] === "?" ? ge : r[1] === "@" ? _e : U
					}), i.removeAttribute(e);
				} else e.startsWith(O) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (ce.test(i.tagName)) {
					let e = i.textContent.split(O), t = e.length - 1;
					if (t > 0) {
						i.textContent = E ? E.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], A()), z.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], A());
					}
				}
			} else if (i.nodeType === 8) if (i.data === te) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(O, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += O.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = k.createElement("template");
		return n.innerHTML = e, n;
	}
};
function V(e, t, n = e, r) {
	if (t === L) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = j(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = V(e, i._$AS(e, t.values), i, r)), t;
}
var me = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? k).importNode(t, !0);
		z.currentNode = r;
		let i = z.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new H(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new ve(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = z.nextNode(), a++);
		}
		return z.currentNode = k, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, H = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = R, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = V(this, e, t), j(e) ? e === R || e == null || e === "" ? (this._$AH !== R && this._$AR(), this._$AH = R) : e !== this._$AH && e !== L && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? re(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== R && j(this._$AH) ? this._$AA.nextSibling.data = e : this.T(k.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = B.createElement(fe(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new me(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = de.get(e.strings);
		return t === void 0 && de.set(e.strings, t = new B(e)), t;
	}
	k(t) {
		M(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(A()), this.O(A()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = T(e).nextSibling;
			T(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, U = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = R, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = R;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = V(this, e, t, 0), a = !j(e) || e !== this._$AH && e !== L, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = V(this, r[n + o], t, o), s === L && (s = this._$AH[o]), a ||= !j(s) || s !== this._$AH[o], s === R ? e = R : e !== R && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === R ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, he = class extends U {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === R ? void 0 : e;
	}
}, ge = class extends U {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== R);
	}
}, _e = class extends U {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = V(this, e, t, 0) ?? R) === L) return;
		let n = this._$AH, r = e === R && n !== R || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== R && (n === R || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, ve = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		V(this, e);
	}
}, ye = w.litHtmlPolyfillSupport;
ye?.(B, H), (w.litHtmlVersions ??= []).push("3.3.2");
var be = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new H(t.insertBefore(A(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, W = globalThis, G = class extends C {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = be(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return L;
	}
};
G._$litElement$ = !0, G.finalized = !0, W.litElementHydrateSupport?.({ LitElement: G });
var xe = W.litElementPolyfillSupport;
xe?.({ LitElement: G }), (W.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region ../ha-better-history/node_modules/@kipk/load-ha-components/dist/load-ha-components.js
var Se = [
	"ha-form",
	"ha-icon",
	"ha-icon-button",
	"ha-selector",
	"ha-textfield",
	"ha-icon-picker",
	"ha-icon-button",
	"ha-entity-picker",
	"ha-select",
	"ha-dialog",
	"ha-sortable",
	"ha-svg-icon",
	"ha-alert",
	"ha-button",
	"ha-color-picker",
	"ha-badge",
	"ha-sankey-chart",
	"mwc-button"
], Ce = async (e) => {
	let t = e || Se;
	try {
		if (t.every((e) => customElements.get(e))) return;
		await Promise.race([customElements.whenDefined("partial-panel-resolver"), new Promise((e, t) => setTimeout(() => t(/* @__PURE__ */ Error("Timeout waiting for partial-panel-resolver")), 1e4))]);
		let e = document.createElement("partial-panel-resolver");
		if (!e) throw Error("Failed to create partial-panel-resolver element");
		if (e.hass = { panels: [{
			url_path: "tmp",
			component_name: "config"
		}] }, typeof e._updateRoutes != "function") throw Error("partial-panel-resolver does not have _updateRoutes method");
		if (e._updateRoutes(), !e.routerOptions?.routes?.tmp?.load) throw Error("Failed to create tmp route in partial-panel-resolver");
		await Promise.race([e.routerOptions.routes.tmp.load(), new Promise((e, t) => setTimeout(() => t(/* @__PURE__ */ Error("Timeout loading tmp route")), 1e4))]), await Promise.race([customElements.whenDefined("ha-panel-config"), new Promise((e, t) => setTimeout(() => t(/* @__PURE__ */ Error("Timeout waiting for ha-panel-config")), 1e4))]);
		let n = document.createElement("ha-panel-config");
		if (!n) throw Error("Failed to create ha-panel-config element");
		if (!n.routerOptions?.routes?.automation?.load) throw Error("ha-panel-config does not have automation route");
		await Promise.race([n.routerOptions.routes.automation.load(), new Promise((e, t) => setTimeout(() => t(/* @__PURE__ */ Error("Timeout loading automation components")), 1e4))]);
		let r = t.filter((e) => !customElements.get(e));
		if (r.length > 0) throw Error(`Failed to load components: ${r.join(", ")}`);
	} catch (e) {
		console.error("Error loading Home Assistant form components:", e);
		try {
			if (window.customElements && window.customElements.get("home-assistant")) {
				console.log("Attempting fallback loading method for HA components");
				let e = new CustomEvent("ha-request-load-components", {
					detail: { components: t },
					bubbles: !0,
					composed: !0
				});
				document.dispatchEvent(e);
			}
		} catch (e) {
			console.error("Fallback loading method failed:", e);
		}
	}
}, we = new Set(["unknown", "unavailable"]);
function Te(e) {
	return e == null || typeof e == "string" && we.has(e);
}
function Ee(e) {
	if (!(Te(e) || typeof e != "string" || e.trim() === "")) return e;
}
function De(e) {
	if (Te(e)) return;
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (typeof e != "string" || e.trim() === "") return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function K() {
	return typeof performance < "u" ? performance.now() : Date.now();
}
function Oe(e, t, n) {
	e && console.debug("[ha-better-history][perf]", t, n);
}
async function ke(e, t = {}) {
	let n = Math.max(1, Math.floor(t.concurrency ?? 1)), r = [], i = 0, a = 0, o = 0, s = (n, r) => {
		t.onEvent?.({
			event: n,
			taskId: r,
			queuedCount: Math.max(e.length - i, 0),
			activeCount: a,
			completedCount: o
		});
	};
	s("queue.start");
	async function c() {
		for (; i < e.length;) {
			if (t.isCancelled?.()) {
				s("queue.cancelled");
				return;
			}
			let n = e[i++];
			a += 1, s("queue.task_start", n.id);
			try {
				let e = typeof performance < "u" ? performance.now() : Date.now(), i = {
					task: n,
					value: await n.run(),
					durationMs: (typeof performance < "u" ? performance.now() : Date.now()) - e
				};
				r.push(i), o += 1, s("queue.task_complete", n.id), await t.onResult?.(i);
			} finally {
				--a;
			}
		}
	}
	return await Promise.all(Array.from({ length: Math.min(n, e.length) }, () => c())), r;
}
var Ae = 6e4, je = 3, Me = 350, q = 360 * 60 * 1e3, J = 3600 * 1e3, Ne = 720 * 60 * 1e3, Pe = 2500, Fe = 8e3, Ie = 15e3, Le = 300, Re = 700, ze = 1100, Be = 80;
function Ve(e) {
	if (e.length <= 2) return e;
	let t = [e[0]];
	for (let n = 1; n < e.length - 1; n++) {
		let r = e[n], i = e[n - 1], a = e[n + 1];
		(r.value !== i.value || a.value !== r.value) && t.push(r);
	}
	return t.push(e[e.length - 1]), t;
}
var He = class extends Error {
	constructor(e) {
		super(`History chunk timed out after ${e}ms`), this.name = "HistoryChunkTimeoutError";
	}
};
function Ue(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function We(e, t) {
	return t.reduce((e, t) => Ue(e) ? e[t] : void 0, e);
}
function Ge(e) {
	return e[e.length - 1] ?? "";
}
function Ke(e) {
	return e instanceof Error ? e.message : String(e);
}
function qe(e) {
	if (!Ue(e)) return;
	let t = e.status ?? e.statusCode ?? e.status_code;
	return typeof t == "number" ? t : void 0;
}
function Je(e) {
	if (!Ue(e)) return "";
	let t = e.code;
	return typeof t == "string" ? t.toLowerCase() : "";
}
function Ye(e) {
	if (e instanceof He) return !0;
	let t = qe(e);
	if (t !== void 0) return t === 408 || t === 429 || t >= 500;
	let n = Ke(e).toLowerCase(), r = `${Je(e)} ${n}`;
	return r.includes("timeout") || r.includes("timed out") || r.includes("network") || r.includes("failed to fetch") || r.includes("connection") || r.includes("temporarily unavailable") || r.includes("unavailable") || r.includes("aborted");
}
function Xe(e, t) {
	let n = Math.floor(Math.random() * Math.max(1, t));
	return t * 2 ** Math.max(0, e - 1) + n;
}
function Ze(e) {
	return new Promise((t) => setTimeout(t, e));
}
function Qe(e = 80) {
	let t = globalThis.requestIdleCallback;
	return t ? new Promise((n) => t(() => n(), { timeout: e })) : new Promise((e) => {
		typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => e()) : setTimeout(e, 0);
	});
}
async function $e(e, t) {
	let n;
	try {
		return await Promise.race([e, new Promise((e, r) => {
			n = setTimeout(() => r(new He(t)), t);
		})]);
	} finally {
		n !== void 0 && clearTimeout(n);
	}
}
function Y(e) {
	if (typeof e == "number" && Number.isFinite(e)) return "number";
	if (typeof e == "boolean") return "boolean";
	if (typeof e == "string" && e !== "") return "string";
}
function et(e) {
	let t = Y(Number.isFinite(Number(e.state)) ? Number(e.state) : e.state), n = e.attributes.unit_of_measurement;
	if (t) return {
		id: `state:${e.entity_id}`,
		kind: "entity_state",
		entityId: e.entity_id,
		label: e.attributes.friendly_name && typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id,
		valueType: t,
		unit: t === "number" && typeof n == "string" && n !== "" ? n : void 0
	};
}
function X(e, t, n) {
	let r = Y(We(e.attributes, t));
	if (r) return {
		id: `attr:${e.entity_id}:${t.join(".")}`,
		kind: "entity_attribute",
		entityId: e.entity_id,
		label: n ?? Ge(t),
		path: t,
		valueType: r
	};
}
function tt(e, t) {
	return t === "number" ? De(e) : t === "boolean" ? typeof e == "boolean" ? e : void 0 : Ee(e);
}
function nt(e, t) {
	let n = e.attributes ?? e.a ?? {};
	return tt(t.kind === "entity_state" ? e.state ?? e.s : We(n, t.path ?? []), t.valueType);
}
function rt(e) {
	if (typeof e.lu == "number") return e.lu * 1e3;
	let t = e.last_changed ?? e.last_updated;
	return t ? Date.parse(t) : NaN;
}
function it(e, t, n) {
	if (e.length === 0) return e;
	let r = t.getTime(), i = Math.min(n.getTime(), Date.now()), a = [...e].sort((e, t) => e.time - t.time), o = a[0], s = a[a.length - 1];
	return [
		...o.time > r ? [{
			time: r,
			value: o.value
		}] : [],
		...a,
		...s.time < i ? [{
			time: i,
			value: s.value
		}] : []
	];
}
function at(e, t) {
	let n = /* @__PURE__ */ new Map();
	if (Array.isArray(e)) return e.forEach((e, r) => {
		let i = e[0]?.entity_id ?? t[r];
		i && n.set(i, e);
	}), n;
	for (let [t, r] of Object.entries(e)) Array.isArray(r) && n.set(t, r);
	return n;
}
function ot(e, t, n = Date.now()) {
	let r = e.states[t.entityId];
	if (!r) return;
	let i = {
		entity_id: r.entity_id,
		state: r.state,
		last_changed: r.last_changed,
		last_updated: r.last_updated,
		attributes: r.attributes
	}, a = nt(i, t), o = rt(i), s = Number.isFinite(o) ? o : n;
	return a === void 0 || !Number.isFinite(s) ? void 0 : {
		time: s,
		value: a
	};
}
function st(e, t, n, r) {
	let i = ot(e, t, n.getTime());
	return i ? [{
		time: n.getTime(),
		value: i.value
	}, {
		time: Math.min(r.getTime(), Date.now()),
		value: i.value
	}] : [];
}
var ct = class {
	constructor() {
		this._entities = /* @__PURE__ */ new Map();
	}
	hasStates(e) {
		return (this._entities.get(e)?.states.length ?? 0) > 0;
	}
	hasFullStates(e) {
		let t = this._entities.get(e);
		return t !== void 0 && t.fullCoverage.length > 0 && t.states.length > 0;
	}
	hasCoverage(e, t, n, r) {
		let i = this._entities.get(e);
		return i ? lt(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : !1;
	}
	missingIntervals(e, t, n, r) {
		let i = this._entities.get(e);
		return dt(i ? r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage] : [], t.getTime(), n.getTime()).map((e) => ({
			start: new Date(e.startTime),
			end: new Date(e.endTime)
		}));
	}
	integrate(e, t, n, r, i) {
		let a = this._entities.get(e) ?? {
			states: [],
			stateCoverage: [],
			fullCoverage: []
		};
		a.states = ft([...a.states, ...t]), a.stateCoverage = Z([...a.stateCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}]), i === "full" && (a.fullCoverage = Z([...a.fullCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}])), this._entities.set(e, a);
	}
	buildSeries(e, t, n, r) {
		let i = e.kind === "entity_attribute" ? "full" : "state", a = this.coverageEnd(e.entityId, n, r, i);
		return _t(e, this._entities.get(e.entityId)?.states ?? [], t, n, new Date(a));
	}
	coverageEnd(e, t, n, r) {
		let i = this._entities.get(e);
		return i ? ut(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : n.getTime();
	}
};
function Z(e) {
	let t = e.filter((e) => e.endTime > e.startTime).sort((e, t) => e.startTime - t.startTime), n = [];
	for (let e of t) {
		let t = n[n.length - 1];
		t && e.startTime <= t.endTime + 1 ? t.endTime = Math.max(t.endTime, e.endTime) : n.push({ ...e });
	}
	return n;
}
function lt(e, t, n) {
	return ut(e, t, n) >= n - 1;
}
function ut(e, t, n) {
	if (n <= t) return n;
	let r = t;
	for (let t of Z(e)) if (!(t.endTime < r)) {
		if (t.startTime > r + 1) break;
		if (r = Math.max(r, t.endTime), r >= n - 1) return n;
	}
	return r;
}
function dt(e, t, n) {
	if (n <= t) return [];
	let r = [], i = t;
	for (let t of Z(e)) if (!(t.endTime <= i) && (t.startTime > i + 1 && r.push({
		startTime: i,
		endTime: Math.min(t.startTime, n)
	}), i = Math.max(i, t.endTime), i >= n)) break;
	return i < n && r.push({
		startTime: i,
		endTime: n
	}), r;
}
function ft(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = rt(n);
		Number.isFinite(e) && t.set(e, n);
	}
	return [...t.entries()].sort(([e], [t]) => e - t).map(([, e]) => e);
}
function pt(e, t) {
	let n = t.normalizeDurationMs + t.mergeDurationMs + t.buildDurationMs, r = t.stateCount >= Ie || t.requestDurationMs >= ze, i = r || t.stateCount >= Fe || t.requestDurationMs >= Re || n >= Be, a = t.stateCount <= Pe && t.requestDurationMs <= Le && n <= Be / 2;
	return i && e > J ? {
		nextChunkMs: Math.max(J, Math.floor(e / (r ? 4 : 2))),
		reason: "decrease"
	} : a && e < Ne ? {
		nextChunkMs: Math.min(Ne, e * 2),
		reason: "increase"
	} : {
		nextChunkMs: e,
		reason: "keep"
	};
}
async function mt(e, t, n, r, i, a, o) {
	if (e.callWS) return e.callWS({
		type: "history/history_during_period",
		start_time: n.toISOString(),
		end_time: r.toISOString(),
		entity_ids: t,
		minimal_response: i,
		no_attributes: a,
		significant_changes_only: o
	});
	let s = new URLSearchParams({
		filter_entity_id: t.join(","),
		end_time: r.toISOString()
	});
	return i && s.set("minimal_response", "1"), a && s.set("no_attributes", "1"), o && s.set("significant_changes_only", "1"), e.callApi("GET", `history/period/${encodeURIComponent(n.toISOString())}?${s.toString()}`);
}
async function ht(e, t) {
	let n = 1;
	for (;;) {
		if (t.isCancelled?.()) throw Error("History request cancelled");
		let r = t.onPerformance ? K() : 0;
		try {
			t.onPerformance?.({
				event: "history.chunk_attempt",
				details: {
					taskId: t.taskId,
					attempt: n,
					maxAttempts: t.maxAttempts,
					timeoutMs: t.timeoutMs
				}
			});
			let i = await $e(e(), t.timeoutMs);
			return t.onPerformance?.({
				event: "history.chunk_success",
				details: {
					taskId: t.taskId,
					attempt: n,
					durationMs: Math.round(K() - r)
				}
			}), i;
		} catch (e) {
			let i = Ye(e), a = i && n < t.maxAttempts && !t.isCancelled?.();
			if (t.onPerformance?.({
				event: a ? "history.chunk_retry" : "history.chunk_error",
				details: {
					taskId: t.taskId,
					attempt: n,
					maxAttempts: t.maxAttempts,
					retryable: i,
					error: Ke(e),
					durationMs: Math.round(K() - r)
				}
			}), !a) throw e;
			await Ze(Xe(n, t.retryBaseDelayMs)), n += 1;
		}
	}
}
async function gt(e, t, n, r, i, a, o = {}) {
	if (!e.callWS && !e.callApi) throw Error("Home Assistant history API is unavailable");
	let s = [...new Set(t.map((e) => e.entityId))], c = new Set(t.filter((e) => e.kind === "entity_attribute").map((e) => e.entityId)), l = s.filter((e) => !c.has(e)), u = s.filter((e) => c.has(e)), d = o.accumulator ?? new ct(), f = [], p = Math.max(1, Math.floor(o.chunkTimeoutMs ?? Ae)), m = Math.max(1, Math.floor(o.maxChunkAttempts ?? je)), h = Math.max(0, Math.floor(o.chunkRetryBaseDelayMs ?? Me)), g = (e, t) => ht(t, {
		taskId: e,
		timeoutMs: p,
		maxAttempts: m,
		retryBaseDelayMs: h,
		isCancelled: o.isCancelled,
		onPerformance: a
	}), _ = /* @__PURE__ */ new Map(), v = (e, t, n, r, i, a, o) => {
		let s = [
			r,
			t.toISOString(),
			n.toISOString(),
			i ? "minimal" : "full",
			a ? "noattr" : "attrs",
			o ? "significant" : "all"
		].join("|"), c = _.get(s);
		c ? c.entityIds.push(e) : _.set(s, {
			entityIds: [e],
			start: t,
			end: n,
			coverageKind: r,
			minimalResponse: i,
			noAttributes: a,
			significantChangesOnly: o
		});
	}, y = [];
	for (let e of l) for (let t of d.missingIntervals(e, n, r, "state")) v(e, t.start, t.end, "state", !0, !0, !0);
	for (let e of u) for (let t of d.missingIntervals(e, n, r, "full")) y.push({
		entityId: e,
		start: t.start,
		end: t.end
	});
	let b = y.reduce((e, t) => {
		let n = t.end.getTime() - t.start.getTime();
		return e + Math.max(1, Math.ceil(n / q));
	}, 0), x = _.size + b, S = 0, C = /* @__PURE__ */ new Set(), w = async (s, c, l) => {
		let u = S;
		if (S += 1, o.isCancelled?.()) return {
			stateCount: 0,
			requestDurationMs: Math.round(l),
			normalizeDurationMs: 0,
			mergeDurationMs: 0,
			buildDurationMs: 0
		};
		await Qe();
		let f = K(), p = at(c, s.entityIds), m = K() - f, h = [...p.values()].reduce((e, t) => e + t.length, 0);
		a?.({
			event: "history.batch",
			details: {
				batchIndex: u,
				batchCount: x,
				entityCount: s.entityIds.length,
				stateCount: h,
				requestDurationMs: Math.round(l),
				normalizeDurationMs: Math.round(m)
			}
		});
		let g = K(), _ = /* @__PURE__ */ new Set();
		for (let [e, t] of p) d.integrate(e, t, s.start, s.end, s.coverageKind), _.add(e), C.add(e);
		let v = K() - g;
		a?.({
			event: "history.merge",
			details: {
				batchIndex: u,
				entityCount: s.entityIds.length,
				stateCount: h,
				mergeDurationMs: Math.round(v)
			}
		});
		let y = 0;
		if (i) {
			await Qe();
			let o = K();
			for (let i of t) (_.has(i.entityId) || !T.has(i.id)) && (i.kind === "entity_attribute" ? d.hasFullStates(i.entityId) : d.hasStates(i.entityId)) && T.set(i.id, d.buildSeries(i, e, n, r));
			let s = t.map((e) => T.get(e.id)).filter((e) => e !== void 0);
			y = K() - o, a?.({
				event: "history.progress_series",
				details: {
					batchIndex: u,
					seriesCount: s.length,
					pointCount: s.reduce((e, t) => e + t.points.length, 0),
					buildDurationMs: Math.round(y)
				}
			}), i(s), await Qe(120);
		}
		return {
			stateCount: h,
			requestDurationMs: Math.round(l),
			normalizeDurationMs: Math.round(m),
			mergeDurationMs: Math.round(v),
			buildDurationMs: Math.round(y)
		};
	};
	for (let t of _.values()) {
		let n = t.coverageKind === "full" ? "attr" : "state", r = [...new Set(t.entityIds)], i = `${n}:${r.join(",")}:${t.start.toISOString()}:${t.end.toISOString()}`;
		f.push({
			id: i,
			entityIds: r,
			start: t.start,
			end: t.end,
			coverageKind: t.coverageKind,
			run: () => g(i, () => mt(e, r, t.start, t.end, t.minimalResponse, t.noAttributes, t.significantChangesOnly))
		});
	}
	a?.({
		event: "history.start",
		details: {
			sourceCount: t.length,
			entityCount: s.length,
			batchCount: x,
			attributeChunkHours: q / 36e5,
			minAttributeChunkHours: J / 36e5,
			maxAttributeChunkHours: Ne / 36e5,
			adaptiveAttributeChunks: y.length > 0,
			cachedSourceCount: t.filter((e) => d.hasCoverage(e.entityId, n, r, e.kind === "entity_attribute" ? "full" : "state")).length,
			chunkTimeoutMs: p,
			maxChunkAttempts: m,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}
	});
	let T = /* @__PURE__ */ new Map();
	for (let i of t) (i.kind === "entity_attribute" ? d.hasFullStates(i.entityId) : d.hasStates(i.entityId)) && T.set(i.id, d.buildSeries(i, e, n, r));
	await ke(f, {
		concurrency: o.concurrency ?? 1,
		isCancelled: o.isCancelled,
		onEvent: (e) => {
			a?.({
				event: `history.${e.event}`,
				details: {
					taskId: e.taskId,
					queuedCount: e.queuedCount,
					activeCount: e.activeCount,
					completedCount: e.completedCount
				}
			});
		},
		onResult: async ({ task: e, value: t, durationMs: n }) => {
			await w(e, t, n);
		}
	});
	let E = 0;
	for (let t of y) {
		let n = q;
		for (let r = t.start.getTime(); r < t.end.getTime() && !o.isCancelled?.();) {
			let i = new Date(r), o = new Date(Math.min(r + n, t.end.getTime())), s = o.getTime() - i.getTime(), c = `attr:${t.entityId}:${i.toISOString()}:${o.toISOString()}`;
			a?.({
				event: "history.queue.task_start",
				details: {
					taskId: c,
					queuedCount: void 0,
					activeCount: 1,
					completedCount: E
				}
			});
			let l = K(), u = await g(c, () => mt(e, [t.entityId], i, o, !1, !1, !1)), d = K() - l;
			E += 1, a?.({
				event: "history.queue.task_complete",
				details: {
					taskId: c,
					queuedCount: void 0,
					activeCount: 0,
					completedCount: E
				}
			});
			let f = await w({
				id: c,
				entityIds: [t.entityId],
				start: i,
				end: o,
				coverageKind: "full"
			}, u, d), p = pt(n, f);
			a?.({
				event: "history.adaptive_chunk",
				details: {
					taskId: c,
					entityId: t.entityId,
					chunkHours: Math.round(s / 36e3) / 100,
					nextChunkHours: Math.round(p.nextChunkMs / 36e3) / 100,
					stateCount: f.stateCount,
					requestDurationMs: f.requestDurationMs,
					processingDurationMs: f.normalizeDurationMs + f.mergeDurationMs + f.buildDurationMs,
					reason: p.reason
				}
			}), n = p.nextChunkMs, r = o.getTime();
		}
	}
	let ee = a ? K() : 0, D = t.map((t) => {
		let i = T.get(t.id);
		return i && !C.has(t.entityId) ? i : d.buildSeries(t, e, n, r);
	}), O = a ? K() - ee : 0;
	return a?.({
		event: "history.final_series",
		details: {
			seriesCount: D.length,
			pointCount: D.reduce((e, t) => e + t.points.length, 0),
			buildDurationMs: Math.round(O)
		}
	}), D;
}
function _t(e, t, n, r, i) {
	let a = t.flatMap((t) => {
		let n = nt(t, e), r = rt(t);
		return n !== void 0 && Number.isFinite(r) ? [{
			time: r,
			value: n
		}] : [];
	});
	return {
		source: e,
		points: Ve(a.length > 0 ? it(a, r, i) : st(n, e, r, i))
	};
}
var vt = {
	loading: "ui.common.loading",
	empty: "ui.components.history_charts.no_history_found",
	error: "ui.components.history_charts.error",
	add_target: "ui.components.target-picker.add_target",
	attributes: "ui.dialogs.more_info_control.attributes",
	back: "ui.common.back",
	search_entity: "ui.components.entity.entity-picker.search"
}, yt = {
	en: {
		no_series: "No series configured",
		no_entity_selected: "No entity selected",
		error_timeout: "The request timed out. Please try again.",
		tools: "Tools",
		view_range: "View range",
		reset_zoom: "Reset zoom",
		line_mode: "Display mode",
		mode_stair: "Stair",
		mode_line: "Line",
		mode_column: "Columns",
		export_data: "Export",
		import_data: "Import",
		search_entity: "Search entity",
		search_attributes: "Search attributes",
		no_matching_attributes: "No matching attributes",
		attribute_results_limited: "Showing first 50 matches"
	},
	fr: {
		no_series: "Aucune série configurée",
		no_entity_selected: "Aucune entité sélectionnée",
		error_timeout: "La requête a expiré. Veuillez réessayer.",
		tools: "Outils",
		view_range: "Plage affichée",
		reset_zoom: "Réinitialiser le zoom",
		line_mode: "Mode d'affichage",
		mode_stair: "Escalier",
		mode_line: "Ligne",
		mode_column: "Colonnes",
		export_data: "Exporter",
		import_data: "Importer",
		search_entity: "Rechercher une entité",
		search_attributes: "Rechercher des attributs",
		no_matching_attributes: "Aucun attribut correspondant",
		attribute_results_limited: "50 premiers résultats affichés"
	},
	cs: {
		no_series: "Není nakonfigurována žádná série",
		no_entity_selected: "Nebyla vybrána žádná entita",
		error_timeout: "Požadavek vypršel. Zkuste to prosím znovu.",
		tools: "Nástroje",
		view_range: "Rozsah zobrazení",
		reset_zoom: "Obnovit přiblížení",
		line_mode: "Režim zobrazení",
		mode_stair: "Schody",
		mode_line: "Čára",
		mode_column: "Sloupce",
		export_data: "Exportovat",
		import_data: "Importovat",
		search_attributes: "Hledat atributy",
		no_matching_attributes: "Žádné odpovídající atributy",
		attribute_results_limited: "Zobrazuje se prvních 50 shod"
	},
	de: {
		no_series: "Keine Serie konfiguriert",
		no_entity_selected: "Keine Entität ausgewählt",
		error_timeout: "Die Anfrage ist abgelaufen. Bitte erneut versuchen.",
		tools: "Werkzeuge",
		view_range: "Anzeigebereich",
		reset_zoom: "Zoom zurücksetzen",
		line_mode: "Anzeigemodus",
		mode_stair: "Stufen",
		mode_line: "Linie",
		mode_column: "Spalten",
		export_data: "Exportieren",
		import_data: "Importieren",
		search_attributes: "Attribute suchen",
		no_matching_attributes: "Keine passenden Attribute",
		attribute_results_limited: "Die ersten 50 Treffer werden angezeigt"
	},
	el: {
		no_series: "Δεν έχει ρυθμιστεί σειρά",
		no_entity_selected: "Δεν έχει επιλεγεί οντότητα",
		error_timeout: "Το αίτημα έληξε χρονικά. Παρακαλώ δοκιμάστε ξανά.",
		tools: "Εργαλεία",
		view_range: "Εύρος προβολής",
		reset_zoom: "Επαναφορά ζουμ",
		line_mode: "Λειτουργία εμφάνισης",
		mode_stair: "Σκάλα",
		mode_line: "Γραμμή",
		mode_column: "Στήλες",
		export_data: "Εξαγωγή",
		import_data: "Εισαγωγή",
		search_attributes: "Αναζήτηση χαρακτηριστικών",
		no_matching_attributes: "Δεν βρέθηκαν χαρακτηριστικά",
		attribute_results_limited: "Εμφανίζονται οι πρώτες 50 αντιστοιχίες"
	},
	it: {
		no_series: "Nessuna serie configurata",
		no_entity_selected: "Nessuna entità selezionata",
		error_timeout: "La richiesta è scaduta. Riprova.",
		tools: "Strumenti",
		view_range: "Intervallo visualizzato",
		reset_zoom: "Reimposta zoom",
		line_mode: "Modalità di visualizzazione",
		mode_stair: "Gradini",
		mode_line: "Linea",
		mode_column: "Colonne",
		export_data: "Esporta",
		import_data: "Importa",
		search_attributes: "Cerca attributi",
		no_matching_attributes: "Nessun attributo corrispondente",
		attribute_results_limited: "Mostrate le prime 50 corrispondenze"
	},
	pl: {
		no_series: "Nie skonfigurowano serii",
		no_entity_selected: "Nie wybrano encji",
		error_timeout: "Upłynął limit czasu żądania. Spróbuj ponownie.",
		tools: "Narzędzia",
		view_range: "Zakres widoku",
		reset_zoom: "Resetuj powiększenie",
		line_mode: "Tryb wyświetlania",
		mode_stair: "Schodkowy",
		mode_line: "Linia",
		mode_column: "Kolumny",
		export_data: "Eksportuj",
		import_data: "Importuj",
		search_attributes: "Szukaj atrybutów",
		no_matching_attributes: "Brak pasujących atrybutów",
		attribute_results_limited: "Pokazano pierwsze 50 wyników"
	},
	ru: {
		no_series: "Серии не настроены",
		no_entity_selected: "Сущность не выбрана",
		error_timeout: "Время ожидания запроса истекло. Повторите попытку.",
		tools: "Инструменты",
		view_range: "Диапазон просмотра",
		reset_zoom: "Сбросить масштаб",
		line_mode: "Режим отображения",
		mode_stair: "Ступени",
		mode_line: "Линия",
		mode_column: "Столбцы",
		export_data: "Экспорт",
		import_data: "Импорт",
		search_attributes: "Поиск атрибутов",
		no_matching_attributes: "Подходящие атрибуты не найдены",
		attribute_results_limited: "Показаны первые 50 совпадений"
	},
	sk: {
		no_series: "Nie je nakonfigurovaná žiadna séria",
		no_entity_selected: "Nie je vybraná žiadna entita",
		error_timeout: "Časový limit požiadavky vypršal. Skúste to znova.",
		tools: "Nástroje",
		view_range: "Rozsah zobrazenia",
		reset_zoom: "Obnoviť priblíženie",
		line_mode: "Režim zobrazenia",
		mode_stair: "Schody",
		mode_line: "Čiara",
		mode_column: "Stĺpce",
		export_data: "Exportovať",
		import_data: "Importovať",
		search_attributes: "Hľadať atribúty",
		no_matching_attributes: "Žiadne zodpovedajúce atribúty",
		attribute_results_limited: "Zobrazuje sa prvých 50 zhôd"
	}
};
function Q(e, t) {
	let n = vt[t];
	if (n && e?.localize) {
		let t = e.localize(n);
		if (t) return t;
	}
	return yt[e?.locale?.language?.split("-")[0] ?? e?.language?.split("-")[0] ?? "en"]?.[t] ?? yt.en?.[t] ?? t;
}
var bt = o`
  :host {
    display: flex;
    flex-direction: column;
    container-type: inline-size;
    min-height: var(--better-history-min-height, 360px);
    font-family: var(--better-history-font-family, inherit);
    user-select: none;
    -webkit-user-select: none;
  }

  .root {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    user-select: none;
    -webkit-user-select: none;
  }

  .graph-title {
    margin: 0 0 8px;
    color: var(--better-history-title-color, var(--primary-text-color, inherit));
    font-family: var(--better-history-title-font-family, inherit);
    font-size: var(--better-history-title-font-size, var(--ha-font-size-xl, 20px));
    font-weight: 500;
    line-height: 1.25;
  }

  .chart-area {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  .chart-surface {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow-y: var(--better-history-surface-overflow-y, auto);
    padding-block: 16px;
    flex: 1;
    min-height: 0;
  }

  svg {
    width: 100%;
    display: block;
    touch-action: pan-y;
  }

  .axis {
    stroke: var(--better-history-border-color, var(--divider-color, #444));
    stroke-width: 1;
  }

  .axis.tick {
    stroke-width: 1;
  }

  .grid-line {
    stroke: var(--better-history-border-color, var(--divider-color, #444));
    stroke-width: 1;
    opacity: 0.45;
    vector-effect: non-scaling-stroke;
  }

  .x-axis-label {
    position: absolute;
    font-size: 11px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-family: inherit;
    white-space: nowrap;
    pointer-events: none;
    transform: translateX(-50%);
    box-sizing: border-box;
    line-height: 1;
  }

  .x-axis-label--bold {
    font-weight: 600;
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
  }

  .graph-separator {
    stroke: var(--better-history-border-color, var(--divider-color, #444));
    stroke-width: 1.2;
    stroke-dasharray: 3 5;
    opacity: 0.64;
  }

  .line {
    fill: none;
    stroke-width: var(--better-history-line-width, 2.5);
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }

  .column {
    opacity: 0.62;
    vector-effect: non-scaling-stroke;
  }

  .segment {
    opacity: 0.7;
  }

  .segment-border {
    stroke-width: 1.5;
    stroke-opacity: 0.6;
    vector-effect: non-scaling-stroke;
  }

  .climate-heating-area {
    fill: var(--better-history-accent-color, var(--accent-color, #ff9800));
    opacity: 0.22;
  }

  .y-axis-label {
    position: absolute;
    font-size: 11px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    transform: translateY(-50%);
    white-space: nowrap;
    pointer-events: none;
    box-sizing: border-box;
    line-height: 1;
    z-index: 1;
  }

  .y-axis-label--left,
  .y-axis-label--right {
    width: 100%;
  }

  .y-axis-label--left {
    right: 0;
    padding-right: var(--axis-label-gap);
    text-align: right;
  }

  .y-axis-label--right {
    left: 0;
    padding-left: var(--axis-label-gap);
    text-align: left;
  }

  .tooltip-axis-pointer {
    position: absolute;
    top: 0;
    width: 0;
    border-left: 1px dashed var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
    opacity: 0.9;
    pointer-events: none;
    transform: translateX(-0.5px);
    z-index: 2;
  }

  .chart-graphs {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    contain: layout;
  }

  .graph-section {
    display: flex;
    flex-direction: column;
  }

  .graph-row {
    --axis-label-gap: 5px;
    display: grid;
    grid-template-columns: var(--axis-left-gutter, 0px) minmax(0, 1fr) var(--axis-right-gutter, 0px);
    min-width: 0;
  }

  .axis-labels {
    min-width: 0;
    position: relative;
  }

  .graph-canvas {
    min-width: 0;
    position: relative;
    overflow: hidden;
  }

  .graph-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 6px calc(40 / 720 * 100%) 0;
    padding: 0 6px 8px 6px;
    font-size: 12px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    box-sizing: border-box;
  }

  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    min-width: 0;
    border: 0;
    background: transparent;
    color: inherit;
    padding: 0;
    font: inherit;
    cursor: pointer;
  }

  .legend-item[hidden-series] {
    opacity: 0.38;
  }

  .swatch {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    flex: 0 0 auto;
    box-sizing: border-box;
  }

  .legend-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 160px;
  }

  .tooltip {
    position: absolute;
    z-index: 2;
    min-width: 170px;
    width: max-content;
    max-width: min(300px, calc(100% - 16px));
    padding: 8px;
    border-radius: var(--better-history-radius, 8px);
    background: color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 88%, #000 12%);
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    box-shadow: 0 8px 20px rgb(0 0 0 / 28%);
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    font-size: 12px;
    pointer-events: none;
    box-sizing: border-box;
    transition: left 90ms ease-out, top 90ms ease-out;
    will-change: left, top, transform;
  }

  .tooltip-time {
    margin-bottom: 6px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 11px;
  }

  .tooltip-row {
    display: grid;
    grid-template-columns: 8px minmax(0, 1fr) auto;
    align-items: center;
    gap: 6px;
    margin-top: 3px;
  }

  .tooltip-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tooltip-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .empty,
  .error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 20px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    text-align: center;
    font-size: 13px;
    box-sizing: border-box;
  }

  .error {
    color: #ff6b6b;
  }

  .controls-bar {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 0 calc(40 / 720 * 100%) 8px;
    box-sizing: border-box;
  }

  .tool-icon-button,
  .mode-button,
  .tool-action-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    background: transparent;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    cursor: pointer;
    box-sizing: border-box;
    font: inherit;
  }

  .mode-button[active] {
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    background: color-mix(in srgb, var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4))) 18%, transparent);
    border-color: var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
  }

  .tool-icon-button ha-icon,
  .mode-button ha-icon,
  .tool-action-button ha-icon {
    --mdc-icon-size: 18px;
  }

  .tools-panel {
    display: block;
    margin: 0 calc(40 / 720 * 100%) 8px;
    padding: 7px 8px;
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    border-radius: var(--better-history-radius, 8px);
    background: color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 96%, var(--primary-text-color, #fff) 4%);
    box-sizing: border-box;
  }

  .tool-range {
    min-width: 0;
  }

  .tool-range-row,
  .tool-actions,
  .range-values {
    display: flex;
    align-items: center;
  }

  .tool-range-row {
    gap: 8px;
  }

  .tool-range-control {
    flex: 1 1 auto;
    min-width: 120px;
  }

  .tool-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tool-label ha-icon {
    --mdc-icon-size: 16px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
  }

  .tool-icon-button {
    width: 24px;
    height: 24px;
    border-radius: var(--better-history-radius, 8px);
  }

  .range-values {
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 0;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 10px;
  }

  .range-slider-stack {
    position: relative;
    height: 24px;
    display: flex;
    align-items: center;
    padding: 0 2px;
  }

  .range-slider-stack::before {
    content: "";
    position: absolute;
    left: 2px;
    right: 2px;
    top: 50%;
    height: 3px;
    border-radius: 999px;
    background:
      linear-gradient(
        90deg,
        transparent,
        color-mix(in srgb, var(--better-history-border-color, var(--divider-color, #444)) 72%, transparent) 12%,
        color-mix(in srgb, var(--better-history-border-color, var(--divider-color, #444)) 72%, transparent) 88%,
        transparent
      );
    transform: translateY(-50%);
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 14%);
  }

  .range-selection {
    position: absolute;
    top: 50%;
    height: 12px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4))) 16%, transparent);
    transform: translateY(-50%);
    pointer-events: none;
    box-shadow: 0 0 8px color-mix(in srgb, var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4))) 26%, transparent);
    z-index: 1;
  }

  .range-selection,
  .range-selection-hit {
    min-width: 0;
  }

  .range-selection::before,
  .range-selection-hit::before {
    content: "";
    position: absolute;
    left: 6px;
    right: 6px;
    top: 50%;
    height: 2px;
    border-radius: inherit;
    background: color-mix(in srgb, var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4))) 82%, var(--primary-text-color, #fff) 18%);
    transform: translateY(-50%);
  }

  .range-selection-hit {
    position: absolute;
    left: 2px;
    right: 2px;
    top: 0;
    bottom: 0;
    min-width: 18px;
    border-radius: 999px;
    background: transparent;
    cursor: grab;
    pointer-events: auto;
    touch-action: none;
    z-index: 1;
  }

  .range-selection-hit::before {
    display: none;
  }

  .range-selection-hit[dragging] {
    cursor: grabbing;
  }

  .range-slider {
    position: absolute;
    inset: 0;
    width: 100%;
    margin: 0;
    appearance: none;
    background: transparent;
    cursor: ew-resize;
    pointer-events: none;
    z-index: 2;
  }

  .range-slider::-webkit-slider-runnable-track {
    height: 24px;
    background: transparent;
  }

  .range-slider::-moz-range-track {
    height: 24px;
    background: transparent;
  }

  .range-slider::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 18px;
    margin-top: 3px;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4))) 86%, var(--primary-text-color, #fff) 14%);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 88%, transparent),
      0 1px 4px rgb(0 0 0 / 18%);
    pointer-events: auto;
  }

  .range-slider::-moz-range-thumb {
    width: 12px;
    height: 18px;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4))) 86%, var(--primary-text-color, #fff) 14%);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 88%, transparent),
      0 1px 4px rgb(0 0 0 / 18%);
    pointer-events: auto;
  }

  .range-slider:focus-visible::-webkit-slider-thumb {
    outline: 1px solid var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
    outline-offset: 3px;
  }

  .range-slider:focus-visible::-moz-range-thumb {
    outline: 1px solid var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
    outline-offset: 3px;
  }

  .tool-actions {
    justify-content: flex-end;
    gap: 6px;
    min-width: 0;
  }

  .mode-switch {
    display: inline-flex;
    overflow: hidden;
    border-radius: var(--better-history-radius, 8px);
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
  }

  .mode-button {
    width: 30px;
    height: 30px;
    border: 0;
    border-right: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    transition: background-color 120ms ease;
  }

  .mode-button:last-child {
    border-right: 0;
  }

  .tool-action-button {
    width: 32px;
    height: 32px;
    padding: 0;
    border-radius: var(--better-history-radius, 8px);
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    font-size: 12px;
    transition: background-color 120ms ease;
  }

  .mode-button:hover,
  .tool-action-button:not(:disabled):hover {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 12%, transparent);
  }

  .tool-reset-button {
    flex: 0 0 auto;
  }

  .tool-action-button:disabled {
    cursor: not-allowed;
    opacity: 0.42;
    color: var(--better-history-muted-color, var(--disabled-text-color, var(--secondary-text-color, #888)));
    background: color-mix(in srgb, var(--better-history-muted-color, var(--secondary-text-color, #888)) 12%, transparent);
    border-color: color-mix(in srgb, var(--better-history-muted-color, var(--divider-color, #444)) 55%, transparent);
  }

  @container (max-width: 360px) {
    .tool-range-row {
      flex-wrap: wrap;
    }

    .tool-range-control {
      flex: 1 1 0;
      min-width: 0;
    }

    .tool-actions {
      flex: 1 1 100%;
    }

    .tool-actions {
      justify-content: flex-end;
    }
  }

  @container (max-width: 560px) {
    .date-picker-wrapper,
    .entity-picker {
      flex-basis: 100%;
      width: 100%;
    }

    .entity-add-trigger {
      width: fit-content;
      max-width: 100%;
    }
  }

  @media (hover: none) and (pointer: coarse) {
    .controls-bar {
      flex-direction: column;
      align-items: stretch;
    }

    .tools-panel {
      grid-template-columns: 1fr;
      padding: 8px;
    }

    .tool-actions {
      justify-content: flex-end;
    }

    .range-slider-stack,
    .range-slider::-webkit-slider-runnable-track,
    .range-slider::-moz-range-track {
      height: 30px;
    }

    .range-selection {
      height: 18px;
    }

    .range-selection-hit {
      min-width: 24px;
    }

    .range-slider::-webkit-slider-thumb {
      width: 14px;
      height: 22px;
      margin-top: 4px;
    }

    .range-slider::-moz-range-thumb {
      width: 14px;
      height: 22px;
    }

    .date-picker-wrapper {
      width: 100%;
      max-width: 100%;
    }

    .date-picker-wrapper ha-date-range-picker {
      width: 100%;
    }
  }

  .date-picker-wrapper {
    flex: 0 1 auto;
    width: fit-content;
    max-width: 100%;
    min-width: 0;
    overflow: visible;
  }

  .date-picker-wrapper ha-date-range-picker {
    display: block;
  }

  .entity-picker {
    position: relative;
    flex: 1 1 220px;
    min-width: 0;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .entity-trigger {
    max-width: 100%;
    width: 100%;
  }

  .entity-add-trigger {
    width: fit-content;
  }

  .entity-add-trigger ha-icon {
    --mdc-icon-size: 20px;
  }

  .history-loading-indicator {
    position: absolute;
    top: 16px;
    right: 8px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 24px;
    padding: 0 8px;
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    border-radius: 999px;
    background: color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 88%, var(--primary-color, #03a9f4) 12%);
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    box-shadow: 0 2px 8px rgb(0 0 0 / 14%);
    font-size: 11px;
    line-height: 1;
    pointer-events: none;
    transform: translateY(-50%);
    z-index: 1;
  }

  .history-loading-spinner {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid color-mix(in srgb, var(--better-history-muted-color, var(--secondary-text-color, #888)) 28%, transparent);
    border-top-color: var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
    box-sizing: border-box;
    animation: better-history-spin 850ms linear infinite;
  }

  @keyframes better-history-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .entity-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
    width: 100%;
  }

  .entity-menu,
  .entity-select-menu {
    position: fixed;
    top: -9999px;
    left: -9999px;
    display: none;
    width: min(420px, calc(100vw - 48px));
    max-height: 420px;
    padding: 12px;
    overflow: hidden;
    border: var(--wa-panel-border-width, 1px) var(--wa-panel-border-style, solid) var(--wa-color-surface-border, var(--divider-color, rgba(0, 0, 0, 0.12)));
    border-radius: var(--wa-panel-border-radius, var(--ha-dialog-border-radius, var(--ha-border-radius-3xl, 24px)));
    background: var(--wa-color-surface-raised, var(--card-background-color, #fff));
    box-shadow: var(--wa-shadow-m, var(--ha-box-shadow-m, 0 4px 8px rgba(0, 0, 0, 0.08)));
    box-sizing: border-box;
    z-index: 100;
  }

  .entity-menu[open],
  .entity-select-menu[open] {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 8px;
  }

  .entity-select-menu[open] {
    grid-template-rows: auto minmax(0, auto);
    max-height: 360px;
  }

  .entity-select-results {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-height: 0;
    overflow-y: auto;
  }

  .entity-select-result {
    background: transparent;
    border: 0;
    border-radius: var(--better-history-radius, 8px);
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    cursor: pointer;
    display: flex;
    flex-direction: column;
    font: inherit;
    gap: 1px;
    min-width: 0;
    padding: 8px;
    text-align: left;
  }

  .entity-select-result:hover {
    background: rgba(var(--rgb-primary-text-color, 255, 255, 255), 0.08);
  }

  .entity-menu-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .entity-menu-title {
    font-size: var(--wa-font-size-m, var(--ha-font-size-m, 14px));
    font-weight: var(--wa-font-weight-body, var(--ha-font-weight-normal, 400));
    color: var(--wa-color-text-normal, var(--primary-text-color));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 8px;
  }

  .entity-menu-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 0;
    background: transparent;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    cursor: pointer;
    font-size: 14px;
    flex-shrink: 0;
  }

  .entity-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    min-width: 0;
  }

  .source-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 32px;
    padding: 0 8px 0 3px;
    border-radius: 20px;
    border: var(--wa-border-width-md, 1.5px) solid;
    background: var(--card-background-color, var(--better-history-bg, #1e1e2e));
    box-sizing: border-box;
    max-width: 100%;
    overflow: hidden;
    flex-shrink: 0;
    user-select: none;
    -webkit-user-select: none;
  }

  .source-chip[draggable="true"] {
    cursor: grab;
  }

  .source-chip[draggable="true"]:active {
    cursor: grabbing;
  }

  .source-chip[dragging] {
    opacity: 0.48;
    outline: 2px solid var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
    outline-offset: 2px;
  }

  .source-chip.entity-source-chip {
    border-color: var(--ha-color-green-80, #81c784);
  }

  .source-chip.attr-source-chip {
    border-color: var(--ha-color-amber-80, #ffb74d);
  }

  .source-chip-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .entity-source-chip .source-chip-icon {
    background: color-mix(in srgb, var(--ha-color-green-80, #81c784) 20%, transparent);
  }

  .attr-source-chip .source-chip-icon {
    background: color-mix(in srgb, var(--ha-color-amber-80, #ffb74d) 20%, transparent);
  }

  .source-chip-icon ha-icon {
    --mdc-icon-size: 16px;
  }

  .source-chip-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--wa-font-size-s, 13px);
    color: var(--primary-text-color, var(--better-history-text-color, #fff));
  }

  .source-chip-remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--secondary-text-color, #888);
    cursor: pointer;
    flex-shrink: 0;
    padding: 0;
    font-size: 12px;
    line-height: 1;
  }

  .source-chip-remove:hover {
    background: color-mix(in srgb, var(--secondary-text-color, #888) 15%, transparent);
    color: var(--primary-text-color, #fff);
  }

  .entity-browser {
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .entity-browser-title {
    font-size: var(--wa-font-size-m, var(--ha-font-size-m, 14px));
    font-weight: var(--wa-font-weight-body, var(--ha-font-weight-normal, 400));
    color: var(--wa-color-text-normal, var(--primary-text-color));
    margin-bottom: 2px;
  }

  .entity-breadcrumb {
    display: flex;
    align-items: center;
    gap: 5px;
    min-width: 0;
    margin-bottom: 6px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 12px;
  }

  .entity-crumb {
    border: 0;
    background: transparent;
    color: inherit;
    padding: 0;
    font: inherit;
    cursor: pointer;
  }

  .entity-breadcrumb-sep {
    opacity: 0.5;
  }

  .entity-browser-list {
    overflow-y: auto;
    flex: 1;
    min-height: 0;
  }

  .entity-browser-entries {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .entity-browser-entry {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 6px 8px;
    border-radius: var(--better-history-radius, 8px);
    cursor: pointer;
    font-size: 13px;
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
  }

  .entity-browser-entry:hover {
    background: rgba(var(--rgb-primary-text-color, 255, 255, 255), 0.08);
  }

  .entity-browser-entry--disabled {
    cursor: default;
    opacity: 0.45;
  }

  .entity-browser-entry--disabled:hover {
    background: transparent;
  }

  .entity-browser-entry--present {
    cursor: default;
    color: var(--ha-color-amber-80, #ffb74d);
    background: color-mix(in srgb, var(--ha-color-amber-80, #ffb74d) 14%, transparent);
    box-shadow: inset 3px 0 0 var(--ha-color-amber-80, #ffb74d);
  }

  .entity-browser-entry--present:hover {
    background: color-mix(in srgb, var(--ha-color-amber-80, #ffb74d) 14%, transparent);
  }

  .entity-browser-entry--removable {
    cursor: pointer;
  }

  .entity-browser-entry--removable:hover {
    background: color-mix(in srgb, var(--ha-color-amber-80, #ffb74d) 22%, transparent);
  }

  .entity-browser-entry--present .entity-browser-entry-type,
  .entity-browser-entry--present .entity-browser-entry-arrow {
    color: inherit;
    opacity: 0.78;
  }

  .entity-browser-entry-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 1px;
  }

  .entity-browser-entry-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .entity-browser-entry-secondary {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 11px;
    line-height: 1.25;
  }

  .entity-browser-entry-type,
  .entity-browser-entry-arrow {
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 11px;
    flex-shrink: 0;
  }

  .entity-browser-search {
    width: 100%;
    margin: 4px 0 6px;
  }

  .entity-browser-search-input {
    width: 100%;
    height: 32px;
    padding: 0 10px;
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    border-radius: var(--better-history-radius, 8px);
    background: color-mix(in srgb, var(--wa-color-surface-raised, var(--card-background-color, #fff)) 92%, var(--primary-text-color, #000) 8%);
    box-sizing: border-box;
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    font: inherit;
    font-size: 13px;
    outline: none;
  }

  .entity-browser-search-input::placeholder {
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
  }

  .entity-browser-search-input:focus {
    border-color: var(--better-history-accent-color, var(--primary-color, #03a9f4));
    box-shadow: 0 0 0 1px var(--better-history-accent-color, var(--primary-color, #03a9f4));
  }

  .entity-browser-search-results {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .entity-browser-search-empty,
  .entity-browser-search-count {
    padding: 8px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 12px;
  }

  .entity-browser-back {
    padding: 6px 8px;
    cursor: pointer;
    font-size: 12px;
    color: var(--better-history-accent-color, var(--primary-color, #03a9f4));
    border-radius: var(--ha-card-border-radius, 12px);
  }

  .entity-browser-back:hover {
    background: rgba(var(--rgb-primary-text-color, 255, 255, 255), 0.08);
  }

  .entity-browser-entity {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 10px;
    border-radius: var(--better-history-radius, 8px);
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    cursor: pointer;
    margin-bottom: 6px;
  }

  .entity-browser-entity:hover {
    background: color-mix(in srgb, var(--better-history-accent-color, var(--primary-color, #03a9f4)) 10%, transparent);
  }

  .entity-browser-entity--disabled {
    cursor: default;
    opacity: 0.45;
    border-style: dashed;
  }

  .entity-browser-entity--disabled:hover {
    background: transparent;
  }

  .entity-browser-entity--present {
    cursor: default;
    color: var(--ha-color-green-80, #81c784);
    border-color: color-mix(in srgb, var(--ha-color-green-80, #81c784) 62%, var(--better-history-border-color, var(--divider-color, #444)));
    background: color-mix(in srgb, var(--ha-color-green-80, #81c784) 14%, transparent);
    box-shadow: inset 3px 0 0 var(--ha-color-green-80, #81c784);
  }

  .entity-browser-entity--present:hover {
    background: color-mix(in srgb, var(--ha-color-green-80, #81c784) 14%, transparent);
  }

  .entity-browser-entity--removable {
    cursor: pointer;
  }

  .entity-browser-entity--removable:hover {
    background: color-mix(in srgb, var(--ha-color-green-80, #81c784) 22%, transparent);
  }

  .entity-browser-entity-id {
    font-size: 13px;
    font-weight: 500;
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .entity-browser-section-title {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    padding: 2px 8px 4px;
    margin-top: 2px;
  }

  .entity-browser-empty {
    padding: 12px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 13px;
    text-align: center;
  }
`, xt = [
	"ha-icon",
	"ha-button",
	"ha-icon-button",
	"ha-svg-icon",
	"ha-entity-picker",
	"ha-md-list",
	"ha-md-list-item",
	"ha-input-chip",
	"ha-assist-chip",
	"ha-generic-picker"
], St;
function Ct() {
	return St ??= Ce(xt), St;
}
var wt;
function Tt() {
	return wt ??= Et(), wt;
}
async function Et() {
	if (!customElements.get("ha-date-range-picker")) try {
		await Promise.race([customElements.whenDefined("partial-panel-resolver"), new Promise((e, t) => setTimeout(() => t(/* @__PURE__ */ Error("timeout")), 1e4))]);
		let e = document.createElement("partial-panel-resolver");
		e.hass = { panels: [{
			url_path: "history",
			component_name: "history"
		}] }, e._updateRoutes(), await e.routerOptions?.routes?.history?.load(), await customElements.whenDefined("ha-date-range-picker");
	} catch (e) {
		console.warn("[ha-better-history] Failed to load ha-date-range-picker:", e);
	}
}
var Dt = 8, Ot = 50, kt = 20, At = [
	{
		name: "search_labels.entityName",
		weight: 10
	},
	{
		name: "search_labels.friendlyName",
		weight: 8
	},
	{
		name: "search_labels.deviceName",
		weight: 7
	},
	{
		name: "search_labels.areaName",
		weight: 6
	},
	{
		name: "search_labels.domainName",
		weight: 6
	},
	{
		name: "search_labels.entityId",
		weight: 3
	}
];
function $(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function jt(e) {
	return typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id;
}
function Mt(e) {
	return typeof e == "string" && e.trim() !== "" ? e : void 0;
}
function Nt(...e) {
	return e.find((e) => Mt(e) !== void 0);
}
function Pt(e) {
	return e.split(".")[0] ?? e;
}
function Ft(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function It(e, t) {
	let n = jt(t), r = e.entities?.[t.entity_id], i = r?.device_id ? e.devices?.[r.device_id] : void 0, a = r?.area_id ?? i?.area_id, o = a ? e.areas?.[a] : void 0, s = Nt(r?.name_by_user, r?.name, r?.original_name, n) ?? t.entity_id, c = Nt(i?.name_by_user, i?.name), l = Nt(o?.name), u = Pt(t.entity_id);
	return {
		id: t.entity_id,
		primary: n,
		secondary: t.entity_id,
		sorting_label: [n, t.entity_id].join("_"),
		search_labels: {
			entityName: s,
			friendlyName: n,
			deviceName: c ?? null,
			areaName: l ?? null,
			domainName: u,
			entityId: t.entity_id
		}
	};
}
function Lt(e, t) {
	return e ? (t ?? Object.values(e.states).filter((e) => e !== void 0)).map((t) => It(e, t)) : [];
}
function Rt(e, t) {
	if (e === t) return 0;
	if (Math.abs(e.length - t.length) > 2) return 3;
	let n = Array.from({ length: t.length + 1 }, (e, t) => t), r = Array(t.length + 1);
	for (let i = 1; i <= e.length; i += 1) {
		r[0] = i;
		for (let a = 1; a <= t.length; a += 1) {
			let o = e[i - 1] === t[a - 1] ? 0 : 1;
			r[a] = Math.min(r[a - 1] + 1, n[a] + 1, n[a - 1] + o);
		}
		n.splice(0, n.length, ...r);
	}
	return n[t.length] ?? 3;
}
function zt(e) {
	return [
		e.primary,
		e.secondary,
		e.id,
		...Object.values(e.search_labels).filter((e) => typeof e == "string")
	].filter((e) => typeof e == "string").map(Ft);
}
function Bt(e, t) {
	let n;
	for (let r of t) {
		if (r === e) {
			n = Math.max(n ?? 0, 120);
			continue;
		}
		let t = r.split(/[\s_.-]+/).filter(Boolean);
		if (t.some((t) => t === e)) {
			n = Math.max(n ?? 0, 110);
			continue;
		}
		if (t.some((t) => t.startsWith(e))) {
			n = Math.max(n ?? 0, 95);
			continue;
		}
		if (r.includes(e)) {
			n = Math.max(n ?? 0, 80);
			continue;
		}
		e.length >= 4 && t.some((t) => Rt(e, t) <= 1) && (n = Math.max(n ?? 0, 65));
	}
	return n;
}
function Vt(e, t, n = kt) {
	let r = Ft(t).split(/\s+/).filter(Boolean);
	return r.length === 0 ? [] : e.map((e) => {
		let t = zt(e), n = 0;
		for (let e of r) {
			let r = Bt(e, t);
			if (r === void 0) return;
			n += r;
		}
		return {
			item: e,
			score: n
		};
	}).filter((e) => e !== void 0).sort((e, t) => t.score - e.score || e.item.primary.localeCompare(t.item.primary)).slice(0, n).map((e) => e.item);
}
var Ht = !1;
async function Ut() {
	Ht || (Ht = !0, await Ct());
}
function Wt() {
	return customElements.get("ha-generic-picker") !== void 0;
}
function Gt(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0, n = on(e);
	return I`
    <div class="entity-picker"
      @picker-opened=${e.onEntityPickerOpened}
      @picker-closed=${e.onEntityPickerClosed}
    >
      <div class="entity-menu" ?open=${e.menuOpen} @click=${(e) => e.stopPropagation()}>
        <div class="entity-menu-top">
          <span class="entity-menu-title">${t ? jt(t) : ""}</span>
          <button class="entity-menu-close" @click=${e.onCloseMenu}>&#x2715;</button>
        </div>
        ${Zt(e)}
      </div>
      ${e.hideEmptyPickerState ? Kt(e) : I`
        <ha-generic-picker
          class="entity-trigger"
          .hass=${e.hass}
          .addButtonLabel=${Q(e.hass, "add_target")}
          .value=${""}
          .getItems=${e.getItems}
          .emptyLabel=${""}
          .searchLabel=${Q(e.hass, "search_entity")}
          .searchKeys=${At}
          @value-changed=${(t) => {
		let n = t.detail.value;
		n && e.onEntitySelected(n);
	}}
        ></ha-generic-picker>
      `}
      ${e.loading ? I`
            <div class="history-loading-indicator" role="status" aria-label=${Q(e.hass, "loading")}>
              <span class="history-loading-spinner"></span>
              <span class="history-loading-text">${Q(e.hass, "loading")}</span>
            </div>
          ` : R}
      ${n.length > 0 ? I`
        <div
          class="entity-row"
          @dragover=${(t) => e.onSourceDragOver(void 0, t)}
          @drop=${(t) => e.onSourceDrop(void 0, t)}
        >
          ${n.map((t) => Yt(t, e))}
        </div>
      ` : R}
    </div>
  `;
}
function Kt(e) {
	let t = Q(e.hass, "add_target"), n = Q(e.hass, "search_entity"), r = e.entitySearch ?? "", i = r.trim() ? e.getAdditionalItems(r).filter(qt) : [];
	return I`
    <ha-button
      class="entity-trigger entity-add-trigger"
      size="small"
      appearance="filled"
      @click=${e.onEntityPickerOpened}
    >
      <ha-icon icon="mdi:playlist-plus" slot="start"></ha-icon>
      ${t}
    </ha-button>
    <div class="entity-select-menu" ?open=${e.entityPickerOpen} @click=${(e) => e.stopPropagation()}>
      <input
        class="entity-browser-search-input"
        type="search"
        .value=${r}
        placeholder=${n}
        aria-label=${n}
        @input=${(t) => e.onEntitySearchChanged?.(t.target.value)}
        @click=${(e) => e.stopPropagation()}
        @keydown=${(e) => e.stopPropagation()}
      />
      ${i.length > 0 ? I`
        <div class="entity-select-results">
          ${i.map((t) => I`
            <button
              class="entity-select-result"
              @click=${() => {
		e.onEntitySearchChanged?.(""), e.onEntitySelected(t.id);
	}}
            >
              <span class="entity-browser-entry-label">${t.primary}</span>
              ${t.secondary ? I`<span class="entity-browser-entry-secondary">${t.secondary}</span>` : R}
            </button>
          `)}
        </div>
      ` : R}
    </div>
  `;
}
function qt(e) {
	return $(e) && typeof e.id == "string" && typeof e.primary == "string";
}
function Jt(e) {
	let t = e.attributes.icon;
	return typeof t == "string" && t ? t : {
		climate: "mdi:thermostat",
		sensor: "mdi:eye",
		binary_sensor: "mdi:radiobox-marked",
		light: "mdi:lightbulb",
		switch: "mdi:toggle-switch",
		input_boolean: "mdi:toggle-switch",
		fan: "mdi:fan",
		cover: "mdi:window-shutter",
		lock: "mdi:lock",
		media_player: "mdi:cast",
		vacuum: "mdi:robot-vacuum",
		camera: "mdi:camera",
		weather: "mdi:weather-partly-cloudy",
		device_tracker: "mdi:map-marker",
		person: "mdi:account",
		sun: "mdi:white-balance-sunny",
		alarm_control_panel: "mdi:shield",
		automation: "mdi:robot",
		script: "mdi:script-text",
		scene: "mdi:palette",
		timer: "mdi:timer"
	}[e.entity_id.split(".")[0]] ?? "mdi:bookmark";
}
function Yt(e, t) {
	let n = rn(e.id, t), r = tn(e.id, t), i = e.kind === "entity_state", a = t.hass?.states[e.entityId], o = i ? "entity-source-chip" : "attr-source-chip", s = t.draggingSourceId === e.id;
	return I`
    <div
      class="source-chip ${o}"
      draggable=${r && !n}
      ?dragging=${s}
      @dragstart=${(i) => {
		r && !n && t.onSourceDragStart(e.id, i);
	}}
      @dragend=${() => t.onSourceDragEnd()}
      @dragover=${(i) => {
		r && !n && t.onSourceDragOver(e.id, i);
	}}
      @drop=${(n) => t.onSourceDrop(e.id, n)}
    >
      <span class="source-chip-icon">
        ${i && a ? I`<ha-icon .icon=${Jt(a)}></ha-icon>` : I`<ha-icon .icon=${Xt(e.valueType)}></ha-icon>`}
      </span>
      <span class="source-chip-label">${e.label}</span>
      ${n ? R : I`<button
            class="source-chip-remove"
            @click=${(n) => {
		n.preventDefault(), t.onSourceRemoved(e.id);
	}}
          >&#x2715;</button>`}
    </div>
  `;
}
function Xt(e) {
	switch (e) {
		case "number": return "mdi:chart-line";
		case "string": return "mdi:text";
		case "boolean": return "mdi:toggle-switch";
		default: return "mdi:code-tags";
	}
}
function Zt(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0, n = e.path, r = t ? (() => {
		if (n.length === 0) return t.attributes;
		let e = t.attributes;
		for (let t of n) {
			if (!$(e)) return;
			e = e[t];
		}
		return e;
	})() : void 0;
	return I`
    <div class="entity-browser">
      ${Qt(t, e)}
      <div class="entity-browser-list">
        ${t ? $t(t, n, $(r) ? r : {}, e) : I`<div class="entity-browser-empty">${Q(e.hass, "no_entity_selected")}</div>`}
      </div>
    </div>
  `;
}
function Qt(e, t) {
	return !e || t.path.length === 0 ? I`` : I`
    <div class="entity-breadcrumb">
      ${t.path.map((e, n) => I`
          ${n > 0 ? I`<span class="entity-breadcrumb-sep">/</span>` : R}
          <button class="entity-crumb" @click=${() => t.onBreadcrumbClick(t.path.slice(0, n + 1))}>${e}</button>
        `)}
    </div>
  `;
}
function $t(e, t, n, r) {
	let i = Object.entries(n).sort(([e], [t]) => e.localeCompare(t)), a = i.some(([n, r]) => $(r) ? !0 : Y(r) !== void 0 && !!X(e, [...t, n]));
	return I`
    <div class="entity-browser-entries">
      ${t.length > 0 ? I`
            <div class="entity-browser-back" @click=${() => r.onBreadcrumbClick(t.slice(0, -1))}>
              &#x2190; ${Q(r.hass, "back")}
            </div>
          ` : I`
            ${ln(e, r)}
            ${a ? I`
                  <div class="entity-browser-section-title">${Q(r.hass, "attributes")}</div>
                  ${en(r)}
                ` : R}
          `}
      ${t.length === 0 && r.attributeSearch.trim() ? fn(e, r) : i.map(([n, i]) => un(e, n, i, t, r))}
    </div>
  `;
}
function en(e) {
	let t = Q(e.hass, "search_attributes");
	return I`
    <div class="entity-browser-search">
      <input
        class="entity-browser-search-input"
        type="search"
        .value=${e.attributeSearch}
        placeholder=${t}
        aria-label=${t}
        @input=${(t) => e.onAttributeSearchChanged(t.target.value)}
        @click=${(e) => e.stopPropagation()}
        @keydown=${(e) => e.stopPropagation()}
      />
    </div>
  `;
}
function tn(e, t) {
	return t.selectedSources.some((t) => t.id === e);
}
function nn(e, t) {
	return (t.resolved?.series ?? []).some((t) => t.id === e);
}
function rn(e, t) {
	return (t.resolved?.series ?? []).some((t) => t.id === e && t.forced !== !1);
}
function an(e) {
	return {
		id: e.id,
		kind: e.attribute ? "entity_attribute" : "entity_state",
		entityId: e.entity,
		label: e.label,
		path: e.attribute,
		valueType: e.valueType,
		unit: e.unit
	};
}
function on(e) {
	let t = [...(e.resolved?.series ?? []).filter((e) => e.forced === !1).map(an), ...e.selectedSources], n = /* @__PURE__ */ new Set();
	return t.filter((e) => n.has(e.id) ? !1 : (n.add(e.id), !0));
}
function sn(e, t) {
	let n = t.selectedSources.some((t) => t.entityId === e), r = (t.resolved?.series ?? []).some((t) => t.entity === e);
	return n || r;
}
function cn(e, t) {
	if (!e.entity_id.startsWith("climate.")) return !1;
	let n = t.selectedSources.some((t) => t.entityId.startsWith("climate.") && t.entityId !== e.entity_id), r = (t.resolved?.series ?? []).some((t) => t.entity.startsWith("climate.") && t.entity !== e.entity_id);
	return n || r;
}
function ln(e, t) {
	let n = et(e);
	return n ? cn(e, t) ? I`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : tn(n.id, t) ? I`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onSourceRemoved(n.id)}>
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : nn(n.id, t) ? rn(n.id, t) ? I`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--forced">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : I`
        <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onSourceRemoved(n.id)}>
          <span class="entity-browser-entry-label">${e.entity_id}</span>
        </div>
      ` : sn(e.entity_id, t) ? I`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : I`
    <div class="entity-browser-entity" @click=${() => t.onSourceAdded(n)}>
      <span class="entity-browser-entry-label">${e.entity_id}</span>
    </div>
  ` : R;
}
function un(e, t, n, r, i) {
	if ($(n)) return I`
      <div class="entity-browser-entry" @click=${() => i.onBreadcrumbClick([...r, t])}>
        <span class="entity-browser-entry-label">${t}</span>
        <span class="entity-browser-entry-arrow">&#x203A;</span>
      </div>
    `;
	let a = Y(n), o = [...r, t];
	if (!a) return R;
	let s = X(e, o);
	return s ? dn({
		label: t,
		source: s,
		type: a,
		opts: i
	}) : R;
}
function dn(e) {
	let { label: t, source: n, type: r, opts: i, secondary: a } = e, o = I`
    <span class="entity-browser-entry-text">
      <span class="entity-browser-entry-label">${t}</span>
      ${a ? I`<span class="entity-browser-entry-secondary">${a}</span>` : R}
    </span>
    <span class="entity-browser-entry-type">${r}</span>
  `;
	return tn(n.id, i) ? I`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--removable" @click=${() => i.onSourceRemoved(n.id)}>
        ${o}
      </div>
    ` : nn(n.id, i) ? rn(n.id, i) ? I`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--forced">
        ${o}
      </div>
    ` : I`
        <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--removable" @click=${() => i.onSourceRemoved(n.id)}>
          ${o}
        </div>
      ` : I`
    <div class="entity-browser-entry" @click=${() => i.onSourceAdded(n)}>
      ${o}
    </div>
  `;
}
function fn(e, t) {
	let n = pn(e, e.attributes, t.attributeSearch), r = n.slice(0, Ot);
	return r.length === 0 ? I`<div class="entity-browser-search-empty">${Q(t.hass, "no_matching_attributes")}</div>` : I`
    <div class="entity-browser-search-results">
      ${r.map((e) => dn({
		label: e.key,
		source: e.source,
		type: e.valueType,
		opts: t,
		secondary: e.dottedPath
	}))}
      ${n.length > r.length ? I`<div class="entity-browser-search-count">${Q(t.hass, "attribute_results_limited")}</div>` : R}
    </div>
  `;
}
function pn(e, t, n) {
	let r = n.trim().toLocaleLowerCase();
	if (!r) return [];
	let i = [], a = (t, n, o) => {
		if (!(o > Dt)) for (let [s, c] of Object.entries(t)) {
			let t = [...n, s];
			if ($(c)) {
				a(c, t, o + 1);
				continue;
			}
			let l = Y(c), u = l ? X(e, t) : void 0;
			!l || !u || mn(t, c).includes(r) && i.push({
				key: s,
				dottedPath: t.join("."),
				valueType: l,
				source: u
			});
		}
	};
	return a(t, [], 0), i.sort((e, t) => {
		let n = hn(e, r), i = hn(t, r);
		return n === i ? e.dottedPath.length === t.dottedPath.length ? e.dottedPath.localeCompare(t.dottedPath) : e.dottedPath.length - t.dottedPath.length : n - i;
	});
}
function mn(e, t) {
	let n = typeof t == "string" || typeof t == "number" || typeof t == "boolean" ? String(t) : "";
	return [
		...e,
		e.join("."),
		n
	].join(" ").toLocaleLowerCase();
}
function hn(e, t) {
	let n = e.key.toLocaleLowerCase(), r = e.dottedPath.toLocaleLowerCase();
	return n.startsWith(t) ? 0 : r.startsWith(t) ? 1 : n.includes(t) ? 2 : r.includes(t) ? 3 : 4;
}
function gn(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region ../ha-better-history/node_modules/@lit/reactive-element/decorators/property.js
var _n = {
	attribute: !0,
	type: String,
	converter: b,
	reflect: !1,
	hasChanged: x
}, vn = (e = _n, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function yn(e) {
	return (t, n) => typeof n == "object" ? vn(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region ../ha-better-history/node_modules/@lit/reactive-element/decorators/state.js
function bn(e) {
	return yn({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
export { ue as C, I as S, Oe as _, Ct as a, G as b, Ut as c, ct as d, K as f, Vt as g, ot as h, Gt as i, Wt as l, Tt as m, yn as n, Q as o, gt as p, Lt as r, et as s, bn as t, X as u, bt as v, o as w, R as x, gn as y };
