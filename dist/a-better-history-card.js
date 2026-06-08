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
}, x = (e, t) => !l(e, t), ee = {
	attribute: !0,
	type: String,
	converter: b,
	reflect: !1,
	useDefault: !1,
	hasChanged: x
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var S = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ee) {
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
		return this.elementProperties.get(e) ?? ee;
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[y("elementProperties")] = /* @__PURE__ */ new Map(), S[y("finalized")] = /* @__PURE__ */ new Map(), v?.({ ReactiveElement: S }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region ../ha-better-history/node_modules/lit-html/lit-html.js
var C = globalThis, te = (e) => e, w = C.trustedTypes, ne = w ? w.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, T = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, re = "?" + E, ie = `<${re}>`, D = document, ae = () => D.createComment(""), oe = (e) => e === null || typeof e != "object" && typeof e != "function", se = Array.isArray, ce = (e) => se(e) || typeof e?.[Symbol.iterator] == "function", le = "[ 	\n\f\r]", ue = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, de = /-->/g, fe = />/g, pe = RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), me = /'/g, he = /"/g, ge = /^(?:script|style|textarea|title)$/i, _e = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), O = _e(1), k = _e(2), ve = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), ye = /* @__PURE__ */ new WeakMap(), be = D.createTreeWalker(D, 129);
function xe(e, t) {
	if (!se(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ne === void 0 ? t : ne.createHTML(t);
}
var Se = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ue;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === ue ? c[1] === "!--" ? o = de : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = pe) : (ge.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = pe) : o = fe : o === pe ? c[0] === ">" ? (o = i ?? ue, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? pe : c[3] === "\"" ? he : me) : o === he || o === me ? o = pe : o === de || o === fe ? o = ue : (o = pe, i = void 0);
		let d = o === pe && e[t + 1].startsWith("/>") ? " " : "";
		a += o === ue ? n + ie : l >= 0 ? (r.push(s), n.slice(0, l) + T + n.slice(l) + E + d) : n + E + (l === -2 ? t : d);
	}
	return [xe(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Ce = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Se(t, n);
		if (this.el = e.createElement(l, r), be.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = be.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(T)) {
					let t = u[o++], n = i.getAttribute(e).split(E), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Oe : r[1] === "?" ? ke : r[1] === "@" ? Ae : De
					}), i.removeAttribute(e);
				} else e.startsWith(E) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (ge.test(i.tagName)) {
					let e = i.textContent.split(E), t = e.length - 1;
					if (t > 0) {
						i.textContent = w ? w.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], ae()), be.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], ae());
					}
				}
			} else if (i.nodeType === 8) if (i.data === re) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(E, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += E.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = D.createElement("template");
		return n.innerHTML = e, n;
	}
};
function we(e, t, n = e, r) {
	if (t === ve) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = oe(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = we(e, i._$AS(e, t.values), i, r)), t;
}
var Te = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? D).importNode(t, !0);
		be.currentNode = r;
		let i = be.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Ee(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new je(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = be.nextNode(), a++);
		}
		return be.currentNode = D, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Ee = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = we(this, e, t), oe(e) ? e === A || e == null || e === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : e !== this._$AH && e !== ve && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ce(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== A && oe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(D.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Ce.createElement(xe(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Te(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = ye.get(e.strings);
		return t === void 0 && ye.set(e.strings, t = new Ce(e)), t;
	}
	k(t) {
		se(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(ae()), this.O(ae()), this, this.options)) : r = n[i], r._$AI(a), i++;
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
}, De = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = A, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = A;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = we(this, e, t, 0), a = !oe(e) || e !== this._$AH && e !== ve, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = we(this, r[n + o], t, o), s === ve && (s = this._$AH[o]), a ||= !oe(s) || s !== this._$AH[o], s === A ? e = A : e !== A && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Oe = class extends De {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === A ? void 0 : e;
	}
}, ke = class extends De {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== A);
	}
}, Ae = class extends De {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = we(this, e, t, 0) ?? A) === ve) return;
		let n = this._$AH, r = e === A && n !== A || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== A && (n === A || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, je = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		we(this, e);
	}
}, Me = C.litHtmlPolyfillSupport;
Me?.(Ce, Ee), (C.litHtmlVersions ??= []).push("3.3.3");
var Ne = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Ee(t.insertBefore(ae(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Pe = globalThis, Fe = class extends S {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ne(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return ve;
	}
};
Fe._$litElement$ = !0, Fe.finalized = !0, Pe.litElementHydrateSupport?.({ LitElement: Fe });
var Ie = Pe.litElementPolyfillSupport;
Ie?.({ LitElement: Fe }), (Pe.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region ../ha-better-history/node_modules/@lit/reactive-element/decorators/property.js
var Le = {
	attribute: !0,
	type: String,
	converter: b,
	reflect: !1,
	hasChanged: x
}, Re = (e = Le, t, n) => {
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
function j(e) {
	return (t, n) => typeof n == "object" ? Re(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region ../ha-better-history/node_modules/@lit/reactive-element/decorators/state.js
function M(e) {
	return j({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region ../ha-better-history/node_modules/@kipk/load-ha-components/dist/load-ha-components.js
var ze = [
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
], Be = async (e) => {
	let t = e || ze;
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
}, Ve = new Set(["unknown", "unavailable"]);
function He(e) {
	return e == null || typeof e == "string" && Ve.has(e);
}
function Ue(e) {
	if (!(He(e) || typeof e != "string" || e.trim() === "")) return e;
}
function We(e) {
	if (He(e)) return;
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (typeof e != "string" || e.trim() === "") return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function N() {
	return typeof performance < "u" ? performance.now() : Date.now();
}
function P(e, t, n) {
	e && console.debug("[ha-better-history][perf]", t, n);
}
async function Ge(e, t = {}) {
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
var Ke = 6e4, qe = 3, Je = 350, Ye = 360 * 60 * 1e3, Xe = 3600 * 1e3, Ze = 720 * 60 * 1e3, Qe = 2500, $e = 8e3, et = 15e3, tt = 300, nt = 700, rt = 1100, it = 80;
function at(e) {
	if (e.length <= 2) return e;
	let t = [e[0]];
	for (let n = 1; n < e.length - 1; n++) {
		let r = e[n], i = e[n - 1], a = e[n + 1];
		(r.value !== i.value || a.value !== r.value) && t.push(r);
	}
	return t.push(e[e.length - 1]), t;
}
var ot = class extends Error {
	constructor(e) {
		super(`History chunk timed out after ${e}ms`), this.name = "HistoryChunkTimeoutError";
	}
};
function st(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ct(e, t) {
	return t.reduce((e, t) => st(e) ? e[t] : void 0, e);
}
function lt(e) {
	return e[e.length - 1] ?? "";
}
function ut(e) {
	return e instanceof Error ? e.message : String(e);
}
function dt(e) {
	if (!st(e)) return;
	let t = e.status ?? e.statusCode ?? e.status_code;
	return typeof t == "number" ? t : void 0;
}
function ft(e) {
	if (!st(e)) return "";
	let t = e.code;
	return typeof t == "string" ? t.toLowerCase() : "";
}
function pt(e) {
	if (e instanceof ot) return !0;
	let t = dt(e);
	if (t !== void 0) return t === 408 || t === 429 || t >= 500;
	let n = ut(e).toLowerCase(), r = `${ft(e)} ${n}`;
	return r.includes("timeout") || r.includes("timed out") || r.includes("network") || r.includes("failed to fetch") || r.includes("connection") || r.includes("temporarily unavailable") || r.includes("unavailable") || r.includes("aborted");
}
function mt(e, t) {
	let n = Math.floor(Math.random() * Math.max(1, t));
	return t * 2 ** Math.max(0, e - 1) + n;
}
function ht(e) {
	return new Promise((t) => setTimeout(t, e));
}
function gt(e = 80) {
	let t = globalThis.requestIdleCallback;
	return t ? new Promise((n) => t(() => n(), { timeout: e })) : new Promise((e) => {
		typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => e()) : setTimeout(e, 0);
	});
}
async function _t(e, t) {
	let n;
	try {
		return await Promise.race([e, new Promise((e, r) => {
			n = setTimeout(() => r(new ot(t)), t);
		})]);
	} finally {
		n !== void 0 && clearTimeout(n);
	}
}
function vt(e) {
	if (typeof e == "number" && Number.isFinite(e)) return "number";
	if (typeof e == "boolean") return "boolean";
	if (typeof e == "string" && e !== "") return "string";
}
function yt(e) {
	let t = vt(Number.isFinite(Number(e.state)) ? Number(e.state) : e.state), n = e.attributes.unit_of_measurement;
	if (t) return {
		id: `state:${e.entity_id}`,
		kind: "entity_state",
		entityId: e.entity_id,
		label: e.attributes.friendly_name && typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id,
		valueType: t,
		unit: t === "number" && typeof n == "string" && n !== "" ? n : void 0
	};
}
function bt(e, t, n) {
	let r = ct(e.attributes, t), i = vt(typeof r == "string" && Number.isFinite(Number(r)) ? Number(r) : r);
	if (i) return {
		id: `attr:${e.entity_id}:${t.join(".")}`,
		kind: "entity_attribute",
		entityId: e.entity_id,
		label: n ?? lt(t),
		path: t,
		valueType: i
	};
}
function xt(e, t) {
	return t === "number" ? We(e) : t === "boolean" ? typeof e == "boolean" ? e : void 0 : Ue(e);
}
function St(e, t) {
	let n = e.attributes ?? e.a ?? {};
	return xt(t.kind === "entity_state" ? e.state ?? e.s : ct(n, t.path ?? []), t.valueType);
}
function Ct(e) {
	if (typeof e.lu == "number") return e.lu * 1e3;
	let t = e.last_updated ?? e.last_changed;
	return t ? Date.parse(t) : NaN;
}
function wt(e, t, n) {
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
function Tt(e, t) {
	let n = /* @__PURE__ */ new Map();
	if (Array.isArray(e)) return e.forEach((e, r) => {
		let i = e[0]?.entity_id ?? t[r];
		i && n.set(i, e);
	}), n;
	for (let [t, r] of Object.entries(e)) Array.isArray(r) && n.set(t, r);
	return n;
}
function Et(e, t, n = Date.now()) {
	let r = e.states[t.entityId];
	if (!r) return;
	let i = {
		entity_id: r.entity_id,
		state: r.state,
		last_changed: r.last_changed,
		last_updated: r.last_updated,
		attributes: r.attributes
	}, a = St(i, t), o = Ct(i), s = Number.isFinite(o) ? o : n;
	return a === void 0 || !Number.isFinite(s) ? void 0 : {
		time: s,
		value: a
	};
}
function Dt(e, t, n, r) {
	let i = Et(e, t, n.getTime());
	return i ? [{
		time: n.getTime(),
		value: i.value
	}, {
		time: Math.min(r.getTime(), Date.now()),
		value: i.value
	}] : [];
}
var Ot = class {
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
		return i ? At(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : !1;
	}
	missingIntervals(e, t, n, r) {
		let i = this._entities.get(e);
		return Mt(i ? r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage] : [], t.getTime(), n.getTime()).map((e) => ({
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
		a.states = Nt([...a.states, ...t]), a.stateCoverage = kt([...a.stateCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}]), i === "full" && (a.fullCoverage = kt([...a.fullCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}])), this._entities.set(e, a);
	}
	buildSeries(e, t, n, r) {
		let i = e.kind === "entity_attribute" ? "full" : "state", a = this.coverageEnd(e.entityId, n, r, i);
		return Rt(e, this._entities.get(e.entityId)?.states ?? [], t, n, new Date(a));
	}
	coverageEnd(e, t, n, r) {
		let i = this._entities.get(e);
		return i ? jt(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : n.getTime();
	}
};
function kt(e) {
	let t = e.filter((e) => e.endTime > e.startTime).sort((e, t) => e.startTime - t.startTime), n = [];
	for (let e of t) {
		let t = n[n.length - 1];
		t && e.startTime <= t.endTime + 1 ? t.endTime = Math.max(t.endTime, e.endTime) : n.push({ ...e });
	}
	return n;
}
function At(e, t, n) {
	return jt(e, t, n) >= n - 1;
}
function jt(e, t, n) {
	if (n <= t) return n;
	let r = t;
	for (let t of kt(e)) if (!(t.endTime < r)) {
		if (t.startTime > r + 1) break;
		if (r = Math.max(r, t.endTime), r >= n - 1) return n;
	}
	return r;
}
function Mt(e, t, n) {
	if (n <= t) return [];
	let r = [], i = t;
	for (let t of kt(e)) if (!(t.endTime <= i) && (t.startTime > i + 1 && r.push({
		startTime: i,
		endTime: Math.min(t.startTime, n)
	}), i = Math.max(i, t.endTime), i >= n)) break;
	return i < n && r.push({
		startTime: i,
		endTime: n
	}), r;
}
function Nt(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = Ct(n);
		Number.isFinite(e) && t.set(e, n);
	}
	return [...t.entries()].sort(([e], [t]) => e - t).map(([, e]) => e);
}
function Pt(e, t) {
	let n = t.normalizeDurationMs + t.mergeDurationMs + t.buildDurationMs, r = t.stateCount >= et || t.requestDurationMs >= rt, i = r || t.stateCount >= $e || t.requestDurationMs >= nt || n >= it, a = t.stateCount <= Qe && t.requestDurationMs <= tt && n <= it / 2;
	return i && e > Xe ? {
		nextChunkMs: Math.max(Xe, Math.floor(e / (r ? 4 : 2))),
		reason: "decrease"
	} : a && e < Ze ? {
		nextChunkMs: Math.min(Ze, e * 2),
		reason: "increase"
	} : {
		nextChunkMs: e,
		reason: "keep"
	};
}
async function Ft(e, t, n, r, i, a, o) {
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
async function It(e, t) {
	let n = 1;
	for (;;) {
		if (t.isCancelled?.()) throw Error("History request cancelled");
		let r = t.onPerformance ? N() : 0;
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
			let i = await _t(e(), t.timeoutMs);
			return t.onPerformance?.({
				event: "history.chunk_success",
				details: {
					taskId: t.taskId,
					attempt: n,
					durationMs: Math.round(N() - r)
				}
			}), i;
		} catch (e) {
			let i = pt(e), a = i && n < t.maxAttempts && !t.isCancelled?.();
			if (t.onPerformance?.({
				event: a ? "history.chunk_retry" : "history.chunk_error",
				details: {
					taskId: t.taskId,
					attempt: n,
					maxAttempts: t.maxAttempts,
					retryable: i,
					error: ut(e),
					durationMs: Math.round(N() - r)
				}
			}), !a) throw e;
			await ht(mt(n, t.retryBaseDelayMs)), n += 1;
		}
	}
}
async function Lt(e, t, n, r, i, a, o = {}) {
	if (!e.callWS && !e.callApi) throw Error("Home Assistant history API is unavailable");
	let s = [...new Set(t.map((e) => e.entityId))], c = new Set(t.filter((e) => e.kind === "entity_state").map((e) => e.entityId)), l = new Set(t.filter((e) => e.kind === "entity_attribute").map((e) => e.entityId)), u = s.filter((e) => c.has(e)), d = s.filter((e) => l.has(e)), f = o.accumulator ?? new Ot(), p = [], m = Math.max(1, Math.floor(o.chunkTimeoutMs ?? Ke)), h = Math.max(1, Math.floor(o.maxChunkAttempts ?? qe)), g = Math.max(0, Math.floor(o.chunkRetryBaseDelayMs ?? Je)), _ = (e, t) => It(t, {
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
		return e + Math.max(1, Math.ceil(n / Ye));
	}, 0), ee = v.size + x, S = 0, C = /* @__PURE__ */ new Set(), te = async (s, c, l) => {
		let u = S;
		if (S += 1, o.isCancelled?.()) return {
			stateCount: 0,
			requestDurationMs: Math.round(l),
			normalizeDurationMs: 0,
			mergeDurationMs: 0,
			buildDurationMs: 0
		};
		await gt();
		let d = N(), p = Tt(c, s.entityIds), m = N() - d, h = [...p.values()].reduce((e, t) => e + t.length, 0);
		a?.({
			event: "history.batch",
			details: {
				batchIndex: u,
				batchCount: ee,
				entityCount: s.entityIds.length,
				stateCount: h,
				requestDurationMs: Math.round(l),
				normalizeDurationMs: Math.round(m)
			}
		});
		let g = N(), _ = /* @__PURE__ */ new Set();
		for (let [e, t] of p) f.integrate(e, t, s.start, s.end, s.coverageKind), _.add(e), C.add(e);
		let v = N() - g;
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
			await gt();
			let o = N(), c = /* @__PURE__ */ new Set();
			for (let i of t) ((s.coverageKind === "full" ? i.kind === "entity_attribute" : i.kind === "entity_state") && _.has(i.entityId) || !w.has(i.id)) && (i.kind === "entity_attribute" ? f.hasFullStates(i.entityId) : f.hasStates(i.entityId)) && (w.set(i.id, f.buildSeries(i, e, n, r)), c.add(i.id));
			let l = t.map((e) => w.get(e.id)).filter((e) => e !== void 0);
			y = N() - o, a?.({
				event: "history.progress_series",
				details: {
					batchIndex: u,
					seriesCount: l.length,
					pointCount: l.reduce((e, t) => e + t.points.length, 0),
					buildDurationMs: Math.round(y)
				}
			}), i(l, [...c]), await gt(120);
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
			run: () => _(i, () => Ft(e, r, t.start, t.end, t.minimalResponse, t.noAttributes, t.significantChangesOnly))
		});
	}
	a?.({
		event: "history.start",
		details: {
			sourceCount: t.length,
			entityCount: s.length,
			batchCount: ee,
			attributeChunkHours: Ye / 36e5,
			minAttributeChunkHours: Xe / 36e5,
			maxAttributeChunkHours: Ze / 36e5,
			adaptiveAttributeChunks: b.length > 0,
			cachedSourceCount: t.filter((e) => f.hasCoverage(e.entityId, n, r, e.kind === "entity_attribute" ? "full" : "state")).length,
			chunkTimeoutMs: m,
			maxChunkAttempts: h,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}
	});
	let w = /* @__PURE__ */ new Map();
	for (let i of t) (i.kind === "entity_attribute" ? f.hasFullStates(i.entityId) : f.hasStates(i.entityId)) && w.set(i.id, f.buildSeries(i, e, n, r));
	await Ge(p, {
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
		let n = Ye;
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
			let l = N(), u = await _(c, () => Ft(e, [t.entityId], i, o, !1, !1, !1)), d = N() - l;
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
			}, u, d), p = Pt(n, f);
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
	let T = a ? N() : 0, E = t.map((t) => {
		let i = w.get(t.id);
		return i && !C.has(t.entityId) ? i : f.buildSeries(t, e, n, r);
	}), re = a ? N() - T : 0;
	return a?.({
		event: "history.final_series",
		details: {
			seriesCount: E.length,
			pointCount: E.reduce((e, t) => e + t.points.length, 0),
			buildDurationMs: Math.round(re)
		}
	}), E;
}
function Rt(e, t, n, r, i) {
	let a = t.flatMap((t) => {
		let n = St(t, e), r = Ct(t);
		return n !== void 0 && Number.isFinite(r) ? [{
			time: r,
			value: n
		}] : [];
	});
	return {
		source: e,
		points: at(a.length > 0 ? wt(a, r, i) : Dt(n, e, r, i))
	};
}
var zt = 6e4, Bt = 48;
function Vt(e) {
	requestAnimationFrame(() => requestAnimationFrame(e));
}
function Ht(e) {
	return e instanceof Error ? e.message : String(e);
}
function Ut(e) {
	return `${e.kind === "entity_attribute" ? "full" : "state"}:${e.entityId}`;
}
function Wt(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = t[n];
		if (r.source.id !== i.source.id || r.points.length !== i.points.length) return !1;
		for (let e = 0; e < r.points.length; e++) {
			let t = r.points[e], n = i.points[e];
			if (t.time !== n.time || t.value !== n.value) return !1;
		}
	}
	return !0;
}
function Gt(e, t) {
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
function Kt(e, t) {
	let n = e.findIndex((e) => e.time >= t);
	if (n === -1) return e.length > 1 ? [e[e.length - 1]] : e;
	let r = Math.max(0, n - 1);
	return r === 0 ? e : e.slice(r);
}
var qt = class {
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
			accumulator: new Ot()
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
		return (e.activeEntityLoads.get(Ut(t)) ?? 0) > 0;
	}
	_beginLoad(e, t) {
		e.activeLoads += 1;
		for (let n of t) {
			e.sourceStates.set(n.id, "loading");
			let t = Ut(n);
			e.activeEntityLoads.set(t, (e.activeEntityLoads.get(t) ?? 0) + 1);
		}
	}
	_completeLoad(e, t) {
		e.activeLoads = Math.max(0, e.activeLoads - 1);
		for (let n of t) {
			let t = Ut(n), r = Math.max(0, (e.activeEntityLoads.get(t) ?? 0) - 1);
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
		let t = N() - this._lastProgressUpdateMs, n = Math.max(0, Bt - t);
		setTimeout(() => {
			requestAnimationFrame(() => {
				this._progressUpdateScheduled = !1, this._isCurrentSession(e) && (this._lastProgressUpdateMs = N(), this.host.requestUpdate());
			});
		}, n);
	}
	fetch(e, t, n, r) {
		let i = `${t.map((e) => e.id).join("|")}|${n.getTime()}|${r.getTime()}`;
		if (i === this._prevKey && !this.error) return;
		if (this._prevKey = i, t.length === 0) {
			this.series = [], this.changedSourceIds = /* @__PURE__ */ new Set(), this.loading = !1, this.error = "", this.host.requestUpdate();
			return;
		}
		if (!e) {
			this.series = [], this.changedSourceIds = /* @__PURE__ */ new Set(), this.loading = !1, this.error = "No hass object", this.host.requestUpdate();
			return;
		}
		let a = this._createSession(t, n, r), o = N();
		this.series = [], this.changedSourceIds = /* @__PURE__ */ new Set(), this.loading = !0, this.error = "", this._beginLoad(a, t), this.debugPerformance && P(this.debugPerformance, "controller.fetch_start", {
			sessionId: a.id,
			sourceCount: t.length,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}), this.host.requestUpdate(), Lt(e, a.sources, n, r, (t, i) => {
			if (!this._isCurrentSession(a)) return;
			let o = N(), s = this._availableSessionSeries(a, e, n, r, t);
			this.series = this._mergeSeries(this.series.filter((e) => !a.sources.some((t) => t.id === e.source.id)), s), this.changedSourceIds = new Set(i);
			for (let e of s) a.sourceStates.set(e.source.id, "partial");
			this._requestProgressUpdate(a), this.debugPerformance && P(this.debugPerformance, "controller.progress_update", {
				sessionId: a.id,
				sourceCount: t.length,
				pointCount: t.reduce((e, t) => e + t.points.length, 0),
				updateDurationMs: Math.round(N() - o)
			});
		}, this.debugPerformance ? (e) => {
			P(this.debugPerformance, e.event, e.details);
		} : void 0, {
			isCancelled: () => !this._isCurrentSession(a),
			chunkTimeoutMs: zt,
			accumulator: a.accumulator
		}).then((i) => {
			this._isCurrentSession(a) && Vt(() => {
				if (!this._isCurrentSession(a)) return;
				let s = N(), c = this._availableSessionSeries(a, e, n, r, i), l = this._mergeSeries(this.series.filter((e) => !a.sources.some((t) => t.id === e.source.id)), c);
				Wt(this.series, l) || (this.series = l), this.changedSourceIds = /* @__PURE__ */ new Set();
				for (let e of c) a.sourceStates.set(e.source.id, "ready");
				this._completeLoad(a, t), this.host.requestUpdate(), this.debugPerformance && P(this.debugPerformance, "controller.fetch_complete", {
					sessionId: a.id,
					sourceCount: i.length,
					pointCount: i.reduce((e, t) => e + t.points.length, 0),
					totalDurationMs: Math.round(N() - o),
					updateDurationMs: Math.round(N() - s)
				});
			});
		}).catch((e) => {
			if (this._isCurrentSession(a)) {
				for (let e of t) a.sourceStates.set(e.id, "error");
				this.error = Ht(e), this._completeLoad(a, t), this.host.requestUpdate(), this.debugPerformance && P(this.debugPerformance, "controller.fetch_error", {
					sessionId: a.id,
					totalDurationMs: Math.round(N() - o),
					error: this.error
				});
			}
		});
	}
	setImportedSeries(e, t, n) {
		this._cancelSession(), this.series = e, this.changedSourceIds = new Set(e.map((e) => e.source.id)), this.loading = !1, this.error = "", this._prevKey = `${e.map((e) => e.source.id).join("|")}|${t.getTime()}|${n.getTime()}`, this.host.requestUpdate();
	}
	setError(e) {
		this._cancelSession(), this.changedSourceIds = /* @__PURE__ */ new Set(), this.loading = !1, this.error = e, this.host.requestUpdate();
	}
	clearChangedSourceIds() {
		this.changedSourceIds.size !== 0 && (this.changedSourceIds = /* @__PURE__ */ new Set());
	}
	addSources(e, t, n, r) {
		if (!e || t.length === 0) return;
		let i = this._activeSession(n, r) ?? this._createSession(this.series.map((e) => e.source), n, r), a = new Set([...this.series.map((e) => e.source.id), ...i.sourceStates.keys()]), o = t.filter((e) => !a.has(e.id));
		if (o.length === 0) return;
		let s = new Set(i.activeEntityLoads.keys());
		this._addSessionSources(i, o);
		let c = o.filter((e) => !this._hasActiveEntityLoad(i, e)), l = new Set(c.map((e) => e.id)), u = i.sources.filter((e) => l.has(e.id) || !s.has(Ut(e))), d = N();
		for (let e of o) i.sourceStates.set(e.id, c.includes(e) ? "queued" : "loading");
		if (c.length === 0) {
			let t = this._availableSessionSeries(i, e, n, r, []);
			if (t.length > 0) {
				this._mergePartial(t), this.changedSourceIds = new Set(t.map((e) => e.source.id));
				for (let e of t) i.sourceStates.set(e.source.id, "partial");
			}
			this.loading = i.activeLoads > 0, this._requestProgressUpdate(i), this.debugPerformance && P(this.debugPerformance, "controller.add_sources_joined_active_load", {
				sessionId: i.id,
				sourceCount: o.length,
				existingSourceCount: this.series.length
			});
			return;
		}
		this.loading = !0, this._beginLoad(i, c), this.debugPerformance && P(this.debugPerformance, "controller.add_sources_start", {
			sessionId: i.id,
			sourceCount: c.length,
			joinedActiveSourceCount: o.length - c.length,
			existingSourceCount: this.series.length,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}), this.host.requestUpdate(), Lt(e, u, n, r, (t, a) => {
			if (!this._isCurrentSession(i)) return;
			let o = N(), s = this._availableSessionSeries(i, e, n, r, t);
			this._mergePartial(s), this.changedSourceIds = new Set(a);
			for (let e of s) i.sourceStates.set(e.source.id, "partial");
			this._requestProgressUpdate(i), this.debugPerformance && P(this.debugPerformance, "controller.add_sources_progress", {
				sessionId: i.id,
				sourceCount: t.length,
				pointCount: t.reduce((e, t) => e + t.points.length, 0),
				mergeDurationMs: Math.round(N() - o)
			});
		}, this.debugPerformance ? (e) => {
			P(this.debugPerformance, e.event, e.details);
		} : void 0, {
			isCancelled: () => !this._isCurrentSession(i),
			chunkTimeoutMs: zt,
			accumulator: i.accumulator
		}).then((t) => {
			this._isCurrentSession(i) && Vt(() => {
				if (!this._isCurrentSession(i)) return;
				let a = N(), o = this._availableSessionSeries(i, e, n, r, t), s = this._mergeSeries(this.series, o);
				Wt(this.series, s) || (this.series = s), this.changedSourceIds = /* @__PURE__ */ new Set();
				for (let e of o) i.sourceStates.set(e.source.id, "ready");
				this._completeLoad(i, c), this.host.requestUpdate(), this.debugPerformance && P(this.debugPerformance, "controller.add_sources_complete", {
					sessionId: i.id,
					sourceCount: t.length,
					pointCount: t.reduce((e, t) => e + t.points.length, 0),
					totalDurationMs: Math.round(N() - d),
					mergeDurationMs: Math.round(N() - a)
				});
			});
		}).catch((e) => {
			if (this._isCurrentSession(i)) {
				for (let e of c) i.sourceStates.set(e.id, "error");
				this.error = Ht(e), this._completeLoad(i, c), this.host.requestUpdate(), this.debugPerformance && P(this.debugPerformance, "controller.add_sources_error", {
					sessionId: i.id,
					totalDurationMs: Math.round(N() - d),
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
			let r = Et(e, n, a);
			if (!r) return t;
			let c = {
				...r,
				time: Math.min(Math.max(r.time, i), a)
			}, l = Kt(Gt(t.points, c), i);
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
		this._prevKey = this.series.map((e) => e.source.id).join("|") + "|", this.host.requestUpdate();
	}
}, Jt = [
	"#ff9800",
	"#42a5f5",
	"#66bb6a",
	"#ec407a",
	"#ab47bc",
	"#26a69a"
], Yt = {
	current_temperature: "#42a5f5",
	temperature: "#ff9800"
}, Xt = new Set(Object.values(Yt)), Zt = Jt.filter((e) => !Xt.has(e));
function Qt(e) {
	return Zt[e % Zt.length];
}
function $t(e) {
	return e.trim().toLowerCase();
}
function en(e) {
	return `hsl(${(e * 137.508 % 360).toFixed(1)} 68% 52%)`;
}
function tn(e, t, n) {
	if (!t.has($t(e))) return e;
	let r = [
		...Zt.slice(n % Zt.length),
		...Zt.slice(0, n % Zt.length),
		...Jt
	];
	for (let e of r) if (!t.has($t(e))) return e;
	let i = n, a = en(i);
	for (; t.has($t(a));) i += 1, a = en(i);
	return a;
}
function nn(e) {
	return $t(e);
}
function rn(e) {
	let t = e?.trim().toLowerCase();
	if (t) {
		if (t === "°c" || t === "c" || t === "celsius") return "c";
		if (t === "°f" || t === "f" || t === "fahrenheit") return "f";
		if (t === "k" || t === "kelvin") return "k";
	}
}
function F(e) {
	return rn(e) !== void 0;
}
function I(e, t) {
	let n = rn(e), r = rn(t);
	return n !== void 0 && n === r;
}
function an(e) {
	let t = rn(e);
	return t ? `temperature:${t}` : e && e.trim() !== "" ? e : "__unitless__";
}
function on(e) {
	if (!Number.isFinite(e) || Number.isInteger(e)) return 0;
	let t = e.toString().toLowerCase();
	if (t.includes("e-")) {
		let [e, n] = t.split("e-"), r = e.split(".")[1]?.length ?? 0;
		return Math.min(r + Number(n), 4);
	}
	return Math.min(t.split(".")[1]?.length ?? 0, 4);
}
function sn(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
function cn(e, t, n = 5) {
	if (!Number.isFinite(e) || !Number.isFinite(t)) return [e, t];
	let r = Math.abs(t - e);
	if (r < 1e-10) return [e];
	let i = ln(r / (Math.max(n, 2) - 1)), a = Math.floor(e / i) * i, o = Math.ceil(t / i) * i, s = i * 1e-8, c = [];
	for (let e = a; e <= o + s; e += i) c.push(un(e, i));
	return c;
}
function ln(e) {
	if (e <= 0) return 1;
	let t = Math.floor(Math.log10(Math.abs(e))), n = e / 10 ** t, r;
	return r = n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10, r * 10 ** t;
}
function un(e, t) {
	let n = Math.max(0, -Math.floor(Math.log10(Math.abs(t) || 1)) + 1);
	return parseFloat(e.toFixed(n));
}
function dn(e) {
	let t = 0;
	for (let n of e) {
		let e = String(n), r = e.indexOf(".");
		r !== -1 && (t = Math.max(t, e.length - r - 1));
	}
	return t;
}
function fn(e, t, n) {
	let r = t - e;
	if (r < 1e-6) {
		let r = Math.max(Math.abs(t) * .05, 1);
		return {
			min: sn(e - r, n),
			max: sn(t + r, n)
		};
	}
	let i = Math.max(r * .08, 10 ** -n), a = 10 ** n, o = Math.ceil(i * a) / a;
	return {
		min: sn(e - o, n),
		max: sn(t + o, n)
	};
}
function pn(e) {
	return 28 + (Math.max(e, 1) - 1) * 214 + 180 + 18;
}
var mn = .1, hn = 12, gn = 2.5;
function _n(e) {
	return Math.max(e.max - e.min, 1e-9);
}
function vn(e) {
	return (e.min + e.max) / 2;
}
function yn(e) {
	return Math.log10(Math.max(Math.abs(e), 1e-9));
}
function bn(e, t) {
	let n = Math.abs(yn(_n(e)) - yn(_n(t))), r = Math.abs(yn(vn(e)) - yn(vn(t))), i = xn(e.unit) === xn(t.unit) ? 0 : 2;
	return n + r * .6 + i;
}
function xn(e) {
	return an(e);
}
function Sn(e) {
	return e.length > 0 && e.every((e) => F(e.unit));
}
function Cn(e) {
	if (e.length < 2) return !1;
	let t = Math.min(...e.map((e) => e.min)), n = Math.max(...e.map((e) => e.max)), r = Math.max(n - t, 1e-9), i = e.map((e) => e.max - e.min).filter((e) => e > 1e-6);
	if (i.length < 2) return !1;
	let a = Math.min(...i), o = Math.max(...i), s = i.find((e) => e / r <= mn);
	return s === void 0 ? !1 : r / s >= gn && (o / Math.max(a, 1e-9) >= hn || r / a >= hn);
}
function wn(e) {
	let t = e[0], n = e[1], r = -Infinity;
	for (let i = 0; i < e.length; i++) for (let a = i + 1; a < e.length; a++) {
		let o = bn(e[i], e[a]);
		o > r && (r = o, t = e[i], n = e[a]);
	}
	return t.order <= n.order ? [t, n] : [n, t];
}
function Tn(e, t) {
	let n = e.filter((e) => e.scalePreference === "primary"), r = e.filter((e) => e.scalePreference === "secondary"), i = e.filter((e) => e.scalePreference === "auto");
	if (r.length > 0 && r.length < e.length) return [[...n, ...i], r];
	if (n.length > 0 || !t || !Cn(e)) return [e, []];
	let [a, o] = wn(e), s = [], c = [];
	for (let t of e) t.id === a.id ? s.push(t) : t.id === o.id ? c.push(t) : bn(t, a) <= bn(t, o) ? s.push(t) : c.push(t);
	return [s, c];
}
function En(e, t) {
	let n = Dn(e);
	return n.length >= 2 ? [n[0].series, n[1].series] : Tn(e, t);
}
function Dn(e) {
	let t = [];
	for (let n of e) {
		let e = xn(n.unit), r = t.find((t) => t.unit === e);
		r ? r.series.push(n) : t.push({
			unit: e,
			series: [n]
		});
	}
	return t;
}
function On(e) {
	let t = Dn(e);
	if (t.length <= 2) return [e];
	let n = [];
	for (let e = 0; e < t.length; e += 2) n.push(t.slice(e, e + 2).flatMap((e) => e.series));
	return n;
}
function kn(e, t, n, r, i) {
	let a = Math.min(...r.map((e) => e.min)), o = Math.max(...r.map((e) => e.max)), s = Math.max(...r.map((e) => e.precision)), c = fn(a, o, s), l = cn(c.min, c.max);
	return {
		ids: new Set(r.map((e) => e.id)),
		graphKey: e,
		sourceGraphKey: t,
		axis: n,
		min: c.min,
		max: c.max,
		precision: Math.max(s, dn(l)),
		ticks: l,
		top: i,
		height: 180
	};
}
function An(e, t = {}) {
	let n = t.autoScaleSplit ?? !0, r = [];
	for (let [t, n] of e.entries()) {
		if (n.valueType !== "number" && n.valueType !== "boolean") continue;
		let e = n.points.map((e) => Number(e.value)).filter((e) => Number.isFinite(e)), i = n.scaleMode === "manual" && n.scaleMin !== void 0 ? n.scaleMin : 0, a = n.scaleMode === "manual" && n.scaleMax !== void 0 ? n.scaleMax : 1, o = n.valueType === "boolean" ? 0 : e.length > 0 ? Math.min(...e) : Math.min(i, a), s = n.valueType === "boolean" ? 1 : e.length > 0 ? Math.max(...e) : Math.max(i, a), c = n.valueType === "boolean" || e.length === 0 ? 0 : Math.max(...e.map((e) => on(e))), l = n.valueType === "boolean" ? "group:boolean" : n.scaleGroupKey, u = r.find((e) => e.key === l);
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
	return r.flatMap((e) => (e.key === "group:boolean" ? [e.series] : On(e.series)).flatMap((t, r) => {
		let a = r === 0 ? e.key : `${e.key}::unit-graph:${r + 1}`, o = n && e.key !== "group:temperature" && !Sn(t), [s, c] = e.key === "group:boolean" ? [t, []] : En(t, o), l = 28 + i++ * 214, u = kn(a, e.key, "left", s, l);
		return c.length > 0 ? [u, kn(a, e.key, "right", c, l)] : [u];
	}));
}
function jn(e, t, n, r) {
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
function Mn(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function Nn(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function Pn(e, t) {
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
function Fn(e) {
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
function In(e, t, n) {
	let r = Fn(e);
	if (!r) return [];
	let i = e.find((e) => e.id === r.tempId), a = e.find((e) => e.id === r.hvacId);
	if (!i || !a) return [];
	let o = t.find((e) => e.ids.has(i.id));
	if (!o) return [];
	let s = i.points.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time);
	return s.length === 0 ? [] : Ln(a.points, n).filter((e) => e.value === "heating").reduce((e, t) => {
		let n = e[e.length - 1];
		return n && Math.abs(n.end - t.start) < 1 ? n.end = t.end : e.push({
			start: t.start,
			end: t.end
		}), e;
	}, []).flatMap(({ start: e, end: t }, r) => {
		let i = [
			{
				time: e,
				value: Pn(s, e)
			},
			...s.filter((n) => n.time > e && n.time < t),
			{
				time: t,
				value: Pn(s, t)
			}
		].filter((e) => e.value !== void 0);
		if (i.length === 0) return [];
		let c = o.top + o.height, l = [
			`${Mn(e, n).toFixed(1)},${c.toFixed(1)}`,
			...i.map((e) => `${Mn(e.time, n).toFixed(1)},${Nn(e.value, o).toFixed(1)}`),
			`${Mn(t, n).toFixed(1)},${c.toFixed(1)}`
		].join(" ");
		return [{
			id: `${a.id}:heat:${r}`,
			points: l
		}];
	});
}
function Ln(e, t) {
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
function L(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function R(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function Rn(e, t) {
	return t.find((t) => t.ids.has(e.id));
}
function zn(e, t) {
	return Bn(e, t, !0);
}
function Bn(e, t, n) {
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
var Vn = new Set([
	"off",
	"idle",
	"none",
	"false"
]);
function Hn(e, t, n, r) {
	if (typeof e == "boolean") return e ? t : "var(--better-history-muted-color, var(--secondary-text-color, #888))";
	let i = String(e);
	return Vn.has(i.toLowerCase()) ? "var(--better-history-muted-color, var(--secondary-text-color, #888))" : (n.has(i) || n.set(i, Jt[(r + n.size) % Jt.length]), n.get(i));
}
function Un(e, t) {
	return e + 34 + Math.max(t - 1, 0) * 14;
}
function Wn(e, t, n, r) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode === "column") return [];
		let i = Rn(e, t);
		if (!i) return [];
		let a = jn(Gn(e.points, n, e.lineMode, r), n, 40, 640), { points: o, pathLength: s } = e.lineMode === "line" ? $n(a, n, i) : Qn(a, n, i);
		return [{
			id: e.id,
			color: e.color,
			points: o,
			pathLength: s,
			lineWidth: e.lineWidth
		}];
	});
}
function Gn(e, t, n, r) {
	let i = e.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time), a = i.filter((e) => e.time >= t.start && e.time <= t.end);
	if (n === "line") return qn(i, a, t);
	let o = [...i].reverse().find((e) => e.time < t.start), s = o && (a.length === 0 || a[0].time > t.start) ? [{
		time: t.start,
		value: o.value
	}, ...a] : a, c = s[s.length - 1];
	return r.extendStairToEnd && c && c.time < t.end ? [...s, {
		time: t.end,
		value: c.value
	}] : s;
}
function Kn(e, t, n) {
	if (!e || !t || e.time === t.time || e.time > n || t.time < n) return;
	let r = (n - e.time) / (t.time - e.time);
	return {
		time: n,
		value: e.value + (t.value - e.value) * r
	};
}
function qn(e, t, n) {
	let r = [...e].reverse().find((e) => e.time < n.start), i = e.find((e) => e.time > n.start), a = [...e].reverse().find((e) => e.time < n.end), o = e.find((e) => e.time > n.end), s = t[0]?.time === n.start ? void 0 : Kn(r, i, n.start), c = t[t.length - 1]?.time === n.end ? void 0 : Kn(a, o, n.end);
	return [
		s,
		...t,
		c
	].filter((e) => e !== void 0);
}
function Jn(e) {
	return e.min <= 0 && e.max >= 0 ? 0 : e.min > 0 ? e.min : e.max;
}
function Yn(e, t, n, r) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode !== "column") return [];
		let i = Rn(e, t);
		if (!i) return [];
		let a = R(Jn(i), i);
		return Bn(e, n, r.extendColumnToEnd).flatMap((t, r) => {
			let o = Number(t.value);
			if (!Number.isFinite(o)) return [];
			let s = L(t.start, n), c = L(t.end, n), l = R(o, i), u = Math.max(c - s, 1);
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
function Xn(e, t, n) {
	let r = t + 10, i = 0;
	return e.flatMap((e, t) => {
		if (e.valueType === "number" || e.valueType === "boolean") return [];
		let a = r + i * 14;
		i += 1;
		let o = /* @__PURE__ */ new Map();
		return zn(e, n).reduce((n, r) => {
			let i = Hn(r.value, e.color, o, t), a = n[n.length - 1];
			return a && a.fill === i && Math.abs(a.end - r.start) < 1 ? a.end = r.end : n.push({
				start: r.start,
				end: r.end,
				fill: i
			}), n;
		}, []).map((t, r) => {
			let i = L(t.start, n), o = Math.max(L(t.end, n) - i, 1);
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
function Zn(e) {
	return e.flatMap((e) => {
		let t = e.height - 10;
		return e.ticks.map((n) => ({
			y: e.top + 5 + t - (n - e.min) / (e.max - e.min) * t,
			value: er(n, e.precision)
		}));
	});
}
function Qn(e, t, n) {
	if (e.length === 0) return {
		points: "",
		pathLength: 0
	};
	if (e.length === 1) return {
		points: `${L(e[0].time, t).toFixed(1)},${R(e[0].value, n).toFixed(1)}`,
		pathLength: 0
	};
	let r = [], i = 0;
	for (let a = 0; a < e.length - 1; a++) {
		let o = e[a], s = e[a + 1], c = L(o.time, t), l = R(o.value, n), u = L(s.time, t), d = R(s.value, n);
		a === 0 && r.push(`${c.toFixed(1)},${l.toFixed(1)}`), r.push(`${u.toFixed(1)},${l.toFixed(1)}`), r.push(`${u.toFixed(1)},${d.toFixed(1)}`), i += Math.abs(u - c) + Math.abs(d - l);
	}
	return {
		points: r.join(" "),
		pathLength: i
	};
}
function $n(e, t, n) {
	if (e.length === 0) return {
		points: "",
		pathLength: 0
	};
	let r = 0, i;
	return {
		points: e.map((e) => {
			let a = L(e.time, t), o = R(e.value, n);
			return i && (r += Math.hypot(a - i.x, o - i.y)), i = {
				x: a,
				y: o
			}, `${a.toFixed(1)},${o.toFixed(1)}`;
		}).join(" "),
		pathLength: r
	};
}
function er(e, t) {
	return t <= 0 && Number.isInteger(e) ? String(e) : e.toFixed(t);
}
var tr = 60 * 1e3, z = 60 * tr, B = 24 * z, nr = [
	10 * tr,
	15 * tr,
	20 * tr,
	30 * tr,
	z,
	2 * z,
	3 * z,
	4 * z,
	6 * z,
	8 * z,
	12 * z,
	B,
	2 * B,
	3 * B,
	7 * B,
	14 * B,
	30 * B,
	60 * B,
	90 * B
];
function rr(e, t) {
	for (let n of nr) if (e / n <= t) return n;
	return nr[nr.length - 1];
}
function ir(e, t, n = 12) {
	let r = t - e;
	if (r <= 0) return [];
	let i = rr(r, n), a = [], o = Math.ceil(e / i) * i;
	for (let e = o; e < t; e += i) {
		let t = new Date(e);
		a.push({
			time: e,
			bold: t.getHours() === 0 && t.getMinutes() === 0
		});
	}
	return a;
}
function ar(e, t) {
	let n = new Date(e), r = t / B;
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
function or(e, t) {
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
function sr(e, t) {
	return e.map((e) => ({
		...e,
		points: or(e.points, t)
	}));
}
function cr(e) {
	return e.valueType === "boolean" ? "group:boolean" : e.scaleGroupKey;
}
function lr(e) {
	return an(e);
}
function ur(e, t) {
	let n = cr(e);
	if (n === "group:boolean") return n;
	let r = [];
	for (let e of t) {
		let t = lr(e.unit);
		r.includes(t) || r.push(t);
	}
	let i = r.indexOf(lr(e.unit));
	return i < 0 || r.length <= 2 || i < 2 ? n : `${n}::unit-graph:${Math.floor(i / 2) + 1}`;
}
function dr(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	for (let t of e) {
		if (t.valueType !== "number" && t.valueType !== "boolean") continue;
		let e = cr(t);
		i.set(e, [...i.get(e) ?? [], t]);
	}
	for (let e of t) {
		if (e.valueType !== "number" && e.valueType !== "boolean") continue;
		let t = cr(e);
		r.set(t, [...r.get(t) ?? [], e]);
	}
	return [...i.entries()].flatMap(([e, t]) => sr(r.get(e) ?? t, n));
}
function fr(e, t, n, r = !1, i = 12, a = !0, o = !0) {
	let s = { extendStairToEnd: a }, c = { extendColumnToEnd: a }, l = An(dr(e, t, n), { autoScaleSplit: o }), u = new Set(l.map((e) => e.graphKey)).size, d = pn(u), f = e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").length, p = ir(n.start, n.end, i), m = n.end - n.start;
	return {
		allSeries: e,
		visibleSeries: t,
		timeBounds: n,
		extendStairToEnd: a,
		numericScales: l,
		plotBottom: d,
		chartHeight: Un(d, f),
		numericLines: Wn(t, l, n, s),
		numericColumns: Yn(t, l, n, c),
		segments: Xn(t, d, n),
		heatingAreas: r ? [] : In(t, l, n),
		yAxisLabels: Zn(l),
		xAxisLabels: p.map((e) => ({
			x: L(e.time, n),
			label: ar(e.time, m),
			bold: e.bold
		}))
	};
}
function pr(e, t, n, r, i) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode !== "column").flatMap((e) => {
		let a = Rn(e, t);
		if (!a) return [];
		let o = {
			...a,
			top: 28,
			height: i
		}, s = jn(Gn(e.points, n, e.lineMode, r), n, 40, 640), { points: c, pathLength: l } = e.lineMode === "line" ? $n(s, n, o) : Qn(s, n, o);
		return {
			id: e.id,
			color: e.color,
			points: c,
			pathLength: l,
			lineWidth: e.lineWidth
		};
	});
}
function mr(e, t, n, r, i) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode === "column").flatMap((e) => {
		let a = Rn(e, t);
		if (!a) return [];
		let o = {
			...a,
			top: 28,
			height: r
		}, s = R(Jn(o), o);
		return Bn(e, n, i.extendColumnToEnd).flatMap((t, r) => {
			let i = Number(t.value);
			if (!Number.isFinite(i)) return [];
			let a = L(t.start, n), c = L(t.end, n), l = R(i, o);
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
function hr(e, t, n) {
	return e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").flatMap((e, r) => {
		let i = t + r * 14, a = /* @__PURE__ */ new Map();
		return zn(e, n).reduce((t, n) => {
			let i = Hn(n.value, e.color, a, r), o = t[t.length - 1];
			return o && o.fill === i && Math.abs(o.end - n.start) < 1 ? o.end = n.end : t.push({
				start: n.start,
				end: n.end,
				fill: i
			}), t;
		}, []).map((t, r) => {
			let a = L(t.start, n), o = Math.max(L(t.end, n) - a, 1);
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
function gr(e) {
	return e >= 160 ? 5 : e >= 100 ? 4 : e >= 64 ? 3 : 2;
}
function _r(e, t) {
	let n = t - 10, r = gr(t), i = e.ticks.length <= r ? e.ticks : cn(e.min, e.max, r), a = Math.max(Math.abs(e.max - e.min), 1) * 1e-9, o = i.filter((t) => t >= e.min - a && t <= e.max + a), s = o.length > 0 ? o : [e.min, e.max], c = e.ticks === i ? e.precision : Math.max(e.precision, dn(s));
	return s.map((t) => ({
		y: 33 + n - (t - e.min) / (e.max - e.min) * n,
		value: er(t, c)
	}));
}
function vr(e, t, n) {
	let r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
	return {
		allSeries: e.map((e, t) => {
			let a = tn(e.color, r, n * Jt.length + t);
			return r.add(nn(a)), i.set(e.id, a), a === e.color ? e : {
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
function yr(e, t = 12, n = 180) {
	let r = [], i = e.timeBounds, a = e.allSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), o = e.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), s = i.end - i.start, c = ir(i.start, i.end, t).map((e) => ({
		x: L(e.time, i),
		label: ar(e.time, s),
		bold: e.bold
	}));
	if (e.numericScales.length === 0 && a.length > 0) {
		let e = o.length, t = 28 + n + 16 + 6, s = e > 0 ? 22 + e * 14 : 0, l = 28 + n + s + 18, u = l + (e > 0 ? 0 : 16), d = vr(a, o, 0);
		r.push({
			series: d.visibleSeries,
			allSeries: d.allSeries,
			scales: [],
			graphHeight: n,
			svgHeight: l,
			canvasHeight: u,
			lines: [],
			columns: [],
			segments: hr(d.visibleSeries, t, i),
			yLabels: [],
			rightYLabels: [],
			xLabels: c,
			heatingAreas: []
		});
	}
	let l = [...new Set(e.numericScales.map((e) => e.graphKey))];
	for (let t = 0; t < l.length; t++) {
		let s = l[t], u = e.numericScales.filter((e) => e.graphKey === s), d = u.find((e) => e.axis === "left") ?? u[0], f = u.find((e) => e.axis === "right"), p = new Set(u.flatMap((e) => [...e.ids])), m = u[0]?.sourceGraphKey ?? s, h = e.allSeries.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && cr(e) === m), g = h.filter((e) => ur(e, h) === s), _ = e.visibleSeries.filter((e) => p.has(e.id)), v = t === 0 ? [..._, ...o] : _, y = vr(t === 0 ? [...g, ...a] : g, v, t), b = y.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), x = b.length, ee = 28 + n + 16 + 6, S = x > 0 ? 22 + x * 14 : 0, C = 28 + n + S + 18, te = C + (x > 0 ? 0 : 16), w = _r(d, n), ne = f ? _r(f, n) : [], T = u.map((e) => ({
			...e,
			top: 28,
			height: n
		})), E = T.find((e) => e.axis === "left") ?? T[0];
		r.push({
			series: y.visibleSeries,
			allSeries: y.allSeries,
			scale: E,
			scales: T,
			graphHeight: n,
			svgHeight: C,
			canvasHeight: te,
			lines: pr(y.visibleSeries, T, i, { extendStairToEnd: e.extendStairToEnd }, n),
			columns: mr(y.visibleSeries, T, i, n, { extendColumnToEnd: e.extendStairToEnd }),
			segments: hr(b, ee, i),
			yLabels: w,
			rightYLabels: ne,
			xLabels: c,
			heatingAreas: e.heatingAreas.length > 0 ? In(e.visibleSeries, T, i) : []
		});
	}
	return r;
}
var br = class {
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
	sync(e, t, n, r, i) {
		this._timeBounds = i, this._rebuildCache(e, t, n);
	}
	_rebuildCache(e, t, n) {
		let r = `${t.map((e) => `${e.source.id}:${e.points.length}`).join("|")}::${n.join("|")}`;
		this._fetchedRef === t && this._cacheKey === r || (this._fetchedRef = t, this._cacheKey = r, this._series = e.filter((e) => !n.includes(e.id)).flatMap((e) => {
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
		});
		if (a.length === 0) {
			this.tooltip !== void 0 && (this.tooltip = void 0, this._host.requestUpdate(), this._emit());
			return;
		}
		if (this.tooltip?.time === i && this.tooltip.activeLeft === e.activeLeft && this.tooltip.activeTop === e.activeTop && this.tooltip.activeWidth === e.activeWidth && this.tooltip.activeHeight === e.activeHeight && this.tooltip.activeKey === e.activeKey && Math.abs(this.tooltip.tooltipX - Math.min(Math.max(e.x, 120), 600)) < 1 && Math.abs(this.tooltip.y - this._tooltipY(e)) < 1 && this.tooltip.placement === this._placement(e)) return;
		let o = Math.min(Math.max(e.x, 120), 600), s = this._tooltipY(e);
		this.tooltip = {
			x: L(i, this._timeBounds),
			tooltipX: o,
			y: s,
			placement: this._placement(e),
			activeLeft: e.activeLeft,
			activeTop: e.activeTop,
			activeWidth: e.activeWidth,
			activeHeight: e.activeHeight,
			activeKey: e.activeKey,
			time: i,
			values: a
		}, this._host.requestUpdate(), this._emit();
	}
	_placement(e) {
		let t = e.activeTop + e.activeHeight;
		return e.touchLike ? e.y < e.activeTop + e.activeHeight / 2 ? "above" : "below" : t - e.y < 120 ? "above" : "below";
	}
	_tooltipY(e) {
		let t = e.activeTop + e.activeHeight;
		return e.touchLike ? this._placement(e) === "above" ? t - 10 : e.activeTop + 10 : Math.min(Math.max(e.y, e.activeTop + 28), t - 28);
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
		let i = t.getBoundingClientRect(), a = n.getBoundingClientRect();
		if (e.clientX < a.left || e.clientX > a.right || e.clientY < a.top || e.clientY > a.bottom) return;
		let o = a.left - i.left, s = a.top - i.top;
		return {
			x: 40 + (e.clientX - a.left) / a.width * 640,
			y: e.clientY - i.top,
			activeLeft: o,
			activeTop: s,
			activeWidth: a.width,
			activeHeight: a.height,
			activeIds: r,
			activeKey: [...r].join("|"),
			touchLike: e.pointerType === "touch" || window.matchMedia("(hover: none) and (pointer: coarse)").matches
		};
	}
	renderTooltip() {
		if (!this.tooltip) return A;
		let e = this.tooltip.activeLeft + (this.tooltip.x - 40) / 640 * this.tooltip.activeWidth, t = this.tooltip.activeLeft + (this.tooltip.tooltipX - 40) / 640 * this.tooltip.activeWidth, n = this.tooltip.placement === "above" ? "translate(-50%, calc(-100% - 10px))" : "translate(-50%, 10px)";
		return O`
      <div class="tooltip-axis-pointer" style=${`left:${e.toFixed(1)}px;top:${this.tooltip.activeTop.toFixed(1)}px;height:${this.tooltip.activeHeight.toFixed(1)}px;`}></div>
      <div
        class="tooltip"
        style=${`left:clamp(150px,${t.toFixed(1)}px,calc(100% - 150px));top:${this.tooltip.y.toFixed(1)}px;transform:${n};`}
      >
        <div class="tooltip-time">${new Date(this.tooltip.time).toLocaleString()}</div>
        ${this.tooltip.values.map((e) => O`
            <div class="tooltip-row">
              <span class="tooltip-dot" style=${`background:${e.color}`}></span>
              <span class="tooltip-label">${e.label}</span>
              <span>${e.value}</span>
            </div>
          `)}
      </div>
    `;
	}
}, xr = "temperature";
function Sr(e) {
	return e.join(".");
}
function Cr(e) {
	return e?.toLowerCase() === xr;
}
function wr(e, t) {
	if (!e || !t) return;
	let n = t[Sr(e)];
	return typeof n == "string" && n !== "" ? n : void 0;
}
function Tr(e) {
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
var Er = 24, Dr = "2.5", Or = [
	"current_temperature",
	"temperature",
	"hvac_action"
];
function kr(e) {
	return e.scaleMode === "manual" && (e.scaleMin !== void 0 || e.scaleMax !== void 0);
}
function Ar(e) {
	return /* @__PURE__ */ new Date(Math.floor(e.getTime() / 1e3) * 1e3);
}
function jr(e) {
	if (e !== void 0) return Array.isArray(e) ? e : e.split(".");
}
function Mr(e) {
	return e === "line" || e === "column" ? e : "stair";
}
function Nr(e) {
	return typeof e == "number" ? Number.isFinite(e) && e >= 0 ? String(e) : Dr : typeof e == "string" && e.trim() !== "" ? e.trim() : Dr;
}
function Pr(e) {
	return e === "primary" || e === "secondary" ? e : "auto";
}
function Fr(e, t) {
	return t ? `attr:${e}:${t.join(".")}` : `state:${e}`;
}
function Ir(e) {
	return e[e.length - 1] ?? "";
}
function Lr(e, t, n) {
	let r = e?.states[t];
	return r ? n ? bt(r, n)?.valueType ?? "string" : yt(r)?.valueType ?? "string" : "number";
}
function Rr(e, t, n, r) {
	if (r) return r;
	if (n) return Ir(n);
	let i = e?.states[t]?.attributes.friendly_name;
	return typeof i == "string" && i !== "" ? i : t;
}
function zr(e, t, n, r, i) {
	if (r !== void 0) return r || void 0;
	if (n) return wr(n, i);
	let a = e?.states[t]?.attributes.unit_of_measurement;
	return typeof a == "string" && a !== "" ? a : void 0;
}
function Br(e, t, n, r) {
	return n ? `group:${n}` : r === "number" && t ? `unit:${t}` : `series:${e}`;
}
function Vr(e, t) {
	let n = t?.length === 1 ? t[0] : void 0;
	return e.startsWith("climate.") && (n === "current_temperature" || n === "temperature");
}
function Hr(e) {
	return Vr(e.entity, e.attribute);
}
function Ur(e, t, n, r, i, a) {
	let o = jr(e.attribute), s = Fr(e.entity, o), c = Lr(n, e.entity, o), l = zr(n, e.entity, o, e.unit, r), u = e.group ?? e.scaleGroup ?? (Vr(e.entity, o) ? "temperature" : void 0);
	return {
		id: s,
		entity: e.entity,
		attribute: o,
		forced: e.forced ?? !0,
		label: Rr(n, e.entity, o, e.label),
		color: e.color ?? Qt(t),
		unit: l,
		scaleGroupKey: Br(s, l, u, c),
		scaleMode: e.scaleMode ?? "auto",
		scaleMin: e.scaleMin,
		scaleMax: e.scaleMax,
		scalePreference: Pr(e.scalePreference),
		lineMode: Mr(e.lineMode ?? i),
		lineWidth: Nr(e.lineWidth ?? a),
		valueType: c
	};
}
function Wr(e, t, n, r, i) {
	let a = n?.states[e];
	if (!a) {
		let n = `state:${e}`;
		return {
			id: n,
			entity: e,
			forced: !0,
			label: e,
			color: Qt(t),
			scaleGroupKey: `series:${n}`,
			scaleMode: "auto",
			scalePreference: "auto",
			lineMode: Mr(r),
			lineWidth: Nr(i),
			valueType: "number"
		};
	}
	let o = yt(a);
	if (o) return {
		id: o.id,
		entity: e,
		forced: !0,
		label: o.label,
		color: Qt(t),
		unit: o.unit,
		scaleGroupKey: Br(o.id, o.unit, void 0, o.valueType),
		scaleMode: "auto",
		scalePreference: "auto",
		lineMode: Mr(r),
		lineWidth: Nr(i),
		valueType: o.valueType
	};
}
function Gr(e, t) {
	let n = t?.states[e]?.attributes, r = n?.temperature_unit;
	if (typeof r == "string" && r !== "") return r;
	let i = n?.unit_of_measurement;
	if (typeof i == "string" && i !== "") return i;
	let a = t?.config?.unit_system?.temperature;
	return typeof a == "string" && a !== "" ? a : void 0;
}
function Kr(e, t, n) {
	if (e.attribute || !e.entity.startsWith("climate.") || !n?.states[e.entity]) return [e];
	let r = Gr(e.entity, n), i = e.scaleGroupKey.startsWith("group:") ? e.scaleGroupKey.slice(6) : void 0;
	return [e, ...Or.map((a) => {
		let o = [a], s = Fr(e.entity, o), c = Lr(n, e.entity, o), l = Yt[a] ?? Qt(t()), u = a === "current_temperature" || a === "temperature" ? r : void 0, d = a === "hvac_action" ? void 0 : i ?? "temperature";
		return {
			id: s,
			entity: e.entity,
			attribute: o,
			forced: e.forced,
			label: a,
			color: l,
			unit: u,
			scaleGroupKey: Br(s, u, d, c),
			scaleMode: "auto",
			scalePreference: e.scalePreference,
			lineMode: e.lineMode,
			lineWidth: e.lineWidth,
			valueType: c
		};
	})];
}
function qr(e) {
	return e.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && F(e.unit))?.unit ?? e.find((e) => e.unit && F(e.unit))?.unit;
}
function Jr(e) {
	let t = qr(e), n = e.some((e) => e.scaleGroupKey === "group:temperature");
	return e.map((e) => {
		let r = Cr(e.unit), i = Hr(e), a = t && (r || I(e.unit, t) || e.unit === void 0 && i) ? t : e.unit, o = e.scaleGroupKey;
		if (a && o.startsWith("unit:")) {
			let e = o.slice(5);
			(r && e === "temperature" || I(e, a)) && (o = `unit:${a}`);
		}
		return n && e.valueType === "number" && a && F(a) && o.startsWith("unit:") && !kr(e) && (o = "group:temperature"), a !== e.unit || o !== e.scaleGroupKey ? {
			...e,
			unit: a,
			scaleGroupKey: o
		} : e;
	});
}
function Yr(e) {
	let { config: t, hass: n } = e, r = e.attributeUnits ?? t?.attributeUnits, i = t?.endDate ?? e.endDate ?? /* @__PURE__ */ new Date(), a = t?.hours ?? e.hours ?? Er, o = t?.startDate ?? e.startDate ?? /* @__PURE__ */ new Date(i.getTime() - a * 36e5), s = t?.lineMode ?? e.lineMode, c = t?.lineWidth ?? e.lineWidth, l;
	l = t?.series && t.series.length > 0 ? t.series.map((e, t) => Ur(e, t, n, r, s, c)) : (t?.defaultEntities ?? e.entities ?? []).map((e, t) => Wr(e, t, n, s, c)).filter((e) => e !== void 0);
	let u = l.length;
	return l = l.flatMap((e) => Kr(e, () => u++, n)), l = Jr(l), {
		startDate: Ar(o),
		endDate: Ar(i),
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
var Xr = {
	loading: "ui.common.loading",
	empty: "ui.components.history_charts.no_history_found",
	error: "ui.components.history_charts.error",
	add_target: "ui.components.target-picker.add_target",
	attributes: "ui.dialogs.more_info_control.attributes",
	back: "ui.common.back",
	done: "ui.common.done",
	search_entity: "ui.components.entity.entity-picker.search"
}, Zr = {
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
function V(e, t) {
	let n = Xr[t];
	if (n && e?.localize) {
		let t = e.localize(n);
		if (t) return t;
	}
	return Zr[e?.locale?.language?.split("-")[0] ?? e?.language?.split("-")[0] ?? "en"]?.[t] ?? Zr.en?.[t] ?? t;
}
var Qr = o`
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
    flex: 0 1 auto;
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
    max-width: 100%;
  }

  .entity-trigger {
    flex: 0 0 auto;
    max-width: 100%;
    width: fit-content;
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
`, $r = [
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
], ei;
function ti() {
	return ei ??= Be($r), ei;
}
var ni;
function ri() {
	return ni ??= ii(), ni;
}
async function ii() {
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
function ai() {
	return customElements.get("ha-date-range-picker") !== void 0;
}
async function oi() {
	await ri();
}
function si(e) {
	return O`
    <div
      class="date-picker-wrapper"
      @focusin=${() => e.onOpen?.()}
      @pointerdown=${() => e.onOpen?.()}
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
var ci = 8, li = 50, ui = 20, di = [
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
function fi(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function pi(e) {
	return typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id;
}
function mi(e) {
	return typeof e == "string" && e.trim() !== "" ? e : void 0;
}
function hi(...e) {
	return e.find((e) => mi(e) !== void 0);
}
function gi(e) {
	return e.split(".")[0] ?? e;
}
function _i(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function vi(e, t) {
	let n = pi(t), r = e.entities?.[t.entity_id], i = r?.device_id ? e.devices?.[r.device_id] : void 0, a = r?.area_id ?? i?.area_id, o = a ? e.areas?.[a] : void 0, s = hi(r?.name_by_user, r?.name, r?.original_name, n) ?? t.entity_id, c = hi(i?.name_by_user, i?.name), l = hi(o?.name), u = gi(t.entity_id);
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
function yi(e, t) {
	return e ? (t ?? Object.values(e.states).filter((e) => e !== void 0)).map((t) => vi(e, t)) : [];
}
function bi(e, t) {
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
function xi(e) {
	return [
		e.primary,
		e.secondary,
		e.id,
		...Object.values(e.search_labels).filter((e) => typeof e == "string")
	].filter((e) => typeof e == "string").map(_i);
}
function Si(e, t) {
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
		e.length >= 4 && t.some((t) => bi(e, t) <= 1) && (n = Math.max(n ?? 0, 65));
	}
	return n;
}
function Ci(e, t, n = ui) {
	let r = _i(t).split(/\s+/).filter(Boolean);
	return r.length === 0 ? [] : e.map((e) => {
		let t = xi(e), n = 0;
		for (let e of r) {
			let r = Si(e, t);
			if (r === void 0) return;
			n += r;
		}
		return {
			item: e,
			score: n
		};
	}).filter((e) => e !== void 0).sort((e, t) => t.score - e.score || e.item.primary.localeCompare(t.item.primary)).slice(0, n).map((e) => e.item);
}
var wi = !1;
async function Ti() {
	wi || (wi = !0, await ti());
}
function Ei() {
	return customElements.get("ha-generic-picker") !== void 0;
}
function Di(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0, n = Wi(e);
	return O`
    <div class="entity-picker"
      @picker-opened=${e.onEntityPickerOpened}
      @picker-closed=${e.onEntityPickerClosed}
    >
      <div class="entity-menu" ?open=${e.menuOpen} @click=${(e) => e.stopPropagation()}>
        <div class="entity-menu-top">
          <span class="entity-menu-title">${t ? pi(t) : ""}</span>
          <button class="entity-menu-close" @click=${e.onCloseMenu}>&#x2715;</button>
        </div>
        ${Ii(e)}
      </div>
      <div
        class="entity-picker-row"
        @dragover=${(t) => e.onSourceDragOver(void 0, t)}
        @drop=${(t) => e.onSourceDrop(void 0, t)}
      >
        ${e.hideEmptyPickerState ? ki(e) : Oi(e)}
        ${n.map((t) => Ni(t, e))}
      </div>
      ${e.hideEmptyPickerState ? Ai(e) : A}
      ${e.loading ? O`
            <div class="history-loading-indicator" role="status" aria-label=${V(e.hass, "loading")}>
              <span class="history-loading-spinner"></span>
              <span class="history-loading-text">${V(e.hass, "loading")}</span>
            </div>
          ` : A}
      ${Pi(e)}
    </div>
  `;
}
function Oi(e) {
	return O`
    <ha-generic-picker
      class="entity-trigger"
      .hass=${e.hass}
      .addButtonLabel=${V(e.hass, "add_target")}
      .value=${""}
      .getItems=${e.getItems}
      .emptyLabel=${""}
      .searchLabel=${V(e.hass, "search_entity")}
      .searchKeys=${di}
      @value-changed=${(t) => {
		let n = t.detail.value;
		n && e.onEntitySelected(n);
	}}
    ></ha-generic-picker>
  `;
}
function ki(e) {
	let t = V(e.hass, "add_target");
	return O`
    <ha-button
      class="entity-trigger entity-add-trigger"
      size="small"
      appearance="filled"
      @click=${e.onEntityPickerOpened}
    >
      <ha-icon icon="mdi:playlist-plus" slot="start"></ha-icon>
      ${t}
    </ha-button>
  `;
}
function Ai(e) {
	let t = V(e.hass, "search_entity"), n = e.entitySearch ?? "", r = n.trim() ? e.getAdditionalItems(n).filter(ji) : [];
	return O`
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
      ${r.length > 0 ? O`
        <div class="entity-select-results">
          ${r.map((t) => O`
            <button
              class="entity-select-result"
              @click=${() => {
		e.onEntitySearchChanged?.(""), e.onEntitySelected(t.id);
	}}
            >
              <span class="entity-browser-entry-label">${t.primary}</span>
              ${t.secondary ? O`<span class="entity-browser-entry-secondary">${t.secondary}</span>` : A}
            </button>
          `)}
        </div>
      ` : A}
    </div>
  `;
}
function ji(e) {
	return fi(e) && typeof e.id == "string" && typeof e.primary == "string";
}
function Mi(e) {
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
function Ni(e, t) {
	let n = Hi(e.id, t), r = Bi(e.id, t), i = e.kind === "entity_state", a = t.hass?.states[e.entityId], o = i ? "entity-source-chip" : "attr-source-chip", s = t.draggingSourceId === e.id, c = (e.kind === "entity_attribute" || e.kind === "entity_state") && r && !n, l, u, d = () => {
		l !== void 0 && (clearTimeout(l), l = void 0), u = void 0;
	}, f = (n) => {
		c && (n.preventDefault(), n.stopPropagation(), t.onSourceSettingsOpen(e, n));
	};
	return O`
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
        ${i && a ? O`<ha-icon .icon=${Mi(a)}></ha-icon>` : O`<ha-icon .icon=${Fi(e.valueType)}></ha-icon>`}
      </span>
      <span class="source-chip-label">${e.label}</span>
      ${n ? A : O`<button
            class="source-chip-remove"
            @click=${(n) => {
		n.preventDefault(), t.onSourceRemoved(e.id);
	}}
          >&#x2715;</button>`}
    </div>
  `;
}
function Pi(e) {
	return e.sourceSettingsSourceId ? O`
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
        <span>${V(e.hass, "attribute_unit")}</span>
        <input
          class="source-settings-input"
          .value=${e.sourceSettingsUnit ?? ""}
          placeholder=${V(e.hass, "attribute_unit_placeholder")}
          @input=${(t) => e.onSourceSettingsUnitChanged(t.target.value)}
        />
      </label>
      <label class="source-settings-field">
        <span>${V(e.hass, "group")}</span>
        <input
          class="source-settings-input"
          .value=${e.sourceSettingsGroup ?? ""}
          placeholder=${V(e.hass, "group_placeholder")}
          @input=${(t) => e.onSourceSettingsGroupChanged(t.target.value)}
        />
      </label>
      <button class="source-settings-close" @click=${e.onSourceSettingsClose}>
        ${V(e.hass, "done")}
      </button>
    </div>
  ` : A;
}
function Fi(e) {
	switch (e) {
		case "number": return "mdi:chart-line";
		case "string": return "mdi:text";
		case "boolean": return "mdi:toggle-switch";
		default: return "mdi:code-tags";
	}
}
function Ii(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0, n = e.path, r = t ? (() => {
		if (n.length === 0) return t.attributes;
		let e = t.attributes;
		for (let t of n) {
			if (!fi(e)) return;
			e = e[t];
		}
		return e;
	})() : void 0;
	return O`
    <div class="entity-browser">
      ${Li(t, e)}
      <div class="entity-browser-list">
        ${t ? Ri(t, n, fi(r) ? r : {}, e) : O`<div class="entity-browser-empty">${V(e.hass, "no_entity_selected")}</div>`}
      </div>
    </div>
  `;
}
function Li(e, t) {
	return !e || t.path.length === 0 ? O`` : O`
    <div class="entity-breadcrumb">
      ${t.path.map((e, n) => O`
          ${n > 0 ? O`<span class="entity-breadcrumb-sep">/</span>` : A}
          <button class="entity-crumb" @click=${() => t.onBreadcrumbClick(t.path.slice(0, n + 1))}>${e}</button>
        `)}
    </div>
  `;
}
function Ri(e, t, n, r) {
	let i = Object.entries(n).sort(([e], [t]) => e.localeCompare(t)), a = i.some(([n, r]) => fi(r) ? !0 : vt(r) !== void 0 && !!bt(e, [...t, n]));
	return O`
    <div class="entity-browser-entries">
      ${t.length > 0 ? O`
            <div class="entity-browser-back" @click=${() => r.onBreadcrumbClick(t.slice(0, -1))}>
              &#x2190; ${V(r.hass, "back")}
            </div>
          ` : O`
            ${qi(e, r)}
            ${a ? O`
                  <div class="entity-browser-section-title">${V(r.hass, "attributes")}</div>
                  ${zi(r)}
                ` : A}
          `}
      ${t.length === 0 && r.attributeSearch.trim() ? Xi(e, r) : i.map(([n, i]) => Ji(e, n, i, t, r))}
    </div>
  `;
}
function zi(e) {
	let t = V(e.hass, "search_attributes");
	return O`
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
function Bi(e, t) {
	return t.selectedSources.some((t) => t.id === e);
}
function Vi(e, t) {
	return (t.resolved?.series ?? []).some((t) => t.id === e);
}
function Hi(e, t) {
	return (t.resolved?.series ?? []).some((t) => t.id === e && t.forced !== !1);
}
function Ui(e) {
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
function Wi(e) {
	let t = [...(e.resolved?.series ?? []).filter((e) => e.forced === !1).map(Ui), ...e.selectedSources], n = /* @__PURE__ */ new Set();
	return t.filter((e) => n.has(e.id) ? !1 : (n.add(e.id), !0));
}
function Gi(e, t) {
	let n = t.selectedSources.some((t) => t.entityId === e), r = (t.resolved?.series ?? []).some((t) => t.entity === e);
	return n || r;
}
function Ki(e, t) {
	if (!e.entity_id.startsWith("climate.")) return !1;
	let n = t.selectedSources.some((t) => t.entityId.startsWith("climate.") && t.entityId !== e.entity_id), r = (t.resolved?.series ?? []).some((t) => t.entity.startsWith("climate.") && t.entity !== e.entity_id);
	return n || r;
}
function qi(e, t) {
	let n = yt(e);
	return n ? Ki(e, t) ? O`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : Bi(n.id, t) ? O`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onSourceRemoved(n.id)}>
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : Vi(n.id, t) ? Hi(n.id, t) ? O`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--forced">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : O`
        <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onSourceRemoved(n.id)}>
          <span class="entity-browser-entry-label">${e.entity_id}</span>
        </div>
      ` : Gi(e.entity_id, t) ? O`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : O`
    <div class="entity-browser-entity" @click=${() => t.onSourceAdded(n)}>
      <span class="entity-browser-entry-label">${e.entity_id}</span>
    </div>
  ` : A;
}
function Ji(e, t, n, r, i) {
	if (fi(n)) return O`
      <div class="entity-browser-entry" @click=${() => i.onBreadcrumbClick([...r, t])}>
        <span class="entity-browser-entry-label">${t}</span>
        <span class="entity-browser-entry-arrow">&#x203A;</span>
      </div>
    `;
	let a = vt(n), o = [...r, t];
	if (!a) return A;
	let s = bt(e, o);
	return s ? Yi({
		label: t,
		source: s,
		type: a,
		opts: i
	}) : A;
}
function Yi(e) {
	let { label: t, source: n, type: r, opts: i, secondary: a } = e, o = O`
    <span class="entity-browser-entry-text">
      <span class="entity-browser-entry-label">${t}</span>
      ${a ? O`<span class="entity-browser-entry-secondary">${a}</span>` : A}
    </span>
    <span class="entity-browser-entry-type">${r}</span>
  `;
	return Bi(n.id, i) ? O`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--removable" @click=${() => i.onSourceRemoved(n.id)}>
        ${o}
      </div>
    ` : Vi(n.id, i) ? Hi(n.id, i) ? O`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--forced">
        ${o}
      </div>
    ` : O`
        <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--removable" @click=${() => i.onSourceRemoved(n.id)}>
          ${o}
        </div>
      ` : O`
    <div class="entity-browser-entry" @click=${() => i.onSourceAdded(n)}>
      ${o}
    </div>
  `;
}
function Xi(e, t) {
	let n = Zi(e, e.attributes, t.attributeSearch), r = n.slice(0, li);
	return r.length === 0 ? O`<div class="entity-browser-search-empty">${V(t.hass, "no_matching_attributes")}</div>` : O`
    <div class="entity-browser-search-results">
      ${r.map((e) => Yi({
		label: e.key,
		source: e.source,
		type: e.valueType,
		opts: t,
		secondary: e.dottedPath
	}))}
      ${n.length > r.length ? O`<div class="entity-browser-search-count">${V(t.hass, "attribute_results_limited")}</div>` : A}
    </div>
  `;
}
function Zi(e, t, n) {
	let r = n.trim().toLocaleLowerCase();
	if (!r) return [];
	let i = [], a = (t, n, o) => {
		if (!(o > ci)) for (let [s, c] of Object.entries(t)) {
			let t = [...n, s];
			if (fi(c)) {
				a(c, t, o + 1);
				continue;
			}
			let l = vt(c), u = l ? bt(e, t) : void 0;
			!l || !u || Qi(t, c).includes(r) && i.push({
				key: s,
				dottedPath: t.join("."),
				valueType: l,
				source: u
			});
		}
	};
	return a(t, [], 0), i.sort((e, t) => {
		let n = $i(e, r), i = $i(t, r);
		return n === i ? e.dottedPath.length === t.dottedPath.length ? e.dottedPath.localeCompare(t.dottedPath) : e.dottedPath.length - t.dottedPath.length : n - i;
	});
}
function Qi(e, t) {
	let n = typeof t == "string" || typeof t == "number" || typeof t == "boolean" ? String(t) : "";
	return [
		...e,
		e.join("."),
		n
	].join(" ").toLocaleLowerCase();
}
function $i(e, t) {
	let n = e.key.toLocaleLowerCase(), r = e.dottedPath.toLocaleLowerCase();
	return n.startsWith(t) ? 0 : r.startsWith(t) ? 1 : n.includes(t) ? 2 : r.includes(t) ? 3 : 4;
}
function H(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
var ea = 60, ta = 1e3, na = 24, ra = 28, ia = 720, U = 1e3, aa = 18, oa = 44, sa = 12, ca = 14, la = .0025, ua = .012, da = 48, fa = .5, pa = 2, ma = 6, ha = 10, ga = 24, _a = 5, va = .1, ya = 10, ba = 1.15, xa = 48, Sa = .34, Ca = .72, wa = 720, Ta = 2, Ea = 46, Da = 22, Oa = [
	"current_temperature",
	"temperature",
	"hvac_action"
], ka = new Set(["current_temperature", "temperature"]), Aa = 5, ja = "haBetterHistory";
function Ma(e) {
	let t = 0;
	for (let n of e) n >= "0" && n <= "9" ? t += 6.2 : n === "." || n === "," ? t += 3.2 : n === "-" ? t += 4 : t += 6.2;
	return Math.ceil(t);
}
function Na(e, t = 0) {
	let n = Math.max(0, ...e.map((e) => Ma(e.value))), r = t > 0 ? t * 10 : 0, i = Math.max(n, r);
	return i > 0 ? `${i + Aa}px` : "0px";
}
function Pa(e) {
	return an(e);
}
function Fa(e) {
	let t = e?.trim();
	if (!t || !/^\d+$/.test(t)) return;
	let n = Number(t);
	return Number.isSafeInteger(n) && n > 0 ? n : void 0;
}
function Ia(e) {
	return e.group ?? e.scaleGroup;
}
function La(e) {
	return e.id.startsWith("attr:climate.") && (e.id.endsWith(":current_temperature") || e.id.endsWith(":temperature"));
}
function Ra(e) {
	return e.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && F(e.unit))?.unit ?? e.find((e) => e.unit && F(e.unit))?.unit;
}
function za(e) {
	let t = Ra(e);
	return t ? e.map((e) => {
		let n = I(e.unit, t) || e.unit === void 0 && La(e) ? t : e.unit;
		return n === e.unit ? e : {
			...e,
			unit: n
		};
	}) : e;
}
var W = class extends Fe {
	constructor(...e) {
		super(...e), this.hours = 24, this.showDatePicker = !1, this.showEntityPicker = !1, this.showImportButton = !1, this.showExportButton = !0, this.showTimeRangeSelector = !0, this.showLineModeButtons = !0, this.showLegend = !0, this.showTooltip = !0, this.showGrid = !0, this.showScale = !0, this.autoScaleSplit = !0, this.showControls = !0, this.debugPerformance = !1, this.toolsOpen = !1, this._hiddenSeriesIds = [], this._liveNow = Date.now(), this._datePickerReady = !1, this._entityComponentsReady = !1, this._attributeMenuOpen = !1, this._attributeSearch = "", this._path = [], this._selectedSources = [], this._removedConfigSourceIds = [], this._scalePreferences = {}, this._customEntityIds = [], this._entityPickerOpen = !1, this._datePickerOpen = !1, this._pendingAddedSources = [], this._data = new qt(this), this._tooltip = new br(this), this._browserHistoryInstanceId = `hbh-${Math.random().toString(36).slice(2)}`, this._prevClipX = /* @__PURE__ */ new Map(), this._prevStartTime = 0, this._prevEndTime = 0, this._prevContainerWidth = 0, this._wasLoading = !1, this._suppressLineAnimation = !1, this._suppressLiveRangeAnimation = !1, this._dragDropCommitted = !1, this._lastPickerOverlayOpen = !1, this._lastPointerDownInside = !1, this._syncingBrowserHistory = !1, this._selectingEntityForAttributeMenu = !1, this._importedSeriesMeta = /* @__PURE__ */ new Map(), this._importedDataActive = !1, this._containerWidth = 0, this._chartSurfaceHeight = 0, this._chartSurfaceConstrained = !1, this._lastContentHeight = 0, this._graphTouchPointers = /* @__PURE__ */ new Map(), this._handleBrowserPopState = (e) => {
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
		}, this._lastFetchKey = "", this._lastFetchSources = [], this._lastHassResolveTime = 0, this._getEntityPickerItems = () => yi(this.hass), this._getAdditionalEntityPickerItems = (e) => {
			if (!this.hass || !e?.trim()) return [];
			let t = new Set(this._pickerEntities().map((e) => e.entity_id));
			return Ci(yi(this.hass, Object.values(this.hass.states).filter((e) => e !== void 0).filter((e) => !t.has(e.entity_id))), e);
		}, this._handleDocumentPointerDown = (e) => {
			this._lastPointerDownInside = this._isEventInsideAttributeOverlay(e), !(!this._attributeMenuOpen && !this._sourceSettingsSourceId) && (this._lastPointerDownInside || (e.stopPropagation(), e.stopImmediatePropagation()));
		}, this._handleDocumentClick = (e) => {
			if (!this._attributeMenuOpen && !this._sourceSettingsSourceId) {
				this._lastPointerDownInside = !1;
				return;
			}
			let t = this._lastPointerDownInside;
			if (this._lastPointerDownInside = !1, !t && !this._isEventInsideAttributeOverlay(e)) {
				if (this._sourceSettingsSourceId) {
					e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this._sourceSettingsSourceId = void 0;
					return;
				}
				e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this._closeAttributeMenu();
			}
		};
	}
	static {
		this.styles = Qr;
	}
	connectedCallback() {
		super.connectedCallback(), ti(), document.addEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.addEventListener("click", this._handleDocumentClick, !0), window.addEventListener("popstate", this._handleBrowserPopState), this._resizeObserver = new ResizeObserver((e) => {
			for (let t of e) if (t.target === this) {
				let e = Math.round(t.contentRect.width);
				e !== this._containerWidth && (this._containerWidth = e);
			} else t.target === this._observedChartSurface && this._syncChartSurfaceSize(t.contentRect.height);
		}), this._resizeObserver.observe(this);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), document.removeEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.removeEventListener("click", this._handleDocumentClick, !0), window.removeEventListener("popstate", this._handleBrowserPopState), this._resizeObserver?.disconnect(), this._resizeObserver = void 0, this._surfaceHeaderObserver?.disconnect(), this._surfaceHeaderObserver = void 0, this._resetGraphGestureState(), this._sourceAddBatchTimer !== void 0 && (clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = void 0), this._stopLiveClock();
	}
	_maxXTicks() {
		if (this._containerWidth <= 0) return 12;
		let e = Math.max(3, Math.floor(this._containerWidth * 640 / (720 * 50)));
		return this._chartSurfaceHeight > 0 && this._chartSurfaceHeight < 120 ? Math.max(3, Math.min(e, Math.floor(this._chartSurfaceHeight / 24))) : e;
	}
	_observeChartSurface() {
		let e = this.renderRoot.querySelector(".chart-surface");
		e !== this._observedChartSurface && (this._observedChartSurface && this._resizeObserver?.unobserve(this._observedChartSurface), this._observedChartSurface = e ?? void 0, e ? (this._resizeObserver?.observe(e), this._syncChartSurfaceSize(e.getBoundingClientRect().height)) : this._chartSurfaceHeight !== 0 && (this._chartSurfaceHeight = 0, this._chartSurfaceConstrained = !1));
	}
	_syncChartSurfaceSize(e) {
		let t = Math.round(e), n = this._observedChartSurface?.querySelector(".chart-graphs"), r = n ? Math.round(n.offsetHeight) : 0;
		if (this._measureGraphLayout(n ?? void 0, r), this._lastContentHeight > 0 && r > 0 && r === this._lastContentHeight && Math.abs(t - this._chartSurfaceHeight) > Ta) return;
		this._lastContentHeight = r;
		let i = r < t - Ta || t < r - Ta, a = t < this._chartSurfaceHeight - Ta, o = this._graphGroupRenderCache?.graphHeight ?? 180, s = this._chartSurfaceConstrained && o !== 180;
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
		let n = t.querySelector(".chart-graphs"), r = Math.round(t.getBoundingClientRect().height), i = n ? Math.round(n.offsetHeight) : 0, a = i > r - Ta, o = Math.max(0, (r - i) / 2), s = e + 10 - o, c = t.style.getPropertyValue("--better-history-surface-header-offset"), l = c !== "";
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
			let e = this._effectiveEndDate().getTime(), t = !this._viewEnd || Math.abs(this._viewEnd.getTime() - e) <= ta * 2, n = Date.now();
			this._liveNow = n, t && (this._viewEnd = new Date(n));
		}, ta);
	}
	_stopLiveClock() {
		this._liveNowTimer !== void 0 && (clearInterval(this._liveNowTimer), this._liveNowTimer = void 0);
	}
	_browserHistoryEntry(e = window.history.state) {
		let t = typeof e == "object" && e ? e[ja] : void 0;
		if (typeof t != "object" || !t) return;
		let n = t;
		if (n.instanceId === this._browserHistoryInstanceId && !(n.layer !== "date-picker" && n.layer !== "entity-picker" && n.layer !== "attribute-picker")) return {
			instanceId: n.instanceId,
			layer: n.layer
		};
	}
	_browserHistoryState(e) {
		return {
			...typeof window.history.state == "object" && window.history.state !== null ? window.history.state : {},
			[ja]: {
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
		this._datePickerOpen = e === "date-picker", this._entityPickerOpen = e === "entity-picker", this._attributeMenuOpen = e === "attribute-picker", e !== "attribute-picker" && (this._attributeSearch = "");
	}
	_closeBrowserHistoryOverlays() {
		this._datePickerOpen && this._closeDatePickerOverlay(), (this._attributeMenuOpen || this._entityPickerOpen) && this._closePickerOverlay();
	}
	_closePickerOverlay() {
		this._attributeMenuOpen = !1, this._entityPickerOpen = !1, this._attributeSearch = "", this._sourceSettingsSourceId = void 0;
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
		if (this._resolved && !this._importedDataActive) for (let n of this._activeResolvedSeries()) t.has(n.id) || (t.add(n.id), e.push(Tr(n)));
		for (let n of this._selectedSources) for (let r of this._expandedSelectedSources(n)) t.has(r.id) || (t.add(r.id), e.push(r));
		return e;
	}
	_selectedSourcesForDisplay() {
		let e = /* @__PURE__ */ new Set(), t = [];
		for (let n of [...this._selectedSources, ...this._pendingAddedSources]) e.has(n.id) || (e.add(n.id), t.push(n));
		return t;
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
		return this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && F(e.unit))?.unit;
	}
	willUpdate(e) {
		this._data.debugPerformance = this.debugPerformance || this.config?.debugPerformance === !0;
		let t = this._usesRollingRelativeRange(), n = this._effectiveDateRange(), r = n.start.getTime(), i = n.end.getTime(), a = this._rangeExtendsFuture();
		this._syncLiveClock(), e.has("hass") && (a || t) && this._data.updateLivePoints(this.hass, this._lastFetchSources, new Date(r), new Date(i));
		let o = r !== this._prevStartTime || i !== this._prevEndTime, s = this._containerWidth !== this._prevContainerWidth, c = e.has("_rangeStart") || e.has("_rangeEnd") || e.has("startDate") || e.has("endDate") || e.has("config") || e.has("hours"), l = (a || t) && o && !s && !c;
		this._suppressLiveRangeAnimation = l, (o || s) && (l || this._prevClipX.clear(), this._prevStartTime = r, this._prevEndTime = i, this._prevContainerWidth = this._containerWidth), this._data.loading && this._data.series.length === 0 && this._prevClipX.clear();
		let u = /* @__PURE__ */ "_rangeStart._rangeEnd._selectedSources._removedConfigSourceIds._scalePreferences.hass.config.entities.hours.startDate.endDate.showDatePicker.showEntityPicker.showLegend.showTooltip.showGrid.showScale.autoScaleSplit.width.height.lineMode.lineWidth.backgroundColor.graphTitle.titleFontFamily.titleFontSize.titleColor.language.debugPerformance.attributeUnits._runtimeLineMode".split(".");
		if (u.some((t) => e.has(t))) {
			let r = !u.some((t) => t !== "hass" && e.has(t));
			if ((e.has("config") || e.has("entities")) && (this._importedDataActive = !1, this._importedSeriesMeta.clear()), r) {
				let e = Math.floor(Date.now() / 1e3) * 1e3;
				if ((a || t) && this._lastFetchKey && (this._lastHassResolveTime = e, !t) || !t && e === this._lastHassResolveTime && this._lastFetchKey) return;
				this._lastHassResolveTime = e;
			}
			let i = Yr({
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
			let o = this._fetchSources(), s = o.map((e) => e.id).sort().join("|"), c = t ? `${s}|rolling|${this._relativeRangeMs()}` : `${s}|${i.startDate.getTime()}|${i.endDate.getTime()}`;
			if (c !== this._lastFetchKey) {
				let e = s === this._lastFetchKey.split("|").slice(0, -2).join("|") && this._lastFetchKey !== "";
				if (this._lastFetchSources.length > 0 && !e) {
					let e = new Set(this._lastFetchSources.map((e) => e.id)), t = new Set(o.map((e) => e.id)), n = o.filter((t) => !e.has(t.id)), r = this._lastFetchSources.filter((e) => !t.has(e.id)).map((e) => e.id);
					n.length > 0 && r.length === 0 ? (this._lastFetchKey = c, this._lastFetchSources = o, this._data.addSources(this.hass, n, i.startDate, i.endDate)) : r.length > 0 && n.length === 0 ? (this._lastFetchKey = c, this._lastFetchSources = o, this._data.removeSources(r)) : (this._lastFetchKey = c, this._lastFetchSources = o, this._data.fetch(this.hass, o, i.startDate, i.endDate));
				} else this._lastFetchKey = c, this._lastFetchSources = o, this._data.fetch(this.hass, o, i.startDate, i.endDate);
			}
			i.showDatePicker && !this._datePickerReady && oi().then(() => {
				this._datePickerReady = ai(), this.requestUpdate();
			}), i.showEntityPicker && !this._entityComponentsReady && Ti().then(() => {
				this._entityComponentsReady = Ei(), this.requestUpdate();
			});
		}
	}
	updated(e) {
		this._observeChartSurface(), this._observeSurfaceHeader(), e.has("_attributeMenuOpen") && this._attributeMenuOpen && this._positionEntityMenu(), e.has("_sourceSettingsSourceId") && this._sourceSettingsSourceId && this._positionSourceSettingsPopover(), (e.has("_attributeMenuOpen") || e.has("_entityPickerOpen") || e.has("_datePickerOpen") || e.has("_sourceSettingsSourceId")) && this._emitPickerOverlayState(), this._emitGraphVisibilityState(), this._animateClipPaths(), this._data.clearChangedSourceIds(), this._wasLoading = this._data.loading, this._suppressLiveRangeAnimation = !1;
	}
	_emitPickerOverlayState() {
		let e = this._datePickerOpen || this._attributeMenuOpen || this._entityPickerOpen || this._sourceSettingsSourceId !== void 0;
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
		let r = Ia(e);
		if (r) {
			let e = Fa(r);
			if (e !== void 0) {
				let r = (n ?? this._scaleGraphKeys(t))[e - 1];
				if (r) return r;
			}
			return `group:${r}`;
		}
		let i = e.entityId.startsWith("climate.") && e.path?.length === 1 && ka.has(e.path[0]);
		if (e.unit) {
			let n = t.find((t) => t.valueType === "number" && (t.unit === e.unit || I(t.unit, e.unit)));
			if (n) return n.scaleGroupKey;
			let r = this._resolved?.series.find((t) => t.valueType === "number" && (t.unit === e.unit || I(t.unit, e.unit)));
			if (r) return r.scaleGroupKey;
			let i = this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature");
			if (i && F(e.unit)) return i.scaleGroupKey;
			let a = t.find((e) => e.scaleGroupKey === "group:temperature");
			if (a && F(e.unit)) return a.scaleGroupKey;
		}
		if (i) {
			let e = t.find((e) => e.valueType === "number" && e.unit !== void 0 && F(e.unit));
			return e ? e.scaleGroupKey : "group:temperature";
		}
		return e.unit ? `unit:${e.unit}` : `series:${e.id}`;
	}
	_scaleGraphKeys(e) {
		return [...new Set(e.filter((e) => e.valueType === "number" || e.valueType === "boolean").map((e) => e.valueType === "boolean" ? "group:boolean" : e.scaleGroupKey))];
	}
	_usesScaleGraphAlias(e) {
		return e.valueType === "number" && Fa(Ia(e)) !== void 0;
	}
	_renderSeriesFromSource(e, t, n, r, i = e.unit) {
		let a = e.entityId.startsWith("climate.") && e.path?.length === 1 ? e.path[0] : void 0;
		return {
			id: e.id,
			label: e.label,
			color: this._importedSeriesMeta.get(e.id)?.color ?? (a ? Yt[a] : void 0) ?? Qt(r),
			unit: i,
			scaleGroupKey: n,
			scaleMode: "auto",
			scalePreference: this._effectiveScalePreference(e.id, e.scalePreference ?? this._importedSeriesMeta.get(e.id)?.scalePreference),
			lineMode: this._runtimeLineMode ?? this._importedSeriesMeta.get(e.id)?.lineMode ?? this._defaultLineMode(),
			lineWidth: this._defaultLineWidth(),
			valueType: e.valueType,
			points: t?.points ?? []
		};
	}
	_unitForScaleGroup(e, t, n) {
		if (!e.unit || !F(e.unit)) return e.unit;
		let r = n.find((n) => n.scaleGroupKey === t && I(n.unit, e.unit));
		return r?.unit ? r.unit : this._activeResolvedSeries().find((n) => n.scaleGroupKey === t && I(n.unit, e.unit))?.unit ?? e.unit;
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
		return this._allSeriesHaveExplicitLineMode() ? !1 : this.config?.showLineModeButtons !== !1 && this.showLineModeButtons;
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
		return za(e);
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
			e.valueType
		].join("~")) ?? [], ...this._selectedSourcesForDisplay().flatMap((e) => this._expandedSelectedSources(e)).map((e) => [
			e.id,
			e.label,
			e.kind,
			e.unit ?? "",
			Ia(e) ?? "",
			this._effectiveScalePreference(e.id, e.scalePreference),
			e.valueType,
			this._defaultLineMode(),
			this._defaultLineWidth()
		].join("~"))].join("|");
	}
	_chartData() {
		let e = this._hiddenSeriesIds.join("|"), t = this._chartSourceKey(), n = this._chartRenderCache, r = this._effectiveViewRange(), i = r.start.getTime(), a = r.end.getTime(), o = this._containerWidth, s = !this._data.loading, c = this._resolved?.autoScaleSplit ?? !0;
		if (n && n.seriesRef === this._data.series && n.sourceKey === t && n.hiddenKey === e && n.startTime === i && n.endTime === a && n.extendStairToEnd === s && n.autoScaleSplit === c && n.containerWidth === o) return n.data;
		let l = this._maxXTicks(), u = this._buildRenderSeries(), d = u.filter((e) => !this._hiddenSeriesIds.includes(e.id)), f = {
			start: i,
			end: Math.max(a, i + 1)
		}, p = this._data.debugPerformance, m = p ? N() : 0, h = fr(u, d, f, this._resolved?.disableClimateOverlay ?? !1, l, s, c), g = p ? N() - m : 0;
		return p && P(p, "chart.build_data", {
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
		let i = yr(e, t, n);
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
		let t = this._graphCountFor(e), n = this._measuredGraphLayout?.graphCount === t ? this._measuredGraphLayout.overheadHeight : void 0, r = this._estimatedGraphOverhead(e, t), i = n ?? r, a = this._chartSurfaceHeight - i, o = this._containerWidth > 0 ? this._containerWidth * 640 / 720 : 640, s = Math.max(180, Math.min(Math.floor(o * Sa), Math.floor(this._chartSurfaceHeight / t * Ca), wa)), c = Math.floor(Math.max(0, a) / t);
		return Math.max(xa, Math.min(c, s));
	}
	_graphCountFor(e) {
		return Math.max(new Set(e.numericScales.map((e) => e.graphKey)).size, +!!e.allSeries.some((e) => e.valueType !== "number" && e.valueType !== "boolean"), 1);
	}
	_estimatedGraphOverhead(e, t) {
		let n = e.allSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").length, r = this._resolved?.showLegend ?? !0 ? t * 30 : 0;
		return t * 62 + r + (n > 0 ? 10 + n * 14 : 0);
	}
	_renderGraphGroup(e, t) {
		let n = this._resolved?.showLegend ?? !0, r = this._resolved?.showGrid ?? !0, i = this._resolved?.showScale ?? !0, a = e.series.map((e) => e.id).join("|"), o = i ? this._axisSeriesDots(e, "left") : [], s = i ? this._axisSeriesDots(e, "right") : [], c = o.length || +!!this._draggingAxisSeriesId, l = s.length || +!!this._draggingAxisSeriesId, u = i ? Na(e.yLabels, c) : "0px", d = i ? Na(e.rightYLabels, l) : "0px", f = 28 + e.graphHeight, p = f + 3, m = f + 16 + 6;
		return O`
      <div class="graph-section">
        <div class="graph-row" style=${`--axis-label-gap:${Aa}px;--axis-left-gutter:${u};--axis-right-gutter:${d};`}>
          <div
            class="axis-labels axis-labels--left"
            style="height:${e.canvasHeight}px"
            @dragover=${(e) => this._onAxisDragOver("left", e)}
            @dragleave=${(e) => this._onAxisDragLeave("left", e)}
            @drop=${(t) => this._onAxisDrop(e, "left", t)}
          >
            ${i ? this._renderAxisColorDots(e, o, "left") : A}
            ${i ? e.yLabels.map((e) => O`<span class="y-axis-label y-axis-label--left" style="top:${e.y.toFixed(1)}px;">${e.value}</span>`) : A}
          </div>
          <div
            class="graph-canvas"
            data-series-ids=${a}
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
              ${r ? e.xLabels.map((e) => k`
                      <line class="grid-line grid-line--vertical" x1=${e.x.toFixed(1)} y1=${18} x2=${e.x.toFixed(1)} y2=${f}></line>
                    `) : A}
              ${r ? e.yLabels.map((e) => k`
                      <line class="grid-line grid-line--horizontal" x1=${40} y1=${e.y.toFixed(1)} x2=${680} y2=${e.y.toFixed(1)}></line>
                    `) : A}
              <defs>
                ${e.lines.map((n) => {
			let r = this._lineDomKey(n.id, t), i = this._safeLineDomId(r), a = `clip-${i}`, o = `rect-${i}`, s = this._lineTargetX(n);
			return k`
                    <clipPath id=${a}>
                      <rect id=${o} x="0" y="0" width=${this._shouldAnimateLine(n, r, s) ? this._prevClipX.get(r) ?? 0 : s} height=${e.svgHeight}></rect>
                    </clipPath>
                  `;
		})}
              </defs>
              ${e.heatingAreas.map((e) => k`<polygon class="climate-heating-area" points=${e.points}></polygon>`)}
              ${e.columns.map((e) => k`<rect class="column" x=${e.x.toFixed(1)} y=${e.y.toFixed(1)} width=${e.width.toFixed(1)} height=${e.height.toFixed(1)} fill=${e.fill}></rect>`)}
              ${e.lines.map((e) => {
			let n = this._lineDomKey(e.id, t), r = `clip-${this._safeLineDomId(n)}`, i = this._lineTargetX(e), a = this._shouldAnimateLine(e, n, i);
			return k`<polyline class="line" style=${`--better-history-line-width:${e.lineWidth};`} clip-path="url(#${r})" data-line-id=${e.id} data-line-dom-key=${n} data-animate-clip=${a ? "true" : A} data-target-x=${i} points=${e.points} stroke=${e.color}></polyline>`;
		})}
              ${e.segments.map((e) => k`<rect class="segment" x=${e.x} y=${e.y} width=${e.width} height="9" fill=${e.fill}></rect>`)}
              ${e.series.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").map((e, t) => k`<rect class="segment-border" x=${40} y=${m + t * 14} width=${640} height="9" fill="none" stroke=${e.color}></rect>`)}
              ${i ? k`<line class="axis" x1=${40} y1=${18} x2=${40} y2=${f}></line>` : A}
              ${i && e.rightYLabels.length > 0 ? k`<line class="axis" x1=${680} y1=${18} x2=${680} y2=${f}></line>` : A}
              ${i ? k`<line class="axis" x1=${40} y1=${f} x2=${680} y2=${f}></line>` : A}
              ${i && e.scale ? e.yLabels.map((e) => k`
                      <line class="axis tick" x1=${40} y1=${e.y.toFixed(1)} x2=${44} y2=${e.y.toFixed(1)}></line>
                    `) : A}
              ${i ? e.rightYLabels.map((e) => k`
                      <line class="axis tick" x1=${676} y1=${e.y.toFixed(1)} x2=${680} y2=${e.y.toFixed(1)}></line>
                    `) : A}
            </svg>
            ${i ? e.xLabels.map((e) => {
			let t = ((e.x - 40) / 640 * 100).toFixed(2);
			return O`<span class="x-axis-label ${e.bold ? "x-axis-label--bold" : ""}" style="left:${t}%;top:${p}px;">${e.label}</span>`;
		}) : A}
          </div>
          <div
            class="axis-labels axis-labels--right"
            style="height:${e.canvasHeight}px"
            @dragover=${(e) => this._onAxisDragOver("right", e)}
            @dragleave=${(e) => this._onAxisDragLeave("right", e)}
            @drop=${(t) => this._onAxisDrop(e, "right", t)}
          >
            ${i ? this._renderAxisColorDots(e, s, "right") : A}
            ${i ? e.rightYLabels.map((e) => O`<span class="y-axis-label y-axis-label--right" style="top:${e.y.toFixed(1)}px;">${e.value}</span>`) : A}
          </div>
        </div>
        ${n && e.allSeries.length > 0 ? O`
            <div class="graph-legend">
              ${e.allSeries.map((e) => O`
                  <button class="legend-item" ?hidden-series=${this._hiddenSeriesIds.includes(e.id)} @click=${() => this._toggleSeries(e.id)}>
                    <span class="swatch" style=${e.valueType === "string" ? `background:color-mix(in srgb,${e.color} 30%,transparent);border:1px solid ${e.color};` : `background:${e.color};`}></span>
                    <span class="legend-label">${e.label}</span>
                  </button>
                `)}
            </div>
          ` : A}
      </div>
    `;
	}
	_axisSeriesDots(e, t) {
		let n = new Set(e.scales.filter((e) => e.axis === t).flatMap((e) => [...e.ids]));
		return e.series.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && n.has(e.id));
	}
	_renderAxisColorDots(e, t, n) {
		let r = this._draggingAxisSeriesId;
		if (t.length === 0 && !r) return A;
		let i = this._axisDropTarget === n && r ? this._canDropAxisSeries(e, r, n) ? "valid" : "invalid" : void 0, a = i === "valid" && r ? e.series.find((e) => e.id === r)?.color : void 0;
		return O`
      <span
        class="axis-color-dots axis-color-dots--${n}"
        style="top:${1}px;"
        data-drop-state=${i ?? A}
        @dragover=${(e) => this._onAxisDragOver(n, e)}
        @dragleave=${() => this._onAxisDragLeave(n)}
        @drop=${(t) => this._onAxisDrop(e, n, t)}
        @touchstart=${(t) => this._onAxisDotsTouchStart(e, n, t)}
      >
        ${a && n === "left" ? O`<span class="axis-drop-preview"><span class="axis-color-dot" style="background:${a};"></span></span>` : A}
        ${t.map((t) => {
			let r = this._canDragAxisSeries(e, t.id, n);
			return O`
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
        ${a && n === "right" ? O`<span class="axis-drop-preview"><span class="axis-color-dot" style="background:${a};"></span></span>` : A}
      </span>
    `;
	}
	_axisDraggableSeries(e) {
		let t = e.series.filter((e) => e.valueType === "number" || e.valueType === "boolean"), n = new Set(t.map((e) => Pa(e.unit)));
		return t.length >= 2 && n.size === 1 ? t : [];
	}
	_canDragAxisSeries(e, t, n) {
		return this._canDropAxisSeries(e, t, n === "left" ? "right" : "left");
	}
	_canDropAxisSeries(e, t, n) {
		let r = this._axisDraggableSeries(e).find((e) => e.id === t);
		if (!r) return !1;
		let i = e.scales.find((e) => e.axis === n);
		return i ? e.series.filter((e) => i.ids.has(e.id)).every((e) => Pa(e.unit) === Pa(r.unit)) : n === "right";
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
		e.style.left = `${t.clientX}px`, e.style.top = `${t.clientY - Ea}px`;
	}
	_touchDropTarget(e, t, n) {
		let r = e.querySelector(".axis-labels--left"), i = e.querySelector(".axis-labels--right");
		if (r && this._isTouchInsideAxisDropZone(r, t, n)) return "left";
		if (i && this._isTouchInsideAxisDropZone(i, t, n)) return "right";
	}
	_isTouchInsideAxisDropZone(e, t, n) {
		let r = e.getBoundingClientRect();
		return t >= r.left - Da && t <= r.right + Da && n >= r.top && n <= r.bottom;
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
			return O`<div class="error">${V(this.hass, e ? "error_timeout" : "error")}</div>`;
		}
		if (!this._resolved || this._resolved.series.length === 0 && this._selectedSourcesForDisplay().length === 0) return this._queueGraphVisible(!1), A;
		let e = this._chartData(), t = e.visibleSeries.some((e) => e.points.length > 0), n = this._resolved.showTooltip, r = this._graphGroups(e), i = r.length > 0 && (t || this._data.loading), a = this._isViewRangeZoomed();
		this._queueGraphVisible(i), this._suppressLineAnimation = this._wasLoading && !this._data.loading;
		let o = r.reduce((e, t) => e + t.canvasHeight, 0);
		if (t && n) {
			let t = r.flatMap((e) => e.allSeries.map((e) => ({
				id: e.id,
				label: e.label,
				color: e.color
			})));
			this._tooltip.sync(t, this._data.series, this._hiddenSeriesIds, o, e.timeBounds);
		}
		return O`
      <div class="chart-surface">
        ${i ? O`
              <div class="chart-graphs"
                ?zoomed=${a}
                @pointermove=${n ? (e) => this._tooltip.handlePointerMove(e) : A}
                @pointerleave=${n ? () => this._tooltip.handlePointerLeave() : A}
              >
                ${r.map((e, t) => this._renderGraphGroup(e, t))}
                ${n ? this._tooltip.renderTooltip() : A}
              </div>` : this._data.loading ? A : O`<div class="empty">${V(this.hass, "empty")}</div>`}
      </div>
    `;
	}
	_renderEntityPickerUI() {
		return !this._resolved?.showEntityPicker || !this._entityComponentsReady ? A : Di({
			hass: this.hass,
			menuOpen: this._attributeMenuOpen,
			entityPickerOpen: this._entityPickerOpen,
			selectedEntityId: this._selectedEntityId,
			path: this._path,
			selectedSources: this._selectedSourcesForDisplay(),
			draggingSourceId: this._draggingSourceId,
			resolved: this._activeResolvedConfig(),
			loading: this._data.loading,
			attributeSearch: this._attributeSearch,
			getItems: this._getEntityPickerItems,
			getAdditionalItems: this._getAdditionalEntityPickerItems,
			onEntityPickerOpened: () => this._onEntityPickerOpened(),
			onEntityPickerClosed: () => this._onEntityPickerClosed(),
			onEntitySelected: (e) => this._onEntitySelected(e),
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
			sourceSettingsGroup: this._sourceSettingsSource() ? Ia(this._sourceSettingsSource()) : void 0,
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
		return e.deltaMode === 0 && Math.abs(e.deltaY) < da;
	}
	_onGraphWheel(e) {
		if (!(e.ctrlKey || e.metaKey)) return;
		let t = e.currentTarget;
		if (!(t instanceof HTMLElement)) return;
		let n = t.getBoundingClientRect();
		if (n.width <= 0) return;
		e.preventDefault(), e.stopPropagation();
		let r = (e.clientX - n.left) / n.width, i = this._isTrackpadPinchWheel(e), a = i ? ua : la, o = Math.exp(this._wheelDeltaPx(e) * a);
		this._zoomGraphViewAt(r, o, n.width, void 0, void 0, i ? fa : void 0, i ? pa : void 0);
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
			if (Math.max(Math.abs(n), Math.abs(r)) < ma) return;
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
			let e = Math.max(l, u), n = Math.max(e, d), r = Math.max(s, t.startDistanceX) >= ga;
			if (n < ha) return;
			if (d > e * ba) {
				t.mode = "scroll";
				return;
			}
			if (r && l >= ha && l >= u * 1.35) t.mode = "pinch";
			else {
				t.mode = "scroll";
				return;
			}
			this._tooltip.handlePointerLeave();
		}
		if (t.mode !== "scroll" && (e.preventDefault(), e.stopPropagation(), t.mode === "pinch")) {
			let e = (Math.max(1, s) - t.startDistanceX) / t.width;
			this._zoomGraphViewAt(t.anchorPercent, Math.exp(-e * _a), t.width, t.startViewStart, t.startViewEnd, va, ya);
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
		return window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? ra : na;
	}
	_rangeThumbHalfWidthPx() {
		return (window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? ca : sa) / 2;
	}
	_rangeThumbHitWidthPx() {
		return window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? oa : aa;
	}
	_minViewSpanMs(e = this._rangeSliderTrackWidthPx()) {
		let { span: t } = this._loadedRangeMs(), n = this._minViewRangeGapPx(), r = Math.max(e ?? ia, n), i = Math.ceil(t * n / r), a = Math.min(6e4, Math.max(1, Math.floor(t / 1e3)));
		return Math.min(t, Math.max(1, i, a));
	}
	_minViewRangeStep(e) {
		let t = this._loadedRangeMs();
		return Math.max(1, Math.ceil(this._minViewSpanMs(e) / t.span * U));
	}
	_percentFromRangePointer(e, t) {
		return Math.round(Math.max(0, Math.min(t.width, e.clientX - t.left)) / t.width * U);
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
		return new Date(t + Math.max(0, Math.min(U, e)) / U * (n - t));
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
		e === "start" ? (c = Math.min(Math.max(t, 0), o - s), r && (r.value = String(c)), this._setViewRangeMs(this._dateFromRangePercent(c).getTime(), i.end.getTime(), n)) : (c = Math.max(Math.min(t, U), a + s), r && (r.value = String(c)), this._setViewRangeMs(i.start.getTime(), this._dateFromRangePercent(c).getTime(), n));
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
		let i = this._effectiveViewRange(), a = this._rangePercent(i.start, i.start), o = this._rangePercent(i.end, i.end), s = a / U * r.width, c = o / U * r.width, l = Math.max(0, Math.min(r.width, e.clientX - r.left)), u = this._percentFromRangePointer(e, r), d = this._rangeThumbHalfWidthPx(), f = this._rangeThumbHitWidthPx(), p = s <= f, m = c >= r.width - f, h = Math.max(0, s - f), g = Math.min(r.width, s + (p ? f : d)), _ = Math.max(0, c - (m ? f : d)), v = Math.min(r.width, c + f);
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
		this._importedSeriesMeta = t.meta, this._importedDataActive = !0, this._selectedSources = t.series.map((e) => e.source), this._removedConfigSourceIds = [], this._rangeStart = i, this._rangeEnd = a, this._viewStart = n, this._viewEnd = r, this._hiddenSeriesIds = [], this._prevClipX.clear(), this._chartRenderCache = void 0, this._graphGroupRenderCache = void 0;
		let o = this._selectedSources.map((e) => e.id).sort().join("|");
		this._lastFetchKey = `${o}|${i.getTime()}|${a.getTime()}`, this._lastFetchSources = [...this._selectedSources], this._data.setImportedSeries(t.series, i, a), this.dispatchEvent(new CustomEvent("data-imported", {
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
				scalePreference: e.scalePreference === "primary" || e.scalePreference === "secondary" ? e.scalePreference : void 0
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
		if (!this.toolsOpen || !this._resolved || this._lastGraphVisible === !1) return A;
		let e = this._effectiveViewRange(), t = this._rangePercent(e.start, this._resolved.startDate), n = this._rangePercent(e.end, this._resolved.endDate), r = this._defaultLineMode(), i = this._showTimeRangeSelector(), a = this._showLineModeButtons(), o = this._showExportButton(), s = this._showImportButton();
		return !i && !a && !o && !s ? A : O`
      <div class="tools-panel">
        <div class="tool-range">
          <div class="tool-range-row">
            ${i ? O`
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
                  title=${V(this.hass, "reset_zoom")}
                  aria-label=${V(this.hass, "reset_zoom")}
                  @click=${() => this._resetViewRange()}
                >
                  <ha-icon .icon=${"mdi:restore"}></ha-icon>
                </button>
              ` : A}
            <div class="tool-actions">
              ${a ? O`
                <div class="mode-switch" role="group" aria-label=${V(this.hass, "line_mode")}>
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
		].map(([e, t, n]) => O`
                    <button
                      class="mode-button"
                      ?active=${r === e}
                      title=${V(this.hass, n)}
                      @click=${() => this._setRuntimeLineMode(e)}
                    >
                      <ha-icon .icon=${t}></ha-icon>
                    </button>
                  `)}
                </div>
              ` : A}
              ${o ? O`
                  <button
                    class="tool-action-button"
                    title=${V(this.hass, "export_data")}
                    aria-label=${V(this.hass, "export_data")}
                    @click=${() => this._exportData()}
                  >
                    <ha-icon .icon=${"mdi:download"}></ha-icon>
                  </button>
                ` : A}
              ${s ? O`
                  <button
                    class="tool-action-button"
                    title=${V(this.hass, "import_data")}
                    aria-label=${V(this.hass, "import_data")}
                    ?disabled=${this._hasForcedConfigSeries()}
                    @click=${() => this._importData()}
                  >
                    <ha-icon .icon=${"mdi:upload"}></ha-icon>
                  </button>
                ` : A}
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
		e === void 0 || this._lastGraphVisible === e || (this._lastGraphVisible = e, this.dispatchEvent(new CustomEvent("graph-visibility-changed", {
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
		return O`
      <div class="root" style="width:${e};background:${t};">
        ${n ? O`<div class="graph-title" style=${r}>${n}</div>` : A}
        <div class="chart-layout">
          ${a ? O`<div class="surface-header">
                ${i ? O`<div class="controls-bar">
                      ${this._renderDatePicker()}
                      ${this._renderEntityPickerUI()}
                    </div>` : A}
                ${this._renderToolsPanel()}
              </div>` : A}
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
		return !this._resolved?.showDatePicker || !this._datePickerReady ? A : si({
			hass: this.hass,
			startDate: this._resolved.startDate,
			endDate: this._resolved.endDate,
			onChange: (e, t) => this._onDateRangeChanged(e, t),
			onOpen: () => this._onDatePickerOpened(),
			onClose: () => this._onDatePickerClosed()
		});
	}
	_positionEntityMenu() {
		let e = this.renderRoot?.querySelector(".entity-trigger"), t = this.renderRoot?.querySelector(".entity-menu");
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
	_closeAttributeMenu() {
		this._closeBrowserHistoryLayer("attribute-picker", () => this._closePickerOverlay());
	}
	_onEntitySelected(e) {
		this._selectingEntityForAttributeMenu = !0, new Set(this._pickerEntities().map((e) => e.entity_id)).has(e) || (this._customEntityIds = [...this._customEntityIds, e]), this._selectedEntityId = e, this._path = [], this._attributeSearch = "", this._entityPickerOpen = !1, this._attributeMenuOpen = !0, this._browserHistoryEntry()?.layer === "entity-picker" ? this._replaceBrowserHistoryLayer("attribute-picker") : this._pushBrowserHistoryLayer("attribute-picker"), queueMicrotask(() => {
			this._selectingEntityForAttributeMenu = !1;
		});
	}
	_onEntityPickerOpened() {
		this._entityPickerOpen && !this._attributeMenuOpen || (this._entityPickerOpen = !0, this._attributeMenuOpen = !1, this._pushBrowserHistoryLayer("entity-picker"));
	}
	_onEntityPickerClosed() {
		if (this._selectingEntityForAttributeMenu) {
			this._entityPickerOpen = !1;
			return;
		}
		this._closeBrowserHistoryLayer("entity-picker", () => {
			this._entityPickerOpen = !1;
		});
	}
	_isEventInsideAttributeOverlay(e) {
		let t = e.composedPath(), n = this.renderRoot?.querySelector(".entity-menu");
		if (n && this._pathContainsElement(t, n)) return !0;
		let r = this.renderRoot?.querySelector(".entity-trigger");
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
			if (t === "ha-generic-picker" || t === "ha-combo-box" || t === "vaadin-combo-box-overlay" || t === "mwc-menu-surface" || t === "ha-md-list" || t === "md-menu") return !0;
		}
		return !1;
	}
	_pathContainsElement(e, t) {
		return e.some((e) => e instanceof Node && t.contains(e));
	}
	_sourceWithAttributeUnit(e) {
		if (e.kind !== "entity_attribute" || !e.path || e.unit) return e;
		if (e.entityId.startsWith("climate.") && e.path.length === 1 && ka.has(e.path[0])) {
			let t = this._climateTemperatureUnit(e.entityId);
			if (t) return {
				...e,
				unit: t
			};
		}
		let t = wr(e.path, this.attributeUnits ?? this.config?.attributeUnits), n = Cr(t) ? this._resolvedTemperatureUnit() ?? t : t;
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
		let n = this._climateTemperatureUnit(e.entityId), r = Oa.map((r) => {
			let i = bt(t, [r]), a = {
				id: `attr:${e.entityId}:${r}`,
				kind: "entity_attribute",
				entityId: e.entityId,
				label: r,
				path: [r],
				valueType: r === "hvac_action" ? "string" : "number",
				unit: ka.has(r) ? n : void 0,
				scalePreference: e.scalePreference
			}, o = i ?? a, s = Ia(e);
			return ka.has(r) && n ? {
				...o,
				unit: n,
				group: s,
				scalePreference: e.scalePreference
			} : ka.has(r) ? {
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
		if (this._selectedSources.some((t) => t.id === e.id) || this._pendingAddedSources.some((t) => t.id === e.id) || (this._resolved?.series ?? []).some((t) => t.id === e.id)) return;
		let t = this._sourceWithAttributeUnit(e);
		this._pendingAddedSources = [...this._pendingAddedSources, t], this.dispatchEvent(new CustomEvent("series-added", {
			detail: { source: t },
			bubbles: !0,
			composed: !0
		})), this._sourceAddBatchTimer !== void 0 && clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = setTimeout(() => this._flushPendingAddedSources(), ea);
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
		e.kind !== "entity_attribute" && e.kind !== "entity_state" || (this._sourceSettingsSourceId = e.id);
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
H([j({ attribute: !1 })], W.prototype, "hass", void 0), H([j({ attribute: !1 })], W.prototype, "config", void 0), H([j({ attribute: !1 })], W.prototype, "entities", void 0), H([j({ attribute: !1 })], W.prototype, "attributeUnits", void 0), H([j({ type: Number })], W.prototype, "hours", void 0), H([j({ attribute: !1 })], W.prototype, "startDate", void 0), H([j({ attribute: !1 })], W.prototype, "endDate", void 0), H([j({
	type: Boolean,
	attribute: "show-date-picker"
})], W.prototype, "showDatePicker", void 0), H([j({
	type: Boolean,
	attribute: "show-entity-picker"
})], W.prototype, "showEntityPicker", void 0), H([j({
	type: Boolean,
	attribute: "show-import-button"
})], W.prototype, "showImportButton", void 0), H([j({
	type: Boolean,
	attribute: "show-export-button"
})], W.prototype, "showExportButton", void 0), H([j({
	type: Boolean,
	attribute: "show-time-range-selector"
})], W.prototype, "showTimeRangeSelector", void 0), H([j({
	type: Boolean,
	attribute: "show-line-mode-buttons"
})], W.prototype, "showLineModeButtons", void 0), H([j({
	type: Boolean,
	attribute: "show-legend"
})], W.prototype, "showLegend", void 0), H([j({
	type: Boolean,
	attribute: "show-tooltip"
})], W.prototype, "showTooltip", void 0), H([j({
	type: Boolean,
	attribute: "show-grid"
})], W.prototype, "showGrid", void 0), H([j({
	type: Boolean,
	attribute: "show-scale"
})], W.prototype, "showScale", void 0), H([j({
	type: Boolean,
	attribute: "auto-scale-split"
})], W.prototype, "autoScaleSplit", void 0), H([j({
	type: Boolean,
	attribute: "show-controls"
})], W.prototype, "showControls", void 0), H([j()], W.prototype, "width", void 0), H([j()], W.prototype, "height", void 0), H([j({ attribute: "line-mode" })], W.prototype, "lineMode", void 0), H([j({ attribute: "line-width" })], W.prototype, "lineWidth", void 0), H([j({ attribute: "background-color" })], W.prototype, "backgroundColor", void 0), H([j({ attribute: "graph-title" })], W.prototype, "graphTitle", void 0), H([j({ attribute: "title-font-family" })], W.prototype, "titleFontFamily", void 0), H([j({ attribute: "title-font-size" })], W.prototype, "titleFontSize", void 0), H([j({ attribute: "title-color" })], W.prototype, "titleColor", void 0), H([j()], W.prototype, "language", void 0), H([j({
	type: Boolean,
	attribute: "debug-performance"
})], W.prototype, "debugPerformance", void 0), H([j({
	type: Boolean,
	attribute: "tools-open"
})], W.prototype, "toolsOpen", void 0), H([M()], W.prototype, "_resolved", void 0), H([M()], W.prototype, "_hiddenSeriesIds", void 0), H([M()], W.prototype, "_rangeStart", void 0), H([M()], W.prototype, "_rangeEnd", void 0), H([M()], W.prototype, "_viewStart", void 0), H([M()], W.prototype, "_viewEnd", void 0), H([M()], W.prototype, "_liveNow", void 0), H([M()], W.prototype, "_datePickerReady", void 0), H([M()], W.prototype, "_entityComponentsReady", void 0), H([M()], W.prototype, "_runtimeLineMode", void 0), H([M()], W.prototype, "_attributeMenuOpen", void 0), H([M()], W.prototype, "_attributeSearch", void 0), H([M()], W.prototype, "_selectedEntityId", void 0), H([M()], W.prototype, "_path", void 0), H([M()], W.prototype, "_selectedSources", void 0), H([M()], W.prototype, "_removedConfigSourceIds", void 0), H([M()], W.prototype, "_scalePreferences", void 0), H([M()], W.prototype, "_customEntityIds", void 0), H([M()], W.prototype, "_entityPickerOpen", void 0), H([M()], W.prototype, "_datePickerOpen", void 0), H([M()], W.prototype, "_draggingSourceId", void 0), H([M()], W.prototype, "_draggingAxisSeriesId", void 0), H([M()], W.prototype, "_axisDropTarget", void 0), H([M()], W.prototype, "_sourceSettingsSourceId", void 0), H([M()], W.prototype, "_pendingAddedSources", void 0), H([M()], W.prototype, "_importedDataActive", void 0), H([M()], W.prototype, "_containerWidth", void 0), H([M()], W.prototype, "_chartSurfaceHeight", void 0), H([M()], W.prototype, "_chartSurfaceConstrained", void 0);
var Ba = "haBetterHistory";
function Va(e) {
	return e?.group ?? e?.scaleGroup;
}
var G = class extends Fe {
	constructor(...e) {
		super(...e), this.browserHistory = !0, this._selectedSources = [], this._attributeMenuOpen = !1, this._entityPickerOpen = !1, this._entitySearch = "", this._path = [], this._attributeSearch = "", this._componentsReady = !1, this._customEntityIds = [], this._browserHistoryInstanceId = `abh-picker-${Math.random().toString(36).slice(2)}`, this._lastPointerDownInside = !1, this._syncingBrowserHistory = !1, this._selectingEntityForAttributeMenu = !1, this._handleDocumentPointerDown = (e) => {
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
					this._closeBrowserHistoryLayer("entity-picker", () => {
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
				this._entityPickerOpen = t.layer === "entity-picker", this._attributeMenuOpen = t.layer === "attribute-picker", t.layer !== "attribute-picker" && (this._attributeSearch = "");
			} finally {
				this._syncingBrowserHistory = !1;
			}
		}, this._getItems = () => yi(this.hass), this._getAdditionalItems = (e) => {
			if (!this.hass || !e?.trim()) return [];
			let t = new Set(this._pickerEntities().map((e) => e.entity_id));
			return Ci(yi(this.hass, Object.values(this.hass.states).filter((e) => e !== void 0).filter((e) => !t.has(e.entity_id))), e);
		};
	}
	static {
		this.styles = [Qr, o`
      :host {
        display: block;
      }
    `];
	}
	connectedCallback() {
		super.connectedCallback(), document.addEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.addEventListener("click", this._handleDocumentClick, !0), window.addEventListener("popstate", this._handleBrowserPopState), Ti().then(() => {
			this._componentsReady = !0;
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback(), document.removeEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.removeEventListener("click", this._handleDocumentClick, !0), window.removeEventListener("popstate", this._handleBrowserPopState);
	}
	willUpdate(e) {
		e.has("initialSources") && this.initialSources && (this._selectedSources = [...this.initialSources]), (e.has("_attributeMenuOpen") && this._attributeMenuOpen || e.has("_entityPickerOpen") && this._entityPickerOpen) && this.updateComplete.then(() => this._positionEntityMenu()), e.has("_sourceSettingsSourceId") && this._sourceSettingsSourceId && this.updateComplete.then(() => this._positionSourceSettingsPopover());
	}
	_isEventInsideAttributeOverlay(e) {
		let t = e.composedPath(), n = this.renderRoot?.querySelector(".entity-menu[open], .entity-select-menu[open]");
		if (n && this._pathContainsElement(t, n)) return !0;
		let r = this.renderRoot?.querySelector(".entity-trigger");
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
			if (t === "ha-generic-picker" || t === "ha-combo-box" || t === "vaadin-combo-box-overlay" || t === "mwc-menu-surface" || t === "ha-md-list" || t === "md-menu") return !0;
		}
		return !1;
	}
	_pathContainsElement(e, t) {
		return e.some((e) => e instanceof Node && t.contains(e));
	}
	_positionEntityMenu() {
		let e = this.renderRoot?.querySelector(".entity-trigger"), t = this.renderRoot?.querySelector(".entity-menu[open], .entity-select-menu[open]");
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
		let t = typeof e == "object" && e ? e[Ba] : void 0;
		if (typeof t != "object" || !t) return;
		let n = t;
		if (n.instanceId === this._browserHistoryInstanceId && !(n.layer !== "entity-picker" && n.layer !== "attribute-picker")) return {
			instanceId: n.instanceId,
			layer: n.layer
		};
	}
	_browserHistoryState(e) {
		return {
			...typeof window.history.state == "object" && window.history.state !== null ? window.history.state : {},
			[Ba]: {
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
		this._selectingEntityForAttributeMenu = !0, new Set(this._pickerEntities().map((e) => e.entity_id)).has(e) || (this._customEntityIds = [...this._customEntityIds, e]), this._selectedEntityId = e, this._entitySearch = "", this._path = [], this._attributeSearch = "", this._entityPickerOpen = !1, this._attributeMenuOpen = !0, this._browserHistoryEntry()?.layer === "entity-picker" ? this._replaceBrowserHistoryLayer("attribute-picker") : this._pushBrowserHistoryLayer("attribute-picker"), queueMicrotask(() => {
			this._selectingEntityForAttributeMenu = !1;
		});
	}
	_closeAttributeMenu() {
		this._closeBrowserHistoryLayer("attribute-picker", () => this._closePickerOverlay());
	}
	_closePickerOverlay() {
		this._attributeMenuOpen = !1, this._entityPickerOpen = !1, this._entitySearch = "", this._attributeSearch = "", this._sourceSettingsSourceId = void 0, this._selectedSources.length > 0 && (this._confirm(), this._selectedSources = []);
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
		e.kind !== "entity_attribute" && e.kind !== "entity_state" || (this._sourceSettingsSourceId = e.id);
	}
	_updateSourceSettings(e) {
		let t = this._sourceSettingsSourceId;
		t && (this._selectedSources = this._selectedSources.map((n) => n.id === t ? {
			...n,
			...e
		} : n));
	}
	_confirm() {
		this.dispatchEvent(new CustomEvent("sources-confirmed", {
			detail: { sources: [...this._selectedSources] },
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		return this._componentsReady ? O`
      ${Di({
			hass: this.hass,
			menuOpen: this._attributeMenuOpen,
			entityPickerOpen: this._entityPickerOpen,
			selectedEntityId: this._selectedEntityId,
			entitySearch: this._entitySearch,
			path: this._path,
			selectedSources: this._selectedSources,
			draggingSourceId: void 0,
			resolved: void 0,
			loading: !1,
			attributeSearch: this._attributeSearch,
			getItems: this._getItems,
			getAdditionalItems: this._getAdditionalItems,
			onEntityPickerOpened: () => {
				this._entityPickerOpen && !this._attributeMenuOpen || (this._entityPickerOpen = !0, this._attributeMenuOpen = !1, this._pushBrowserHistoryLayer("entity-picker"));
			},
			onEntityPickerClosed: () => {
				if (this._selectingEntityForAttributeMenu) {
					this._entityPickerOpen = !1;
					return;
				}
				this._closeBrowserHistoryLayer("entity-picker", () => {
					this._entityPickerOpen = !1;
				});
			},
			onEntitySelected: (e) => this._onEntitySelected(e),
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
			sourceSettingsGroup: Va(this._sourceSettingsSource()),
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
    ` : O``;
	}
};
H([j({ attribute: !1 })], G.prototype, "hass", void 0), H([j({ attribute: !1 })], G.prototype, "initialSources", void 0), H([j({
	type: Boolean,
	attribute: "browser-history"
})], G.prototype, "browserHistory", void 0), H([M()], G.prototype, "_selectedSources", void 0), H([M()], G.prototype, "_attributeMenuOpen", void 0), H([M()], G.prototype, "_entityPickerOpen", void 0), H([M()], G.prototype, "_selectedEntityId", void 0), H([M()], G.prototype, "_entitySearch", void 0), H([M()], G.prototype, "_path", void 0), H([M()], G.prototype, "_attributeSearch", void 0), H([M()], G.prototype, "_componentsReady", void 0), H([M()], G.prototype, "_customEntityIds", void 0), H([M()], G.prototype, "_sourceSettingsSourceId", void 0), customElements.get("abh-series-picker") || customElements.define("abh-series-picker", G);
function Ha(e = "ha-better-history") {
	customElements.get(e) || customElements.define(e, W);
}
//#endregion
//#region node_modules/@lit/reactive-element/css-tag.js
var Ua = globalThis, Wa = Ua.ShadowRoot && (Ua.ShadyCSS === void 0 || Ua.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ga = Symbol(), Ka = /* @__PURE__ */ new WeakMap(), qa = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== Ga) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (Wa && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = Ka.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Ka.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, Ja = (e) => new qa(typeof e == "string" ? e : e + "", void 0, Ga), Ya = (e, ...t) => new qa(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, Ga), Xa = (e, t) => {
	if (Wa) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = Ua.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, Za = Wa ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return Ja(t);
})(e) : e, { is: Qa, defineProperty: $a, getOwnPropertyDescriptor: eo, getOwnPropertyNames: to, getOwnPropertySymbols: no, getPrototypeOf: ro } = Object, io = globalThis, ao = io.trustedTypes, oo = ao ? ao.emptyScript : "", so = io.reactiveElementPolyfillSupport, co = (e, t) => e, lo = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? oo : null;
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
}, uo = (e, t) => !Qa(e, t), fo = {
	attribute: !0,
	type: String,
	converter: lo,
	reflect: !1,
	useDefault: !1,
	hasChanged: uo
};
Symbol.metadata ??= Symbol("metadata"), io.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var po = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = fo) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && $a(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = eo(this.prototype, e) ?? {
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
		return this.elementProperties.get(e) ?? fo;
	}
	static _$Ei() {
		if (this.hasOwnProperty(co("elementProperties"))) return;
		let e = ro(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(co("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(co("properties"))) {
			let e = this.properties, t = [...to(e), ...no(e)];
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
			for (let e of n) t.unshift(Za(e));
		} else e !== void 0 && t.push(Za(e));
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
		return Xa(e, this.constructor.elementStyles), e;
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
			let i = (n.converter?.toAttribute === void 0 ? lo : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? lo : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? uo)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
po.elementStyles = [], po.shadowRootOptions = { mode: "open" }, po[co("elementProperties")] = /* @__PURE__ */ new Map(), po[co("finalized")] = /* @__PURE__ */ new Map(), so?.({ ReactiveElement: po }), (io.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var mo = globalThis, ho = (e) => e, go = mo.trustedTypes, _o = go ? go.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, vo = "$lit$", K = `lit$${Math.random().toFixed(9).slice(2)}$`, yo = "?" + K, bo = `<${yo}>`, xo = document, So = () => xo.createComment(""), Co = (e) => e === null || typeof e != "object" && typeof e != "function", wo = Array.isArray, To = (e) => wo(e) || typeof e?.[Symbol.iterator] == "function", Eo = "[ 	\n\f\r]", Do = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Oo = /-->/g, ko = />/g, q = RegExp(`>|${Eo}(?:([^\\s"'>=/]+)(${Eo}*=${Eo}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), Ao = /'/g, jo = /"/g, Mo = /^(?:script|style|textarea|title)$/i, J = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), No = Symbol.for("lit-noChange"), Y = Symbol.for("lit-nothing"), Po = /* @__PURE__ */ new WeakMap(), X = xo.createTreeWalker(xo, 129);
function Fo(e, t) {
	if (!wo(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return _o === void 0 ? t : _o.createHTML(t);
}
var Io = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Do;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === Do ? c[1] === "!--" ? o = Oo : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = q) : (Mo.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = q) : o = ko : o === q ? c[0] === ">" ? (o = i ?? Do, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? q : c[3] === "\"" ? jo : Ao) : o === jo || o === Ao ? o = q : o === Oo || o === ko ? o = Do : (o = q, i = void 0);
		let d = o === q && e[t + 1].startsWith("/>") ? " " : "";
		a += o === Do ? n + bo : l >= 0 ? (r.push(s), n.slice(0, l) + vo + n.slice(l) + K + d) : n + K + (l === -2 ? t : d);
	}
	return [Fo(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Lo = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Io(t, n);
		if (this.el = e.createElement(l, r), X.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = X.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(vo)) {
					let t = u[o++], n = i.getAttribute(e).split(K), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ho : r[1] === "?" ? Uo : r[1] === "@" ? Wo : Vo
					}), i.removeAttribute(e);
				} else e.startsWith(K) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Mo.test(i.tagName)) {
					let e = i.textContent.split(K), t = e.length - 1;
					if (t > 0) {
						i.textContent = go ? go.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], So()), X.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], So());
					}
				}
			} else if (i.nodeType === 8) if (i.data === yo) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(K, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += K.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = xo.createElement("template");
		return n.innerHTML = e, n;
	}
};
function Ro(e, t, n = e, r) {
	if (t === No) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = Co(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = Ro(e, i._$AS(e, t.values), i, r)), t;
}
var zo = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? xo).importNode(t, !0);
		X.currentNode = r;
		let i = X.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Bo(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Go(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = X.nextNode(), a++);
		}
		return X.currentNode = xo, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Bo = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = Y, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = Ro(this, e, t), Co(e) ? e === Y || e == null || e === "" ? (this._$AH !== Y && this._$AR(), this._$AH = Y) : e !== this._$AH && e !== No && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? To(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== Y && Co(this._$AH) ? this._$AA.nextSibling.data = e : this.T(xo.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Lo.createElement(Fo(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new zo(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Po.get(e.strings);
		return t === void 0 && Po.set(e.strings, t = new Lo(e)), t;
	}
	k(t) {
		wo(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(So()), this.O(So()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ho(e).nextSibling;
			ho(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Vo = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = Y, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = Y;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = Ro(this, e, t, 0), a = !Co(e) || e !== this._$AH && e !== No, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = Ro(this, r[n + o], t, o), s === No && (s = this._$AH[o]), a ||= !Co(s) || s !== this._$AH[o], s === Y ? e = Y : e !== Y && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === Y ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ho = class extends Vo {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === Y ? void 0 : e;
	}
}, Uo = class extends Vo {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== Y);
	}
}, Wo = class extends Vo {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = Ro(this, e, t, 0) ?? Y) === No) return;
		let n = this._$AH, r = e === Y && n !== Y || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== Y && (n === Y || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Go = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		Ro(this, e);
	}
}, Ko = mo.litHtmlPolyfillSupport;
Ko?.(Lo, Bo), (mo.litHtmlVersions ??= []).push("3.3.3");
var qo = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Bo(t.insertBefore(So(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Jo = globalThis, Z = class extends po {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = qo(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return No;
	}
};
Z._$litElement$ = !0, Z.finalized = !0, Jo.litElementHydrateSupport?.({ LitElement: Z });
var Yo = Jo.litElementPolyfillSupport;
Yo?.({ LitElement: Z }), (Jo.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region src/data/build-better-history-config.ts
function Xo(e) {
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
function Zo(e) {
	let t = e.group ?? e.scale_group;
	return {
		entity: e.entity,
		...e.attribute !== void 0 && { attribute: e.attribute },
		...e.forced !== void 0 && { forced: e.forced },
		...e.label !== void 0 && { label: e.label },
		...e.color !== void 0 && { color: e.color },
		...e.unit !== void 0 && { unit: e.unit },
		...t !== void 0 && { scaleGroup: t },
		...e.scale_mode !== void 0 && { scaleMode: e.scale_mode },
		...e.scale_min !== void 0 && { scaleMin: e.scale_min },
		...e.scale_max !== void 0 && { scaleMax: e.scale_max },
		...e.line_mode !== void 0 && { lineMode: e.line_mode },
		...e.line_width !== void 0 && { lineWidth: e.line_width }
	};
}
function Qo(e, t) {
	let n = {};
	if (e.series && (n.series = e.series.map(Zo)), e.entities && (n.defaultEntities = e.entities), e.attribute_units && (n.attributeUnits = e.attribute_units), e.range_mode === "absolute" ? (e.start_date && (n.startDate = new Date(e.start_date)), e.end_date && (n.endDate = new Date(e.end_date))) : n.hours = e.hours ?? 24, e.show_date_picker !== void 0 && (n.showDatePicker = e.show_date_picker), e.show_entity_picker !== void 0 && (n.showEntityPicker = e.show_entity_picker), e.show_legend !== void 0 && (n.showLegend = e.show_legend), e.show_tooltip !== void 0 && (n.showTooltip = e.show_tooltip), e.show_grid !== void 0 && (n.showGrid = e.show_grid), e.show_scale !== void 0 && (n.showScale = e.show_scale), e.auto_scale_split !== void 0 && (n.autoScaleSplit = e.auto_scale_split), e.show_import_button !== void 0 && (n.showImportButton = e.show_import_button), e.show_export_button !== void 0 && (n.showExportButton = e.show_export_button), e.show_time_range_selector !== void 0 && (n.showTimeRangeSelector = e.show_time_range_selector), e.disable_climate_overlay !== void 0 && (n.disableClimateOverlay = e.disable_climate_overlay), !t) {
		e.title !== void 0 && (n.title = e.title), e.title_font_family !== void 0 && (n.titleFontFamily = e.title_font_family), e.title_font_size !== void 0 && (n.titleFontSize = e.title_font_size);
		let t = Xo(e.title_color);
		t !== void 0 && (n.titleColor = t);
	}
	return e.line_mode !== void 0 && (n.lineMode = e.line_mode), e.line_width !== void 0 && (n.lineWidth = e.line_width), e.show_line_mode_buttons !== void 0 && (n.showLineModeButtons = e.show_line_mode_buttons), e.debug_performance !== void 0 && (n.debugPerformance = e.debug_performance), n;
}
function $o(e, t, n) {
	let r = n === !0;
	if (e.card === t && e.skipTitle === r && e.config) return e.config;
	let i = Qo(t, r);
	return e.card = t, e.skipTitle = r, e.config = i, i;
}
//#endregion
//#region src/translations/index.ts
var es = {
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
		"editor.tab.tools": "Инструменти"
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
		"editor.tab.tools": "Eines"
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
		"editor.tab.tools": "Nástroje"
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
		"editor.tab.tools": "Værktøjer"
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
		"editor.tab.tools": "Werkzeuge"
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
		"editor.tab.tools": "Εργαλεία"
	},
	en: {
		"card.error.no_configuration": "No configuration.",
		"card.error.no_entities": "Configure at least one entity.",
		"card.label.fullscreen": "Fullscreen",
		"card.label.hide_controls": "Hide controls",
		"card.label.show_controls": "Show controls",
		"card.label.tools": "Tools",
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
		"editor.field.range_mode": "Range mode",
		"editor.field.scale_group": "Group",
		"editor.field.scale_max": "Scale max",
		"editor.field.scale_min": "Scale min",
		"editor.field.scale_mode": "Scale mode",
		"editor.field.series": "Series (JSON)",
		"editor.field.show_controls": "Pickers initial state",
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
		"editor.tab.tools": "Tools"
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
		"editor.tab.tools": "Herramientas"
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
		"editor.tab.tools": "Työkalut"
	},
	fr: {
		"card.error.no_configuration": "Aucune configuration.",
		"card.error.no_entities": "Configurez au moins une entité.",
		"card.label.fullscreen": "Plein écran",
		"card.label.hide_controls": "Masquer les contrôles",
		"card.label.show_controls": "Afficher les contrôles",
		"card.label.tools": "Outils",
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
		"editor.field.range_mode": "Mode de plage",
		"editor.field.scale_group": "Groupe",
		"editor.field.scale_max": "Échelle max",
		"editor.field.scale_min": "Échelle min",
		"editor.field.scale_mode": "Mode d'échelle",
		"editor.field.series": "Séries (JSON)",
		"editor.field.show_controls": "État initial des sélecteurs",
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
		"editor.tab.tools": "Outils"
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
		"editor.tab.tools": "Eszközök"
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
		"editor.tab.tools": "Strumenti"
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
		"editor.tab.tools": "Gereedschappen"
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
		"editor.tab.tools": "Verktøy"
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
		"editor.tab.tools": "Narzędzia"
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
		"editor.tab.tools": "Ferramentas"
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
		"editor.tab.tools": "Инструменты"
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
		"editor.tab.tools": "Nástroje"
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
		"editor.tab.tools": "工具"
	}
}, ts = "en", ns = new Set([
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
]), rs = { "common.loading": "ui.common.loading" };
function Q(e, t) {
	let n = (t ?? e?.locale?.language ?? e?.language ?? ts).split("-")[0]?.toLowerCase() ?? ts;
	return ns.has(n) ? n : ts;
}
function is(e) {
	return (e.split(".").at(-1) ?? e).replace(/_/g, " ").replace(/^\w/, (e) => e.toUpperCase());
}
function as(e, t) {
	return Q(e, t);
}
function $(e, t, n) {
	let r = rs[t], i = e?.localize;
	if (r && i) {
		let e = i(r);
		if (e) return e;
	}
	return es[Q(e, n)]?.[t] ?? es[ts]?.[t] ?? is(t);
}
//#endregion
//#region src/components/history-dialog.ts
var os = class extends Z {
	constructor(...e) {
		super(...e), this.open = !1, this._fullscreen = !1, this._controlsVisible = !0, this._toolsOpen = !1, this._translationLanguage = "", this._pickerOverlayOpen = !1, this._suppressNextClose = !1, this._betterHistoryConfigCache = {}, this._onDocPointerDown = () => {
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
			_graphVisible: { state: !0 }
		};
	}
	static {
		this.styles = Ya`
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

    .btn-tools {
      margin-inline-start: 12px;
    }

    @media (max-width: 600px) {
      .btn-tools {
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
		e.has("config") && (this._graphVisible = void 0);
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
		e.stopPropagation(), this.dispatchEvent(new CustomEvent("abh-dialog-closed", { bubbles: !0 }));
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
	_toolsDisabled(e) {
		return this._graphVisible === !1 || this._graphVisible === void 0 && !this._hasConfiguredGraphTargets(e);
	}
	async _loadTranslations() {
		let e = Q(this.hass, this.language);
		e !== this._translationLanguage && (this._translationLanguage = e, await as(this.hass, e), this.requestUpdate());
	}
	_styleDialogHeader() {
		let e = this.renderRoot.querySelector("ha-dialog")?.shadowRoot;
		if (!e || e.querySelector("style[data-abh-header]")) return;
		let t = document.createElement("style");
		t.dataset.abhHeader = "true", t.textContent = "\n      .mdc-dialog__title, .header-title, .title {\n        min-width: 0;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n      .header, .dialog-header, .mdc-dialog__header { gap: 12px; }\n      [name=\"headerActionItems\"], slot[name=\"headerActionItems\"] { flex: 0 0 auto; }\n    ", e.appendChild(t);
	}
	render() {
		let e = this.config, t = e?.title ?? $(this.hass, "dialog.title.history", this.language);
		return J`
      <ha-dialog
        .open=${this.open}
        .headerTitle=${t}
        width="large"
        flexcontent
        ?fullscreen=${this._fullscreen}
        @closed=${(e) => this._onDialogClosed(e)}
      >
        ${e?.show_tools_button ? J`<ha-icon-button
              slot="headerActionItems"
              class="btn btn-tools"
              .label=${$(this.hass, "card.label.tools", this.language)}
              ?active=${this._toolsOpen}
              ?disabled=${this._toolsDisabled(e)}
              @click=${() => {
			this._toolsOpen = !this._toolsOpen;
		}}
            ><ha-icon icon="mdi:tools"></ha-icon></ha-icon-button>` : Y}
        ${e?.show_controls_toggle && (e?.show_date_picker || e?.show_entity_picker) ? J`<ha-icon-button
              slot="headerActionItems"
              class="btn"
              .label=${$(this.hass, this._controlsVisible ? "card.label.hide_controls" : "card.label.show_controls", this.language)}
              @click=${() => {
			this._controlsVisible = !this._controlsVisible;
		}}
            ><ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon></ha-icon-button>` : Y}
        ${e?.show_fullscreen_button ? J`<ha-icon-button
              slot="headerActionItems"
              class="btn btn-fs"
              .label=${$(this.hass, this._fullscreen ? "dialog.label.exit_fullscreen" : "card.label.fullscreen", this.language)}
              @click=${() => {
			this._fullscreen = !this._fullscreen;
		}}
            ><ha-icon icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon></ha-icon-button>` : Y}
        ${this.open && e ? J`<a-better-history-card-history
              .hass=${this.hass}
              .config=${$o(this._betterHistoryConfigCache, e, !0)}
              .language=${this.language}
              .showControls=${this._controlsVisible}
              .toolsOpen=${this._toolsOpen}
              @picker-overlay-changed=${(e) => this._onPickerOverlayChanged(e)}
              @graph-visibility-changed=${(e) => this._onGraphVisibilityChanged(e)}
              class="history"
            ></a-better-history-card-history>` : Y}
      </ha-dialog>
    `;
	}
};
customElements.get("abh-history-dialog") || customElements.define("abh-history-dialog", os);
//#endregion
//#region src/data/normalize-config.ts
function ss(e) {
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
		button_show_name: !0,
		button_show_icon: !0,
		button_hover_effect: !0,
		...e
	};
}
//#endregion
//#region src/const.ts
var cs = "A Better History Card", ls = "custom:a-better-history-card", us = "a-better-history-card", ds = "a-better-history-card-history", fs = "a-better-history-card-editor", ps = "custom:a-better-history-button-card", ms = "a-better-history-button-card", hs = "a-better-history-button-card-editor";
//#endregion
//#region src/cards/a-better-history-card.ts
function gs(e) {
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
function _s(e) {
	if (e == null || e === "") return;
	let t = Number(e);
	if (Number.isFinite(t)) return Math.min(100, Math.max(0, t));
}
var vs = class extends Z {
	constructor(...e) {
		super(...e), this._toolsOpen = !1, this._controlsVisible = !0, this._dialogOpen = !1, this._translationLanguage = "", this._betterHistoryConfigCache = {};
	}
	static getConfigElement() {
		return document.createElement(fs);
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
			_toolsOpen: { state: !0 },
			_controlsVisible: { state: !0 },
			_dialogOpen: { state: !0 },
			_graphVisible: { state: !0 }
		};
	}
	static {
		this.styles = Ya`
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
		!t.entities?.length && t.series?.length, this._config = { ...ss(t) }, this._controlsVisible = this._config.show_controls ?? !0, this._graphVisible = void 0;
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
		let e = Q(this.hass);
		e !== this._translationLanguage && (this._translationLanguage = e, await as(this.hass, e), this.requestUpdate());
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
	_toolsDisabled(e) {
		return this._graphVisible === !1 || this._graphVisible === void 0 && !this._hasConfiguredGraphTargets(e);
	}
	_cardStyle() {
		let e = gs(this._config?.card_background_color), t = _s(this._config?.card_background_opacity);
		return e && t !== void 0 ? `--_card-bg: color-mix(in srgb, ${e} ${t}%, transparent);` : e ? `--_card-bg: ${e};` : t === void 0 ? "" : `--_card-bg: color-mix(in srgb, var(--ha-card-background, var(--card-background-color)) ${t}%, transparent);`;
	}
	_renderHeader() {
		let e = this._config, t = e?.title, n = !!(e?.show_controls_toggle && (e?.show_date_picker || e?.show_entity_picker)), r = e?.show_tools_button || n || e?.show_fullscreen_button;
		if (!t && !r) return Y;
		let i = gs(e?.title_color), a = [
			e?.title_font_family ? `font-family:${e.title_font_family};` : "",
			e?.title_font_size ? `font-size:${e.title_font_size};` : "",
			i ? `color:${i};` : ""
		].join("");
		return J`
      <div class="header">
        ${t ? J`<div class="card-title" style=${a}>${t}</div>` : Y}
        ${r ? J`<div class="header-actions">
          ${e.show_tools_button ? J`<ha-icon-button
                .label=${$(this.hass, "card.label.tools")}
                ?active=${this._toolsOpen}
                ?disabled=${this._toolsDisabled(e)}
                @click=${() => {
			this._toolsOpen = !this._toolsOpen;
		}}
              ><ha-icon icon="mdi:tools"></ha-icon></ha-icon-button>` : Y}
          ${n ? J`<ha-icon-button
                .label=${$(this.hass, this._controlsVisible ? "card.label.hide_controls" : "card.label.show_controls")}
                @click=${() => {
			this._controlsVisible = !this._controlsVisible;
		}}
              ><ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon></ha-icon-button>` : Y}
          ${e.show_fullscreen_button ? J`<ha-icon-button
                .label=${$(this.hass, "card.label.fullscreen")}
                @click=${() => this._openDialog()}
              ><ha-icon icon="mdi:fullscreen"></ha-icon></ha-icon-button>` : Y}
        </div>` : Y}
      </div>
    `;
	}
	render() {
		let e = this._config;
		if (!e) return J`<ha-card><div class="error">${$(this.hass, "card.error.no_configuration")}</div></ha-card>`;
		let t = $o(this._betterHistoryConfigCache, e, !!e.title), n = this.hass?.locale?.language ?? this.hass?.language;
		return J`
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
      </ha-card>
    `;
	}
};
//#endregion
//#region src/cards/a-better-history-button-card.ts
function ys(e) {
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
function bs(e) {
	if (e == null || e === "") return;
	let t = Number(e);
	if (Number.isFinite(t)) return Math.min(100, Math.max(0, t));
}
var xs = class extends Z {
	constructor(...e) {
		super(...e), this._open = !1, this._translationLanguage = "";
	}
	static getConfigElement() {
		return document.createElement(hs);
	}
	static getStubConfig(e) {
		let t = e?.states ?? {}, n = Object.keys(t).find((e) => /^sensor\.[^.]*temperature/.test(e) || e.startsWith("climate.")) ?? Object.keys(t).find((e) => e.startsWith("sensor.") && !isNaN(Number(t[e]?.state)));
		return {
			type: ps,
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
		this.styles = Ya`
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
		this._config = { ...ss(e) };
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
		let e = Q(this.hass);
		e !== this._translationLanguage && (this._translationLanguage = e, await as(this.hass, e), this.requestUpdate());
	}
	render() {
		let e = this._config, t = e?.button_icon ?? "mdi:chart-line", n = e?.button_label ?? $(this.hass, "dialog.title.history"), r = e?.button_show_name !== !1, i = e?.button_show_icon !== !1, a = e?.button_hover_effect !== !1, o = ys(e?.button_color), s = ys(e?.button_hover_color), c = ys(e?.card_background_color), l = bs(e?.card_background_opacity), u = this.hass?.locale?.language ?? this.hass?.language, d = [];
		return o && d.push(`--_btn-color: ${o}`), s && d.push(`--_btn-hover-color: ${s}`), c && l !== void 0 ? d.push(`--_card-bg: color-mix(in srgb, ${c} ${l}%, transparent)`) : c ? d.push(`--_card-bg: ${c}`) : l !== void 0 && d.push(`--_card-bg: color-mix(in srgb, var(--ha-card-background, var(--card-background-color)) ${l}%, transparent)`), d.push(`--_btn-hover-shadow: ${a ? "0 0 0 2px var(--_btn-hover-color, var(--primary-color))" : "none"}`), J`
      <ha-card style=${d.join("; ")} @click=${this._openDialog}>
        <div class="btn-content">
          ${i ? J`<ha-icon icon=${t}></ha-icon>` : null}
          ${r ? J`<span class="label">${n}</span>` : null}
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
function Ss(e) {
	if (typeof e == "string" && e.trim() !== "") return e.trim();
	if (!Array.isArray(e) || e.length < 3) return;
	let [t, n, r] = e.map((e) => Number(e));
	if ([
		t,
		n,
		r
	].every((e) => Number.isFinite(e))) return `rgb(${t}, ${n}, ${r})`;
}
var Cs = class extends Z {
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
		this.styles = Ya`
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
		let e = Q(this.hass);
		e !== this._translationLanguage && (this._translationLanguage = e, await as(this.hass, e), this.requestUpdate());
	}
	_schema() {
		let e = this.series.scale_mode === "manual" ? [{
			name: "scale_min",
			selector: { number: {} }
		}, {
			name: "scale_max",
			selector: { number: {} }
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
		t.group !== void 0 && delete t.scale_group, this._emitItem(this._withDefaultUnit(t));
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
		}, n = Ss(e.detail.value);
		n === void 0 || n === "" ? delete t.color : t.color = n, this._emitItem(t);
	}
	render() {
		let e = {
			forced: !0,
			...this.series,
			group: this.series.group ?? this.series.scale_group
		}, t = this._schema(), n = t.filter((e) => e.name === "line_width"), r = t.filter((e) => e.name !== "line_width");
		return J`
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
customElements.get("abh-series-item-editor") || customElements.define("abh-series-item-editor", Cs);
//#endregion
//#region src/data/source-to-series.ts
function ws(e) {
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
//#region node_modules/@kipk/load-ha-components/dist/load-ha-components.js
var Ts = [
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
], Es = async (e) => {
	let t = e || Ts;
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
}, Ds = [
	"ha-form",
	"ha-icon",
	"ha-icon-button",
	"ha-button",
	"ha-color-picker",
	"ha-expansion-panel"
], Os;
function ks() {
	return Os ??= Es(Ds), Os;
}
var As;
function js() {
	return As ??= Ms(), As;
}
async function Ms() {
	if (!customElements.get("ha-date-range-picker")) try {
		await Promise.race([customElements.whenDefined("partial-panel-resolver"), new Promise((e, t) => setTimeout(() => t(/* @__PURE__ */ Error("timeout")), 1e4))]);
		let e = document.createElement("partial-panel-resolver");
		e.hass = { panels: [{
			url_path: "history",
			component_name: "history"
		}] }, e._updateRoutes(), await e.routerOptions?.routes?.history?.load(), await customElements.whenDefined("ha-date-range-picker");
	} catch (e) {
		console.warn("[a-better-history-card] Failed to load ha-date-range-picker:", e);
	}
}
//#endregion
//#region src/editors/series-list-editor.ts
var Ns = class extends Z {
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
		this.styles = Ya`
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
		super.connectedCallback(), ks().then(() => {
			this._componentsReady = !0;
		});
	}
	updated() {
		this._loadTranslations();
	}
	async _loadTranslations() {
		let e = Q(this.hass);
		e !== this._translationLanguage && (this._translationLanguage = e, await as(this.hass, e), this.requestUpdate());
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
		let t = e.detail.sources.map(ws);
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
		return J`
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
		let n = J`
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
    `, r = J`
      <div class="series-details">
        <abh-series-item-editor
          .series=${e}
          .hass=${this.hass}
          @item-changed=${(e) => this._onItemChanged(t, e.detail.item)}
        ></abh-series-item-editor>
      </div>
    `;
		return this._componentsReady ? J`
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
    ` : J`${n}${r}`;
	}
};
customElements.get("abh-series-list-editor") || customElements.define("abh-series-list-editor", Ns);
//#endregion
//#region src/editors/base-card-editor.ts
var Ps = new Set([
	"title_color",
	"card_background_color",
	"button_color",
	"button_hover_color"
]);
function Fs(e) {
	if (typeof e == "string" && e.trim() !== "") return e.trim();
	if (!Array.isArray(e) || e.length < 3) return;
	let [t, n, r] = e.map((e) => Number(e));
	if ([
		t,
		n,
		r
	].every((e) => Number.isFinite(e))) return `rgb(${t}, ${n}, ${r})`;
}
var Is = class extends Z {
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
		this.styles = Ya`
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
		super.connectedCallback(), ks().then(() => {
			this._componentsReady = !0;
		}), js().then(() => {
			this._dateRangePickerReady = customElements.get("ha-date-range-picker") !== void 0;
		});
	}
	updated() {
		this._loadTranslations();
	}
	setConfig(e) {
		this._config = { ...ss(e) }, this._editingHours || (this._hoursDraft = this._hoursDisplayValue());
		let t = this._tabs();
		t.find((e) => e.id === this._activeTab) || (this._activeTab = t[0]?.id ?? ""), this._config._store_preview && (this._config = this._withoutStorePreview(this._config), queueMicrotask(() => this._emitConfig()));
	}
	_localize(e) {
		return $(this.hass, e);
	}
	async _loadTranslations() {
		let e = Q(this.hass);
		e !== this._translationLanguage && (this._translationLanguage = e, await as(this.hass, e), this.requestUpdate());
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
		return J`
      <div class="tabs">
        ${e.map((e) => J`
            <button
              class="tab"
              ?active=${e.id === t}
              @click=${() => {
			this._activeTab = e.id;
		}}
            >${e.label}</button>
          `)}
      </div>
      ${t === "entities" ? this._renderEntitiesTab() : t === "range" ? this._renderRangeTab() : t === "style" ? this._renderStyleTab() : t === "button" ? this._renderButtonTab() : J`
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
		return J`
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
		return e.filter((e) => !Ps.has(e.name));
	}
	_colorFields(e) {
		return e.filter((e) => Ps.has(e.name));
	}
	_renderStyleTab() {
		let e = this._styleSchema(), t = e.filter((e) => e.name === "line_width"), n = e.filter((e) => e.name === "card_background_opacity"), r = this._withoutColorFields(e).filter((e) => e.name !== "line_width" && e.name !== "card_background_opacity");
		return J`
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
		return J`
      ${this._renderSchemaForm(this._withoutColorFields(e))}
      ${this._renderColorGrid(this._colorFields(e))}
    `;
	}
	_renderColorGrid(e) {
		return J`
      <div class="color-grid">
        ${e.map((e) => this._renderColorField(e))}
      </div>
    `;
	}
	_renderColorField(e) {
		return J`
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
		let n = { ...this._config }, r = Fs(t.detail.value);
		r === void 0 || r === "" ? delete n[e] : n[e] = r, this._config = n, this._emitConfig();
	}
	_renderEntitiesTab() {
		return J`
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
		return J`
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
      ${this._config.range_mode === "absolute" && this._componentsReady && this._dateRangePickerReady ? J`
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
          ` : J``}
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
		return this._coerceDate(this._config.start_date) ?? /* @__PURE__ */ new Date(Date.now() - 24 * 36e5);
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
}, Ls = class extends Is {
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
customElements.get("a-better-history-card-editor") || customElements.define(fs, Ls);
//#endregion
//#region src/editors/a-better-history-button-card-editor.ts
var Rs = class extends Is {
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
customElements.get("a-better-history-button-card-editor") || customElements.define(hs, Rs), Ha(ds), customElements.get("a-better-history-card") || customElements.define(us, vs), customElements.get("a-better-history-button-card") || customElements.define(ms, xs), window.customCards = window.customCards ?? [];
var zs = window.customCards;
zs.filter((e) => e.type === "a-better-history-card" || e.type === "custom:a-better-history-card" || e.type === "a-better-history-button-card" || e.type === "custom:a-better-history-button-card").forEach((e) => {
	zs.splice(zs.indexOf(e), 1);
}), zs.push({
	type: us,
	name: cs,
	description: "Display history charts directly in your dashboard.",
	preview: !0,
	documentationURL: "https://github.com/KipK/a-better-history-card#readme"
}), zs.push({
	type: ms,
	name: `${cs} Button`,
	description: "Button that opens a history chart dialog.",
	preview: !0,
	documentationURL: "https://github.com/KipK/a-better-history-card#readme"
});
//#endregion
