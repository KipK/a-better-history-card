//#region node_modules/@lit/reactive-element/css-tag.js
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
			let n = new Set(e.flat(1 / 0).reverse());
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
//#region node_modules/lit-html/lit-html.js
var ee = globalThis, te = (e) => e, w = ee.trustedTypes, ne = w ? w.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, re = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, ie = "?" + T, ae = `<${ie}>`, oe = document, se = () => oe.createComment(""), ce = (e) => e === null || typeof e != "object" && typeof e != "function", le = Array.isArray, ue = (e) => le(e) || typeof e?.[Symbol.iterator] == "function", de = "[ 	\n\f\r]", fe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pe = /-->/g, me = />/g, he = RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), ge = /'/g, _e = /"/g, ve = /^(?:script|style|textarea|title)$/i, ye = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), E = ye(1), D = ye(2), be = Symbol.for("lit-noChange"), O = Symbol.for("lit-nothing"), xe = /* @__PURE__ */ new WeakMap(), Se = oe.createTreeWalker(oe, 129);
function Ce(e, t) {
	if (!le(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ne === void 0 ? t : ne.createHTML(t);
}
var we = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = fe;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === fe ? c[1] === "!--" ? o = pe : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = he) : (ve.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = he) : o = me : o === he ? c[0] === ">" ? (o = i ?? fe, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? he : c[3] === "\"" ? _e : ge) : o === _e || o === ge ? o = he : o === pe || o === me ? o = fe : (o = he, i = void 0);
		let d = o === he && e[t + 1].startsWith("/>") ? " " : "";
		a += o === fe ? n + ae : l >= 0 ? (r.push(s), n.slice(0, l) + re + n.slice(l) + T + d) : n + T + (l === -2 ? t : d);
	}
	return [Ce(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Te = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = we(t, n);
		if (this.el = e.createElement(l, r), Se.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = Se.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(re)) {
					let t = u[o++], n = i.getAttribute(e).split(T), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ae : r[1] === "?" ? je : r[1] === "@" ? Me : ke
					}), i.removeAttribute(e);
				} else e.startsWith(T) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (ve.test(i.tagName)) {
					let e = i.textContent.split(T), t = e.length - 1;
					if (t > 0) {
						i.textContent = w ? w.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], se()), Se.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], se());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === ie) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(T, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += T.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = oe.createElement("template");
		return n.innerHTML = e, n;
	}
};
function Ee(e, t, n = e, r) {
	if (t === be) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = ce(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = Ee(e, i._$AS(e, t.values), i, r)), t;
}
var De = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? oe).importNode(t, !0);
		Se.currentNode = r;
		let i = Se.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Oe(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ne(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = Se.nextNode(), a++);
		}
		return Se.currentNode = oe, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Oe = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = O, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = Ee(this, e, t), ce(e) ? e === O || e == null || e === "" ? (this._$AH !== O && this._$AR(), this._$AH = O) : e !== this._$AH && e !== be && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ue(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== O && ce(this._$AH) ? this._$AA.nextSibling.data = e : this.T(oe.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Te.createElement(Ce(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new De(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = xe.get(e.strings);
		return t === void 0 && xe.set(e.strings, t = new Te(e)), t;
	}
	k(t) {
		le(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(se()), this.O(se()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = te(e).nextSibling;
			te(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, ke = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = O, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = O;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = Ee(this, e, t, 0), a = !ce(e) || e !== this._$AH && e !== be, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = Ee(this, r[n + o], t, o), s === be && (s = this._$AH[o]), a ||= !ce(s) || s !== this._$AH[o], s === O ? e = O : e !== O && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === O ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ae = class extends ke {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === O ? void 0 : e;
	}
}, je = class extends ke {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== O);
	}
}, Me = class extends ke {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = Ee(this, e, t, 0) ?? O) === be) return;
		let n = this._$AH, r = e === O && n !== O || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== O && (n === O || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ne = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		Ee(this, e);
	}
}, Pe = ee.litHtmlPolyfillSupport;
Pe?.(Te, Oe), (ee.litHtmlVersions ??= []).push("3.3.3");
var Fe = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Oe(t.insertBefore(se(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Ie = globalThis, k = class extends C {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Fe(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return be;
	}
};
k._$litElement$ = !0, k.finalized = !0, Ie.litElementHydrateSupport?.({ LitElement: k });
var Le = Ie.litElementPolyfillSupport;
Le?.({ LitElement: k }), (Ie.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/property.js
var Re = {
	attribute: !0,
	type: String,
	converter: b,
	reflect: !1,
	hasChanged: x
}, ze = (e = Re, t, n) => {
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
function A(e) {
	return (t, n) => typeof n == "object" ? ze(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function j(e) {
	return A({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/@kipk/load-ha-components/dist/load-ha-components.js
var Be = 1e4, Ve = class extends Error {
	result;
	cause;
	constructor(e, t) {
		super(e.missing.length > 0 ? `Unable to load Home Assistant components: ${e.missing.join(", ")}` : "Unable to load Home Assistant components"), this.name = "HaComponentsLoadError", this.result = Ge(e), this.cause = t;
	}
}, He = [
	"ha-form",
	"ha-icon",
	"ha-icon-button",
	"ha-selector",
	"ha-textfield",
	"ha-icon-picker",
	"ha-entity-picker",
	"ha-select",
	"ha-dialog",
	"ha-sortable",
	"ha-svg-icon",
	"ha-alert",
	"ha-button",
	"ha-color-picker",
	"ha-badge",
	"ha-sankey-chart"
], Ue = {
	"ha-target-picker": ["history"],
	"ha-date-range-picker": ["history"]
}, We = /* @__PURE__ */ new Map();
function Ge(e) {
	return {
		requested: [...e.requested],
		alreadyDefined: [...e.alreadyDefined],
		loaded: [...e.loaded],
		missing: [...e.missing],
		attemptedStrategies: [...e.attemptedStrategies]
	};
}
function Ke(e) {
	let t = e ?? He, n = /* @__PURE__ */ new Set();
	for (let e of t) {
		let t = e.trim();
		t && n.add(t);
	}
	return [...n];
}
function qe(e) {
	return typeof e == "number" && Number.isFinite(e) && e > 0 ? e : Be;
}
function Je(e, t) {
	let n = Error(e);
	return t !== void 0 && (n.cause = t), n;
}
function Ye(e, t, n) {
	let r, i = Promise.resolve(e).catch((e) => {
		throw Je(`Failed while ${n}`, e);
	}), a = new Promise((e, i) => {
		r = setTimeout(() => {
			i(Je(`Timed out while ${n}`));
		}, t);
	});
	return Promise.race([i, a]).finally(() => {
		r !== void 0 && clearTimeout(r);
	});
}
function Xe() {
	return typeof window < "u" && typeof document < "u" && Ze();
}
function Ze() {
	return typeof customElements < "u" && customElements !== null && typeof customElements.get == "function" && typeof customElements.whenDefined == "function";
}
function Qe(e) {
	return customElements.get(e) !== void 0;
}
function $e(e) {
	return Ue[e] ?? ["config-automation"];
}
function et(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) for (let e of $e(n)) t.add(e);
	return [...t];
}
function tt(e, t, n) {
	let r = e?.routes?.[t]?.load;
	if (typeof r != "function") throw Je(`No load() route for ${t} in ${n}`);
	return r;
}
async function nt(e, t, n) {
	if (!Xe()) throw Je("A DOM environment is required to load Home Assistant components");
	await Ye(customElements.whenDefined("partial-panel-resolver"), n, "waiting for partial-panel-resolver");
	let r = document.createElement("partial-panel-resolver");
	if (!r) throw Je("Failed to create partial-panel-resolver");
	let i = { [t]: {
		url_path: t,
		component_name: e
	} }, a;
	if (typeof r._getRoutes == "function") a = r._getRoutes(i);
	else if (typeof r._updateRoutes == "function") {
		r.hass = { panels: i };
		let e = r._updateRoutes();
		typeof e == "object" && e && "then" in e && typeof e.then == "function" && Promise.resolve(e).catch(() => void 0), a = r.routerOptions;
	} else throw Je("partial-panel-resolver exposes neither _getRoutes() nor _updateRoutes()");
	await Ye(tt(a, t, "partial-panel-resolver").call(a?.routes?.[t]), n, `loading ${e} panel`);
}
async function rt(e) {
	await nt("config", "tmp", e), await Ye(customElements.whenDefined("ha-panel-config"), e, "waiting for ha-panel-config");
	let t = document.createElement("ha-panel-config");
	if (!t) throw Je("Failed to create ha-panel-config");
	await Ye(tt(t.routerOptions, "automation", "ha-panel-config").call(t.routerOptions?.routes?.automation), e, "loading automation route");
}
function it(e) {
	return nt("history", "history", e);
}
var at = {
	"config-automation": rt,
	history: it
};
function ot(e, t) {
	let n = We.get(e);
	if (n) return n;
	let r;
	return r = at[e](t).catch((t) => {
		throw We.get(e) === r && We.delete(e), t;
	}), We.set(e, r), r;
}
function st(e, t, n) {
	let r = e.filter((e) => !Qe(e)), i = new Set(t);
	return {
		requested: [...e],
		alreadyDefined: [...t],
		loaded: e.filter((e) => !i.has(e) && !r.includes(e)),
		missing: r,
		attemptedStrategies: [...n]
	};
}
function ct(e, t) {
	for (let [n, r] of t) e.some((e) => $e(e).includes(n)) && We.get(n) === r && We.delete(n);
}
async function lt(e, t) {
	let n = Ke(e), r = [], i = Ze() ? n.filter(Qe) : [];
	if (i.length === n.length) return st(n, i, r);
	if (!Xe()) {
		let e = new Set(i);
		throw new Ve({
			requested: [...n],
			alreadyDefined: [...i],
			loaded: [],
			missing: n.filter((t) => !e.has(t)),
			attemptedStrategies: r
		}, Je("A DOM environment is required to load Home Assistant components"));
	}
	let a = qe(t?.timeoutMs), o = /* @__PURE__ */ new Map(), s;
	try {
		for (let e of et(n.filter((e) => !i.includes(e)))) {
			if (!n.filter((e) => !Qe(e)).some((t) => $e(t).includes(e))) continue;
			r.push(e);
			let t = ot(e, a);
			o.set(e, t), await t;
		}
	} catch (e) {
		s = e;
	}
	let c = st(n, i, r);
	if (s !== void 0 || c.missing.length > 0) throw ct(c.missing, o), new Ve(c, s);
	return c;
}
//#endregion
//#region node_modules/@kipk/ha-better-history/dist/all.js
var ut = /* @__PURE__ */ new Set(["unknown", "unavailable"]);
function dt(e) {
	return e == null || typeof e == "string" && ut.has(e);
}
function ft(e) {
	if (!(dt(e) || typeof e != "string" || e.trim() === "")) return e;
}
function pt(e) {
	if (dt(e)) return;
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (typeof e != "string" || e.trim() === "") return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function M() {
	return typeof performance < "u" ? performance.now() : Date.now();
}
function N(e, t, n) {
	e && console.debug("[ha-better-history][perf]", t, n);
}
async function mt(e, t = {}) {
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
function ht(e) {
	return e.map((e) => JSON.stringify([e.id, e.valueType])).sort().join(",");
}
var gt = 6e4, _t = 3, vt = 350, yt = 216e5, bt = 36e5, xt = 432e5, St = 2500, Ct = 8e3, wt = 15e3, Tt = 300, Et = 700, Dt = 1100, Ot = 80;
function kt(e) {
	if (e.length <= 2) return e;
	let t = [e[0]];
	for (let n = 1; n < e.length - 1; n++) {
		let r = e[n], i = e[n - 1], a = e[n + 1];
		(r.value !== i.value || a.value !== r.value) && t.push(r);
	}
	return t.push(e[e.length - 1]), t;
}
var At = class extends Error {
	constructor(e) {
		super(`History chunk timed out after ${e}ms`), this.name = "HistoryChunkTimeoutError";
	}
};
function jt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Mt(e, t) {
	return t.reduce((e, t) => jt(e) ? e[t] : void 0, e);
}
function Nt(e) {
	return e[e.length - 1] ?? "";
}
function Pt(e) {
	return e instanceof Error ? e.message : String(e);
}
function Ft(e) {
	if (!jt(e)) return;
	let t = e.status ?? e.statusCode ?? e.status_code;
	return typeof t == "number" ? t : void 0;
}
function It(e) {
	if (!jt(e)) return "";
	let t = e.code;
	return typeof t == "string" ? t.toLowerCase() : "";
}
function Lt(e) {
	if (e instanceof At) return !0;
	let t = Ft(e);
	if (t !== void 0) return t === 408 || t === 429 || t >= 500;
	let n = Pt(e).toLowerCase(), r = `${It(e)} ${n}`;
	return r.includes("timeout") || r.includes("timed out") || r.includes("network") || r.includes("failed to fetch") || r.includes("connection") || r.includes("temporarily unavailable") || r.includes("unavailable") || r.includes("aborted");
}
function Rt(e, t) {
	let n = Math.floor(Math.random() * Math.max(1, t));
	return t * 2 ** Math.max(0, e - 1) + n;
}
function zt(e) {
	return new Promise((t) => setTimeout(t, e));
}
function Bt(e = 80) {
	let t = globalThis.requestIdleCallback;
	return t ? new Promise((n) => t(() => n(), { timeout: e })) : new Promise((e) => {
		typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => e()) : setTimeout(e, 0);
	});
}
async function Vt(e, t) {
	let n;
	try {
		return await Promise.race([e, new Promise((e, r) => {
			n = setTimeout(() => r(new At(t)), t);
		})]);
	} finally {
		n !== void 0 && clearTimeout(n);
	}
}
function Ht(e) {
	if (typeof e == "number" && Number.isFinite(e)) return "number";
	if (typeof e == "boolean") return "boolean";
	if (typeof e == "string" && e !== "") return "string";
}
function Ut(e) {
	let t = Number(e.state), n = e.attributes.unit_of_measurement, r = e.attributes.state_class, i = typeof r == "string" && r.trim() !== "" || typeof n == "string" && n.trim() !== "", a = dt(e.state) && i ? "number" : Ht(Number.isFinite(t) ? t : e.state);
	if (a) return {
		id: `state:${e.entity_id}`,
		kind: "entity_state",
		entityId: e.entity_id,
		label: e.attributes.friendly_name && typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id,
		valueType: a,
		unit: a === "number" && typeof n == "string" && n !== "" ? n : void 0
	};
}
function Wt(e, t, n) {
	let r = Mt(e.attributes, t), i = Ht(typeof r == "string" && Number.isFinite(Number(r)) ? Number(r) : r);
	if (i) return {
		id: `attr:${e.entity_id}:${t.join(".")}`,
		kind: "entity_attribute",
		entityId: e.entity_id,
		label: n ?? Nt(t),
		path: t,
		valueType: i
	};
}
function Gt(e, t) {
	return t === "number" ? pt(e) : t === "boolean" ? typeof e == "boolean" ? e : void 0 : ft(e);
}
function Kt(e, t) {
	let n = e.attributes ?? e.a ?? {};
	return Gt(t.kind === "entity_state" ? e.state ?? e.s : Mt(n, t.path ?? []), t.valueType);
}
function qt(e) {
	if (typeof e.lu == "number") return e.lu * 1e3;
	let t = e.last_updated ?? e.last_changed;
	return t ? Date.parse(t) : NaN;
}
function Jt(e, t, n) {
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
function Yt(e, t) {
	let n = /* @__PURE__ */ new Map();
	if (Array.isArray(e)) return e.forEach((e, r) => {
		let i = e[0]?.entity_id ?? t[r];
		i && n.set(i, e);
	}), n;
	for (let [t, r] of Object.entries(e)) Array.isArray(r) && n.set(t, r);
	return n;
}
function Xt(e, t, n = Date.now()) {
	let r = e.states[t.entityId];
	if (!r) return;
	let i = {
		entity_id: r.entity_id,
		state: r.state,
		last_changed: r.last_changed,
		last_updated: r.last_updated,
		attributes: r.attributes
	}, a = Kt(i, t), o = qt(i), s = Number.isFinite(o) ? o : n;
	return a === void 0 || !Number.isFinite(s) ? void 0 : {
		time: s,
		value: a
	};
}
function Zt(e, t, n, r) {
	let i = Xt(e, t, n.getTime());
	return i ? [{
		time: n.getTime(),
		value: i.value
	}, {
		time: Math.min(r.getTime(), Date.now()),
		value: i.value
	}] : [];
}
var Qt = class {
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
		return i ? en(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : !1;
	}
	missingIntervals(e, t, n, r) {
		let i = this._entities.get(e);
		return nn(i ? r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage] : [], t.getTime(), n.getTime()).map((e) => ({
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
		a.states = rn([...a.states, ...t]), a.stateCoverage = $t([...a.stateCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}]), i === "full" && (a.fullCoverage = $t([...a.fullCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}])), this._entities.set(e, a);
	}
	buildSeries(e, t, n, r) {
		let i = e.kind === "entity_attribute" ? "full" : "state", a = this.coverageEnd(e.entityId, n, r, i);
		return ln(e, this._entities.get(e.entityId)?.states ?? [], t, n, new Date(a));
	}
	coverageEnd(e, t, n, r) {
		let i = this._entities.get(e);
		return i ? tn(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : n.getTime();
	}
};
function $t(e) {
	let t = e.filter((e) => e.endTime > e.startTime).sort((e, t) => e.startTime - t.startTime), n = [];
	for (let e of t) {
		let t = n[n.length - 1];
		t && e.startTime <= t.endTime + 1 ? t.endTime = Math.max(t.endTime, e.endTime) : n.push({ ...e });
	}
	return n;
}
function en(e, t, n) {
	return tn(e, t, n) >= n - 1;
}
function tn(e, t, n) {
	if (n <= t) return n;
	let r = t;
	for (let t of $t(e)) if (!(t.endTime < r)) {
		if (t.startTime > r + 1) break;
		if (r = Math.max(r, t.endTime), r >= n - 1) return n;
	}
	return r;
}
function nn(e, t, n) {
	if (n <= t) return [];
	let r = [], i = t;
	for (let t of $t(e)) if (!(t.endTime <= i) && (t.startTime > i + 1 && r.push({
		startTime: i,
		endTime: Math.min(t.startTime, n)
	}), i = Math.max(i, t.endTime), i >= n)) break;
	return i < n && r.push({
		startTime: i,
		endTime: n
	}), r;
}
function rn(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = qt(n);
		Number.isFinite(e) && t.set(e, n);
	}
	return [...t.entries()].sort(([e], [t]) => e - t).map(([, e]) => e);
}
function an(e, t) {
	let n = t.normalizeDurationMs + t.mergeDurationMs + t.buildDurationMs, r = t.stateCount >= wt || t.requestDurationMs >= Dt, i = r || t.stateCount >= Ct || t.requestDurationMs >= Et || n >= Ot, a = t.stateCount <= St && t.requestDurationMs <= Tt && n <= Ot / 2;
	return i && e > bt ? {
		nextChunkMs: Math.max(bt, Math.floor(e / (r ? 4 : 2))),
		reason: "decrease"
	} : a && e < xt ? {
		nextChunkMs: Math.min(xt, e * 2),
		reason: "increase"
	} : {
		nextChunkMs: e,
		reason: "keep"
	};
}
async function on(e, t, n, r, i, a, o) {
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
async function sn(e, t) {
	let n = 1;
	for (;;) {
		if (t.isCancelled?.()) throw Error("History request cancelled");
		let r = t.onPerformance ? M() : 0;
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
			let i = await Vt(e(), t.timeoutMs);
			return t.onPerformance?.({
				event: "history.chunk_success",
				details: {
					taskId: t.taskId,
					attempt: n,
					durationMs: Math.round(M() - r)
				}
			}), i;
		} catch (e) {
			let i = Lt(e), a = i && n < t.maxAttempts && !t.isCancelled?.();
			if (t.onPerformance?.({
				event: a ? "history.chunk_retry" : "history.chunk_error",
				details: {
					taskId: t.taskId,
					attempt: n,
					maxAttempts: t.maxAttempts,
					retryable: i,
					error: Pt(e),
					durationMs: Math.round(M() - r)
				}
			}), !a) throw e;
			await zt(Rt(n, t.retryBaseDelayMs)), n += 1;
		}
	}
}
async function cn(e, t, n, r, i, a, o = {}) {
	if (!e.callWS && !e.callApi) throw Error("Home Assistant history API is unavailable");
	let s = [...new Set(t.map((e) => e.entityId))], c = new Set(t.filter((e) => e.kind === "entity_state").map((e) => e.entityId)), l = new Set(t.filter((e) => e.kind === "entity_attribute").map((e) => e.entityId)), u = s.filter((e) => c.has(e)), d = s.filter((e) => l.has(e)), f = o.accumulator ?? new Qt(), p = [], m = Math.max(1, Math.floor(o.chunkTimeoutMs ?? gt)), h = Math.max(1, Math.floor(o.maxChunkAttempts ?? _t)), g = Math.max(0, Math.floor(o.chunkRetryBaseDelayMs ?? vt)), _ = (e, t) => sn(t, {
		taskId: e,
		timeoutMs: m,
		maxAttempts: h,
		retryBaseDelayMs: g,
		isCancelled: o.isCancelled,
		onPerformance: a
	}), v = /* @__PURE__ */ new Map(), y = (e, t, n, r, i, a, o) => {
		let s = [
			r,
			t.toISOString(),
			n.toISOString(),
			i ? "minimal" : "full",
			a ? "noattr" : "attrs",
			o ? "significant" : "all"
		].join("|"), c = v.get(s);
		c ? c.entityIds.push(e) : v.set(s, {
			entityIds: [e],
			start: t,
			end: n,
			coverageKind: r,
			minimalResponse: i,
			noAttributes: a,
			significantChangesOnly: o
		});
	}, b = [];
	for (let e of u) for (let t of f.missingIntervals(e, n, r, "state")) y(e, t.start, t.end, "state", !0, !0, !0);
	for (let e of d) for (let t of f.missingIntervals(e, n, r, "full")) b.push({
		entityId: e,
		start: t.start,
		end: t.end
	});
	let x = b.reduce((e, t) => {
		let n = t.end.getTime() - t.start.getTime();
		return e + Math.max(1, Math.ceil(n / yt));
	}, 0), S = v.size + x, C = 0, ee = /* @__PURE__ */ new Set(), te = async (s, c, l) => {
		let u = C;
		if (C += 1, o.isCancelled?.()) return {
			stateCount: 0,
			requestDurationMs: Math.round(l),
			normalizeDurationMs: 0,
			mergeDurationMs: 0,
			buildDurationMs: 0
		};
		await Bt();
		let d = M(), p = Yt(c, s.entityIds), m = M() - d, h = [...p.values()].reduce((e, t) => e + t.length, 0);
		a?.({
			event: "history.batch",
			details: {
				batchIndex: u,
				batchCount: S,
				entityCount: s.entityIds.length,
				stateCount: h,
				requestDurationMs: Math.round(l),
				normalizeDurationMs: Math.round(m)
			}
		});
		let g = M(), _ = /* @__PURE__ */ new Set();
		for (let [e, t] of p) f.integrate(e, t, s.start, s.end, s.coverageKind), _.add(e), ee.add(e);
		let v = M() - g;
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
			await Bt();
			let o = M(), c = /* @__PURE__ */ new Set();
			for (let i of t) ((s.coverageKind === "full" ? i.kind === "entity_attribute" : i.kind === "entity_state") && _.has(i.entityId) || !w.has(i.id)) && (i.kind === "entity_attribute" ? f.hasFullStates(i.entityId) : f.hasStates(i.entityId)) && (w.set(i.id, f.buildSeries(i, e, n, r)), c.add(i.id));
			let l = t.map((e) => w.get(e.id)).filter((e) => e !== void 0);
			y = M() - o, a?.({
				event: "history.progress_series",
				details: {
					batchIndex: u,
					seriesCount: l.length,
					pointCount: l.reduce((e, t) => e + t.points.length, 0),
					buildDurationMs: Math.round(y)
				}
			}), i(l, [...c]), await Bt(120);
		}
		return {
			stateCount: h,
			requestDurationMs: Math.round(l),
			normalizeDurationMs: Math.round(m),
			mergeDurationMs: Math.round(v),
			buildDurationMs: Math.round(y)
		};
	};
	for (let t of v.values()) {
		let n = t.coverageKind === "full" ? "attr" : "state", r = [...new Set(t.entityIds)], i = `${n}:${r.join(",")}:${t.start.toISOString()}:${t.end.toISOString()}`;
		p.push({
			id: i,
			entityIds: r,
			start: t.start,
			end: t.end,
			coverageKind: t.coverageKind,
			run: () => _(i, () => on(e, r, t.start, t.end, t.minimalResponse, t.noAttributes, t.significantChangesOnly))
		});
	}
	a?.({
		event: "history.start",
		details: {
			sourceCount: t.length,
			entityCount: s.length,
			batchCount: S,
			attributeChunkHours: yt / 36e5,
			minAttributeChunkHours: bt / 36e5,
			maxAttributeChunkHours: xt / 36e5,
			adaptiveAttributeChunks: b.length > 0,
			cachedSourceCount: t.filter((e) => f.hasCoverage(e.entityId, n, r, e.kind === "entity_attribute" ? "full" : "state")).length,
			chunkTimeoutMs: m,
			maxChunkAttempts: h,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}
	});
	let w = /* @__PURE__ */ new Map();
	for (let i of t) (i.kind === "entity_attribute" ? f.hasFullStates(i.entityId) : f.hasStates(i.entityId)) && w.set(i.id, f.buildSeries(i, e, n, r));
	await mt(p, {
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
			await te(e, t, n);
		}
	});
	let ne = 0;
	for (let t of b) {
		let n = yt;
		for (let r = t.start.getTime(); r < t.end.getTime() && !o.isCancelled?.();) {
			let i = new Date(r), o = new Date(Math.min(r + n, t.end.getTime())), s = o.getTime() - i.getTime(), c = `attr:${t.entityId}:${i.toISOString()}:${o.toISOString()}`;
			a?.({
				event: "history.queue.task_start",
				details: {
					taskId: c,
					queuedCount: void 0,
					activeCount: 1,
					completedCount: ne
				}
			});
			let l = M(), u = await _(c, () => on(e, [t.entityId], i, o, !1, !1, !1)), d = M() - l;
			ne += 1, a?.({
				event: "history.queue.task_complete",
				details: {
					taskId: c,
					queuedCount: void 0,
					activeCount: 0,
					completedCount: ne
				}
			});
			let f = await te({
				id: c,
				entityIds: [t.entityId],
				start: i,
				end: o,
				coverageKind: "full"
			}, u, d), p = an(n, f);
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
	let re = a ? M() : 0, T = t.map((t) => {
		let i = w.get(t.id);
		return i && !ee.has(t.entityId) ? i : f.buildSeries(t, e, n, r);
	}), ie = a ? M() - re : 0;
	return a?.({
		event: "history.final_series",
		details: {
			seriesCount: T.length,
			pointCount: T.reduce((e, t) => e + t.points.length, 0),
			buildDurationMs: Math.round(ie)
		}
	}), T;
}
function ln(e, t, n, r, i) {
	let a = t.flatMap((t) => {
		let n = Kt(t, e), r = qt(t);
		return n !== void 0 && Number.isFinite(r) ? [{
			time: r,
			value: n
		}] : [];
	});
	return {
		source: e,
		points: kt(a.length > 0 ? Jt(a, r, i) : Zt(n, e, r, i))
	};
}
var un = 6e4, dn = 48;
function fn(e) {
	requestAnimationFrame(() => requestAnimationFrame(e));
}
function pn(e) {
	return e instanceof Error ? e.message : String(e);
}
function mn(e) {
	return `${e.kind === "entity_attribute" ? "full" : "state"}:${e.entityId}`;
}
function hn(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = t[n];
		if (r.source.id !== i.source.id || r.source.valueType !== i.source.valueType || r.points.length !== i.points.length) return !1;
		for (let e = 0; e < r.points.length; e++) {
			let t = r.points[e], n = i.points[e];
			if (t.time !== n.time || t.value !== n.value) return !1;
		}
	}
	return !0;
}
function gn(e, t) {
	let n = e.findIndex((e) => e.time === t.time);
	if (n !== -1) {
		if (e[n].value === t.value) return e;
		let r = [...e];
		return r[n] = t, r;
	}
	let r = -1;
	for (let n = e.length - 1; n >= 0; n--) if (e[n].time < t.time) {
		r = n;
		break;
	}
	let i = r === -1 ? void 0 : e[r];
	if (i?.value === t.value) {
		let n;
		for (let t = r - 1; t >= 0; t--) if (e[t].time < i.time) {
			n = e[t];
			break;
		}
		if (n?.value === t.value) {
			let n = [...e];
			return n[r] = t, n.sort((e, t) => e.time - t.time);
		}
		return [...e, t].sort((e, t) => e.time - t.time);
	}
	return [...e, t].sort((e, t) => e.time - t.time);
}
function _n(e, t) {
	let n = e.findIndex((e) => e.time >= t);
	if (n === -1) return e.length > 1 ? [e[e.length - 1]] : e;
	let r = Math.max(0, n - 1);
	return r === 0 ? e : e.slice(r);
}
var vn = class {
	constructor(e) {
		this.series = [], this.changedSourceIds = /* @__PURE__ */ new Set(), this.loading = !1, this.error = "", this.debugPerformance = !1, this._prevKey = "", this._nextSessionId = 0, this._progressUpdateScheduled = !1, this._lastProgressUpdateMs = 0, this.host = e, e.addController(this);
	}
	hostConnected() {}
	hostDisconnected() {}
	_createSession(e, t, n) {
		this._session && (this._session.cancelled = !0);
		let r = {
			id: ++this._nextSessionId,
			startTime: t.getTime(),
			endTime: n.getTime(),
			cancelled: !1,
			activeLoads: 0,
			sources: [...e],
			sourceStates: new Map(e.map((e) => [e.id, "queued"])),
			activeEntityLoads: /* @__PURE__ */ new Map(),
			accumulator: new Qt()
		};
		return this._session = r, r;
	}
	_cancelSession() {
		this._session && (this._session.cancelled = !0), this._session = void 0, this._progressUpdateScheduled = !1;
	}
	_activeSession(e, t) {
		let n = this._session;
		if (!(!n || n.cancelled)) return n.startTime === e.getTime() && n.endTime === t.getTime() ? n : void 0;
	}
	_isCurrentSession(e) {
		return this._session === e && !e.cancelled;
	}
	_addSessionSources(e, t) {
		let n = new Set(e.sources.map((e) => e.id));
		for (let r of t) n.has(r.id) || (n.add(r.id), e.sources.push(r));
	}
	_hasActiveEntityLoad(e, t) {
		return (e.activeEntityLoads.get(mn(t)) ?? 0) > 0;
	}
	_beginLoad(e, t) {
		e.activeLoads += 1;
		for (let n of t) {
			e.sourceStates.set(n.id, "loading");
			let t = mn(n);
			e.activeEntityLoads.set(t, (e.activeEntityLoads.get(t) ?? 0) + 1);
		}
	}
	_completeLoad(e, t) {
		e.activeLoads = Math.max(0, e.activeLoads - 1);
		for (let n of t) {
			let t = mn(n), r = Math.max(0, (e.activeEntityLoads.get(t) ?? 0) - 1);
			r > 0 ? e.activeEntityLoads.set(t, r) : e.activeEntityLoads.delete(t);
		}
		this.loading = e.activeLoads > 0;
	}
	_sessionSources(e, t) {
		return t.filter((t) => e.sourceStates.has(t.source.id));
	}
	_hasAccumulatorSeries(e, t) {
		return t.kind === "entity_attribute" ? e.accumulator.hasFullStates(t.entityId) : e.accumulator.hasStates(t.entityId);
	}
	_availableSessionSeries(e, t, n, r, i) {
		let a = this._sessionSources(e, i), o = new Set(a.map((e) => e.source.id));
		for (let i of e.sources) o.has(i.id) || !e.sourceStates.has(i.id) || this._hasAccumulatorSeries(e, i) && (a.push(e.accumulator.buildSeries(i, t, n, r)), o.add(i.id));
		return a;
	}
	_requestProgressUpdate(e) {
		if (this._progressUpdateScheduled) return;
		this._progressUpdateScheduled = !0;
		let t = M() - this._lastProgressUpdateMs, n = Math.max(0, dn - t);
		setTimeout(() => {
			requestAnimationFrame(() => {
				this._progressUpdateScheduled = !1, this._isCurrentSession(e) && (this._lastProgressUpdateMs = M(), this.host.requestUpdate());
			});
		}, n);
	}
	fetch(e, t, n, r) {
		let i = `${ht(t)}|${n.getTime()}|${r.getTime()}`;
		if (i === this._prevKey && !this.error) return;
		if (this._prevKey = i, t.length === 0) {
			this.series = [], this.changedSourceIds = /* @__PURE__ */ new Set(), this.loading = !1, this.error = "", this.host.requestUpdate();
			return;
		}
		if (!e) {
			this.series = [], this.changedSourceIds = /* @__PURE__ */ new Set(), this.loading = !1, this.error = "No hass object", this.host.requestUpdate();
			return;
		}
		let a = this._createSession(t, n, r), o = M();
		this.series = [], this.changedSourceIds = /* @__PURE__ */ new Set(), this.loading = !0, this.error = "", this._beginLoad(a, t), this.debugPerformance && N(this.debugPerformance, "controller.fetch_start", {
			sessionId: a.id,
			sourceCount: t.length,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}), this.host.requestUpdate(), cn(e, a.sources, n, r, (t, i) => {
			if (!this._isCurrentSession(a)) return;
			let o = M(), s = this._availableSessionSeries(a, e, n, r, t);
			this.series = this._mergeSeries(this.series.filter((e) => !a.sources.some((t) => t.id === e.source.id)), s), this.changedSourceIds = new Set(i);
			for (let e of s) a.sourceStates.set(e.source.id, "partial");
			this._requestProgressUpdate(a), this.debugPerformance && N(this.debugPerformance, "controller.progress_update", {
				sessionId: a.id,
				sourceCount: t.length,
				pointCount: t.reduce((e, t) => e + t.points.length, 0),
				updateDurationMs: Math.round(M() - o)
			});
		}, this.debugPerformance ? (e) => {
			N(this.debugPerformance, e.event, e.details);
		} : void 0, {
			isCancelled: () => !this._isCurrentSession(a),
			chunkTimeoutMs: un,
			accumulator: a.accumulator
		}).then((i) => {
			this._isCurrentSession(a) && fn(() => {
				if (!this._isCurrentSession(a)) return;
				let s = M(), c = this._availableSessionSeries(a, e, n, r, i), l = this._mergeSeries(this.series.filter((e) => !a.sources.some((t) => t.id === e.source.id)), c);
				hn(this.series, l) || (this.series = l), this.changedSourceIds = /* @__PURE__ */ new Set();
				for (let e of c) a.sourceStates.set(e.source.id, "ready");
				this._completeLoad(a, t), this.host.requestUpdate(), this.debugPerformance && N(this.debugPerformance, "controller.fetch_complete", {
					sessionId: a.id,
					sourceCount: i.length,
					pointCount: i.reduce((e, t) => e + t.points.length, 0),
					totalDurationMs: Math.round(M() - o),
					updateDurationMs: Math.round(M() - s)
				});
			});
		}).catch((e) => {
			if (this._isCurrentSession(a)) {
				for (let e of t) a.sourceStates.set(e.id, "error");
				this.error = pn(e), this._completeLoad(a, t), this.host.requestUpdate(), this.debugPerformance && N(this.debugPerformance, "controller.fetch_error", {
					sessionId: a.id,
					totalDurationMs: Math.round(M() - o),
					error: this.error
				});
			}
		});
	}
	setImportedSeries(e, t, n) {
		this._cancelSession(), this.series = e, this.changedSourceIds = new Set(e.map((e) => e.source.id)), this.loading = !1, this.error = "", this._prevKey = `${ht(e.map((e) => e.source))}|${t.getTime()}|${n.getTime()}`, this.host.requestUpdate();
	}
	setError(e) {
		this._cancelSession(), this.changedSourceIds = /* @__PURE__ */ new Set(), this.loading = !1, this.error = e, this.host.requestUpdate();
	}
	clearChangedSourceIds() {
		this.changedSourceIds.size !== 0 && (this.changedSourceIds = /* @__PURE__ */ new Set());
	}
	addSources(e, t, n, r) {
		if (!e || t.length === 0) return;
		let i = this._activeSession(n, r) ?? this._createSession(this.series.map((e) => e.source), n, r), a = /* @__PURE__ */ new Set([...this.series.map((e) => e.source.id), ...i.sourceStates.keys()]), o = t.filter((e) => !a.has(e.id));
		if (o.length === 0) return;
		let s = new Set(i.activeEntityLoads.keys());
		this._addSessionSources(i, o);
		let c = o.filter((e) => !this._hasActiveEntityLoad(i, e)), l = new Set(c.map((e) => e.id)), u = i.sources.filter((e) => l.has(e.id) || !s.has(mn(e))), d = M();
		for (let e of o) i.sourceStates.set(e.id, c.includes(e) ? "queued" : "loading");
		if (c.length === 0) {
			let t = this._availableSessionSeries(i, e, n, r, []);
			if (t.length > 0) {
				this._mergePartial(t), this.changedSourceIds = new Set(t.map((e) => e.source.id));
				for (let e of t) i.sourceStates.set(e.source.id, "partial");
			}
			this.loading = i.activeLoads > 0, this._requestProgressUpdate(i), this.debugPerformance && N(this.debugPerformance, "controller.add_sources_joined_active_load", {
				sessionId: i.id,
				sourceCount: o.length,
				existingSourceCount: this.series.length
			});
			return;
		}
		this.loading = !0, this._beginLoad(i, c), this.debugPerformance && N(this.debugPerformance, "controller.add_sources_start", {
			sessionId: i.id,
			sourceCount: c.length,
			joinedActiveSourceCount: o.length - c.length,
			existingSourceCount: this.series.length,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}), this.host.requestUpdate(), cn(e, u, n, r, (t, a) => {
			if (!this._isCurrentSession(i)) return;
			let o = M(), s = this._availableSessionSeries(i, e, n, r, t);
			this._mergePartial(s), this.changedSourceIds = new Set(a);
			for (let e of s) i.sourceStates.set(e.source.id, "partial");
			this._requestProgressUpdate(i), this.debugPerformance && N(this.debugPerformance, "controller.add_sources_progress", {
				sessionId: i.id,
				sourceCount: t.length,
				pointCount: t.reduce((e, t) => e + t.points.length, 0),
				mergeDurationMs: Math.round(M() - o)
			});
		}, this.debugPerformance ? (e) => {
			N(this.debugPerformance, e.event, e.details);
		} : void 0, {
			isCancelled: () => !this._isCurrentSession(i),
			chunkTimeoutMs: un,
			accumulator: i.accumulator
		}).then((t) => {
			this._isCurrentSession(i) && fn(() => {
				if (!this._isCurrentSession(i)) return;
				let a = M(), o = this._availableSessionSeries(i, e, n, r, t), s = this._mergeSeries(this.series, o);
				hn(this.series, s) || (this.series = s), this.changedSourceIds = /* @__PURE__ */ new Set();
				for (let e of o) i.sourceStates.set(e.source.id, "ready");
				this._completeLoad(i, c), this.host.requestUpdate(), this.debugPerformance && N(this.debugPerformance, "controller.add_sources_complete", {
					sessionId: i.id,
					sourceCount: t.length,
					pointCount: t.reduce((e, t) => e + t.points.length, 0),
					totalDurationMs: Math.round(M() - d),
					mergeDurationMs: Math.round(M() - a)
				});
			});
		}).catch((e) => {
			if (this._isCurrentSession(i)) {
				for (let e of c) i.sourceStates.set(e.id, "error");
				this.error = pn(e), this._completeLoad(i, c), this.host.requestUpdate(), this.debugPerformance && N(this.debugPerformance, "controller.add_sources_error", {
					sessionId: i.id,
					totalDurationMs: Math.round(M() - d),
					error: this.error
				});
			}
		});
	}
	updateLivePoints(e, t, n, r) {
		if (!e || t.length === 0 || this.series.length === 0) return;
		let i = n.getTime(), a = r.getTime(), o = !1, s = new Map(t.map((e) => [e.id, e])), c = this.series.map((t) => {
			let n = s.get(t.source.id);
			if (!n) return t;
			let r = Xt(e, n, a);
			if (!r) return t;
			let c = {
				...r,
				time: Math.min(Math.max(r.time, i), a)
			}, l = _n(gn(t.points, c), i);
			return l === t.points ? t : (o = !0, {
				...t,
				points: l
			});
		});
		o && (this.series = c, this.changedSourceIds = /* @__PURE__ */ new Set(), this.host.requestUpdate());
	}
	_mergeSeries(e, t) {
		let n = [...e];
		for (let e of t) {
			let t = n.findIndex((t) => t.source.id === e.source.id);
			t === -1 ? n.push(e) : n[t] = e;
		}
		return n;
	}
	_mergePartial(e) {
		this.series = this._mergeSeries(this.series, e);
	}
	removeSources(e) {
		if (e.length === 0) return;
		let t = new Set(e);
		this.series = this.series.filter((e) => !t.has(e.source.id)), this.changedSourceIds = /* @__PURE__ */ new Set();
		for (let t of e) this._session?.sourceStates.delete(t);
		this._prevKey = `${ht(this.series.map((e) => e.source))}|`, this.host.requestUpdate();
	}
}, yn = [
	"#ff9800",
	"#42a5f5",
	"#66bb6a",
	"#ec407a",
	"#ab47bc",
	"#26a69a"
], bn = {
	current_temperature: "#42a5f5",
	temperature: "#ff9800"
}, xn = new Set(Object.values(bn)), Sn = yn.filter((e) => !xn.has(e)), Cn = /* @__PURE__ */ new Set([
	"primary",
	"accent",
	"red",
	"pink",
	"purple",
	"deep-purple",
	"indigo",
	"blue",
	"light-blue",
	"cyan",
	"teal",
	"green",
	"light-green",
	"lime",
	"yellow",
	"amber",
	"orange",
	"deep-orange",
	"brown",
	"grey",
	"blue-grey"
]);
function wn(e) {
	return Sn[e % Sn.length];
}
function Tn(e) {
	return e.trim().toLowerCase();
}
function En(e) {
	return typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports("color", e);
}
function Dn(e) {
	let t = e.trim();
	if (!t) return;
	let n = t.replace(/[\s_-]+/g, "").toLowerCase();
	if (Cn.has(t)) return `var(--${t}-color, ${n !== t && En(n) ? n : t})`;
	if (En(t)) return t;
	if (n !== t && En(n)) return n;
}
function On(e) {
	return `hsl(${(e * 137.508 % 360).toFixed(1)} 68% 52%)`;
}
function kn(e, t, n) {
	let r = Dn(e);
	if (r && !t.has(Tn(r))) return r;
	let i = [
		...Sn.slice(n % Sn.length),
		...Sn.slice(0, n % Sn.length),
		...yn
	];
	for (let e of i) if (!t.has(Tn(e))) return e;
	let a = n, o = On(a);
	for (; t.has(Tn(o));) a += 1, o = On(a);
	return o;
}
function An(e) {
	return Tn(e);
}
function jn(e) {
	let t = e?.trim().toLowerCase();
	if (t) {
		if (t === "°c" || t === "c" || t === "celsius") return "c";
		if (t === "°f" || t === "f" || t === "fahrenheit") return "f";
		if (t === "k" || t === "kelvin") return "k";
	}
}
function P(e) {
	return jn(e) !== void 0;
}
function Mn(e, t) {
	let n = jn(e), r = jn(t);
	return n !== void 0 && n === r;
}
function Nn(e) {
	let t = jn(e);
	return t ? `temperature:${t}` : e && e.trim() !== "" ? e : "__unitless__";
}
function Pn(e) {
	if (!Number.isFinite(e) || Number.isInteger(e)) return 0;
	let t = e.toString().toLowerCase();
	if (t.includes("e-")) {
		let [e, n] = t.split("e-"), r = e.split(".")[1]?.length ?? 0;
		return Math.min(r + Number(n), 4);
	}
	return Math.min(t.split(".")[1]?.length ?? 0, 4);
}
function Fn(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
function In(e, t, n = 5) {
	if (!Number.isFinite(e) || !Number.isFinite(t)) return [e, t];
	let r = Math.abs(t - e);
	if (r < 1e-10) return [e];
	let i = Ln(r / (Math.max(n, 2) - 1)), a = Math.floor(e / i) * i, o = Math.ceil(t / i) * i, s = i * 1e-8, c = [];
	for (let e = a; e <= o + s; e += i) c.push(Rn(e, i));
	return c;
}
function Ln(e) {
	if (e <= 0) return 1;
	let t = Math.floor(Math.log10(Math.abs(e))), n = e / 10 ** t, r;
	return r = n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10, r * 10 ** t;
}
function Rn(e, t) {
	let n = Math.max(0, -Math.floor(Math.log10(Math.abs(t) || 1)) + 1);
	return parseFloat(e.toFixed(n));
}
function zn(e) {
	let t = 0;
	for (let n of e) {
		let e = String(n), r = e.indexOf(".");
		r !== -1 && (t = Math.max(t, e.length - r - 1));
	}
	return t;
}
function Bn(e, t, n) {
	let r = t - e;
	if (r < 1e-6) {
		let r = Math.max(Math.abs(t) * .05, 1);
		return {
			min: Fn(e - r, n),
			max: Fn(t + r, n)
		};
	}
	let i = Math.max(r * .08, 10 ** -n), a = 10 ** n, o = Math.ceil(i * a) / a;
	return {
		min: Fn(e - o, n),
		max: Fn(t + o, n)
	};
}
function Vn(e) {
	return 28 + (Math.max(e, 1) - 1) * 214 + 180 + 18;
}
var Hn = .1, Un = 12, Wn = 2.5;
function Gn(e) {
	return Math.max(e.max - e.min, 1e-9);
}
function Kn(e) {
	return (e.min + e.max) / 2;
}
function qn(e) {
	return Math.log10(Math.max(Math.abs(e), 1e-9));
}
function Jn(e, t) {
	let n = Math.abs(qn(Gn(e)) - qn(Gn(t))), r = Math.abs(qn(Kn(e)) - qn(Kn(t))), i = Yn(e.unit) === Yn(t.unit) ? 0 : 2;
	return n + r * .6 + i;
}
function Yn(e) {
	return Nn(e);
}
function Xn(e) {
	return e.length > 0 && e.every((e) => P(e.unit));
}
function Zn(e) {
	if (e.length < 2) return !1;
	let t = Math.min(...e.map((e) => e.min)), n = Math.max(...e.map((e) => e.max)), r = Math.max(n - t, 1e-9), i = e.map((e) => e.max - e.min).filter((e) => e > 1e-6);
	if (i.length < 2) return !1;
	let a = Math.min(...i), o = Math.max(...i), s = i.find((e) => e / r <= Hn);
	return s !== void 0 && r / s >= Wn && (o / Math.max(a, 1e-9) >= Un || r / a >= Un);
}
function Qn(e) {
	let t = e[0], n = e[1], r = -Infinity;
	for (let i = 0; i < e.length; i++) for (let a = i + 1; a < e.length; a++) {
		let o = Jn(e[i], e[a]);
		o > r && (r = o, t = e[i], n = e[a]);
	}
	return t.order <= n.order ? [t, n] : [n, t];
}
function $n(e, t) {
	let n = e.filter((e) => e.scalePreference === "primary"), r = e.filter((e) => e.scalePreference === "secondary"), i = e.filter((e) => e.scalePreference === "auto");
	if (r.length > 0 && r.length < e.length) return [[...n, ...i], r];
	if (n.length > 0 || !t || !Zn(e)) return [e, []];
	let [a, o] = Qn(e), s = [], c = [];
	for (let t of e) t.id === a.id ? s.push(t) : t.id === o.id ? c.push(t) : Jn(t, a) <= Jn(t, o) ? s.push(t) : c.push(t);
	return [s, c];
}
function er(e, t) {
	let n = tr(e);
	return n.length >= 2 ? [n[0].series, n[1].series] : $n(e, t);
}
function tr(e) {
	let t = [];
	for (let n of e) {
		let e = Yn(n.unit), r = t.find((t) => t.unit === e);
		r ? r.series.push(n) : t.push({
			unit: e,
			series: [n]
		});
	}
	return t;
}
function nr(e) {
	let t = tr(e);
	if (t.length <= 2) return [e];
	let n = [];
	for (let e = 0; e < t.length; e += 2) n.push(t.slice(e, e + 2).flatMap((e) => e.series));
	return n;
}
function rr(e, t, n, r, i) {
	let a = Math.min(...r.map((e) => e.min)), o = Math.max(...r.map((e) => e.max)), s = Math.max(...r.map((e) => e.precision)), c = Bn(a, o, s), l = In(c.min, c.max);
	return {
		ids: new Set(r.map((e) => e.id)),
		graphKey: e,
		sourceGraphKey: t,
		axis: n,
		min: c.min,
		max: c.max,
		precision: Math.max(s, zn(l)),
		ticks: l,
		top: i,
		height: 180
	};
}
function ir(e, t = {}) {
	let n = t.autoScaleSplit ?? !0, r = [];
	for (let [t, n] of e.entries()) {
		if (n.valueType !== "number" && n.valueType !== "boolean") continue;
		let e = n.points.map((e) => Number(e.value)).filter((e) => Number.isFinite(e)), i = n.scaleMode === "manual" && n.scaleMin !== void 0 ? n.scaleMin : 0, a = n.scaleMode === "manual" && n.scaleMax !== void 0 ? n.scaleMax : 1, o = n.valueType === "boolean" ? 0 : e.length > 0 ? Math.min(...e) : Math.min(i, a), s = n.valueType === "boolean" ? 1 : e.length > 0 ? Math.max(...e) : Math.max(i, a), c = n.valueType === "boolean" || e.length === 0 ? 0 : Math.max(...e.map((e) => Pn(e))), l = n.valueType === "boolean" ? "group:boolean" : n.scaleGroupKey, u = r.find((e) => e.key === l);
		u || (u = {
			key: l,
			series: []
		}, r.push(u)), n.scaleMode === "manual" && (n.scaleMin !== void 0 && (o = Math.min(o, n.scaleMin)), n.scaleMax !== void 0 && (s = Math.max(s, n.scaleMax))), u.series.push({
			id: n.id,
			unit: n.unit,
			min: o,
			max: s,
			precision: c,
			scalePreference: n.scalePreference,
			order: t
		});
	}
	let i = 0;
	return r.flatMap((e) => (e.key === "group:boolean" ? [e.series] : nr(e.series)).flatMap((t, r) => {
		let a = r === 0 ? e.key : `${e.key}::unit-graph:${r + 1}`, o = n && e.key !== "group:temperature" && !Xn(t), [s, c] = e.key === "group:boolean" ? [t, []] : er(t, o), l = 28 + i++ * 214, u = rr(a, e.key, "left", s, l);
		return c.length > 0 ? [u, rr(a, e.key, "right", c, l)] : [u];
	}));
}
function ar(e, t, n, r) {
	let i = e.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)), a = r * 4;
	if (i.length <= a) return i;
	let o = /* @__PURE__ */ new Map();
	i.forEach((e, i) => {
		let a = Math.floor(n + (e.time - t.start) / (t.end - t.start) * r), s = o.get(a);
		s ? s.push({
			...e,
			index: i
		}) : o.set(a, [{
			...e,
			index: i
		}]);
	});
	let s = /* @__PURE__ */ new Map();
	for (let e of o.values()) {
		let t = e[0], n = e[e.length - 1], r = e.reduce((e, t) => t.value < e.value ? t : e, t), i = e.reduce((e, t) => t.value > e.value ? t : e, t);
		for (let e of [
			t,
			r,
			i,
			n
		]) s.set(e.index, e);
	}
	return [...s.values()].sort((e, t) => e.index - t.index).map(({ time: e, value: t }) => ({
		time: e,
		value: t
	}));
}
function or(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function sr(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function cr(e, t) {
	if (e.length === 0) return;
	if (t <= e[0].time) return e[0].value;
	let n = e[e.length - 1];
	if (t >= n.time) return n.value;
	for (let n = 0; n < e.length - 1; n++) {
		let r = e[n], i = e[n + 1];
		if (t >= r.time && t <= i.time) {
			let e = i.time - r.time;
			return e <= 0 ? r.value : r.value + (t - r.time) / e * (i.value - r.value);
		}
	}
}
function lr(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		if (!n.id.startsWith("attr:")) continue;
		let e = n.id.split(":");
		if (e.length < 3) continue;
		let r = e[1], i = e.slice(2).join(":");
		t.has(r) || t.set(r, {});
		let a = t.get(r);
		i === "current_temperature" || i === "temperature" && !a.temp ? a.temp = n.id : i === "hvac_action" && (a.hvac = n.id);
	}
	for (let [, e] of t) if (e.temp && e.hvac) return {
		tempId: e.temp,
		hvacId: e.hvac
	};
}
function ur(e, t, n) {
	let r = lr(e);
	if (!r) return [];
	let i = e.find((e) => e.id === r.tempId), a = e.find((e) => e.id === r.hvacId);
	if (!i || !a) return [];
	let o = t.find((e) => e.ids.has(i.id));
	if (!o) return [];
	let s = i.points.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time);
	return s.length === 0 ? [] : dr(a.points, n).filter((e) => e.value === "heating").reduce((e, t) => {
		let n = e[e.length - 1];
		return n && Math.abs(n.end - t.start) < 1 ? n.end = t.end : e.push({
			start: t.start,
			end: t.end
		}), e;
	}, []).flatMap(({ start: e, end: t }, r) => {
		let i = [
			{
				time: e,
				value: cr(s, e)
			},
			...s.filter((n) => n.time > e && n.time < t),
			{
				time: t,
				value: cr(s, t)
			}
		].filter((e) => e.value !== void 0);
		if (i.length === 0) return [];
		let c = o.top + o.height, l = [
			`${or(e, n).toFixed(1)},${c.toFixed(1)}`,
			...i.map((e) => `${or(e.time, n).toFixed(1)},${sr(e.value, o).toFixed(1)}`),
			`${or(t, n).toFixed(1)},${c.toFixed(1)}`
		].join(" ");
		return [{
			id: `${a.id}:heat:${r}`,
			points: l
		}];
	});
}
function dr(e, t) {
	let n = Date.now(), r = [...e].sort((e, t) => e.time - t.time), i = r.findIndex((e) => e.time >= t.start), a = i === -1 ? r.length : i, o = a > 0 ? r.slice(a - 1) : r;
	return o.flatMap((e, r) => {
		let i = Math.max(e.time, t.start), a = Math.min(o[r + 1]?.time ?? t.end, t.end, n);
		return a > i ? [{
			start: i,
			end: a,
			value: e.value
		}] : [];
	});
}
function F(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function I(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function fr(e, t) {
	return t.find((t) => t.ids.has(e.id));
}
function pr(e, t) {
	return mr(e, t, !0);
}
function mr(e, t, n) {
	let r = Date.now(), i = [...e.points].sort((e, t) => e.time - t.time), a = i.findIndex((e) => e.time >= t.start), o = a === -1 ? i.length : a, s = o > 0 ? i.slice(o - 1) : i;
	return s.flatMap((e, i) => {
		let a = Math.max(e.time, t.start), o = s[i + 1]?.time, c = n ? t.end : e.time, l = Math.min(o ?? c, t.end, r);
		return l > a ? [{
			start: a,
			end: l,
			value: e.value
		}] : [];
	});
}
var hr = /* @__PURE__ */ new Set([
	"off",
	"idle",
	"none",
	"false"
]);
function gr(e, t, n, r) {
	if (typeof e == "boolean") return e ? t : "var(--better-history-muted-color, var(--secondary-text-color, #888))";
	let i = String(e);
	return hr.has(i.toLowerCase()) ? "var(--better-history-muted-color, var(--secondary-text-color, #888))" : (n.has(i) || n.set(i, yn[(r + n.size) % yn.length]), n.get(i));
}
function _r(e, t) {
	return e + 34 + Math.max(t - 1, 0) * 14;
}
function vr(e, t, n, r) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode === "column") return [];
		let i = fr(e, t);
		if (!i) return [];
		let a = ar(yr(e.points, n, e.lineMode, r), n, 40, 640), { points: o, pathLength: s } = e.lineMode === "line" ? Dr(a, n, i) : Er(a, n, i);
		return [{
			id: e.id,
			color: e.color,
			points: o,
			pathLength: s,
			lineWidth: e.lineWidth
		}];
	});
}
function yr(e, t, n, r) {
	let i = e.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time), a = i.filter((e) => e.time >= t.start && e.time <= t.end);
	if (n === "line") return xr(i, a, t);
	let o = [...i].reverse().find((e) => e.time < t.start), s = o && (a.length === 0 || a[0].time > t.start) ? [{
		time: t.start,
		value: o.value
	}, ...a] : a, c = s[s.length - 1];
	return r.extendStairToEnd && c && c.time < t.end ? [...s, {
		time: t.end,
		value: c.value
	}] : s;
}
function br(e, t, n) {
	if (!e || !t || e.time === t.time || e.time > n || t.time < n) return;
	let r = (n - e.time) / (t.time - e.time);
	return {
		time: n,
		value: e.value + (t.value - e.value) * r
	};
}
function xr(e, t, n) {
	let r = [...e].reverse().find((e) => e.time < n.start), i = e.find((e) => e.time > n.start), a = [...e].reverse().find((e) => e.time < n.end), o = e.find((e) => e.time > n.end), s = t[0]?.time === n.start ? void 0 : br(r, i, n.start), c = t[t.length - 1]?.time === n.end ? void 0 : br(a, o, n.end);
	return [
		s,
		...t,
		c
	].filter((e) => e !== void 0);
}
function Sr(e) {
	return e.min <= 0 && e.max >= 0 ? 0 : e.min > 0 ? e.min : e.max;
}
function Cr(e, t, n, r) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode !== "column") return [];
		let i = fr(e, t);
		if (!i) return [];
		let a = I(Sr(i), i);
		return mr(e, n, r.extendColumnToEnd).flatMap((t, r) => {
			let o = Number(t.value);
			if (!Number.isFinite(o)) return [];
			let s = F(t.start, n), c = F(t.end, n), l = I(o, i), u = Math.max(c - s, 1);
			return [{
				id: `${e.id}:${r}`,
				x: s,
				y: Math.min(l, a),
				width: u,
				height: Math.max(Math.abs(a - l), 1),
				fill: e.color
			}];
		});
	});
}
function wr(e, t, n) {
	let r = t + 10, i = 0;
	return e.flatMap((e, t) => {
		if (e.valueType === "number" || e.valueType === "boolean") return [];
		let a = r + i * 14;
		i += 1;
		let o = /* @__PURE__ */ new Map();
		return pr(e, n).reduce((n, r) => {
			let i = gr(r.value, e.color, o, t), a = n[n.length - 1];
			return a && a.fill === i && Math.abs(a.end - r.start) < 1 ? a.end = r.end : n.push({
				start: r.start,
				end: r.end,
				fill: i
			}), n;
		}, []).map((t, r) => {
			let i = F(t.start, n), o = Math.max(F(t.end, n) - i, 1);
			return {
				id: `${e.id}:${r}`,
				x: i,
				y: a,
				width: o,
				fill: t.fill
			};
		});
	});
}
function Tr(e) {
	return e.flatMap((e) => {
		let t = e.height - 10;
		return e.ticks.map((n) => ({
			y: e.top + 5 + t - (n - e.min) / (e.max - e.min) * t,
			value: Or(n, e.precision)
		}));
	});
}
function Er(e, t, n) {
	if (e.length === 0) return {
		points: "",
		pathLength: 0
	};
	if (e.length === 1) return {
		points: `${F(e[0].time, t).toFixed(1)},${I(e[0].value, n).toFixed(1)}`,
		pathLength: 0
	};
	let r = [], i = 0;
	for (let a = 0; a < e.length - 1; a++) {
		let o = e[a], s = e[a + 1], c = F(o.time, t), l = I(o.value, n), u = F(s.time, t), d = I(s.value, n);
		a === 0 && r.push(`${c.toFixed(1)},${l.toFixed(1)}`), r.push(`${u.toFixed(1)},${l.toFixed(1)}`), r.push(`${u.toFixed(1)},${d.toFixed(1)}`), i += Math.abs(u - c) + Math.abs(d - l);
	}
	return {
		points: r.join(" "),
		pathLength: i
	};
}
function Dr(e, t, n) {
	if (e.length === 0) return {
		points: "",
		pathLength: 0
	};
	let r = 0, i;
	return {
		points: e.map((e) => {
			let a = F(e.time, t), o = I(e.value, n);
			return i && (r += Math.hypot(a - i.x, o - i.y)), i = {
				x: a,
				y: o
			}, `${a.toFixed(1)},${o.toFixed(1)}`;
		}).join(" "),
		pathLength: r
	};
}
function Or(e, t) {
	return t <= 0 && Number.isInteger(e) ? String(e) : e.toFixed(t);
}
var kr = 6e4, Ar = 60 * kr, jr = 24 * Ar, Mr = [
	10 * kr,
	15 * kr,
	20 * kr,
	30 * kr,
	Ar,
	2 * Ar,
	3 * Ar,
	4 * Ar,
	6 * Ar,
	8 * Ar,
	12 * Ar,
	jr,
	2 * jr,
	3 * jr,
	7 * jr,
	14 * jr,
	30 * jr,
	60 * jr,
	90 * jr
];
function Nr(e, t) {
	for (let n of Mr) if (e / n <= t) return n;
	return Mr[Mr.length - 1];
}
function Pr(e, t, n = 12) {
	let r = t - e;
	if (r <= 0) return [];
	let i = Nr(r, n), a = [], o = Math.ceil(e / i) * i;
	for (let e = o; e < t; e += i) {
		let t = new Date(e);
		a.push({
			time: e,
			bold: t.getHours() === 0 && t.getMinutes() === 0
		});
	}
	return a;
}
function Fr(e, t) {
	let n = new Date(e), r = t / jr;
	if (r > 88) {
		let e = n.toLocaleString("default", { month: "short" }), t = n.getFullYear();
		return n.getMonth() === 0 ? `${e} ${t}` : e;
	}
	if (r > 35) {
		let e = n.toLocaleString("default", { month: "short" });
		return `${n.getDate()} ${e}`;
	}
	if (r > 7) return `${n.getDate()}/${n.getMonth() + 1}`;
	if (r > 2) return n.toLocaleString("default", { weekday: "short" });
	let i = String(n.getHours()).padStart(2, "0"), a = String(n.getMinutes()).padStart(2, "0");
	return r > .5 ? `${i}:${a}` : `${i}:${a}:${String(n.getSeconds()).padStart(2, "0")}`;
}
function Ir(e, t) {
	let n = [], r;
	for (let i of e) {
		if (i.time < t.start) {
			r = i;
			continue;
		}
		if (i.time > t.end) break;
		n.push(i);
	}
	return r ? [r, ...n] : n;
}
function Lr(e, t) {
	return e.map((e) => ({
		...e,
		points: Ir(e.points, t)
	}));
}
function Rr(e) {
	return e.valueType === "boolean" ? "group:boolean" : e.scaleGroupKey;
}
function zr(e) {
	return Nn(e);
}
function Br(e, t) {
	let n = Rr(e);
	if (n === "group:boolean") return n;
	let r = [];
	for (let e of t) {
		let t = zr(e.unit);
		r.includes(t) || r.push(t);
	}
	let i = r.indexOf(zr(e.unit));
	return i < 0 || r.length <= 2 || i < 2 ? n : `${n}::unit-graph:${Math.floor(i / 2) + 1}`;
}
function Vr(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	for (let t of e) {
		if (t.valueType !== "number" && t.valueType !== "boolean") continue;
		let e = Rr(t);
		i.set(e, [...i.get(e) ?? [], t]);
	}
	for (let e of t) {
		if (e.valueType !== "number" && e.valueType !== "boolean") continue;
		let t = Rr(e);
		r.set(t, [...r.get(t) ?? [], e]);
	}
	return [...i.entries()].flatMap(([e, t]) => Lr(r.get(e) ?? t, n));
}
function Hr(e, t, n, r = !1, i = 12, a = !0, o = !0) {
	let s = { extendStairToEnd: a }, c = { extendColumnToEnd: a }, l = ir(Vr(e, t, n), { autoScaleSplit: o }), u = new Set(l.map((e) => e.graphKey)).size, d = Vn(u), f = e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").length, p = Pr(n.start, n.end, i), m = n.end - n.start;
	return {
		allSeries: e,
		visibleSeries: t,
		timeBounds: n,
		extendStairToEnd: a,
		numericScales: l,
		plotBottom: d,
		chartHeight: _r(d, f),
		numericLines: vr(t, l, n, s),
		numericColumns: Cr(t, l, n, c),
		segments: wr(t, d, n),
		heatingAreas: r ? [] : ur(t, l, n),
		yAxisLabels: Tr(l),
		xAxisLabels: p.map((e) => ({
			x: F(e.time, n),
			label: Fr(e.time, m),
			bold: e.bold
		}))
	};
}
function Ur(e) {
	return `${e.time}\u0000${e.value}`;
}
function Wr(e, t, n) {
	return e.map((e) => `M${F(e.time, t).toFixed(2)},${I(e.value, n).toFixed(2)}h0`).join("");
}
function Gr(e, t, n, r, i) {
	let a = [], o = [];
	for (let s of e) {
		if (s.valueType !== "number" && s.valueType !== "boolean" || s.lineMode === "column") continue;
		let e = fr(s, t);
		if (!e) continue;
		let c = {
			...e,
			top: 28,
			height: i
		}, l = ar(yr(s.points, n, s.lineMode, r), n, 40, 640), { points: u, pathLength: d } = s.lineMode === "line" ? Dr(l, n, c) : Er(l, n, c);
		if (a.push({
			id: s.id,
			color: s.color,
			points: u,
			pathLength: d,
			lineWidth: s.lineWidth
		}), !s.showPoints) continue;
		let f = new Set(s.points.map((e) => ({
			time: e.time,
			value: Number(e.value)
		})).filter((e) => Number.isFinite(e.value)).map(Ur)), p = Wr(l.filter((e) => f.has(Ur(e))), n, c);
		p && o.push({
			id: s.id,
			color: s.color,
			path: p,
			radius: s.pointRadius
		});
	}
	return {
		lines: a,
		pointMarkers: o
	};
}
function Kr(e, t, n, r, i) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode === "column").flatMap((e) => {
		let a = fr(e, t);
		if (!a) return [];
		let o = {
			...a,
			top: 28,
			height: r
		}, s = I(Sr(o), o);
		return mr(e, n, i.extendColumnToEnd).flatMap((t, r) => {
			let i = Number(t.value);
			if (!Number.isFinite(i)) return [];
			let a = F(t.start, n), c = F(t.end, n), l = I(i, o);
			return [{
				id: `${e.id}:${r}`,
				x: a,
				y: Math.min(l, s),
				width: Math.max(c - a, 1),
				height: Math.max(Math.abs(s - l), 1),
				fill: e.color
			}];
		});
	});
}
function qr(e, t, n) {
	return e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").flatMap((e, r) => {
		let i = t + r * 14, a = /* @__PURE__ */ new Map();
		return pr(e, n).reduce((t, n) => {
			let i = gr(n.value, e.color, a, r), o = t[t.length - 1];
			return o && o.fill === i && Math.abs(o.end - n.start) < 1 ? o.end = n.end : t.push({
				start: n.start,
				end: n.end,
				fill: i
			}), t;
		}, []).map((t, r) => {
			let a = F(t.start, n), o = Math.max(F(t.end, n) - a, 1);
			return {
				id: `${e.id}:${r}`,
				x: a,
				y: i,
				width: o,
				fill: t.fill
			};
		});
	});
}
function Jr(e) {
	return e >= 160 ? 5 : e >= 100 ? 4 : e >= 64 ? 3 : 2;
}
function Yr(e, t) {
	let n = t - 10, r = Jr(t), i = e.ticks.length <= r ? e.ticks : In(e.min, e.max, r), a = Math.max(Math.abs(e.max - e.min), 1) * 1e-9, o = i.filter((t) => t >= e.min - a && t <= e.max + a), s = o.length > 0 ? o : [e.min, e.max], c = e.ticks === i ? e.precision : Math.max(e.precision, zn(s));
	return s.map((t) => ({
		y: 33 + n - (t - e.min) / (e.max - e.min) * n,
		value: Or(t, c)
	}));
}
function Xr(e, t, n) {
	let r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
	return {
		allSeries: e.map((e, t) => {
			let a = kn(e.color, r, n * yn.length + t);
			return r.add(An(a)), i.set(e.id, a), a === e.color ? e : {
				...e,
				color: a
			};
		}),
		visibleSeries: t.map((e) => {
			let t = i.get(e.id);
			return t && t !== e.color ? {
				...e,
				color: t
			} : e;
		})
	};
}
function Zr(e, t, n, r) {
	return e.filter((e) => {
		let i = Rr(e), a = t.findIndex((e) => e.keys.includes(i)), o = a < 0 ? t.findIndex((t) => t.entityIds.has(e.entity)) : -1;
		return a === n || o === n || r && a < 0 && o < 0 && n === 0;
	});
}
function Qr(e, t = 12, n = 180) {
	let r = [], i = e.timeBounds, a = e.allSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), o = e.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), s = i.end - i.start, c = Pr(i.start, i.end, t).map((e) => ({
		x: F(e.time, i),
		label: Fr(e.time, s),
		bold: e.bold
	}));
	if (e.numericScales.length === 0 && a.length > 0) {
		let e = o.length, t = 28 + n + 16 + 6, s = e > 0 ? 22 + e * 14 : 0, l = 28 + n + s + 18, u = l + (e > 0 ? 0 : 16), d = Xr(a, o, 0);
		r.push({
			series: d.visibleSeries,
			allSeries: d.allSeries,
			scales: [],
			graphHeight: n,
			svgHeight: l,
			canvasHeight: u,
			lines: [],
			pointMarkers: [],
			columns: [],
			segments: qr(d.visibleSeries, t, i),
			yLabels: [],
			rightYLabels: [],
			xLabels: c,
			heatingAreas: []
		});
	}
	let l = [...new Set(e.numericScales.map((e) => e.graphKey))], u = l.map((t) => {
		let n = e.numericScales.filter((e) => e.graphKey === t), r = new Set(n.flatMap((e) => [...e.ids])), i = new Set(e.allSeries.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && r.has(e.id)).map((e) => e.entity));
		return {
			keys: [.../* @__PURE__ */ new Set([t, n[0]?.sourceGraphKey ?? t])],
			entityIds: i
		};
	});
	for (let t = 0; t < l.length; t++) {
		let s = l[t], d = e.numericScales.filter((e) => e.graphKey === s), f = d.find((e) => e.axis === "left") ?? d[0], p = d.find((e) => e.axis === "right"), m = new Set(d.flatMap((e) => [...e.ids])), h = d[0]?.sourceGraphKey ?? s, g = e.allSeries.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && Rr(e) === h), _ = g.filter((e) => Br(e, g) === s), v = e.visibleSeries.filter((e) => m.has(e.id)), y = Zr(o, u, t, !0), b = Zr(a, u, t, !0), x = [...v, ...y], S = Xr([..._, ...b], x, t), C = S.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), ee = C.length, te = 28 + n + 16 + 6, w = ee > 0 ? 22 + ee * 14 : 0, ne = 28 + n + w + 18, re = ne + (ee > 0 ? 0 : 16), T = Yr(f, n), ie = p ? Yr(p, n) : [], ae = d.map((e) => ({
			...e,
			top: 28,
			height: n
		})), oe = ae.find((e) => e.axis === "left") ?? ae[0], se = Gr(S.visibleSeries, ae, i, { extendStairToEnd: e.extendStairToEnd }, n);
		r.push({
			series: S.visibleSeries,
			allSeries: S.allSeries,
			scale: oe,
			scales: ae,
			graphHeight: n,
			svgHeight: ne,
			canvasHeight: re,
			lines: se.lines,
			pointMarkers: se.pointMarkers,
			columns: Kr(S.visibleSeries, ae, i, n, { extendColumnToEnd: e.extendStairToEnd }),
			segments: qr(C, te, i),
			yLabels: T,
			rightYLabels: ie,
			xLabels: c,
			heatingAreas: e.heatingAreas.length > 0 ? ur(e.visibleSeries, ae, i) : []
		});
	}
	return r;
}
var $r = class {
	constructor(e) {
		this.tooltip = void 0, this._series = [], this._cacheKey = "", this._timeBounds = {
			start: 0,
			end: 1
		}, this._host = e, e.addController(this);
	}
	hostConnected() {}
	hostDisconnected() {
		this._frame !== void 0 && (cancelAnimationFrame(this._frame), this._frame = void 0);
	}
	hostUpdated() {
		if (!this.tooltip) return;
		let e = this._host.renderRoot?.querySelector?.(".tooltip");
		if (!(e instanceof HTMLElement)) return;
		let t = e.getBoundingClientRect().height, n = this.tooltip.rowCount, r = this._measuredTooltip;
		t <= 0 || r?.rowCount === n && Math.abs(r.height - t) < 1 || (this._measuredTooltip = {
			rowCount: n,
			height: t
		}, this._apply());
	}
	sync(e, t, n, r, i) {
		this._timeBounds = i, this._rebuildCache(e, t, n);
	}
	_rebuildCache(e, t, n) {
		let r = `${t.map((e) => `${e.source.id}:${e.points.length}`).join("|")}::${n.join("|")}`;
		(this._fetchedRef !== t || this._cacheKey !== r) && (this._fetchedRef = t, this._cacheKey = r, this._series = e.filter((e) => !n.includes(e.id)).flatMap((e) => {
			let n = t.find((t) => t.source.id === e.id);
			return !n || n.points.length === 0 ? [] : [{
				id: e.id,
				label: e.label,
				color: e.color,
				points: n.points
			}];
		}));
	}
	handlePointerMove(e) {
		let t = this._svgPoint(e);
		this._queuePoint(t);
	}
	_queuePoint(e) {
		if (!e) {
			this._clear();
			return;
		}
		this._pendingPoint = e, this._frame === void 0 && (this._frame = requestAnimationFrame(() => {
			this._frame = void 0, this._apply();
		}));
	}
	handlePointerLeave() {
		this._pendingPoint = void 0, this._clear();
	}
	_clear() {
		this.tooltip !== void 0 && (this.tooltip = void 0, this._host.requestUpdate(), this._emit());
	}
	_apply() {
		let e = this._pendingPoint;
		if (!e) return;
		let t = this._timeAt(e.x), n = this._series.filter((t) => e.activeIds.has(t.id)), r = this._nearestPoint(n, t);
		if (!r) {
			this.tooltip !== void 0 && (this.tooltip = void 0, this._host.requestUpdate(), this._emit());
			return;
		}
		let i = r.time, a = n.flatMap((e) => {
			let t = this._pointAtOrBefore(e.points, i);
			return t ? [{
				label: e.label,
				color: e.color,
				value: String(t.value)
			}] : [];
		}), o = a.length, s = this._tooltipHeight(o), c = this._placement(e, s), l = this._tooltipY(e, c, s);
		if (a.length === 0) {
			this.tooltip !== void 0 && (this.tooltip = void 0, this._host.requestUpdate(), this._emit());
			return;
		}
		if (this.tooltip?.time === i && this.tooltip.activeLeft === e.activeLeft && this.tooltip.activeTop === e.activeTop && this.tooltip.activeWidth === e.activeWidth && this.tooltip.activeHeight === e.activeHeight && this.tooltip.activeKey === e.activeKey && Math.abs(this.tooltip.tooltipX - Math.min(Math.max(e.x, 120), 600)) < 1 && Math.abs(this.tooltip.y - l) < 1 && this.tooltip.placement === c && this.tooltip.rowCount === o) return;
		let u = Math.min(Math.max(e.x, 120), 600);
		this.tooltip = {
			x: F(i, this._timeBounds),
			tooltipX: u,
			y: l,
			placement: c,
			rowCount: o,
			activeLeft: e.activeLeft,
			activeTop: e.activeTop,
			activeWidth: e.activeWidth,
			activeHeight: e.activeHeight,
			activeKey: e.activeKey,
			time: i,
			values: a
		}, this._host.requestUpdate(), this._emit();
	}
	_placement(e, t) {
		let n = e.activeTop + e.activeHeight, r = e.touchLike ? e.y < e.activeTop + e.activeHeight / 2 ? "above" : "below" : n - e.y < 120 ? "above" : "below", i = this._minTooltipTop(e), a = this._maxTooltipBottom(e), o = this._tooltipAnchorY(e, "above") - t - 10, s = this._tooltipAnchorY(e, "below") + t + 10, c = o >= i, l = s <= a;
		return r === "above" && c ? "above" : r === "below" && l ? "below" : c ? "above" : l ? "below" : this._tooltipAnchorY(e, "above") - i >= a - this._tooltipAnchorY(e, "below") ? "above" : "below";
	}
	_tooltipY(e, t, n) {
		let r = t === "above" ? this._tooltipAnchorY(e, t) - n - 10 : this._tooltipAnchorY(e, t) + 10, i = this._minTooltipTop(e), a = Math.max(i, this._maxTooltipBottom(e) - n);
		return Math.min(Math.max(r, i), a);
	}
	_tooltipAnchorY(e, t) {
		return e.touchLike ? t === "above" ? e.activeTop + e.activeHeight - 10 : e.activeTop + 10 : Math.min(Math.max(e.y, e.activeTop + 28), e.activeTop + e.activeHeight - 28);
	}
	_tooltipHeight(e) {
		return this._measuredTooltip?.rowCount === e ? this._measuredTooltip.height : 34 + e * 18;
	}
	_minTooltipTop(e) {
		return Math.max(8, e.viewportTop + 8);
	}
	_maxTooltipBottom(e) {
		return Math.max(this._minTooltipTop(e) + 40, e.viewportBottom - 8);
	}
	_emit() {
		this._host.dispatchEvent(new CustomEvent("tooltip-changed", {
			detail: this.tooltip ? {
				time: this.tooltip.time,
				values: this.tooltip.values
			} : null,
			bubbles: !0,
			composed: !0
		}));
	}
	_nearest(e, t) {
		if (e.length === 0) return;
		let n = 0, r = e.length - 1;
		for (; n < r;) {
			let i = Math.floor((n + r) / 2);
			e[i].time < t ? n = i + 1 : r = i;
		}
		let i = e[n], a = n > 0 ? e[n - 1] : void 0;
		return a && Math.abs(a.time - t) < Math.abs(i.time - t) ? a : i;
	}
	_nearestPoint(e, t) {
		let n, r = Infinity;
		for (let i of e) {
			let e = this._nearest(i.points, t);
			if (!e) continue;
			let a = Math.abs(e.time - t);
			a < r && (n = e, r = a);
		}
		return n;
	}
	_pointAtOrBefore(e, t) {
		if (e.length === 0) return;
		let n = 0, r = e.length - 1;
		for (; n < r;) {
			let i = Math.ceil((n + r) / 2);
			e[i].time <= t ? n = i : r = i - 1;
		}
		return e[n].time <= t ? e[n] : void 0;
	}
	_timeAt(e) {
		let t = Math.min(Math.max((e - 40) / 640, 0), 1);
		return this._timeBounds.start + t * (this._timeBounds.end - this._timeBounds.start);
	}
	_svgPoint(e, t = e.currentTarget) {
		if (!(t instanceof Element)) return;
		let n = e.composedPath().find((e) => e instanceof HTMLElement && e.classList.contains("graph-canvas"));
		if (!n) return;
		let r = new Set((n.dataset.seriesIds ?? "").split("|").filter((e) => e !== ""));
		if (r.size === 0) return;
		let i = t.getBoundingClientRect(), a = n.getBoundingClientRect(), o = window.innerHeight || document.documentElement.clientHeight || i.height;
		if (e.clientX < a.left || e.clientX > a.right || e.clientY < a.top || e.clientY > a.bottom) return;
		let s = a.left - i.left, c = a.top - i.top;
		return {
			x: 40 + (e.clientX - a.left) / a.width * 640,
			y: e.clientY - i.top,
			viewportTop: Math.max(0, -i.top),
			viewportBottom: Math.min(i.height, o - i.top),
			activeLeft: s,
			activeTop: c,
			activeWidth: a.width,
			activeHeight: a.height,
			activeIds: r,
			activeKey: [...r].join("|"),
			touchLike: e.pointerType === "touch" || window.matchMedia("(hover: none) and (pointer: coarse)").matches
		};
	}
	renderTooltip() {
		if (!this.tooltip) return O;
		let e = this.tooltip.activeLeft + (this.tooltip.x - 40) / 640 * this.tooltip.activeWidth, t = this.tooltip.activeLeft + (this.tooltip.tooltipX - 40) / 640 * this.tooltip.activeWidth;
		return E`
      <div class="tooltip-axis-pointer" style=${`left:${e.toFixed(1)}px;top:${this.tooltip.activeTop.toFixed(1)}px;height:${this.tooltip.activeHeight.toFixed(1)}px;`}></div>
      <div
        class="tooltip"
        data-placement=${this.tooltip.placement}
        style=${`left:clamp(150px,${t.toFixed(1)}px,calc(100% - 150px));top:${this.tooltip.y.toFixed(1)}px;transform:translateX(-50%);`}
      >
        <div class="tooltip-time">${new Date(this.tooltip.time).toLocaleString()}</div>
        ${this.tooltip.values.map((e) => E`
            <div class="tooltip-row">
              <span class="tooltip-dot" style=${`background:${e.color}`}></span>
              <span class="tooltip-label">${e.label}</span>
              <span>${e.value}</span>
            </div>
          `)}
      </div>
    `;
	}
}, ei = "temperature";
function ti(e) {
	return e.join(".");
}
function ni(e) {
	return e?.toLowerCase() === ei;
}
function ri(e, t) {
	if (!e || !t) return;
	let n = t[ti(e)];
	return typeof n == "string" && n !== "" ? n : void 0;
}
function ii(e) {
	return {
		id: e.id,
		kind: e.attribute ? "entity_attribute" : "entity_state",
		entityId: e.entity,
		label: e.label,
		path: e.attribute,
		valueType: e.valueType,
		unit: e.unit,
		scalePreference: e.scalePreference
	};
}
var ai = 24, oi = "2.5", si = 2.5, ci = [
	"current_temperature",
	"temperature",
	"hvac_action"
];
function li(e) {
	return e.scaleMode === "manual" && (e.scaleMin !== void 0 || e.scaleMax !== void 0);
}
function ui(e) {
	return /* @__PURE__ */ new Date(Math.floor(e.getTime() / 1e3) * 1e3);
}
function di(e) {
	if (e !== void 0) return Array.isArray(e) ? e : e.split(".");
}
function fi(e) {
	return e === "line" || e === "column" ? e : "stair";
}
function pi(e) {
	return typeof e == "number" ? Number.isFinite(e) && e >= 0 ? String(e) : oi : typeof e == "string" && e.trim() !== "" ? e.trim() : oi;
}
function mi(e) {
	return typeof e != "number" || !Number.isFinite(e) || e <= 0 ? si : Math.min(8, Math.max(1, e));
}
function hi(e) {
	return e === "primary" || e === "secondary" ? e : "auto";
}
function gi(e, t) {
	return t ? `attr:${e}:${t.join(".")}` : `state:${e}`;
}
function _i(e) {
	return e[e.length - 1] ?? "";
}
function vi(e, t, n) {
	let r = e?.states[t];
	return r ? n ? Wt(r, n)?.valueType ?? "string" : Ut(r)?.valueType ?? "string" : "number";
}
function yi(e, t, n) {
	let r = e?.states[t];
	return !r || dt(n ? n.reduce((e, t) => typeof e == "object" && e ? e[t] : void 0, r.attributes) : r.state);
}
function bi(e) {
	let t = typeof e.unit == "string" && e.unit.trim() !== "", n = typeof e.scaleMin == "number" && Number.isFinite(e.scaleMin) || typeof e.scaleMax == "number" && Number.isFinite(e.scaleMax);
	return t || n;
}
function xi(e, t, n, r) {
	if (r) return r;
	if (n) return _i(n);
	let i = e?.states[t]?.attributes.friendly_name;
	return typeof i == "string" && i !== "" ? i : t;
}
function Si(e, t, n, r, i) {
	if (r !== void 0) return r || void 0;
	if (n) return ri(n, i);
	let a = e?.states[t]?.attributes.unit_of_measurement;
	return typeof a == "string" && a !== "" ? a : void 0;
}
function Ci(e, t, n, r) {
	return n ? `group:${n}` : r === "number" && t ? `unit:${t}` : `series:${e}`;
}
function wi(e, t) {
	let n = t?.length === 1 ? t[0] : void 0;
	return e.startsWith("climate.") && (n === "current_temperature" || n === "temperature");
}
function Ti(e) {
	return wi(e.entity, e.attribute);
}
function Ei(e, t, n, r, i, a) {
	let o = di(e.attribute), s = gi(e.entity, o), c = vi(n, e.entity, o), l = yi(n, e.entity, o) && bi(e) ? "number" : c, u = Si(n, e.entity, o, e.unit, r), d = e.group ?? e.scaleGroup ?? (wi(e.entity, o) ? "temperature" : void 0);
	return {
		id: s,
		entity: e.entity,
		attribute: o,
		forced: e.forced ?? !0,
		label: xi(n, e.entity, o, e.label),
		color: e.color ?? wn(t),
		unit: u,
		scaleGroupKey: Ci(s, u, d, l),
		scaleMode: e.scaleMode ?? "auto",
		scaleMin: e.scaleMin,
		scaleMax: e.scaleMax,
		scalePreference: hi(e.scalePreference),
		lineMode: fi(e.lineMode ?? i),
		lineWidth: pi(e.lineWidth ?? a),
		showPoints: e.showPoints === !0,
		pointRadius: mi(e.pointRadius),
		valueType: l
	};
}
function Di(e, t, n, r, i) {
	let a = n?.states[e];
	if (!a) {
		let n = `state:${e}`;
		return {
			id: n,
			entity: e,
			forced: !0,
			label: e,
			color: wn(t),
			scaleGroupKey: `series:${n}`,
			scaleMode: "auto",
			scalePreference: "auto",
			lineMode: fi(r),
			lineWidth: pi(i),
			showPoints: !1,
			pointRadius: si,
			valueType: "number"
		};
	}
	let o = Ut(a);
	if (o) return {
		id: o.id,
		entity: e,
		forced: !0,
		label: o.label,
		color: wn(t),
		unit: o.unit,
		scaleGroupKey: Ci(o.id, o.unit, void 0, o.valueType),
		scaleMode: "auto",
		scalePreference: "auto",
		lineMode: fi(r),
		lineWidth: pi(i),
		showPoints: !1,
		pointRadius: si,
		valueType: o.valueType
	};
}
function Oi(e, t) {
	let n = t?.states[e]?.attributes, r = n?.temperature_unit;
	if (typeof r == "string" && r !== "") return r;
	let i = n?.unit_of_measurement;
	if (typeof i == "string" && i !== "") return i;
	let a = t?.config?.unit_system?.temperature;
	return typeof a == "string" && a !== "" ? a : void 0;
}
function ki(e, t, n) {
	if (e.attribute || !e.entity.startsWith("climate.") || !n?.states[e.entity]) return [e];
	let r = Oi(e.entity, n), i = e.scaleGroupKey.startsWith("group:") ? e.scaleGroupKey.slice(6) : void 0;
	return [e, ...ci.map((a) => {
		let o = [a], s = gi(e.entity, o), c = vi(n, e.entity, o), l = bn[a] ?? wn(t()), u = a === "current_temperature" || a === "temperature" ? r : void 0, d = a === "hvac_action" ? void 0 : i ?? "temperature";
		return {
			id: s,
			entity: e.entity,
			attribute: o,
			forced: e.forced,
			label: a,
			color: l,
			unit: u,
			scaleGroupKey: Ci(s, u, d, c),
			scaleMode: "auto",
			scalePreference: e.scalePreference,
			lineMode: e.lineMode,
			lineWidth: e.lineWidth,
			showPoints: e.showPoints,
			pointRadius: e.pointRadius,
			valueType: c
		};
	})];
}
function Ai(e) {
	return e.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && P(e.unit))?.unit ?? e.find((e) => e.unit && P(e.unit))?.unit;
}
function ji(e) {
	let t = Ai(e), n = e.some((e) => e.scaleGroupKey === "group:temperature");
	return e.map((e) => {
		let r = ni(e.unit), i = Ti(e), a = t && (r || Mn(e.unit, t) || e.unit === void 0 && i) ? t : e.unit, o = e.scaleGroupKey;
		if (a && o.startsWith("unit:")) {
			let e = o.slice(5);
			(r && e === "temperature" || Mn(e, a)) && (o = `unit:${a}`);
		}
		return n && e.valueType === "number" && a && P(a) && o.startsWith("unit:") && !li(e) && (o = "group:temperature"), a !== e.unit || o !== e.scaleGroupKey ? {
			...e,
			unit: a,
			scaleGroupKey: o
		} : e;
	});
}
function Mi(e) {
	let { config: t, hass: n } = e, r = e.attributeUnits ?? t?.attributeUnits, i = t?.endDate ?? e.endDate ?? /* @__PURE__ */ new Date(), a = t?.hours ?? e.hours ?? ai, o = t?.startDate ?? e.startDate ?? /* @__PURE__ */ new Date(i.getTime() - a * 36e5), s = t?.lineMode ?? e.lineMode, c = t?.lineWidth ?? e.lineWidth, l;
	l = t?.series && t.series.length > 0 ? t.series.map((e, t) => Ei(e, t, n, r, s, c)) : (t?.defaultEntities ?? e.entities ?? []).map((e, t) => Di(e, t, n, s, c)).filter((e) => e !== void 0);
	let u = l.length;
	return l = l.flatMap((e) => ki(e, () => u++, n)), l = ji(l), {
		startDate: ui(o),
		endDate: ui(i),
		showDatePicker: t?.showDatePicker ?? e.showDatePicker ?? !1,
		showEntityPicker: t?.showEntityPicker ?? e.showEntityPicker ?? !1,
		showLegend: t?.showLegend ?? e.showLegend ?? !0,
		showTooltip: t?.showTooltip ?? e.showTooltip ?? !0,
		showGrid: t?.showGrid ?? e.showGrid ?? !0,
		showScale: t?.showScale ?? e.showScale ?? !0,
		autoScaleSplit: t?.autoScaleSplit ?? e.autoScaleSplit ?? !0,
		width: t?.width ?? e.width ?? "100%",
		height: t?.height ?? e.height,
		backgroundColor: t?.backgroundColor ?? e.backgroundColor,
		title: t?.title ?? e.title,
		titleFontFamily: t?.titleFontFamily ?? e.titleFontFamily,
		titleFontSize: t?.titleFontSize ?? e.titleFontSize,
		titleColor: t?.titleColor ?? e.titleColor,
		language: e.language ?? n?.locale?.language ?? n?.language,
		series: l,
		disableClimateOverlay: t?.disableClimateOverlay ?? !1
	};
}
var Ni = {
	loading: "ui.common.loading",
	empty: "ui.components.history_charts.no_history_found",
	error: "ui.components.history_charts.error",
	add_target: "ui.components.target-picker.add_target",
	attributes: "ui.dialogs.more_info_control.attributes",
	back: "ui.common.back",
	done: "ui.common.done",
	search_entity: "ui.components.entity.entity-picker.search"
}, Pi = {
	en: {
		select_attributes: "Select attributes",
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
		done: "Done",
		search_entity: "Search entity",
		search_attributes: "Search attributes",
		attribute_unit: "Unit",
		attribute_unit_placeholder: "Auto",
		group: "Group",
		group_placeholder: "Default",
		no_matching_attributes: "No matching attributes",
		attribute_results_limited: "Showing first 50 matches"
	},
	fr: {
		select_attributes: "Sélectionner les attributs",
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
		done: "Terminé",
		search_entity: "Rechercher une entité",
		search_attributes: "Rechercher des attributs",
		attribute_unit: "Unité",
		attribute_unit_placeholder: "Auto",
		group: "Groupe",
		group_placeholder: "Défaut",
		no_matching_attributes: "Aucun attribut correspondant",
		attribute_results_limited: "50 premiers résultats affichés"
	},
	cs: {
		select_attributes: "Vybrat atributy",
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
		select_attributes: "Attribute auswählen",
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
		done: "Fertig",
		search_entity: "Entität suchen",
		search_attributes: "Attribute suchen",
		attribute_unit: "Einheit",
		attribute_unit_placeholder: "Auto",
		group: "Gruppe",
		group_placeholder: "Standard",
		no_matching_attributes: "Keine passenden Attribute",
		attribute_results_limited: "Die ersten 50 Treffer werden angezeigt"
	},
	el: {
		select_attributes: "Επιλογή χαρακτηριστικών",
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
		done: "Τέλος",
		search_entity: "Αναζήτηση οντότητας",
		search_attributes: "Αναζήτηση χαρακτηριστικών",
		attribute_unit: "Μονάδα",
		attribute_unit_placeholder: "Αυτόματο",
		group: "Ομάδα",
		group_placeholder: "Προεπιλογή",
		no_matching_attributes: "Δεν βρέθηκαν χαρακτηριστικά",
		attribute_results_limited: "Εμφανίζονται οι πρώτες 50 αντιστοιχίες"
	},
	it: {
		select_attributes: "Seleziona attributi",
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
		done: "Fatto",
		search_entity: "Cerca entità",
		search_attributes: "Cerca attributi",
		attribute_unit: "Unità",
		attribute_unit_placeholder: "Auto",
		group: "Gruppo",
		group_placeholder: "Predefinito",
		no_matching_attributes: "Nessun attributo corrispondente",
		attribute_results_limited: "Mostrate le prime 50 corrispondenze"
	},
	pl: {
		select_attributes: "Wybierz atrybuty",
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
		done: "Gotowe",
		search_entity: "Wyszukaj encję",
		search_attributes: "Szukaj atrybutów",
		attribute_unit: "Jednostka",
		attribute_unit_placeholder: "Auto",
		group: "Grupa",
		group_placeholder: "Domyślny",
		no_matching_attributes: "Brak pasujących atrybutów",
		attribute_results_limited: "Pokazano pierwsze 50 wyników"
	},
	ru: {
		select_attributes: "Выбрать атрибуты",
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
		done: "Готово",
		search_entity: "Поиск сущности",
		search_attributes: "Поиск атрибутов",
		attribute_unit: "Единица",
		attribute_unit_placeholder: "Авто",
		group: "Группа",
		group_placeholder: "По умолчанию",
		no_matching_attributes: "Подходящие атрибуты не найдены",
		attribute_results_limited: "Показаны первые 50 совпадений"
	},
	sk: {
		select_attributes: "Vybrať atribúty",
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
		done: "Hotovo",
		search_entity: "Hľadať entitu",
		search_attributes: "Hľadať atribúty",
		attribute_unit: "Jednotka",
		attribute_unit_placeholder: "Auto",
		group: "Skupina",
		group_placeholder: "Predvolené",
		no_matching_attributes: "Žiadne zodpovedajúce atribúty",
		attribute_results_limited: "Zobrazuje sa prvých 50 zhôd"
	}
};
function L(e, t) {
	let n = Ni[t];
	if (n && e?.localize) {
		let t = e.localize(n);
		if (t) return t;
	}
	return Pi[e?.locale?.language?.split("-")[0] ?? e?.language?.split("-")[0] ?? "en"]?.[t] ?? Pi.en?.[t] ?? t;
}
var Fi = o`
  :host {
    display: flex;
    flex-direction: column;
    container-type: inline-size;
    isolation: isolate;
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

  .chart-layout {
    flex: 1;
    min-height: 0;
    min-width: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
  }

  .chart-layout > .chart-area {
    grid-row: 1;
    grid-column: 1;
    min-height: 0;
    min-width: 0;
  }

  .surface-header {
    grid-row: 1;
    grid-column: 1;
    z-index: 3;
    align-self: start;
    pointer-events: none;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 0 calc(40 / 720 * 100%) 0;
    padding: 7px 8px;
    background: color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 95%, var(--primary-text-color, #fff) 5%);
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    border-radius: var(--better-history-radius, 8px);
    box-sizing: border-box;
  }

  .surface-header > * {
    pointer-events: auto;
  }

  .surface-header:empty {
    display: none;
  }

  .surface-header .controls-bar,
  .surface-header .tools-panel {
    margin: 0;
  }

  .surface-header .tools-panel {
    position: static;
    top: auto;
    z-index: auto;
    background: none;
    border: 0;
    border-radius: 0;
    padding: 0;
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
    justify-content: safe center;
    position: relative;
    overflow-y: var(--better-history-surface-overflow-y, auto);
    padding: 16px;
    padding-top: var(--better-history-surface-header-offset, 16px);
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

  .point-markers {
    fill: none;
    stroke-width: var(--better-history-point-diameter, 5);
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
    pointer-events: none;
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

  .axis-color-dots {
    position: absolute;
    display: flex;
    gap: 0;
    min-width: 20px;
    min-height: 24px;
    align-items: center;
    padding: 12px 14px;
    border-radius: 14px;
    pointer-events: auto;
    z-index: 2;
  }

  .axis-color-dots--left {
    right: calc(var(--axis-label-gap) * -1 - 14px);
    justify-content: flex-end;
  }

  .axis-color-dots--right {
    left: calc(var(--axis-label-gap) * -1 - 14px);
    justify-content: flex-start;
  }

  .axis-color-dot-hit {
    position: relative;
    display: inline-flex;
    width: 10px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    flex: 0 0 auto;
  }

  .axis-color-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 70%, transparent);
    transition: transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease;
  }

  .axis-color-dot-hit[draggable="true"] {
    cursor: grab;
    touch-action: none;
    -webkit-touch-callout: none;
  }

  .axis-color-dot-hit[draggable="true"]:hover .axis-color-dot {
    transform: scale(1.85);
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 70%, transparent),
      0 0 0 4px color-mix(in srgb, currentColor 14%, transparent);
  }

  .axis-color-dot-hit[draggable="false"] {
    cursor: default;
  }

  .axis-color-dot-hit[dragging] {
    cursor: grabbing;
    opacity: 0.65;
  }

  .axis-color-dot-hit[dragging] .axis-color-dot {
    transform: scale(1.85);
  }

  .axis-drop-preview {
    display: inline-flex;
    width: 7px;
    height: 7px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    flex: 0 0 auto;
    pointer-events: none;
    animation: axis-drop-preview-in 120ms ease-out;
  }

  .axis-drop-preview .axis-color-dot {
    opacity: 0.95;
  }

  @keyframes axis-drop-preview-in {
    from {
      opacity: 0;
      transform: translateX(var(--axis-drop-preview-offset, 0)) scale(0.75);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  .axis-color-dots--left {
    --axis-drop-preview-offset: 6px;
  }

  .axis-color-dots--right {
    --axis-drop-preview-offset: -6px;
  }

  .axis-touch-drag-preview {
    display: none;
    position: fixed;
    pointer-events: none;
    z-index: 200;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 80%, transparent),
      0 2px 8px rgb(0 0 0 / 30%);
  }

  @media (pointer: coarse) {
    .axis-color-dots {
      gap: 0;
      padding-inline: 18px;
    }

    .axis-color-dot-hit {
      width: 12px;
      height: 24px;
    }

    .axis-color-dot {
      width: 9px;
      height: 9px;
    }
  }

  .graph-canvas {
    min-width: 0;
    position: relative;
    overflow: hidden;
    touch-action: pan-y;
  }

  .chart-graphs[zoomed] .graph-canvas {
    cursor: grab;
  }

  .graph-canvas[graph-dragging] {
    cursor: grabbing;
  }

  .graph-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 3px calc(40 / 720 * 100%) 0;
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

  .controls-bar:empty {
    display: none;
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
    position: sticky;
    top: 0;
    z-index: 4;
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
    height: 34px;
    display: flex;
    align-items: center;
    padding: 0 2px;
    cursor: ew-resize;
    touch-action: none;
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
    pointer-events: none;
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
    height: 34px;
    background: transparent;
  }

  .range-slider::-moz-range-track {
    height: 34px;
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
    pointer-events: none;
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
    pointer-events: none;
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
    .surface-header {
      margin-left: 0;
      margin-right: 0;
    }

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

  @media (max-width: 700px) {
    .surface-header {
      margin-left: 0;
      margin-right: 0;
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
      flex: 1 1 100%;
      justify-content: flex-end;
    }

    .tool-range-row {
      flex-wrap: wrap;
    }

    .tool-range-control {
      flex: 1 1 0;
      min-width: 0;
    }

    .range-slider-stack,
    .range-slider::-webkit-slider-runnable-track,
    .range-slider::-moz-range-track {
      height: 44px;
    }

    .range-selection {
      height: 18px;
    }

    .range-selection-hit {
      min-width: 44px;
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
    flex: 1 1 0;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    display: block;
  }

  @container (max-width: 560px) {
    .entity-picker {
      flex: 0 1 auto;
      width: 100%;
    }
  }

  @media (hover: none) and (pointer: coarse) {
    .entity-picker {
      flex: 0 1 auto;
      width: 100%;
    }
  }

  .entity-picker-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
    width: 100%;
    max-width: 100%;
  }

  .entity-picker-row--native {
    display: block;
  }

  .source-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
    width: 100%;
    max-width: 100%;
  }

  .entity-trigger {
    flex: 0 0 auto;
    max-width: 100%;
    width: fit-content;
  }

  .target-picker {
    display: block;
    width: 100%;
    max-width: 100%;
    --ha-generic-picker-max-width: 400px;
  }

  .target-picker-done {
    display: block;
    margin: 8px 0 0 auto;
    padding: 7px 16px;
    border: 0;
    border-radius: var(--ha-button-border-radius, 18px);
    background: var(--primary-color, #03a9f4);
    color: var(--text-primary-color, #fff);
    font: inherit;
    cursor: pointer;
  }

  .target-picker-done:hover {
    background: var(--primary-color, #03a9f4);
    filter: brightness(0.94);
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
    border-color: var(--better-history-accent-color, var(--primary-color, #03a9f4));
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
    background: color-mix(in srgb, var(--better-history-accent-color, var(--primary-color, #03a9f4)) 20%, transparent);
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

  .source-settings-popover {
    position: fixed;
    top: -9999px;
    left: -9999px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 260px;
    padding: 12px;
    border: var(--wa-panel-border-width, 1px) var(--wa-panel-border-style, solid) var(--wa-color-surface-border, var(--divider-color, rgba(0, 0, 0, 0.12)));
    border-radius: var(--better-history-radius, 8px);
    background: var(--wa-color-surface-raised, var(--card-background-color, #fff));
    box-shadow: var(--wa-shadow-m, var(--ha-box-shadow-m, 0 4px 8px rgba(0, 0, 0, 0.08)));
    box-sizing: border-box;
    z-index: 110;
  }

  .entity-actions-popover {
    position: fixed;
    top: -9999px;
    left: -9999px;
    min-width: max-content;
    padding: 4px;
    border: var(--wa-panel-border-width, 1px) var(--wa-panel-border-style, solid) var(--wa-color-surface-border, var(--divider-color, rgba(0, 0, 0, 0.12)));
    border-radius: var(--better-history-radius, 8px);
    background: var(--wa-color-surface-raised, var(--card-background-color, #fff));
    box-shadow: var(--wa-shadow-m, var(--ha-box-shadow-m, 0 4px 8px rgba(0, 0, 0, 0.08)));
    box-sizing: border-box;
    z-index: 110;
  }

  .entity-actions-item {
    display: block;
    width: 100%;
    min-height: 36px;
    padding: 0 12px;
    border: 0;
    border-radius: calc(var(--better-history-radius, 8px) - 2px);
    background: transparent;
    color: var(--wa-color-text-normal, var(--primary-text-color, #111));
    cursor: pointer;
    font: inherit;
    text-align: left;
    white-space: nowrap;
  }

  .entity-actions-item:hover,
  .entity-actions-item:focus-visible {
    background: color-mix(in srgb, var(--primary-text-color, #111) 10%, transparent);
    outline: none;
  }

  .source-settings-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    color: var(--wa-color-text-normal, var(--primary-text-color));
    font-size: var(--wa-font-size-s, 13px);
  }

  .source-settings-input {
    box-sizing: border-box;
    width: 100%;
    height: 34px;
    border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    border-radius: var(--better-history-radius, 8px);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #111);
    font: inherit;
    padding: 0 10px;
  }

  .source-settings-input:focus {
    border-color: var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
    outline: none;
  }

  .source-settings-close {
    align-self: flex-end;
    min-height: 32px;
    border: 0;
    border-radius: var(--better-history-radius, 8px);
    background: var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
    color: var(--text-primary-color, #fff);
    cursor: pointer;
    font: inherit;
    padding: 0 12px;
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
    color: var(--better-history-accent-color, var(--primary-color, #03a9f4));
    border-color: color-mix(in srgb, var(--better-history-accent-color, var(--primary-color, #03a9f4)) 62%, var(--better-history-border-color, var(--divider-color, #444)));
    background: color-mix(in srgb, var(--better-history-accent-color, var(--primary-color, #03a9f4)) 14%, transparent);
    box-shadow: inset 3px 0 0 var(--better-history-accent-color, var(--primary-color, #03a9f4));
  }

  .entity-browser-entity--present:hover {
    background: color-mix(in srgb, var(--better-history-accent-color, var(--primary-color, #03a9f4)) 14%, transparent);
  }

  .entity-browser-entity--removable {
    cursor: pointer;
  }

  .entity-browser-entity--removable:hover {
    background: color-mix(in srgb, var(--better-history-accent-color, var(--primary-color, #03a9f4)) 22%, transparent);
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
`, Ii = [
	"ha-icon",
	"ha-button",
	"ha-icon-button",
	"ha-svg-icon",
	"ha-entity-picker",
	"ha-input-chip",
	"ha-assist-chip",
	"ha-generic-picker"
], Li;
function Ri() {
	return Ii.every((e) => customElements.get(e)) ? Promise.resolve() : (Li ??= qi(Ii, "Home Assistant UI components").catch((e) => {
		throw Li = void 0, e;
	}), Li);
}
var zi;
function Bi() {
	return customElements.get("ha-date-range-picker") ? Promise.resolve() : (zi ??= qi(["ha-date-range-picker"], "ha-date-range-picker").catch((e) => {
		throw zi = void 0, e;
	}), zi);
}
var Vi, Hi = !1, Ui = !1;
function Wi() {
	return Hi || customElements.get("ha-target-picker") ? (Hi = !0, Promise.resolve(!0)) : (Vi ??= Gi().finally(() => {
		Hi || (Vi = void 0);
	}), Vi);
}
async function Gi() {
	try {
		await lt(["ha-target-picker"]), Hi = customElements.get("ha-target-picker") !== void 0, Hi || Ki();
	} catch (e) {
		Ki(e);
	}
	return Hi;
}
function Ki(e) {
	if (!Ui) {
		if (Ui = !0, e instanceof Ve) {
			console.warn(`[ha-better-history] Failed to load ha-target-picker. Missing: ${e.result.missing.join(", ") || "unknown"}. Falling back to entity-only selection.`, e.cause ?? e);
			return;
		}
		console.warn("[ha-better-history] Failed to load ha-target-picker. Falling back to entity-only selection.", e);
	}
}
async function qi(e, t) {
	try {
		await lt(e);
		let t = e.filter((e) => !customElements.get(e));
		if (t.length > 0) throw Error(`Components were not registered: ${t.join(", ")}`);
	} catch (e) {
		throw e instanceof Ve ? console.warn(`[ha-better-history] Failed to load ${t}. Missing: ${e.result.missing.join(", ") || "unknown"}.`, e.cause ?? e) : console.warn(`[ha-better-history] Failed to load ${t}.`, e), e;
	}
}
function Ji() {
	return customElements.get("ha-date-range-picker") !== void 0;
}
async function Yi() {
	try {
		await Bi();
	} catch {}
}
function Xi(e) {
	return e.composedPath().some((e) => {
		let t = e.localName;
		return t === "ha-icon-button-prev" || t === "ha-icon-button-next";
	});
}
function Zi(e) {
	let t = (t) => {
		Xi(t) || e.onOpen?.();
	};
	return E`
    <div
      class="date-picker-wrapper"
      @focusin=${t}
      @pointerdown=${t}
      @keydown=${(t) => {
		t.key === "Escape" && e.onClose?.();
	}}
    >
      <ha-date-range-picker
        .hass=${e.hass}
        .startDate=${e.startDate}
        .endDate=${e.endDate}
        time-picker
        extended-presets
        @value-changed=${(t) => {
		let n = t.detail, r = n.value?.startDate ?? n.startDate, i = n.value?.endDate ?? n.endDate;
		r instanceof Date && i instanceof Date && (e.onChange(r, i), e.onClose?.());
	}}
      ></ha-date-range-picker>
    </div>
  `;
}
var Qi = 8, $i = 50, ea = 20, ta = [
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
function na(e) {
	for (let t of e.composedPath()) {
		if (!t || typeof t != "object") continue;
		let e = t;
		if (e.localName === "ha-target-picker-value-chip") return e.type !== "entity" || typeof e.itemId != "string" || e.itemId.trim() === "" ? void 0 : {
			host: t,
			entityId: e.itemId
		};
	}
}
function ra(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ia(e) {
	return typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id;
}
function aa(e) {
	return typeof e == "string" && e.trim() !== "" ? e : void 0;
}
function oa(...e) {
	return e.find((e) => aa(e) !== void 0);
}
function sa(e) {
	return e.split(".")[0] ?? e;
}
function ca(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function la(e, t) {
	let n = ia(t), r = e.entities?.[t.entity_id], i = r?.device_id ? e.devices?.[r.device_id] : void 0, a = r?.area_id ?? i?.area_id, o = a ? e.areas?.[a] : void 0, s = oa(r?.name_by_user, r?.name, r?.original_name, n) ?? t.entity_id, c = oa(i?.name_by_user, i?.name), l = oa(o?.name), u = sa(t.entity_id);
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
function ua(e, t) {
	return e ? (t ?? Object.values(e.states).filter((e) => e !== void 0)).map((t) => la(e, t)) : [];
}
function da(e, t) {
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
function fa(e) {
	return [
		e.primary,
		e.secondary,
		e.id,
		...Object.values(e.search_labels).filter((e) => typeof e == "string")
	].filter((e) => typeof e == "string").map(ca);
}
function pa(e, t) {
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
		e.length >= 4 && t.some((t) => da(e, t) <= 1) && (n = Math.max(n ?? 0, 65));
	}
	return n;
}
function ma(e, t, n = ea) {
	let r = ca(t).split(/\s+/).filter(Boolean);
	return r.length === 0 ? [] : e.map((e) => {
		let t = fa(e), n = 0;
		for (let e of r) {
			let r = pa(e, t);
			if (r === void 0) return;
			n += r;
		}
		return {
			item: e,
			score: n
		};
	}).filter((e) => e !== void 0).sort((e, t) => t.score - e.score || e.item.primary.localeCompare(t.item.primary)).slice(0, n).map((e) => e.item);
}
var ha = !1;
async function ga() {
	if (!ha) {
		try {
			await Ri();
		} catch {}
		ha = _a();
	}
}
function _a() {
	return customElements.get("ha-generic-picker") !== void 0;
}
function va(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0, n = La(e);
	return E`
    <div class="entity-picker"
      @picker-opened=${e.onEntityPickerOpened}
      @picker-closed=${e.onEntityPickerClosed}
    >
      <div class="entity-menu" ?open=${e.menuOpen} @click=${(e) => e.stopPropagation()}>
        <div class="entity-menu-top">
          <span class="entity-menu-title">${t ? ia(t) : ""}</span>
          <button class="entity-menu-close" @click=${e.onCloseMenu}>&#x2715;</button>
        </div>
        ${ka(e)}
      </div>
      <div
        class="entity-picker-row ${e.targetPickerReady ? "entity-picker-row--native" : ""}"
        @dragover=${(t) => e.onSourceDragOver(void 0, t)}
        @drop=${(t) => e.onSourceDrop(void 0, t)}
      >
        ${e.targetPickerReady ? E`
              ${ya(e)}
              ${n.length > 0 ? E`<div class="source-chip-row">
                    ${n.map((t) => Ta(t, e))}
                  </div>` : O}
            ` : E`
              ${e.hideEmptyPickerState ? xa(e) : ba(e)}
              ${n.map((t) => Ta(t, e))}
            `}
      </div>
      ${e.hideEmptyPickerState && !e.targetPickerReady ? Sa(e) : O}
      ${e.loading ? E`
            <div class="history-loading-indicator" role="status" aria-label=${L(e.hass, "loading")}>
              <span class="history-loading-spinner"></span>
              <span class="history-loading-text">${L(e.hass, "loading")}</span>
            </div>
          ` : O}
      ${Ea(e)}
      ${Da(e)}
    </div>
  `;
}
function ya(e) {
	let t = (t) => {
		let n = na(t);
		!n || !e.explicitTargetEntityIds?.includes(n.entityId) || e.onEntityActionsOpen?.(n.entityId, n.host, t) && (t.preventDefault(), t.stopPropagation());
	};
	return e.disableTargetPickerWhileLoading ? E`
    <ha-target-picker
      class="target-picker"
      .hass=${e.hass}
      .value=${e.targetSelection ?? {}}
      .compact=${!0}
      .addOnTop=${!0}
      .disabled=${e.loading}
      @contextmenu=${t}
      @value-changed=${(t) => e.onTargetSelectionChanged?.(t.detail?.value)}
    ></ha-target-picker>
  ` : E`
      <ha-target-picker
        class="target-picker"
        .hass=${e.hass}
        .value=${e.targetSelection ?? {}}
        .compact=${!0}
        .addOnTop=${!0}
        @contextmenu=${t}
        @value-changed=${(t) => e.onTargetSelectionChanged?.(t.detail?.value)}
      ></ha-target-picker>
    `;
}
function ba(e) {
	return E`
    <ha-generic-picker
      class="entity-trigger"
      .hass=${e.hass}
      .addButtonLabel=${L(e.hass, "add_target")}
      .value=${""}
      .getItems=${e.getItems}
      .emptyLabel=${""}
      .searchLabel=${L(e.hass, "search_entity")}
      .searchKeys=${ta}
      @value-changed=${(t) => {
		let n = t.detail.value;
		n && e.onEntitySelected(n);
	}}
    ></ha-generic-picker>
  `;
}
function xa(e) {
	let t = L(e.hass, "add_target");
	return E`
    <ha-button
      class="entity-trigger entity-add-trigger"
      size="s"
      appearance="filled"
      @click=${e.onEntityPickerOpened}
    >
      <ha-icon icon="mdi:playlist-plus" slot="start"></ha-icon>
      ${t}
    </ha-button>
  `;
}
function Sa(e) {
	let t = L(e.hass, "search_entity"), n = e.entitySearch ?? "", r = n.trim() ? e.getAdditionalItems(n).filter(Ca) : [];
	return E`
    <div class="entity-select-menu" ?open=${e.entityPickerOpen} @click=${(e) => e.stopPropagation()}>
      <input
        class="entity-browser-search-input"
        type="search"
        .value=${n}
        placeholder=${t}
        aria-label=${t}
        @input=${(t) => e.onEntitySearchChanged?.(t.target.value)}
        @click=${(e) => e.stopPropagation()}
        @keydown=${(e) => e.stopPropagation()}
      />
      ${r.length > 0 ? E`
        <div class="entity-select-results">
          ${r.map((t) => E`
            <button
              class="entity-select-result"
              @click=${() => {
		e.onEntitySearchChanged?.(""), e.onEntitySelected(t.id);
	}}
            >
              <span class="entity-browser-entry-label">${t.primary}</span>
              ${t.secondary ? E`<span class="entity-browser-entry-secondary">${t.secondary}</span>` : O}
            </button>
          `)}
        </div>
      ` : O}
    </div>
  `;
}
function Ca(e) {
	return ra(e) && typeof e.id == "string" && typeof e.primary == "string";
}
function wa(e) {
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
function Ta(e, t) {
	let n = Fa(e.id, t), r = Na(e.id, t), i = e.kind === "entity_state", a = t.hass?.states[e.entityId], o = i ? "entity-source-chip" : "attr-source-chip", s = t.draggingSourceId === e.id, c = (e.kind === "entity_attribute" || e.kind === "entity_state") && r && !n, l, u, d = () => {
		l !== void 0 && (clearTimeout(l), l = void 0), u = void 0;
	}, f = (n) => {
		c && (n.preventDefault(), n.stopPropagation(), t.onSourceSettingsOpen(e, n));
	};
	return E`
    <div
      class="source-chip ${o}"
      data-source-id=${e.id}
      draggable=${r && !n}
      ?dragging=${s}
      @contextmenu=${f}
      @pointerdown=${(e) => {
		!c || e.button !== 0 || (u = {
			x: e.clientX,
			y: e.clientY
		}, l = setTimeout(() => {
			l = void 0, f(e);
		}, 560));
	}}
      @pointermove=${(e) => {
		u && (Math.abs(e.clientX - u.x) > 8 || Math.abs(e.clientY - u.y) > 8) && d();
	}}
      @pointerup=${d}
      @pointercancel=${d}
      @pointerleave=${d}
      @dragstart=${(i) => {
		d(), r && !n && t.onSourceDragStart(e.id, i);
	}}
      @dragend=${() => {
		d(), t.onSourceDragEnd();
	}}
      @dragover=${(i) => {
		r && !n && t.onSourceDragOver(e.id, i);
	}}
      @drop=${(n) => t.onSourceDrop(e.id, n)}
    >
      <span class="source-chip-icon">
        ${i && a ? E`<ha-icon .icon=${wa(a)}></ha-icon>` : E`<ha-icon .icon=${Oa(e.valueType)}></ha-icon>`}
      </span>
      <span class="source-chip-label">${e.label}</span>
      ${n ? O : E`<button
            class="source-chip-remove"
            @click=${(n) => {
		n.preventDefault(), t.onSourceRemoved(e.id);
	}}
          >&#x2715;</button>`}
    </div>
  `;
}
function Ea(e) {
	return e.sourceSettingsSourceId ? E`
    <div
      class="source-settings-popover"
      data-source-settings-popover
      @click=${(e) => e.stopPropagation()}
      @pointerdown=${(e) => e.stopPropagation()}
      @keydown=${(t) => {
		t.stopPropagation(), t.key === "Escape" && e.onSourceSettingsClose();
	}}
    >
      <label class="source-settings-field">
        <span>${L(e.hass, "attribute_unit")}</span>
        <input
          class="source-settings-input"
          .value=${e.sourceSettingsUnit ?? ""}
          placeholder=${L(e.hass, "attribute_unit_placeholder")}
          @input=${(t) => e.onSourceSettingsUnitChanged(t.target.value)}
        />
      </label>
      <label class="source-settings-field">
        <span>${L(e.hass, "group")}</span>
        <input
          class="source-settings-input"
          .value=${e.sourceSettingsGroup ?? ""}
          placeholder=${L(e.hass, "group_placeholder")}
          @input=${(t) => e.onSourceSettingsGroupChanged(t.target.value)}
        />
      </label>
      <button class="source-settings-close" @click=${e.onSourceSettingsClose}>
        ${L(e.hass, "done")}
      </button>
    </div>
  ` : O;
}
function Da(e) {
	let t = e.entityActionsEntityId;
	return t ? E`
    <div
      class="entity-actions-popover"
      data-entity-actions-popover
      role="menu"
      @click=${(e) => e.stopPropagation()}
      @pointerdown=${(e) => e.stopPropagation()}
      @keydown=${(t) => {
		t.stopPropagation(), t.key === "Escape" && e.onEntityActionsClose?.();
	}}
    >
      <button
        class="entity-actions-item"
        role="menuitem"
        @click=${() => e.onEntityAttributesSelect?.(t)}
      >
        ${L(e.hass, "select_attributes")}
      </button>
    </div>
  ` : O;
}
function Oa(e) {
	switch (e) {
		case "number": return "mdi:chart-line";
		case "string": return "mdi:text";
		case "boolean": return "mdi:toggle-switch";
		default: return "mdi:code-tags";
	}
}
function ka(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0, n = e.path, r = t ? (() => {
		if (n.length === 0) return t.attributes;
		let e = t.attributes;
		for (let t of n) {
			if (!ra(e)) return;
			e = e[t];
		}
		return e;
	})() : void 0;
	return E`
    <div class="entity-browser">
      ${Aa(t, e)}
      <div class="entity-browser-list">
        ${t ? ja(t, n, ra(r) ? r : {}, e) : E`<div class="entity-browser-empty">${L(e.hass, "no_entity_selected")}</div>`}
      </div>
    </div>
  `;
}
function Aa(e, t) {
	return !e || t.path.length === 0 ? E`` : E`
    <div class="entity-breadcrumb">
      ${t.path.map((e, n) => E`
          ${n > 0 ? E`<span class="entity-breadcrumb-sep">/</span>` : O}
          <button class="entity-crumb" @click=${() => t.onBreadcrumbClick(t.path.slice(0, n + 1))}>${e}</button>
        `)}
    </div>
  `;
}
function ja(e, t, n, r) {
	let i = Object.entries(n).sort(([e], [t]) => e.localeCompare(t)), a = i.some(([n, r]) => ra(r) ? !0 : Ht(r) !== void 0 && !!Wt(e, [...t, n]));
	return E`
    <div class="entity-browser-entries">
      ${t.length > 0 ? E`
            <div class="entity-browser-back" @click=${() => r.onBreadcrumbClick(t.slice(0, -1))}>
              &#x2190; ${L(r.hass, "back")}
            </div>
          ` : E`
            ${Ba(e, r)}
            ${a ? E`
                  <div class="entity-browser-section-title">${L(r.hass, "attributes")}</div>
                  ${Ma(r)}
                ` : O}
          `}
      ${t.length === 0 && r.attributeSearch.trim() ? Ua(e, r) : i.map(([n, i]) => Va(e, n, i, t, r))}
    </div>
  `;
}
function Ma(e) {
	let t = L(e.hass, "search_attributes");
	return E`
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
function Na(e, t) {
	return t.selectedSources.some((t) => t.id === e);
}
function Pa(e, t) {
	return (t.resolved?.series ?? []).some((t) => t.id === e);
}
function Fa(e, t) {
	return (t.resolved?.series ?? []).some((t) => t.id === e && t.forced !== !1);
}
function Ia(e) {
	return {
		id: e.id,
		kind: e.attribute ? "entity_attribute" : "entity_state",
		entityId: e.entity,
		label: e.label,
		path: e.attribute,
		valueType: e.valueType,
		unit: e.unit,
		scalePreference: e.scalePreference
	};
}
function La(e) {
	let t = [...(e.resolved?.series ?? []).filter((e) => e.forced === !1).map(Ia), ...e.selectedSources.filter((e) => e.kind === "entity_attribute")], n = /* @__PURE__ */ new Set();
	return t.filter((e) => !n.has(e.id) && (n.add(e.id), !0));
}
function Ra(e, t) {
	if (t.targetEntityIds?.includes(e)) return !0;
	let n = t.selectedSources.some((t) => t.entityId === e), r = (t.resolved?.series ?? []).some((t) => t.entity === e);
	return n || r;
}
function za(e, t) {
	if (!e.entity_id.startsWith("climate.")) return !1;
	let n = t.selectedSources.some((t) => t.entityId.startsWith("climate.") && t.entityId !== e.entity_id), r = (t.resolved?.series ?? []).some((t) => t.entity.startsWith("climate.") && t.entity !== e.entity_id);
	return n || r;
}
function Ba(e, t) {
	let n = Ut(e);
	return n ? za(e, t) ? E`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : t.explicitTargetEntityIds?.includes(e.entity_id) ? E`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onEntityStateRemoved?.(e.entity_id)}>
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : t.targetEntityIds?.includes(e.entity_id) ? E`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--forced">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : Na(n.id, t) ? E`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onSourceRemoved(n.id)}>
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : Pa(n.id, t) ? Fa(n.id, t) ? E`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--forced">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : E`
        <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onSourceRemoved(n.id)}>
          <span class="entity-browser-entry-label">${e.entity_id}</span>
        </div>
      ` : Ra(e.entity_id, t) ? E`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : E`
    <div class="entity-browser-entity" @click=${() => t.onEntityStateAdded ? t.onEntityStateAdded(e.entity_id) : t.onSourceAdded(n)}>
      <span class="entity-browser-entry-label">${e.entity_id}</span>
    </div>
  ` : O;
}
function Va(e, t, n, r, i) {
	if (ra(n)) return E`
      <div class="entity-browser-entry" @click=${() => i.onBreadcrumbClick([...r, t])}>
        <span class="entity-browser-entry-label">${t}</span>
        <span class="entity-browser-entry-arrow">&#x203A;</span>
      </div>
    `;
	let a = Ht(n), o = [...r, t];
	if (!a) return O;
	let s = Wt(e, o);
	return s ? Ha({
		label: t,
		source: s,
		type: a,
		opts: i
	}) : O;
}
function Ha(e) {
	let { label: t, source: n, type: r, opts: i, secondary: a } = e, o = E`
    <span class="entity-browser-entry-text">
      <span class="entity-browser-entry-label">${t}</span>
      ${a ? E`<span class="entity-browser-entry-secondary">${a}</span>` : O}
    </span>
    <span class="entity-browser-entry-type">${r}</span>
  `;
	return Na(n.id, i) ? E`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--removable" @click=${() => i.onSourceRemoved(n.id)}>
        ${o}
      </div>
    ` : Pa(n.id, i) ? Fa(n.id, i) ? E`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--forced">
        ${o}
      </div>
    ` : E`
        <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--removable" @click=${() => i.onSourceRemoved(n.id)}>
          ${o}
        </div>
      ` : E`
    <div class="entity-browser-entry" @click=${() => i.onSourceAdded(n)}>
      ${o}
    </div>
  `;
}
function Ua(e, t) {
	let n = Wa(e, e.attributes, t.attributeSearch), r = n.slice(0, $i);
	return r.length === 0 ? E`<div class="entity-browser-search-empty">${L(t.hass, "no_matching_attributes")}</div>` : E`
    <div class="entity-browser-search-results">
      ${r.map((e) => Ha({
		label: e.key,
		source: e.source,
		type: e.valueType,
		opts: t,
		secondary: e.dottedPath
	}))}
      ${n.length > r.length ? E`<div class="entity-browser-search-count">${L(t.hass, "attribute_results_limited")}</div>` : O}
    </div>
  `;
}
function Wa(e, t, n) {
	let r = n.trim().toLocaleLowerCase();
	if (!r) return [];
	let i = [], a = (t, n, o) => {
		if (!(o > Qi)) for (let [s, c] of Object.entries(t)) {
			let t = [...n, s];
			if (ra(c)) {
				a(c, t, o + 1);
				continue;
			}
			let l = Ht(c), u = l ? Wt(e, t) : void 0;
			!l || !u || Ga(t, c).includes(r) && i.push({
				key: s,
				dottedPath: t.join("."),
				valueType: l,
				source: u
			});
		}
	};
	return a(t, [], 0), i.sort((e, t) => {
		let n = Ka(e, r), i = Ka(t, r);
		return n === i ? e.dottedPath.length === t.dottedPath.length ? e.dottedPath.localeCompare(t.dottedPath) : e.dottedPath.length - t.dottedPath.length : n - i;
	});
}
function Ga(e, t) {
	let n = typeof t == "string" || typeof t == "number" || typeof t == "boolean" ? String(t) : "";
	return [
		...e,
		e.join("."),
		n
	].join(" ").toLocaleLowerCase();
}
function Ka(e, t) {
	let n = e.key.toLocaleLowerCase(), r = e.dottedPath.toLocaleLowerCase();
	return n.startsWith(t) ? 0 : r.startsWith(t) ? 1 : n.includes(t) ? 2 : r.includes(t) ? 3 : 4;
}
var qa = [
	"entity_id",
	"label_id",
	"floor_id",
	"area_id",
	"device_id"
], Ja = [
	"label_id",
	"floor_id",
	"area_id",
	"device_id"
], Ya;
function Xa(e) {
	let t = (Array.isArray(e) ? e : e === void 0 ? [] : [e]).filter((e) => typeof e == "string").map((e) => e.trim()).filter(Boolean), n = [...new Set(t)];
	return n.length > 0 ? n : void 0;
}
function R(e) {
	let t = {};
	for (let n of qa) {
		let r = Xa(e?.[n]);
		r && (t[n] = r);
	}
	return t;
}
function Za(e) {
	return qa.every((t) => Xa(e?.[t]) === void 0);
}
function z(e) {
	return R(e).entity_id ?? [];
}
function Qa(e, t) {
	let n = R(e), r = R(t);
	return Ja.some((e) => {
		let t = new Set(r[e] ?? []);
		return (n[e] ?? []).some((e) => !t.has(e));
	});
}
function $a(e, t) {
	let n = qa.map((e) => `${e}:${(t[e] ?? []).join(",")}`).join("|");
	if (Ya?.selectionKey === n && Ya.entities === e.entities && Ya.devices === e.devices && Ya.areas === e.areas) return Ya;
	let r = new Set(t.entity_id ?? []), i = new Set(t.label_id ?? []), a = new Set(t.floor_id ?? []), o = new Set(t.area_id ?? []), s = new Set(t.device_id ?? []), c = r.size, l = Object.values(e.areas ?? {}).filter((e) => e !== void 0), u = Object.values(e.devices ?? {}).filter((e) => e !== void 0), d = Object.values(e.entities ?? {}).filter((e) => e !== void 0);
	for (let e of i) {
		for (let t of l) (t.labels ?? []).includes(e) && o.add(t.area_id);
		for (let t of u) (t.labels ?? []).includes(e) && s.add(t.id);
		for (let t of d) (t.labels ?? []).includes(e) && r.add(t.entity_id);
	}
	for (let e of a) for (let t of l) t.floor_id === e && o.add(t.area_id);
	for (let e of o) {
		for (let t of u) t.area_id === e && s.add(t.id);
		for (let t of d) t.area_id === e && r.add(t.entity_id);
	}
	for (let e of s) for (let t of d) t.device_id === e && r.add(t.entity_id);
	let f = {
		selectionKey: n,
		entities: e.entities,
		devices: e.devices,
		areas: e.areas,
		candidates: [...r],
		explicitCount: c
	};
	return Ya = f, f;
}
function eo(e, t) {
	let { candidates: n, explicitCount: r } = $a(e, R(t));
	return n.filter((t, n) => n < r || e.states[t] !== void 0);
}
function to(e, t) {
	return eo(e, t).map((t) => e.states[t]).filter((e) => e !== void 0).map(Ut).filter((e) => e !== void 0);
}
function no(e) {
	return Array.isArray(e) ? e.join(".") : e;
}
function ro(e) {
	let t = no(e.attribute);
	return t ? `attr:${e.entity}:${t}` : `state:${e.entity}`;
}
function io(e) {
	return {
		...e,
		...Array.isArray(e.attribute) ? { attribute: [...e.attribute] } : {}
	};
}
function ao(e) {
	let t = e.scalePreference === "primary" || e.scalePreference === "secondary" ? e.scalePreference : void 0, n = e.group ?? e.scaleGroup;
	return {
		entity: e.entityId,
		...e.kind === "entity_attribute" && e.path?.length ? { attribute: e.path.join(".") } : {},
		forced: !0,
		label: e.label,
		...e.unit === void 0 ? {} : { unit: e.unit },
		...n === void 0 ? {} : { group: n },
		...t ? { scalePreference: t } : {}
	};
}
function oo(e) {
	let t = e.config?.series?.length ? e.config.series.map(io) : (e.config?.defaultEntities?.length ? e.config.defaultEntities : e.entities ?? []).map((e) => ({
		entity: e,
		forced: !0
	})), n = new Set(e.removedConfigSourceIds), r = [
		...t.filter((e) => !n.has(ro(e))),
		...e.targetSources.map(ao),
		...e.selectedSources.map(ao),
		...e.pendingSources.map(ao)
	], i = /* @__PURE__ */ new Set(), a = [];
	for (let t of r) {
		let n = ro(t);
		if (i.has(n)) continue;
		i.add(n);
		let r = io(t), o = e.scalePreferences[n], s = o === "primary" || o === "secondary" ? o : r.scalePreference;
		s === "primary" || s === "secondary" ? r.scalePreference = s : delete r.scalePreference, a.push(r);
	}
	return a;
}
function so(e, t) {
	let n = e.start.getTime(), r = Math.min(e.end.getTime(), t);
	return Number.isFinite(n) && Number.isFinite(r) && r > n ? {
		start: new Date(n),
		end: new Date(r)
	} : void 0;
}
function co(e) {
	let t = typeof e.hours == "number" && Number.isFinite(e.hours) && e.hours > 0 ? e.hours : 24;
	if (e.rollingRelativeRange && !e.viewRangeZoomed) return {
		mode: "relative",
		hours: t
	};
	let n = e.now ?? Date.now(), r = so(e.viewRange, n) ?? so(e.loadedRange, n) ?? {
		start: /* @__PURE__ */ new Date(n - 864e5),
		end: new Date(n)
	};
	return {
		mode: "absolute",
		startDate: r.start,
		endDate: r.end
	};
}
function lo(e) {
	return e === "stair" || e === "line" || e === "column" ? e : void 0;
}
function uo(e) {
	return {
		series: oo(e),
		range: co(e),
		lineMode: lo(e.runtimeLineMode) ?? lo(e.config?.lineMode) ?? lo(e.lineMode) ?? "stair",
		importedData: e.importedData
	};
}
function B(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
var fo = 60, po = 1e3, mo = 24, ho = 28, go = 720, _o = 1e3, vo = 18, yo = 44, bo = 12, xo = 14, So = .0025, Co = .012, wo = 48, To = .5, Eo = 2, Do = 6, Oo = 10, ko = 24, Ao = 5, jo = .1, Mo = 10, No = 1.15, Po = 48, Fo = .34, Io = .72, Lo = 720, Ro = 2, zo = 46, Bo = 22, Vo = [
	"current_temperature",
	"temperature",
	"hvac_action"
], Ho = /* @__PURE__ */ new Set(["current_temperature", "temperature"]), Uo = 5, Wo = "haBetterHistory", Go = 50;
function Ko(e) {
	let t = 0;
	for (let n of e) t += n >= "0" && n <= "9" ? 6.2 : n === "." || n === "," ? 3.2 : n === "-" ? 4 : 6.2;
	return Math.ceil(t);
}
function qo(e, t = 0) {
	let n = Math.max(0, ...e.map((e) => Ko(e.value))), r = t > 0 ? t * 10 : 0, i = Math.max(n, r);
	return i > 0 ? i + Uo : 0;
}
function Jo(e) {
	return Nn(e);
}
function Yo(e) {
	let t = e?.trim();
	if (!t || !/^\d+$/.test(t)) return;
	let n = Number(t);
	return Number.isSafeInteger(n) && n > 0 ? n : void 0;
}
function Xo(e) {
	return e.group ?? e.scaleGroup;
}
function Zo(e) {
	return e.id.startsWith("attr:climate.") && (e.id.endsWith(":current_temperature") || e.id.endsWith(":temperature"));
}
function Qo(e) {
	return e.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && P(e.unit))?.unit ?? e.find((e) => e.unit && P(e.unit))?.unit;
}
function $o(e) {
	let t = Qo(e);
	return t ? e.map((e) => {
		let n = Mn(e.unit, t) || e.unit === void 0 && Zo(e) ? t : e.unit;
		return n === e.unit ? e : {
			...e,
			unit: n
		};
	}) : e;
}
var V = class extends k {
	constructor(...e) {
		super(...e), this.hours = 24, this.showDatePicker = !1, this.showEntityPicker = !1, this.showImportButton = !1, this.showExportButton = !0, this.showTimeRangeSelector = !0, this.showLineModeButtons = !0, this.showLegend = !0, this.showTooltip = !0, this.showGrid = !0, this.showScale = !0, this.autoScaleSplit = !0, this.showControls = !0, this.debugPerformance = !1, this.toolsOpen = !1, this._hiddenSeriesIds = [], this._liveNow = Date.now(), this._datePickerReady = !1, this._entityComponentsReady = !1, this._targetPickerReady = !1, this._targetPickerLoadComplete = !1, this._attributeMenuOpen = !1, this._attributeSearch = "", this._path = [], this._selectedSources = [], this._selectedTargets = {}, this._removedConfigSourceIds = [], this._scalePreferences = {}, this._customEntityIds = [], this._entityPickerOpen = !1, this._datePickerOpen = !1, this._pendingAddedSources = [], this._data = new vn(this), this._tooltip = new $r(this), this._browserHistoryInstanceId = `hbh-${Math.random().toString(36).slice(2)}`, this._prevClipX = /* @__PURE__ */ new Map(), this._prevStartTime = 0, this._prevEndTime = 0, this._prevContainerWidth = 0, this._wasLoading = !1, this._suppressLineAnimation = !1, this._suppressLiveRangeAnimation = !1, this._dragDropCommitted = !1, this._lastPickerOverlayOpen = !1, this._lastPointerDownInside = !1, this._syncingBrowserHistory = !1, this._selectingEntityForAttributeMenu = !1, this._importedSeriesMeta = /* @__PURE__ */ new Map(), this._importedSources = [], this._importedDataActive = !1, this._containerWidth = 0, this._chartSurfaceHeight = 0, this._chartSurfaceConstrained = !1, this._lastContentHeight = 0, this._graphTouchPointers = /* @__PURE__ */ new Map(), this._handleBrowserPopState = (e) => {
			let t = this._browserHistoryEntry(e.state);
			this._syncingBrowserHistory = !0;
			try {
				if (!t) {
					this._closeBrowserHistoryOverlays();
					return;
				}
				this._openBrowserHistoryLayer(t.layer);
			} finally {
				this._syncingBrowserHistory = !1;
			}
		}, this._lastFetchKey = "", this._lastFetchSources = [], this._lastHassResolveTime = 0, this._getEntityPickerItems = () => ua(this.hass), this._getAdditionalEntityPickerItems = (e) => {
			if (!this.hass || !e?.trim()) return [];
			let t = new Set(this._pickerEntities().map((e) => e.entity_id));
			return ma(ua(this.hass, Object.values(this.hass.states).filter((e) => e !== void 0).filter((e) => !t.has(e.entity_id))), e);
		}, this._handleDocumentPointerDown = (e) => {
			this._lastPointerDownInside = this._isEventInsideAttributeOverlay(e), !(!this._attributeMenuOpen && !this._sourceSettingsSourceId && !this._entityActionsEntityId) && (this._lastPointerDownInside || (e.stopPropagation(), e.stopImmediatePropagation()));
		}, this._handleDocumentClick = (e) => {
			if (!this._attributeMenuOpen && !this._sourceSettingsSourceId && !this._entityActionsEntityId) {
				this._lastPointerDownInside = !1;
				return;
			}
			let t = this._lastPointerDownInside;
			if (this._lastPointerDownInside = !1, !t && !this._isEventInsideAttributeOverlay(e)) {
				if (this._entityActionsEntityId) {
					e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this._closeEntityActions();
					return;
				}
				if (this._sourceSettingsSourceId) {
					e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this._sourceSettingsSourceId = void 0;
					return;
				}
				e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this._closeAttributeMenu();
			}
		};
	}
	static {
		this.styles = Fi;
	}
	getRuntimeConfigSnapshot() {
		return uo({
			config: this.config,
			entities: this.entities,
			targetSources: this._targetSources(),
			selectedSources: this._selectedSources,
			pendingSources: this._pendingAddedSources,
			removedConfigSourceIds: this._removedConfigSourceIds,
			scalePreferences: this._scalePreferences,
			rollingRelativeRange: this._usesRollingRelativeRange(),
			viewRangeZoomed: this._isViewRangeZoomed(),
			hours: this.config?.hours ?? this.hours ?? 24,
			viewRange: this._effectiveViewRange(),
			loadedRange: this._effectiveDateRange(),
			runtimeLineMode: this._runtimeLineMode,
			lineMode: this.lineMode,
			importedData: this._importedDataActive
		});
	}
	connectedCallback() {
		super.connectedCallback(), Ri().catch(() => void 0), document.addEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.addEventListener("click", this._handleDocumentClick, !0), window.addEventListener("popstate", this._handleBrowserPopState), this._resizeObserver = new ResizeObserver((e) => {
			for (let t of e) if (t.target === this) {
				let e = Math.round(t.contentRect.width);
				e !== this._containerWidth && (this._containerWidth = e);
			} else t.target === this._observedChartSurface && this._syncChartSurfaceSize(t.contentRect.height);
		}), this._resizeObserver.observe(this);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), document.removeEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.removeEventListener("click", this._handleDocumentClick, !0), window.removeEventListener("popstate", this._handleBrowserPopState), this._resizeObserver?.disconnect(), this._resizeObserver = void 0, this._surfaceHeaderObserver?.disconnect(), this._surfaceHeaderObserver = void 0, this._resetGraphGestureState(), this._sourceAddBatchTimer !== void 0 && (clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = void 0), this._pendingAttributeOpenTimer !== void 0 && (clearTimeout(this._pendingAttributeOpenTimer), this._pendingAttributeOpenTimer = void 0), this._closeEntityActions(), this._stopLiveClock();
	}
	_maxXTicks() {
		if (this._containerWidth <= 0) return 12;
		let e = Math.max(3, Math.floor(this._containerWidth * 640 / 36e3));
		return this._chartSurfaceHeight > 0 && this._chartSurfaceHeight < 120 ? Math.max(3, Math.min(e, Math.floor(this._chartSurfaceHeight / 24))) : e;
	}
	_observeChartSurface() {
		let e = this.renderRoot.querySelector(".chart-surface");
		e !== this._observedChartSurface && (this._observedChartSurface && this._resizeObserver?.unobserve(this._observedChartSurface), this._observedChartSurface = e ?? void 0, e ? (this._resizeObserver?.observe(e), this._syncChartSurfaceSize(e.getBoundingClientRect().height)) : this._chartSurfaceHeight !== 0 && (this._chartSurfaceHeight = 0, this._chartSurfaceConstrained = !1));
	}
	_syncChartSurfaceSize(e) {
		let t = Math.round(e), n = this._observedChartSurface?.querySelector(".chart-graphs"), r = n ? Math.round(n.offsetHeight) : 0;
		if (this._measureGraphLayout(n ?? void 0, r), this._lastContentHeight > 0 && r > 0 && r === this._lastContentHeight && Math.abs(t - this._chartSurfaceHeight) > Ro) return;
		this._lastContentHeight = r;
		let i = r < t - Ro || t < r - Ro, a = t < this._chartSurfaceHeight - Ro, o = this._graphGroupRenderCache?.graphHeight ?? 180, s = this._chartSurfaceConstrained && o !== 180;
		if (i || a || s) {
			this._chartSurfaceHeight !== t && (this._chartSurfaceHeight = t), this._chartSurfaceConstrained ||= !0;
			return;
		}
		this._chartSurfaceHeight !== 0 && (this._chartSurfaceHeight = 0), this._chartSurfaceConstrained &&= !1;
	}
	_observeSurfaceHeader() {
		let e = this.renderRoot.querySelector(".surface-header");
		e !== this._observedSurfaceHeader && (this._surfaceHeaderObserver && this._observedSurfaceHeader && this._surfaceHeaderObserver.unobserve(this._observedSurfaceHeader), this._observedSurfaceHeader && !e && this._syncSurfaceHeaderOffset(0), this._observedSurfaceHeader = e ?? void 0, e && (this._surfaceHeaderObserver ||= new ResizeObserver((e) => {
			for (let t of e) this._syncSurfaceHeaderOffset(t.contentRect.height);
		}), this._surfaceHeaderObserver.observe(e)));
	}
	_measureGraphLayout(e, t) {
		if (!e || t <= 0) return;
		let n = e.querySelectorAll(".graph-section").length, r = this._graphGroupRenderCache?.graphHeight;
		if (n <= 0 || r === void 0) return;
		let i = Math.max(0, t - n * r);
		this._measuredGraphLayout = {
			graphCount: n,
			graphHeight: r,
			overheadHeight: i
		};
	}
	_syncSurfaceHeaderOffset(e) {
		let t = this.renderRoot.querySelector(".chart-surface");
		if (!t) return;
		if (e <= 0) {
			t.style.getPropertyValue("--better-history-surface-header-offset") && t.style.removeProperty("--better-history-surface-header-offset");
			return;
		}
		let n = t.querySelector(".chart-graphs"), r = Math.round(t.getBoundingClientRect().height), i = n ? Math.round(n.offsetHeight) : 0, a = i > r - Ro, o = Math.max(0, (r - i) / 2), s = e + 10 - o, c = t.style.getPropertyValue("--better-history-surface-header-offset"), l = c !== "";
		if (this._chartSurfaceConstrained || a) {
			let r = Math.ceil(e + 10);
			if (c === `${r}px`) return;
			this._lastContentHeight = n ? Math.round(n.offsetHeight) : 0, t.style.setProperty("--better-history-surface-header-offset", `${r}px`);
			return;
		}
		if (s <= 0) {
			if (!l || s > -2) return;
			this._lastContentHeight = n ? Math.round(n.offsetHeight) : 0, t.style.removeProperty("--better-history-surface-header-offset");
			return;
		}
		let u = Math.ceil(2 * s);
		c !== `${u}px` && (this._lastContentHeight = n ? Math.round(n.offsetHeight) : 0, t.style.setProperty("--better-history-surface-header-offset", `${u}px`));
	}
	_effectiveStartDate() {
		return this._usesRollingRelativeRange() ? new Date(Date.now() - this._relativeRangeMs()) : this._rangeStart ?? this.startDate ?? this.config?.startDate ?? new Date(Date.now() - this._relativeRangeMs());
	}
	_effectiveEndDate() {
		if (this._usesRollingRelativeRange()) return /* @__PURE__ */ new Date();
		let e = this._requestedEndDate(), t = this._liveNow || Date.now();
		return e.getTime() > t ? new Date(t) : e;
	}
	_requestedEndDate() {
		return this._rangeEnd ?? this.endDate ?? this.config?.endDate ?? /* @__PURE__ */ new Date();
	}
	_rangeExtendsFuture() {
		return this._requestedEndDate().getTime() > Date.now();
	}
	_relativeRangeMs() {
		return (this.config?.hours ?? this.hours ?? 24) * 36e5;
	}
	_usesRollingRelativeRange() {
		return !this._importedDataActive && !this._rangeStart && !this._rangeEnd && !this.startDate && !this.endDate && !this.config?.startDate && !this.config?.endDate;
	}
	_effectiveDateRange() {
		if (this._usesRollingRelativeRange()) {
			let e = /* @__PURE__ */ new Date();
			return {
				start: new Date(e.getTime() - this._relativeRangeMs()),
				end: e
			};
		}
		return {
			start: this._effectiveStartDate(),
			end: this._effectiveEndDate()
		};
	}
	_syncLiveClock() {
		if (!this._rangeExtendsFuture()) {
			this._stopLiveClock();
			return;
		}
		if (this._liveNowTimer !== void 0) return;
		let e = Date.now();
		this._viewEnd &&= new Date(e), this._liveNow = e, this._liveNowTimer = setInterval(() => {
			if (!this._rangeExtendsFuture()) {
				this._stopLiveClock();
				return;
			}
			let e = this._effectiveEndDate().getTime(), t = !this._viewEnd || Math.abs(this._viewEnd.getTime() - e) <= po * 2, n = Date.now();
			this._liveNow = n, t && (this._viewEnd = new Date(n));
		}, po);
	}
	_stopLiveClock() {
		this._liveNowTimer !== void 0 && (clearInterval(this._liveNowTimer), this._liveNowTimer = void 0);
	}
	_browserHistoryEntry(e = window.history.state) {
		let t = typeof e == "object" && e ? e[Wo] : void 0;
		if (typeof t != "object" || !t) return;
		let n = t;
		if (n.instanceId === this._browserHistoryInstanceId && (n.layer === "date-picker" || n.layer === "target-picker" || n.layer === "attribute-picker")) return {
			instanceId: n.instanceId,
			layer: n.layer
		};
	}
	_browserHistoryState(e) {
		return {
			...typeof window.history.state == "object" && window.history.state !== null ? window.history.state : {},
			[Wo]: {
				instanceId: this._browserHistoryInstanceId,
				layer: e
			}
		};
	}
	_pushBrowserHistoryLayer(e) {
		this._syncingBrowserHistory || this._browserHistoryEntry()?.layer !== e && window.history.pushState(this._browserHistoryState(e), "", window.location.href);
	}
	_replaceBrowserHistoryLayer(e) {
		this._syncingBrowserHistory || window.history.replaceState(this._browserHistoryState(e), "", window.location.href);
	}
	_closeBrowserHistoryLayer(e, t) {
		if (!this._syncingBrowserHistory && this._browserHistoryEntry()?.layer === e) {
			window.history.back();
			return;
		}
		t();
	}
	_openBrowserHistoryLayer(e) {
		this._datePickerOpen = e === "date-picker", this._entityPickerOpen = e === "target-picker", this._attributeMenuOpen = e === "attribute-picker", e !== "attribute-picker" && (this._attributeSearch = "");
	}
	_closeBrowserHistoryOverlays() {
		this._datePickerOpen && this._closeDatePickerOverlay(), (this._attributeMenuOpen || this._entityPickerOpen) && this._closePickerOverlay();
	}
	_closePickerOverlay() {
		this._attributeMenuOpen = !1, this._entityPickerOpen = !1, this._attributeSearch = "", this._sourceSettingsSourceId = void 0, this._closeEntityActions();
	}
	_closeDatePickerOverlay() {
		if (!this._datePickerOpen) return;
		this._datePickerOpen = !1;
		let e = this.renderRoot.querySelector("ha-date-range-picker");
		e?.dispatchEvent(new KeyboardEvent("keydown", {
			key: "Escape",
			bubbles: !0
		})), e?.blur();
		let t = this.getRootNode(), n = t instanceof Document || t instanceof ShadowRoot ? t.activeElement : void 0;
		n instanceof HTMLElement && n.blur();
	}
	_effectiveLineMode() {
		return this._runtimeLineMode ?? this.config?.lineMode ?? this.lineMode;
	}
	_effectiveViewRange() {
		let e = this._resolved?.startDate ?? this._effectiveStartDate(), t = this._rangeExtendsFuture() ? this._effectiveEndDate() : this._resolved?.endDate ?? this._effectiveEndDate(), n = this._viewStart && this._viewStart.getTime() >= e.getTime() ? this._viewStart : e, r = this._viewEnd && this._viewEnd.getTime() <= t.getTime() ? this._viewEnd : t;
		if (r.getTime() <= n.getTime()) return {
			start: e,
			end: t
		};
		let i = this._minViewSpanMs();
		if (r.getTime() - n.getTime() >= i) return {
			start: n,
			end: r
		};
		let a = e.getTime(), o = t.getTime(), s = Math.min(Math.max(n.getTime(), a), o - i);
		return {
			start: new Date(s),
			end: new Date(s + i)
		};
	}
	_pickerEntities() {
		return this.hass ? [...this.config?.defaultEntities ?? [], ...this._customEntityIds].filter((e) => typeof e == "string" && e !== "").filter((e, t, n) => n.indexOf(e) === t).map((e) => this.hass?.states[e]).filter((e) => e !== void 0) : [];
	}
	_fetchSources() {
		let e = [], t = /* @__PURE__ */ new Set();
		if (this._resolved && !this._importedDataActive) for (let n of this._activeResolvedSeries()) t.has(n.id) || (t.add(n.id), e.push(ii(n)));
		let n = this._importedDataActive ? this._importedSources : [...this._targetSources(), ...this._selectedSources];
		for (let r of n) for (let n of this._expandedSelectedSources(r)) t.has(n.id) || (t.add(n.id), e.push(n));
		return e;
	}
	_selectedSourcesForDisplay() {
		let e = /* @__PURE__ */ new Set(), t = [], n = this._importedDataActive ? this._importedSources : [
			...this._targetSources(),
			...this._selectedSources,
			...this._pendingAddedSources
		];
		for (let r of n) e.has(r.id) || (e.add(r.id), t.push(r));
		return t;
	}
	_targetEntityIds() {
		return this.hass ? eo(this.hass, this._selectedTargets) : [];
	}
	_targetSources() {
		return this.hass ? to(this.hass, this._selectedTargets) : [];
	}
	_isDefaultSource(e) {
		return this._activeResolvedSeries().some((t) => t.id === e.id && t.forced !== !1);
	}
	_activeResolvedSeries() {
		return this._resolved ? this._resolved.series.filter((e) => !this._removedConfigSourceIds.includes(e.id)) : [];
	}
	_activeResolvedConfig() {
		if (this._resolved) return {
			...this._resolved,
			series: this._activeResolvedSeries()
		};
	}
	_reconcileRemovedConfigSourceIds(e) {
		if (this._removedConfigSourceIds.length === 0) return;
		let t = new Set(e.series.filter((e) => e.forced === !1).map((e) => e.id)), n = this._removedConfigSourceIds.filter((e) => t.has(e));
		n.length !== this._removedConfigSourceIds.length && (this._removedConfigSourceIds = n);
	}
	_resolvedTemperatureUnit() {
		return this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && P(e.unit))?.unit;
	}
	_resolvedSourceValueTypePromotionPending() {
		if (!this.hass || this._importedDataActive) return !1;
		let e = new Set(this._activeResolvedSeries().map((e) => e.id));
		return this._lastFetchSources.some((t) => {
			if (!e.has(t.id) || t.valueType !== "string") return !1;
			let n = this.hass?.states[t.entityId];
			if (!n) return !1;
			let r = t.kind === "entity_attribute" ? Wt(n, t.path ?? []) : Ut(n);
			return r !== void 0 && r.valueType !== "string";
		});
	}
	willUpdate(e) {
		this._data.debugPerformance = this.debugPerformance || this.config?.debugPerformance === !0;
		let t = this._usesRollingRelativeRange(), n = this._effectiveDateRange(), r = n.start.getTime(), i = n.end.getTime(), a = this._rangeExtendsFuture();
		this._syncLiveClock(), e.has("hass") && (a || t) && this._data.updateLivePoints(this.hass, this._lastFetchSources, new Date(r), new Date(i));
		let o = r !== this._prevStartTime || i !== this._prevEndTime, s = this._containerWidth !== this._prevContainerWidth, c = e.has("_rangeStart") || e.has("_rangeEnd") || e.has("startDate") || e.has("endDate") || e.has("config") || e.has("hours"), l = (a || t) && o && !s && !c;
		this._suppressLiveRangeAnimation = l, (o || s) && (l || this._prevClipX.clear(), this._prevStartTime = r, this._prevEndTime = i, this._prevContainerWidth = this._containerWidth), this._data.loading && this._data.series.length === 0 && this._prevClipX.clear();
		let u = /* @__PURE__ */ "_rangeStart._rangeEnd._selectedSources._selectedTargets._removedConfigSourceIds._scalePreferences.hass.config.entities.hours.startDate.endDate.showDatePicker.showEntityPicker.showLegend.showTooltip.showGrid.showScale.autoScaleSplit.width.height.lineMode.lineWidth.backgroundColor.graphTitle.titleFontFamily.titleFontSize.titleColor.language.debugPerformance.attributeUnits._runtimeLineMode".split(".");
		if (u.some((t) => e.has(t))) {
			let r = !u.some((t) => t !== "hass" && e.has(t));
			if ((e.has("config") || e.has("entities")) && (this._importedDataActive = !1, this._importedSeriesMeta.clear(), this._importedSources = []), r) {
				let e = Math.floor(Date.now() / 1e3) * 1e3, n = this._resolvedSourceValueTypePromotionPending();
				if ((a || t) && this._lastFetchKey && (this._lastHassResolveTime = e, !t && !n) || !t && e === this._lastHassResolveTime && this._lastFetchKey && !n) return;
				this._lastHassResolveTime = e;
			}
			let i = Mi({
				config: this.config,
				entities: this.entities,
				hours: this.hours,
				startDate: n.start,
				endDate: n.end,
				showDatePicker: this.showDatePicker,
				showEntityPicker: this.showEntityPicker,
				showLegend: this.showLegend,
				showTooltip: this.showTooltip,
				showGrid: this.showGrid,
				showScale: this.showScale,
				autoScaleSplit: this.autoScaleSplit,
				width: this.width,
				height: this.height,
				lineMode: this._effectiveLineMode(),
				lineWidth: this.lineWidth,
				backgroundColor: this.backgroundColor,
				title: this.graphTitle,
				titleFontFamily: this.titleFontFamily,
				titleFontSize: this.titleFontSize,
				titleColor: this.titleColor,
				language: this.language,
				hass: this.hass,
				attributeUnits: this.attributeUnits
			});
			this._reconcileRemovedConfigSourceIds(i), this._resolved = i, !this._rangeStart && !this._rangeEnd && !t && (this._rangeStart = i.startDate, this._rangeEnd = i.endDate), !this._viewStart && !this._viewEnd && !t && (this._viewStart = i.startDate, this._viewEnd = i.endDate);
			let o = this._fetchSources(), s = ht(o), c = t ? `${s}|rolling|${this._relativeRangeMs()}` : `${s}|${i.startDate.getTime()}|${i.endDate.getTime()}`;
			if (c !== this._lastFetchKey) {
				let e = s === ht(this._lastFetchSources) && this._lastFetchKey !== "";
				if (this._lastFetchSources.length > 0 && !e) {
					let e = new Set(this._lastFetchSources.map((e) => e.id)), t = new Set(o.map((e) => e.id)), n = o.filter((t) => !e.has(t.id)), r = this._lastFetchSources.filter((e) => !t.has(e.id)).map((e) => e.id);
					n.length > 0 && r.length === 0 ? (this._lastFetchKey = c, this._lastFetchSources = o, this._data.addSources(this.hass, n, i.startDate, i.endDate)) : r.length > 0 && n.length === 0 ? (this._lastFetchKey = c, this._lastFetchSources = o, this._data.removeSources(r)) : (this._lastFetchKey = c, this._lastFetchSources = o, this._data.fetch(this.hass, o, i.startDate, i.endDate));
				} else this._lastFetchKey = c, this._lastFetchSources = o, this._data.fetch(this.hass, o, i.startDate, i.endDate);
			}
			i.showDatePicker && !this._datePickerReady && Yi().then(() => {
				this._datePickerReady = Ji();
			}), i.showEntityPicker && !this._entityComponentsReady && ga().then(() => {
				this._entityComponentsReady = _a();
			}), i.showEntityPicker && !this._targetPickerReady && Wi().then((e) => {
				this._targetPickerReady = e && customElements.get("ha-target-picker") !== void 0, this._targetPickerLoadComplete = !0;
			});
		}
	}
	updated(e) {
		this._observeChartSurface(), this._observeSurfaceHeader(), e.has("_attributeMenuOpen") && this._attributeMenuOpen && this._positionEntityMenu(), e.has("_sourceSettingsSourceId") && this._sourceSettingsSourceId && this._positionSourceSettingsPopover(), e.has("_entityActionsEntityId") && this._entityActionsEntityId && (this._positionEntityActionsPopover(), this.renderRoot.querySelector(".entity-actions-item")?.focus()), (e.has("_attributeMenuOpen") || e.has("_entityPickerOpen") || e.has("_datePickerOpen") || e.has("_sourceSettingsSourceId") || e.has("_entityActionsEntityId")) && this._emitPickerOverlayState(), this._emitGraphVisibilityState(), this._animateClipPaths(), this._data.clearChangedSourceIds(), this._wasLoading = this._data.loading, this._suppressLiveRangeAnimation = !1;
	}
	_emitPickerOverlayState() {
		let e = this._datePickerOpen || this._attributeMenuOpen || this._entityPickerOpen || this._sourceSettingsSourceId !== void 0 || this._entityActionsEntityId !== void 0;
		e !== this._lastPickerOverlayOpen && (this._lastPickerOverlayOpen = e, this.dispatchEvent(new CustomEvent("picker-overlay-changed", {
			detail: { open: e },
			bubbles: !0,
			composed: !0
		})));
	}
	_onDateRangeChanged(e, t) {
		this._rangeStart = e, this._rangeEnd = t, this._viewStart = e, this._viewEnd = t, this.dispatchEvent(new CustomEvent("range-changed", {
			detail: {
				startDate: e,
				endDate: t
			},
			bubbles: !0,
			composed: !0
		})), this.requestUpdate();
	}
	_onDatePickerOpened() {
		this._datePickerOpen || (this._datePickerOpen = !0, this._pushBrowserHistoryLayer("date-picker"));
	}
	_onDatePickerClosed() {
		this._closeBrowserHistoryLayer("date-picker", () => this._closeDatePickerOverlay());
	}
	_pickScaleGroup(e, t, n) {
		if (e.valueType !== "number") return `series:${e.id}`;
		let r = Xo(e);
		if (r) {
			let e = Yo(r);
			if (e !== void 0) {
				let r = (n ?? this._scaleGraphKeys(t))[e - 1];
				if (r) return r;
			}
			return `group:${r}`;
		}
		let i = e.entityId.startsWith("climate.") && e.path?.length === 1 && Ho.has(e.path[0]);
		if (e.unit) {
			let n = t.find((t) => t.valueType === "number" && (t.unit === e.unit || Mn(t.unit, e.unit)));
			if (n) return n.scaleGroupKey;
			let r = this._resolved?.series.find((t) => t.valueType === "number" && (t.unit === e.unit || Mn(t.unit, e.unit)));
			if (r) return r.scaleGroupKey;
			let i = this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature");
			if (i && P(e.unit)) return i.scaleGroupKey;
			let a = t.find((e) => e.scaleGroupKey === "group:temperature");
			if (a && P(e.unit)) return a.scaleGroupKey;
		}
		if (i) {
			let e = t.find((e) => e.valueType === "number" && e.unit !== void 0 && P(e.unit));
			return e ? e.scaleGroupKey : "group:temperature";
		}
		return e.unit ? `unit:${e.unit}` : `series:${e.id}`;
	}
	_scaleGraphKeys(e) {
		return [...new Set(e.filter((e) => e.valueType === "number" || e.valueType === "boolean").map((e) => e.valueType === "boolean" ? "group:boolean" : e.scaleGroupKey))];
	}
	_usesScaleGraphAlias(e) {
		return e.valueType === "number" && Yo(Xo(e)) !== void 0;
	}
	_renderSeriesFromSource(e, t, n, r, i = e.unit) {
		let a = e.entityId.startsWith("climate.") && e.path?.length === 1 ? e.path[0] : void 0, o = this._importedSeriesMeta.get(e.id);
		return {
			id: e.id,
			entity: e.entityId,
			label: e.label,
			color: o?.color ?? (a ? bn[a] : void 0) ?? wn(r),
			unit: i,
			scaleGroupKey: n,
			scaleMode: "auto",
			scalePreference: this._effectiveScalePreference(e.id, e.scalePreference ?? o?.scalePreference),
			lineMode: this._runtimeLineMode ?? o?.lineMode ?? this._defaultLineMode(),
			lineWidth: this._defaultLineWidth(),
			showPoints: o?.showPoints ?? !1,
			pointRadius: o?.pointRadius ?? 2.5,
			valueType: e.valueType,
			points: t?.points ?? []
		};
	}
	_unitForScaleGroup(e, t, n) {
		if (!e.unit || !P(e.unit)) return e.unit;
		let r = n.find((n) => n.scaleGroupKey === t && Mn(n.unit, e.unit));
		return r?.unit ? r.unit : this._activeResolvedSeries().find((n) => n.scaleGroupKey === t && Mn(n.unit, e.unit))?.unit ?? e.unit;
	}
	_defaultLineMode() {
		let e = this._effectiveLineMode();
		return e === "line" || e === "column" ? e : "stair";
	}
	_defaultLineWidth() {
		let e = this.config?.lineWidth ?? this.lineWidth;
		return typeof e == "number" ? Number.isFinite(e) && e >= 0 ? String(e) : "2.5" : typeof e == "string" && e.trim() !== "" ? e.trim() : "2.5";
	}
	_effectiveScalePreference(e, t) {
		return this._scalePreferences[e] ?? t ?? "auto";
	}
	_showImportButton() {
		return this.showImportButton || this.config?.showImportButton === !0;
	}
	_showExportButton() {
		return this.config?.showExportButton !== !1 && this.showExportButton;
	}
	_showTimeRangeSelector() {
		return this.config?.showTimeRangeSelector !== !1 && this.showTimeRangeSelector;
	}
	_allSeriesHaveExplicitLineMode() {
		if (this._selectedSourcesForDisplay().length > 0) return !1;
		if (this.config?.lineMode != null) return !0;
		let e = this.config?.series;
		return e && e.length > 0 ? e.every((e) => e.lineMode != null) : !1;
	}
	_showLineModeButtons() {
		return !this._allSeriesHaveExplicitLineMode() && this.config?.showLineModeButtons !== !1 && this.showLineModeButtons;
	}
	_hasForcedConfigSeries() {
		return this._activeResolvedSeries().some((e) => e.forced !== !1);
	}
	_buildRenderSeries() {
		if (!this._resolved && !this._importedDataActive) return [];
		let e = this._importedDataActive ? [] : this._activeResolvedSeries().flatMap((e) => {
			let t = this._data.series.find((t) => t.source.id === e.id);
			return [{
				id: e.id,
				entity: e.entity,
				label: e.label,
				color: e.color,
				unit: e.unit,
				scaleGroupKey: e.scaleGroupKey,
				scaleMode: e.scaleMode,
				scaleMin: e.scaleMin,
				scaleMax: e.scaleMax,
				scalePreference: this._effectiveScalePreference(e.id, e.scalePreference),
				lineMode: this._runtimeLineMode ?? e.lineMode,
				lineWidth: e.lineWidth,
				showPoints: e.showPoints,
				pointRadius: e.pointRadius,
				valueType: e.valueType,
				points: t?.points ?? []
			}];
		}), t = [], n = new Set(e.map((e) => e.id));
		for (let e of this._selectedSourcesForDisplay()) for (let r of this._expandedSelectedSources(e)) {
			if (n.has(r.id)) continue;
			let e = this._data.series.find((e) => e.source.id === r.id);
			n.add(r.id), t.push({
				source: r,
				fetched: e
			});
		}
		let r = [...e], i = /* @__PURE__ */ new Map();
		for (let { source: e, fetched: n } of t) {
			if (this._usesScaleGraphAlias(e)) continue;
			let t = this._pickScaleGroup(e, r), a = this._unitForScaleGroup(e, t, r);
			i.set(e.id, {
				scaleGroupKey: t,
				unit: a
			}), r.push(this._renderSeriesFromSource(e, n, t, r.length, a));
		}
		let a = this._scaleGraphKeys(r);
		for (let { source: n, fetched: o } of t) {
			let t = i.get(n.id), s = t?.scaleGroupKey ?? this._pickScaleGroup(n, e, a);
			e.push(this._renderSeriesFromSource(n, o, s, e.length, t?.unit ?? this._unitForScaleGroup(n, s, r)));
		}
		return $o(e);
	}
	_chartSourceKey() {
		return [...(this._importedDataActive ? [] : this._activeResolvedSeries()).map((e) => [
			e.id,
			e.label,
			e.color,
			e.unit ?? "",
			e.scaleGroupKey,
			e.scaleMode,
			e.scaleMin ?? "",
			e.scaleMax ?? "",
			this._effectiveScalePreference(e.id, e.scalePreference),
			e.lineMode,
			e.lineWidth,
			e.showPoints,
			e.pointRadius,
			e.valueType
		].join("~")) ?? [], ...this._selectedSourcesForDisplay().flatMap((e) => this._expandedSelectedSources(e)).map((e) => [
			e.id,
			e.label,
			e.kind,
			e.unit ?? "",
			Xo(e) ?? "",
			this._effectiveScalePreference(e.id, e.scalePreference),
			e.valueType,
			this._defaultLineMode(),
			this._defaultLineWidth(),
			!1,
			si
		].join("~"))].join("|");
	}
	_chartData() {
		let e = this._hiddenSeriesIds.join("|"), t = this._chartSourceKey(), n = this._chartRenderCache, r = this._effectiveViewRange(), i = r.start.getTime(), a = r.end.getTime(), o = this._containerWidth, s = !this._data.loading, c = this._resolved?.autoScaleSplit ?? !0;
		if (n && n.seriesRef === this._data.series && n.sourceKey === t && n.hiddenKey === e && n.startTime === i && n.endTime === a && n.extendStairToEnd === s && n.autoScaleSplit === c && n.containerWidth === o) return n.data;
		let l = this._maxXTicks(), u = this._buildRenderSeries(), d = u.filter((e) => !this._hiddenSeriesIds.includes(e.id)), f = {
			start: i,
			end: Math.max(a, i + 1)
		}, p = this._data.debugPerformance, m = p ? M() : 0, h = Hr(u, d, f, this._resolved?.disableClimateOverlay ?? !1, l, s, c), g = p ? M() - m : 0;
		return p && N(p, "chart.build_data", {
			allSeriesCount: u.length,
			visibleSeriesCount: d.length,
			pointCount: d.reduce((e, t) => e + t.points.length, 0),
			groupCount: h.numericScales.length,
			segmentCount: h.segments.length,
			lineCount: h.numericLines.length,
			buildDurationMs: Math.round(g)
		}), this._chartRenderCache = {
			seriesRef: this._data.series,
			sourceKey: t,
			hiddenKey: e,
			startTime: i,
			endTime: a,
			extendStairToEnd: s,
			autoScaleSplit: c,
			containerWidth: o,
			data: h
		}, h;
	}
	_graphGroups(e) {
		let t = this._maxXTicks(), n = this._graphHeightFor(e), r = this._graphGroupRenderCache;
		if (r && r.dataRef === e && r.maxXTicks === t && r.graphHeight === n) return r.groups;
		let i = Qr(e, t, n);
		return this._graphGroupRenderCache = {
			dataRef: e,
			maxXTicks: t,
			graphHeight: n,
			groups: i
		}, i;
	}
	_lineTargetX(e) {
		let t = e.points.split(" "), n = t[t.length - 1], r = n ? parseFloat(n.split(",")[0]) : 0;
		return Number.isFinite(r) ? r : 0;
	}
	_lineDomKey(e, t) {
		return `${t}:${e}`;
	}
	_safeLineDomId(e) {
		return e.replace(/[^a-zA-Z0-9]/g, "_");
	}
	_shouldAnimateLine(e, t, n = this._lineTargetX(e)) {
		let r = this._prevClipX.get(t) ?? 0;
		return this._data.loading && !this._suppressLineAnimation && !this._suppressLiveRangeAnimation && this._data.changedSourceIds.has(e.id) && n > r;
	}
	_graphHeightFor(e) {
		if (!this._chartSurfaceConstrained || this._chartSurfaceHeight <= 0) return 180;
		let t = this._graphCountFor(e), n = this._measuredGraphLayout?.graphCount === t ? this._measuredGraphLayout.overheadHeight : void 0, r = this._estimatedGraphOverhead(e, t), i = n ?? r, a = this._chartSurfaceHeight - i, o = this._containerWidth > 0 ? this._containerWidth * 640 / 720 : 640, s = Math.max(180, Math.min(Math.floor(o * Fo), Math.floor(this._chartSurfaceHeight / t * Io), Lo)), c = Math.floor(Math.max(0, a) / t);
		return Math.max(Po, Math.min(c, s));
	}
	_graphCountFor(e) {
		return Math.max(new Set(e.numericScales.map((e) => e.graphKey)).size, +!!e.allSeries.some((e) => e.valueType !== "number" && e.valueType !== "boolean"), 1);
	}
	_estimatedGraphOverhead(e, t) {
		let n = e.allSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").length, r = this._resolved?.showLegend ?? !0 ? t * 30 : 0;
		return t * 62 + r + (n > 0 ? 10 + n * 14 : 0);
	}
	_graphAxisGutters(e) {
		if (!(this._resolved?.showScale ?? !0)) return {
			left: "0px",
			right: "0px"
		};
		let t = 0, n = 0;
		for (let r of e) {
			let e = this._axisSeriesDots(r, "left"), i = this._axisSeriesDots(r, "right"), a = e.length || +!!this._draggingAxisSeriesId, o = i.length || +!!this._draggingAxisSeriesId;
			t = Math.max(t, qo(r.yLabels, a)), n = Math.max(n, qo(r.rightYLabels, o));
		}
		return {
			left: `${t}px`,
			right: `${n}px`
		};
	}
	_renderGraphGroup(e, t, n) {
		let r = this._resolved?.showLegend ?? !0, i = this._resolved?.showGrid ?? !0, a = this._resolved?.showScale ?? !0, o = e.series.map((e) => e.id).join("|"), s = a ? this._axisSeriesDots(e, "left") : [], c = a ? this._axisSeriesDots(e, "right") : [], l = 28 + e.graphHeight, u = l + 3, d = l + 16 + 6;
		return E`
      <div class="graph-section">
        <div class="graph-row" style=${`--axis-label-gap:${Uo}px;--axis-left-gutter:${n.left};--axis-right-gutter:${n.right};`}>
          <div
            class="axis-labels axis-labels--left"
            style="height:${e.canvasHeight}px"
            @dragover=${(e) => this._onAxisDragOver("left", e)}
            @dragleave=${(e) => this._onAxisDragLeave("left", e)}
            @drop=${(t) => this._onAxisDrop(e, "left", t)}
          >
            ${a ? this._renderAxisColorDots(e, s, "left") : O}
            ${a ? e.yLabels.map((e) => E`<span class="y-axis-label y-axis-label--left" style="top:${e.y.toFixed(1)}px;">${e.value}</span>`) : O}
          </div>
          <div
            class="graph-canvas"
            data-series-ids=${o}
            style="height:${e.canvasHeight}px"
            @wheel=${(e) => this._onGraphWheel(e)}
            @pointerdown=${(e) => this._onGraphPointerDown(e)}
            @pointermove=${(e) => this._onGraphPointerMove(e)}
            @pointerup=${(e) => this._onGraphPointerEnd(e)}
            @pointercancel=${(e) => this._onGraphPointerEnd(e)}
          >
            <svg
              viewBox="${40} 0 ${640} ${e.svgHeight}"
              height="${e.svgHeight}"
              preserveAspectRatio="none"
            >
              ${i ? e.xLabels.map((e) => D`
                      <line class="grid-line grid-line--vertical" x1=${e.x.toFixed(1)} y1=${18} x2=${e.x.toFixed(1)} y2=${l}></line>
                    `) : O}
              ${i ? e.yLabels.map((e) => D`
                      <line class="grid-line grid-line--horizontal" x1=${40} y1=${e.y.toFixed(1)} x2=${680} y2=${e.y.toFixed(1)}></line>
                    `) : O}
              <defs>
                ${e.lines.map((n) => {
			let r = this._lineDomKey(n.id, t), i = this._safeLineDomId(r), a = `clip-${i}`, o = `rect-${i}`, s = this._lineTargetX(n);
			return D`
                    <clipPath id=${a}>
                      <rect id=${o} x="0" y="0" width=${this._shouldAnimateLine(n, r, s) ? this._prevClipX.get(r) ?? 0 : s} height=${e.svgHeight}></rect>
                    </clipPath>
                  `;
		})}
              </defs>
              ${e.heatingAreas.map((e) => D`<polygon class="climate-heating-area" points=${e.points}></polygon>`)}
              ${e.columns.map((e) => D`<rect class="column" x=${e.x.toFixed(1)} y=${e.y.toFixed(1)} width=${e.width.toFixed(1)} height=${e.height.toFixed(1)} fill=${e.fill}></rect>`)}
              ${e.lines.map((e) => {
			let n = this._lineDomKey(e.id, t), r = `clip-${this._safeLineDomId(n)}`, i = this._lineTargetX(e), a = this._shouldAnimateLine(e, n, i);
			return D`<polyline class="line" style=${`--better-history-line-width:${e.lineWidth};`} clip-path="url(#${r})" data-line-id=${e.id} data-line-dom-key=${n} data-animate-clip=${a ? "true" : O} data-target-x=${i} points=${e.points} stroke=${e.color}></polyline>`;
		})}
              ${e.pointMarkers.map((e) => {
			let n = this._lineDomKey(e.id, t), r = `clip-${this._safeLineDomId(n)}`;
			return D`
                  <path
                    class="point-markers"
                    style=${`--better-history-point-diameter:${e.radius * 2};`}
                    clip-path="url(#${r})"
                    d=${e.path}
                    stroke=${e.color}
                  ></path>
                `;
		})}
              ${e.segments.map((e) => D`<rect class="segment" x=${e.x} y=${e.y} width=${e.width} height="9" fill=${e.fill}></rect>`)}
              ${e.series.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").map((e, t) => D`<rect class="segment-border" x=${40} y=${d + t * 14} width=${640} height="9" fill="none" stroke=${e.color}></rect>`)}
              ${a ? D`<line class="axis" x1=${40} y1=${18} x2=${40} y2=${l}></line>` : O}
              ${a && e.rightYLabels.length > 0 ? D`<line class="axis" x1=${680} y1=${18} x2=${680} y2=${l}></line>` : O}
              ${a ? D`<line class="axis" x1=${40} y1=${l} x2=${680} y2=${l}></line>` : O}
              ${a && e.scale ? e.yLabels.map((e) => D`
                      <line class="axis tick" x1=${40} y1=${e.y.toFixed(1)} x2=${44} y2=${e.y.toFixed(1)}></line>
                    `) : O}
              ${a ? e.rightYLabels.map((e) => D`
                      <line class="axis tick" x1=${676} y1=${e.y.toFixed(1)} x2=${680} y2=${e.y.toFixed(1)}></line>
                    `) : O}
            </svg>
            ${a ? e.xLabels.map((e) => {
			let t = ((e.x - 40) / 640 * 100).toFixed(2);
			return E`<span class="x-axis-label ${e.bold ? "x-axis-label--bold" : ""}" style="left:${t}%;top:${u}px;">${e.label}</span>`;
		}) : O}
          </div>
          <div
            class="axis-labels axis-labels--right"
            style="height:${e.canvasHeight}px"
            @dragover=${(e) => this._onAxisDragOver("right", e)}
            @dragleave=${(e) => this._onAxisDragLeave("right", e)}
            @drop=${(t) => this._onAxisDrop(e, "right", t)}
          >
            ${a ? this._renderAxisColorDots(e, c, "right") : O}
            ${a ? e.rightYLabels.map((e) => E`<span class="y-axis-label y-axis-label--right" style="top:${e.y.toFixed(1)}px;">${e.value}</span>`) : O}
          </div>
        </div>
        ${r && e.allSeries.length > 0 ? E`
            <div class="graph-legend">
              ${e.allSeries.map((e) => E`
                  <button class="legend-item" ?hidden-series=${this._hiddenSeriesIds.includes(e.id)} @click=${() => this._toggleSeries(e.id)}>
                    <span class="swatch" style=${e.valueType === "string" ? `background:color-mix(in srgb,${e.color} 30%,transparent);border:1px solid ${e.color};` : `background:${e.color};`}></span>
                    <span class="legend-label">${e.label}</span>
                  </button>
                `)}
            </div>
          ` : O}
      </div>
    `;
	}
	_axisSeriesDots(e, t) {
		let n = new Set(e.scales.filter((e) => e.axis === t).flatMap((e) => [...e.ids]));
		return e.series.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && n.has(e.id));
	}
	_renderAxisColorDots(e, t, n) {
		let r = this._draggingAxisSeriesId;
		if (t.length === 0 && !r) return O;
		let i = this._axisDropTarget === n && r ? this._canDropAxisSeries(e, r, n) ? "valid" : "invalid" : void 0, a = i === "valid" && r ? e.series.find((e) => e.id === r)?.color : void 0;
		return E`
      <span
        class="axis-color-dots axis-color-dots--${n}"
        style="top:${1}px;"
        data-drop-state=${i ?? O}
        @dragover=${(e) => this._onAxisDragOver(n, e)}
        @dragleave=${() => this._onAxisDragLeave(n)}
        @drop=${(t) => this._onAxisDrop(e, n, t)}
        @touchstart=${(t) => this._onAxisDotsTouchStart(e, n, t)}
      >
        ${a && n === "left" ? E`<span class="axis-drop-preview"><span class="axis-color-dot" style="background:${a};"></span></span>` : O}
        ${t.map((t) => {
			let r = this._canDragAxisSeries(e, t.id, n);
			return E`
            <span
              class="axis-color-dot-hit axis-color-dot-hit--${n}"
              style="color:${t.color};"
              data-series-id=${t.id}
              draggable=${r}
              ?dragging=${this._draggingAxisSeriesId === t.id}
              title=${t.label}
              @dragstart=${(r) => this._onAxisDotDragStart(e, t.id, n, r)}
              @dragend=${() => this._onAxisDotDragEnd()}
              @contextmenu=${(e) => e.preventDefault()}
            >
              <span class="axis-color-dot" style="background:${t.color};"></span>
            </span>
          `;
		})}
        ${a && n === "right" ? E`<span class="axis-drop-preview"><span class="axis-color-dot" style="background:${a};"></span></span>` : O}
      </span>
    `;
	}
	_axisDraggableSeries(e) {
		let t = e.series.filter((e) => e.valueType === "number" || e.valueType === "boolean"), n = new Set(t.map((e) => Jo(e.unit)));
		return t.length >= 2 && n.size === 1 ? t : [];
	}
	_canDragAxisSeries(e, t, n) {
		return this._canDropAxisSeries(e, t, n === "left" ? "right" : "left");
	}
	_canDropAxisSeries(e, t, n) {
		let r = this._axisDraggableSeries(e).find((e) => e.id === t);
		if (!r) return !1;
		let i = e.scales.find((e) => e.axis === n);
		return i ? e.series.filter((e) => i.ids.has(e.id)).every((e) => Jo(e.unit) === Jo(r.unit)) : n === "right";
	}
	_onAxisDotDragStart(e, t, n, r) {
		if (!this._canDragAxisSeries(e, t, n)) {
			r.preventDefault();
			return;
		}
		this._draggingAxisSeriesId = t, r.dataTransfer?.setData("text/plain", t), r.dataTransfer && (r.dataTransfer.effectAllowed = "move");
	}
	_clearAxisDrag() {
		this._draggingAxisSeriesId = void 0, this._axisDropTarget = void 0;
	}
	_onAxisDotDragEnd() {
		this._clearAxisDrag();
	}
	_onAxisDragOver(e, t) {
		(this._draggingAxisSeriesId ?? t.dataTransfer?.getData("text/plain")) && (this._axisDropTarget = e, t.preventDefault(), t.dataTransfer && (t.dataTransfer.dropEffect = "move"));
	}
	_onAxisDragLeave(e, t) {
		let n = t?.currentTarget, r = t?.relatedTarget;
		n instanceof Node && r instanceof Node && n.contains(r) || this._axisDropTarget === e && (this._axisDropTarget = void 0);
	}
	_onAxisDrop(e, t, n) {
		let r = this._draggingAxisSeriesId ?? n?.dataTransfer?.getData("text/plain");
		r && (n?.preventDefault(), this._axisDropTarget = void 0, this._canDropAxisSeries(e, r, t) && (this._scalePreferences = {
			...this._scalePreferences,
			[r]: t === "right" ? "secondary" : "primary"
		}));
	}
	_onAxisDotsTouchStart(e, t, n) {
		let r = n.touches?.[0], i = n.currentTarget;
		if (!r || !i) return;
		let a = this._nearestAxisDot(i, r.clientX, r.clientY);
		a && this._onAxisDotTouchStart(e, a, t, n);
	}
	_nearestAxisDot(e, t, n) {
		let r;
		return e.querySelectorAll(".axis-color-dot-hit[data-series-id]").forEach((e) => {
			let i = e.dataset.seriesId;
			if (!i) return;
			let a = e.getBoundingClientRect(), o = a.left + a.width / 2, s = a.top + a.height / 2, c = Math.hypot(t - o, n - s);
			(!r || c < r.distance) && (r = {
				id: i,
				distance: c
			});
		}), r?.id;
	}
	_onAxisDotTouchStart(e, t, n, r) {
		if (!this._canDragAxisSeries(e, t, n)) return;
		r.preventDefault();
		let i = e.series.find((e) => e.id === t);
		if (!i) return;
		let a = r.currentTarget?.closest(".graph-row");
		this._draggingAxisSeriesId = t;
		let o = this.renderRoot?.querySelector(".axis-touch-drag-preview");
		if (o) {
			o.style.display = "block", o.style.background = i.color;
			let e = r.touches?.[0];
			e && this._positionAxisTouchPreview(o, e);
		}
		let s = (e) => {
			e.preventDefault();
			let t = e.touches[0];
			t && (this._axisDropTarget = a ? this._touchDropTarget(a, t.clientX, t.clientY) : void 0, o && this._positionAxisTouchPreview(o, t));
		}, c = () => {
			document.removeEventListener("touchmove", s), document.removeEventListener("touchend", c), document.removeEventListener("touchcancel", c), o && (o.style.display = "none", o.style.background = "");
			let t = this._axisDropTarget;
			t && this._onAxisDrop(e, t), this._clearAxisDrag();
		};
		document.addEventListener("touchmove", s, { passive: !1 }), document.addEventListener("touchend", c), document.addEventListener("touchcancel", c);
	}
	_positionAxisTouchPreview(e, t) {
		e.style.left = `${t.clientX}px`, e.style.top = `${t.clientY - zo}px`;
	}
	_touchDropTarget(e, t, n) {
		let r = e.querySelector(".axis-labels--left"), i = e.querySelector(".axis-labels--right");
		if (r && this._isTouchInsideAxisDropZone(r, t, n)) return "left";
		if (i && this._isTouchInsideAxisDropZone(i, t, n)) return "right";
	}
	_isTouchInsideAxisDropZone(e, t, n) {
		let r = e.getBoundingClientRect();
		return t >= r.left - Bo && t <= r.right + Bo && n >= r.top && n <= r.bottom;
	}
	_animateClipPaths() {
		let e = this.renderRoot;
		e && e.querySelectorAll("polyline[data-line-id]").forEach((t) => {
			let n = t.getAttribute("data-line-id"), r = t.getAttribute("data-line-dom-key") ?? n, i = Number(t.getAttribute("data-target-x"));
			if (!n || !r || !Number.isFinite(i)) return;
			let a = this._prevClipX.get(r) ?? 0, o = this._safeLineDomId(r), s = e.querySelector(`#rect-${o}`);
			if (s instanceof SVGRectElement) {
				if (t.getAttribute("data-animate-clip") !== "true") {
					s.style.removeProperty("transition"), s.setAttribute("width", i.toString()), this._prevClipX.set(r, i);
					return;
				}
				s.style.setProperty("transition", "none"), s.setAttribute("width", a.toString()), s.getBoundingClientRect(), s.style.setProperty("transition", "width 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)"), s.setAttribute("width", i.toString()), this._prevClipX.set(r, i);
			}
			t.removeAttribute("data-animate-clip");
		});
	}
	_renderChartBody() {
		if (this._data.error) {
			this._queueGraphVisible(!1);
			let e = /timed?\s*out/i.test(this._data.error);
			return E`<div class="error">${L(this.hass, e ? "error_timeout" : "error")}</div>`;
		}
		if (!this._resolved || this._resolved.series.length === 0 && this._selectedSourcesForDisplay().length === 0) return this._queueGraphVisible(!1), O;
		let e = this._chartData(), t = e.visibleSeries.some((e) => e.points.length > 0), n = this._resolved.showTooltip, r = this._graphGroups(e), i = this._graphAxisGutters(r), a = r.length > 0 && (t || this._data.loading), o = this._isViewRangeZoomed();
		this._queueGraphVisible(a), this._suppressLineAnimation = this._wasLoading && !this._data.loading;
		let s = r.reduce((e, t) => e + t.canvasHeight, 0);
		if (t && n) {
			let t = r.flatMap((e) => e.allSeries.map((e) => ({
				id: e.id,
				label: e.label,
				color: e.color
			})));
			this._tooltip.sync(t, this._data.series, this._hiddenSeriesIds, s, e.timeBounds);
		}
		return E`
      <div class="chart-surface">
        ${a ? E`
              <div class="chart-graphs"
                ?zoomed=${o}
                @pointermove=${n ? (e) => this._tooltip.handlePointerMove(e) : O}
                @pointerleave=${n ? () => this._tooltip.handlePointerLeave() : O}
              >
                ${r.map((e, t) => this._renderGraphGroup(e, t, i))}
                ${n ? this._tooltip.renderTooltip() : O}
              </div>` : this._data.loading ? O : E`<div class="empty">${L(this.hass, "empty")}</div>`}
      </div>
    `;
	}
	_renderEntityPickerUI() {
		return !this._resolved?.showEntityPicker || !this._entityComponentsReady || !this._targetPickerLoadComplete ? O : va({
			hass: this.hass,
			menuOpen: this._attributeMenuOpen,
			entityPickerOpen: this._entityPickerOpen,
			selectedEntityId: this._selectedEntityId,
			path: this._path,
			selectedSources: this._selectedSources,
			targetSelection: this._selectedTargets,
			targetPickerReady: this._targetPickerReady,
			disableTargetPickerWhileLoading: !0,
			targetEntityIds: this._targetEntityIds(),
			explicitTargetEntityIds: z(this._selectedTargets),
			draggingSourceId: this._draggingSourceId,
			resolved: this._activeResolvedConfig(),
			loading: this._data.loading,
			attributeSearch: this._attributeSearch,
			getItems: this._getEntityPickerItems,
			getAdditionalItems: this._getAdditionalEntityPickerItems,
			onEntityPickerOpened: () => this._onEntityPickerOpened(),
			onEntityPickerClosed: () => this._onEntityPickerClosed(),
			onEntitySelected: (e) => this._onEntitySelected(e),
			onTargetSelectionChanged: (e) => this._onTargetSelectionChanged(e),
			onEntityActionsOpen: (e, t, n) => this._openEntityActions(e, t, n),
			onEntityStateAdded: (e) => this._setExplicitTargetEntity(e, !0, !1),
			onEntityStateRemoved: (e) => this._setExplicitTargetEntity(e, !1, !1),
			onAttributeSearchChanged: (e) => {
				this._attributeSearch = e;
			},
			onSourceAdded: (e) => this._addSource(e),
			onSourceRemoved: (e) => this._removeSource(e),
			onSourceDragStart: (e, t) => this._onSourceDragStart(e, t),
			onSourceDragOver: (e, t) => this._onSourceDragOver(e, t),
			onSourceDragEnd: () => this._onSourceDragEnd(),
			onSourceDrop: (e, t) => this._onSourceDrop(e, t),
			sourceSettingsSourceId: this._sourceSettingsSourceId,
			sourceSettingsUnit: this._sourceSettingsSource()?.unit,
			sourceSettingsGroup: this._sourceSettingsSource() ? Xo(this._sourceSettingsSource()) : void 0,
			entityActionsEntityId: this._entityActionsEntityId,
			onEntityActionsClose: () => this._closeEntityActions(),
			onEntityAttributesSelect: () => this._selectAttributesFromEntityActions(),
			onSourceSettingsOpen: (e) => this._openSourceSettings(e),
			onSourceSettingsClose: () => {
				this._sourceSettingsSourceId = void 0;
			},
			onSourceSettingsUnitChanged: (e) => {
				let t = e.trim();
				this._updateSourceSettings({ unit: t || void 0 });
			},
			onSourceSettingsGroupChanged: (e) => {
				let t = e.trim();
				this._updateSourceSettings({
					group: t || void 0,
					scaleGroup: void 0
				});
			},
			onBreadcrumbClick: (e) => {
				this._path = e;
			},
			onCloseMenu: () => this._closeAttributeMenu()
		});
	}
	_rangePercent(e, t) {
		let n = this._resolved?.startDate.getTime() ?? this._effectiveStartDate().getTime(), r = this._rangeExtendsFuture() ? this._effectiveEndDate().getTime() : this._resolved?.endDate.getTime() ?? this._effectiveEndDate().getTime(), i = Math.max(r - n, 1), a = e?.getTime() ?? t.getTime();
		return Math.round((a - n) / i * 1e3);
	}
	_loadedRangeMs() {
		let e = this._resolved?.startDate.getTime() ?? this._effectiveStartDate().getTime(), t = this._rangeExtendsFuture() ? this._effectiveEndDate().getTime() : this._resolved?.endDate.getTime() ?? this._effectiveEndDate().getTime(), n = Math.max(t, e + 1);
		return {
			start: e,
			end: n,
			span: n - e
		};
	}
	_isViewRangeZoomed() {
		let e = this._loadedRangeMs(), t = this._effectiveViewRange();
		return t.end.getTime() - t.start.getTime() < e.span - 1;
	}
	_zoomGraphViewAt(e, t, n, r, i, a = .25, o = 4) {
		let s = this._effectiveViewRange(), c = r ?? s.start.getTime(), l = i ?? s.end.getTime(), u = Math.max(1, l - c), d = Math.max(1, u * Math.min(o, Math.max(a, t))), f = Math.max(0, Math.min(1, e)), p = c + f * u - f * d;
		this._setViewRangeMs(p, p + d, n);
	}
	_panGraphView(e, t, n, r) {
		if (t <= 0) return;
		let i = Math.max(1, r - n), a = n - e / t * i;
		this._setViewRangeMs(a, a + i, t);
	}
	_wheelDeltaPx(e) {
		return e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
	}
	_isTrackpadPinchWheel(e) {
		return e.deltaMode === 0 && Math.abs(e.deltaY) < wo;
	}
	_onGraphWheel(e) {
		if (!(e.ctrlKey || e.metaKey)) return;
		let t = e.currentTarget;
		if (!(t instanceof HTMLElement)) return;
		let n = t.getBoundingClientRect();
		if (n.width <= 0) return;
		e.preventDefault(), e.stopPropagation();
		let r = (e.clientX - n.left) / n.width, i = this._isTrackpadPinchWheel(e), a = i ? Co : So, o = Math.exp(this._wheelDeltaPx(e) * a);
		this._zoomGraphViewAt(r, o, n.width, void 0, void 0, i ? To : void 0, i ? Eo : void 0);
	}
	_onGraphPointerDown(e) {
		let t = e.currentTarget;
		if (t instanceof HTMLElement) {
			if (e.pointerType === "mouse") {
				if (e.button !== 0 || !this._isViewRangeZoomed()) return;
				let n = t.getBoundingClientRect();
				if (n.width <= 0) return;
				let r = this._effectiveViewRange();
				this._graphMouseDrag = {
					pointerId: e.pointerId,
					startX: e.clientX,
					startY: e.clientY,
					startViewStart: r.start.getTime(),
					startViewEnd: r.end.getTime(),
					width: n.width,
					active: !1,
					target: t
				}, t.setPointerCapture(e.pointerId);
				return;
			}
			if (e.pointerType === "touch" && (this._graphTouchPointers.set(e.pointerId, {
				x: e.clientX,
				y: e.clientY
			}), this._graphTouchPointers.size === 2)) {
				for (let e of this._graphTouchPointers.keys()) t.setPointerCapture(e);
				this._startGraphTouchGesture(t);
			}
		}
	}
	_onGraphPointerMove(e) {
		if (e.pointerType === "mouse" && this._graphMouseDrag?.pointerId === e.pointerId) {
			this._moveGraphMouseDrag(e);
			return;
		}
		e.pointerType !== "touch" || !this._graphTouchPointers.has(e.pointerId) || (this._graphTouchPointers.set(e.pointerId, {
			x: e.clientX,
			y: e.clientY
		}), this._moveGraphTouchGesture(e));
	}
	_onGraphPointerEnd(e) {
		this._graphMouseDrag?.pointerId === e.pointerId && this._endGraphMouseDrag(e.pointerId), e.pointerType === "touch" && (this._graphTouchPointers.delete(e.pointerId), this._graphTouchPointers.size < 2 && this._endGraphTouchGesture());
	}
	_moveGraphMouseDrag(e) {
		let t = this._graphMouseDrag;
		if (!t) return;
		let n = e.clientX - t.startX, r = e.clientY - t.startY;
		if (!t.active) {
			if (Math.max(Math.abs(n), Math.abs(r)) < Do) return;
			if (Math.abs(r) > Math.abs(n)) {
				this._endGraphMouseDrag(e.pointerId);
				return;
			}
			t.active = !0, t.target.toggleAttribute("graph-dragging", !0), this._tooltip.handlePointerLeave();
		}
		e.preventDefault(), e.stopPropagation(), this._panGraphView(n, t.width, t.startViewStart, t.startViewEnd);
	}
	_endGraphMouseDrag(e) {
		let t = this._graphMouseDrag;
		t && (t.target.toggleAttribute("graph-dragging", !1), t.target.hasPointerCapture(e) && t.target.releasePointerCapture(e), this._graphMouseDrag = void 0);
	}
	_startGraphTouchGesture(e) {
		let t = this._graphTouchPair();
		if (!t) return;
		let n = e.getBoundingClientRect();
		if (n.width <= 0) return;
		let [r, i] = t, a = (r.x + i.x) / 2, o = (r.y + i.y) / 2, s = this._effectiveViewRange();
		this._graphTouchGesture = {
			mode: "pending",
			startCenterX: a,
			startCenterY: o,
			startDistanceX: Math.abs(r.x - i.x),
			startDistanceY: Math.abs(r.y - i.y),
			startViewStart: s.start.getTime(),
			startViewEnd: s.end.getTime(),
			width: n.width,
			anchorPercent: (a - n.left) / n.width,
			target: e
		};
	}
	_moveGraphTouchGesture(e) {
		let t = this._graphTouchGesture, n = this._graphTouchPair();
		if (!t || !n) return;
		let [r, i] = n, a = (r.x + i.x) / 2, o = (r.y + i.y) / 2, s = Math.abs(r.x - i.x), c = Math.abs(r.y - i.y), l = Math.abs(s - t.startDistanceX), u = Math.abs(a - t.startCenterX), d = Math.max(Math.abs(o - t.startCenterY), Math.abs(c - t.startDistanceY));
		if (t.mode === "pending") {
			let e = Math.max(l, u), n = Math.max(e, d), r = Math.max(s, t.startDistanceX) >= ko;
			if (n < Oo) return;
			if (d > e * No) {
				t.mode = "scroll";
				return;
			}
			if (r && l >= Oo && l >= u * 1.35) t.mode = "pinch";
			else {
				t.mode = "scroll";
				return;
			}
			this._tooltip.handlePointerLeave();
		}
		if (t.mode !== "scroll" && (e.preventDefault(), e.stopPropagation(), t.mode === "pinch")) {
			let e = (Math.max(1, s) - t.startDistanceX) / t.width;
			this._zoomGraphViewAt(t.anchorPercent, Math.exp(-e * Ao), t.width, t.startViewStart, t.startViewEnd, jo, Mo);
			return;
		}
	}
	_graphTouchPair() {
		let e = Array.from(this._graphTouchPointers.values());
		if (!(e.length < 2)) return [e[0], e[1]];
	}
	_endGraphTouchGesture() {
		this._graphTouchGesture?.target.toggleAttribute("graph-dragging", !1), this._graphTouchGesture = void 0, this._graphTouchPointers.clear();
	}
	_resetGraphGestureState() {
		this._graphMouseDrag?.target.toggleAttribute("graph-dragging", !1), this._graphTouchGesture?.target.toggleAttribute("graph-dragging", !1), this._graphMouseDrag = void 0, this._graphTouchGesture = void 0, this._graphTouchPointers.clear();
	}
	_rangeSliderTrackWidthPx(e) {
		let t = (e?.closest(".range-slider-stack") ?? this.renderRoot.querySelector(".range-slider-stack"))?.getBoundingClientRect().width ?? 0;
		return t > 0 ? t : void 0;
	}
	_minViewRangeGapPx() {
		return window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? ho : mo;
	}
	_rangeThumbHalfWidthPx() {
		return (window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? xo : bo) / 2;
	}
	_rangeThumbHitWidthPx() {
		return window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? yo : vo;
	}
	_minViewSpanMs(e = this._rangeSliderTrackWidthPx()) {
		let { span: t } = this._loadedRangeMs(), n = this._minViewRangeGapPx(), r = Math.max(e ?? go, n), i = Math.ceil(t * n / r), a = Math.min(6e4, Math.max(1, Math.floor(t / 1e3)));
		return Math.min(t, Math.max(1, i, a));
	}
	_minViewRangeStep(e) {
		let t = this._loadedRangeMs();
		return Math.max(1, Math.ceil(this._minViewSpanMs(e) / t.span * _o));
	}
	_percentFromRangePointer(e, t) {
		return Math.round(Math.max(0, Math.min(t.width, e.clientX - t.left)) / t.width * _o);
	}
	_setViewRangeMs(e, t, n) {
		let r = this._loadedRangeMs(), i = this._minViewSpanMs(n), a = Math.max(t - e, i), o = Math.min(a, r.span), s = Math.min(Math.max(e, r.start), r.end - o), c = s + o;
		this._viewStart = new Date(s), this._viewEnd = new Date(c), this.dispatchEvent(new CustomEvent("view-range-changed", {
			detail: {
				start: this._viewStart,
				end: this._viewEnd
			},
			bubbles: !0,
			composed: !0
		}));
	}
	_dateFromRangePercent(e) {
		let t = this._resolved?.startDate.getTime() ?? this._effectiveStartDate().getTime(), n = this._rangeExtendsFuture() ? this._effectiveEndDate().getTime() : this._resolved?.endDate.getTime() ?? this._effectiveEndDate().getTime();
		return new Date(t + Math.max(0, Math.min(_o, e)) / _o * (n - t));
	}
	_formatRangeDate(e) {
		return e.toLocaleString(this._resolved?.language ?? void 0, {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	}
	_setViewRangePartPercent(e, t, n, r) {
		let i = this._effectiveViewRange(), a = this._rangePercent(i.start, i.start), o = this._rangePercent(i.end, i.end), s = this._minViewRangeStep(n), c;
		e === "start" ? (c = Math.min(Math.max(t, 0), o - s), r && (r.value = String(c)), this._setViewRangeMs(this._dateFromRangePercent(c).getTime(), i.end.getTime(), n)) : (c = Math.max(Math.min(t, _o), a + s), r && (r.value = String(c)), this._setViewRangeMs(i.start.getTime(), this._dateFromRangePercent(c).getTime(), n));
	}
	_setViewRangePart(e, t) {
		let n = t.currentTarget;
		this._setViewRangePartPercent(e, Number(n.value), this._rangeSliderTrackWidthPx(n), n);
	}
	_startRangeSelectionDrag(e, t, n) {
		let r = t.getBoundingClientRect();
		if (r.width <= 0) return;
		let i = this._loadedRangeMs(), a = this._effectiveViewRange(), o = a.start.getTime(), s = a.end.getTime() - o;
		if (s >= i.span - 1) return;
		e.preventDefault(), e.stopPropagation();
		let c = e.clientX;
		t.setPointerCapture(e.pointerId), n.toggleAttribute("dragging", !0);
		let l = (e) => {
			e.preventDefault();
			let t = (e.clientX - c) / r.width * i.span, n = Math.min(Math.max(o + t, i.start), i.end - s);
			this._setViewRangeMs(n, n + s);
		}, u = () => {
			n.toggleAttribute("dragging", !1), t.removeEventListener("pointermove", l), t.removeEventListener("pointerup", u), t.removeEventListener("pointercancel", u);
		};
		t.addEventListener("pointermove", l), t.addEventListener("pointerup", u), t.addEventListener("pointercancel", u);
	}
	_startRangeThumbDrag(e, t, n, r) {
		e.preventDefault(), e.stopPropagation();
		let i = this._rangeSliderTrackWidthPx(t), a = (e) => {
			let r = t.getBoundingClientRect();
			r.width > 0 && this._setViewRangePartPercent(n, this._percentFromRangePointer(e, r), r.width);
		}, o = (e) => {
			e.preventDefault(), a(e);
		}, s = () => {
			t.removeEventListener("pointermove", o), t.removeEventListener("pointerup", s), t.removeEventListener("pointercancel", s);
		};
		t.setPointerCapture(e.pointerId), this._setViewRangePartPercent(n, r, i), t.addEventListener("pointermove", o), t.addEventListener("pointerup", s), t.addEventListener("pointercancel", s);
	}
	_onRangeSliderStackPointerDown(e) {
		if (e.button !== 0) return;
		let t = e.currentTarget, n = t.querySelector(".range-selection-hit");
		if (!(n instanceof HTMLElement)) return;
		let r = t.getBoundingClientRect();
		if (r.width <= 0) return;
		let i = this._effectiveViewRange(), a = this._rangePercent(i.start, i.start), o = this._rangePercent(i.end, i.end), s = a / _o * r.width, c = o / _o * r.width, l = Math.max(0, Math.min(r.width, e.clientX - r.left)), u = this._percentFromRangePointer(e, r), d = this._rangeThumbHalfWidthPx(), f = this._rangeThumbHitWidthPx(), p = s <= f, m = c >= r.width - f, h = Math.max(0, s - f), g = Math.min(r.width, s + (p ? f : d)), _ = Math.max(0, c - (m ? f : d)), v = Math.min(r.width, c + f);
		if (l > g && l < _ || g >= _ && l >= s && l <= c) {
			this._startRangeSelectionDrag(e, t, n);
			return;
		}
		let y = l >= h && l <= g ? "start" : l >= _ && l <= v ? "end" : Math.abs(l - s) <= Math.abs(l - c) ? "start" : "end";
		this._startRangeThumbDrag(e, t, y, u);
	}
	_resetViewRange() {
		this._resolved && (this._viewStart = this._resolved.startDate, this._viewEnd = this._rangeExtendsFuture() ? this._effectiveEndDate() : this._resolved.endDate, this.dispatchEvent(new CustomEvent("view-range-changed", {
			detail: {
				start: this._viewStart,
				end: this._viewEnd
			},
			bubbles: !0,
			composed: !0
		})));
	}
	_setRuntimeLineMode(e) {
		this._runtimeLineMode = e;
	}
	_exportData() {
		let e = this._effectiveViewRange(), t = this._buildRenderSeries().filter((e) => !this._hiddenSeriesIds.includes(e.id)).map((t) => ({
			id: t.id,
			entityId: t.id.startsWith("attr:") ? t.id.slice(5).split(":")[0] : t.id.replace(/^state:/, ""),
			attribute: t.id.startsWith("attr:") ? t.id.slice(5).split(":").slice(1).join(":") : void 0,
			label: t.label,
			unit: t.unit,
			valueType: t.valueType,
			lineMode: t.lineMode,
			showPoints: t.showPoints,
			pointRadius: t.pointRadius,
			scalePreference: t.scalePreference,
			color: t.color,
			points: t.points.filter((t) => t.time >= e.start.getTime() && t.time <= e.end.getTime()).map((e) => ({
				timestamp: new Date(e.time).toISOString(),
				value: e.value
			}))
		})), n = {
			format: "ha-better-history-series-v1",
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			loadedRange: {
				start: this._resolved?.startDate.toISOString(),
				end: (this._rangeExtendsFuture() ? this._effectiveEndDate() : this._resolved?.endDate)?.toISOString()
			},
			viewRange: {
				start: e.start.toISOString(),
				end: e.end.toISOString()
			},
			series: t
		}, r = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), i = URL.createObjectURL(r), a = document.createElement("a"), o = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
		a.href = i, a.download = `ha-better-history-${o}.json`, a.click(), URL.revokeObjectURL(i);
	}
	_importData() {
		let e = document.createElement("input");
		e.type = "file", e.accept = "application/json,.json", e.addEventListener("change", () => {
			let t = e.files?.[0];
			t && t.text().then((e) => this._applyImportedData(JSON.parse(e))).catch(() => this._data.setError("Invalid import file"));
		}, { once: !0 }), e.click();
	}
	_applyImportedData(e) {
		if (!this._isExportPayload(e)) {
			this._data.setError("Unsupported import format");
			return;
		}
		let t = this._parseImportedSeries(e.series ?? []);
		if (!t) {
			this._data.setError("Invalid import data");
			return;
		}
		let n = this._parseDate(e.viewRange?.start), r = this._parseDate(e.viewRange?.end), i = this._parseDate(e.loadedRange?.start) ?? n, a = this._parseDate(e.loadedRange?.end) ?? r;
		if (!n || !r || !i || !a || i.getTime() >= a.getTime()) {
			this._data.setError("Invalid import range");
			return;
		}
		this._importedSeriesMeta = t.meta, this._importedDataActive = !0, this._importedSources = t.series.map((e) => e.source), this._selectedSources = [], this._selectedTargets = {}, this._removedConfigSourceIds = [], this._rangeStart = i, this._rangeEnd = a, this._viewStart = n, this._viewEnd = r, this._hiddenSeriesIds = [], this._prevClipX.clear(), this._chartRenderCache = void 0, this._graphGroupRenderCache = void 0;
		let o = ht(this._importedSources);
		this._lastFetchKey = `${o}|${i.getTime()}|${a.getTime()}`, this._lastFetchSources = [...this._importedSources], this._data.setImportedSeries(t.series, i, a), this.dispatchEvent(new CustomEvent("data-imported", {
			detail: {
				start: i,
				end: a,
				seriesCount: t.series.length
			},
			bubbles: !0,
			composed: !0
		}));
	}
	_isExportPayload(e) {
		return typeof e == "object" && !!e && e.format === "ha-better-history-series-v1";
	}
	_parseImportedSeries(e) {
		let t = [], n = /* @__PURE__ */ new Map();
		for (let r of e) {
			if (typeof r != "object" || !r) return;
			let e = r, i = typeof e.id == "string" && e.id.trim() !== "" ? e.id : void 0, a = typeof e.entityId == "string" && e.entityId.trim() !== "" ? e.entityId : void 0, o = typeof e.label == "string" && e.label.trim() !== "" ? e.label : i, s = e.valueType === "number" || e.valueType === "boolean" || e.valueType === "string" ? e.valueType : void 0, c = Array.isArray(e.points) ? e.points : void 0;
			if (!i || !a || !o || !s || !c) return;
			let l = typeof e.attribute == "string" && e.attribute.trim() !== "" ? e.attribute : void 0, u = {
				id: i,
				kind: l ? "entity_attribute" : "entity_state",
				entityId: a,
				label: o,
				path: l?.split("."),
				valueType: s,
				unit: typeof e.unit == "string" ? e.unit : void 0,
				scalePreference: e.scalePreference === "primary" || e.scalePreference === "secondary" ? e.scalePreference : "auto"
			}, d = c.map((e) => this._parseImportedPoint(e, s)).filter((e) => e !== void 0).sort((e, t) => e.time - t.time);
			t.push({
				source: u,
				points: d
			}), n.set(i, {
				color: typeof e.color == "string" && e.color.trim() !== "" ? e.color : void 0,
				lineMode: e.lineMode === "line" || e.lineMode === "column" || e.lineMode === "stair" ? e.lineMode : void 0,
				scalePreference: e.scalePreference === "primary" || e.scalePreference === "secondary" ? e.scalePreference : void 0,
				showPoints: e.showPoints === !0,
				pointRadius: mi(e.pointRadius)
			});
		}
		return {
			series: t,
			meta: n
		};
	}
	_parseImportedPoint(e, t) {
		if (typeof e != "object" || !e) return;
		let n = e, r = Date.parse(String(n.timestamp ?? "")), i = n.value;
		if (Number.isFinite(r) && (t === "number" && typeof i == "number" && Number.isFinite(i) || t === "boolean" && typeof i == "boolean" || t === "string" && typeof i == "string")) return {
			time: r,
			value: i
		};
	}
	_parseDate(e) {
		if (typeof e != "string") return;
		let t = Date.parse(e);
		return Number.isFinite(t) ? new Date(t) : void 0;
	}
	_renderToolsPanel() {
		if (!this.toolsOpen || !this._resolved || this._lastGraphVisible === !1) return O;
		let e = this._effectiveViewRange(), t = this._rangePercent(e.start, this._resolved.startDate), n = this._rangePercent(e.end, this._resolved.endDate), r = this._defaultLineMode(), i = this._showTimeRangeSelector(), a = this._showLineModeButtons(), o = this._showExportButton(), s = this._showImportButton();
		return !i && !a && !o && !s ? O : E`
      <div class="tools-panel">
        <div class="tool-range">
          <div class="tool-range-row">
            ${i ? E`
                <div class="tool-range-control">
                  <div class="range-values">
                    <span>${this._formatRangeDate(e.start)}</span>
                    <span>${this._formatRangeDate(e.end)}</span>
                  </div>
                  <div
                    class="range-slider-stack"
                    @pointerdown=${(e) => this._onRangeSliderStackPointerDown(e)}
                  >
                    <div
                      class="range-selection"
                      style="left:${t / 10}%;right:${100 - n / 10}%;"
                    ></div>
                    <div
                      class="range-selection-hit"
                      style="left:${t / 10}%;right:${100 - n / 10}%;"
                    ></div>
                    <input class="range-slider" type="range" min="0" max="1000" .value=${String(t)} @input=${(e) => this._setViewRangePart("start", e)} />
                    <input class="range-slider" type="range" min="0" max="1000" .value=${String(n)} @input=${(e) => this._setViewRangePart("end", e)} />
                  </div>
                </div>
                <button
                  class="tool-action-button tool-reset-button"
                  title=${L(this.hass, "reset_zoom")}
                  aria-label=${L(this.hass, "reset_zoom")}
                  @click=${() => this._resetViewRange()}
                >
                  <ha-icon .icon=${"mdi:restore"}></ha-icon>
                </button>
              ` : O}
            <div class="tool-actions">
              ${a ? E`
                <div class="mode-switch" role="group" aria-label=${L(this.hass, "line_mode")}>
                  ${[
			[
				"stair",
				"mdi:stairs",
				"mode_stair"
			],
			[
				"line",
				"mdi:chart-line",
				"mode_line"
			],
			[
				"column",
				"mdi:chart-bar",
				"mode_column"
			]
		].map(([e, t, n]) => E`
                    <button
                      class="mode-button"
                      ?active=${r === e}
                      title=${L(this.hass, n)}
                      @click=${() => this._setRuntimeLineMode(e)}
                    >
                      <ha-icon .icon=${t}></ha-icon>
                    </button>
                  `)}
                </div>
              ` : O}
              ${o ? E`
                  <button
                    class="tool-action-button"
                    title=${L(this.hass, "export_data")}
                    aria-label=${L(this.hass, "export_data")}
                    @click=${() => this._exportData()}
                  >
                    <ha-icon .icon=${"mdi:download"}></ha-icon>
                  </button>
                ` : O}
              ${s ? E`
                  <button
                    class="tool-action-button"
                    title=${L(this.hass, "import_data")}
                    aria-label=${L(this.hass, "import_data")}
                    ?disabled=${this._hasForcedConfigSeries()}
                    @click=${() => this._importData()}
                  >
                    <ha-icon .icon=${"mdi:upload"}></ha-icon>
                  </button>
                ` : O}
            </div>
          </div>
        </div>
      </div>
    `;
	}
	_queueGraphVisible(e) {
		this._pendingGraphVisible = e;
	}
	_emitGraphVisibilityState() {
		let e = this._pendingGraphVisible;
		e !== void 0 && this._lastGraphVisible !== e && (this._lastGraphVisible = e, this.dispatchEvent(new CustomEvent("graph-visibility-changed", {
			detail: { visible: e },
			bubbles: !0,
			composed: !0
		})), this.requestUpdate());
	}
	render() {
		let e = this._resolved?.width ?? "100%", t = this._resolved?.backgroundColor ?? "transparent", n = this._resolved?.title?.trim(), r = [
			this._resolved?.titleFontFamily ? `font-family:${this._resolved.titleFontFamily};` : "",
			this._resolved?.titleFontSize ? `font-size:${this._resolved.titleFontSize};` : "",
			this._resolved?.titleColor ? `color:${this._resolved.titleColor};` : ""
		].join(""), i = this._hasVisibleControls(), a = i || this.toolsOpen && this._lastGraphVisible !== !1;
		return E`
      <div class="root" style="width:${e};background:${t};">
        ${n ? E`<div class="graph-title" style=${r}>${n}</div>` : O}
        <div class="chart-layout">
          ${a ? E`<div class="surface-header">
                ${i ? E`<div class="controls-bar">
                      ${this._renderDatePicker()}
                      ${this._renderEntityPickerUI()}
                    </div>` : O}
                ${this._renderToolsPanel()}
              </div>` : O}
          <div class="chart-area">
            ${this._renderChartBody()}
          </div>
        </div>
      </div>
      <span class="axis-touch-drag-preview"></span>
    `;
	}
	_toggleSeries(e) {
		let t = !this._hiddenSeriesIds.includes(e);
		this._hiddenSeriesIds = t ? [...this._hiddenSeriesIds, e] : this._hiddenSeriesIds.filter((t) => t !== e), this.dispatchEvent(new CustomEvent("series-toggled", {
			detail: {
				id: e,
				hidden: t
			},
			bubbles: !0,
			composed: !0
		}));
	}
	_hasVisibleControls() {
		return this.showControls && (this._resolved?.showDatePicker === !0 && this._datePickerReady || this._resolved?.showEntityPicker === !0 && this._entityComponentsReady);
	}
	_renderDatePicker() {
		return !this._resolved?.showDatePicker || !this._datePickerReady ? O : Zi({
			hass: this.hass,
			startDate: this._resolved.startDate,
			endDate: this._resolved.endDate,
			onChange: (e, t) => this._onDateRangeChanged(e, t),
			onOpen: () => this._onDatePickerOpened(),
			onClose: () => this._onDatePickerClosed()
		});
	}
	_positionEntityMenu() {
		let e = this.renderRoot?.querySelector(".target-picker, .entity-trigger"), t = this.renderRoot?.querySelector(".entity-menu");
		if (!e || !t) return;
		t.style.top = "0", t.style.left = "0", t.style.right = "", t.style.width = "", t.style.maxHeight = "";
		let n = t.getBoundingClientRect(), r = e.getBoundingClientRect(), i = this.getBoundingClientRect(), a = i.left + 8, o = i.right - 8, s = o - a, c = Math.min(420, s);
		t.style.width = `${c}px`;
		let l;
		window.matchMedia("(hover: hover) and (pointer: fine)").matches ? (l = r.left, l = Math.min(l, o - c), l = Math.max(l, a)) : (l = a, t.style.width = `${s}px`);
		let u = window.visualViewport, d = u?.offsetTop ?? 0, f = d + (u?.height ?? window.innerHeight) - 8 - r.bottom - 6, p = r.top - d - 8 - 6, m = f < Math.min(t.scrollHeight || t.offsetHeight || 420, 420) && p > f, h = Math.min(Math.max(m ? p : f, 120), 420), g = m ? Math.max(d + 8, r.top - 6 - h) : r.bottom + 6;
		t.style.maxHeight = `${h}px`, t.style.top = `${g - n.top}px`, t.style.left = `${l - n.left}px`, t.style.right = "";
	}
	_positionSourceSettingsPopover() {
		let e = this._sourceSettingsSourceId;
		if (!e) return;
		let t = this.renderRoot?.querySelector("[data-source-settings-popover]"), n = Array.from(this.renderRoot?.querySelectorAll(".source-chip") ?? []).find((t) => t.dataset.sourceId === e);
		if (!t || !n) return;
		t.style.top = "0", t.style.left = "0", t.style.right = "";
		let r = t.getBoundingClientRect(), i = n.getBoundingClientRect(), a = this.getBoundingClientRect(), o = Math.min(280, Math.max(220, a.width - 16));
		t.style.width = `${o}px`;
		let s = a.left + 8, c = a.right - 8, l = Math.max(s, Math.min(i.left, c - o)), u = i.bottom + 6, d = i.top - t.offsetHeight - 6, f = u + t.offsetHeight <= window.innerHeight - 8 ? u : Math.max(8, d);
		t.style.left = `${l - r.left}px`, t.style.top = `${f - r.top}px`;
	}
	_openEntityActions(e, t, n) {
		if (!this.hass?.states[e] || !z(this._selectedTargets).includes(e)) return !1;
		let r = t.getBoundingClientRect();
		return this._sourceSettingsSourceId = void 0, this._entityActionsAnchorRect = {
			left: r.left,
			top: r.top,
			right: r.right,
			bottom: r.bottom,
			width: r.width,
			height: r.height
		}, this._entityActionsEntityId = e, !0;
	}
	_closeEntityActions() {
		this._entityActionsEntityId = void 0, this._entityActionsAnchorRect = void 0;
	}
	_selectAttributesFromEntityActions() {
		let e = this._entityActionsEntityId;
		e && (this._closeEntityActions(), this._openAttributeMenu(e));
	}
	_positionEntityActionsPopover() {
		let e = this._entityActionsAnchorRect, t = this.renderRoot.querySelector("[data-entity-actions-popover]");
		if (!e || !t) return;
		t.style.top = "0", t.style.left = "0";
		let n = t.getBoundingClientRect(), r = window.visualViewport, i = r?.offsetLeft ?? 0, a = r?.offsetTop ?? 0, o = i + (r?.width ?? window.innerWidth), s = a + (r?.height ?? window.innerHeight), c = t.offsetWidth, l = t.offsetHeight, u = Math.max(i + 8, Math.min(e.left, o - 8 - c)), d = e.bottom + 6, f = e.top - 6 - l, p = d + l <= s - 8 ? d : f, m = Math.max(a + 8, Math.min(p, s - 8 - l));
		t.style.left = `${u - n.left}px`, t.style.top = `${m - n.top}px`;
	}
	_closeAttributeMenu() {
		this._closeBrowserHistoryLayer("attribute-picker", () => this._closePickerOverlay());
	}
	_onEntitySelected(e) {
		this._selectingEntityForAttributeMenu = !0, this._entityPickerOpen = !1, this._openAttributeMenu(e), queueMicrotask(() => {
			this._selectingEntityForAttributeMenu = !1;
		});
	}
	_onEntityPickerOpened() {
		this._entityPickerOpen && !this._attributeMenuOpen || (this._entityPickerOpen = !0, this._attributeMenuOpen = !1, this._pushBrowserHistoryLayer("target-picker"), this._targetPickerReady || Wi().then((e) => {
			this._targetPickerReady = e && customElements.get("ha-target-picker") !== void 0, this._targetPickerLoadComplete = !0;
		}));
	}
	_onEntityPickerClosed() {
		if (this._pendingAttributeEntityId) {
			this._entityPickerOpen = !1, this._schedulePendingAttributeMenu();
			return;
		}
		if (this._selectingEntityForAttributeMenu) {
			this._entityPickerOpen = !1;
			return;
		}
		this._closeBrowserHistoryLayer("target-picker", () => {
			this._entityPickerOpen = !1;
		});
	}
	_openAttributeMenu(e) {
		new Set(this._pickerEntities().map((e) => e.entity_id)).has(e) || (this._customEntityIds = [...this._customEntityIds, e]), this._selectedEntityId = e, this._path = [], this._attributeSearch = "", this._attributeMenuOpen = !0, this._browserHistoryEntry()?.layer === "target-picker" ? this._replaceBrowserHistoryLayer("attribute-picker") : this._pushBrowserHistoryLayer("attribute-picker");
	}
	_openPendingAttributeMenu() {
		let e = this._pendingAttributeEntityId;
		return e ? (this._pendingAttributeEntityId = void 0, this._entityPickerOpen = !1, this._openAttributeMenu(e), !0) : !1;
	}
	_schedulePendingAttributeMenu() {
		this._pendingAttributeEntityId && (this._pendingAttributeOpenTimer !== void 0 && clearTimeout(this._pendingAttributeOpenTimer), this._pendingAttributeOpenTimer = setTimeout(() => {
			this._pendingAttributeOpenTimer = void 0, this._openPendingAttributeMenu();
		}, Go));
	}
	_onTargetSelectionChanged(e, t = !0) {
		let n = this._selectedTargets, r = R(e), i = new Set(z(n)), a = z(r), o = a.filter((e) => !i.has(e)), s = t && o.length === 1 && !Qa(n, r) ? o[0] : void 0, c = s ? R({
			...r,
			entity_id: a.filter((e) => e !== s)
		}) : r, l = z(c), u = new Set(this.hass ? eo(this.hass, n) : []);
		this._selectedTargets = c, this._entityActionsEntityId && !l.includes(this._entityActionsEntityId) && this._closeEntityActions();
		let d = this.hass ? eo(this.hass, c) : [], f = new Set(d);
		s && (this._pendingAttributeEntityId = s, this._schedulePendingAttributeMenu());
		for (let e of l.filter((e) => !i.has(e))) {
			if (t) continue;
			let n = this.hass?.states[e] ? Ut(this.hass.states[e]) : void 0;
			n && this._emitSeriesEvent("series-added", { source: n });
		}
		for (let e of z(n)) !l.includes(e) && u.has(e) && !f.has(e) && this._emitSeriesEvent("series-removed", { sourceId: `state:${e}` });
		this.dispatchEvent(new CustomEvent("target-selection-changed", {
			detail: {
				targets: c,
				entityIds: d
			},
			bubbles: !0,
			composed: !0
		}));
	}
	_setExplicitTargetEntity(e, t, n = !0) {
		let r = z(this._selectedTargets), i = t ? [.../* @__PURE__ */ new Set([...r, e])] : r.filter((t) => t !== e);
		this._onTargetSelectionChanged({
			...this._selectedTargets,
			entity_id: i
		}, n);
	}
	_emitSeriesEvent(e, t) {
		this.dispatchEvent(new CustomEvent(e, {
			detail: t,
			bubbles: !0,
			composed: !0
		}));
	}
	_isEventInsideAttributeOverlay(e) {
		let t = e.composedPath(), n = this.renderRoot?.querySelector(".entity-menu");
		if (n && this._pathContainsElement(t, n)) return !0;
		let r = this.renderRoot?.querySelector(".target-picker, .entity-trigger");
		if (r && this._pathContainsElement(t, r)) return !0;
		let i = this.renderRoot?.querySelector("[data-source-settings-popover]");
		if (i && this._pathContainsElement(t, i)) return !0;
		let a = this.renderRoot?.querySelector("[data-entity-actions-popover]");
		if (a && this._pathContainsElement(t, a)) return !0;
		if (this._sourceSettingsSourceId) {
			let e = Array.from(this.renderRoot?.querySelectorAll(".source-chip") ?? []).find((e) => e.dataset.sourceId === this._sourceSettingsSourceId);
			if (e && this._pathContainsElement(t, e)) return !0;
		}
		for (let e of t) {
			if (e === this) break;
			if (!(e instanceof HTMLElement)) continue;
			let t = e.localName;
			if (t === "ha-generic-picker" || t === "ha-target-picker" || t === "ha-combo-box" || t === "ha-picker-combo-box" || t === "wa-popover" || t === "vaadin-combo-box-overlay" || t === "mwc-menu-surface" || t === "md-menu") return !0;
		}
		return !1;
	}
	_pathContainsElement(e, t) {
		return e.some((e) => e instanceof Node && t.contains(e));
	}
	_sourceWithAttributeUnit(e) {
		if (e.kind !== "entity_attribute" || !e.path || e.unit) return e;
		if (e.entityId.startsWith("climate.") && e.path.length === 1 && Ho.has(e.path[0])) {
			let t = this._climateTemperatureUnit(e.entityId);
			if (t) return {
				...e,
				unit: t
			};
		}
		let t = ri(e.path, this.attributeUnits ?? this.config?.attributeUnits), n = ni(t) ? this._resolvedTemperatureUnit() ?? t : t;
		return !n || e.unit === n ? e : {
			...e,
			unit: n
		};
	}
	_climateTemperatureUnit(e) {
		let t = this.hass?.states[e], n = t?.attributes.temperature_unit;
		if (typeof n == "string" && n !== "") return n;
		let r = t?.attributes.unit_of_measurement;
		if (typeof r == "string" && r !== "") return r;
		let i = this.hass?.config?.unit_system?.temperature;
		return typeof i == "string" && i !== "" ? i : void 0;
	}
	_expandedSelectedSources(e) {
		if (e.kind !== "entity_state" || !e.entityId.startsWith("climate.")) return [this._sourceWithAttributeUnit(e)];
		let t = this.hass?.states[e.entityId];
		if (!t) return [this._sourceWithAttributeUnit(e)];
		let n = this._climateTemperatureUnit(e.entityId), r = Vo.map((r) => {
			let i = Wt(t, [r]), a = {
				id: `attr:${e.entityId}:${r}`,
				kind: "entity_attribute",
				entityId: e.entityId,
				label: r,
				path: [r],
				valueType: r === "hvac_action" ? "string" : "number",
				unit: Ho.has(r) ? n : void 0,
				scalePreference: e.scalePreference
			}, o = i ?? a, s = Xo(e);
			return Ho.has(r) && n ? {
				...o,
				unit: n,
				group: s,
				scalePreference: e.scalePreference
			} : Ho.has(r) ? {
				...o,
				group: s,
				scalePreference: e.scalePreference
			} : {
				...o,
				scalePreference: e.scalePreference
			};
		});
		return [this._sourceWithAttributeUnit(e), ...r.map((e) => this._sourceWithAttributeUnit(e))];
	}
	_addSource(e) {
		if (this._resolved?.series.find((t) => t.id === e.id && t.forced === !1 && this._removedConfigSourceIds.includes(t.id))) {
			this._removedConfigSourceIds = this._removedConfigSourceIds.filter((t) => t !== e.id), this._hiddenSeriesIds = this._hiddenSeriesIds.filter((t) => t !== e.id);
			return;
		}
		if (e.kind === "entity_state") {
			this._setExplicitTargetEntity(e.entityId, !0, !1);
			return;
		}
		if (this._selectedSources.some((t) => t.id === e.id) || this._pendingAddedSources.some((t) => t.id === e.id) || (this._resolved?.series ?? []).some((t) => t.id === e.id)) return;
		let t = this._sourceWithAttributeUnit(e);
		this._pendingAddedSources = [...this._pendingAddedSources, t], this.dispatchEvent(new CustomEvent("series-added", {
			detail: { source: t },
			bubbles: !0,
			composed: !0
		})), this._sourceAddBatchTimer !== void 0 && clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = setTimeout(() => this._flushPendingAddedSources(), fo);
	}
	_flushPendingAddedSources() {
		if (this._sourceAddBatchTimer = void 0, this._pendingAddedSources.length === 0) return;
		let e = new Set(this._selectedSources.map((e) => e.id)), t = this._pendingAddedSources.filter((t) => !e.has(t.id));
		this._pendingAddedSources = [], t.length !== 0 && (this._selectedSources = [...this._selectedSources, ...t], this.requestUpdate());
	}
	_removeSource(e) {
		let t = this._selectedSources.find((t) => t.id === e);
		if (this._pendingAddedSources = this._pendingAddedSources.filter((t) => t.id !== e), this._sourceSettingsSourceId === e && (this._sourceSettingsSourceId = void 0), this._activeResolvedSeries().find((t) => t.id === e && t.forced === !1)) {
			this._removedConfigSourceIds = [...this._removedConfigSourceIds, e], this._hiddenSeriesIds = this._hiddenSeriesIds.filter((t) => t !== e), this._data.removeSources([e]), this.dispatchEvent(new CustomEvent("series-removed", {
				detail: { sourceId: e },
				bubbles: !0,
				composed: !0
			}));
			return;
		}
		if (e.startsWith("state:")) {
			let t = e.slice(6);
			z(this._selectedTargets).includes(t) && this._setExplicitTargetEntity(t, !1);
			return;
		}
		!t || this._isDefaultSource(t) || (this._selectedSources = this._selectedSources.filter((t) => t.id !== e), this._hiddenSeriesIds = this._hiddenSeriesIds.filter((t) => t !== e), this.dispatchEvent(new CustomEvent("series-removed", {
			detail: { sourceId: e },
			bubbles: !0,
			composed: !0
		})), this.requestUpdate());
	}
	_sourceSettingsSource() {
		return this._selectedSources.find((e) => e.id === this._sourceSettingsSourceId);
	}
	_openSourceSettings(e) {
		(e.kind === "entity_attribute" || e.kind === "entity_state") && (this._closeEntityActions(), this._sourceSettingsSourceId = e.id);
	}
	_updateSourceSettings(e) {
		let t = this._sourceSettingsSourceId;
		t && (this._selectedSources = this._selectedSources.map((n) => n.id === t ? {
			...n,
			...e
		} : n), this.requestUpdate());
	}
	_onSourceDragStart(e, t) {
		let n = this._selectedSources.find((t) => t.id === e);
		if (!n || this._isDefaultSource(n)) {
			t.preventDefault();
			return;
		}
		this._draggingSourceId = e, this._dragStartSourceIds = this._selectedSources.map((e) => e.id), this._dragDropCommitted = !1, t.dataTransfer?.setData("text/plain", e), t.dataTransfer && (t.dataTransfer.effectAllowed = "move");
	}
	_onSourceDragEnd() {
		if (!this._dragDropCommitted && this._dragStartSourceIds) {
			let e = new Map(this._dragStartSourceIds.map((e, t) => [e, t]));
			this._selectedSources = [...this._selectedSources].sort((t, n) => (e.get(t.id) ?? 2 ** 53 - 1) - (e.get(n.id) ?? 2 ** 53 - 1));
		}
		this._draggingSourceId = void 0, this._dragStartSourceIds = void 0, this._dragDropCommitted = !1;
	}
	_onSourceDragOver(e, t) {
		t.preventDefault(), t.stopPropagation(), t.dataTransfer && (t.dataTransfer.dropEffect = "move");
		let n = this._draggingSourceId ?? t.dataTransfer?.getData("text/plain");
		n && this._previewSourceOrder(n, e);
	}
	_onSourceDrop(e, t) {
		t.preventDefault(), t.stopPropagation();
		let n = this._draggingSourceId ?? t.dataTransfer?.getData("text/plain");
		n && (this._previewSourceOrder(n, e), this._dragDropCommitted = !0, this.dispatchEvent(new CustomEvent("series-reordered", {
			detail: { sourceIds: this._selectedSources.map((e) => e.id) },
			bubbles: !0,
			composed: !0
		})), this.requestUpdate());
	}
	_previewSourceOrder(e, t) {
		if (e === t) return;
		let n = this._selectedSources.find((t) => t.id === e);
		if (!n || this._isDefaultSource(n)) return;
		let r = this._selectedSources.filter((t) => t.id !== e), i = t ? r.findIndex((e) => e.id === t) : r.length;
		if (i < 0) return;
		let a = [
			...r.slice(0, i),
			n,
			...r.slice(i)
		];
		a.map((e) => e.id).join("|") !== this._selectedSources.map((e) => e.id).join("|") && (this._selectedSources = a, this.requestUpdate());
	}
};
B([A({ attribute: !1 })], V.prototype, "hass", void 0), B([A({ attribute: !1 })], V.prototype, "config", void 0), B([A({ attribute: !1 })], V.prototype, "entities", void 0), B([A({ attribute: !1 })], V.prototype, "attributeUnits", void 0), B([A({ type: Number })], V.prototype, "hours", void 0), B([A({ attribute: !1 })], V.prototype, "startDate", void 0), B([A({ attribute: !1 })], V.prototype, "endDate", void 0), B([A({
	type: Boolean,
	attribute: "show-date-picker"
})], V.prototype, "showDatePicker", void 0), B([A({
	type: Boolean,
	attribute: "show-entity-picker"
})], V.prototype, "showEntityPicker", void 0), B([A({
	type: Boolean,
	attribute: "show-import-button"
})], V.prototype, "showImportButton", void 0), B([A({
	type: Boolean,
	attribute: "show-export-button"
})], V.prototype, "showExportButton", void 0), B([A({
	type: Boolean,
	attribute: "show-time-range-selector"
})], V.prototype, "showTimeRangeSelector", void 0), B([A({
	type: Boolean,
	attribute: "show-line-mode-buttons"
})], V.prototype, "showLineModeButtons", void 0), B([A({
	type: Boolean,
	attribute: "show-legend"
})], V.prototype, "showLegend", void 0), B([A({
	type: Boolean,
	attribute: "show-tooltip"
})], V.prototype, "showTooltip", void 0), B([A({
	type: Boolean,
	attribute: "show-grid"
})], V.prototype, "showGrid", void 0), B([A({
	type: Boolean,
	attribute: "show-scale"
})], V.prototype, "showScale", void 0), B([A({
	type: Boolean,
	attribute: "auto-scale-split"
})], V.prototype, "autoScaleSplit", void 0), B([A({
	type: Boolean,
	attribute: "show-controls"
})], V.prototype, "showControls", void 0), B([A()], V.prototype, "width", void 0), B([A()], V.prototype, "height", void 0), B([A({ attribute: "line-mode" })], V.prototype, "lineMode", void 0), B([A({ attribute: "line-width" })], V.prototype, "lineWidth", void 0), B([A({ attribute: "background-color" })], V.prototype, "backgroundColor", void 0), B([A({ attribute: "graph-title" })], V.prototype, "graphTitle", void 0), B([A({ attribute: "title-font-family" })], V.prototype, "titleFontFamily", void 0), B([A({ attribute: "title-font-size" })], V.prototype, "titleFontSize", void 0), B([A({ attribute: "title-color" })], V.prototype, "titleColor", void 0), B([A()], V.prototype, "language", void 0), B([A({
	type: Boolean,
	attribute: "debug-performance"
})], V.prototype, "debugPerformance", void 0), B([A({
	type: Boolean,
	attribute: "tools-open"
})], V.prototype, "toolsOpen", void 0), B([j()], V.prototype, "_resolved", void 0), B([j()], V.prototype, "_hiddenSeriesIds", void 0), B([j()], V.prototype, "_rangeStart", void 0), B([j()], V.prototype, "_rangeEnd", void 0), B([j()], V.prototype, "_viewStart", void 0), B([j()], V.prototype, "_viewEnd", void 0), B([j()], V.prototype, "_liveNow", void 0), B([j()], V.prototype, "_datePickerReady", void 0), B([j()], V.prototype, "_entityComponentsReady", void 0), B([j()], V.prototype, "_targetPickerReady", void 0), B([j()], V.prototype, "_targetPickerLoadComplete", void 0), B([j()], V.prototype, "_runtimeLineMode", void 0), B([j()], V.prototype, "_attributeMenuOpen", void 0), B([j()], V.prototype, "_attributeSearch", void 0), B([j()], V.prototype, "_selectedEntityId", void 0), B([j()], V.prototype, "_path", void 0), B([j()], V.prototype, "_selectedSources", void 0), B([j()], V.prototype, "_selectedTargets", void 0), B([j()], V.prototype, "_removedConfigSourceIds", void 0), B([j()], V.prototype, "_scalePreferences", void 0), B([j()], V.prototype, "_customEntityIds", void 0), B([j()], V.prototype, "_entityPickerOpen", void 0), B([j()], V.prototype, "_datePickerOpen", void 0), B([j()], V.prototype, "_draggingSourceId", void 0), B([j()], V.prototype, "_draggingAxisSeriesId", void 0), B([j()], V.prototype, "_axisDropTarget", void 0), B([j()], V.prototype, "_sourceSettingsSourceId", void 0), B([j()], V.prototype, "_entityActionsEntityId", void 0), B([j()], V.prototype, "_pendingAddedSources", void 0), B([j()], V.prototype, "_importedDataActive", void 0), B([j()], V.prototype, "_containerWidth", void 0), B([j()], V.prototype, "_chartSurfaceHeight", void 0), B([j()], V.prototype, "_chartSurfaceConstrained", void 0);
var es = "haBetterHistory", ts = 50;
function ns(e) {
	return e?.group ?? e?.scaleGroup;
}
var H = class extends k {
	constructor(...e) {
		super(...e), this.browserHistory = !0, this._selectedSources = [], this._selectedTargets = {}, this._attributeMenuOpen = !1, this._entityPickerOpen = !1, this._entitySearch = "", this._path = [], this._attributeSearch = "", this._componentsReady = !1, this._targetPickerReady = !1, this._targetPickerLoadComplete = !1, this._customEntityIds = [], this._browserHistoryInstanceId = `abh-picker-${Math.random().toString(36).slice(2)}`, this._lastPointerDownInside = !1, this._syncingBrowserHistory = !1, this._selectingEntityForAttributeMenu = !1, this._handleDocumentPointerDown = (e) => {
			this._lastPointerDownInside = this._isEventInsideAttributeOverlay(e), !(!this._attributeMenuOpen && !this._sourceSettingsSourceId) && (this._lastPointerDownInside || (e.stopPropagation(), e.stopImmediatePropagation()));
		}, this._handleDocumentClick = (e) => {
			if (!this._attributeMenuOpen && !this._entityPickerOpen && !this._sourceSettingsSourceId) {
				this._lastPointerDownInside = !1;
				return;
			}
			let t = this._lastPointerDownInside;
			if (this._lastPointerDownInside = !1, !t && !this._isEventInsideAttributeOverlay(e)) {
				if (this._sourceSettingsSourceId) {
					e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this._sourceSettingsSourceId = void 0;
					return;
				}
				if (this._entityPickerOpen && !this._attributeMenuOpen) {
					this._closeBrowserHistoryLayer("target-picker", () => {
						this._entityPickerOpen = !1, this._entitySearch = "";
					});
					return;
				}
				e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this._closeAttributeMenu();
			}
		}, this._handleBrowserPopState = (e) => {
			let t = this._browserHistoryEntry(e.state);
			this._syncingBrowserHistory = !0;
			try {
				if (!t) {
					this._closePickerOverlay();
					return;
				}
				this._entityPickerOpen = t.layer === "target-picker", this._attributeMenuOpen = t.layer === "attribute-picker", t.layer !== "attribute-picker" && (this._attributeSearch = "");
			} finally {
				this._syncingBrowserHistory = !1;
			}
		}, this._getItems = () => ua(this.hass), this._getAdditionalItems = (e) => {
			if (!this.hass || !e?.trim()) return [];
			let t = new Set(this._pickerEntities().map((e) => e.entity_id));
			return ma(ua(this.hass, Object.values(this.hass.states).filter((e) => e !== void 0).filter((e) => !t.has(e.entity_id))), e);
		};
	}
	static {
		this.styles = [Fi, o`
      :host {
        display: block;
      }
    `];
	}
	connectedCallback() {
		super.connectedCallback(), document.addEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.addEventListener("click", this._handleDocumentClick, !0), window.addEventListener("popstate", this._handleBrowserPopState), ga().then(() => {
			this._componentsReady = _a();
		}), Wi().then((e) => {
			this._targetPickerReady = e && customElements.get("ha-target-picker") !== void 0, this._targetPickerLoadComplete = !0;
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback(), document.removeEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.removeEventListener("click", this._handleDocumentClick, !0), window.removeEventListener("popstate", this._handleBrowserPopState), this._pendingAttributeOpenTimer !== void 0 && (clearTimeout(this._pendingAttributeOpenTimer), this._pendingAttributeOpenTimer = void 0);
	}
	willUpdate(e) {
		e.has("initialSources") && this.initialSources && (this._selectedSources = [...this.initialSources]), (e.has("_attributeMenuOpen") && this._attributeMenuOpen || e.has("_entityPickerOpen") && this._entityPickerOpen) && this.updateComplete.then(() => this._positionEntityMenu()), e.has("_sourceSettingsSourceId") && this._sourceSettingsSourceId && this.updateComplete.then(() => this._positionSourceSettingsPopover());
	}
	_isEventInsideAttributeOverlay(e) {
		let t = e.composedPath(), n = this.renderRoot?.querySelector(".entity-menu[open], .entity-select-menu[open]");
		if (n && this._pathContainsElement(t, n)) return !0;
		let r = this.renderRoot?.querySelector(".target-picker, .entity-trigger");
		if (r && this._pathContainsElement(t, r)) return !0;
		let i = this.renderRoot?.querySelector("[data-source-settings-popover]");
		if (i && this._pathContainsElement(t, i)) return !0;
		if (this._sourceSettingsSourceId) {
			let e = Array.from(this.renderRoot?.querySelectorAll(".source-chip") ?? []).find((e) => e.dataset.sourceId === this._sourceSettingsSourceId);
			if (e && this._pathContainsElement(t, e)) return !0;
		}
		for (let e of t) {
			if (e === this) break;
			if (!(e instanceof HTMLElement)) continue;
			let t = e.localName;
			if (t === "ha-generic-picker" || t === "ha-target-picker" || t === "ha-combo-box" || t === "ha-picker-combo-box" || t === "wa-popover" || t === "vaadin-combo-box-overlay" || t === "mwc-menu-surface" || t === "md-menu") return !0;
		}
		return !1;
	}
	_pathContainsElement(e, t) {
		return e.some((e) => e instanceof Node && t.contains(e));
	}
	_positionEntityMenu() {
		let e = this.renderRoot?.querySelector(".target-picker, .entity-trigger"), t = this.renderRoot?.querySelector(".entity-menu[open], .entity-select-menu[open]");
		if (!e || !t) return;
		t.style.top = "0", t.style.left = "0", t.style.right = "", t.style.width = "", t.style.maxHeight = "";
		let n = t.getBoundingClientRect(), r = e.getBoundingClientRect(), i = this.getBoundingClientRect(), a = i.left + 8, o = i.right - 8, s = o - a, c = Math.min(420, s);
		t.style.width = `${c}px`;
		let l;
		window.matchMedia("(hover: hover) and (pointer: fine)").matches ? (l = r.left, l = Math.min(l, o - c), l = Math.max(l, a)) : (l = a, t.style.width = `${s}px`);
		let u = window.visualViewport, d = u?.offsetTop ?? 0, f = d + (u?.height ?? window.innerHeight) - 8 - r.bottom - 6, p = r.top - d - 8 - 6, m = t.classList.contains("entity-select-menu") ? 360 : 420, h = f < Math.min(t.scrollHeight || t.offsetHeight || m, m) && p > f, g = Math.min(Math.max(h ? p : f, 120), m), _ = h ? Math.max(d + 8, r.top - 6 - g) : r.bottom + 6;
		t.style.maxHeight = `${g}px`, t.style.top = `${_ - n.top}px`, t.style.left = `${l - n.left}px`, t.style.right = "";
	}
	_positionSourceSettingsPopover() {
		let e = this._sourceSettingsSourceId;
		if (!e) return;
		let t = this.renderRoot?.querySelector("[data-source-settings-popover]"), n = Array.from(this.renderRoot?.querySelectorAll(".source-chip") ?? []).find((t) => t.dataset.sourceId === e);
		if (!t || !n) return;
		t.style.top = "0", t.style.left = "0", t.style.right = "";
		let r = t.getBoundingClientRect(), i = n.getBoundingClientRect(), a = this.getBoundingClientRect(), o = Math.min(280, Math.max(220, a.width - 16));
		t.style.width = `${o}px`;
		let s = a.left + 8, c = a.right - 8, l = Math.max(s, Math.min(i.left, c - o)), u = i.bottom + 6, d = i.top - t.offsetHeight - 6, f = u + t.offsetHeight <= window.innerHeight - 8 ? u : Math.max(8, d);
		t.style.left = `${l - r.left}px`, t.style.top = `${f - r.top}px`;
	}
	_browserHistoryEntry(e = window.history.state) {
		let t = typeof e == "object" && e ? e[es] : void 0;
		if (typeof t != "object" || !t) return;
		let n = t;
		if (n.instanceId === this._browserHistoryInstanceId && (n.layer === "target-picker" || n.layer === "attribute-picker")) return {
			instanceId: n.instanceId,
			layer: n.layer
		};
	}
	_browserHistoryState(e) {
		return {
			...typeof window.history.state == "object" && window.history.state !== null ? window.history.state : {},
			[es]: {
				instanceId: this._browserHistoryInstanceId,
				layer: e
			}
		};
	}
	_pushBrowserHistoryLayer(e) {
		this.browserHistory && (this._syncingBrowserHistory || this._browserHistoryEntry()?.layer !== e && window.history.pushState(this._browserHistoryState(e), "", window.location.href));
	}
	_replaceBrowserHistoryLayer(e) {
		this.browserHistory && (this._syncingBrowserHistory || window.history.replaceState(this._browserHistoryState(e), "", window.location.href));
	}
	_closeBrowserHistoryLayer(e, t) {
		if (this.browserHistory && !this._syncingBrowserHistory && this._browserHistoryEntry()?.layer === e) {
			window.history.back();
			return;
		}
		t();
	}
	_pickerEntities() {
		return this.hass ? this._customEntityIds.filter((e) => typeof e == "string" && e !== "").filter((e, t, n) => n.indexOf(e) === t).map((e) => this.hass?.states[e]).filter((e) => e !== void 0) : [];
	}
	_onEntitySelected(e) {
		this._selectingEntityForAttributeMenu = !0, new Set(this._pickerEntities().map((e) => e.entity_id)).has(e) || (this._customEntityIds = [...this._customEntityIds, e]), this._selectedEntityId = e, this._entitySearch = "", this._path = [], this._attributeSearch = "", this._entityPickerOpen = !1, this._attributeMenuOpen = !0, this._browserHistoryEntry()?.layer === "target-picker" ? this._replaceBrowserHistoryLayer("attribute-picker") : this._pushBrowserHistoryLayer("attribute-picker"), queueMicrotask(() => {
			this._selectingEntityForAttributeMenu = !1;
		});
	}
	_closeAttributeMenu() {
		this._closeBrowserHistoryLayer("attribute-picker", () => this._closePickerOverlay());
	}
	_closePickerOverlay() {
		this._attributeMenuOpen = !1, this._entityPickerOpen = !1, this._entitySearch = "", this._attributeSearch = "", this._sourceSettingsSourceId = void 0, !this._targetPickerReady && this._selectedSources.length > 0 && (this._confirm(), this._selectedSources = []);
	}
	_addSource(e) {
		this._selectedSources.some((t) => t.id === e.id) || (this._selectedSources = [...this._selectedSources, e]);
	}
	_removeSource(e) {
		this._selectedSources = this._selectedSources.filter((t) => t.id !== e), this._sourceSettingsSourceId === e && (this._sourceSettingsSourceId = void 0);
	}
	_sourceSettingsSource() {
		return this._selectedSources.find((e) => e.id === this._sourceSettingsSourceId);
	}
	_openSourceSettings(e) {
		(e.kind === "entity_attribute" || e.kind === "entity_state") && (this._sourceSettingsSourceId = e.id);
	}
	_updateSourceSettings(e) {
		let t = this._sourceSettingsSourceId;
		t && (this._selectedSources = this._selectedSources.map((n) => n.id === t ? {
			...n,
			...e
		} : n));
	}
	_confirm() {
		let e = this.hass ? [...to(this.hass, this._selectedTargets), ...this._selectedSources] : [...this._selectedSources], t = /* @__PURE__ */ new Set(), n = e.filter((e) => !t.has(e.id) && (t.add(e.id), !0));
		this.dispatchEvent(new CustomEvent("sources-confirmed", {
			detail: { sources: n },
			bubbles: !0,
			composed: !0
		})), this._selectedTargets = {}, this._selectedSources = [], this._selectedEntityId = void 0, this._path = [], this._entitySearch = "", this._attributeSearch = "";
	}
	render() {
		return !this._componentsReady || !this._targetPickerLoadComplete ? E`` : E`
      ${va({
			hass: this.hass,
			menuOpen: this._attributeMenuOpen,
			entityPickerOpen: this._entityPickerOpen,
			selectedEntityId: this._selectedEntityId,
			entitySearch: this._entitySearch,
			path: this._path,
			selectedSources: this._selectedSources,
			targetSelection: this._selectedTargets,
			targetPickerReady: this._targetPickerReady,
			targetEntityIds: this.hass ? eo(this.hass, this._selectedTargets) : [],
			explicitTargetEntityIds: z(this._selectedTargets),
			draggingSourceId: void 0,
			resolved: void 0,
			loading: !1,
			attributeSearch: this._attributeSearch,
			getItems: this._getItems,
			getAdditionalItems: this._getAdditionalItems,
			onEntityPickerOpened: () => {
				this._entityPickerOpen && !this._attributeMenuOpen || (this._entityPickerOpen = !0, this._attributeMenuOpen = !1, this._pushBrowserHistoryLayer("target-picker"), this._targetPickerReady || Wi().then((e) => {
					this._targetPickerReady = e && customElements.get("ha-target-picker") !== void 0, this._targetPickerLoadComplete = !0;
				}));
			},
			onEntityPickerClosed: () => {
				if (this._pendingAttributeEntityId) {
					this._entityPickerOpen = !1, this._schedulePendingAttributeMenu();
					return;
				}
				if (this._selectingEntityForAttributeMenu) {
					this._entityPickerOpen = !1;
					return;
				}
				this._closeBrowserHistoryLayer("target-picker", () => {
					this._entityPickerOpen = !1;
				});
			},
			onEntitySelected: (e) => this._onEntitySelected(e),
			onTargetSelectionChanged: (e) => this._onTargetSelectionChanged(e),
			onEntityStateAdded: this._targetPickerReady ? (e) => this._setExplicitTargetEntity(e, !0, !1) : void 0,
			onEntityStateRemoved: this._targetPickerReady ? (e) => this._setExplicitTargetEntity(e, !1, !1) : void 0,
			onEntitySearchChanged: (e) => {
				this._entitySearch = e;
			},
			onAttributeSearchChanged: (e) => {
				this._attributeSearch = e;
			},
			onSourceAdded: (e) => this._addSource(e),
			onSourceRemoved: (e) => this._removeSource(e),
			onSourceDragStart: () => {},
			onSourceDragOver: () => {},
			onSourceDragEnd: () => {},
			onSourceDrop: () => {},
			sourceSettingsSourceId: this._sourceSettingsSourceId,
			sourceSettingsUnit: this._sourceSettingsSource()?.unit,
			sourceSettingsGroup: ns(this._sourceSettingsSource()),
			onSourceSettingsOpen: (e) => this._openSourceSettings(e),
			onSourceSettingsClose: () => {
				this._sourceSettingsSourceId = void 0;
			},
			onSourceSettingsUnitChanged: (e) => {
				let t = e.trim();
				this._updateSourceSettings({ unit: t || void 0 });
			},
			onSourceSettingsGroupChanged: (e) => {
				let t = e.trim();
				this._updateSourceSettings({
					group: t || void 0,
					scaleGroup: void 0
				});
			},
			onBreadcrumbClick: (e) => {
				this._path = e;
			},
			onCloseMenu: () => this._closeAttributeMenu(),
			hideEmptyPickerState: this._pickerEntities().length === 0
		})}
      ${this._targetPickerReady && (!Za(this._selectedTargets) || this._selectedSources.length > 0) ? E`<button class="target-picker-done" @click=${() => this._confirm()}>${L(this.hass, "done")}</button>` : E``}
    `;
	}
	_onTargetSelectionChanged(e) {
		let t = new Set(z(this._selectedTargets)), n = R(e), r = z(n).filter((e) => !t.has(e)), i = r.length === 1 && !Qa(this._selectedTargets, n) ? r[0] : void 0, a = i ? R({
			...n,
			entity_id: z(n).filter((e) => e !== i)
		}) : n;
		this._selectedTargets = a, i && (this._pendingAttributeEntityId = i, this._schedulePendingAttributeMenu());
	}
	_openPendingAttributeMenu() {
		let e = this._pendingAttributeEntityId;
		return e ? (this._pendingAttributeEntityId = void 0, this._entityPickerOpen = !1, this._onEntitySelected(e), !0) : !1;
	}
	_schedulePendingAttributeMenu() {
		this._pendingAttributeEntityId && (this._pendingAttributeOpenTimer !== void 0 && clearTimeout(this._pendingAttributeOpenTimer), this._pendingAttributeOpenTimer = setTimeout(() => {
			this._pendingAttributeOpenTimer = void 0, this._openPendingAttributeMenu();
		}, ts));
	}
	_setExplicitTargetEntity(e, t, n = !0) {
		let r = z(this._selectedTargets), i = t ? [.../* @__PURE__ */ new Set([...r, e])] : r.filter((t) => t !== e);
		this._selectedTargets = R({
			...this._selectedTargets,
			entity_id: i
		}), n && t && (this._pendingAttributeEntityId = e, this._schedulePendingAttributeMenu());
	}
};
B([A({ attribute: !1 })], H.prototype, "hass", void 0), B([A({ attribute: !1 })], H.prototype, "initialSources", void 0), B([A({
	type: Boolean,
	attribute: "browser-history"
})], H.prototype, "browserHistory", void 0), B([j()], H.prototype, "_selectedSources", void 0), B([j()], H.prototype, "_selectedTargets", void 0), B([j()], H.prototype, "_attributeMenuOpen", void 0), B([j()], H.prototype, "_entityPickerOpen", void 0), B([j()], H.prototype, "_selectedEntityId", void 0), B([j()], H.prototype, "_entitySearch", void 0), B([j()], H.prototype, "_path", void 0), B([j()], H.prototype, "_attributeSearch", void 0), B([j()], H.prototype, "_componentsReady", void 0), B([j()], H.prototype, "_targetPickerReady", void 0), B([j()], H.prototype, "_targetPickerLoadComplete", void 0), B([j()], H.prototype, "_customEntityIds", void 0), B([j()], H.prototype, "_sourceSettingsSourceId", void 0), customElements.get("abh-series-picker") || customElements.define("abh-series-picker", H);
function rs(e = "ha-better-history") {
	customElements.get(e) || customElements.define(e, V);
}
//#endregion
//#region src/const.ts
var is = "A Better History Card", as = "custom:a-better-history-card", os = "a-better-history-card", ss = "a-better-history-card-history", cs = "a-better-history-card-editor", ls = "custom:a-better-history-button-card", us = "a-better-history-button-card", ds = "a-better-history-button-card-editor";
//#endregion
//#region src/data/normalize-config.ts
function fs(e) {
	return {
		range_mode: "relative",
		hours: 24,
		show_legend: !0,
		show_tooltip: !0,
		show_grid: !0,
		show_scale: !0,
		auto_scale_split: !0,
		show_controls: !0,
		show_line_mode_buttons: !0,
		show_export_button: !0,
		show_time_range_selector: !0,
		show_card_export_button: !0,
		button_show_name: !0,
		button_show_icon: !0,
		button_hover_effect: !0,
		...e
	};
}
//#endregion
//#region src/data/build-export-card-config.ts
function ps(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	if (!Array.isArray(t.series) || !t.series.every((e) => typeof e == "object" && !!e && typeof e.entity == "string") || t.lineMode !== "stair" && t.lineMode !== "line" && t.lineMode !== "column" || typeof t.importedData != "boolean" || typeof t.range != "object" || t.range === null) return !1;
	let n = t.range;
	return n.mode === "relative" ? typeof n.hours == "number" && Number.isFinite(n.hours) && n.hours > 0 : n.mode === "absolute" && n.startDate instanceof Date && n.endDate instanceof Date && Number.isFinite(n.startDate.getTime()) && n.endDate.getTime() > n.startDate.getTime();
}
var ms = [
	"attribute_units",
	"show_date_picker",
	"show_entity_picker",
	"show_legend",
	"show_tooltip",
	"show_grid",
	"show_scale",
	"auto_scale_split",
	"show_import_button",
	"show_export_button",
	"show_time_range_selector",
	"show_controls",
	"disable_climate_overlay",
	"title",
	"title_font_family",
	"title_font_size",
	"title_color",
	"card_background_color",
	"card_background_opacity",
	"line_width",
	"show_tools_button",
	"show_controls_toggle",
	"show_fullscreen_button",
	"show_line_mode_buttons",
	"show_card_export_button"
], hs = [
	"button_label",
	"button_icon",
	"button_show_name",
	"button_show_icon",
	"button_color",
	"button_hover_color",
	"button_hover_effect"
];
function gs(e) {
	return {
		entity: e.entity,
		...e.attribute !== void 0 && { attribute: Array.isArray(e.attribute) ? [...e.attribute] : e.attribute },
		...e.forced !== void 0 && { forced: e.forced },
		...e.label !== void 0 && { label: e.label },
		...e.color !== void 0 && { color: e.color },
		...e.unit !== void 0 && { unit: e.unit },
		...(e.group ?? e.scaleGroup) !== void 0 && { group: e.group ?? e.scaleGroup },
		...e.scaleMode !== void 0 && { scale_mode: e.scaleMode },
		...e.scaleMin !== void 0 && { scale_min: e.scaleMin },
		...e.scaleMax !== void 0 && { scale_max: e.scaleMax },
		...e.scalePreference !== void 0 && { scale_preference: e.scalePreference },
		...e.lineMode !== void 0 && { line_mode: e.lineMode },
		...e.lineWidth !== void 0 && { line_width: e.lineWidth },
		...e.showPoints !== void 0 && { show_points: e.showPoints },
		...e.pointRadius !== void 0 && { point_radius: e.pointRadius }
	};
}
function _s(e, t, n) {
	for (let r of n) {
		let n = t[r];
		n !== void 0 && (e[r] = Array.isArray(n) ? [...n] : typeof n == "object" && n ? { ...n } : n);
	}
}
function vs(e) {
	let t = fs({ type: e.type }), n = /* @__PURE__ */ new Set([
		"type",
		"series",
		"range_mode",
		"hours",
		"start_date",
		"end_date",
		"line_mode"
	]), r = { ...e };
	for (let [e, i] of Object.entries(r)) !n.has(e) && i === t[e] && delete r[e];
	return r;
}
function ys(e, t, n) {
	if (t.importedData) throw Error("Imported history data cannot be exported as a dashboard card.");
	let r = {
		type: n === "inline" ? as : ls,
		series: t.series.map(gs)
	};
	return t.range.mode === "relative" ? (r.range_mode = "relative", r.hours = t.range.hours) : (r.range_mode = "absolute", r.start_date = new Date(t.range.startDate.getTime()).toISOString(), r.end_date = new Date(t.range.endDate.getTime()).toISOString()), r.line_mode = t.lineMode, _s(r, e, ms), n === "button" && _s(r, e, hs), vs(r);
}
//#endregion
//#region node_modules/yaml/browser/dist/nodes/identity.js
var bs = Symbol.for("yaml.alias"), xs = Symbol.for("yaml.document"), Ss = Symbol.for("yaml.map"), Cs = Symbol.for("yaml.pair"), ws = Symbol.for("yaml.scalar"), Ts = Symbol.for("yaml.seq"), U = Symbol.for("yaml.node.type"), Es = (e) => !!e && typeof e == "object" && e[U] === bs, Ds = (e) => !!e && typeof e == "object" && e[U] === xs, Os = (e) => !!e && typeof e == "object" && e[U] === Ss, W = (e) => !!e && typeof e == "object" && e[U] === Cs, G = (e) => !!e && typeof e == "object" && e[U] === ws, ks = (e) => !!e && typeof e == "object" && e[U] === Ts;
function K(e) {
	if (e && typeof e == "object") switch (e[U]) {
		case Ss:
		case Ts: return !0;
	}
	return !1;
}
function q(e) {
	if (e && typeof e == "object") switch (e[U]) {
		case bs:
		case Ss:
		case ws:
		case Ts: return !0;
	}
	return !1;
}
var As = (e) => (G(e) || K(e)) && !!e.anchor, js = Symbol("break visit"), Ms = Symbol("skip children"), Ns = Symbol("remove node");
function Ps(e, t) {
	let n = Is(t);
	Ds(e) ? Fs(null, e.contents, n, Object.freeze([e])) === Ns && (e.contents = null) : Fs(null, e, n, Object.freeze([]));
}
Ps.BREAK = js, Ps.SKIP = Ms, Ps.REMOVE = Ns;
function Fs(e, t, n, r) {
	let i = Ls(e, t, n, r);
	if (q(i) || W(i)) return Rs(e, r, i), Fs(e, i, n, r);
	if (typeof i != "symbol") {
		if (K(t)) {
			r = Object.freeze(r.concat(t));
			for (let e = 0; e < t.items.length; ++e) {
				let i = Fs(e, t.items[e], n, r);
				if (typeof i == "number") e = i - 1;
				else if (i === js) return js;
				else i === Ns && (t.items.splice(e, 1), --e);
			}
		} else if (W(t)) {
			r = Object.freeze(r.concat(t));
			let e = Fs("key", t.key, n, r);
			if (e === js) return js;
			e === Ns && (t.key = null);
			let i = Fs("value", t.value, n, r);
			if (i === js) return js;
			i === Ns && (t.value = null);
		}
	}
	return i;
}
function Is(e) {
	return typeof e == "object" && (e.Collection || e.Node || e.Value) ? Object.assign({
		Alias: e.Node,
		Map: e.Node,
		Scalar: e.Node,
		Seq: e.Node
	}, e.Value && {
		Map: e.Value,
		Scalar: e.Value,
		Seq: e.Value
	}, e.Collection && {
		Map: e.Collection,
		Seq: e.Collection
	}, e) : e;
}
function Ls(e, t, n, r) {
	if (typeof n == "function") return n(e, t, r);
	if (Os(t)) return n.Map?.(e, t, r);
	if (ks(t)) return n.Seq?.(e, t, r);
	if (W(t)) return n.Pair?.(e, t, r);
	if (G(t)) return n.Scalar?.(e, t, r);
	if (Es(t)) return n.Alias?.(e, t, r);
}
function Rs(e, t, n) {
	let r = t[t.length - 1];
	if (K(r)) r.items[e] = n;
	else if (W(r)) e === "key" ? r.key = n : r.value = n;
	else if (Ds(r)) r.contents = n;
	else {
		let e = Es(r) ? "alias" : "scalar";
		throw Error(`Cannot replace node with ${e} parent`);
	}
}
//#endregion
//#region node_modules/yaml/browser/dist/doc/directives.js
var zs = {
	"!": "%21",
	",": "%2C",
	"[": "%5B",
	"]": "%5D",
	"{": "%7B",
	"}": "%7D"
}, Bs = (e) => e.replace(/[!,[\]{}]/g, (e) => zs[e]), Vs = class e {
	constructor(t, n) {
		this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, e.defaultYaml, t), this.tags = Object.assign({}, e.defaultTags, n);
	}
	clone() {
		let t = new e(this.yaml, this.tags);
		return t.docStart = this.docStart, t;
	}
	atDocument() {
		let t = new e(this.yaml, this.tags);
		switch (this.yaml.version) {
			case "1.1":
				this.atNextDocument = !0;
				break;
			case "1.2": this.atNextDocument = !1, this.yaml = {
				explicit: e.defaultYaml.explicit,
				version: "1.2"
			}, this.tags = Object.assign({}, e.defaultTags);
		}
		return t;
	}
	add(t, n) {
		this.atNextDocument &&= (this.yaml = {
			explicit: e.defaultYaml.explicit,
			version: "1.1"
		}, this.tags = Object.assign({}, e.defaultTags), !1);
		let r = t.trim().split(/[ \t]+/), i = r.shift();
		switch (i) {
			case "%TAG": {
				if (r.length !== 2 && (n(0, "%TAG directive should contain exactly two parts"), r.length < 2)) return !1;
				let [e, t] = r;
				return this.tags[e] = t, !0;
			}
			case "%YAML": {
				if (this.yaml.explicit = !0, r.length !== 1) return n(0, "%YAML directive should contain exactly one part"), !1;
				let [e] = r;
				if (e === "1.1" || e === "1.2") return this.yaml.version = e, !0;
				{
					let t = /^\d+\.\d+$/.test(e);
					return n(6, `Unsupported YAML version ${e}`, t), !1;
				}
			}
			default: return n(0, `Unknown directive ${i}`, !0), !1;
		}
	}
	tagName(e, t) {
		if (e === "!") return "!";
		if (e[0] !== "!") return t(`Not a valid tag: ${e}`), null;
		if (e[1] === "<") {
			let n = e.slice(2, -1);
			return n === "!" || n === "!!" ? (t(`Verbatim tags aren't resolved, so ${e} is invalid.`), null) : (e[e.length - 1] !== ">" && t("Verbatim tags must end with a >"), n);
		}
		let [, n, r] = e.match(/^(.*!)([^!]*)$/s);
		r || t(`The ${e} tag has no suffix`);
		let i = this.tags[n];
		if (i) try {
			return i + decodeURIComponent(r);
		} catch (e) {
			return t(String(e)), null;
		}
		return n === "!" ? e : (t(`Could not resolve tag: ${e}`), null);
	}
	tagString(e) {
		for (let [t, n] of Object.entries(this.tags)) if (e.startsWith(n)) return t + Bs(e.substring(n.length));
		return e[0] === "!" ? e : `!<${e}>`;
	}
	toString(e) {
		let t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], n = Object.entries(this.tags), r;
		if (e && n.length > 0 && q(e.contents)) {
			let t = {};
			Ps(e.contents, (e, n) => {
				q(n) && n.tag && (t[n.tag] = !0);
			}), r = Object.keys(t);
		} else r = [];
		for (let [i, a] of n) (i !== "!!" || a !== "tag:yaml.org,2002:") && (!e || r.some((e) => e.startsWith(a))) && t.push(`%TAG ${i} ${a}`);
		return t.join("\n");
	}
};
Vs.defaultYaml = {
	explicit: !1,
	version: "1.2"
}, Vs.defaultTags = { "!!": "tag:yaml.org,2002:" };
//#endregion
//#region node_modules/yaml/browser/dist/doc/anchors.js
function Hs(e) {
	if (/[\x00-\x19\s,[\]{}]/.test(e)) {
		let t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(e)}`;
		throw Error(t);
	}
	return !0;
}
function Us(e) {
	let t = /* @__PURE__ */ new Set();
	return Ps(e, { Value(e, n) {
		n.anchor && t.add(n.anchor);
	} }), t;
}
function Ws(e, t) {
	for (let n = 1;; ++n) {
		let r = `${e}${n}`;
		if (!t.has(r)) return r;
	}
}
function Gs(e, t) {
	let n = [], r = /* @__PURE__ */ new Map(), i = null;
	return {
		onAnchor: (r) => {
			n.push(r), i ??= Us(e);
			let a = Ws(t, i);
			return i.add(a), a;
		},
		setAnchors: () => {
			for (let e of n) {
				let t = r.get(e);
				if (typeof t == "object" && t.anchor && (G(t.node) || K(t.node))) t.node.anchor = t.anchor;
				else {
					let t = /* @__PURE__ */ Error("Failed to resolve repeated object (this should not happen)");
					throw t.source = e, t;
				}
			}
		},
		sourceObjects: r
	};
}
//#endregion
//#region node_modules/yaml/browser/dist/doc/applyReviver.js
function Ks(e, t, n, r) {
	if (r && typeof r == "object") {
		if (Array.isArray(r)) for (let t = 0, n = r.length; t < n; ++t) {
			let n = r[t], i = Ks(e, r, String(t), n);
			i === void 0 ? delete r[t] : i !== n && (r[t] = i);
		}
		else if (r instanceof Map) for (let t of Array.from(r.keys())) {
			let n = r.get(t), i = Ks(e, r, t, n);
			i === void 0 ? r.delete(t) : i !== n && r.set(t, i);
		}
		else if (r instanceof Set) for (let t of Array.from(r)) {
			let n = Ks(e, r, t, t);
			n === void 0 ? r.delete(t) : n !== t && (r.delete(t), r.add(n));
		}
		else for (let [t, n] of Object.entries(r)) {
			let i = Ks(e, r, t, n);
			i === void 0 ? delete r[t] : i !== n && (r[t] = i);
		}
	}
	return e.call(t, n, r);
}
//#endregion
//#region node_modules/yaml/browser/dist/nodes/toJS.js
function J(e, t, n) {
	if (Array.isArray(e)) return e.map((e, t) => J(e, String(t), n));
	if (e && typeof e.toJSON == "function") {
		if (!n || !As(e)) return e.toJSON(t, n);
		let r = {
			aliasCount: 0,
			count: 1,
			res: void 0
		};
		n.anchors.set(e, r), n.onCreate = (e) => {
			r.res = e, delete n.onCreate;
		};
		let i = e.toJSON(t, n);
		return n.onCreate && n.onCreate(i), i;
	}
	return typeof e == "bigint" && !n?.keep ? Number(e) : e;
}
//#endregion
//#region node_modules/yaml/browser/dist/nodes/Node.js
var qs = class {
	constructor(e) {
		Object.defineProperty(this, U, { value: e });
	}
	clone() {
		let e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
		return this.range && (e.range = this.range.slice()), e;
	}
	toJS(e, { mapAsMap: t, maxAliasCount: n, onAnchor: r, reviver: i } = {}) {
		if (!Ds(e)) throw TypeError("A document argument is required");
		let a = {
			anchors: /* @__PURE__ */ new Map(),
			doc: e,
			keep: !0,
			mapAsMap: t === !0,
			mapKeyWarned: !1,
			maxAliasCount: typeof n == "number" ? n : 100
		}, o = J(this, "", a);
		if (typeof r == "function") for (let { count: e, res: t } of a.anchors.values()) r(t, e);
		return typeof i == "function" ? Ks(i, { "": o }, "", o) : o;
	}
}, Js = class extends qs {
	constructor(e) {
		super(bs), this.source = e, Object.defineProperty(this, "tag", { set() {
			throw Error("Alias nodes cannot have tags");
		} });
	}
	resolve(e, t) {
		if (t?.maxAliasCount === 0) throw ReferenceError("Alias resolution is disabled");
		let n;
		t?.aliasResolveCache ? n = t.aliasResolveCache : (n = [], Ps(e, { Node: (e, t) => {
			(Es(t) || As(t)) && n.push(t);
		} }), t && (t.aliasResolveCache = n));
		let r;
		for (let e of n) {
			if (e === this) break;
			e.anchor === this.source && (r = e);
		}
		return r;
	}
	toJSON(e, t) {
		if (!t) return { source: this.source };
		let { anchors: n, doc: r, maxAliasCount: i } = t, a = this.resolve(r, t);
		if (!a) {
			let e = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
			throw ReferenceError(e);
		}
		let o = n.get(a);
		/* istanbul ignore if */
		if (o ||= (J(a, null, t), n.get(a)), o?.res === void 0) throw ReferenceError("This should not happen: Alias anchor was not resolved?");
		if (i >= 0 && (o.count += 1, o.aliasCount === 0 && (o.aliasCount = Ys(r, a, n)), o.count * o.aliasCount > i)) throw ReferenceError("Excessive alias count indicates a resource exhaustion attack");
		return o.res;
	}
	toString(e, t, n) {
		let r = `*${this.source}`;
		if (e) {
			if (Hs(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
				let e = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
				throw Error(e);
			}
			if (e.implicitKey) return `${r} `;
		}
		return r;
	}
};
function Ys(e, t, n) {
	if (Es(t)) {
		let r = t.resolve(e), i = n && r && n.get(r);
		return i ? i.count * i.aliasCount : 0;
	}
	if (K(t)) {
		let r = 0;
		for (let i of t.items) {
			let t = Ys(e, i, n);
			t > r && (r = t);
		}
		return r;
	}
	if (W(t)) {
		let r = Ys(e, t.key, n), i = Ys(e, t.value, n);
		return Math.max(r, i);
	}
	return 1;
}
//#endregion
//#region node_modules/yaml/browser/dist/nodes/Scalar.js
var Xs = (e) => !e || typeof e != "function" && typeof e != "object", Y = class extends qs {
	constructor(e) {
		super(ws), this.value = e;
	}
	toJSON(e, t) {
		return t?.keep ? this.value : J(this.value, e, t);
	}
	toString() {
		return String(this.value);
	}
};
Y.BLOCK_FOLDED = "BLOCK_FOLDED", Y.BLOCK_LITERAL = "BLOCK_LITERAL", Y.PLAIN = "PLAIN", Y.QUOTE_DOUBLE = "QUOTE_DOUBLE", Y.QUOTE_SINGLE = "QUOTE_SINGLE";
//#endregion
//#region node_modules/yaml/browser/dist/doc/createNode.js
var Zs = "tag:yaml.org,2002:";
function Qs(e, t, n) {
	if (t) {
		let e = n.filter((e) => e.tag === t), r = e.find((e) => !e.format) ?? e[0];
		if (!r) throw Error(`Tag ${t} not found`);
		return r;
	}
	return n.find((t) => t.identify?.(e) && !t.format);
}
function $s(e, t, n) {
	if (Ds(e) && (e = e.contents), q(e)) return e;
	if (W(e)) {
		let t = n.schema[Ss].createNode?.(n.schema, null, n);
		return t.items.push(e), t;
	}
	(e instanceof String || e instanceof Number || e instanceof Boolean || typeof BigInt < "u" && e instanceof BigInt) && (e = e.valueOf());
	let { aliasDuplicateObjects: r, onAnchor: i, onTagObj: a, schema: o, sourceObjects: s } = n, c;
	if (r && e && typeof e == "object") {
		if (c = s.get(e), c) return c.anchor ?? (c.anchor = i(e)), new Js(c.anchor);
		c = {
			anchor: null,
			node: null
		}, s.set(e, c);
	}
	t?.startsWith("!!") && (t = Zs + t.slice(2));
	let l = Qs(e, t, o.tags);
	if (!l) {
		if (e && typeof e.toJSON == "function" && (e = e.toJSON()), !e || typeof e != "object") {
			let t = new Y(e);
			return c && (c.node = t), t;
		}
		l = e instanceof Map ? o[Ss] : Symbol.iterator in Object(e) ? o[Ts] : o[Ss];
	}
	a && (a(l), delete n.onTagObj);
	let u = l?.createNode ? l.createNode(n.schema, e, n) : typeof l?.nodeClass?.from == "function" ? l.nodeClass.from(n.schema, e, n) : new Y(e);
	return t ? u.tag = t : l.default || (u.tag = l.tag), c && (c.node = u), u;
}
//#endregion
//#region node_modules/yaml/browser/dist/nodes/Collection.js
function ec(e, t, n) {
	let r = n;
	for (let e = t.length - 1; e >= 0; --e) {
		let n = t[e];
		if (typeof n == "number" && Number.isInteger(n) && n >= 0) {
			let e = [];
			e[n] = r, r = e;
		} else r = /* @__PURE__ */ new Map([[n, r]]);
	}
	return $s(r, void 0, {
		aliasDuplicateObjects: !1,
		keepUndefined: !1,
		onAnchor: () => {
			throw Error("This should not happen, please report a bug.");
		},
		schema: e,
		sourceObjects: /* @__PURE__ */ new Map()
	});
}
var tc = (e) => e == null || typeof e == "object" && !!e[Symbol.iterator]().next().done, nc = class extends qs {
	constructor(e, t) {
		super(e), Object.defineProperty(this, "schema", {
			value: t,
			configurable: !0,
			enumerable: !1,
			writable: !0
		});
	}
	clone(e) {
		let t = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
		return e && (t.schema = e), t.items = t.items.map((t) => q(t) || W(t) ? t.clone(e) : t), this.range && (t.range = this.range.slice()), t;
	}
	addIn(e, t) {
		if (tc(e)) this.add(t);
		else {
			let [n, ...r] = e, i = this.get(n, !0);
			if (K(i)) i.addIn(r, t);
			else if (i === void 0 && this.schema) this.set(n, ec(this.schema, r, t));
			else throw Error(`Expected YAML collection at ${n}. Remaining path: ${r}`);
		}
	}
	deleteIn(e) {
		let [t, ...n] = e;
		if (n.length === 0) return this.delete(t);
		let r = this.get(t, !0);
		if (K(r)) return r.deleteIn(n);
		throw Error(`Expected YAML collection at ${t}. Remaining path: ${n}`);
	}
	getIn(e, t) {
		let [n, ...r] = e, i = this.get(n, !0);
		return r.length === 0 ? !t && G(i) ? i.value : i : K(i) ? i.getIn(r, t) : void 0;
	}
	hasAllNullValues(e) {
		return this.items.every((t) => {
			if (!W(t)) return !1;
			let n = t.value;
			return n == null || e && G(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
		});
	}
	hasIn(e) {
		let [t, ...n] = e;
		if (n.length === 0) return this.has(t);
		let r = this.get(t, !0);
		return K(r) ? r.hasIn(n) : !1;
	}
	setIn(e, t) {
		let [n, ...r] = e;
		if (r.length === 0) this.set(n, t);
		else {
			let e = this.get(n, !0);
			if (K(e)) e.setIn(r, t);
			else if (e === void 0 && this.schema) this.set(n, ec(this.schema, r, t));
			else throw Error(`Expected YAML collection at ${n}. Remaining path: ${r}`);
		}
	}
}, rc = (e) => e.replace(/^(?!$)(?: $)?/gm, "#");
function X(e, t) {
	return /^\n+$/.test(e) ? e.substring(1) : t ? e.replace(/^(?! *$)/gm, t) : e;
}
var ic = (e, t, n) => e.endsWith("\n") ? X(n, t) : n.includes("\n") ? "\n" + X(n, t) : (e.endsWith(" ") ? "" : " ") + n, ac = "flow", oc = "block", sc = "quoted";
function cc(e, t, n = "flow", { indentAtStart: r, lineWidth: i = 80, minContentWidth: a = 20, onFold: o, onOverflow: s } = {}) {
	if (!i || i < 0) return e;
	i < a && (a = 0);
	let c = Math.max(1 + a, 1 + i - t.length);
	if (e.length <= c) return e;
	let l = [], u = {}, d = i - t.length;
	typeof r == "number" && (r > i - Math.max(2, a) ? l.push(0) : d = i - r);
	let f, p, m = !1, h = -1, g = -1, _ = -1;
	n === "block" && (h = lc(e, h, t.length), h !== -1 && (d = h + c));
	for (let r; r = e[h += 1];) {
		if (n === "quoted" && r === "\\") {
			switch (g = h, e[h + 1]) {
				case "x":
					h += 3;
					break;
				case "u":
					h += 5;
					break;
				case "U":
					h += 9;
					break;
				default: h += 1;
			}
			_ = h;
		}
		if (r === "\n") n === "block" && (h = lc(e, h, t.length)), d = h + t.length + c, f = void 0;
		else {
			if (r === " " && p && p !== " " && p !== "\n" && p !== "	") {
				let t = e[h + 1];
				t && t !== " " && t !== "\n" && t !== "	" && (f = h);
			}
			if (h >= d) {
				if (f) l.push(f), d = f + c, f = void 0;
				else if (n === "quoted") {
					for (; p === " " || p === "	";) p = r, r = e[h += 1], m = !0;
					let t = h > _ + 1 ? h - 2 : g - 1;
					if (u[t]) return e;
					l.push(t), u[t] = !0, d = t + c, f = void 0;
				} else m = !0;
			}
		}
		p = r;
	}
	if (m && s && s(), l.length === 0) return e;
	o && o();
	let v = e.slice(0, l[0]);
	for (let r = 0; r < l.length; ++r) {
		let i = l[r], a = l[r + 1] || e.length;
		i === 0 ? v = `\n${t}${e.slice(0, a)}` : (n === "quoted" && u[i] && (v += `${e[i]}\\`), v += `\n${t}${e.slice(i + 1, a)}`);
	}
	return v;
}
function lc(e, t, n) {
	let r = t, i = t + 1, a = e[i];
	for (; a === " " || a === "	";) if (t < i + n) a = e[++t];
	else {
		do
			a = e[++t];
		while (a && a !== "\n");
		r = t, i = t + 1, a = e[i];
	}
	return r;
}
//#endregion
//#region node_modules/yaml/browser/dist/stringify/stringifyString.js
var uc = (e, t) => ({
	indentAtStart: t ? e.indent.length : e.indentAtStart,
	lineWidth: e.options.lineWidth,
	minContentWidth: e.options.minContentWidth
}), dc = (e) => /^(%|---|\.\.\.)/m.test(e);
function fc(e, t, n) {
	if (!t || t < 0) return !1;
	let r = t - n, i = e.length;
	if (i <= r) return !1;
	for (let t = 0, n = 0; t < i; ++t) if (e[t] === "\n") {
		if (t - n > r) return !0;
		if (n = t + 1, i - n <= r) return !1;
	}
	return !0;
}
function pc(e, t) {
	let n = JSON.stringify(e);
	if (t.options.doubleQuotedAsJSON) return n;
	let { implicitKey: r } = t, i = t.options.doubleQuotedMinMultiLineLength, a = t.indent || (dc(e) ? "  " : ""), o = "", s = 0;
	for (let e = 0, t = n[e]; t; t = n[++e]) if (t === " " && n[e + 1] === "\\" && n[e + 2] === "n" && (o += n.slice(s, e) + "\\ ", e += 1, s = e, t = "\\"), t === "\\") switch (n[e + 1]) {
		case "u":
			{
				o += n.slice(s, e);
				let t = n.substr(e + 2, 4);
				switch (t) {
					case "0000":
						o += "\\0";
						break;
					case "0007":
						o += "\\a";
						break;
					case "000b":
						o += "\\v";
						break;
					case "001b":
						o += "\\e";
						break;
					case "0085":
						o += "\\N";
						break;
					case "00a0":
						o += "\\_";
						break;
					case "2028":
						o += "\\L";
						break;
					case "2029":
						o += "\\P";
						break;
					default: t.substr(0, 2) === "00" ? o += "\\x" + t.substr(2) : o += n.substr(e, 6);
				}
				e += 5, s = e + 1;
			}
			break;
		case "n":
			if (r || n[e + 2] === "\"" || n.length < i) e += 1;
			else {
				for (o += n.slice(s, e) + "\n\n"; n[e + 2] === "\\" && n[e + 3] === "n" && n[e + 4] !== "\"";) o += "\n", e += 2;
				o += a, n[e + 2] === " " && (o += "\\"), e += 1, s = e + 1;
			}
			break;
		default: e += 1;
	}
	return o = s ? o + n.slice(s) : n, r ? o : cc(o, a, sc, uc(t, !1));
}
function mc(e, t) {
	if (t.options.singleQuote === !1 || t.implicitKey && e.includes("\n") || /[ \t]\n|\n[ \t]/.test(e)) return pc(e, t);
	let n = t.indent || (dc(e) ? "  " : ""), r = "'" + e.replace(/'/g, "''").replace(/\n+/g, `$&\n${n}`) + "'";
	return t.implicitKey ? r : cc(r, n, ac, uc(t, !1));
}
function hc(e, t) {
	let { singleQuote: n } = t.options, r;
	if (n === !1) r = pc;
	else {
		let t = e.includes("\""), i = e.includes("'");
		r = t && !i ? mc : i && !t ? pc : n ? mc : pc;
	}
	return r(e, t);
}
var gc;
try {
	gc = /* @__PURE__ */ RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
} catch {
	gc = /\n+(?!\n|$)/g;
}
function _c({ comment: e, type: t, value: n }, r, i, a) {
	let { blockQuote: o, commentString: s, lineWidth: c } = r.options;
	if (!o || /\n[\t ]+$/.test(n)) return hc(n, r);
	let l = r.indent || (r.forceBlockIndent || dc(n) ? "  " : ""), u = o === "literal" ? !0 : o === "folded" || t === Y.BLOCK_FOLDED ? !1 : t === Y.BLOCK_LITERAL || !fc(n, c, l.length);
	if (!n) return u ? "|\n" : ">\n";
	let d, f;
	for (f = n.length; f > 0; --f) {
		let e = n[f - 1];
		if (e !== "\n" && e !== "	" && e !== " ") break;
	}
	let p = n.substring(f), m = p.indexOf("\n");
	m === -1 ? d = "-" : n === p || m !== p.length - 1 ? (d = "+", a && a()) : d = "", p &&= (n = n.slice(0, -p.length), p[p.length - 1] === "\n" && (p = p.slice(0, -1)), p.replace(gc, `$&${l}`));
	let h = !1, g, _ = -1;
	for (g = 0; g < n.length; ++g) {
		let e = n[g];
		if (e === " ") h = !0;
		else if (e === "\n") _ = g;
		else break;
	}
	let v = n.substring(0, _ < g ? _ + 1 : g);
	v &&= (n = n.substring(v.length), v.replace(/\n+/g, `$&${l}`));
	let y = (h ? l ? "2" : "1" : "") + d;
	if (e && (y += " " + s(e.replace(/ ?[\r\n]+/g, " ")), i && i()), !u) {
		let e = n.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${l}`), i = !1, a = uc(r, !0);
		o !== "folded" && t !== Y.BLOCK_FOLDED && (a.onOverflow = () => {
			i = !0;
		});
		let s = cc(`${v}${e}${p}`, l, oc, a);
		if (!i) return `>${y}\n${l}${s}`;
	}
	return n = n.replace(/\n+/g, `$&${l}`), `|${y}\n${l}${v}${n}${p}`;
}
function vc(e, t, n, r) {
	let { type: i, value: a } = e, { actualString: o, implicitKey: s, indent: c, indentStep: l, inFlow: u } = t;
	if (s && a.includes("\n") || u && /[[\]{},]/.test(a)) return hc(a, t);
	if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a)) return s || u || !a.includes("\n") ? hc(a, t) : _c(e, t, n, r);
	if (!s && !u && i !== Y.PLAIN && a.includes("\n")) return _c(e, t, n, r);
	if (dc(a)) {
		if (c === "") return t.forceBlockIndent = !0, _c(e, t, n, r);
		if (s && c === l) return hc(a, t);
	}
	let d = a.replace(/\n+/g, `$&\n${c}`);
	if (o) {
		let e = (e) => e.default && e.tag !== "tag:yaml.org,2002:str" && e.test?.test(d), { compat: n, tags: r } = t.doc.schema;
		if (r.some(e) || n?.some(e)) return hc(a, t);
	}
	return s ? d : cc(d, c, ac, uc(t, !1));
}
function yc(e, t, n, r) {
	let { implicitKey: i, inFlow: a } = t, o = typeof e.value == "string" ? e : Object.assign({}, e, { value: String(e.value) }), { type: s } = e;
	s !== Y.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (s = Y.QUOTE_DOUBLE);
	let c = (e) => {
		switch (e) {
			case Y.BLOCK_FOLDED:
			case Y.BLOCK_LITERAL: return i || a ? hc(o.value, t) : _c(o, t, n, r);
			case Y.QUOTE_DOUBLE: return pc(o.value, t);
			case Y.QUOTE_SINGLE: return mc(o.value, t);
			case Y.PLAIN: return vc(o, t, n, r);
			default: return null;
		}
	}, l = c(s);
	if (l === null) {
		let { defaultKeyType: e, defaultStringType: n } = t.options, r = i && e || n;
		if (l = c(r), l === null) throw Error(`Unsupported default string type ${r}`);
	}
	return l;
}
//#endregion
//#region node_modules/yaml/browser/dist/stringify/stringify.js
function bc(e, t) {
	let n = Object.assign({
		blockQuote: !0,
		commentString: rc,
		defaultKeyType: null,
		defaultStringType: "PLAIN",
		directives: null,
		doubleQuotedAsJSON: !1,
		doubleQuotedMinMultiLineLength: 40,
		falseStr: "false",
		flowCollectionPadding: !0,
		indentSeq: !0,
		lineWidth: 80,
		minContentWidth: 20,
		nullStr: "null",
		simpleKeys: !1,
		singleQuote: null,
		trailingComma: !1,
		trueStr: "true",
		verifyAliasOrder: !0
	}, e.schema.toStringOptions, t), r;
	switch (n.collectionStyle) {
		case "block":
			r = !1;
			break;
		case "flow":
			r = !0;
			break;
		default: r = null;
	}
	return {
		anchors: /* @__PURE__ */ new Set(),
		doc: e,
		flowCollectionPadding: n.flowCollectionPadding ? " " : "",
		indent: "",
		indentStep: typeof n.indent == "number" ? " ".repeat(n.indent) : "  ",
		inFlow: r,
		options: n
	};
}
function xc(e, t) {
	if (t.tag) {
		let n = e.filter((e) => e.tag === t.tag);
		if (n.length > 0) return n.find((e) => e.format === t.format) ?? n[0];
	}
	let n, r;
	if (G(t)) {
		r = t.value;
		let i = e.filter((e) => e.identify?.(r));
		if (i.length > 1) {
			let e = i.filter((e) => e.test);
			e.length > 0 && (i = e);
		}
		n = i.find((e) => e.format === t.format) ?? i.find((e) => !e.format);
	} else r = t, n = e.find((e) => e.nodeClass && r instanceof e.nodeClass);
	if (!n) {
		let e = r?.constructor?.name ?? (r === null ? "null" : typeof r);
		throw Error(`Tag not resolved for ${e} value`);
	}
	return n;
}
function Sc(e, t, { anchors: n, doc: r }) {
	if (!r.directives) return "";
	let i = [], a = (G(e) || K(e)) && e.anchor;
	a && Hs(a) && (n.add(a), i.push(`&${a}`));
	let o = e.tag ?? (t.default ? null : t.tag);
	return o && i.push(r.directives.tagString(o)), i.join(" ");
}
function Cc(e, t, n, r) {
	if (W(e)) return e.toString(t, n, r);
	if (Es(e)) {
		if (t.doc.directives) return e.toString(t);
		if (t.resolvedAliases?.has(e)) throw TypeError("Cannot stringify circular structure without alias nodes");
		t.resolvedAliases ? t.resolvedAliases.add(e) : t.resolvedAliases = /* @__PURE__ */ new Set([e]), e = e.resolve(t.doc);
	}
	let i, a = q(e) ? e : t.doc.createNode(e, { onTagObj: (e) => i = e });
	i ??= xc(t.doc.schema.tags, a);
	let o = Sc(a, i, t);
	o.length > 0 && (t.indentAtStart = (t.indentAtStart ?? 0) + o.length + 1);
	let s = typeof i.stringify == "function" ? i.stringify(a, t, n, r) : G(a) ? yc(a, t, n, r) : a.toString(t, n, r);
	return o ? G(a) || s[0] === "{" || s[0] === "[" ? `${o} ${s}` : `${o}\n${t.indent}${s}` : s;
}
//#endregion
//#region node_modules/yaml/browser/dist/stringify/stringifyPair.js
function wc({ key: e, value: t }, n, r, i) {
	let { allNullValues: a, doc: o, indent: s, indentStep: c, options: { commentString: l, indentSeq: u, simpleKeys: d } } = n, f = q(e) && e.comment || null;
	if (d) {
		if (f) throw Error("With simple keys, key nodes cannot have comments");
		if (K(e) || !q(e) && typeof e == "object") throw Error("With simple keys, collection cannot be used as a key value");
	}
	let p = !d && (!e || f && t == null && !n.inFlow || K(e) || (G(e) ? e.type === Y.BLOCK_FOLDED || e.type === Y.BLOCK_LITERAL : typeof e == "object"));
	n = Object.assign({}, n, {
		allNullValues: !1,
		implicitKey: !p && (d || !a),
		indent: s + c
	});
	let m = !1, h = !1, g = Cc(e, n, () => m = !0, () => h = !0);
	if (!p && !n.inFlow && g.length > 1024) {
		if (d) throw Error("With simple keys, single line scalar must not span more than 1024 characters");
		p = !0;
	}
	if (n.inFlow) {
		if (a || t == null) return m && r && r(), g === "" ? "?" : p ? `? ${g}` : g;
	} else if (a && !d || t == null && p) return g = `? ${g}`, f && !m ? g += ic(g, n.indent, l(f)) : h && i && i(), g;
	m && (f = null), p ? (f && (g += ic(g, n.indent, l(f))), g = `? ${g}\n${s}:`) : (g = `${g}:`, f && (g += ic(g, n.indent, l(f))));
	let _, v, y;
	q(t) ? (_ = !!t.spaceBefore, v = t.commentBefore, y = t.comment) : (_ = !1, v = null, y = null, t && typeof t == "object" && (t = o.createNode(t))), n.implicitKey = !1, !p && !f && G(t) && (n.indentAtStart = g.length + 1), h = !1, !u && c.length >= 2 && !n.inFlow && !p && ks(t) && !t.flow && !t.tag && !t.anchor && (n.indent = n.indent.substring(2));
	let b = !1, x = Cc(t, n, () => b = !0, () => h = !0), S = " ";
	if (f || _ || v) {
		if (S = _ ? "\n" : "", v) {
			let e = l(v);
			S += `\n${X(e, n.indent)}`;
		}
		x === "" && !n.inFlow ? S === "\n" && y && (S = "\n\n") : S += `\n${n.indent}`;
	} else if (!p && K(t)) {
		let e = x[0], r = x.indexOf("\n"), i = r !== -1, a = n.inFlow ?? t.flow ?? t.items.length === 0;
		if (i || !a) {
			let t = !1;
			if (i && (e === "&" || e === "!")) {
				let n = x.indexOf(" ");
				e === "&" && n !== -1 && n < r && x[n + 1] === "!" && (n = x.indexOf(" ", n + 1)), (n === -1 || r < n) && (t = !0);
			}
			t || (S = `\n${n.indent}`);
		}
	} else (x === "" || x[0] === "\n") && (S = "");
	return g += S + x, n.inFlow ? b && r && r() : y && !b ? g += ic(g, n.indent, l(y)) : h && i && i(), g;
}
//#endregion
//#region node_modules/yaml/browser/dist/log.js
function Tc(e, t) {
	(e === "debug" || e === "warn") && console.warn(t);
}
//#endregion
//#region node_modules/yaml/browser/dist/schema/yaml-1.1/merge.js
var Ec = "<<", Dc = {
	identify: (e) => e === Ec || typeof e == "symbol" && e.description === Ec,
	default: "key",
	tag: "tag:yaml.org,2002:merge",
	test: /^<<$/,
	resolve: () => Object.assign(new Y(Symbol(Ec)), { addToJSMap: kc }),
	stringify: () => Ec
}, Oc = (e, t) => (Dc.identify(t) || G(t) && (!t.type || t.type === Y.PLAIN) && Dc.identify(t.value)) && e?.doc.schema.tags.some((e) => e.tag === Dc.tag && e.default);
function kc(e, t, n) {
	let r = jc(e, n);
	if (ks(r)) for (let n of r.items) Ac(e, t, n);
	else if (Array.isArray(r)) for (let n of r) Ac(e, t, n);
	else Ac(e, t, r);
}
function Ac(e, t, n) {
	let r = jc(e, n);
	if (!Os(r)) throw Error("Merge sources must be maps or map aliases");
	let i = r.toJSON(null, e, Map);
	for (let [e, n] of i) t instanceof Map ? t.has(e) || t.set(e, n) : t instanceof Set ? t.add(e) : Object.prototype.hasOwnProperty.call(t, e) || Object.defineProperty(t, e, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
	return t;
}
function jc(e, t) {
	return e && Es(t) ? t.resolve(e.doc, e) : t;
}
//#endregion
//#region node_modules/yaml/browser/dist/nodes/addPairToJSMap.js
function Mc(e, t, { key: n, value: r }) {
	if (q(n) && n.addToJSMap) n.addToJSMap(e, t, r);
	else if (Oc(e, n)) kc(e, t, r);
	else {
		let i = J(n, "", e);
		if (t instanceof Map) t.set(i, J(r, i, e));
		else if (t instanceof Set) t.add(i);
		else {
			let a = Nc(n, i, e), o = J(r, a, e);
			a in t ? Object.defineProperty(t, a, {
				value: o,
				writable: !0,
				enumerable: !0,
				configurable: !0
			}) : t[a] = o;
		}
	}
	return t;
}
function Nc(e, t, n) {
	if (t === null) return "";
	if (typeof t != "object") return String(t);
	if (q(e) && n?.doc) {
		let t = bc(n.doc, {});
		t.anchors = /* @__PURE__ */ new Set();
		for (let e of n.anchors.keys()) t.anchors.add(e.anchor);
		t.inFlow = !0, t.inStringifyKey = !0;
		let r = e.toString(t);
		if (!n.mapKeyWarned) {
			let e = JSON.stringify(r);
			e.length > 40 && (e = e.substring(0, 36) + "...\""), Tc(n.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${e}. Set mapAsMap: true to use object keys.`), n.mapKeyWarned = !0;
		}
		return r;
	}
	return JSON.stringify(t);
}
//#endregion
//#region node_modules/yaml/browser/dist/nodes/Pair.js
function Pc(e, t, n) {
	return new Z($s(e, void 0, n), $s(t, void 0, n));
}
var Z = class e {
	constructor(e, t = null) {
		Object.defineProperty(this, U, { value: Cs }), this.key = e, this.value = t;
	}
	clone(t) {
		let { key: n, value: r } = this;
		return q(n) && (n = n.clone(t)), q(r) && (r = r.clone(t)), new e(n, r);
	}
	toJSON(e, t) {
		return Mc(t, t?.mapAsMap ? /* @__PURE__ */ new Map() : {}, this);
	}
	toString(e, t, n) {
		return e?.doc ? wc(this, e, t, n) : JSON.stringify(this);
	}
};
//#endregion
//#region node_modules/yaml/browser/dist/stringify/stringifyCollection.js
function Fc(e, t, n) {
	return (t.inFlow ?? e.flow ? Lc : Ic)(e, t, n);
}
function Ic({ comment: e, items: t }, n, { blockItemPrefix: r, flowChars: i, itemIndent: a, onChompKeep: o, onComment: s }) {
	let { indent: c, options: { commentString: l } } = n, u = Object.assign({}, n, {
		indent: a,
		type: null
	}), d = !1, f = [];
	for (let e = 0; e < t.length; ++e) {
		let i = t[e], o = null;
		if (q(i)) !d && i.spaceBefore && f.push(""), Rc(n, f, i.commentBefore, d), i.comment && (o = i.comment);
		else if (W(i)) {
			let e = q(i.key) ? i.key : null;
			e && (!d && e.spaceBefore && f.push(""), Rc(n, f, e.commentBefore, d));
		}
		d = !1;
		let s = Cc(i, u, () => o = null, () => d = !0);
		o && (s += ic(s, a, l(o))), d && o && (d = !1), f.push(r + s);
	}
	let p;
	if (f.length === 0) p = i.start + i.end;
	else {
		p = f[0];
		for (let e = 1; e < f.length; ++e) {
			let t = f[e];
			p += t ? `\n${c}${t}` : "\n";
		}
	}
	return e ? (p += "\n" + X(l(e), c), s && s()) : d && o && o(), p;
}
function Lc({ items: e }, t, { flowChars: n, itemIndent: r }) {
	let { indent: i, indentStep: a, flowCollectionPadding: o, options: { commentString: s } } = t;
	r += a;
	let c = Object.assign({}, t, {
		indent: r,
		inFlow: !0,
		type: null
	}), l = !1, u = 0, d = [];
	for (let n = 0; n < e.length; ++n) {
		let i = e[n], a = null;
		if (q(i)) i.spaceBefore && d.push(""), Rc(t, d, i.commentBefore, !1), i.comment && (a = i.comment);
		else if (W(i)) {
			let e = q(i.key) ? i.key : null;
			e && (e.spaceBefore && d.push(""), Rc(t, d, e.commentBefore, !1), e.comment && (l = !0));
			let n = q(i.value) ? i.value : null;
			n ? (n.comment && (a = n.comment), n.commentBefore && (l = !0)) : i.value == null && e?.comment && (a = e.comment);
		}
		a && (l = !0);
		let o = Cc(i, c, () => a = null);
		l ||= d.length > u || o.includes("\n"), n < e.length - 1 ? o += "," : t.options.trailingComma && (t.options.lineWidth > 0 && (l ||= d.reduce((e, t) => e + t.length + 2, 2) + (o.length + 2) > t.options.lineWidth), l && (o += ",")), a && (o += ic(o, r, s(a))), d.push(o), u = d.length;
	}
	let { start: f, end: p } = n;
	if (d.length === 0) return f + p;
	if (!l) {
		let e = d.reduce((e, t) => e + t.length + 2, 2);
		l = t.options.lineWidth > 0 && e > t.options.lineWidth;
	}
	if (l) {
		let e = f;
		for (let t of d) e += t ? `\n${a}${i}${t}` : "\n";
		return `${e}\n${i}${p}`;
	}
	return `${f}${o}${d.join(" ")}${o}${p}`;
}
function Rc({ indent: e, options: { commentString: t } }, n, r, i) {
	if (r && i && (r = r.replace(/^\n+/, "")), r) {
		let i = X(t(r), e);
		n.push(i.trimStart());
	}
}
//#endregion
//#region node_modules/yaml/browser/dist/nodes/YAMLMap.js
function zc(e, t) {
	let n = G(t) ? t.value : t;
	for (let r of e) if (W(r) && (r.key === t || r.key === n || G(r.key) && r.key.value === n)) return r;
}
var Bc = class extends nc {
	static get tagName() {
		return "tag:yaml.org,2002:map";
	}
	constructor(e) {
		super(Ss, e), this.items = [];
	}
	static from(e, t, n) {
		let { keepUndefined: r, replacer: i } = n, a = new this(e), o = (e, o) => {
			if (typeof i == "function") o = i.call(t, e, o);
			else if (Array.isArray(i) && !i.includes(e)) return;
			(o !== void 0 || r) && a.items.push(Pc(e, o, n));
		};
		if (t instanceof Map) for (let [e, n] of t) o(e, n);
		else if (t && typeof t == "object") for (let e of Object.keys(t)) o(e, t[e]);
		return typeof e.sortMapEntries == "function" && a.items.sort(e.sortMapEntries), a;
	}
	add(e, t) {
		let n;
		n = W(e) ? e : !e || typeof e != "object" || !("key" in e) ? new Z(e, e?.value) : new Z(e.key, e.value);
		let r = zc(this.items, n.key), i = this.schema?.sortMapEntries;
		if (r) {
			if (!t) throw Error(`Key ${n.key} already set`);
			G(r.value) && Xs(n.value) ? r.value.value = n.value : r.value = n.value;
		} else if (i) {
			let e = this.items.findIndex((e) => i(n, e) < 0);
			e === -1 ? this.items.push(n) : this.items.splice(e, 0, n);
		} else this.items.push(n);
	}
	delete(e) {
		let t = zc(this.items, e);
		return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
	}
	get(e, t) {
		let n = zc(this.items, e)?.value;
		return (!t && G(n) ? n.value : n) ?? void 0;
	}
	has(e) {
		return !!zc(this.items, e);
	}
	set(e, t) {
		this.add(new Z(e, t), !0);
	}
	toJSON(e, t, n) {
		let r = n ? new n() : t?.mapAsMap ? /* @__PURE__ */ new Map() : {};
		t?.onCreate && t.onCreate(r);
		for (let e of this.items) Mc(t, r, e);
		return r;
	}
	toString(e, t, n) {
		if (!e) return JSON.stringify(this);
		for (let e of this.items) if (!W(e)) throw Error(`Map items must all be pairs; found ${JSON.stringify(e)} instead`);
		return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), Fc(this, e, {
			blockItemPrefix: "",
			flowChars: {
				start: "{",
				end: "}"
			},
			itemIndent: e.indent || "",
			onChompKeep: n,
			onComment: t
		});
	}
}, Vc = {
	collection: "map",
	default: !0,
	nodeClass: Bc,
	tag: "tag:yaml.org,2002:map",
	resolve(e, t) {
		return Os(e) || t("Expected a mapping for this tag"), e;
	},
	createNode: (e, t, n) => Bc.from(e, t, n)
}, Hc = class extends nc {
	static get tagName() {
		return "tag:yaml.org,2002:seq";
	}
	constructor(e) {
		super(Ts, e), this.items = [];
	}
	add(e) {
		this.items.push(e);
	}
	delete(e) {
		let t = Uc(e);
		return typeof t == "number" && this.items.splice(t, 1).length > 0;
	}
	get(e, t) {
		let n = Uc(e);
		if (typeof n != "number") return;
		let r = this.items[n];
		return !t && G(r) ? r.value : r;
	}
	has(e) {
		let t = Uc(e);
		return typeof t == "number" && t < this.items.length;
	}
	set(e, t) {
		let n = Uc(e);
		if (typeof n != "number") throw Error(`Expected a valid index, not ${e}.`);
		let r = this.items[n];
		G(r) && Xs(t) ? r.value = t : this.items[n] = t;
	}
	toJSON(e, t) {
		let n = [];
		t?.onCreate && t.onCreate(n);
		let r = 0;
		for (let e of this.items) n.push(J(e, String(r++), t));
		return n;
	}
	toString(e, t, n) {
		return e ? Fc(this, e, {
			blockItemPrefix: "- ",
			flowChars: {
				start: "[",
				end: "]"
			},
			itemIndent: (e.indent || "") + "  ",
			onChompKeep: n,
			onComment: t
		}) : JSON.stringify(this);
	}
	static from(e, t, n) {
		let { replacer: r } = n, i = new this(e);
		if (t && Symbol.iterator in Object(t)) {
			let e = 0;
			for (let a of t) {
				if (typeof r == "function") {
					let n = t instanceof Set ? a : String(e++);
					a = r.call(t, n, a);
				}
				i.items.push($s(a, void 0, n));
			}
		}
		return i;
	}
};
function Uc(e) {
	let t = G(e) ? e.value : e;
	return t && typeof t == "string" && (t = Number(t)), typeof t == "number" && Number.isInteger(t) && t >= 0 ? t : null;
}
//#endregion
//#region node_modules/yaml/browser/dist/schema/common/seq.js
var Wc = {
	collection: "seq",
	default: !0,
	nodeClass: Hc,
	tag: "tag:yaml.org,2002:seq",
	resolve(e, t) {
		return ks(e) || t("Expected a sequence for this tag"), e;
	},
	createNode: (e, t, n) => Hc.from(e, t, n)
}, Gc = {
	identify: (e) => typeof e == "string",
	default: !0,
	tag: "tag:yaml.org,2002:str",
	resolve: (e) => e,
	stringify(e, t, n, r) {
		return t = Object.assign({ actualString: !0 }, t), yc(e, t, n, r);
	}
}, Kc = {
	identify: (e) => e == null,
	createNode: () => new Y(null),
	default: !0,
	tag: "tag:yaml.org,2002:null",
	test: /^(?:~|[Nn]ull|NULL)?$/,
	resolve: () => new Y(null),
	stringify: ({ source: e }, t) => typeof e == "string" && Kc.test.test(e) ? e : t.options.nullStr
}, qc = {
	identify: (e) => typeof e == "boolean",
	default: !0,
	tag: "tag:yaml.org,2002:bool",
	test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
	resolve: (e) => new Y(e[0] === "t" || e[0] === "T"),
	stringify({ source: e, value: t }, n) {
		return e && qc.test.test(e) && t === (e[0] === "t" || e[0] === "T") ? e : t ? n.options.trueStr : n.options.falseStr;
	}
};
//#endregion
//#region node_modules/yaml/browser/dist/stringify/stringifyNumber.js
function Q({ format: e, minFractionDigits: t, tag: n, value: r }) {
	if (typeof r == "bigint") return String(r);
	let i = typeof r == "number" ? r : Number(r);
	if (!isFinite(i)) return isNaN(i) ? ".nan" : i < 0 ? "-.inf" : ".inf";
	let a = Object.is(r, -0) ? "-0" : JSON.stringify(r);
	if (!e && t && (!n || n === "tag:yaml.org,2002:float") && /^-?\d/.test(a) && !a.includes("e")) {
		let e = a.indexOf(".");
		e < 0 && (e = a.length, a += ".");
		let n = t - (a.length - e - 1);
		for (; n-- > 0;) a += "0";
	}
	return a;
}
//#endregion
//#region node_modules/yaml/browser/dist/schema/core/float.js
var Jc = {
	identify: (e) => typeof e == "number",
	default: !0,
	tag: "tag:yaml.org,2002:float",
	test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
	resolve: (e) => e.slice(-3).toLowerCase() === "nan" ? NaN : e[0] === "-" ? -Infinity : Infinity,
	stringify: Q
}, Yc = {
	identify: (e) => typeof e == "number",
	default: !0,
	tag: "tag:yaml.org,2002:float",
	format: "EXP",
	test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
	resolve: (e) => parseFloat(e),
	stringify(e) {
		let t = Number(e.value);
		return isFinite(t) ? t.toExponential() : Q(e);
	}
}, Xc = {
	identify: (e) => typeof e == "number",
	default: !0,
	tag: "tag:yaml.org,2002:float",
	test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
	resolve(e) {
		let t = new Y(parseFloat(e)), n = e.indexOf(".");
		return n !== -1 && e[e.length - 1] === "0" && (t.minFractionDigits = e.length - n - 1), t;
	},
	stringify: Q
}, Zc = (e) => typeof e == "bigint" || Number.isInteger(e), Qc = (e, t, n, { intAsBigInt: r }) => r ? BigInt(e) : parseInt(e.substring(t), n);
function $c(e, t, n) {
	let { value: r } = e;
	return Zc(r) && r >= 0 ? n + r.toString(t) : Q(e);
}
var el = {
	identify: (e) => Zc(e) && e >= 0,
	default: !0,
	tag: "tag:yaml.org,2002:int",
	format: "OCT",
	test: /^0o[0-7]+$/,
	resolve: (e, t, n) => Qc(e, 2, 8, n),
	stringify: (e) => $c(e, 8, "0o")
}, tl = {
	identify: Zc,
	default: !0,
	tag: "tag:yaml.org,2002:int",
	test: /^[-+]?[0-9]+$/,
	resolve: (e, t, n) => Qc(e, 0, 10, n),
	stringify: Q
}, nl = {
	identify: (e) => Zc(e) && e >= 0,
	default: !0,
	tag: "tag:yaml.org,2002:int",
	format: "HEX",
	test: /^0x[0-9a-fA-F]+$/,
	resolve: (e, t, n) => Qc(e, 2, 16, n),
	stringify: (e) => $c(e, 16, "0x")
}, rl = [
	Vc,
	Wc,
	Gc,
	Kc,
	qc,
	el,
	tl,
	nl,
	Jc,
	Yc,
	Xc
];
//#endregion
//#region node_modules/yaml/browser/dist/schema/json/schema.js
function il(e) {
	return typeof e == "bigint" || Number.isInteger(e);
}
var al = ({ value: e }) => JSON.stringify(e), ol = [
	{
		identify: (e) => typeof e == "string",
		default: !0,
		tag: "tag:yaml.org,2002:str",
		resolve: (e) => e,
		stringify: al
	},
	{
		identify: (e) => e == null,
		createNode: () => new Y(null),
		default: !0,
		tag: "tag:yaml.org,2002:null",
		test: /^null$/,
		resolve: () => null,
		stringify: al
	},
	{
		identify: (e) => typeof e == "boolean",
		default: !0,
		tag: "tag:yaml.org,2002:bool",
		test: /^true$|^false$/,
		resolve: (e) => e === "true",
		stringify: al
	},
	{
		identify: il,
		default: !0,
		tag: "tag:yaml.org,2002:int",
		test: /^-?(?:0|[1-9][0-9]*)$/,
		resolve: (e, t, { intAsBigInt: n }) => n ? BigInt(e) : parseInt(e, 10),
		stringify: ({ value: e }) => il(e) ? e.toString() : JSON.stringify(e)
	},
	{
		identify: (e) => typeof e == "number",
		default: !0,
		tag: "tag:yaml.org,2002:float",
		test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
		resolve: (e) => parseFloat(e),
		stringify: al
	}
], sl = [Vc, Wc].concat(ol, {
	default: !0,
	tag: "",
	test: /^/,
	resolve(e, t) {
		return t(`Unresolved plain scalar ${JSON.stringify(e)}`), e;
	}
}), cl = {
	identify: (e) => e instanceof Uint8Array,
	default: !1,
	tag: "tag:yaml.org,2002:binary",
	resolve(e, t) {
		if (typeof atob == "function") {
			let t = atob(e.replace(/[\n\r]/g, "")), n = new Uint8Array(t.length);
			for (let e = 0; e < t.length; ++e) n[e] = t.charCodeAt(e);
			return n;
		}
		return t("This environment does not support reading binary tags; either Buffer or atob is required"), e;
	},
	stringify({ comment: e, type: t, value: n }, r, i, a) {
		if (!n) return "";
		let o = n, s;
		if (typeof btoa == "function") {
			let e = "";
			for (let t = 0; t < o.length; ++t) e += String.fromCharCode(o[t]);
			s = btoa(e);
		} else throw Error("This environment does not support writing binary tags; either Buffer or btoa is required");
		if (t ??= Y.BLOCK_LITERAL, t !== Y.QUOTE_DOUBLE) {
			let e = Math.max(r.options.lineWidth - r.indent.length, r.options.minContentWidth), n = Math.ceil(s.length / e), i = Array(n);
			for (let t = 0, r = 0; t < n; ++t, r += e) i[t] = s.substr(r, e);
			s = i.join(t === Y.BLOCK_LITERAL ? "\n" : " ");
		}
		return yc({
			comment: e,
			type: t,
			value: s
		}, r, i, a);
	}
};
//#endregion
//#region node_modules/yaml/browser/dist/schema/yaml-1.1/pairs.js
function ll(e, t) {
	if (ks(e)) for (let n = 0; n < e.items.length; ++n) {
		let r = e.items[n];
		if (!W(r)) {
			if (Os(r)) {
				r.items.length > 1 && t("Each pair must have its own sequence indicator");
				let e = r.items[0] || new Z(new Y(null));
				if (r.commentBefore && (e.key.commentBefore = e.key.commentBefore ? `${r.commentBefore}\n${e.key.commentBefore}` : r.commentBefore), r.comment) {
					let t = e.value ?? e.key;
					t.comment = t.comment ? `${r.comment}\n${t.comment}` : r.comment;
				}
				r = e;
			}
			e.items[n] = W(r) ? r : new Z(r);
		}
	}
	else t("Expected a sequence for this tag");
	return e;
}
function ul(e, t, n) {
	let { replacer: r } = n, i = new Hc(e);
	i.tag = "tag:yaml.org,2002:pairs";
	let a = 0;
	if (t && Symbol.iterator in Object(t)) for (let e of t) {
		typeof r == "function" && (e = r.call(t, String(a++), e));
		let o, s;
		if (Array.isArray(e)) {
			if (e.length === 2) o = e[0], s = e[1];
			else throw TypeError(`Expected [key, value] tuple: ${e}`);
		} else if (e && e instanceof Object) {
			let t = Object.keys(e);
			if (t.length === 1) o = t[0], s = e[o];
			else throw TypeError(`Expected tuple with one key, not ${t.length} keys`);
		} else o = e;
		i.items.push(Pc(o, s, n));
	}
	return i;
}
var dl = {
	collection: "seq",
	default: !1,
	tag: "tag:yaml.org,2002:pairs",
	resolve: ll,
	createNode: ul
}, fl = class e extends Hc {
	constructor() {
		super(), this.add = Bc.prototype.add.bind(this), this.delete = Bc.prototype.delete.bind(this), this.get = Bc.prototype.get.bind(this), this.has = Bc.prototype.has.bind(this), this.set = Bc.prototype.set.bind(this), this.tag = e.tag;
	}
	toJSON(e, t) {
		if (!t) return super.toJSON(e);
		let n = /* @__PURE__ */ new Map();
		t?.onCreate && t.onCreate(n);
		for (let e of this.items) {
			let r, i;
			if (W(e) ? (r = J(e.key, "", t), i = J(e.value, r, t)) : r = J(e, "", t), n.has(r)) throw Error("Ordered maps must not include duplicate keys");
			n.set(r, i);
		}
		return n;
	}
	static from(e, t, n) {
		let r = ul(e, t, n), i = new this();
		return i.items = r.items, i;
	}
};
fl.tag = "tag:yaml.org,2002:omap";
var pl = {
	collection: "seq",
	identify: (e) => e instanceof Map,
	nodeClass: fl,
	default: !1,
	tag: "tag:yaml.org,2002:omap",
	resolve(e, t) {
		let n = ll(e, t), r = [];
		for (let { key: e } of n.items) G(e) && (r.includes(e.value) ? t(`Ordered maps must not include duplicate keys: ${e.value}`) : r.push(e.value));
		return Object.assign(new fl(), n);
	},
	createNode: (e, t, n) => fl.from(e, t, n)
};
//#endregion
//#region node_modules/yaml/browser/dist/schema/yaml-1.1/bool.js
function ml({ value: e, source: t }, n) {
	return t && (e ? hl : gl).test.test(t) ? t : e ? n.options.trueStr : n.options.falseStr;
}
var hl = {
	identify: (e) => e === !0,
	default: !0,
	tag: "tag:yaml.org,2002:bool",
	test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
	resolve: () => new Y(!0),
	stringify: ml
}, gl = {
	identify: (e) => e === !1,
	default: !0,
	tag: "tag:yaml.org,2002:bool",
	test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
	resolve: () => new Y(!1),
	stringify: ml
}, _l = {
	identify: (e) => typeof e == "number",
	default: !0,
	tag: "tag:yaml.org,2002:float",
	test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
	resolve: (e) => e.slice(-3).toLowerCase() === "nan" ? NaN : e[0] === "-" ? -Infinity : Infinity,
	stringify: Q
}, vl = {
	identify: (e) => typeof e == "number",
	default: !0,
	tag: "tag:yaml.org,2002:float",
	format: "EXP",
	test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
	resolve: (e) => parseFloat(e.replace(/_/g, "")),
	stringify(e) {
		let t = Number(e.value);
		return isFinite(t) ? t.toExponential() : Q(e);
	}
}, yl = {
	identify: (e) => typeof e == "number",
	default: !0,
	tag: "tag:yaml.org,2002:float",
	test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
	resolve(e) {
		let t = new Y(parseFloat(e.replace(/_/g, ""))), n = e.indexOf(".");
		if (n !== -1) {
			let r = e.substring(n + 1).replace(/_/g, "");
			r[r.length - 1] === "0" && (t.minFractionDigits = r.length);
		}
		return t;
	},
	stringify: Q
}, bl = (e) => typeof e == "bigint" || Number.isInteger(e);
function xl(e, t, n, { intAsBigInt: r }) {
	let i = e[0];
	if ((i === "-" || i === "+") && (t += 1), e = e.substring(t).replace(/_/g, ""), r) {
		switch (n) {
			case 2:
				e = `0b${e}`;
				break;
			case 8:
				e = `0o${e}`;
				break;
			case 16: e = `0x${e}`;
		}
		let t = BigInt(e);
		return i === "-" ? BigInt(-1) * t : t;
	}
	let a = parseInt(e, n);
	return i === "-" ? -1 * a : a;
}
function Sl(e, t, n) {
	let { value: r } = e;
	if (bl(r)) {
		let e = r.toString(t);
		return r < 0 ? "-" + n + e.substr(1) : n + e;
	}
	return Q(e);
}
var Cl = {
	identify: bl,
	default: !0,
	tag: "tag:yaml.org,2002:int",
	format: "BIN",
	test: /^[-+]?0b[0-1_]+$/,
	resolve: (e, t, n) => xl(e, 2, 2, n),
	stringify: (e) => Sl(e, 2, "0b")
}, wl = {
	identify: bl,
	default: !0,
	tag: "tag:yaml.org,2002:int",
	format: "OCT",
	test: /^[-+]?0[0-7_]+$/,
	resolve: (e, t, n) => xl(e, 1, 8, n),
	stringify: (e) => Sl(e, 8, "0")
}, Tl = {
	identify: bl,
	default: !0,
	tag: "tag:yaml.org,2002:int",
	test: /^[-+]?[0-9][0-9_]*$/,
	resolve: (e, t, n) => xl(e, 0, 10, n),
	stringify: Q
}, El = {
	identify: bl,
	default: !0,
	tag: "tag:yaml.org,2002:int",
	format: "HEX",
	test: /^[-+]?0x[0-9a-fA-F_]+$/,
	resolve: (e, t, n) => xl(e, 2, 16, n),
	stringify: (e) => Sl(e, 16, "0x")
}, Dl = class e extends Bc {
	constructor(t) {
		super(t), this.tag = e.tag;
	}
	add(e) {
		let t;
		t = W(e) ? e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? new Z(e.key, null) : new Z(e, null), zc(this.items, t.key) || this.items.push(t);
	}
	get(e, t) {
		let n = zc(this.items, e);
		return !t && W(n) ? G(n.key) ? n.key.value : n.key : n;
	}
	set(e, t) {
		if (typeof t != "boolean") throw Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
		let n = zc(this.items, e);
		n && !t ? this.items.splice(this.items.indexOf(n), 1) : !n && t && this.items.push(new Z(e));
	}
	toJSON(e, t) {
		return super.toJSON(e, t, Set);
	}
	toString(e, t, n) {
		if (!e) return JSON.stringify(this);
		if (this.hasAllNullValues(!0)) return super.toString(Object.assign({}, e, { allNullValues: !0 }), t, n);
		throw Error("Set items must all have null values");
	}
	static from(e, t, n) {
		let { replacer: r } = n, i = new this(e);
		if (t && Symbol.iterator in Object(t)) for (let e of t) typeof r == "function" && (e = r.call(t, e, e)), i.items.push(Pc(e, null, n));
		return i;
	}
};
Dl.tag = "tag:yaml.org,2002:set";
var Ol = {
	collection: "map",
	identify: (e) => e instanceof Set,
	nodeClass: Dl,
	default: !1,
	tag: "tag:yaml.org,2002:set",
	createNode: (e, t, n) => Dl.from(e, t, n),
	resolve(e, t) {
		if (Os(e)) {
			if (e.hasAllNullValues(!0)) return Object.assign(new Dl(), e);
			t("Set items must all have null values");
		} else t("Expected a mapping for this tag");
		return e;
	}
};
//#endregion
//#region node_modules/yaml/browser/dist/schema/yaml-1.1/timestamp.js
function kl(e, t) {
	let n = e[0], r = n === "-" || n === "+" ? e.substring(1) : e, i = (e) => t ? BigInt(e) : Number(e), a = r.replace(/_/g, "").split(":").reduce((e, t) => e * i(60) + i(t), i(0));
	return n === "-" ? i(-1) * a : a;
}
function Al(e) {
	let { value: t } = e, n = (e) => e;
	if (typeof t == "bigint") n = (e) => BigInt(e);
	else if (isNaN(t) || !isFinite(t)) return Q(e);
	let r = "";
	t < 0 && (r = "-", t *= n(-1));
	let i = n(60), a = [t % i];
	return t < 60 ? a.unshift(0) : (t = (t - a[0]) / i, a.unshift(t % i), t >= 60 && (t = (t - a[0]) / i, a.unshift(t))), r + a.map((e) => String(e).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
var jl = {
	identify: (e) => typeof e == "bigint" || Number.isInteger(e),
	default: !0,
	tag: "tag:yaml.org,2002:int",
	format: "TIME",
	test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
	resolve: (e, t, { intAsBigInt: n }) => kl(e, n),
	stringify: Al
}, Ml = {
	identify: (e) => typeof e == "number",
	default: !0,
	tag: "tag:yaml.org,2002:float",
	format: "TIME",
	test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
	resolve: (e) => kl(e, !1),
	stringify: Al
}, Nl = {
	identify: (e) => e instanceof Date,
	default: !0,
	tag: "tag:yaml.org,2002:timestamp",
	test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
	resolve(e) {
		let t = e.match(Nl.test);
		if (!t) throw Error("!!timestamp expects a date, starting with yyyy-mm-dd");
		let [, n, r, i, a, o, s] = t.map(Number), c = t[7] ? Number((t[7] + "00").substr(1, 3)) : 0, l = Date.UTC(n, r - 1, i, a || 0, o || 0, s || 0, c), u = t[8];
		if (u && u !== "Z") {
			let e = kl(u, !1);
			Math.abs(e) < 30 && (e *= 60), l -= 6e4 * e;
		}
		return new Date(l);
	},
	stringify: ({ value: e }) => e?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
}, Pl = [
	Vc,
	Wc,
	Gc,
	Kc,
	hl,
	gl,
	Cl,
	wl,
	Tl,
	El,
	_l,
	vl,
	yl,
	cl,
	Dc,
	pl,
	dl,
	Ol,
	jl,
	Ml,
	Nl
], Fl = /* @__PURE__ */ new Map([
	["core", rl],
	["failsafe", [
		Vc,
		Wc,
		Gc
	]],
	["json", sl],
	["yaml11", Pl],
	["yaml-1.1", Pl]
]), Il = {
	binary: cl,
	bool: qc,
	float: Xc,
	floatExp: Yc,
	floatNaN: Jc,
	floatTime: Ml,
	int: tl,
	intHex: nl,
	intOct: el,
	intTime: jl,
	map: Vc,
	merge: Dc,
	null: Kc,
	omap: pl,
	pairs: dl,
	seq: Wc,
	set: Ol,
	timestamp: Nl
}, Ll = {
	"tag:yaml.org,2002:binary": cl,
	"tag:yaml.org,2002:merge": Dc,
	"tag:yaml.org,2002:omap": pl,
	"tag:yaml.org,2002:pairs": dl,
	"tag:yaml.org,2002:set": Ol,
	"tag:yaml.org,2002:timestamp": Nl
};
function Rl(e, t, n) {
	let r = Fl.get(t);
	if (r && !e) return n && !r.includes(Dc) ? r.concat(Dc) : r.slice();
	let i = r;
	if (!i) {
		if (Array.isArray(e)) i = [];
		else {
			let e = Array.from(Fl.keys()).filter((e) => e !== "yaml11").map((e) => JSON.stringify(e)).join(", ");
			throw Error(`Unknown schema "${t}"; use one of ${e} or define customTags array`);
		}
	}
	if (Array.isArray(e)) for (let t of e) i = i.concat(t);
	else typeof e == "function" && (i = e(i.slice()));
	return n && (i = i.concat(Dc)), i.reduce((e, t) => {
		let n = typeof t == "string" ? Il[t] : t;
		if (!n) {
			let e = JSON.stringify(t), n = Object.keys(Il).map((e) => JSON.stringify(e)).join(", ");
			throw Error(`Unknown custom tag ${e}; use one of ${n}`);
		}
		return e.includes(n) || e.push(n), e;
	}, []);
}
//#endregion
//#region node_modules/yaml/browser/dist/schema/Schema.js
var zl = (e, t) => e.key < t.key ? -1 : +(e.key > t.key), Bl = class e {
	constructor({ compat: e, customTags: t, merge: n, resolveKnownTags: r, schema: i, sortMapEntries: a, toStringDefaults: o }) {
		this.compat = Array.isArray(e) ? Rl(e, "compat") : e ? Rl(null, e) : null, this.name = typeof i == "string" && i || "core", this.knownTags = r ? Ll : {}, this.tags = Rl(t, this.name, n), this.toStringOptions = o ?? null, Object.defineProperty(this, Ss, { value: Vc }), Object.defineProperty(this, ws, { value: Gc }), Object.defineProperty(this, Ts, { value: Wc }), this.sortMapEntries = typeof a == "function" ? a : a === !0 ? zl : null;
	}
	clone() {
		let t = Object.create(e.prototype, Object.getOwnPropertyDescriptors(this));
		return t.tags = this.tags.slice(), t;
	}
};
//#endregion
//#region node_modules/yaml/browser/dist/stringify/stringifyDocument.js
function Vl(e, t) {
	let n = [], r = t.directives === !0;
	if (t.directives !== !1 && e.directives) {
		let t = e.directives.toString(e);
		t ? (n.push(t), r = !0) : e.directives.docStart && (r = !0);
	}
	r && n.push("---");
	let i = bc(e, t), { commentString: a } = i.options;
	if (e.commentBefore) {
		n.length !== 1 && n.unshift("");
		let t = a(e.commentBefore);
		n.unshift(X(t, ""));
	}
	let o = !1, s = null;
	if (e.contents) {
		if (q(e.contents)) {
			if (e.contents.spaceBefore && r && n.push(""), e.contents.commentBefore) {
				let t = a(e.contents.commentBefore);
				n.push(X(t, ""));
			}
			i.forceBlockIndent = !!e.comment, s = e.contents.comment;
		}
		let t = s ? void 0 : () => o = !0, c = Cc(e.contents, i, () => s = null, t);
		s && (c += ic(c, "", a(s))), (c[0] === "|" || c[0] === ">") && n[n.length - 1] === "---" ? n[n.length - 1] = `--- ${c}` : n.push(c);
	} else n.push(Cc(e.contents, i));
	if (e.directives?.docEnd) {
		if (e.comment) {
			let t = a(e.comment);
			t.includes("\n") ? (n.push("..."), n.push(X(t, ""))) : n.push(`... ${t}`);
		} else n.push("...");
	} else {
		let t = e.comment;
		t && o && (t = t.replace(/^\n+/, "")), t && ((!o || s) && n[n.length - 1] !== "" && n.push(""), n.push(X(a(t), "")));
	}
	return n.join("\n") + "\n";
}
//#endregion
//#region node_modules/yaml/browser/dist/doc/Document.js
var Hl = class e {
	constructor(e, t, n) {
		this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, U, { value: xs });
		let r = null;
		typeof t == "function" || Array.isArray(t) ? r = t : n === void 0 && t && (n = t, t = void 0);
		let i = Object.assign({
			intAsBigInt: !1,
			keepSourceTokens: !1,
			logLevel: "warn",
			prettyErrors: !0,
			strict: !0,
			stringKeys: !1,
			uniqueKeys: !0,
			version: "1.2"
		}, n);
		this.options = i;
		let { version: a } = i;
		n?._directives ? (this.directives = n._directives.atDocument(), this.directives.yaml.explicit && (a = this.directives.yaml.version)) : this.directives = new Vs({ version: a }), this.setSchema(a, n), this.contents = e === void 0 ? null : this.createNode(e, r, n);
	}
	clone() {
		let t = Object.create(e.prototype, { [U]: { value: xs } });
		return t.commentBefore = this.commentBefore, t.comment = this.comment, t.errors = this.errors.slice(), t.warnings = this.warnings.slice(), t.options = Object.assign({}, this.options), this.directives && (t.directives = this.directives.clone()), t.schema = this.schema.clone(), t.contents = q(this.contents) ? this.contents.clone(t.schema) : this.contents, this.range && (t.range = this.range.slice()), t;
	}
	add(e) {
		Ul(this.contents) && this.contents.add(e);
	}
	addIn(e, t) {
		Ul(this.contents) && this.contents.addIn(e, t);
	}
	createAlias(e, t) {
		if (!e.anchor) {
			let n = Us(this);
			e.anchor = !t || n.has(t) ? Ws(t || "a", n) : t;
		}
		return new Js(e.anchor);
	}
	createNode(e, t, n) {
		let r;
		if (typeof t == "function") e = t.call({ "": e }, "", e), r = t;
		else if (Array.isArray(t)) {
			let e = t.filter((e) => typeof e == "number" || e instanceof String || e instanceof Number).map(String);
			e.length > 0 && (t = t.concat(e)), r = t;
		} else n === void 0 && t && (n = t, t = void 0);
		let { aliasDuplicateObjects: i, anchorPrefix: a, flow: o, keepUndefined: s, onTagObj: c, tag: l } = n ?? {}, { onAnchor: u, setAnchors: d, sourceObjects: f } = Gs(this, a || "a"), p = {
			aliasDuplicateObjects: i ?? !0,
			keepUndefined: s ?? !1,
			onAnchor: u,
			onTagObj: c,
			replacer: r,
			schema: this.schema,
			sourceObjects: f
		}, m = $s(e, l, p);
		return o && K(m) && (m.flow = !0), d(), m;
	}
	createPair(e, t, n = {}) {
		return new Z(this.createNode(e, null, n), this.createNode(t, null, n));
	}
	delete(e) {
		return Ul(this.contents) ? this.contents.delete(e) : !1;
	}
	deleteIn(e) {
		return tc(e) ? this.contents != null && (this.contents = null, !0) : Ul(this.contents) ? this.contents.deleteIn(e) : !1;
	}
	get(e, t) {
		return K(this.contents) ? this.contents.get(e, t) : void 0;
	}
	getIn(e, t) {
		return tc(e) ? !t && G(this.contents) ? this.contents.value : this.contents : K(this.contents) ? this.contents.getIn(e, t) : void 0;
	}
	has(e) {
		return K(this.contents) ? this.contents.has(e) : !1;
	}
	hasIn(e) {
		return tc(e) ? this.contents !== void 0 : K(this.contents) ? this.contents.hasIn(e) : !1;
	}
	set(e, t) {
		this.contents == null ? this.contents = ec(this.schema, [e], t) : Ul(this.contents) && this.contents.set(e, t);
	}
	setIn(e, t) {
		tc(e) ? this.contents = t : this.contents == null ? this.contents = ec(this.schema, Array.from(e), t) : Ul(this.contents) && this.contents.setIn(e, t);
	}
	setSchema(e, t = {}) {
		typeof e == "number" && (e = String(e));
		let n;
		switch (e) {
			case "1.1":
				this.directives ? this.directives.yaml.version = "1.1" : this.directives = new Vs({ version: "1.1" }), n = {
					resolveKnownTags: !1,
					schema: "yaml-1.1"
				};
				break;
			case "1.2":
			case "next":
				this.directives ? this.directives.yaml.version = e : this.directives = new Vs({ version: e }), n = {
					resolveKnownTags: !0,
					schema: "core"
				};
				break;
			case null:
				this.directives && delete this.directives, n = null;
				break;
			default: {
				let t = JSON.stringify(e);
				throw Error(`Expected '1.1', '1.2' or null as first argument, but found: ${t}`);
			}
		}
		if (t.schema instanceof Object) this.schema = t.schema;
		else if (n) this.schema = new Bl(Object.assign(n, t));
		else throw Error("With a null YAML version, the { schema: Schema } option is required");
	}
	toJS({ json: e, jsonArg: t, mapAsMap: n, maxAliasCount: r, onAnchor: i, reviver: a } = {}) {
		let o = {
			anchors: /* @__PURE__ */ new Map(),
			doc: this,
			keep: !e,
			mapAsMap: n === !0,
			mapKeyWarned: !1,
			maxAliasCount: typeof r == "number" ? r : 100
		}, s = J(this.contents, t ?? "", o);
		if (typeof i == "function") for (let { count: e, res: t } of o.anchors.values()) i(t, e);
		return typeof a == "function" ? Ks(a, { "": s }, "", s) : s;
	}
	toJSON(e, t) {
		return this.toJS({
			json: !0,
			jsonArg: e,
			mapAsMap: !1,
			onAnchor: t
		});
	}
	toString(e = {}) {
		if (this.errors.length > 0) throw Error("Document with errors cannot be stringified");
		if ("indent" in e && (!Number.isInteger(e.indent) || Number(e.indent) <= 0)) {
			let t = JSON.stringify(e.indent);
			throw Error(`"indent" option must be a positive integer, not ${t}`);
		}
		return Vl(this, e);
	}
};
function Ul(e) {
	if (K(e)) return !0;
	throw Error("Expected a YAML collection as document contents");
}
//#endregion
//#region node_modules/yaml/browser/dist/parse/cst-visit.js
var Wl = Symbol("break visit"), Gl = Symbol("skip children"), Kl = Symbol("remove item");
function ql(e, t) {
	"type" in e && e.type === "document" && (e = {
		start: e.start,
		value: e.value
	}), Jl(Object.freeze([]), e, t);
}
ql.BREAK = Wl, ql.SKIP = Gl, ql.REMOVE = Kl, ql.itemAtPath = (e, t) => {
	let n = e;
	for (let [e, r] of t) {
		let t = n?.[e];
		if (t && "items" in t) n = t.items[r];
		else return;
	}
	return n;
}, ql.parentCollection = (e, t) => {
	let n = ql.itemAtPath(e, t.slice(0, -1)), r = t[t.length - 1][0], i = n?.[r];
	if (i && "items" in i) return i;
	throw Error("Parent collection not found");
};
function Jl(e, t, n) {
	let r = n(t, e);
	if (typeof r == "symbol") return r;
	for (let i of ["key", "value"]) {
		let a = t[i];
		if (a && "items" in a) {
			for (let t = 0; t < a.items.length; ++t) {
				let r = Jl(Object.freeze(e.concat([[i, t]])), a.items[t], n);
				if (typeof r == "number") t = r - 1;
				else if (r === Wl) return Wl;
				else r === Kl && (a.items.splice(t, 1), --t);
			}
			typeof r == "function" && i === "key" && (r = r(t, e));
		}
	}
	return typeof r == "function" ? r(t, e) : r;
}
//#endregion
//#region node_modules/yaml/browser/dist/public-api.js
function Yl(e, t, n) {
	let r = null;
	if (typeof t == "function" || Array.isArray(t) ? r = t : n === void 0 && t && (n = t), typeof n == "string" && (n = n.length), typeof n == "number") {
		let e = Math.round(n);
		n = e < 1 ? void 0 : e > 8 ? { indent: 8 } : { indent: e };
	}
	if (e === void 0) {
		let { keepUndefined: e } = n ?? t ?? {};
		if (!e) return;
	}
	return Ds(e) && !r ? e.toString(n) : new Hl(e, r, n).toString(n);
}
//#endregion
//#region src/data/serialize-card-config.ts
function Xl(e) {
	return `${Yl(e, {
		lineWidth: 0,
		directives: !1
	}).replace(/^---\s*\n/, "").replace(/\n+$/, "")}\n`;
}
//#endregion
//#region src/translations/index.ts
var Zl = {
	bg: {
		"card.error.no_configuration": "Няма конфигурация.",
		"card.error.no_entities": "Конфигурирайте поне една единица.",
		"card.label.fullscreen": "Цял екран",
		"card.label.hide_controls": "Скриване на контролите",
		"card.label.show_controls": "Показване на контролите",
		"card.label.tools": "Инструменти",
		"common.loading": "Зареждане",
		"dialog.title.history": "История",
		"dialog.loading_history": "Зареждане на история...",
		"dialog.label.exit_fullscreen": "Изход от цял екран",
		"editor.date_range": "Период",
		"editor.field.attribute": "Атрибут (път с точки, оставете празно за състояние)",
		"editor.field.attribute_units": "Единици на атрибута (JSON обект)",
		"editor.field.button_color": "Цвят на бутона",
		"editor.field.button_hover_color": "Цвят при задържане",
		"editor.field.button_hover_effect": "Ефект при задържане",
		"editor.field.button_icon": "Икона на бутона",
		"editor.field.button_label": "Надпис на бутона",
		"editor.field.button_show_icon": "Показване на икона",
		"editor.field.button_show_name": "Показване на име",
		"editor.field.color": "Цвят",
		"editor.field.debug_performance": "Отстраняване на грешки в производителността",
		"editor.field.disable_climate_overlay": "Деактивиране на климатичното наслагване",
		"editor.field.end_date": "Крайна дата",
		"editor.field.entity": "Единица",
		"editor.field.forced": "Принудително (винаги показано)",
		"editor.field.hours": "Часове",
		"editor.field.label": "Надпис",
		"editor.field.line_mode": "Режим на линия",
		"editor.field.line_width": "Дебелина на линия",
		"editor.field.show_points": "Показване на точки с данни",
		"editor.field.point_radius": "Радиус на точките",
		"editor.field.range_mode": "Режим на период",
		"editor.field.scale_group": "Група на скалата",
		"editor.field.scale_max": "Максимум на скалата",
		"editor.field.scale_min": "Минимум на скалата",
		"editor.field.scale_mode": "Режим на скалата",
		"editor.field.series": "Серия (JSON)",
		"editor.field.show_controls": "Начално състояние на селекторите",
		"editor.field.show_controls_toggle": "Бутон за превключване на контролите",
		"editor.field.show_date_picker": "Избор на дата",
		"editor.field.show_entity_picker": "Избор на единица",
		"editor.field.show_export_button": "Бутон за експортиране",
		"editor.field.show_fullscreen_button": "Бутон за цял екран",
		"editor.field.show_grid": "Мрежа",
		"editor.field.show_import_button": "Бутон за импортиране",
		"editor.field.show_legend": "Легенда",
		"editor.field.show_line_mode_buttons": "Бутони за режим на линия",
		"editor.field.show_scale": "Скала",
		"editor.field.show_time_range_selector": "Избор на времеви период",
		"editor.field.show_tools_button": "Бутон за инструменти",
		"editor.field.show_tooltip": "Подсказка",
		"editor.field.start_date": "Начална дата",
		"editor.field.title": "Заглавие",
		"editor.field.title_color": "Цвят на заглавието",
		"editor.field.title_font_family": "Шрифт на заглавието",
		"editor.field.title_font_size": "Размер на шрифта на заглавието",
		"editor.field.unit": "Единица",
		"editor.option.absolute_date_range": "Абсолютен (период от дати)",
		"editor.option.auto": "Автоматично",
		"editor.option.column": "Колона",
		"editor.option.line": "Линия",
		"editor.option.manual": "Ръчно",
		"editor.option.relative_hours": "Относителен (часове)",
		"editor.option.stair": "Стъпаловидна",
		"editor.series.new_series": "Нова серия",
		"editor.series.no_entity_selected": "Няма избрана единица",
		"editor.series.remove": "Премахване",
		"editor.tab.advanced": "Разширени",
		"editor.tab.button": "Бутон",
		"editor.tab.display": "Изглед",
		"editor.tab.entities": "Единици",
		"editor.tab.header": "Заглавна част",
		"editor.tab.range": "Период",
		"editor.tab.style": "Стил",
		"editor.tab.tools": "Инструменти",
		"card.label.create_dashboard_card": "Създаване на карта за таблото",
		"editor.field.show_card_export_button": "Показване на бутон за експортиране на карта",
		"export_dialog.title": "Създаване на карта за таблото",
		"export_dialog.card_type_label": "Тип карта",
		"export_dialog.card_type.inline": "Стандартна карта",
		"export_dialog.card_type.button": "Карта с бутон",
		"export_dialog.instructions": "Копирайте този YAML в редактора на код на карта в Home Assistant.",
		"export_dialog.yaml_label": "YAML на картата",
		"export_dialog.copy": "Копиране на YAML",
		"export_dialog.copied": "YAML е копиран",
		"export_dialog.copy_failed": "Автоматичното копиране не бе успешно. YAML е избран за ръчно копиране.",
		"export_dialog.close": "Затваряне",
		"export_dialog.imported_data_unsupported": "Импортираните данни от историята не могат да се преобразуват в карта на Home Assistant.",
		"export_dialog.missing_snapshot": "Конфигурацията на графиката не е налична.",
		"export_dialog.incompatible_component": "Вграденият компонент за история не поддържа експортиране на карта. Актуализирайте ресурса на картата."
	},
	ca: {
		"card.error.no_configuration": "Sense configuració.",
		"card.error.no_entities": "Configureu almenys una entitat.",
		"card.label.fullscreen": "Pantalla completa",
		"card.label.hide_controls": "Amagar controls",
		"card.label.show_controls": "Mostrar controls",
		"card.label.tools": "Eines",
		"common.loading": "Carregant",
		"dialog.title.history": "Historial",
		"dialog.loading_history": "Carregant historial...",
		"dialog.label.exit_fullscreen": "Sortir de pantalla completa",
		"editor.date_range": "Interval de dates",
		"editor.field.attribute": "Atribut (ruta amb punts, deixeu buit per a l'estat)",
		"editor.field.attribute_units": "Unitats de l'atribut (objecte JSON)",
		"editor.field.button_color": "Color del botó",
		"editor.field.button_hover_color": "Color en passar el ratolí",
		"editor.field.button_hover_effect": "Efecte en passar el ratolí",
		"editor.field.button_icon": "Icona del botó",
		"editor.field.button_label": "Etiqueta del botó",
		"editor.field.button_show_icon": "Mostrar icona del botó",
		"editor.field.button_show_name": "Mostrar nom del botó",
		"editor.field.color": "Color",
		"editor.field.debug_performance": "Depurar rendiment",
		"editor.field.disable_climate_overlay": "Desactivar superposició climàtica",
		"editor.field.end_date": "Data de finalització",
		"editor.field.entity": "Entitat",
		"editor.field.forced": "Forçada (sempre visible)",
		"editor.field.hours": "Hores",
		"editor.field.label": "Etiqueta",
		"editor.field.line_mode": "Mode de línia",
		"editor.field.line_width": "Amplada de línia",
		"editor.field.show_points": "Mostra els punts de dades",
		"editor.field.point_radius": "Radi dels punts",
		"editor.field.range_mode": "Mode d'interval",
		"editor.field.scale_group": "Grup d'escala",
		"editor.field.scale_max": "Escala màxima",
		"editor.field.scale_min": "Escala mínima",
		"editor.field.scale_mode": "Mode d'escala",
		"editor.field.series": "Sèrie (JSON)",
		"editor.field.show_controls": "Estat inicial dels selectors",
		"editor.field.show_controls_toggle": "Botó de commutació de controls",
		"editor.field.show_date_picker": "Selector de data",
		"editor.field.show_entity_picker": "Selector d'entitat",
		"editor.field.show_export_button": "Botó d'exportació",
		"editor.field.show_fullscreen_button": "Botó de pantalla completa",
		"editor.field.show_grid": "Quadrícula",
		"editor.field.show_import_button": "Botó d'importació",
		"editor.field.show_legend": "Llegenda",
		"editor.field.show_line_mode_buttons": "Botons de mode de línia",
		"editor.field.show_scale": "Escala",
		"editor.field.show_time_range_selector": "Selector d'interval de temps",
		"editor.field.show_tools_button": "Botó d'eines",
		"editor.field.show_tooltip": "Informació sobre eines",
		"editor.field.start_date": "Data d'inici",
		"editor.field.title": "Títol",
		"editor.field.title_color": "Color del títol",
		"editor.field.title_font_family": "Família tipogràfica del títol",
		"editor.field.title_font_size": "Mida de la lletra del títol",
		"editor.field.unit": "Unitat",
		"editor.option.absolute_date_range": "Absolut (interval de dates)",
		"editor.option.auto": "Automàtic",
		"editor.option.column": "Columna",
		"editor.option.line": "Línia",
		"editor.option.manual": "Manual",
		"editor.option.relative_hours": "Relatiu (hores)",
		"editor.option.stair": "Esglaonat",
		"editor.series.new_series": "Nova sèrie",
		"editor.series.no_entity_selected": "Cap entitat seleccionada",
		"editor.series.remove": "Eliminar",
		"editor.tab.advanced": "Avançat",
		"editor.tab.button": "Botó",
		"editor.tab.display": "Visualització",
		"editor.tab.entities": "Entitats",
		"editor.tab.header": "Capçalera",
		"editor.tab.range": "Interval",
		"editor.tab.style": "Estil",
		"editor.tab.tools": "Eines",
		"card.label.create_dashboard_card": "Crea una targeta de tauler",
		"editor.field.show_card_export_button": "Mostra el botó d'exportació de targeta",
		"export_dialog.title": "Crea una targeta de tauler",
		"export_dialog.card_type_label": "Tipus de targeta",
		"export_dialog.card_type.inline": "Targeta estàndard",
		"export_dialog.card_type.button": "Targeta de botó",
		"export_dialog.instructions": "Copieu aquest YAML a l'editor de codi d'una targeta de Home Assistant.",
		"export_dialog.yaml_label": "YAML de la targeta",
		"export_dialog.copy": "Copia el YAML",
		"export_dialog.copied": "YAML copiat",
		"export_dialog.copy_failed": "La còpia automàtica ha fallat. El YAML està seleccionat per copiar-lo manualment.",
		"export_dialog.close": "Tanca",
		"export_dialog.imported_data_unsupported": "Les dades d'historial importades no es poden convertir en una targeta de Home Assistant.",
		"export_dialog.missing_snapshot": "La configuració del gràfic no està disponible.",
		"export_dialog.incompatible_component": "El component d'historial integrat no admet l'exportació de targetes. Actualitzeu el recurs de la targeta."
	},
	cs: {
		"card.error.no_configuration": "Žádná konfigurace.",
		"card.error.no_entities": "Nakonfigurujte alespoň jednu entitu.",
		"card.label.fullscreen": "Celá obrazovka",
		"card.label.hide_controls": "Skrýt ovládací prvky",
		"card.label.show_controls": "Zobrazit ovládací prvky",
		"card.label.tools": "Nástroje",
		"common.loading": "Načítání",
		"dialog.title.history": "Historie",
		"dialog.loading_history": "Načítání historie...",
		"dialog.label.exit_fullscreen": "Ukončit celou obrazovku",
		"editor.date_range": "Rozsah dat",
		"editor.field.attribute": "Atribut (tečková cesta, pro stav ponechte prázdné)",
		"editor.field.attribute_units": "Jednotky atributu (objekt JSON)",
		"editor.field.button_color": "Barva tlačítka",
		"editor.field.button_hover_color": "Barva při najetí",
		"editor.field.button_hover_effect": "Efekt při najetí",
		"editor.field.button_icon": "Ikona tlačítka",
		"editor.field.button_label": "Popisek tlačítka",
		"editor.field.button_show_icon": "Zobrazit ikonu tlačítka",
		"editor.field.button_show_name": "Zobrazit název tlačítka",
		"editor.field.color": "Barva",
		"editor.field.debug_performance": "Ladění výkonu",
		"editor.field.disable_climate_overlay": "Zakázat překrytí klimatu",
		"editor.field.end_date": "Datum ukončení",
		"editor.field.entity": "Entita",
		"editor.field.forced": "Vynuceno (vždy zobrazeno)",
		"editor.field.hours": "Hodiny",
		"editor.field.label": "Popisek",
		"editor.field.line_mode": "Režim čáry",
		"editor.field.line_width": "Šířka čáry",
		"editor.field.show_points": "Zobrazit datové body",
		"editor.field.point_radius": "Poloměr bodů",
		"editor.field.range_mode": "Režim rozsahu",
		"editor.field.scale_group": "Skupina měřítka",
		"editor.field.scale_max": "Maximum měřítka",
		"editor.field.scale_min": "Minimum měřítka",
		"editor.field.scale_mode": "Režim měřítka",
		"editor.field.series": "Série (JSON)",
		"editor.field.show_controls": "Počáteční stav výběrů",
		"editor.field.show_controls_toggle": "Přepínač ovládacích prvků",
		"editor.field.show_date_picker": "Výběr data",
		"editor.field.show_entity_picker": "Výběr entity",
		"editor.field.show_export_button": "Tlačítko exportu",
		"editor.field.show_fullscreen_button": "Tlačítko celé obrazovky",
		"editor.field.show_grid": "Mřížka",
		"editor.field.show_import_button": "Tlačítko importu",
		"editor.field.show_legend": "Legenda",
		"editor.field.show_line_mode_buttons": "Tlačítka režimu čáry",
		"editor.field.show_scale": "Měřítko",
		"editor.field.show_time_range_selector": "Výběr časového rozsahu",
		"editor.field.show_tools_button": "Tlačítko nástrojů",
		"editor.field.show_tooltip": "Nápověda",
		"editor.field.start_date": "Datum zahájení",
		"editor.field.title": "Název",
		"editor.field.title_color": "Barva titulku",
		"editor.field.title_font_family": "Rodina písma titulku",
		"editor.field.title_font_size": "Velikost písma titulku",
		"editor.field.unit": "Jednotka",
		"editor.option.absolute_date_range": "Absolutní (rozsah dat)",
		"editor.option.auto": "Automaticky",
		"editor.option.column": "Sloupec",
		"editor.option.line": "Čára",
		"editor.option.manual": "Ručně",
		"editor.option.relative_hours": "Relativní (hodiny)",
		"editor.option.stair": "Schodová",
		"editor.series.new_series": "Nová série",
		"editor.series.no_entity_selected": "Není vybrána žádná entita",
		"editor.series.remove": "Odebrat",
		"editor.tab.advanced": "Pokročilé",
		"editor.tab.button": "Tlačítko",
		"editor.tab.display": "Zobrazení",
		"editor.tab.entities": "Entity",
		"editor.tab.header": "Hlavička",
		"editor.tab.range": "Rozsah",
		"editor.tab.style": "Styl",
		"editor.tab.tools": "Nástroje",
		"card.label.create_dashboard_card": "Vytvořit kartu nástěnky",
		"editor.field.show_card_export_button": "Zobrazit tlačítko exportu karty",
		"export_dialog.title": "Vytvořit kartu nástěnky",
		"export_dialog.card_type_label": "Typ karty",
		"export_dialog.card_type.inline": "Standardní karta",
		"export_dialog.card_type.button": "Tlačítková karta",
		"export_dialog.instructions": "Zkopírujte tento YAML do editoru kódu karty Home Assistant.",
		"export_dialog.yaml_label": "YAML karty",
		"export_dialog.copy": "Kopírovat YAML",
		"export_dialog.copied": "YAML zkopírován",
		"export_dialog.copy_failed": "Automatické kopírování selhalo. YAML je vybrán pro ruční kopírování.",
		"export_dialog.close": "Zavřít",
		"export_dialog.imported_data_unsupported": "Importovaná data historie nelze převést na kartu Home Assistant.",
		"export_dialog.missing_snapshot": "Konfigurace grafu není dostupná.",
		"export_dialog.incompatible_component": "Vložená komponenta historie nepodporuje export karty. Aktualizujte zdroj karty."
	},
	da: {
		"card.error.no_configuration": "Ingen konfiguration.",
		"card.error.no_entities": "Konfigurer mindst én enhed.",
		"card.label.fullscreen": "Fuldskærm",
		"card.label.hide_controls": "Skjul kontroller",
		"card.label.show_controls": "Vis kontroller",
		"card.label.tools": "Værktøjer",
		"common.loading": "Indlæser",
		"dialog.title.history": "Historik",
		"dialog.loading_history": "Indlæser historik...",
		"dialog.label.exit_fullscreen": "Afslut fuldskærm",
		"editor.date_range": "Datoperiode",
		"editor.field.attribute": "Attribut (sti med punktum, lad være tom for tilstand)",
		"editor.field.attribute_units": "Attributenheder (JSON-objekt)",
		"editor.field.button_color": "Knapfarve",
		"editor.field.button_hover_color": "Farve ved hover",
		"editor.field.button_hover_effect": "Effekt ved hover",
		"editor.field.button_icon": "Knapikon",
		"editor.field.button_label": "Knapetiket",
		"editor.field.button_show_icon": "Vis knapikon",
		"editor.field.button_show_name": "Vis knapnavn",
		"editor.field.color": "Farve",
		"editor.field.debug_performance": "Fejlfinding af ydeevne",
		"editor.field.disable_climate_overlay": "Deaktiver klimaoverlejring",
		"editor.field.end_date": "Slutdato",
		"editor.field.entity": "Enhed",
		"editor.field.forced": "Tvungen (altid vist)",
		"editor.field.hours": "Timer",
		"editor.field.label": "Etiket",
		"editor.field.line_mode": "Linjetilstand",
		"editor.field.line_width": "Linjebredde",
		"editor.field.show_points": "Vis datapunkter",
		"editor.field.point_radius": "Punktradius",
		"editor.field.range_mode": "Periodetilstand",
		"editor.field.scale_group": "Skalagruppe",
		"editor.field.scale_max": "Skala maksimum",
		"editor.field.scale_min": "Skala minimum",
		"editor.field.scale_mode": "Skalatilstand",
		"editor.field.series": "Serie (JSON)",
		"editor.field.show_controls": "Vælgeres starttilstand",
		"editor.field.show_controls_toggle": "Kontroller skifteknap",
		"editor.field.show_date_picker": "Datovælger",
		"editor.field.show_entity_picker": "Enhedsvælger",
		"editor.field.show_export_button": "Eksportknap",
		"editor.field.show_fullscreen_button": "Fuldskærmknap",
		"editor.field.show_grid": "Gitter",
		"editor.field.show_import_button": "Importknap",
		"editor.field.show_legend": "Forklaring",
		"editor.field.show_line_mode_buttons": "Linjetilstandsknapper",
		"editor.field.show_scale": "Skala",
		"editor.field.show_time_range_selector": "Tidsperiodvælger",
		"editor.field.show_tools_button": "Værktøjsknap",
		"editor.field.show_tooltip": "Værktøjstip",
		"editor.field.start_date": "Startdato",
		"editor.field.title": "Titel",
		"editor.field.title_color": "Titelfarve",
		"editor.field.title_font_family": "Titel skrifttypefamilie",
		"editor.field.title_font_size": "Titel skriftstørrelse",
		"editor.field.unit": "Enhed",
		"editor.option.absolute_date_range": "Absolut (datoperiode)",
		"editor.option.auto": "Auto",
		"editor.option.column": "Kolonne",
		"editor.option.line": "Linje",
		"editor.option.manual": "Manuel",
		"editor.option.relative_hours": "Relativ (timer)",
		"editor.option.stair": "Trappe",
		"editor.series.new_series": "Ny serie",
		"editor.series.no_entity_selected": "Ingen enhed valgt",
		"editor.series.remove": "Fjern",
		"editor.tab.advanced": "Avanceret",
		"editor.tab.button": "Knap",
		"editor.tab.display": "Visning",
		"editor.tab.entities": "Enheder",
		"editor.tab.header": "Sidehoved",
		"editor.tab.range": "Periode",
		"editor.tab.style": "Stil",
		"editor.tab.tools": "Værktøjer",
		"card.label.create_dashboard_card": "Opret dashboardkort",
		"editor.field.show_card_export_button": "Vis knap til eksport af kort",
		"export_dialog.title": "Opret dashboardkort",
		"export_dialog.card_type_label": "Korttype",
		"export_dialog.card_type.inline": "Standardkort",
		"export_dialog.card_type.button": "Knapkort",
		"export_dialog.instructions": "Kopiér denne YAML til kodeeditoren for et Home Assistant-kort.",
		"export_dialog.yaml_label": "Kort-YAML",
		"export_dialog.copy": "Kopiér YAML",
		"export_dialog.copied": "YAML kopieret",
		"export_dialog.copy_failed": "Automatisk kopiering mislykkedes. YAML er markeret til manuel kopiering.",
		"export_dialog.close": "Luk",
		"export_dialog.imported_data_unsupported": "Importerede historikdata kan ikke konverteres til et Home Assistant-kort.",
		"export_dialog.missing_snapshot": "Grafkonfigurationen er ikke tilgængelig.",
		"export_dialog.incompatible_component": "Den integrerede historikkomponent understøtter ikke korteksport. Opdater kortressourcen."
	},
	de: {
		"card.error.no_configuration": "Keine Konfiguration.",
		"card.error.no_entities": "Bitte konfigurieren Sie mindestens eine Entität.",
		"card.label.fullscreen": "Vollbild",
		"card.label.hide_controls": "Steuerungen ausblenden",
		"card.label.show_controls": "Steuerungen einblenden",
		"card.label.tools": "Werkzeuge",
		"common.loading": "Laden",
		"dialog.title.history": "Verlauf",
		"dialog.loading_history": "Verlauf wird geladen...",
		"dialog.label.exit_fullscreen": "Vollbild beenden",
		"editor.date_range": "Datumsbereich",
		"editor.field.attribute": "Attribut (Punktpfad, für Zustand leer lassen)",
		"editor.field.attribute_units": "Attribut-Einheiten (JSON-Objekt)",
		"editor.field.button_color": "Schaltflächenfarbe",
		"editor.field.button_hover_color": "Hover-Farbe",
		"editor.field.button_hover_effect": "Hover-Effekt",
		"editor.field.button_icon": "Schaltflächen-Symbol",
		"editor.field.button_label": "Schaltflächen-Beschriftung",
		"editor.field.button_show_icon": "Schaltflächen-Symbol anzeigen",
		"editor.field.button_show_name": "Schaltflächen-Bezeichnung anzeigen",
		"editor.field.color": "Farbe",
		"editor.field.debug_performance": "Leistungs-Debugging",
		"editor.field.disable_climate_overlay": "Klima-Überlagerung deaktivieren",
		"editor.field.end_date": "Enddatum",
		"editor.field.entity": "Entität",
		"editor.field.forced": "Erzwungen (immer angezeigt)",
		"editor.field.hours": "Stunden",
		"editor.field.label": "Beschriftung",
		"editor.field.line_mode": "Linienmodus",
		"editor.field.line_width": "Linienbreite",
		"editor.field.show_points": "Datenpunkte anzeigen",
		"editor.field.point_radius": "Punktradius",
		"editor.field.range_mode": "Bereichsmodus",
		"editor.field.scale_group": "Skalen-Gruppe",
		"editor.field.scale_max": "Maximale Skala",
		"editor.field.scale_min": "Minimale Skala",
		"editor.field.scale_mode": "Skalen-Modus",
		"editor.field.series": "Serie (JSON)",
		"editor.field.show_controls": "Anfangszustand der Auswahlelemente",
		"editor.field.show_controls_toggle": "Bedienelemente-Schaltfläche",
		"editor.field.show_date_picker": "Datums-Auswahl",
		"editor.field.show_entity_picker": "Entitäts-Auswahl",
		"editor.field.show_export_button": "Export-Schaltfläche",
		"editor.field.show_fullscreen_button": "Vollbild-Schaltfläche",
		"editor.field.show_grid": "Gitternetz",
		"editor.field.show_import_button": "Import-Schaltfläche",
		"editor.field.show_legend": "Legende",
		"editor.field.show_line_mode_buttons": "Linienmodus-Schaltflächen",
		"editor.field.show_scale": "Skala",
		"editor.field.show_time_range_selector": "Zeitbereichs-Auswahl",
		"editor.field.show_tools_button": "Werkzeuge-Schaltfläche",
		"editor.field.show_tooltip": "QuickInfo",
		"editor.field.start_date": "Startdatum",
		"editor.field.title": "Titel",
		"editor.field.title_color": "Titel-Farbe",
		"editor.field.title_font_family": "Titel-Schriftfamilie",
		"editor.field.title_font_size": "Titel-Schriftgröße",
		"editor.field.unit": "Einheit",
		"editor.option.absolute_date_range": "Absolut (Datumsbereich)",
		"editor.option.auto": "Automatisch",
		"editor.option.column": "Spalte",
		"editor.option.line": "Linie",
		"editor.option.manual": "Manuell",
		"editor.option.relative_hours": "Relativ (Stunden)",
		"editor.option.stair": "Stufen",
		"editor.series.new_series": "Neue Serie",
		"editor.series.no_entity_selected": "Keine Entität ausgewählt",
		"editor.series.remove": "Entfernen",
		"editor.tab.advanced": "Erweitert",
		"editor.tab.button": "Schaltfläche",
		"editor.tab.display": "Anzeige",
		"editor.tab.entities": "Entitäten",
		"editor.tab.header": "Kopfzeile",
		"editor.tab.range": "Bereich",
		"editor.tab.style": "Stil",
		"editor.tab.tools": "Werkzeuge",
		"card.label.create_dashboard_card": "Dashboard-Karte erstellen",
		"editor.field.show_card_export_button": "Schaltfläche zum Exportieren der Dashboard-Karte anzeigen",
		"export_dialog.title": "Dashboard-Karte erstellen",
		"export_dialog.card_type_label": "Kartentyp",
		"export_dialog.card_type.inline": "Standardkarte",
		"export_dialog.card_type.button": "Schaltflächenkarte",
		"export_dialog.instructions": "Kopiere dieses YAML in den Code-Editor einer Home-Assistant-Karte.",
		"export_dialog.yaml_label": "Karten-YAML",
		"export_dialog.copy": "YAML kopieren",
		"export_dialog.copied": "YAML kopiert",
		"export_dialog.copy_failed": "Automatisches Kopieren fehlgeschlagen. Das YAML ist für manuelles Kopieren markiert.",
		"export_dialog.close": "Schließen",
		"export_dialog.imported_data_unsupported": "Importierte Verlaufsdaten können nicht in eine Home-Assistant-Karte konvertiert werden.",
		"export_dialog.missing_snapshot": "Die Diagrammkonfiguration ist nicht verfügbar.",
		"export_dialog.incompatible_component": "Die eingebettete Verlaufskomponente unterstützt den Kartenexport nicht. Aktualisiere die Kartenressource."
	},
	el: {
		"card.error.no_configuration": "Καμία διαμόρφωση.",
		"card.error.no_entities": "Ρυθμίστε τουλάχιστον μία οντότητα.",
		"card.label.fullscreen": "Πλήρης οθόνη",
		"card.label.hide_controls": "Απόκρυψη στοιχείων ελέγχου",
		"card.label.show_controls": "Εμφάνιση στοιχείων ελέγχου",
		"card.label.tools": "Εργαλεία",
		"common.loading": "Φόρτωση",
		"dialog.title.history": "Ιστορικό",
		"dialog.loading_history": "Φόρτωση ιστορικού...",
		"dialog.label.exit_fullscreen": "Έξοδος από πλήρη οθόνη",
		"editor.date_range": "Εύρος ημερομηνιών",
		"editor.field.attribute": "Χαρακτηριστικό (διαδρομή με τελεία, αφήστε κενό για κατάσταση)",
		"editor.field.attribute_units": "Μονάδες χαρακτηριστικού (αντικείμενο JSON)",
		"editor.field.button_color": "Χρώμα κουμπιού",
		"editor.field.button_hover_color": "Χρώμα αιώρησης",
		"editor.field.button_hover_effect": "Εφέ αιώρησης",
		"editor.field.button_icon": "Εικονίδιο κουμπιού",
		"editor.field.button_label": "Ετικέτα κουμπιού",
		"editor.field.button_show_icon": "Εμφάνιση εικονιδίου κουμπιού",
		"editor.field.button_show_name": "Εμφάνιση ονόματος κουμπιού",
		"editor.field.color": "Χρώμα",
		"editor.field.debug_performance": "Αποσφαλμάτωση απόδοσης",
		"editor.field.disable_climate_overlay": "Απενεργοποίηση επικάλυψης κλίματος",
		"editor.field.end_date": "Ημερομηνία τέλους",
		"editor.field.entity": "Οντότητα",
		"editor.field.forced": "Εξαναγκασμένο (πάντα εμφανές)",
		"editor.field.hours": "Ώρες",
		"editor.field.label": "Ετικέτα",
		"editor.field.line_mode": "Λειτουργία γραμμής",
		"editor.field.line_width": "Πλάτος γραμμής",
		"editor.field.show_points": "Εμφάνιση σημείων δεδομένων",
		"editor.field.point_radius": "Ακτίνα σημείων",
		"editor.field.range_mode": "Λειτουργία εύρους",
		"editor.field.scale_group": "Ομάδα κλίμακας",
		"editor.field.scale_max": "Μέγιστο κλίμακας",
		"editor.field.scale_min": "Ελάχιστο κλίμακας",
		"editor.field.scale_mode": "Λειτουργία κλίμακας",
		"editor.field.series": "Σειρά (JSON)",
		"editor.field.show_controls": "Αρχική κατάσταση επιλογέων",
		"editor.field.show_controls_toggle": "Κουμπί εναλλαγής στοιχείων ελέγχου",
		"editor.field.show_date_picker": "Επιλογέας ημερομηνίας",
		"editor.field.show_entity_picker": "Επιλογέας οντότητας",
		"editor.field.show_export_button": "Κουμπί εξαγωγής",
		"editor.field.show_fullscreen_button": "Κουμπί πλήρους οθόνης",
		"editor.field.show_grid": "Πλέγμα",
		"editor.field.show_import_button": "Κουμπί εισαγωγής",
		"editor.field.show_legend": "Υπόμνημα",
		"editor.field.show_line_mode_buttons": "Κουμπιά λειτουργίας γραμμής",
		"editor.field.show_scale": "Κλίμακα",
		"editor.field.show_time_range_selector": "Επιλογέας χρονικού διαστήματος",
		"editor.field.show_tools_button": "Κουμπί εργαλείων",
		"editor.field.show_tooltip": "Επεξήγηση",
		"editor.field.start_date": "Ημερομηνία έναρξης",
		"editor.field.title": "Τίτλος",
		"editor.field.title_color": "Χρώμα τίτλου",
		"editor.field.title_font_family": "Οικογένεια γραμματοσειράς τίτλου",
		"editor.field.title_font_size": "Μέγεθος γραμματοσειράς τίτλου",
		"editor.field.unit": "Μονάδα",
		"editor.option.absolute_date_range": "Απόλυτο (εύρος ημερομηνιών)",
		"editor.option.auto": "Αυτόματα",
		"editor.option.column": "Στήλη",
		"editor.option.line": "Γραμμή",
		"editor.option.manual": "Χειροκίνητα",
		"editor.option.relative_hours": "Σχετικό (ώρες)",
		"editor.option.stair": "Κλιμακωτό",
		"editor.series.new_series": "Νέα σειρά",
		"editor.series.no_entity_selected": "Δεν έχει επιλεγεί οντότητα",
		"editor.series.remove": "Αφαίρεση",
		"editor.tab.advanced": "Προχωρημένες",
		"editor.tab.button": "Κουμπί",
		"editor.tab.display": "Εμφάνιση",
		"editor.tab.entities": "Οντότητες",
		"editor.tab.header": "Κεφαλίδα",
		"editor.tab.range": "Εύρος",
		"editor.tab.style": "Στυλ",
		"editor.tab.tools": "Εργαλεία",
		"card.label.create_dashboard_card": "Δημιουργία κάρτας πίνακα",
		"editor.field.show_card_export_button": "Εμφάνιση κουμπιού εξαγωγής κάρτας",
		"export_dialog.title": "Δημιουργία κάρτας πίνακα",
		"export_dialog.card_type_label": "Τύπος κάρτας",
		"export_dialog.card_type.inline": "Τυπική κάρτα",
		"export_dialog.card_type.button": "Κάρτα κουμπιού",
		"export_dialog.instructions": "Αντιγράψτε αυτό το YAML στον επεξεργαστή κώδικα μιας κάρτας Home Assistant.",
		"export_dialog.yaml_label": "YAML κάρτας",
		"export_dialog.copy": "Αντιγραφή YAML",
		"export_dialog.copied": "Το YAML αντιγράφηκε",
		"export_dialog.copy_failed": "Η αυτόματη αντιγραφή απέτυχε. Το YAML είναι επιλεγμένο για χειροκίνητη αντιγραφή.",
		"export_dialog.close": "Κλείσιμο",
		"export_dialog.imported_data_unsupported": "Τα εισαγόμενα δεδομένα ιστορικού δεν μπορούν να μετατραπούν σε κάρτα Home Assistant.",
		"export_dialog.missing_snapshot": "Η διαμόρφωση του γραφήματος δεν είναι διαθέσιμη.",
		"export_dialog.incompatible_component": "Το ενσωματωμένο στοιχείο ιστορικού δεν υποστηρίζει εξαγωγή κάρτας. Ενημερώστε τον πόρο της κάρτας."
	},
	en: {
		"card.error.no_configuration": "No configuration.",
		"card.error.no_entities": "Configure at least one entity.",
		"card.label.fullscreen": "Fullscreen",
		"card.label.hide_controls": "Hide controls",
		"card.label.show_controls": "Show controls",
		"card.label.tools": "Tools",
		"card.label.create_dashboard_card": "Create dashboard card",
		"common.loading": "Loading",
		"dialog.title.history": "History",
		"dialog.loading_history": "Loading history...",
		"dialog.label.exit_fullscreen": "Exit fullscreen",
		"editor.date_range": "Date range",
		"editor.field.attribute": "Attribute (dot path, leave blank for state)",
		"editor.field.attribute_units": "Attribute units (JSON object)",
		"editor.field.auto_scale_split": "Auto split scales",
		"editor.field.button_color": "Button color",
		"editor.field.button_hover_color": "Hover color",
		"editor.field.button_hover_effect": "Hover effect",
		"editor.field.button_icon": "Button icon",
		"editor.field.button_label": "Button label",
		"editor.field.button_show_icon": "Show button icon",
		"editor.field.button_show_name": "Show button name",
		"editor.field.card_background_color": "Card background color",
		"editor.field.card_background_opacity": "Card background opacity",
		"editor.field.color": "Color",
		"editor.field.debug_performance": "Debug performance",
		"editor.field.disable_climate_overlay": "Disable climate overlay",
		"editor.field.end_date": "End date",
		"editor.field.entity": "Entity",
		"editor.field.forced": "Forced (always shown)",
		"editor.field.group": "Group",
		"editor.field.hours": "Hours",
		"editor.field.label": "Label",
		"editor.field.line_mode": "Line mode",
		"editor.field.line_width": "Line width",
		"editor.field.show_points": "Show data points",
		"editor.field.point_radius": "Point radius",
		"editor.field.range_mode": "Range mode",
		"editor.field.scale_group": "Group",
		"editor.field.scale_max": "Scale max",
		"editor.field.scale_min": "Scale min",
		"editor.field.scale_mode": "Scale mode",
		"editor.field.series": "Series (JSON)",
		"editor.field.show_controls": "Pickers initial state",
		"editor.field.show_card_export_button": "Show dashboard card export button",
		"editor.field.show_controls_toggle": "Controls toggle button",
		"editor.field.show_date_picker": "Date picker",
		"editor.field.show_entity_picker": "Entity picker",
		"editor.field.show_export_button": "Export button",
		"editor.field.show_fullscreen_button": "Fullscreen button",
		"editor.field.show_grid": "Grid",
		"editor.field.show_import_button": "Import button",
		"editor.field.show_legend": "Legend",
		"editor.field.show_line_mode_buttons": "Line mode buttons",
		"editor.field.show_scale": "Scale",
		"editor.field.show_time_range_selector": "Time range selector",
		"editor.field.show_tools_button": "Tools button",
		"editor.field.show_tooltip": "Tooltip",
		"editor.field.start_date": "Start date",
		"editor.field.title": "Title",
		"editor.field.title_color": "Title color",
		"editor.field.title_font_family": "Title font family",
		"editor.field.title_font_size": "Title font size",
		"editor.field.unit": "Unit",
		"editor.option.absolute_date_range": "Absolute (date range)",
		"editor.option.auto": "Auto",
		"editor.option.column": "Column",
		"editor.option.line": "Line",
		"editor.option.manual": "Manual",
		"editor.option.relative_hours": "Relative (hours)",
		"editor.option.stair": "Stair",
		"editor.series.new_series": "New series",
		"editor.series.no_entity_selected": "No entity selected",
		"editor.series.remove": "Remove",
		"editor.tab.advanced": "Advanced",
		"editor.tab.button": "Button",
		"editor.tab.display": "Display",
		"editor.tab.entities": "Entities",
		"editor.tab.header": "Header",
		"editor.tab.range": "Range",
		"editor.tab.style": "Style",
		"editor.tab.tools": "Tools",
		"export_dialog.title": "Create dashboard card",
		"export_dialog.card_type_label": "Card type",
		"export_dialog.card_type.inline": "Standard card",
		"export_dialog.card_type.button": "Button card",
		"export_dialog.instructions": "Copy this YAML into the code editor of a Home Assistant card.",
		"export_dialog.yaml_label": "Card YAML",
		"export_dialog.copy": "Copy YAML",
		"export_dialog.copied": "YAML copied",
		"export_dialog.copy_failed": "Automatic copy failed. The YAML is selected so you can copy it manually.",
		"export_dialog.close": "Close",
		"export_dialog.imported_data_unsupported": "Imported history data cannot be converted into a Home Assistant card.",
		"export_dialog.missing_snapshot": "The graph configuration is not available.",
		"export_dialog.incompatible_component": "The embedded history component does not support card export. Update the card resource."
	},
	es: {
		"card.error.no_configuration": "Sin configuración.",
		"card.error.no_entities": "Configure al menos una entidad.",
		"card.label.fullscreen": "Pantalla completa",
		"card.label.hide_controls": "Ocultar controles",
		"card.label.show_controls": "Mostrar controles",
		"card.label.tools": "Herramientas",
		"common.loading": "Cargando",
		"dialog.title.history": "Historial",
		"dialog.loading_history": "Cargando historial...",
		"dialog.label.exit_fullscreen": "Salir de pantalla completa",
		"editor.date_range": "Rango de fechas",
		"editor.field.attribute": "Atributo (ruta con punto, dejar vacío para el estado)",
		"editor.field.attribute_units": "Unidades del atributo (objeto JSON)",
		"editor.field.button_color": "Color del botón",
		"editor.field.button_hover_color": "Color al pasar el cursor",
		"editor.field.button_hover_effect": "Efecto al pasar el cursor",
		"editor.field.button_icon": "Icono del botón",
		"editor.field.button_label": "Etiqueta del botón",
		"editor.field.button_show_icon": "Mostrar icono del botón",
		"editor.field.button_show_name": "Mostrar nombre del botón",
		"editor.field.color": "Color",
		"editor.field.debug_performance": "Depuración de rendimiento",
		"editor.field.disable_climate_overlay": "Desactivar superposición climática",
		"editor.field.end_date": "Fecha de fin",
		"editor.field.entity": "Entidad",
		"editor.field.forced": "Forzado (siempre visible)",
		"editor.field.hours": "Horas",
		"editor.field.label": "Etiqueta",
		"editor.field.line_mode": "Modo de línea",
		"editor.field.line_width": "Ancho de línea",
		"editor.field.show_points": "Mostrar puntos de datos",
		"editor.field.point_radius": "Radio de los puntos",
		"editor.field.range_mode": "Modo de rango",
		"editor.field.scale_group": "Grupo de escala",
		"editor.field.scale_max": "Escala máxima",
		"editor.field.scale_min": "Escala mínima",
		"editor.field.scale_mode": "Modo de escala",
		"editor.field.series": "Serie (JSON)",
		"editor.field.show_controls": "Estado inicial de los selectores",
		"editor.field.show_controls_toggle": "Botón de alternar controles",
		"editor.field.show_date_picker": "Selector de fecha",
		"editor.field.show_entity_picker": "Selector de entidad",
		"editor.field.show_export_button": "Botón de exportación",
		"editor.field.show_fullscreen_button": "Botón de pantalla completa",
		"editor.field.show_grid": "Cuadrícula",
		"editor.field.show_import_button": "Botón de importación",
		"editor.field.show_legend": "Leyenda",
		"editor.field.show_line_mode_buttons": "Botones de modo de línea",
		"editor.field.show_scale": "Escala",
		"editor.field.show_time_range_selector": "Selector de rango de tiempo",
		"editor.field.show_tools_button": "Botón de herramientas",
		"editor.field.show_tooltip": "Información sobre herramientas",
		"editor.field.start_date": "Fecha de inicio",
		"editor.field.title": "Título",
		"editor.field.title_color": "Color del título",
		"editor.field.title_font_family": "Familia tipográfica del título",
		"editor.field.title_font_size": "Tamaño de fuente del título",
		"editor.field.unit": "Unidad",
		"editor.option.absolute_date_range": "Absoluto (rango de fechas)",
		"editor.option.auto": "Automático",
		"editor.option.column": "Columna",
		"editor.option.line": "Línea",
		"editor.option.manual": "Manual",
		"editor.option.relative_hours": "Relativo (horas)",
		"editor.option.stair": "Escalonado",
		"editor.series.new_series": "Nueva serie",
		"editor.series.no_entity_selected": "Ninguna entidad seleccionada",
		"editor.series.remove": "Eliminar",
		"editor.tab.advanced": "Avanzado",
		"editor.tab.button": "Botón",
		"editor.tab.display": "Visualización",
		"editor.tab.entities": "Entidades",
		"editor.tab.header": "Encabezado",
		"editor.tab.range": "Rango",
		"editor.tab.style": "Estilo",
		"editor.tab.tools": "Herramientas",
		"card.label.create_dashboard_card": "Crear tarjeta de panel",
		"editor.field.show_card_export_button": "Mostrar botón de exportación de tarjeta",
		"export_dialog.title": "Crear tarjeta de panel",
		"export_dialog.card_type_label": "Tipo de tarjeta",
		"export_dialog.card_type.inline": "Tarjeta estándar",
		"export_dialog.card_type.button": "Tarjeta de botón",
		"export_dialog.instructions": "Copia este YAML en el editor de código de una tarjeta de Home Assistant.",
		"export_dialog.yaml_label": "YAML de la tarjeta",
		"export_dialog.copy": "Copiar YAML",
		"export_dialog.copied": "YAML copiado",
		"export_dialog.copy_failed": "La copia automática falló. El YAML está seleccionado para que puedas copiarlo manualmente.",
		"export_dialog.close": "Cerrar",
		"export_dialog.imported_data_unsupported": "Los datos de historial importados no se pueden convertir en una tarjeta de Home Assistant.",
		"export_dialog.missing_snapshot": "La configuración del gráfico no está disponible.",
		"export_dialog.incompatible_component": "El componente de historial integrado no admite la exportación de tarjetas. Actualiza el recurso de la tarjeta."
	},
	fi: {
		"card.error.no_configuration": "Ei määritystä.",
		"card.error.no_entities": "Määritä vähintään yksi entiteetti.",
		"card.label.fullscreen": "Koko näyttö",
		"card.label.hide_controls": "Piilota säätimet",
		"card.label.show_controls": "Näytä säätimet",
		"card.label.tools": "Työkalut",
		"common.loading": "Ladataan",
		"dialog.title.history": "Historia",
		"dialog.loading_history": "Ladataan historiaa...",
		"dialog.label.exit_fullscreen": "Poistu koko näytöstä",
		"editor.date_range": "Päivämääräväli",
		"editor.field.attribute": "Attribuutti (pistepolku, jätä tyhjäksi tilalle)",
		"editor.field.attribute_units": "Attribuutin yksiköt (JSON-objekti)",
		"editor.field.button_color": "Painikkeen väri",
		"editor.field.button_hover_color": "Hover-väri",
		"editor.field.button_hover_effect": "Hover-efekti",
		"editor.field.button_icon": "Painikkeen kuvake",
		"editor.field.button_label": "Painikkeen nimiö",
		"editor.field.button_show_icon": "Näytä painikkeen kuvake",
		"editor.field.button_show_name": "Näytä painikkeen nimi",
		"editor.field.color": "Väri",
		"editor.field.debug_performance": "Suorituskyvyn vianetsintä",
		"editor.field.disable_climate_overlay": "Poista ilmastokerros käytöstä",
		"editor.field.end_date": "Päättymispäivä",
		"editor.field.entity": "Entiteetti",
		"editor.field.forced": "Pakotettu (aina näkyvissä)",
		"editor.field.hours": "Tuntia",
		"editor.field.label": "Nimiö",
		"editor.field.line_mode": "Viivatila",
		"editor.field.line_width": "Viivan paksuus",
		"editor.field.show_points": "Näytä datapisteet",
		"editor.field.point_radius": "Pisteen säde",
		"editor.field.range_mode": "Välitila",
		"editor.field.scale_group": "Asteikkoryhmä",
		"editor.field.scale_max": "Asteikon maksimi",
		"editor.field.scale_min": "Asteikon minimi",
		"editor.field.scale_mode": "Asteikkotila",
		"editor.field.series": "Sarja (JSON)",
		"editor.field.show_controls": "Valitsimien alkutila",
		"editor.field.show_controls_toggle": "Säätimien vaihtopainike",
		"editor.field.show_date_picker": "Päivämäärävalitsin",
		"editor.field.show_entity_picker": "Entiteettivalitsin",
		"editor.field.show_export_button": "Vientipainike",
		"editor.field.show_fullscreen_button": "Koko näytön painike",
		"editor.field.show_grid": "Ruudukko",
		"editor.field.show_import_button": "Tuontipainike",
		"editor.field.show_legend": "Selite",
		"editor.field.show_line_mode_buttons": "Viivatilan painikkeet",
		"editor.field.show_scale": "Asteikko",
		"editor.field.show_time_range_selector": "Aikavälivalitsin",
		"editor.field.show_tools_button": "Työkalupainike",
		"editor.field.show_tooltip": "Työkaluvihje",
		"editor.field.start_date": "Alkamispäivä",
		"editor.field.title": "Otsikko",
		"editor.field.title_color": "Otsikon väri",
		"editor.field.title_font_family": "Otsikon kirjasinperhe",
		"editor.field.title_font_size": "Otsikon kirjasinkoko",
		"editor.field.unit": "Yksikkö",
		"editor.option.absolute_date_range": "Absoluuttinen (päivämääräväli)",
		"editor.option.auto": "Automaattinen",
		"editor.option.column": "Pylväs",
		"editor.option.line": "Viiva",
		"editor.option.manual": "Manuaalinen",
		"editor.option.relative_hours": "Suhteellinen (tuntia)",
		"editor.option.stair": "Portaat",
		"editor.series.new_series": "Uusi sarja",
		"editor.series.no_entity_selected": "Ei entiteettiä valittu",
		"editor.series.remove": "Poista",
		"editor.tab.advanced": "Lisäasetukset",
		"editor.tab.button": "Painike",
		"editor.tab.display": "Näyttö",
		"editor.tab.entities": "Entiteetit",
		"editor.tab.header": "Ylätunniste",
		"editor.tab.range": "Väli",
		"editor.tab.style": "Tyyli",
		"editor.tab.tools": "Työkalut",
		"card.label.create_dashboard_card": "Luo hallintapaneelikortti",
		"editor.field.show_card_export_button": "Näytä kortin vientipainike",
		"export_dialog.title": "Luo hallintapaneelikortti",
		"export_dialog.card_type_label": "Korttityyppi",
		"export_dialog.card_type.inline": "Tavallinen kortti",
		"export_dialog.card_type.button": "Painikekortti",
		"export_dialog.instructions": "Kopioi tämä YAML Home Assistant -kortin koodieditoriin.",
		"export_dialog.yaml_label": "Kortin YAML",
		"export_dialog.copy": "Kopioi YAML",
		"export_dialog.copied": "YAML kopioitu",
		"export_dialog.copy_failed": "Automaattinen kopiointi epäonnistui. YAML on valittu manuaalista kopiointia varten.",
		"export_dialog.close": "Sulje",
		"export_dialog.imported_data_unsupported": "Tuotuja historiatietoja ei voi muuntaa Home Assistant -kortiksi.",
		"export_dialog.missing_snapshot": "Kaavion määritykset eivät ole käytettävissä.",
		"export_dialog.incompatible_component": "Upotettu historiakomponentti ei tue kortin vientiä. Päivitä korttiresurssi."
	},
	fr: {
		"card.error.no_configuration": "Aucune configuration.",
		"card.error.no_entities": "Configurez au moins une entité.",
		"card.label.fullscreen": "Plein écran",
		"card.label.hide_controls": "Masquer les contrôles",
		"card.label.show_controls": "Afficher les contrôles",
		"card.label.tools": "Outils",
		"card.label.create_dashboard_card": "Créer une carte",
		"common.loading": "Chargement",
		"dialog.title.history": "Historique",
		"dialog.loading_history": "Chargement de l'historique...",
		"dialog.label.exit_fullscreen": "Quitter le plein écran",
		"editor.date_range": "Plage de dates",
		"editor.field.attribute": "Attribut (chemin avec points, vide pour l'état)",
		"editor.field.attribute_units": "Unités d'attributs (objet JSON)",
		"editor.field.auto_scale_split": "Séparer automatiquement les échelles",
		"editor.field.button_color": "Couleur du bouton",
		"editor.field.button_hover_color": "Couleur au survol",
		"editor.field.button_hover_effect": "Effet au survol",
		"editor.field.button_icon": "Icône du bouton",
		"editor.field.button_label": "Libellé du bouton",
		"editor.field.button_show_icon": "Afficher l'icône du bouton",
		"editor.field.button_show_name": "Afficher le nom du bouton",
		"editor.field.card_background_color": "Couleur du fond de carte",
		"editor.field.card_background_opacity": "Opacité du fond de carte",
		"editor.field.color": "Couleur",
		"editor.field.debug_performance": "Performance debug",
		"editor.field.disable_climate_overlay": "Désactiver la surcouche climat",
		"editor.field.end_date": "Date de fin",
		"editor.field.entity": "Entité",
		"editor.field.forced": "Forcée (toujours affichée)",
		"editor.field.group": "Groupe",
		"editor.field.hours": "Heures",
		"editor.field.label": "Libellé",
		"editor.field.line_mode": "Mode de ligne",
		"editor.field.line_width": "Épaisseur de ligne",
		"editor.field.show_points": "Afficher les points de données",
		"editor.field.point_radius": "Rayon des points",
		"editor.field.range_mode": "Mode de plage",
		"editor.field.scale_group": "Groupe",
		"editor.field.scale_max": "Échelle max",
		"editor.field.scale_min": "Échelle min",
		"editor.field.scale_mode": "Mode d'échelle",
		"editor.field.series": "Séries (JSON)",
		"editor.field.show_controls": "État initial des sélecteurs",
		"editor.field.show_card_export_button": "Afficher le bouton d'export de carte",
		"editor.field.show_controls_toggle": "Bouton des contrôles",
		"editor.field.show_date_picker": "Sélecteur de dates",
		"editor.field.show_entity_picker": "Sélecteur d'entités",
		"editor.field.show_export_button": "Bouton d'export",
		"editor.field.show_fullscreen_button": "Bouton plein écran",
		"editor.field.show_grid": "Grille",
		"editor.field.show_import_button": "Bouton d'import",
		"editor.field.show_legend": "Légende",
		"editor.field.show_line_mode_buttons": "Boutons de mode de ligne",
		"editor.field.show_scale": "Échelle",
		"editor.field.show_time_range_selector": "Sélecteur de plage temporelle",
		"editor.field.show_tools_button": "Bouton outils",
		"editor.field.show_tooltip": "Infobulle",
		"editor.field.start_date": "Date de début",
		"editor.field.title": "Titre",
		"editor.field.title_color": "Couleur du titre",
		"editor.field.title_font_family": "Police du titre",
		"editor.field.title_font_size": "Taille du titre",
		"editor.field.unit": "Unité",
		"editor.option.absolute_date_range": "Absolue (plage de dates)",
		"editor.option.auto": "Auto",
		"editor.option.column": "Colonnes",
		"editor.option.line": "Ligne",
		"editor.option.manual": "Manuelle",
		"editor.option.relative_hours": "Relative (heures)",
		"editor.option.stair": "Escalier",
		"editor.series.new_series": "Nouvelle série",
		"editor.series.no_entity_selected": "Aucune entité sélectionnée",
		"editor.series.remove": "Supprimer",
		"editor.tab.advanced": "Avancé",
		"editor.tab.button": "Bouton",
		"editor.tab.display": "Affichage",
		"editor.tab.entities": "Entités",
		"editor.tab.header": "En-tête",
		"editor.tab.range": "Plage",
		"editor.tab.style": "Style",
		"editor.tab.tools": "Outils",
		"export_dialog.title": "Créer une carte de dashboard",
		"export_dialog.card_type_label": "Type de carte",
		"export_dialog.card_type.inline": "Carte normale",
		"export_dialog.card_type.button": "Carte bouton",
		"export_dialog.instructions": "Copiez ce YAML dans l'éditeur de code d'une carte Home Assistant.",
		"export_dialog.yaml_label": "YAML de la carte",
		"export_dialog.copy": "Copier le YAML",
		"export_dialog.copied": "YAML copié",
		"export_dialog.copy_failed": "La copie automatique a échoué. Le YAML est sélectionné pour permettre une copie manuelle.",
		"export_dialog.close": "Fermer",
		"export_dialog.imported_data_unsupported": "Les données d'historique importées ne peuvent pas être converties en carte Home Assistant.",
		"export_dialog.missing_snapshot": "La configuration du graphique n'est pas disponible.",
		"export_dialog.incompatible_component": "Le composant d'historique intégré ne prend pas en charge l'export de carte. Mettez à jour la ressource de la carte."
	},
	hu: {
		"card.error.no_configuration": "Nincs konfiguráció.",
		"card.error.no_entities": "Legalább egy entitást konfiguráljon.",
		"card.label.fullscreen": "Teljes képernyő",
		"card.label.hide_controls": "Vezérlők elrejtése",
		"card.label.show_controls": "Vezérlők megjelenítése",
		"card.label.tools": "Eszközök",
		"common.loading": "Betöltés",
		"dialog.title.history": "Előzmények",
		"dialog.loading_history": "Előzmények betöltése...",
		"dialog.label.exit_fullscreen": "Kilépés a teljes képernyőből",
		"editor.date_range": "Dátumtartomány",
		"editor.field.attribute": "Attribútum (pontozott útvonal, hagyja üresen az állapothoz)",
		"editor.field.attribute_units": "Attribútum egységek (JSON objektum)",
		"editor.field.button_color": "Gomb színe",
		"editor.field.button_hover_color": "Hover szín",
		"editor.field.button_hover_effect": "Hover effektus",
		"editor.field.button_icon": "Gomb ikon",
		"editor.field.button_label": "Gomb címke",
		"editor.field.button_show_icon": "Gomb ikon megjelenítése",
		"editor.field.button_show_name": "Gomb név megjelenítése",
		"editor.field.color": "Szín",
		"editor.field.debug_performance": "Teljesítmény hibakeresés",
		"editor.field.disable_climate_overlay": "Klíma átfedés letiltása",
		"editor.field.end_date": "Befejezés dátuma",
		"editor.field.entity": "Entitás",
		"editor.field.forced": "Kényszerített (mindig látható)",
		"editor.field.hours": "Órák",
		"editor.field.label": "Címke",
		"editor.field.line_mode": "Vonal mód",
		"editor.field.line_width": "Vonalvastagság",
		"editor.field.show_points": "Adatpontok megjelenítése",
		"editor.field.point_radius": "Pontok sugara",
		"editor.field.range_mode": "Tartomány mód",
		"editor.field.scale_group": "Skála csoport",
		"editor.field.scale_max": "Skála maximum",
		"editor.field.scale_min": "Skála minimum",
		"editor.field.scale_mode": "Skála mód",
		"editor.field.series": "Sorozat (JSON)",
		"editor.field.show_controls": "Választók kezdeti állapota",
		"editor.field.show_controls_toggle": "Vezérlők váltógomb",
		"editor.field.show_date_picker": "Dátumválasztó",
		"editor.field.show_entity_picker": "Entitásválasztó",
		"editor.field.show_export_button": "Exportálás gomb",
		"editor.field.show_fullscreen_button": "Teljes képernyő gomb",
		"editor.field.show_grid": "Rács",
		"editor.field.show_import_button": "Importálás gomb",
		"editor.field.show_legend": "Jelmagyarázat",
		"editor.field.show_line_mode_buttons": "Vonal mód gombok",
		"editor.field.show_scale": "Skála",
		"editor.field.show_time_range_selector": "Időtartomány választó",
		"editor.field.show_tools_button": "Eszközök gomb",
		"editor.field.show_tooltip": "Eszköztipp",
		"editor.field.start_date": "Kezdés dátuma",
		"editor.field.title": "Cím",
		"editor.field.title_color": "Cím színe",
		"editor.field.title_font_family": "Cím betűtípus család",
		"editor.field.title_font_size": "Cím betűméret",
		"editor.field.unit": "Egység",
		"editor.option.absolute_date_range": "Abszolút (dátumtartomány)",
		"editor.option.auto": "Automatikus",
		"editor.option.column": "Oszlop",
		"editor.option.line": "Vonal",
		"editor.option.manual": "Kézi",
		"editor.option.relative_hours": "Relatív (órák)",
		"editor.option.stair": "Lépcső",
		"editor.series.new_series": "Új sorozat",
		"editor.series.no_entity_selected": "Nincs entitás kiválasztva",
		"editor.series.remove": "Eltávolítás",
		"editor.tab.advanced": "Speciális",
		"editor.tab.button": "Gomb",
		"editor.tab.display": "Megjelenítés",
		"editor.tab.entities": "Entitások",
		"editor.tab.header": "Fejléc",
		"editor.tab.range": "Tartomány",
		"editor.tab.style": "Stílus",
		"editor.tab.tools": "Eszközök",
		"card.label.create_dashboard_card": "Irányítópult-kártya létrehozása",
		"editor.field.show_card_export_button": "Kártyaexport gomb megjelenítése",
		"export_dialog.title": "Irányítópult-kártya létrehozása",
		"export_dialog.card_type_label": "Kártyatípus",
		"export_dialog.card_type.inline": "Normál kártya",
		"export_dialog.card_type.button": "Gombkártya",
		"export_dialog.instructions": "Másolja ezt a YAML-t egy Home Assistant-kártya kódszerkesztőjébe.",
		"export_dialog.yaml_label": "Kártya YAML",
		"export_dialog.copy": "YAML másolása",
		"export_dialog.copied": "YAML másolva",
		"export_dialog.copy_failed": "Az automatikus másolás sikertelen. A YAML ki van jelölve kézi másoláshoz.",
		"export_dialog.close": "Bezárás",
		"export_dialog.imported_data_unsupported": "Az importált előzményadatok nem alakíthatók Home Assistant-kártyává.",
		"export_dialog.missing_snapshot": "A grafikon konfigurációja nem érhető el.",
		"export_dialog.incompatible_component": "A beágyazott előzménykomponens nem támogatja a kártyaexportot. Frissítse a kártya erőforrását."
	},
	it: {
		"card.error.no_configuration": "Nessuna configurazione.",
		"card.error.no_entities": "Configurare almeno un'entità.",
		"card.label.fullscreen": "Schermo intero",
		"card.label.hide_controls": "Nascondi controlli",
		"card.label.show_controls": "Mostra controlli",
		"card.label.tools": "Strumenti",
		"common.loading": "Caricamento",
		"dialog.title.history": "Cronologia",
		"dialog.loading_history": "Caricamento cronologia...",
		"dialog.label.exit_fullscreen": "Esci dallo schermo intero",
		"editor.date_range": "Intervallo di date",
		"editor.field.attribute": "Attributo (percorso con punto, lasciare vuoto per lo stato)",
		"editor.field.attribute_units": "Unità dell'attributo (oggetto JSON)",
		"editor.field.button_color": "Colore pulsante",
		"editor.field.button_hover_color": "Colore hover",
		"editor.field.button_hover_effect": "Effetto hover",
		"editor.field.button_icon": "Icona pulsante",
		"editor.field.button_label": "Etichetta pulsante",
		"editor.field.button_show_icon": "Mostra icona pulsante",
		"editor.field.button_show_name": "Mostra nome pulsante",
		"editor.field.color": "Colore",
		"editor.field.debug_performance": "Debug prestazioni",
		"editor.field.disable_climate_overlay": "Disattiva sovrapposizione clima",
		"editor.field.end_date": "Data di fine",
		"editor.field.entity": "Entità",
		"editor.field.forced": "Forzato (sempre mostrato)",
		"editor.field.hours": "Ore",
		"editor.field.label": "Etichetta",
		"editor.field.line_mode": "Modalità linea",
		"editor.field.line_width": "Larghezza linea",
		"editor.field.show_points": "Mostra punti dati",
		"editor.field.point_radius": "Raggio dei punti",
		"editor.field.range_mode": "Modalità intervallo",
		"editor.field.scale_group": "Gruppo scala",
		"editor.field.scale_max": "Scala massima",
		"editor.field.scale_min": "Scala minima",
		"editor.field.scale_mode": "Modalità scala",
		"editor.field.series": "Serie (JSON)",
		"editor.field.show_controls": "Stato iniziale dei selettori",
		"editor.field.show_controls_toggle": "Pulsante di commutazione controlli",
		"editor.field.show_date_picker": "Selettore data",
		"editor.field.show_entity_picker": "Selettore entità",
		"editor.field.show_export_button": "Pulsante di esportazione",
		"editor.field.show_fullscreen_button": "Pulsante schermo intero",
		"editor.field.show_grid": "Griglia",
		"editor.field.show_import_button": "Pulsante di importazione",
		"editor.field.show_legend": "Legenda",
		"editor.field.show_line_mode_buttons": "Pulsanti modalità linea",
		"editor.field.show_scale": "Scala",
		"editor.field.show_time_range_selector": "Selettore intervallo di tempo",
		"editor.field.show_tools_button": "Pulsante strumenti",
		"editor.field.show_tooltip": "Suggerimento",
		"editor.field.start_date": "Data di inizio",
		"editor.field.title": "Titolo",
		"editor.field.title_color": "Colore titolo",
		"editor.field.title_font_family": "Famiglia di caratteri del titolo",
		"editor.field.title_font_size": "Dimensione carattere del titolo",
		"editor.field.unit": "Unità",
		"editor.option.absolute_date_range": "Assoluto (intervallo di date)",
		"editor.option.auto": "Automatico",
		"editor.option.column": "Colonna",
		"editor.option.line": "Linea",
		"editor.option.manual": "Manuale",
		"editor.option.relative_hours": "Relativo (ore)",
		"editor.option.stair": "A gradini",
		"editor.series.new_series": "Nuova serie",
		"editor.series.no_entity_selected": "Nessuna entità selezionata",
		"editor.series.remove": "Rimuovi",
		"editor.tab.advanced": "Avanzato",
		"editor.tab.button": "Pulsante",
		"editor.tab.display": "Visualizzazione",
		"editor.tab.entities": "Entità",
		"editor.tab.header": "Intestazione",
		"editor.tab.range": "Intervallo",
		"editor.tab.style": "Stile",
		"editor.tab.tools": "Strumenti",
		"card.label.create_dashboard_card": "Crea scheda dashboard",
		"editor.field.show_card_export_button": "Mostra il pulsante di esportazione della scheda",
		"export_dialog.title": "Crea scheda dashboard",
		"export_dialog.card_type_label": "Tipo di scheda",
		"export_dialog.card_type.inline": "Scheda standard",
		"export_dialog.card_type.button": "Scheda pulsante",
		"export_dialog.instructions": "Copia questo YAML nell'editor di codice di una scheda Home Assistant.",
		"export_dialog.yaml_label": "YAML della scheda",
		"export_dialog.copy": "Copia YAML",
		"export_dialog.copied": "YAML copiato",
		"export_dialog.copy_failed": "La copia automatica non è riuscita. Il YAML è selezionato per la copia manuale.",
		"export_dialog.close": "Chiudi",
		"export_dialog.imported_data_unsupported": "I dati della cronologia importati non possono essere convertiti in una scheda Home Assistant.",
		"export_dialog.missing_snapshot": "La configurazione del grafico non è disponibile.",
		"export_dialog.incompatible_component": "Il componente della cronologia integrato non supporta l'esportazione della scheda. Aggiorna la risorsa della scheda."
	},
	nl: {
		"card.error.no_configuration": "Geen configuratie.",
		"card.error.no_entities": "Configureer ten minste één entiteit.",
		"card.label.fullscreen": "Volledig scherm",
		"card.label.hide_controls": "Bediening verbergen",
		"card.label.show_controls": "Bediening tonen",
		"card.label.tools": "Gereedschappen",
		"common.loading": "Laden",
		"dialog.title.history": "Geschiedenis",
		"dialog.loading_history": "Geschiedenis laden...",
		"dialog.label.exit_fullscreen": "Volledig scherm verlaten",
		"editor.date_range": "Datumbereik",
		"editor.field.attribute": "Attribuut (pad met punt, leeg laten voor status)",
		"editor.field.attribute_units": "Attribuuteenheden (JSON-object)",
		"editor.field.button_color": "Knopkleur",
		"editor.field.button_hover_color": "Hover-kleur",
		"editor.field.button_hover_effect": "Hover-effect",
		"editor.field.button_icon": "Knoppictogram",
		"editor.field.button_label": "Knoplabel",
		"editor.field.button_show_icon": "Knoppictogram tonen",
		"editor.field.button_show_name": "Knopnaam tonen",
		"editor.field.color": "Kleur",
		"editor.field.debug_performance": "Prestaties debuggen",
		"editor.field.disable_climate_overlay": "Klimaatoverlay uitschakelen",
		"editor.field.end_date": "Einddatum",
		"editor.field.entity": "Entiteit",
		"editor.field.forced": "Geforceerd (altijd weergegeven)",
		"editor.field.hours": "Uren",
		"editor.field.label": "Label",
		"editor.field.line_mode": "Lijnmodus",
		"editor.field.line_width": "Lijndikte",
		"editor.field.show_points": "Gegevenspunten tonen",
		"editor.field.point_radius": "Puntstraal",
		"editor.field.range_mode": "Bereikmodus",
		"editor.field.scale_group": "Schaalgroep",
		"editor.field.scale_max": "Schaalmaximum",
		"editor.field.scale_min": "Schaalminimum",
		"editor.field.scale_mode": "Schaalmodus",
		"editor.field.series": "Serie (JSON)",
		"editor.field.show_controls": "Beginstatus van kiezers",
		"editor.field.show_controls_toggle": "Bediening schakelknop",
		"editor.field.show_date_picker": "Datumkiezer",
		"editor.field.show_entity_picker": "Entiteitskiezer",
		"editor.field.show_export_button": "Exportknop",
		"editor.field.show_fullscreen_button": "Volledig scherm-knop",
		"editor.field.show_grid": "Raster",
		"editor.field.show_import_button": "Importknop",
		"editor.field.show_legend": "Legenda",
		"editor.field.show_line_mode_buttons": "Lijnmodusknoppen",
		"editor.field.show_scale": "Schaal",
		"editor.field.show_time_range_selector": "Tijdsbereikkiezer",
		"editor.field.show_tools_button": "Gereedschapsknop",
		"editor.field.show_tooltip": "Tooltip",
		"editor.field.start_date": "Startdatum",
		"editor.field.title": "Titel",
		"editor.field.title_color": "Titelkleur",
		"editor.field.title_font_family": "Titel lettertypefamilie",
		"editor.field.title_font_size": "Titel lettergrootte",
		"editor.field.unit": "Eenheid",
		"editor.option.absolute_date_range": "Absoluut (datumbereik)",
		"editor.option.auto": "Auto",
		"editor.option.column": "Kolom",
		"editor.option.line": "Lijn",
		"editor.option.manual": "Handmatig",
		"editor.option.relative_hours": "Relatief (uren)",
		"editor.option.stair": "Trap",
		"editor.series.new_series": "Nieuwe serie",
		"editor.series.no_entity_selected": "Geen entiteit geselecteerd",
		"editor.series.remove": "Verwijderen",
		"editor.tab.advanced": "Geavanceerd",
		"editor.tab.button": "Knop",
		"editor.tab.display": "Weergave",
		"editor.tab.entities": "Entiteiten",
		"editor.tab.header": "Koptekst",
		"editor.tab.range": "Bereik",
		"editor.tab.style": "Stijl",
		"editor.tab.tools": "Gereedschappen",
		"card.label.create_dashboard_card": "Dashboardkaart maken",
		"editor.field.show_card_export_button": "Knop voor kaart-export tonen",
		"export_dialog.title": "Dashboardkaart maken",
		"export_dialog.card_type_label": "Kaarttype",
		"export_dialog.card_type.inline": "Standaardkaart",
		"export_dialog.card_type.button": "Knopkaart",
		"export_dialog.instructions": "Kopieer deze YAML naar de code-editor van een Home Assistant-kaart.",
		"export_dialog.yaml_label": "Kaart-YAML",
		"export_dialog.copy": "YAML kopiëren",
		"export_dialog.copied": "YAML gekopieerd",
		"export_dialog.copy_failed": "Automatisch kopiëren is mislukt. De YAML is geselecteerd voor handmatig kopiëren.",
		"export_dialog.close": "Sluiten",
		"export_dialog.imported_data_unsupported": "Geïmporteerde geschiedenisgegevens kunnen niet worden omgezet in een Home Assistant-kaart.",
		"export_dialog.missing_snapshot": "De grafiekconfiguratie is niet beschikbaar.",
		"export_dialog.incompatible_component": "De ingebouwde geschiedeniscomponent ondersteunt kaart-export niet. Werk de kaartbron bij."
	},
	no: {
		"card.error.no_configuration": "Ingen konfigurasjon.",
		"card.error.no_entities": "Konfigurer minst én enhet.",
		"card.label.fullscreen": "Fullskjerm",
		"card.label.hide_controls": "Skjul kontroller",
		"card.label.show_controls": "Vis kontroller",
		"card.label.tools": "Verktøy",
		"common.loading": "Laster",
		"dialog.title.history": "Historikk",
		"dialog.loading_history": "Laster historikk...",
		"dialog.label.exit_fullscreen": "Avslutt fullskjerm",
		"editor.date_range": "Datoperiode",
		"editor.field.attribute": "Attributt (sti med punktum, la stå tomt for tilstand)",
		"editor.field.attribute_units": "Attributtenheter (JSON-objekt)",
		"editor.field.button_color": "Knappfarge",
		"editor.field.button_hover_color": "Hover-farge",
		"editor.field.button_hover_effect": "Hover-effekt",
		"editor.field.button_icon": "Knappikon",
		"editor.field.button_label": "Knappeetikett",
		"editor.field.button_show_icon": "Vis knappikon",
		"editor.field.button_show_name": "Vis knappnavn",
		"editor.field.color": "Farge",
		"editor.field.debug_performance": "Feilsøk ytelse",
		"editor.field.disable_climate_overlay": "Deaktiver klimaoverlegg",
		"editor.field.end_date": "Sluttdato",
		"editor.field.entity": "Enhet",
		"editor.field.forced": "Tvunget (alltid vist)",
		"editor.field.hours": "Timer",
		"editor.field.label": "Etikett",
		"editor.field.line_mode": "Linjemodus",
		"editor.field.line_width": "Linjebredde",
		"editor.field.show_points": "Vis datapunkter",
		"editor.field.point_radius": "Punktradius",
		"editor.field.range_mode": "Periodemodus",
		"editor.field.scale_group": "Skalagruppe",
		"editor.field.scale_max": "Skala maksimum",
		"editor.field.scale_min": "Skala minimum",
		"editor.field.scale_mode": "Skalamodus",
		"editor.field.series": "Serie (JSON)",
		"editor.field.show_controls": "Starttilstand for velgere",
		"editor.field.show_controls_toggle": "Kontroller veksleknapp",
		"editor.field.show_date_picker": "Datovelger",
		"editor.field.show_entity_picker": "Enhetsvelger",
		"editor.field.show_export_button": "Eksportknapp",
		"editor.field.show_fullscreen_button": "Fullskjermknapp",
		"editor.field.show_grid": "Rutenett",
		"editor.field.show_import_button": "Importknapp",
		"editor.field.show_legend": "Forklaring",
		"editor.field.show_line_mode_buttons": "Linjemodusknaper",
		"editor.field.show_scale": "Skala",
		"editor.field.show_time_range_selector": "Tidsperiodevelger",
		"editor.field.show_tools_button": "Verktøyknapp",
		"editor.field.show_tooltip": "Verktøytips",
		"editor.field.start_date": "Startdato",
		"editor.field.title": "Tittel",
		"editor.field.title_color": "Tittelfarge",
		"editor.field.title_font_family": "Tittel skrifttypefamilie",
		"editor.field.title_font_size": "Tittel skriftstørrelse",
		"editor.field.unit": "Enhet",
		"editor.option.absolute_date_range": "Absolutt (datoperiode)",
		"editor.option.auto": "Auto",
		"editor.option.column": "Kolonne",
		"editor.option.line": "Linje",
		"editor.option.manual": "Manuell",
		"editor.option.relative_hours": "Relativ (timer)",
		"editor.option.stair": "Trappetrinn",
		"editor.series.new_series": "Ny serie",
		"editor.series.no_entity_selected": "Ingen enhet valgt",
		"editor.series.remove": "Fjern",
		"editor.tab.advanced": "Avansert",
		"editor.tab.button": "Knapp",
		"editor.tab.display": "Visning",
		"editor.tab.entities": "Enheter",
		"editor.tab.header": "Topptekst",
		"editor.tab.range": "Periode",
		"editor.tab.style": "Stil",
		"editor.tab.tools": "Verktøy",
		"card.label.create_dashboard_card": "Opprett dashbordkort",
		"editor.field.show_card_export_button": "Vis knapp for eksport av kort",
		"export_dialog.title": "Opprett dashbordkort",
		"export_dialog.card_type_label": "Korttype",
		"export_dialog.card_type.inline": "Standardkort",
		"export_dialog.card_type.button": "Knappkort",
		"export_dialog.instructions": "Kopier denne YAML-en til kodeeditoren for et Home Assistant-kort.",
		"export_dialog.yaml_label": "Kort-YAML",
		"export_dialog.copy": "Kopier YAML",
		"export_dialog.copied": "YAML kopiert",
		"export_dialog.copy_failed": "Automatisk kopiering mislyktes. YAML-en er valgt for manuell kopiering.",
		"export_dialog.close": "Lukk",
		"export_dialog.imported_data_unsupported": "Importerte historikkdata kan ikke konverteres til et Home Assistant-kort.",
		"export_dialog.missing_snapshot": "Grafkonfigurasjonen er ikke tilgjengelig.",
		"export_dialog.incompatible_component": "Den innebygde historikkkomponenten støtter ikke korteksport. Oppdater kortressursen."
	},
	pl: {
		"card.error.no_configuration": "Brak konfiguracji.",
		"card.error.no_entities": "Skonfiguruj przynajmniej jedną encję.",
		"card.label.fullscreen": "Pełny ekran",
		"card.label.hide_controls": "Ukryj elementy sterujące",
		"card.label.show_controls": "Pokaż elementy sterujące",
		"card.label.tools": "Narzędzia",
		"common.loading": "Ładowanie",
		"dialog.title.history": "Historia",
		"dialog.loading_history": "Ładowanie historii...",
		"dialog.label.exit_fullscreen": "Opuść pełny ekran",
		"editor.date_range": "Zakres dat",
		"editor.field.attribute": "Atrybut (ścieżka z kropką, zostaw puste dla stanu)",
		"editor.field.attribute_units": "Jednostki atrybutu (obiekt JSON)",
		"editor.field.button_color": "Kolor przycisku",
		"editor.field.button_hover_color": "Kolor po najechaniu",
		"editor.field.button_hover_effect": "Efekt po najechaniu",
		"editor.field.button_icon": "Ikona przycisku",
		"editor.field.button_label": "Etykieta przycisku",
		"editor.field.button_show_icon": "Pokaż ikonę przycisku",
		"editor.field.button_show_name": "Pokaż nazwę przycisku",
		"editor.field.color": "Kolor",
		"editor.field.debug_performance": "Debugowanie wydajności",
		"editor.field.disable_climate_overlay": "Wyłącz nakładkę klimatu",
		"editor.field.end_date": "Data końcowa",
		"editor.field.entity": "Encja",
		"editor.field.forced": "Wymuszone (zawsze widoczne)",
		"editor.field.hours": "Godziny",
		"editor.field.label": "Etykieta",
		"editor.field.line_mode": "Tryb linii",
		"editor.field.line_width": "Grubość linii",
		"editor.field.show_points": "Pokaż punkty danych",
		"editor.field.point_radius": "Promień punktów",
		"editor.field.range_mode": "Tryb zakresu",
		"editor.field.scale_group": "Grupa skali",
		"editor.field.scale_max": "Maksimum skali",
		"editor.field.scale_min": "Minimum skali",
		"editor.field.scale_mode": "Tryb skali",
		"editor.field.series": "Seria (JSON)",
		"editor.field.show_controls": "Stan początkowy selektorów",
		"editor.field.show_controls_toggle": "Przycisk przełączania kontrolek",
		"editor.field.show_date_picker": "Wybór daty",
		"editor.field.show_entity_picker": "Wybór encji",
		"editor.field.show_export_button": "Przycisk eksportu",
		"editor.field.show_fullscreen_button": "Przycisk pełnego ekranu",
		"editor.field.show_grid": "Siatka",
		"editor.field.show_import_button": "Przycisk importu",
		"editor.field.show_legend": "Legenda",
		"editor.field.show_line_mode_buttons": "Przyciski trybu linii",
		"editor.field.show_scale": "Skala",
		"editor.field.show_time_range_selector": "Wybór zakresu czasu",
		"editor.field.show_tools_button": "Przycisk narzędzi",
		"editor.field.show_tooltip": "Podpowiedź",
		"editor.field.start_date": "Data początkowa",
		"editor.field.title": "Tytuł",
		"editor.field.title_color": "Kolor tytułu",
		"editor.field.title_font_family": "Rodzina czcionek tytułu",
		"editor.field.title_font_size": "Rozmiar czcionki tytułu",
		"editor.field.unit": "Jednostka",
		"editor.option.absolute_date_range": "Bezwzględny (zakres dat)",
		"editor.option.auto": "Automatyczny",
		"editor.option.column": "Kolumna",
		"editor.option.line": "Linia",
		"editor.option.manual": "Ręczny",
		"editor.option.relative_hours": "Względny (godziny)",
		"editor.option.stair": "Schodkowy",
		"editor.series.new_series": "Nowa seria",
		"editor.series.no_entity_selected": "Nie wybrano encji",
		"editor.series.remove": "Usuń",
		"editor.tab.advanced": "Zaawansowane",
		"editor.tab.button": "Przycisk",
		"editor.tab.display": "Wyświetlanie",
		"editor.tab.entities": "Encje",
		"editor.tab.header": "Nagłówek",
		"editor.tab.range": "Zakres",
		"editor.tab.style": "Styl",
		"editor.tab.tools": "Narzędzia",
		"card.label.create_dashboard_card": "Utwórz kartę panelu",
		"editor.field.show_card_export_button": "Pokaż przycisk eksportu karty",
		"export_dialog.title": "Utwórz kartę panelu",
		"export_dialog.card_type_label": "Typ karty",
		"export_dialog.card_type.inline": "Karta standardowa",
		"export_dialog.card_type.button": "Karta przycisku",
		"export_dialog.instructions": "Skopiuj ten YAML do edytora kodu karty Home Assistant.",
		"export_dialog.yaml_label": "YAML karty",
		"export_dialog.copy": "Kopiuj YAML",
		"export_dialog.copied": "YAML skopiowany",
		"export_dialog.copy_failed": "Automatyczne kopiowanie nie powiodło się. YAML został zaznaczony do ręcznego skopiowania.",
		"export_dialog.close": "Zamknij",
		"export_dialog.imported_data_unsupported": "Zaimportowanych danych historii nie można przekształcić w kartę Home Assistant.",
		"export_dialog.missing_snapshot": "Konfiguracja wykresu jest niedostępna.",
		"export_dialog.incompatible_component": "Osadzony komponent historii nie obsługuje eksportu karty. Zaktualizuj zasób karty."
	},
	pt: {
		"card.error.no_configuration": "Sem configuração.",
		"card.error.no_entities": "Configure pelo menos uma entidade.",
		"card.label.fullscreen": "Ecrã completo",
		"card.label.hide_controls": "Ocultar controlos",
		"card.label.show_controls": "Mostrar controlos",
		"card.label.tools": "Ferramentas",
		"common.loading": "A carregar",
		"dialog.title.history": "Histórico",
		"dialog.loading_history": "A carregar histórico...",
		"dialog.label.exit_fullscreen": "Sair do ecrã completo",
		"editor.date_range": "Intervalo de datas",
		"editor.field.attribute": "Atributo (caminho com ponto, deixar vazio para o estado)",
		"editor.field.attribute_units": "Unidades do atributo (objeto JSON)",
		"editor.field.button_color": "Cor do botão",
		"editor.field.button_hover_color": "Cor ao passar o rato",
		"editor.field.button_hover_effect": "Efeito ao passar o rato",
		"editor.field.button_icon": "Ícone do botão",
		"editor.field.button_label": "Rótulo do botão",
		"editor.field.button_show_icon": "Mostrar ícone do botão",
		"editor.field.button_show_name": "Mostrar nome do botão",
		"editor.field.color": "Cor ",
		"editor.field.debug_performance": "Depurar desempenho",
		"editor.field.disable_climate_overlay": "Desativar sobreposição climática",
		"editor.field.end_date": "Data de fim",
		"editor.field.entity": "Entidade",
		"editor.field.forced": "Forçado (sempre visível)",
		"editor.field.hours": "Horas",
		"editor.field.label": "Rótulo",
		"editor.field.line_mode": "Modo de linha",
		"editor.field.line_width": "Espessura da linha",
		"editor.field.show_points": "Mostrar pontos de dados",
		"editor.field.point_radius": "Raio dos pontos",
		"editor.field.range_mode": "Modo de intervalo",
		"editor.field.scale_group": "Grupo de escala",
		"editor.field.scale_max": "Escala máxima",
		"editor.field.scale_min": "Escala mínima",
		"editor.field.scale_mode": "Modo de escala",
		"editor.field.series": "Série (JSON)",
		"editor.field.show_controls": "Estado inicial dos seletores",
		"editor.field.show_controls_toggle": "Botão de alternar controlos",
		"editor.field.show_date_picker": "Seletor de data",
		"editor.field.show_entity_picker": "Seletor de entidade",
		"editor.field.show_export_button": "Botão de exportação",
		"editor.field.show_fullscreen_button": "Botão de ecrã completo",
		"editor.field.show_grid": "Grelha",
		"editor.field.show_import_button": "Botão de importação",
		"editor.field.show_legend": "Legenda",
		"editor.field.show_line_mode_buttons": "Botões de modo de linha",
		"editor.field.show_scale": "Escala",
		"editor.field.show_time_range_selector": "Seletor de intervalo de tempo",
		"editor.field.show_tools_button": "Botão de ferramentas",
		"editor.field.show_tooltip": "Dica de ferramenta",
		"editor.field.start_date": "Data de início",
		"editor.field.title": "Título",
		"editor.field.title_color": "Cor do título",
		"editor.field.title_font_family": "Família tipográfica do título",
		"editor.field.title_font_size": "Tamanho da letra do título",
		"editor.field.unit": "Unidade",
		"editor.option.absolute_date_range": "Absoluto (intervalo de datas)",
		"editor.option.auto": "Automático",
		"editor.option.column": "Coluna",
		"editor.option.line": "Linha",
		"editor.option.manual": "Manual",
		"editor.option.relative_hours": "Relativo (horas)",
		"editor.option.stair": "Escada",
		"editor.series.new_series": "Nova série",
		"editor.series.no_entity_selected": "Nenhuma entidade selecionada",
		"editor.series.remove": "Remover",
		"editor.tab.advanced": "Avançado",
		"editor.tab.button": "Botão",
		"editor.tab.display": "Visualização",
		"editor.tab.entities": "Entidades",
		"editor.tab.header": "Cabeçalho",
		"editor.tab.range": "Intervalo",
		"editor.tab.style": "Estilo",
		"editor.tab.tools": "Ferramentas",
		"card.label.create_dashboard_card": "Criar cartão de painel",
		"editor.field.show_card_export_button": "Mostrar botão de exportação do cartão",
		"export_dialog.title": "Criar cartão de painel",
		"export_dialog.card_type_label": "Tipo de cartão",
		"export_dialog.card_type.inline": "Cartão padrão",
		"export_dialog.card_type.button": "Cartão de botão",
		"export_dialog.instructions": "Copie este YAML para o editor de código de um cartão do Home Assistant.",
		"export_dialog.yaml_label": "YAML do cartão",
		"export_dialog.copy": "Copiar YAML",
		"export_dialog.copied": "YAML copiado",
		"export_dialog.copy_failed": "A cópia automática falhou. O YAML está selecionado para cópia manual.",
		"export_dialog.close": "Fechar",
		"export_dialog.imported_data_unsupported": "Os dados de histórico importados não podem ser convertidos num cartão do Home Assistant.",
		"export_dialog.missing_snapshot": "A configuração do gráfico não está disponível.",
		"export_dialog.incompatible_component": "O componente de histórico integrado não suporta a exportação de cartões. Atualize o recurso do cartão."
	},
	ru: {
		"card.error.no_configuration": "Нет конфигурации.",
		"card.error.no_entities": "Настройте хотя бы одну сущность.",
		"card.label.fullscreen": "Полный экран",
		"card.label.hide_controls": "Скрыть элементы управления",
		"card.label.show_controls": "Показать элементы управления",
		"card.label.tools": "Инструменты",
		"common.loading": "Загрузка",
		"dialog.title.history": "История",
		"dialog.loading_history": "Загрузка истории...",
		"dialog.label.exit_fullscreen": "Выйти из полноэкранного режима",
		"editor.date_range": "Диапазон дат",
		"editor.field.attribute": "Атрибут (путь через точку, оставьте пустым для состояния)",
		"editor.field.attribute_units": "Единицы атрибута (объект JSON)",
		"editor.field.button_color": "Цвет кнопки",
		"editor.field.button_hover_color": "Цвет при наведении",
		"editor.field.button_hover_effect": "Эффект при наведении",
		"editor.field.button_icon": "Значок кнопки",
		"editor.field.button_label": "Надпись кнопки",
		"editor.field.button_show_icon": "Показать значок кнопки",
		"editor.field.button_show_name": "Показать название кнопки",
		"editor.field.color": "Цвет (значение CSS)",
		"editor.field.debug_performance": "Отладка производительности",
		"editor.field.disable_climate_overlay": "Отключить климатическое наложение",
		"editor.field.end_date": "Дата окончания",
		"editor.field.entity": "Сущность",
		"editor.field.forced": "Принудительно (всегда отображается)",
		"editor.field.hours": "Часы",
		"editor.field.label": "Надпись",
		"editor.field.line_mode": "Режим линии",
		"editor.field.line_width": "Толщина линии",
		"editor.field.show_points": "Показывать точки данных",
		"editor.field.point_radius": "Радиус точек",
		"editor.field.range_mode": "Режим диапазона",
		"editor.field.scale_group": "Группа шкалы",
		"editor.field.scale_max": "Максимум шкалы",
		"editor.field.scale_min": "Минимум шкалы",
		"editor.field.scale_mode": "Режим шкалы",
		"editor.field.series": "Серия (JSON)",
		"editor.field.show_controls": "Начальное состояние селекторов",
		"editor.field.show_controls_toggle": "Кнопка переключения элементов управления",
		"editor.field.show_date_picker": "Выбор даты",
		"editor.field.show_entity_picker": "Выбор сущности",
		"editor.field.show_export_button": "Кнопка экспорта",
		"editor.field.show_fullscreen_button": "Кнопка полного экрана",
		"editor.field.show_grid": "Сетка",
		"editor.field.show_import_button": "Кнопка импорта",
		"editor.field.show_legend": "Легенда",
		"editor.field.show_line_mode_buttons": "Кнопки режима линии",
		"editor.field.show_scale": "Шкала",
		"editor.field.show_time_range_selector": "Выбор временнóго диапазона",
		"editor.field.show_tools_button": "Кнопка инструментов",
		"editor.field.show_tooltip": "Подсказка",
		"editor.field.start_date": "Дата начала",
		"editor.field.title": "Заголовок",
		"editor.field.title_color": "Цвет заголовка",
		"editor.field.title_font_family": "Шрифт заголовка",
		"editor.field.title_font_size": "Размер шрифта заголовка",
		"editor.field.unit": "Единица измерения",
		"editor.option.absolute_date_range": "Абсолютный (диапазон дат)",
		"editor.option.auto": "Авто",
		"editor.option.column": "Столбец",
		"editor.option.line": "Линия",
		"editor.option.manual": "Вручную",
		"editor.option.relative_hours": "Относительный (часы)",
		"editor.option.stair": "Ступенчатая",
		"editor.series.new_series": "Новая серия",
		"editor.series.no_entity_selected": "Сущность не выбрана",
		"editor.series.remove": "Удалить",
		"editor.tab.advanced": "Дополнительно",
		"editor.tab.button": "Кнопка",
		"editor.tab.display": "Отображение",
		"editor.tab.entities": "Сущности",
		"editor.tab.header": "Заголовок",
		"editor.tab.range": "Диапазон",
		"editor.tab.style": "Стиль",
		"editor.tab.tools": "Инструменты",
		"card.label.create_dashboard_card": "Создать карточку панели",
		"editor.field.show_card_export_button": "Показывать кнопку экспорта карточки",
		"export_dialog.title": "Создать карточку панели",
		"export_dialog.card_type_label": "Тип карточки",
		"export_dialog.card_type.inline": "Обычная карточка",
		"export_dialog.card_type.button": "Карточка-кнопка",
		"export_dialog.instructions": "Скопируйте этот YAML в редактор кода карточки Home Assistant.",
		"export_dialog.yaml_label": "YAML карточки",
		"export_dialog.copy": "Копировать YAML",
		"export_dialog.copied": "YAML скопирован",
		"export_dialog.copy_failed": "Автоматическое копирование не удалось. YAML выделен для ручного копирования.",
		"export_dialog.close": "Закрыть",
		"export_dialog.imported_data_unsupported": "Импортированные данные истории нельзя преобразовать в карточку Home Assistant.",
		"export_dialog.missing_snapshot": "Конфигурация графика недоступна.",
		"export_dialog.incompatible_component": "Встроенный компонент истории не поддерживает экспорт карточки. Обновите ресурс карточки."
	},
	sk: {
		"card.error.no_configuration": "Žiadna konfigurácia.",
		"card.error.no_entities": "Nakonfigurujte aspoň jednu entitu.",
		"card.label.fullscreen": "Celá obrazovka",
		"card.label.hide_controls": "Skryť ovládacie prvky",
		"card.label.show_controls": "Zobraziť ovládacie prvky",
		"card.label.tools": "Nástroje",
		"common.loading": "Načítavanie",
		"dialog.title.history": "História",
		"dialog.loading_history": "Načítavanie histórie...",
		"dialog.label.exit_fullscreen": "Ukončiť celú obrazovku",
		"editor.date_range": "Rozsah dátumov",
		"editor.field.attribute": "Atribút (bodková cesta, pre stav nechajte prázdne)",
		"editor.field.attribute_units": "Jednotky atribútu (objekt JSON)",
		"editor.field.button_color": "Farba tlačidla",
		"editor.field.button_hover_color": "Farba pri prechode myšou",
		"editor.field.button_hover_effect": "Efekt pri prechode myšou",
		"editor.field.button_icon": "Ikona tlačidla",
		"editor.field.button_label": "Popisok tlačidla",
		"editor.field.button_show_icon": "Zobraziť ikonu tlačidla",
		"editor.field.button_show_name": "Zobraziť názov tlačidla",
		"editor.field.color": "Farba (hodnota CSS)",
		"editor.field.debug_performance": "Ladenie výkonu",
		"editor.field.disable_climate_overlay": "Zakázať prekrytie klímy",
		"editor.field.end_date": "Dátum ukončenia",
		"editor.field.entity": "Entita",
		"editor.field.forced": "Vynútené (vždy zobrazené)",
		"editor.field.hours": "Hodiny",
		"editor.field.label": "Popisok",
		"editor.field.line_mode": "Režim čiary",
		"editor.field.line_width": "Šírka čiary",
		"editor.field.show_points": "Zobraziť dátové body",
		"editor.field.point_radius": "Polomer bodov",
		"editor.field.range_mode": "Režim rozsahu",
		"editor.field.scale_group": "Skupina mierky",
		"editor.field.scale_max": "Maximum mierky",
		"editor.field.scale_min": "Minimum mierky",
		"editor.field.scale_mode": "Režim mierky",
		"editor.field.series": "Séria (JSON)",
		"editor.field.show_controls": "Počiatočný stav výberov",
		"editor.field.show_controls_toggle": "Prepinacie tlačidlo ovládacích prvkov",
		"editor.field.show_date_picker": "Výber dátumu",
		"editor.field.show_entity_picker": "Výber entity",
		"editor.field.show_export_button": "Tlačidlo exportu",
		"editor.field.show_fullscreen_button": "Tlačidlo celej obrazovky",
		"editor.field.show_grid": "Mriežka",
		"editor.field.show_import_button": "Tlačidlo importu",
		"editor.field.show_legend": "Legenda",
		"editor.field.show_line_mode_buttons": "Tlačidlá režimu čiary",
		"editor.field.show_scale": "Mierka",
		"editor.field.show_time_range_selector": "Výber časového rozsahu",
		"editor.field.show_tools_button": "Tlačidlo nástrojov",
		"editor.field.show_tooltip": "Nápoveda",
		"editor.field.start_date": "Dátum začiatku",
		"editor.field.title": "Názov",
		"editor.field.title_color": "Farba názvu",
		"editor.field.title_font_family": "Rodina písma názvu",
		"editor.field.title_font_size": "Veľkosť písma názvu",
		"editor.field.unit": "Jednotka",
		"editor.option.absolute_date_range": "Absolútny (rozsah dátumov)",
		"editor.option.auto": "Automaticky",
		"editor.option.column": "Stĺpec",
		"editor.option.line": "Čiara",
		"editor.option.manual": "Manuálne",
		"editor.option.relative_hours": "Relatívny (hodiny)",
		"editor.option.stair": "Schodová",
		"editor.series.new_series": "Nová séria",
		"editor.series.no_entity_selected": "Nie je vybraná žiadna entita",
		"editor.series.remove": "Odstrániť",
		"editor.tab.advanced": "Pokročilé",
		"editor.tab.button": "Tlačidlo",
		"editor.tab.display": "Zobrazenie",
		"editor.tab.entities": "Entity",
		"editor.tab.header": "Hlavička",
		"editor.tab.range": "Rozsah",
		"editor.tab.style": "Štýl",
		"editor.tab.tools": "Nástroje",
		"card.label.create_dashboard_card": "Vytvoriť kartu dashboardu",
		"editor.field.show_card_export_button": "Zobraziť tlačidlo exportu karty",
		"export_dialog.title": "Vytvoriť kartu dashboardu",
		"export_dialog.card_type_label": "Typ karty",
		"export_dialog.card_type.inline": "Štandardná karta",
		"export_dialog.card_type.button": "Tlačidlová karta",
		"export_dialog.instructions": "Skopírujte tento YAML do editora kódu karty Home Assistant.",
		"export_dialog.yaml_label": "YAML karty",
		"export_dialog.copy": "Kopírovať YAML",
		"export_dialog.copied": "YAML skopírovaný",
		"export_dialog.copy_failed": "Automatické kopírovanie zlyhalo. YAML je vybratý na ručné kopírovanie.",
		"export_dialog.close": "Zavrieť",
		"export_dialog.imported_data_unsupported": "Importované údaje histórie nemožno previesť na kartu Home Assistant.",
		"export_dialog.missing_snapshot": "Konfigurácia grafu nie je dostupná.",
		"export_dialog.incompatible_component": "Vložený komponent histórie nepodporuje export karty. Aktualizujte zdroj karty."
	},
	zh: {
		"card.error.no_configuration": "无配置。",
		"card.error.no_entities": "请至少配置一个实体。",
		"card.label.fullscreen": "全屏",
		"card.label.hide_controls": "隐藏控件",
		"card.label.show_controls": "显示控件",
		"card.label.tools": "工具",
		"common.loading": "加载中",
		"dialog.title.history": "历史记录",
		"dialog.loading_history": "正在加载历史记录...",
		"dialog.label.exit_fullscreen": "退出全屏",
		"editor.date_range": "日期范围",
		"editor.field.attribute": "属性（点路径，留空表示状态）",
		"editor.field.attribute_units": "属性单位（JSON 对象）",
		"editor.field.button_color": "按钮颜色",
		"editor.field.button_hover_color": "悬停颜色",
		"editor.field.button_hover_effect": "悬停效果",
		"editor.field.button_icon": "按钮图标",
		"editor.field.button_label": "按钮标签",
		"editor.field.button_show_icon": "显示按钮图标",
		"editor.field.button_show_name": "显示按钮名称",
		"editor.field.color": "颜色（CSS 值）",
		"editor.field.debug_performance": "调试性能",
		"editor.field.disable_climate_overlay": "禁用气候覆盖层",
		"editor.field.end_date": "结束日期",
		"editor.field.entity": "实体",
		"editor.field.forced": "强制（始终显示）",
		"editor.field.hours": "小时",
		"editor.field.label": "标签",
		"editor.field.line_mode": "线条模式",
		"editor.field.line_width": "线宽",
		"editor.field.show_points": "显示数据点",
		"editor.field.point_radius": "点半径",
		"editor.field.range_mode": "范围模式",
		"editor.field.scale_group": "刻度组",
		"editor.field.scale_max": "刻度最大值",
		"editor.field.scale_min": "刻度最小值",
		"editor.field.scale_mode": "刻度模式",
		"editor.field.series": "系列（JSON）",
		"editor.field.show_controls": "选择器初始状态",
		"editor.field.show_controls_toggle": "控件切换按钮",
		"editor.field.show_date_picker": "日期选择器",
		"editor.field.show_entity_picker": "实体选择器",
		"editor.field.show_export_button": "导出按钮",
		"editor.field.show_fullscreen_button": "全屏按钮",
		"editor.field.show_grid": "网格",
		"editor.field.show_import_button": "导入按钮",
		"editor.field.show_legend": "图例",
		"editor.field.show_line_mode_buttons": "线条模式按钮",
		"editor.field.show_scale": "刻度",
		"editor.field.show_time_range_selector": "时间范围选择器",
		"editor.field.show_tools_button": "工具按钮",
		"editor.field.show_tooltip": "工具提示",
		"editor.field.start_date": "开始日期",
		"editor.field.title": "标题",
		"editor.field.title_color": "标题颜色",
		"editor.field.title_font_family": "标题字体",
		"editor.field.title_font_size": "标题字号",
		"editor.field.unit": "单位",
		"editor.option.absolute_date_range": "绝对（日期范围）",
		"editor.option.auto": "自动",
		"editor.option.column": "柱状",
		"editor.option.line": "折线",
		"editor.option.manual": "手动",
		"editor.option.relative_hours": "相对（小时）",
		"editor.option.stair": "阶梯",
		"editor.series.new_series": "新建系列",
		"editor.series.no_entity_selected": "未选择实体",
		"editor.series.remove": "移除",
		"editor.tab.advanced": "高级",
		"editor.tab.button": "按钮",
		"editor.tab.display": "显示",
		"editor.tab.entities": "实体",
		"editor.tab.header": "页眉",
		"editor.tab.range": "范围",
		"editor.tab.style": "样式",
		"editor.tab.tools": "工具",
		"card.label.create_dashboard_card": "创建仪表板卡片",
		"editor.field.show_card_export_button": "显示卡片导出按钮",
		"export_dialog.title": "创建仪表板卡片",
		"export_dialog.card_type_label": "卡片类型",
		"export_dialog.card_type.inline": "标准卡片",
		"export_dialog.card_type.button": "按钮卡片",
		"export_dialog.instructions": "将此 YAML 复制到 Home Assistant 卡片的代码编辑器中。",
		"export_dialog.yaml_label": "卡片 YAML",
		"export_dialog.copy": "复制 YAML",
		"export_dialog.copied": "YAML 已复制",
		"export_dialog.copy_failed": "自动复制失败。YAML 已选中，可手动复制。",
		"export_dialog.close": "关闭",
		"export_dialog.imported_data_unsupported": "导入的历史数据无法转换为 Home Assistant 卡片。",
		"export_dialog.missing_snapshot": "图表配置不可用。",
		"export_dialog.incompatible_component": "嵌入的历史组件不支持卡片导出。请更新卡片资源。"
	}
}, Ql = "en", $l = /* @__PURE__ */ new Set([
	"en",
	"fr",
	"cs",
	"de",
	"es",
	"el",
	"it",
	"pl",
	"ru",
	"sk",
	"bg",
	"ca",
	"da",
	"fi",
	"hu",
	"nl",
	"no",
	"pt",
	"zh"
]), eu = { "common.loading": "ui.common.loading" };
function tu(e, t) {
	let n = (t ?? e?.locale?.language ?? e?.language ?? Ql).split("-")[0]?.toLowerCase() ?? Ql;
	return $l.has(n) ? n : Ql;
}
function nu(e) {
	return (e.split(".").at(-1) ?? e).replace(/_/g, " ").replace(/^\w/, (e) => e.toUpperCase());
}
function ru(e, t) {
	return tu(e, t);
}
function $(e, t, n) {
	let r = eu[t], i = e?.localize;
	if (r && i) {
		let e = i(r);
		if (e) return e;
	}
	return Zl[tu(e, n)]?.[t] ?? Zl[Ql]?.[t] ?? nu(t);
}
//#endregion
//#region src/components/card-export-dialog.ts
var iu = class extends k {
	constructor(...e) {
		super(...e), this.open = !1, this._selectedCardType = "inline", this._copyStatus = "idle";
	}
	static {
		this.properties = {
			open: { type: Boolean },
			hass: { attribute: !1 },
			baseConfig: { attribute: !1 },
			snapshot: { attribute: !1 },
			language: {},
			error: {},
			_selectedCardType: { state: !0 },
			_copyStatus: { state: !0 }
		};
	}
	static {
		this.styles = o`
    ha-dialog {
      --mdc-dialog-min-width: min(680px, calc(100vw - 32px));
      --mdc-dialog-max-width: min(820px, calc(100vw - 32px));
    }

    .content {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 14px;
      max-width: 100%;
      padding: 4px 0;
    }

    .type-label,
    .yaml-label {
      color: var(--primary-text-color);
      font-weight: 500;
    }

    .type-selector {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      overflow: hidden;
    }

    .type-selector button {
      background: transparent;
      border: 0;
      color: var(--primary-text-color);
      cursor: pointer;
      font: inherit;
      min-height: 42px;
      padding: 8px 12px;
    }

    .type-selector button + button {
      border-inline-start: 1px solid var(--divider-color);
    }

    .type-selector button[aria-checked="true"] {
      background: color-mix(in srgb, var(--primary-color) 18%, transparent);
      color: var(--primary-color);
      font-weight: 600;
    }

    .type-selector button:focus-visible,
    textarea:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }

    .instructions,
    .status {
      color: var(--secondary-text-color);
      margin: 0;
    }

    textarea {
      background: var(--card-background-color, var(--ha-card-background));
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      box-sizing: border-box;
      color: var(--primary-text-color);
      font-family: var(--code-font-family, monospace);
      font-size: 13px;
      line-height: 1.45;
      min-height: 24em;
      padding: 12px;
      resize: vertical;
      user-select: text;
      -webkit-user-select: text;
      width: 100%;
    }

    .error {
      color: var(--error-color, #db4437);
    }

    .status {
      min-height: 1.4em;
    }

    .dialog-actions {
      align-items: center;
      border-top: 1px solid var(--divider-color);
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      margin-top: 2px;
      padding-top: 12px;
    }

    @media (max-width: 600px) {
      ha-dialog {
        --mdc-dialog-min-width: calc(100vw - 16px);
        --mdc-dialog-max-width: calc(100vw - 16px);
      }

      textarea {
        max-height: 42vh;
        min-height: 16em;
      }
    }
  `;
	}
	willUpdate(e) {
		e.has("open") && this.open && e.get("open") === !1 && (this._selectedCardType = "inline", this._copyStatus = "idle");
	}
	get _yaml() {
		if (this.error || !this.baseConfig || !this.snapshot || this.snapshot.importedData) return "";
		try {
			return Xl(ys(this.baseConfig, this.snapshot, this._selectedCardType));
		} catch {
			return "";
		}
	}
	_messageKey() {
		if (this.error === "incompatible_component") return "export_dialog.incompatible_component";
		if (this.snapshot?.importedData) return "export_dialog.imported_data_unsupported";
		if (this.error || !this.baseConfig || !this.snapshot) return "export_dialog.missing_snapshot";
	}
	_selectCardType(e) {
		this.snapshot?.importedData || e === this._selectedCardType || (this._selectedCardType = e, this._copyStatus = "idle");
	}
	_onClosed(e) {
		e.stopPropagation(), this.dispatchEvent(new CustomEvent("abh-card-export-dialog-closed", { bubbles: !0 }));
	}
	_requestClose() {
		this.open = !1;
	}
	async _copyYaml() {
		let e = this._yaml, t = this.renderRoot.querySelector("textarea");
		if (!(!e || !t)) {
			if (navigator.clipboard?.writeText) try {
				await navigator.clipboard.writeText(e), this._copyStatus = "copied";
				return;
			} catch {}
			t.focus(), t.select(), t.setSelectionRange(0, t.value.length);
			try {
				if (document.execCommand("copy")) {
					this._copyStatus = "copied";
					return;
				}
			} catch {}
			this._copyStatus = "failed";
		}
	}
	render() {
		let e = this._yaml, t = this._messageKey(), n = !!t, r = this._copyStatus === "copied" ? $(this.hass, "export_dialog.copied", this.language) : this._copyStatus === "failed" ? $(this.hass, "export_dialog.copy_failed", this.language) : "";
		return E`
      <ha-dialog
        .open=${this.open}
        .headerTitle=${$(this.hass, "export_dialog.title", this.language)}
        @closed=${this._onClosed}
      >
        <div class="content">
          <div class="type-label" id="card-type-label">
            ${$(this.hass, "export_dialog.card_type_label", this.language)}
          </div>
          <div class="type-selector" role="radiogroup" aria-labelledby="card-type-label">
            <button
              type="button"
              role="radio"
              aria-checked=${this._selectedCardType === "inline" ? "true" : "false"}
              ?disabled=${n}
              @click=${() => this._selectCardType("inline")}
            >${$(this.hass, "export_dialog.card_type.inline", this.language)}</button>
            <button
              type="button"
              role="radio"
              aria-checked=${this._selectedCardType === "button" ? "true" : "false"}
              ?disabled=${n}
              @click=${() => this._selectCardType("button")}
            >${$(this.hass, "export_dialog.card_type.button", this.language)}</button>
          </div>
          <p class="instructions">
            ${$(this.hass, "export_dialog.instructions", this.language)}
          </p>
          ${t ? E`<p class="error">${$(this.hass, t, this.language)}</p>` : E`
              <label class="yaml-label" for="card-yaml">
                ${$(this.hass, "export_dialog.yaml_label", this.language)}
              </label>
              <textarea
                id="card-yaml"
                readonly
                spellcheck="false"
                .value=${e}
              ></textarea>
            `}
          <div class=${`status ${this._copyStatus === "failed" ? "error" : ""}`} aria-live="polite">
            ${r || O}
          </div>
          <div class="dialog-actions">
            <ha-button @click=${this._requestClose}>
              ${$(this.hass, "export_dialog.close", this.language)}
            </ha-button>
            <ha-button ?disabled=${!e} @click=${this._copyYaml}>
              ${$(this.hass, "export_dialog.copy", this.language)}
            </ha-button>
          </div>
        </div>
      </ha-dialog>
    `;
	}
};
customElements.get("abh-card-export-dialog") || customElements.define("abh-card-export-dialog", iu);
//#endregion
//#region src/data/build-better-history-config.ts
var au = /* @__PURE__ */ new Set([
	"primary",
	"accent",
	"red",
	"pink",
	"purple",
	"deep-purple",
	"indigo",
	"blue",
	"light-blue",
	"cyan",
	"teal",
	"green",
	"light-green",
	"lime",
	"yellow",
	"amber",
	"orange",
	"deep-orange",
	"brown",
	"grey",
	"blue-grey"
]);
function ou(e) {
	if (typeof e == "string" && e.trim() !== "") {
		let t = e.trim();
		return /^[a-z][a-z0-9-]*$/i.test(t) ? `var(--${t}-color, ${t})` : t;
	}
	if (!Array.isArray(e) || e.length < 3) return;
	let [t, n, r] = e.map((e) => Number(e));
	if ([
		t,
		n,
		r
	].every((e) => Number.isFinite(e))) return `rgb(${t}, ${n}, ${r})`;
}
function su(e) {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("color", e);
}
function cu(e) {
	let t = e?.trim();
	if (!t) return;
	let n = t.replace(/[\s_-]+/g, "").toLowerCase();
	if (au.has(t)) return `var(--${t}-color, ${n !== t && su(n) ? n : t})`;
	if (su(t)) return t;
	if (n !== t && su(n)) return n;
}
function lu(e) {
	let t = e.group ?? e.scale_group, n = cu(e.color);
	return {
		entity: e.entity,
		...e.attribute !== void 0 && { attribute: e.attribute },
		...e.forced !== void 0 && { forced: e.forced },
		...e.label !== void 0 && { label: e.label },
		...n !== void 0 && { color: n },
		...e.unit !== void 0 && { unit: e.unit },
		...t !== void 0 && { scaleGroup: t },
		...e.scale_mode !== void 0 && { scaleMode: e.scale_mode },
		...e.scale_min !== void 0 && { scaleMin: e.scale_min },
		...e.scale_max !== void 0 && { scaleMax: e.scale_max },
		...e.scale_preference !== void 0 && { scalePreference: e.scale_preference },
		...e.line_mode !== void 0 && { lineMode: e.line_mode },
		...e.line_width !== void 0 && { lineWidth: e.line_width },
		...e.show_points !== void 0 && { showPoints: e.show_points },
		...e.point_radius !== void 0 && { pointRadius: e.point_radius }
	};
}
function uu(e, t) {
	let n = {};
	if (e.series && (n.series = e.series.map(lu)), e.entities && (n.defaultEntities = e.entities), e.attribute_units && (n.attributeUnits = e.attribute_units), e.range_mode === "absolute" ? (e.start_date && (n.startDate = new Date(e.start_date)), e.end_date && (n.endDate = new Date(e.end_date))) : n.hours = e.hours ?? 24, e.show_date_picker !== void 0 && (n.showDatePicker = e.show_date_picker), e.show_entity_picker !== void 0 && (n.showEntityPicker = e.show_entity_picker), e.show_legend !== void 0 && (n.showLegend = e.show_legend), e.show_tooltip !== void 0 && (n.showTooltip = e.show_tooltip), e.show_grid !== void 0 && (n.showGrid = e.show_grid), e.show_scale !== void 0 && (n.showScale = e.show_scale), e.auto_scale_split !== void 0 && (n.autoScaleSplit = e.auto_scale_split), e.show_import_button !== void 0 && (n.showImportButton = e.show_import_button), e.show_export_button !== void 0 && (n.showExportButton = e.show_export_button), e.show_time_range_selector !== void 0 && (n.showTimeRangeSelector = e.show_time_range_selector), e.disable_climate_overlay !== void 0 && (n.disableClimateOverlay = e.disable_climate_overlay), !t) {
		e.title !== void 0 && (n.title = e.title), e.title_font_family !== void 0 && (n.titleFontFamily = e.title_font_family), e.title_font_size !== void 0 && (n.titleFontSize = e.title_font_size);
		let t = ou(e.title_color);
		t !== void 0 && (n.titleColor = t);
	}
	return e.line_mode !== void 0 && (n.lineMode = e.line_mode), e.line_width !== void 0 && (n.lineWidth = e.line_width), e.show_line_mode_buttons !== void 0 && (n.showLineModeButtons = e.show_line_mode_buttons), e.debug_performance !== void 0 && (n.debugPerformance = e.debug_performance), n;
}
function du(e, t, n) {
	let r = n === !0;
	if (e.card === t && e.skipTitle === r && e.config) return e.config;
	let i = uu(t, r);
	return e.card = t, e.skipTitle = r, e.config = i, i;
}
//#endregion
//#region src/components/history-dialog.ts
var fu = class extends k {
	constructor(...e) {
		super(...e), this.open = !1, this._fullscreen = !1, this._controlsVisible = !0, this._toolsOpen = !1, this._cardExportDialogOpen = !1, this._translationLanguage = "", this._pickerOverlayOpen = !1, this._suppressNextClose = !1, this._betterHistoryConfigCache = {}, this._onDocPointerDown = () => {
			!this.open || !this._pickerOverlayOpen || (this._suppressNextClose = !0, this._suppressCloseTimer !== void 0 && clearTimeout(this._suppressCloseTimer), this._suppressCloseTimer = setTimeout(() => {
				this._suppressNextClose = !1, this._suppressCloseTimer = void 0;
			}, 1e3));
		};
	}
	static {
		this.properties = {
			open: { type: Boolean },
			hass: { attribute: !1 },
			config: { attribute: !1 },
			language: {},
			_fullscreen: { state: !0 },
			_controlsVisible: { state: !0 },
			_toolsOpen: { state: !0 },
			_graphVisible: { state: !0 },
			_cardExportDialogOpen: { state: !0 },
			_cardExportSnapshot: { state: !0 },
			_cardExportError: { state: !0 }
		};
	}
	static {
		this.styles = o`
    :host,
    ha-dialog {
      user-select: none;
      -webkit-user-select: none;
    }

    .btn {
      --ha-icon-button-size: 40px;
      --ha-icon-button-padding-inline: 6px;
      --mdc-icon-size: 20px;
      color: var(--primary-text-color);
    }

    .btn-first {
      margin-inline-start: 12px;
    }

    @media (max-width: 600px) {
      .btn-first {
        margin-inline-start: 14px;
      }
      .btn-fs {
        display: none;
      }
    }

    .history {
      display: flex;
      flex: 1 1 auto;
      height: min(72vh, 58vw, 820px);
      min-height: min(420px, calc(100vh - 128px));
      min-width: 0;
      width: 100%;
    }

    ha-dialog[fullscreen] .history {
      height: min(76vh, 52vw, 860px);
      min-height: min(460px, calc(100vh - 128px));
    }
  `;
	}
	updated() {
		this._styleDialogHeader(), this._loadTranslations();
	}
	willUpdate(e) {
		e.has("config") && (this._graphVisible = void 0), e.has("open") && !this.open && this._releaseCardExport();
	}
	connectedCallback() {
		super.connectedCallback(), document.addEventListener("pointerdown", this._onDocPointerDown, !0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), document.removeEventListener("pointerdown", this._onDocPointerDown, !0), this._suppressCloseTimer !== void 0 && (clearTimeout(this._suppressCloseTimer), this._suppressCloseTimer = void 0);
	}
	_onDialogClosed(e) {
		if (this._suppressNextClose) {
			e.stopPropagation(), this._suppressNextClose = !1, this._suppressCloseTimer !== void 0 && (clearTimeout(this._suppressCloseTimer), this._suppressCloseTimer = void 0);
			let t = e.currentTarget;
			t.open = !0, this.requestUpdate();
			return;
		}
		e.stopPropagation(), this._releaseCardExport(), this.dispatchEvent(new CustomEvent("abh-dialog-closed", { bubbles: !0 }));
	}
	_onPickerOverlayChanged(e) {
		this._pickerOverlayOpen = e.detail.open;
	}
	_onGraphVisibilityChanged(e) {
		this._graphVisible = e.detail.visible, this._graphVisible || (this._toolsOpen = !1);
	}
	_hasConfiguredGraphTargets(e) {
		return !!(e?.entities?.length || e?.series?.length);
	}
	_graphActionsDisabled(e) {
		return this._graphVisible === !1 || this._graphVisible === void 0 && !this._hasConfiguredGraphTargets(e);
	}
	_openCardExportDialog() {
		let e = this.renderRoot.querySelector("a-better-history-card-history.history");
		if (this._cardExportSnapshot = void 0, this._cardExportError = void 0, typeof e?.getRuntimeConfigSnapshot != "function") this._cardExportError = "incompatible_component";
		else try {
			let t = e.getRuntimeConfigSnapshot();
			ps(t) ? this._cardExportSnapshot = t : this._cardExportError = "missing_snapshot";
		} catch {
			this._cardExportError = "missing_snapshot";
		}
		this._cardExportDialogOpen = !0;
	}
	_releaseCardExport() {
		this._cardExportDialogOpen = !1, this._cardExportSnapshot = void 0, this._cardExportError = void 0;
	}
	_closeCardExportDialog(e) {
		e.stopPropagation(), this._releaseCardExport();
	}
	async _loadTranslations() {
		let e = tu(this.hass, this.language);
		e !== this._translationLanguage && (this._translationLanguage = e, await ru(this.hass, e), this.requestUpdate());
	}
	_styleDialogHeader() {
		let e = this.renderRoot.querySelector("ha-dialog")?.shadowRoot;
		if (!e || e.querySelector("style[data-abh-header]")) return;
		let t = document.createElement("style");
		t.dataset.abhHeader = "true", t.textContent = "\n      .mdc-dialog__title, .header-title, .title {\n        min-width: 0;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n      .header, .dialog-header, .mdc-dialog__header { gap: 12px; }\n      [name=\"headerActionItems\"], slot[name=\"headerActionItems\"] { flex: 0 0 auto; }\n    ", e.appendChild(t);
	}
	render() {
		let e = this.config, t = e?.title ?? $(this.hass, "dialog.title.history", this.language), n = e?.show_card_export_button !== !1, r = !!e?.show_tools_button, i = !!(e?.show_controls_toggle && (e?.show_date_picker || e?.show_entity_picker));
		return E`
      <ha-dialog
        .open=${this.open}
        .headerTitle=${t}
        width="large"
        flexcontent
        ?fullscreen=${this._fullscreen}
        @closed=${(e) => this._onDialogClosed(e)}
      >
        ${n ? E`<ha-icon-button
              slot="headerActionItems"
              class="btn btn-first"
              .label=${$(this.hass, "card.label.create_dashboard_card", this.language)}
              ?disabled=${this._graphActionsDisabled(e)}
              @click=${this._openCardExportDialog}
            ><ha-icon icon="mdi:view-dashboard-variant-outline"></ha-icon></ha-icon-button>` : O}
        ${r ? E`<ha-icon-button
              slot="headerActionItems"
              class=${`btn ${n ? "" : "btn-first"}`}
              .label=${$(this.hass, "card.label.tools", this.language)}
              ?active=${this._toolsOpen}
              ?disabled=${this._graphActionsDisabled(e)}
              @click=${() => {
			this._toolsOpen = !this._toolsOpen;
		}}
            ><ha-icon icon="mdi:tools"></ha-icon></ha-icon-button>` : O}
        ${i ? E`<ha-icon-button
              slot="headerActionItems"
              class=${`btn ${!n && !r ? "btn-first" : ""}`}
              .label=${$(this.hass, this._controlsVisible ? "card.label.hide_controls" : "card.label.show_controls", this.language)}
              @click=${() => {
			this._controlsVisible = !this._controlsVisible;
		}}
            ><ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon></ha-icon-button>` : O}
        ${e?.show_fullscreen_button ? E`<ha-icon-button
              slot="headerActionItems"
              class=${`btn btn-fs ${!n && !r && !i ? "btn-first" : ""}`}
              .label=${$(this.hass, this._fullscreen ? "dialog.label.exit_fullscreen" : "card.label.fullscreen", this.language)}
              @click=${() => {
			this._fullscreen = !this._fullscreen;
		}}
            ><ha-icon icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon></ha-icon-button>` : O}
        ${this.open && e ? E`<a-better-history-card-history
              .hass=${this.hass}
              .config=${du(this._betterHistoryConfigCache, e, !0)}
              .language=${this.language}
              .showControls=${this._controlsVisible}
              .toolsOpen=${this._toolsOpen}
              @picker-overlay-changed=${(e) => this._onPickerOverlayChanged(e)}
              @graph-visibility-changed=${(e) => this._onGraphVisibilityChanged(e)}
              class="history"
            ></a-better-history-card-history>` : O}
      </ha-dialog>
      <abh-card-export-dialog
        .open=${this._cardExportDialogOpen}
        .hass=${this.hass}
        .baseConfig=${e}
        .snapshot=${this._cardExportSnapshot}
        .language=${this.language}
        .error=${this._cardExportError}
        @abh-card-export-dialog-closed=${this._closeCardExportDialog}
      ></abh-card-export-dialog>
    `;
	}
};
customElements.get("abh-history-dialog") || customElements.define("abh-history-dialog", fu);
//#endregion
//#region src/cards/a-better-history-card.ts
function pu(e) {
	if (typeof e == "string" && e.trim() !== "") {
		let t = e.trim();
		return /^[a-z][a-z0-9-]*$/i.test(t) ? `var(--${t}-color, ${t})` : t;
	}
	if (!Array.isArray(e) || e.length < 3) return;
	let [t, n, r] = e.map((e) => Number(e));
	if ([
		t,
		n,
		r
	].every((e) => Number.isFinite(e))) return `rgb(${t}, ${n}, ${r})`;
}
function mu(e) {
	if (e == null || e === "") return;
	let t = Number(e);
	if (Number.isFinite(t)) return Math.min(100, Math.max(0, t));
}
var hu = class extends k {
	constructor(...e) {
		super(...e), this._toolsOpen = !1, this._controlsVisible = !0, this._dialogOpen = !1, this._cardExportDialogOpen = !1, this._translationLanguage = "", this._betterHistoryConfigCache = {};
	}
	static getConfigElement() {
		return document.createElement(cs);
	}
	static getStubConfig(e) {
		let t = e?.states ?? {}, n = Object.keys(t).find((e) => /^sensor\.[^.]*temperature/.test(e) || e.startsWith("climate.")) ?? Object.keys(t).find((e) => e.startsWith("sensor.") && !isNaN(Number(t[e]?.state)));
		return {
			type: as,
			...n ? {
				entities: [n],
				_store_preview: !0
			} : {},
			range_mode: "relative",
			hours: 24,
			show_entity_picker: !0,
			show_import_button: !0,
			show_legend: !0,
			show_tooltip: !0
		};
	}
	static {
		this.properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_toolsOpen: { state: !0 },
			_controlsVisible: { state: !0 },
			_dialogOpen: { state: !0 },
			_graphVisible: { state: !0 },
			_cardExportDialogOpen: { state: !0 },
			_cardExportSnapshot: { state: !0 },
			_cardExportError: { state: !0 }
		};
	}
	static {
		this.styles = o`
    :host {
      display: block;
      height: 100%;
    }

    ha-card {
      background: var(--_card-bg, var(--ha-card-background, var(--card-background-color)));
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .header {
      align-items: center;
      display: flex;
      flex: 0 0 auto;
      gap: 8px;
      min-height: 40px;
      padding: 4px 8px 0;
    }

    .header-actions {
      align-items: center;
      display: flex;
      gap: 4px;
      margin-inline-start: auto;
    }

    .header-actions ha-icon-button {
      --ha-icon-button-size: 40px;
      --ha-icon-button-padding-inline: 6px;
      --mdc-icon-size: 20px;
      color: var(--primary-text-color);
    }

    .card-title {
      font-weight: 500;
      line-height: 1.25;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .history-frame {
      box-sizing: border-box;
      display: flex;
      flex: 1;
      min-height: 0;
      padding: 0 8px;
    }

    a-better-history-card-history {
      --better-history-min-height: 0px;
      --better-history-surface-overflow-y: hidden;
      flex: 1;
      min-height: 0;
    }

    .error {
      align-items: center;
      color: var(--error-color, red);
      display: flex;
      justify-content: center;
      padding: 16px;
    }

    .loading {
      align-items: center;
      color: var(--secondary-text-color);
      display: flex;
      flex: 1;
      justify-content: center;
    }
  `;
	}
	setConfig(e) {
		let t = e;
		!t.entities?.length && t.series?.length, this._config = { ...fs(t) }, this._controlsVisible = this._config.show_controls ?? !0, this._graphVisible = void 0;
	}
	updated() {
		this._loadTranslations();
	}
	getCardSize() {
		let e = this._config?.grid_options?.rows;
		return typeof e == "number" ? e : 6;
	}
	getGridOptions() {
		return {
			columns: 12,
			rows: "auto",
			min_columns: 6,
			min_rows: 2
		};
	}
	async _loadTranslations() {
		let e = tu(this.hass);
		e !== this._translationLanguage && (this._translationLanguage = e, await ru(this.hass, e), this.requestUpdate());
	}
	_openDialog() {
		this._dialogOpen = !0;
	}
	_onDialogClosed(e) {
		e.stopPropagation(), this._dialogOpen = !1;
	}
	_onGraphVisibilityChanged(e) {
		this._graphVisible = e.detail.visible, this._graphVisible || (this._toolsOpen = !1);
	}
	_hasConfiguredGraphTargets(e) {
		return !!(e?.entities?.length || e?.series?.length);
	}
	_graphActionsDisabled(e) {
		return this._graphVisible === !1 || this._graphVisible === void 0 && !this._hasConfiguredGraphTargets(e);
	}
	_openCardExportDialog() {
		let e = this.renderRoot.querySelector(".history-frame > a-better-history-card-history");
		if (this._cardExportSnapshot = void 0, this._cardExportError = void 0, typeof e?.getRuntimeConfigSnapshot != "function") this._cardExportError = "incompatible_component";
		else try {
			let t = e.getRuntimeConfigSnapshot();
			ps(t) ? this._cardExportSnapshot = t : this._cardExportError = "missing_snapshot";
		} catch {
			this._cardExportError = "missing_snapshot";
		}
		this._cardExportDialogOpen = !0;
	}
	_closeCardExportDialog(e) {
		e.stopPropagation(), this._cardExportDialogOpen = !1, this._cardExportSnapshot = void 0, this._cardExportError = void 0;
	}
	_cardStyle() {
		let e = pu(this._config?.card_background_color), t = mu(this._config?.card_background_opacity);
		return e && t !== void 0 ? `--_card-bg: color-mix(in srgb, ${e} ${t}%, transparent);` : e ? `--_card-bg: ${e};` : t === void 0 ? "" : `--_card-bg: color-mix(in srgb, var(--ha-card-background, var(--card-background-color)) ${t}%, transparent);`;
	}
	_renderHeader() {
		let e = this._config;
		if (!e) return O;
		let t = e?.title, n = !!(e?.show_controls_toggle && (e?.show_date_picker || e?.show_entity_picker)), r = e?.show_card_export_button !== !1, i = r || e?.show_tools_button || n || e?.show_fullscreen_button;
		if (!t && !i) return O;
		let a = pu(e?.title_color), o = [
			e?.title_font_family ? `font-family:${e.title_font_family};` : "",
			e?.title_font_size ? `font-size:${e.title_font_size};` : "",
			a ? `color:${a};` : ""
		].join("");
		return E`
      <div class="header">
        ${t ? E`<div class="card-title" style=${o}>${t}</div>` : O}
        ${i ? E`<div class="header-actions">
          ${r ? E`<ha-icon-button
                .label=${$(this.hass, "card.label.create_dashboard_card")}
                ?disabled=${this._graphActionsDisabled(e)}
                @click=${this._openCardExportDialog}
              ><ha-icon icon="mdi:view-dashboard-variant-outline"></ha-icon></ha-icon-button>` : O}
          ${e.show_tools_button ? E`<ha-icon-button
                .label=${$(this.hass, "card.label.tools")}
                ?active=${this._toolsOpen}
                ?disabled=${this._graphActionsDisabled(e)}
                @click=${() => {
			this._toolsOpen = !this._toolsOpen;
		}}
              ><ha-icon icon="mdi:tools"></ha-icon></ha-icon-button>` : O}
          ${n ? E`<ha-icon-button
                .label=${$(this.hass, this._controlsVisible ? "card.label.hide_controls" : "card.label.show_controls")}
                @click=${() => {
			this._controlsVisible = !this._controlsVisible;
		}}
              ><ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon></ha-icon-button>` : O}
          ${e.show_fullscreen_button ? E`<ha-icon-button
                .label=${$(this.hass, "card.label.fullscreen")}
                @click=${() => this._openDialog()}
              ><ha-icon icon="mdi:fullscreen"></ha-icon></ha-icon-button>` : O}
        </div>` : O}
      </div>
    `;
	}
	render() {
		let e = this._config;
		if (!e) return E`<ha-card><div class="error">${$(this.hass, "card.error.no_configuration")}</div></ha-card>`;
		let t = du(this._betterHistoryConfigCache, e, !!e.title), n = this.hass?.locale?.language ?? this.hass?.language;
		return E`
      <ha-card style=${this._cardStyle()}>
        ${this._renderHeader()}
        <div class="history-frame">
          <a-better-history-card-history
            .hass=${this.hass}
            .config=${t}
            .language=${n}
            .toolsOpen=${this._toolsOpen}
            .showControls=${this._controlsVisible}
            @graph-visibility-changed=${(e) => this._onGraphVisibilityChanged(e)}
            style="width:100%;height:100%;"
          ></a-better-history-card-history>
        </div>
        <abh-history-dialog
          .open=${this._dialogOpen}
          .hass=${this.hass}
          .config=${e}
          .language=${n}
          @abh-dialog-closed=${this._onDialogClosed}
        ></abh-history-dialog>
        <abh-card-export-dialog
          .open=${this._cardExportDialogOpen}
          .hass=${this.hass}
          .baseConfig=${e}
          .snapshot=${this._cardExportSnapshot}
          .language=${n}
          .error=${this._cardExportError}
          @abh-card-export-dialog-closed=${this._closeCardExportDialog}
        ></abh-card-export-dialog>
      </ha-card>
    `;
	}
};
//#endregion
//#region src/cards/a-better-history-button-card.ts
function gu(e) {
	if (typeof e == "string" && e.trim() !== "") {
		let t = e.trim();
		return /^[a-z][a-z0-9-]*$/i.test(t) ? `var(--${t}-color, ${t})` : t;
	}
	if (!Array.isArray(e) || e.length < 3) return;
	let [t, n, r] = e.map((e) => Number(e));
	if ([
		t,
		n,
		r
	].every((e) => Number.isFinite(e))) return `rgb(${t}, ${n}, ${r})`;
}
function _u(e) {
	if (e == null || e === "") return;
	let t = Number(e);
	if (Number.isFinite(t)) return Math.min(100, Math.max(0, t));
}
var vu = class extends k {
	constructor(...e) {
		super(...e), this._open = !1, this._translationLanguage = "";
	}
	static getConfigElement() {
		return document.createElement(ds);
	}
	static getStubConfig(e) {
		let t = e?.states ?? {}, n = Object.keys(t).find((e) => /^sensor\.[^.]*temperature/.test(e) || e.startsWith("climate.")) ?? Object.keys(t).find((e) => e.startsWith("sensor.") && !isNaN(Number(t[e]?.state)));
		return {
			type: ls,
			...n ? {
				entities: [n],
				_store_preview: !0
			} : {},
			range_mode: "relative",
			hours: 24,
			show_entity_picker: !0,
			show_import_button: !0,
			show_legend: !0,
			show_tooltip: !0
		};
	}
	static {
		this.properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_open: { state: !0 }
		};
	}
	static {
		this.styles = o`
    :host {
      display: block;
    }

    ha-card {
      align-items: center;
      background: var(--_card-bg, var(--ha-card-background, var(--card-background-color)));
      cursor: pointer;
      display: flex;
      justify-content: center;
      padding: 16px;
    }

    .btn-content {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    ha-icon {
      --mdc-icon-size: 36px;
      color: var(--_btn-color, var(--primary-text-color));
    }

    .label {
      color: var(--_btn-color, var(--primary-text-color));
      font-size: 0.9em;
    }

    ha-card:hover {
      --ha-card-box-shadow: var(--_btn-hover-shadow, none);
    }
  `;
	}
	setConfig(e) {
		this._config = { ...fs(e) };
	}
	updated() {
		this._loadTranslations();
	}
	getCardSize() {
		return 1;
	}
	getGridOptions() {
		return {
			columns: 3,
			rows: 1,
			min_columns: 1,
			min_rows: 1
		};
	}
	_openDialog() {
		this._open = !0;
	}
	_onDialogClosed(e) {
		e.stopPropagation(), this._open = !1;
	}
	async _loadTranslations() {
		let e = tu(this.hass);
		e !== this._translationLanguage && (this._translationLanguage = e, await ru(this.hass, e), this.requestUpdate());
	}
	render() {
		let e = this._config, t = e?.button_icon ?? "mdi:chart-line", n = e?.button_label ?? $(this.hass, "dialog.title.history"), r = e?.button_show_name !== !1, i = e?.button_show_icon !== !1, a = e?.button_hover_effect !== !1, o = gu(e?.button_color), s = gu(e?.button_hover_color), c = gu(e?.card_background_color), l = _u(e?.card_background_opacity), u = this.hass?.locale?.language ?? this.hass?.language, d = [];
		return o && d.push(`--_btn-color: ${o}`), s && d.push(`--_btn-hover-color: ${s}`), c && l !== void 0 ? d.push(`--_card-bg: color-mix(in srgb, ${c} ${l}%, transparent)`) : c ? d.push(`--_card-bg: ${c}`) : l !== void 0 && d.push(`--_card-bg: color-mix(in srgb, var(--ha-card-background, var(--card-background-color)) ${l}%, transparent)`), d.push(`--_btn-hover-shadow: ${a ? "0 0 0 2px var(--_btn-hover-color, var(--primary-color))" : "none"}`), E`
      <ha-card style=${d.join("; ")} @click=${this._openDialog}>
        <div class="btn-content">
          ${i ? E`<ha-icon icon=${t}></ha-icon>` : null}
          ${r ? E`<span class="label">${n}</span>` : null}
        </div>
      </ha-card>
      <abh-history-dialog
        .open=${this._open}
        .hass=${this.hass}
        .config=${e}
        .language=${u}
        @abh-dialog-closed=${this._onDialogClosed}
      ></abh-history-dialog>
    `;
	}
};
//#endregion
//#region src/editors/series-item-editor.ts
function yu(e) {
	if (typeof e == "string" && e.trim() !== "") return e.trim();
	if (!Array.isArray(e) || e.length < 3) return;
	let [t, n, r] = e.map((e) => Number(e));
	if ([
		t,
		n,
		r
	].every((e) => Number.isFinite(e))) return `rgb(${t}, ${n}, ${r})`;
}
var bu = class extends k {
	constructor(...e) {
		super(...e), this.series = { entity: "" }, this._translationLanguage = "";
	}
	static {
		this.properties = {
			series: { attribute: !1 },
			hass: { attribute: !1 }
		};
	}
	static {
		this.styles = o`
    :host {
      display: block;
      flex: 1;
      min-width: 0;
    }

    ha-form {
      box-sizing: border-box;
      display: block;
    }

    .line-width-form {
      max-width: 160px;
    }

    .color-picker {
      display: block;
      margin-top: 8px;
      max-width: 260px;
      width: 100%;
    }
  `;
	}
	updated() {
		this._loadTranslations();
	}
	async _loadTranslations() {
		let e = tu(this.hass);
		e !== this._translationLanguage && (this._translationLanguage = e, await ru(this.hass, e), this.requestUpdate());
	}
	_schema() {
		let e = this.series.scale_mode === "manual" ? [{
			name: "scale_min",
			selector: { number: {} }
		}, {
			name: "scale_max",
			selector: { number: {} }
		}] : [], t = this.series.show_points === !0 ? [{
			name: "point_radius",
			selector: { number: {
				min: 1,
				max: 8,
				step: .5,
				mode: "box"
			} }
		}] : [];
		return [
			{
				name: "entity",
				selector: { entity: {} }
			},
			{
				name: "attribute",
				selector: { text: {} }
			},
			{
				name: "label",
				selector: { text: {} }
			},
			{
				name: "unit",
				selector: { text: {} }
			},
			{
				name: "group",
				selector: { text: {} }
			},
			{
				name: "scale_mode",
				selector: { select: {
					mode: "dropdown",
					options: [{
						value: "auto",
						label: $(this.hass, "editor.option.auto")
					}, {
						value: "manual",
						label: $(this.hass, "editor.option.manual")
					}]
				} }
			},
			...e,
			{
				name: "line_mode",
				selector: { select: {
					mode: "dropdown",
					options: [
						{
							value: "line",
							label: $(this.hass, "editor.option.line")
						},
						{
							value: "stair",
							label: $(this.hass, "editor.option.stair")
						},
						{
							value: "column",
							label: $(this.hass, "editor.option.column")
						}
					]
				} }
			},
			{
				name: "line_width",
				selector: { number: {
					min: 1,
					max: 5,
					mode: "box"
				} }
			},
			{
				name: "show_points",
				selector: { boolean: {} }
			},
			...t,
			{
				name: "forced",
				selector: { boolean: {} }
			}
		];
	}
	_computeLabel(e) {
		return $(this.hass, `editor.field.${e.name}`);
	}
	_valueChanged(e) {
		let t = {
			forced: !0,
			...e.detail.value
		};
		t.group !== void 0 && delete t.scale_group, t.point_radius === "" && delete t.point_radius, this._emitItem(this._withDefaultUnit(t));
	}
	_lineWidthChanged(e) {
		let t = {
			forced: !0,
			...this.series
		}, n = e.detail.value.line_width;
		n === void 0 || n === "" ? delete t.line_width : t.line_width = n, this._emitItem(t);
	}
	_emitItem(e) {
		this.dispatchEvent(new CustomEvent("item-changed", {
			detail: { item: e },
			bubbles: !0,
			composed: !0
		}));
	}
	_withDefaultUnit(e) {
		if (e.unit || e.entity === this.series.entity) return e;
		let t = this._entityUnit(e.entity);
		return t ? {
			...e,
			unit: t
		} : e;
	}
	_entityUnit(e) {
		if (!e) return;
		let t = this.hass?.states[e]?.attributes.unit_of_measurement;
		return typeof t == "string" && t.trim() !== "" ? t : void 0;
	}
	_colorValue() {
		return this.series.color?.trim() || void 0;
	}
	_colorChanged(e) {
		let t = {
			forced: !0,
			...this.series
		}, n = yu(e.detail.value);
		n === void 0 || n === "" ? delete t.color : t.color = n, this._emitItem(t);
	}
	render() {
		let e = {
			forced: !0,
			...this.series,
			group: this.series.group ?? this.series.scale_group
		}, t = this._schema(), n = t.filter((e) => e.name === "line_width"), r = t.filter((e) => e.name !== "line_width");
		return E`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${r}
        .computeLabel=${(e) => this._computeLabel(e)}
        @value-changed=${(e) => this._valueChanged(e)}
      ></ha-form>
      <ha-form
        class="line-width-form"
        .hass=${this.hass}
        .data=${e}
        .schema=${n}
        .computeLabel=${(e) => this._computeLabel(e)}
        @value-changed=${(e) => this._lineWidthChanged(e)}
      ></ha-form>
      <ha-color-picker
        class="color-picker"
        .label=${this._computeLabel({
			name: "color",
			selector: { color_rgb: {} }
		})}
        .value=${this._colorValue()}
        @value-changed=${(e) => this._colorChanged(e)}
      ></ha-color-picker>
    `;
	}
};
customElements.get("abh-series-item-editor") || customElements.define("abh-series-item-editor", bu);
//#endregion
//#region src/data/source-to-series.ts
function xu(e) {
	let t = e;
	return {
		entity: e.entityId,
		attribute: e.kind === "entity_attribute" && e.path ? e.path.join(".") : void 0,
		unit: e.unit,
		group: t.group ?? t.scaleGroup,
		forced: !0
	};
}
//#endregion
//#region src/ha/load-components.ts
var Su = [
	"ha-form",
	"ha-icon",
	"ha-icon-button",
	"ha-button",
	"ha-color-picker",
	"ha-expansion-panel"
], Cu, wu = !1;
function Tu() {
	return Su.every((e) => customElements.get(e)) ? Promise.resolve() : (Cu ??= Ou(Su, () => {
		Cu = void 0;
	}), Cu);
}
var Eu;
function Du() {
	return customElements.get("ha-date-range-picker") ? Promise.resolve() : (Eu ??= Ou(["ha-date-range-picker"], () => {
		Eu = void 0;
	}), Eu);
}
async function Ou(e, t) {
	try {
		await lt(e);
	} catch (e) {
		throw t(), wu || (wu = !0, e instanceof Ve ? console.warn(`[a-better-history-card] Failed to load Home Assistant UI components. Missing: ${e.result.missing.join(", ") || "unknown"}.`, e.cause ?? e) : console.warn("[a-better-history-card] Failed to load Home Assistant UI components.", e)), e;
	}
}
//#endregion
//#region src/editors/series-list-editor.ts
var ku = class extends k {
	constructor(...e) {
		super(...e), this.series = [], this._dragIndex = -1, this._dragOverIndex = -1, this._componentsReady = !1, this._translationLanguage = "";
	}
	static {
		this.properties = {
			series: { attribute: !1 },
			hass: { attribute: !1 },
			_dragIndex: { state: !0 },
			_dragOverIndex: { state: !0 },
			_componentsReady: { state: !0 }
		};
	}
	static {
		this.styles = o`
    :host {
      display: block;
    }

    .picker-section {
      margin-bottom: 0;
      max-height: 44px;
      min-height: 36px;
      overflow: visible;
      position: relative;
    }

    .picker-section abh-series-picker {
      display: block;
      max-height: 44px;
      overflow: visible;
    }

    .series-list {
      margin-top: 8px;
    }

    .series-panel {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      display: block;
      margin-bottom: 8px;
      overflow: hidden;
    }

    .series-panel[drag-over] {
      border-color: var(--primary-color);
    }

    .series-summary {
      align-items: center;
      display: grid;
      gap: 8px;
      grid-template-columns: auto minmax(0, 1fr) auto;
      min-height: 40px;
      padding: 4px 8px;
    }

    .drag-handle {
      color: var(--secondary-text-color);
      cursor: grab;
      flex: 0 0 auto;
    }

    .series-title {
      color: var(--primary-text-color);
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .series-subtitle {
      color: var(--secondary-text-color);
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .series-details {
      border-top: 1px solid var(--divider-color);
      padding: 8px;
    }

    .delete-btn {
      flex: 0 0 auto;
    }

  `;
	}
	connectedCallback() {
		super.connectedCallback(), Tu().then(() => {
			this._componentsReady = !0;
		}).catch(() => void 0);
	}
	updated() {
		this._loadTranslations();
	}
	async _loadTranslations() {
		let e = tu(this.hass);
		e !== this._translationLanguage && (this._translationLanguage = e, await ru(this.hass, e), this.requestUpdate());
	}
	_emit(e) {
		this.dispatchEvent(new CustomEvent("series-changed", {
			detail: { series: e },
			bubbles: !0,
			composed: !0
		}));
	}
	_remove(e) {
		this._emit(this.series.filter((t, n) => n !== e));
	}
	_onItemChanged(e, t) {
		this._emit(this.series.map((n, r) => r === e ? t : n));
	}
	_onDragStart(e) {
		this._dragIndex = e;
	}
	_onDragOver(e, t) {
		e.preventDefault(), this._dragOverIndex = t;
	}
	_onDrop(e) {
		if (this._dragIndex < 0 || this._dragIndex === e) {
			this._dragIndex = -1, this._dragOverIndex = -1;
			return;
		}
		let t = [...this.series], [n] = t.splice(this._dragIndex, 1);
		t.splice(e, 0, n), this._dragIndex = -1, this._dragOverIndex = -1, this._emit(t);
	}
	_onDragEnd() {
		this._dragIndex = -1, this._dragOverIndex = -1;
	}
	_onSourcesConfirmed(e) {
		let t = e.detail.sources.map(xu);
		t.length > 0 && this._emit([...this.series, ...t]);
	}
	_seriesTitle(e) {
		if (e.label) return e.label;
		if (!e.entity) return $(this.hass, "editor.series.new_series");
		let t = this.hass?.states[e.entity]?.attributes.friendly_name;
		return typeof t == "string" && t ? t : e.entity;
	}
	_seriesSubtitle(e) {
		let t = [e.entity, e.attribute].filter((e) => !!e);
		return t.length > 0 ? t.join(" · ") : $(this.hass, "editor.series.no_entity_selected");
	}
	render() {
		return E`
      <div class="picker-section">
        <abh-series-picker
          .hass=${this.hass}
          .browserHistory=${!1}
          @sources-confirmed=${(e) => this._onSourcesConfirmed(e)}
        ></abh-series-picker>
      </div>
      <div class="series-list">
        ${this.series.map((e, t) => this._renderSeriesPanel(e, t))}
      </div>
    `;
	}
	_renderSeriesPanel(e, t) {
		let n = E`
      <div class="series-summary">
        <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
        <div>
          <div class="series-title">${this._seriesTitle(e)}</div>
          <div class="series-subtitle">${this._seriesSubtitle(e)}</div>
        </div>
        <ha-icon-button
          class="delete-btn"
          .label=${$(this.hass, "editor.series.remove")}
          @click=${(e) => {
			e.stopPropagation(), this._remove(t);
		}}
        ><ha-icon icon="mdi:close"></ha-icon></ha-icon-button>
      </div>
    `, r = E`
      <div class="series-details">
        <abh-series-item-editor
          .series=${e}
          .hass=${this.hass}
          @item-changed=${(e) => this._onItemChanged(t, e.detail.item)}
        ></abh-series-item-editor>
      </div>
    `;
		return this._componentsReady ? E`
      <ha-expansion-panel
        class="series-panel"
        outlined
        ?drag-over=${this._dragOverIndex === t}
        draggable="true"
        @dragstart=${() => this._onDragStart(t)}
        @dragover=${(e) => this._onDragOver(e, t)}
        @drop=${() => this._onDrop(t)}
        @dragend=${() => this._onDragEnd()}
      >
        <div slot="header">${n}</div>
        ${r}
      </ha-expansion-panel>
    ` : E`${n}${r}`;
	}
};
customElements.get("abh-series-list-editor") || customElements.define("abh-series-list-editor", ku);
//#endregion
//#region src/editors/base-card-editor.ts
var Au = /* @__PURE__ */ new Set([
	"title_color",
	"card_background_color",
	"button_color",
	"button_hover_color"
]);
function ju(e) {
	if (typeof e == "string" && e.trim() !== "") return e.trim();
	if (!Array.isArray(e) || e.length < 3) return;
	let [t, n, r] = e.map((e) => Number(e));
	if ([
		t,
		n,
		r
	].every((e) => Number.isFinite(e))) return `rgb(${t}, ${n}, ${r})`;
}
var Mu = class extends k {
	constructor(...e) {
		super(...e), this._config = { type: "" }, this._activeTab = "", this._hoursDraft = "", this._editingHours = !1, this._componentsReady = !1, this._dateRangePickerReady = !1, this._translationLanguage = "";
	}
	static {
		this.properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_activeTab: { state: !0 },
			_hoursDraft: { state: !0 },
			_componentsReady: { state: !0 },
			_dateRangePickerReady: { state: !0 }
		};
	}
	static {
		this.styles = o`
    .tabs {
      border-bottom: 1px solid var(--divider-color);
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
      margin-bottom: 12px;
    }

    .tab {
      background: transparent;
      border: 0;
      border-bottom: 2px solid transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      font: inherit;
      padding: 8px 10px;
    }

    .tab[active] {
      border-bottom-color: var(--primary-color);
      color: var(--primary-text-color);
    }

    .date-range-section {
      margin-top: 12px;
    }

    .date-range-label {
      color: var(--secondary-text-color);
      display: block;
      font-size: 12px;
      margin-bottom: 4px;
    }

    .color-grid {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      margin-top: 12px;
    }

    .color-picker {
      max-width: 260px;
      width: 100%;
    }

    .line-width-form {
      display: block;
      max-width: 160px;
    }

    .background-opacity-form {
      display: block;
      margin-top: 16px;
    }

    .hours-field {
      display: block;
      margin-top: 16px;
      max-width: 160px;
    }

    .hours-label {
      color: var(--secondary-text-color);
      display: block;
      font-size: 12px;
      margin-bottom: 4px;
    }

    .hours-input {
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      box-sizing: border-box;
      color: var(--primary-text-color);
      font: inherit;
      min-height: 40px;
      padding: 8px 12px;
      width: 100%;
    }

    .hours-input:focus {
      border-color: var(--primary-color);
      outline: 0;
    }

    @media (min-width: 721px) {
      .entities-tab {
        min-height: 360px;
      }
    }
  `;
	}
	connectedCallback() {
		super.connectedCallback(), Tu().then(() => {
			this._componentsReady = !0;
		}).catch(() => void 0), Du().then(() => {
			this._dateRangePickerReady = !0;
		}).catch(() => void 0);
	}
	updated() {
		this._loadTranslations();
	}
	setConfig(e) {
		this._config = { ...fs(e) }, this._editingHours || (this._hoursDraft = this._hoursDisplayValue());
		let t = this._tabs();
		t.find((e) => e.id === this._activeTab) || (this._activeTab = t[0]?.id ?? ""), this._config._store_preview && (this._config = this._withoutStorePreview(this._config), queueMicrotask(() => this._emitConfig()));
	}
	_localize(e) {
		return $(this.hass, e);
	}
	async _loadTranslations() {
		let e = tu(this.hass);
		e !== this._translationLanguage && (this._translationLanguage = e, await ru(this.hass, e), this.requestUpdate());
	}
	_rangeSchema() {
		return [{
			name: "range_mode",
			selector: { select: {
				mode: "dropdown",
				options: [{
					value: "relative",
					label: this._localize("editor.option.relative_hours")
				}, {
					value: "absolute",
					label: this._localize("editor.option.absolute_date_range")
				}]
			} }
		}];
	}
	_displaySchema() {
		return [
			{
				name: "show_date_picker",
				selector: { boolean: {} }
			},
			{
				name: "show_entity_picker",
				selector: { boolean: {} }
			},
			{
				name: "show_legend",
				selector: { boolean: {} }
			},
			{
				name: "show_tooltip",
				selector: { boolean: {} }
			},
			{
				name: "show_grid",
				selector: { boolean: {} }
			},
			{
				name: "show_scale",
				selector: { boolean: {} }
			},
			{
				name: "auto_scale_split",
				selector: { boolean: {} }
			},
			{
				name: "show_controls",
				selector: { boolean: {} }
			},
			{
				name: "disable_climate_overlay",
				selector: { boolean: {} }
			}
		];
	}
	_styleSchema() {
		return [
			{
				name: "line_mode",
				selector: { select: {
					mode: "dropdown",
					options: [
						{
							value: "line",
							label: this._localize("editor.option.line")
						},
						{
							value: "stair",
							label: this._localize("editor.option.stair")
						},
						{
							value: "column",
							label: this._localize("editor.option.column")
						}
					]
				} }
			},
			{
				name: "line_width",
				selector: { number: {
					min: 1,
					max: 5,
					mode: "box"
				} }
			},
			{
				name: "title_font_family",
				selector: { text: {} }
			},
			{
				name: "title_font_size",
				selector: { text: {} }
			},
			{
				name: "title_color",
				selector: { color_rgb: {} }
			},
			{
				name: "card_background_color",
				selector: { color_rgb: {} }
			},
			{
				name: "card_background_opacity",
				selector: { number: {
					min: 0,
					max: 100,
					mode: "slider",
					unit_of_measurement: "%"
				} }
			}
		];
	}
	_headerSchema() {
		return [
			{
				name: "title",
				selector: { text: {} }
			},
			{
				name: "show_card_export_button",
				selector: { boolean: {} }
			},
			{
				name: "show_tools_button",
				selector: { boolean: {} }
			},
			{
				name: "show_controls_toggle",
				selector: { boolean: {} }
			},
			{
				name: "show_fullscreen_button",
				selector: { boolean: {} }
			}
		];
	}
	_toolsSchema() {
		return [
			{
				name: "show_line_mode_buttons",
				selector: { boolean: {} }
			},
			{
				name: "show_import_button",
				selector: { boolean: {} }
			},
			{
				name: "show_export_button",
				selector: { boolean: {} }
			},
			{
				name: "show_time_range_selector",
				selector: { boolean: {} }
			}
		];
	}
	_buttonSchema() {
		return [
			{
				name: "button_show_name",
				selector: { boolean: {} }
			},
			{
				name: "button_show_icon",
				selector: { boolean: {} }
			},
			{
				name: "button_hover_effect",
				selector: { boolean: {} }
			},
			{
				name: "button_label",
				selector: { text: {} }
			},
			{
				name: "button_icon",
				selector: { icon: {} }
			},
			{
				name: "button_color",
				selector: { color_rgb: {} }
			},
			{
				name: "button_hover_color",
				selector: { color_rgb: {} }
			}
		];
	}
	_advancedSchema() {
		return [{
			name: "attribute_units",
			selector: { text: { multiline: !0 } }
		}, {
			name: "debug_performance",
			selector: { boolean: {} }
		}];
	}
	_computeLabel(e) {
		return this._localize(`editor.field.${e.name}`);
	}
	_getFormData() {
		let e = { ...this._config };
		return e.attribute_units && typeof e.attribute_units == "object" && (e.attribute_units = JSON.stringify(e.attribute_units, null, 2)), e;
	}
	_valueChanged(e) {
		let t = { ...e.detail.value };
		if (typeof t.attribute_units == "string") try {
			t.attribute_units = JSON.parse(t.attribute_units);
		} catch {
			delete t.attribute_units;
		}
		this._config = {
			...this._config,
			...t
		}, this._emitConfig();
	}
	_lineWidthChanged(e) {
		let t = e.detail.value, n = { ...this._config }, r = t.line_width;
		r === void 0 || r === "" ? delete n.line_width : n.line_width = r, this._config = n, this._emitConfig();
	}
	_onSeriesChanged(e) {
		this._config = {
			...this._config,
			series: e.detail.series
		}, this._emitConfig();
	}
	_emitConfig() {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._config },
			bubbles: !0,
			composed: !0
		}));
	}
	_withoutStorePreview(e) {
		let t = { ...e };
		return delete t._store_preview, delete t.entities, t;
	}
	render() {
		let e = this._tabs(), t = e.find((e) => e.id === this._activeTab)?.id ?? e[0]?.id ?? "";
		return E`
      <div class="tabs">
        ${e.map((e) => E`
            <button
              class="tab"
              ?active=${e.id === t}
              @click=${() => {
			this._activeTab = e.id;
		}}
            >${e.label}</button>
          `)}
      </div>
      ${t === "entities" ? this._renderEntitiesTab() : t === "range" ? this._renderRangeTab() : t === "style" ? this._renderStyleTab() : t === "button" ? this._renderButtonTab() : E`
        <ha-form
          .hass=${this.hass}
          .data=${this._getFormData()}
          .schema=${this._schema(t)}
          .computeLabel=${(e) => this._computeLabel(e)}
          @value-changed=${(e) => this._valueChanged(e)}
        ></ha-form>
      `}
    `;
	}
	_renderSchemaForm(e, t = this._getFormData()) {
		return E`
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${e}
        .computeLabel=${(e) => this._computeLabel(e)}
        @value-changed=${(e) => this._valueChanged(e)}
      ></ha-form>
    `;
	}
	_withoutColorFields(e) {
		return e.filter((e) => !Au.has(e.name));
	}
	_colorFields(e) {
		return e.filter((e) => Au.has(e.name));
	}
	_renderStyleTab() {
		let e = this._styleSchema(), t = e.filter((e) => e.name === "line_width"), n = e.filter((e) => e.name === "card_background_opacity"), r = this._withoutColorFields(e).filter((e) => e.name !== "line_width" && e.name !== "card_background_opacity");
		return E`
      ${this._renderSchemaForm(r)}
      <ha-form
        class="line-width-form"
        .hass=${this.hass}
        .data=${this._getFormData()}
        .schema=${t}
        .computeLabel=${(e) => this._computeLabel(e)}
        @value-changed=${(e) => this._lineWidthChanged(e)}
      ></ha-form>
      ${this._renderColorGrid(this._colorFields(e))}
      <div class="background-opacity-form">
        ${this._renderSchemaForm(n)}
      </div>
    `;
	}
	_renderButtonTab() {
		let e = this._buttonSchema();
		return E`
      ${this._renderSchemaForm(this._withoutColorFields(e))}
      ${this._renderColorGrid(this._colorFields(e))}
    `;
	}
	_renderColorGrid(e) {
		return E`
      <div class="color-grid">
        ${e.map((e) => this._renderColorField(e))}
      </div>
    `;
	}
	_renderColorField(e) {
		return E`
      <ha-color-picker
        class="color-picker"
        .label=${this._computeLabel(e)}
        .value=${this._colorValue(e.name)}
        @value-changed=${(t) => this._colorChanged(e.name, t)}
      ></ha-color-picker>
    `;
	}
	_colorValue(e) {
		let t = this._config[e];
		if (typeof t == "string" && t.trim() !== "") return t;
		if (!Array.isArray(t) || t.length < 3) return;
		let [n, r, i] = t.map((e) => Number(e));
		if ([
			n,
			r,
			i
		].every((e) => Number.isFinite(e))) return `rgb(${n}, ${r}, ${i})`;
	}
	_colorChanged(e, t) {
		let n = { ...this._config }, r = ju(t.detail.value);
		r === void 0 || r === "" ? delete n[e] : n[e] = r, this._config = n, this._emitConfig();
	}
	_renderEntitiesTab() {
		return E`
      <div class="entities-tab">
        <abh-series-list-editor
          .series=${this._config.series ?? []}
          .hass=${this.hass}
          @series-changed=${(e) => this._onSeriesChanged(e)}
        ></abh-series-list-editor>
      </div>
    `;
	}
	_renderRangeTab() {
		return E`
      <ha-form
        .hass=${this.hass}
        .data=${this._getFormData()}
        .schema=${this._rangeSchema()}
        .computeLabel=${(e) => this._computeLabel(e)}
        @value-changed=${(e) => this._valueChanged(e)}
      ></ha-form>
      <label class="hours-field">
        <span class="hours-label">${this._localize("editor.field.hours")}</span>
        <input
          class="hours-input"
          type="number"
          min="1"
          .value=${this._hoursDraft}
          @focus=${() => {
			this._editingHours = !0;
		}}
          @input=${(e) => this._hoursChanged(e)}
          @blur=${() => this._hoursBlurred()}
        />
      </label>
      ${this._config.range_mode === "absolute" && this._componentsReady && this._dateRangePickerReady ? E`
            <div class="date-range-section">
              <span class="date-range-label">${this._localize("editor.date_range")}</span>
              <ha-date-range-picker
                .hass=${this.hass}
                .startDate=${this._dateRangeStartDate()}
                .endDate=${this._dateRangeEndDate()}
                time-picker
                extended-presets
                @value-changed=${(e) => this._dateRangeChanged(e)}
              ></ha-date-range-picker>
            </div>
          ` : E``}
    `;
	}
	_hoursDisplayValue() {
		return this._validHours(this._config.hours)?.toString() ?? "";
	}
	_validHours(e) {
		let t = typeof e == "string" && e.trim() !== "" ? Number(e) : e;
		if (!(typeof t != "number" || !Number.isFinite(t) || t < 1)) return t;
	}
	_hoursChanged(e) {
		let t = e.currentTarget.value;
		if (this._hoursDraft = t, t === "") return;
		let n = this._validHours(t);
		n !== void 0 && (this._config = {
			...this._config,
			hours: n
		}, this._emitConfig());
	}
	_hoursBlurred() {
		this._editingHours = !1;
		let e = this._validHours(this._hoursDraft) ?? this._validHours(this._config.hours) ?? 24;
		this._hoursDraft = e.toString(), this._config = {
			...this._config,
			hours: e
		}, this._emitConfig();
	}
	_dateRangeStartDate() {
		return this._coerceDate(this._config.start_date) ?? /* @__PURE__ */ new Date(Date.now() - 864e5);
	}
	_dateRangeEndDate() {
		return this._coerceDate(this._config.end_date) ?? /* @__PURE__ */ new Date();
	}
	_coerceDate(e) {
		if (e instanceof Date && Number.isFinite(e.getTime())) return e;
		if (typeof e != "string" || e === "") return;
		let t = new Date(e);
		return Number.isFinite(t.getTime()) ? t : void 0;
	}
	_dateRangeChanged(e) {
		let t = e.detail, n = this._coerceDate(t.value?.startDate ?? t.startDate), r = this._coerceDate(t.value?.endDate ?? t.endDate);
		!n || !r || (this._config = {
			...this._config,
			start_date: n.toISOString(),
			end_date: r.toISOString()
		}, this._emitConfig());
	}
}, Nu = class extends Mu {
	_tabs() {
		return [
			{
				id: "entities",
				label: this._localize("editor.tab.entities")
			},
			{
				id: "range",
				label: this._localize("editor.tab.range")
			},
			{
				id: "display",
				label: this._localize("editor.tab.display")
			},
			{
				id: "style",
				label: this._localize("editor.tab.style")
			},
			{
				id: "header",
				label: this._localize("editor.tab.header")
			},
			...this._config.show_tools_button ? [{
				id: "tools",
				label: this._localize("editor.tab.tools")
			}] : [],
			{
				id: "advanced",
				label: this._localize("editor.tab.advanced")
			}
		];
	}
	_schema(e) {
		switch (e) {
			case "range": return this._rangeSchema();
			case "display": return this._displaySchema();
			case "style": return this._styleSchema();
			case "header": return this._headerSchema();
			case "tools": return this._toolsSchema();
			case "advanced": return this._advancedSchema();
			default: return [];
		}
	}
};
customElements.get("a-better-history-card-editor") || customElements.define(cs, Nu);
//#endregion
//#region src/editors/a-better-history-button-card-editor.ts
var Pu = class extends Mu {
	_styleSchema() {
		return super._styleSchema().filter((e) => e.name !== "title_color");
	}
	_tabs() {
		return [
			{
				id: "entities",
				label: this._localize("editor.tab.entities")
			},
			{
				id: "range",
				label: this._localize("editor.tab.range")
			},
			{
				id: "display",
				label: this._localize("editor.tab.display")
			},
			{
				id: "style",
				label: this._localize("editor.tab.style")
			},
			{
				id: "header",
				label: this._localize("editor.tab.header")
			},
			...this._config.show_tools_button ? [{
				id: "tools",
				label: this._localize("editor.tab.tools")
			}] : [],
			{
				id: "button",
				label: this._localize("editor.tab.button")
			},
			{
				id: "advanced",
				label: this._localize("editor.tab.advanced")
			}
		];
	}
	_schema(e) {
		switch (e) {
			case "range": return this._rangeSchema();
			case "display": return this._displaySchema();
			case "style": return this._styleSchema();
			case "header": return this._headerSchema();
			case "tools": return this._toolsSchema();
			case "button": return this._buttonSchema();
			case "advanced": return this._advancedSchema();
			default: return [];
		}
	}
};
customElements.get("a-better-history-button-card-editor") || customElements.define(ds, Pu), rs(ss), customElements.get("a-better-history-card") || customElements.define(os, hu), customElements.get("a-better-history-button-card") || customElements.define(us, vu), window.customCards = window.customCards ?? [];
var Fu = window.customCards;
Fu.filter((e) => e.type === "a-better-history-card" || e.type === "custom:a-better-history-card" || e.type === "a-better-history-button-card" || e.type === "custom:a-better-history-button-card").forEach((e) => {
	Fu.splice(Fu.indexOf(e), 1);
}), Fu.push({
	type: os,
	name: is,
	description: "Display history charts directly in your dashboard.",
	preview: !0,
	documentationURL: "https://github.com/KipK/a-better-history-card#readme"
}), Fu.push({
	type: us,
	name: `${is} Button`,
	description: "Button that opens a history chart dialog.",
	preview: !0,
	documentationURL: "https://github.com/KipK/a-better-history-card#readme"
});
//#endregion
