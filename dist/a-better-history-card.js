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
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, _ = g ? g.emptyScript : "", v = h.reactiveElementPolyfillSupport, y = (e, t) => e, ee = {
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
}, b = (e, t) => !l(e, t), x = {
	attribute: !0,
	type: String,
	converter: ee,
	reflect: !1,
	useDefault: !1,
	hasChanged: b
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var S = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = x) {
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
		return this.elementProperties.get(e) ?? x;
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
			let i = (n.converter?.toAttribute === void 0 ? ee : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? ee : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? b)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
//#region node_modules/lit-html/lit-html.js
var C = globalThis, w = (e) => e, T = C.trustedTypes, te = T ? T.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ne = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, re = "?" + E, ie = `<${re}>`, D = document, ae = () => D.createComment(""), oe = (e) => e === null || typeof e != "object" && typeof e != "function", se = Array.isArray, ce = (e) => se(e) || typeof e?.[Symbol.iterator] == "function", le = "[ 	\n\f\r]", ue = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, de = /-->/g, fe = />/g, O = RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), pe = /'/g, me = /"/g, he = /^(?:script|style|textarea|title)$/i, ge = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), k = ge(1), A = ge(2), _e = Symbol.for("lit-noChange"), j = Symbol.for("lit-nothing"), ve = /* @__PURE__ */ new WeakMap(), M = D.createTreeWalker(D, 129);
function ye(e, t) {
	if (!se(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return te === void 0 ? t : te.createHTML(t);
}
var be = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ue;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === ue ? c[1] === "!--" ? o = de : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = O) : (he.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = O) : o = fe : o === O ? c[0] === ">" ? (o = i ?? ue, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? O : c[3] === "\"" ? me : pe) : o === me || o === pe ? o = O : o === de || o === fe ? o = ue : (o = O, i = void 0);
		let d = o === O && e[t + 1].startsWith("/>") ? " " : "";
		a += o === ue ? n + ie : l >= 0 ? (r.push(s), n.slice(0, l) + ne + n.slice(l) + E + d) : n + E + (l === -2 ? t : d);
	}
	return [ye(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, xe = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = be(t, n);
		if (this.el = e.createElement(l, r), M.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = M.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ne)) {
					let t = u[o++], n = i.getAttribute(e).split(E), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Te : r[1] === "?" ? Ee : r[1] === "@" ? De : we
					}), i.removeAttribute(e);
				} else e.startsWith(E) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (he.test(i.tagName)) {
					let e = i.textContent.split(E), t = e.length - 1;
					if (t > 0) {
						i.textContent = T ? T.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], ae()), M.nextNode(), c.push({
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
function N(e, t, n = e, r) {
	if (t === _e) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = oe(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = N(e, i._$AS(e, t.values), i, r)), t;
}
var Se = class {
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
		M.currentNode = r;
		let i = M.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Ce(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Oe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = M.nextNode(), a++);
		}
		return M.currentNode = D, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Ce = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = j, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = N(this, e, t), oe(e) ? e === j || e == null || e === "" ? (this._$AH !== j && this._$AR(), this._$AH = j) : e !== this._$AH && e !== _e && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ce(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== j && oe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(D.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = xe.createElement(ye(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Se(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = ve.get(e.strings);
		return t === void 0 && ve.set(e.strings, t = new xe(e)), t;
	}
	k(t) {
		se(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(ae()), this.O(ae()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = w(e).nextSibling;
			w(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, we = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = j, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = j;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = N(this, e, t, 0), a = !oe(e) || e !== this._$AH && e !== _e, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = N(this, r[n + o], t, o), s === _e && (s = this._$AH[o]), a ||= !oe(s) || s !== this._$AH[o], s === j ? e = j : e !== j && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === j ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Te = class extends we {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === j ? void 0 : e;
	}
}, Ee = class extends we {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== j);
	}
}, De = class extends we {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = N(this, e, t, 0) ?? j) === _e) return;
		let n = this._$AH, r = e === j && n !== j || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== j && (n === j || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Oe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		N(this, e);
	}
}, ke = C.litHtmlPolyfillSupport;
ke?.(xe, Ce), (C.litHtmlVersions ??= []).push("3.3.3");
var Ae = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Ce(t.insertBefore(ae(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, je = globalThis, P = class extends S {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ae(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return _e;
	}
};
P._$litElement$ = !0, P.finalized = !0, je.litElementHydrateSupport?.({ LitElement: P });
var Me = je.litElementPolyfillSupport;
Me?.({ LitElement: P }), (je.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/property.js
var Ne = {
	attribute: !0,
	type: String,
	converter: ee,
	reflect: !1,
	hasChanged: b
}, Pe = (e = Ne, t, n) => {
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
function F(e) {
	return (t, n) => typeof n == "object" ? Pe(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function I(e) {
	return F({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/@kipk/load-ha-components/dist/load-ha-components.js
var Fe = [
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
], Ie = async (e) => {
	let t = e || Fe;
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
}, Le = new Set(["unknown", "unavailable"]);
function Re(e) {
	return e == null || typeof e == "string" && Le.has(e);
}
function ze(e) {
	if (!(Re(e) || typeof e != "string" || e.trim() === "")) return e;
}
function Be(e) {
	if (Re(e)) return;
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (typeof e != "string" || e.trim() === "") return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function L() {
	return typeof performance < "u" ? performance.now() : Date.now();
}
function R(e, t, n) {
	e && console.debug("[ha-better-history][perf]", t, n);
}
async function Ve(e, t = {}) {
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
var He = 6e4, Ue = 3, We = 350, Ge = 360 * 60 * 1e3, Ke = 3600 * 1e3, qe = 720 * 60 * 1e3, Je = 2500, Ye = 8e3, Xe = 15e3, Ze = 300, Qe = 700, $e = 1100, et = 80;
function tt(e) {
	if (e.length <= 2) return e;
	let t = [e[0]];
	for (let n = 1; n < e.length - 1; n++) {
		let r = e[n], i = e[n - 1], a = e[n + 1];
		(r.value !== i.value || a.value !== r.value) && t.push(r);
	}
	return t.push(e[e.length - 1]), t;
}
var nt = class extends Error {
	constructor(e) {
		super(`History chunk timed out after ${e}ms`), this.name = "HistoryChunkTimeoutError";
	}
};
function rt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function it(e, t) {
	return t.reduce((e, t) => rt(e) ? e[t] : void 0, e);
}
function at(e) {
	return e[e.length - 1] ?? "";
}
function ot(e) {
	return e instanceof Error ? e.message : String(e);
}
function st(e) {
	if (!rt(e)) return;
	let t = e.status ?? e.statusCode ?? e.status_code;
	return typeof t == "number" ? t : void 0;
}
function ct(e) {
	if (!rt(e)) return "";
	let t = e.code;
	return typeof t == "string" ? t.toLowerCase() : "";
}
function lt(e) {
	if (e instanceof nt) return !0;
	let t = st(e);
	if (t !== void 0) return t === 408 || t === 429 || t >= 500;
	let n = ot(e).toLowerCase(), r = `${ct(e)} ${n}`;
	return r.includes("timeout") || r.includes("timed out") || r.includes("network") || r.includes("failed to fetch") || r.includes("connection") || r.includes("temporarily unavailable") || r.includes("unavailable") || r.includes("aborted");
}
function ut(e, t) {
	let n = Math.floor(Math.random() * Math.max(1, t));
	return t * 2 ** Math.max(0, e - 1) + n;
}
function dt(e) {
	return new Promise((t) => setTimeout(t, e));
}
function ft(e = 80) {
	let t = globalThis.requestIdleCallback;
	return t ? new Promise((n) => t(() => n(), { timeout: e })) : new Promise((e) => {
		typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => e()) : setTimeout(e, 0);
	});
}
async function pt(e, t) {
	let n;
	try {
		return await Promise.race([e, new Promise((e, r) => {
			n = setTimeout(() => r(new nt(t)), t);
		})]);
	} finally {
		n !== void 0 && clearTimeout(n);
	}
}
function mt(e) {
	if (typeof e == "number" && Number.isFinite(e)) return "number";
	if (typeof e == "boolean") return "boolean";
	if (typeof e == "string" && e !== "") return "string";
}
function ht(e) {
	let t = mt(Number.isFinite(Number(e.state)) ? Number(e.state) : e.state), n = e.attributes.unit_of_measurement;
	if (t) return {
		id: `state:${e.entity_id}`,
		kind: "entity_state",
		entityId: e.entity_id,
		label: e.attributes.friendly_name && typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id,
		valueType: t,
		unit: t === "number" && typeof n == "string" && n !== "" ? n : void 0
	};
}
function gt(e, t, n) {
	let r = mt(it(e.attributes, t));
	if (r) return {
		id: `attr:${e.entity_id}:${t.join(".")}`,
		kind: "entity_attribute",
		entityId: e.entity_id,
		label: n ?? at(t),
		path: t,
		valueType: r
	};
}
function _t(e, t) {
	return t === "number" ? Be(e) : t === "boolean" ? typeof e == "boolean" ? e : void 0 : ze(e);
}
function vt(e, t) {
	let n = e.attributes ?? e.a ?? {};
	return _t(t.kind === "entity_state" ? e.state ?? e.s : it(n, t.path ?? []), t.valueType);
}
function yt(e) {
	if (typeof e.lu == "number") return e.lu * 1e3;
	let t = e.last_changed ?? e.last_updated;
	return t ? Date.parse(t) : NaN;
}
function bt(e, t, n) {
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
function xt(e, t) {
	let n = /* @__PURE__ */ new Map();
	if (Array.isArray(e)) return e.forEach((e, r) => {
		let i = e[0]?.entity_id ?? t[r];
		i && n.set(i, e);
	}), n;
	for (let [t, r] of Object.entries(e)) Array.isArray(r) && n.set(t, r);
	return n;
}
function St(e, t, n = Date.now()) {
	let r = e.states[t.entityId];
	if (!r) return;
	let i = {
		entity_id: r.entity_id,
		state: r.state,
		last_changed: r.last_changed,
		last_updated: r.last_updated,
		attributes: r.attributes
	}, a = vt(i, t), o = yt(i), s = Number.isFinite(o) ? o : n;
	return a === void 0 || !Number.isFinite(s) ? void 0 : {
		time: s,
		value: a
	};
}
function Ct(e, t, n, r) {
	let i = St(e, t, n.getTime());
	return i ? [{
		time: n.getTime(),
		value: i.value
	}, {
		time: Math.min(r.getTime(), Date.now()),
		value: i.value
	}] : [];
}
var wt = class {
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
		return i ? Et(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : !1;
	}
	missingIntervals(e, t, n, r) {
		let i = this._entities.get(e);
		return Ot(i ? r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage] : [], t.getTime(), n.getTime()).map((e) => ({
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
		a.states = kt([...a.states, ...t]), a.stateCoverage = Tt([...a.stateCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}]), i === "full" && (a.fullCoverage = Tt([...a.fullCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}])), this._entities.set(e, a);
	}
	buildSeries(e, t, n, r) {
		let i = e.kind === "entity_attribute" ? "full" : "state", a = this.coverageEnd(e.entityId, n, r, i);
		return Pt(e, this._entities.get(e.entityId)?.states ?? [], t, n, new Date(a));
	}
	coverageEnd(e, t, n, r) {
		let i = this._entities.get(e);
		return i ? Dt(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : n.getTime();
	}
};
function Tt(e) {
	let t = e.filter((e) => e.endTime > e.startTime).sort((e, t) => e.startTime - t.startTime), n = [];
	for (let e of t) {
		let t = n[n.length - 1];
		t && e.startTime <= t.endTime + 1 ? t.endTime = Math.max(t.endTime, e.endTime) : n.push({ ...e });
	}
	return n;
}
function Et(e, t, n) {
	return Dt(e, t, n) >= n - 1;
}
function Dt(e, t, n) {
	if (n <= t) return n;
	let r = t;
	for (let t of Tt(e)) if (!(t.endTime < r)) {
		if (t.startTime > r + 1) break;
		if (r = Math.max(r, t.endTime), r >= n - 1) return n;
	}
	return r;
}
function Ot(e, t, n) {
	if (n <= t) return [];
	let r = [], i = t;
	for (let t of Tt(e)) if (!(t.endTime <= i) && (t.startTime > i + 1 && r.push({
		startTime: i,
		endTime: Math.min(t.startTime, n)
	}), i = Math.max(i, t.endTime), i >= n)) break;
	return i < n && r.push({
		startTime: i,
		endTime: n
	}), r;
}
function kt(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = yt(n);
		Number.isFinite(e) && t.set(e, n);
	}
	return [...t.entries()].sort(([e], [t]) => e - t).map(([, e]) => e);
}
function At(e, t) {
	let n = t.normalizeDurationMs + t.mergeDurationMs + t.buildDurationMs, r = t.stateCount >= Xe || t.requestDurationMs >= $e, i = r || t.stateCount >= Ye || t.requestDurationMs >= Qe || n >= et, a = t.stateCount <= Je && t.requestDurationMs <= Ze && n <= et / 2;
	return i && e > Ke ? {
		nextChunkMs: Math.max(Ke, Math.floor(e / (r ? 4 : 2))),
		reason: "decrease"
	} : a && e < qe ? {
		nextChunkMs: Math.min(qe, e * 2),
		reason: "increase"
	} : {
		nextChunkMs: e,
		reason: "keep"
	};
}
async function jt(e, t, n, r, i, a, o) {
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
async function Mt(e, t) {
	let n = 1;
	for (;;) {
		if (t.isCancelled?.()) throw Error("History request cancelled");
		let r = t.onPerformance ? L() : 0;
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
			let i = await pt(e(), t.timeoutMs);
			return t.onPerformance?.({
				event: "history.chunk_success",
				details: {
					taskId: t.taskId,
					attempt: n,
					durationMs: Math.round(L() - r)
				}
			}), i;
		} catch (e) {
			let i = lt(e), a = i && n < t.maxAttempts && !t.isCancelled?.();
			if (t.onPerformance?.({
				event: a ? "history.chunk_retry" : "history.chunk_error",
				details: {
					taskId: t.taskId,
					attempt: n,
					maxAttempts: t.maxAttempts,
					retryable: i,
					error: ot(e),
					durationMs: Math.round(L() - r)
				}
			}), !a) throw e;
			await dt(ut(n, t.retryBaseDelayMs)), n += 1;
		}
	}
}
async function Nt(e, t, n, r, i, a, o = {}) {
	if (!e.callWS && !e.callApi) throw Error("Home Assistant history API is unavailable");
	let s = [...new Set(t.map((e) => e.entityId))], c = new Set(t.filter((e) => e.kind === "entity_attribute").map((e) => e.entityId)), l = s.filter((e) => !c.has(e)), u = s.filter((e) => c.has(e)), d = o.accumulator ?? new wt(), f = [], p = Math.max(1, Math.floor(o.chunkTimeoutMs ?? He)), m = Math.max(1, Math.floor(o.maxChunkAttempts ?? Ue)), h = Math.max(0, Math.floor(o.chunkRetryBaseDelayMs ?? We)), g = (e, t) => Mt(t, {
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
	let ee = y.reduce((e, t) => {
		let n = t.end.getTime() - t.start.getTime();
		return e + Math.max(1, Math.ceil(n / Ge));
	}, 0), b = _.size + ee, x = 0, S = /* @__PURE__ */ new Set(), C = async (s, c, l) => {
		let u = x;
		if (x += 1, o.isCancelled?.()) return {
			stateCount: 0,
			requestDurationMs: Math.round(l),
			normalizeDurationMs: 0,
			mergeDurationMs: 0,
			buildDurationMs: 0
		};
		await ft();
		let f = L(), p = xt(c, s.entityIds), m = L() - f, h = [...p.values()].reduce((e, t) => e + t.length, 0);
		a?.({
			event: "history.batch",
			details: {
				batchIndex: u,
				batchCount: b,
				entityCount: s.entityIds.length,
				stateCount: h,
				requestDurationMs: Math.round(l),
				normalizeDurationMs: Math.round(m)
			}
		});
		let g = L(), _ = /* @__PURE__ */ new Set();
		for (let [e, t] of p) d.integrate(e, t, s.start, s.end, s.coverageKind), _.add(e), S.add(e);
		let v = L() - g;
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
			await ft();
			let o = L();
			for (let i of t) (_.has(i.entityId) || !w.has(i.id)) && (i.kind === "entity_attribute" ? d.hasFullStates(i.entityId) : d.hasStates(i.entityId)) && w.set(i.id, d.buildSeries(i, e, n, r));
			let s = t.map((e) => w.get(e.id)).filter((e) => e !== void 0);
			y = L() - o, a?.({
				event: "history.progress_series",
				details: {
					batchIndex: u,
					seriesCount: s.length,
					pointCount: s.reduce((e, t) => e + t.points.length, 0),
					buildDurationMs: Math.round(y)
				}
			}), i(s), await ft(120);
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
			run: () => g(i, () => jt(e, r, t.start, t.end, t.minimalResponse, t.noAttributes, t.significantChangesOnly))
		});
	}
	a?.({
		event: "history.start",
		details: {
			sourceCount: t.length,
			entityCount: s.length,
			batchCount: b,
			attributeChunkHours: Ge / 36e5,
			minAttributeChunkHours: Ke / 36e5,
			maxAttributeChunkHours: qe / 36e5,
			adaptiveAttributeChunks: y.length > 0,
			cachedSourceCount: t.filter((e) => d.hasCoverage(e.entityId, n, r, e.kind === "entity_attribute" ? "full" : "state")).length,
			chunkTimeoutMs: p,
			maxChunkAttempts: m,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}
	});
	let w = /* @__PURE__ */ new Map();
	for (let i of t) (i.kind === "entity_attribute" ? d.hasFullStates(i.entityId) : d.hasStates(i.entityId)) && w.set(i.id, d.buildSeries(i, e, n, r));
	await Ve(f, {
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
			await C(e, t, n);
		}
	});
	let T = 0;
	for (let t of y) {
		let n = Ge;
		for (let r = t.start.getTime(); r < t.end.getTime() && !o.isCancelled?.();) {
			let i = new Date(r), o = new Date(Math.min(r + n, t.end.getTime())), s = o.getTime() - i.getTime(), c = `attr:${t.entityId}:${i.toISOString()}:${o.toISOString()}`;
			a?.({
				event: "history.queue.task_start",
				details: {
					taskId: c,
					queuedCount: void 0,
					activeCount: 1,
					completedCount: T
				}
			});
			let l = L(), u = await g(c, () => jt(e, [t.entityId], i, o, !1, !1, !1)), d = L() - l;
			T += 1, a?.({
				event: "history.queue.task_complete",
				details: {
					taskId: c,
					queuedCount: void 0,
					activeCount: 0,
					completedCount: T
				}
			});
			let f = await C({
				id: c,
				entityIds: [t.entityId],
				start: i,
				end: o,
				coverageKind: "full"
			}, u, d), p = At(n, f);
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
	let te = a ? L() : 0, ne = t.map((t) => {
		let i = w.get(t.id);
		return i && !S.has(t.entityId) ? i : d.buildSeries(t, e, n, r);
	}), E = a ? L() - te : 0;
	return a?.({
		event: "history.final_series",
		details: {
			seriesCount: ne.length,
			pointCount: ne.reduce((e, t) => e + t.points.length, 0),
			buildDurationMs: Math.round(E)
		}
	}), ne;
}
function Pt(e, t, n, r, i) {
	let a = t.flatMap((t) => {
		let n = vt(t, e), r = yt(t);
		return n !== void 0 && Number.isFinite(r) ? [{
			time: r,
			value: n
		}] : [];
	});
	return {
		source: e,
		points: tt(a.length > 0 ? bt(a, r, i) : Ct(n, e, r, i))
	};
}
var Ft = 6e4, It = 48;
function Lt(e) {
	requestAnimationFrame(() => requestAnimationFrame(e));
}
function Rt(e) {
	return e instanceof Error ? e.message : String(e);
}
function zt(e) {
	return `${e.kind === "entity_attribute" ? "full" : "state"}:${e.entityId}`;
}
function Bt(e, t) {
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
function Vt(e, t) {
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
function Ht(e, t) {
	let n = e.findIndex((e) => e.time >= t);
	if (n === -1) return e.length > 1 ? [e[e.length - 1]] : e;
	let r = Math.max(0, n - 1);
	return r === 0 ? e : e.slice(r);
}
var Ut = class {
	constructor(e) {
		this.series = [], this.loading = !1, this.error = "", this.debugPerformance = !1, this._prevKey = "", this._nextSessionId = 0, this._progressUpdateScheduled = !1, this._lastProgressUpdateMs = 0, this.host = e, e.addController(this);
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
			accumulator: new wt()
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
		return (e.activeEntityLoads.get(zt(t)) ?? 0) > 0;
	}
	_beginLoad(e, t) {
		e.activeLoads += 1;
		for (let n of t) {
			e.sourceStates.set(n.id, "loading");
			let t = zt(n);
			e.activeEntityLoads.set(t, (e.activeEntityLoads.get(t) ?? 0) + 1);
		}
	}
	_completeLoad(e, t) {
		e.activeLoads = Math.max(0, e.activeLoads - 1);
		for (let n of t) {
			let t = zt(n), r = Math.max(0, (e.activeEntityLoads.get(t) ?? 0) - 1);
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
		let t = L() - this._lastProgressUpdateMs, n = Math.max(0, It - t);
		setTimeout(() => {
			requestAnimationFrame(() => {
				this._progressUpdateScheduled = !1, this._isCurrentSession(e) && (this._lastProgressUpdateMs = L(), this.host.requestUpdate());
			});
		}, n);
	}
	fetch(e, t, n, r) {
		let i = `${t.map((e) => e.id).join("|")}|${n.getTime()}|${r.getTime()}`;
		if (i === this._prevKey && !this.error) return;
		if (this._prevKey = i, t.length === 0) {
			this.series = [], this.loading = !1, this.error = "", this.host.requestUpdate();
			return;
		}
		if (!e) {
			this.series = [], this.loading = !1, this.error = "No hass object", this.host.requestUpdate();
			return;
		}
		let a = this._createSession(t, n, r), o = L();
		this.series = [], this.loading = !0, this.error = "", this._beginLoad(a, t), this.debugPerformance && R(this.debugPerformance, "controller.fetch_start", {
			sessionId: a.id,
			sourceCount: t.length,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}), this.host.requestUpdate(), Nt(e, a.sources, n, r, (t) => {
			if (!this._isCurrentSession(a)) return;
			let i = L(), o = this._availableSessionSeries(a, e, n, r, t);
			this.series = this._mergeSeries(this.series.filter((e) => !a.sources.some((t) => t.id === e.source.id)), o);
			for (let e of o) a.sourceStates.set(e.source.id, "partial");
			this._requestProgressUpdate(a), this.debugPerformance && R(this.debugPerformance, "controller.progress_update", {
				sessionId: a.id,
				sourceCount: t.length,
				pointCount: t.reduce((e, t) => e + t.points.length, 0),
				updateDurationMs: Math.round(L() - i)
			});
		}, this.debugPerformance ? (e) => {
			R(this.debugPerformance, e.event, e.details);
		} : void 0, {
			isCancelled: () => !this._isCurrentSession(a),
			chunkTimeoutMs: Ft,
			accumulator: a.accumulator
		}).then((i) => {
			this._isCurrentSession(a) && Lt(() => {
				if (!this._isCurrentSession(a)) return;
				let s = L(), c = this._availableSessionSeries(a, e, n, r, i), l = this._mergeSeries(this.series.filter((e) => !a.sources.some((t) => t.id === e.source.id)), c);
				Bt(this.series, l) || (this.series = l);
				for (let e of c) a.sourceStates.set(e.source.id, "ready");
				this._completeLoad(a, t), this.host.requestUpdate(), this.debugPerformance && R(this.debugPerformance, "controller.fetch_complete", {
					sessionId: a.id,
					sourceCount: i.length,
					pointCount: i.reduce((e, t) => e + t.points.length, 0),
					totalDurationMs: Math.round(L() - o),
					updateDurationMs: Math.round(L() - s)
				});
			});
		}).catch((e) => {
			if (this._isCurrentSession(a)) {
				for (let e of t) a.sourceStates.set(e.id, "error");
				this.error = Rt(e), this._completeLoad(a, t), this.host.requestUpdate(), this.debugPerformance && R(this.debugPerformance, "controller.fetch_error", {
					sessionId: a.id,
					totalDurationMs: Math.round(L() - o),
					error: this.error
				});
			}
		});
	}
	setImportedSeries(e, t, n) {
		this._cancelSession(), this.series = e, this.loading = !1, this.error = "", this._prevKey = `${e.map((e) => e.source.id).join("|")}|${t.getTime()}|${n.getTime()}`, this.host.requestUpdate();
	}
	setError(e) {
		this._cancelSession(), this.loading = !1, this.error = e, this.host.requestUpdate();
	}
	addSources(e, t, n, r) {
		if (!e || t.length === 0) return;
		let i = this._activeSession(n, r) ?? this._createSession(this.series.map((e) => e.source), n, r), a = new Set([...this.series.map((e) => e.source.id), ...i.sourceStates.keys()]), o = t.filter((e) => !a.has(e.id));
		if (o.length === 0) return;
		let s = new Set(i.activeEntityLoads.keys());
		this._addSessionSources(i, o);
		let c = o.filter((e) => !this._hasActiveEntityLoad(i, e)), l = new Set(c.map((e) => e.id)), u = i.sources.filter((e) => l.has(e.id) || !s.has(zt(e))), d = L();
		for (let e of o) i.sourceStates.set(e.id, c.includes(e) ? "queued" : "loading");
		if (c.length === 0) {
			let t = this._availableSessionSeries(i, e, n, r, []);
			if (t.length > 0) {
				this._mergePartial(t);
				for (let e of t) i.sourceStates.set(e.source.id, "partial");
			}
			this.loading = i.activeLoads > 0, this._requestProgressUpdate(i), this.debugPerformance && R(this.debugPerformance, "controller.add_sources_joined_active_load", {
				sessionId: i.id,
				sourceCount: o.length,
				existingSourceCount: this.series.length
			});
			return;
		}
		this.loading = !0, this._beginLoad(i, c), this.debugPerformance && R(this.debugPerformance, "controller.add_sources_start", {
			sessionId: i.id,
			sourceCount: c.length,
			joinedActiveSourceCount: o.length - c.length,
			existingSourceCount: this.series.length,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}), this.host.requestUpdate(), Nt(e, u, n, r, (t) => {
			if (!this._isCurrentSession(i)) return;
			let a = L(), o = this._availableSessionSeries(i, e, n, r, t);
			this._mergePartial(o);
			for (let e of o) i.sourceStates.set(e.source.id, "partial");
			this._requestProgressUpdate(i), this.debugPerformance && R(this.debugPerformance, "controller.add_sources_progress", {
				sessionId: i.id,
				sourceCount: t.length,
				pointCount: t.reduce((e, t) => e + t.points.length, 0),
				mergeDurationMs: Math.round(L() - a)
			});
		}, this.debugPerformance ? (e) => {
			R(this.debugPerformance, e.event, e.details);
		} : void 0, {
			isCancelled: () => !this._isCurrentSession(i),
			chunkTimeoutMs: Ft,
			accumulator: i.accumulator
		}).then((t) => {
			this._isCurrentSession(i) && Lt(() => {
				if (!this._isCurrentSession(i)) return;
				let a = L(), o = this._availableSessionSeries(i, e, n, r, t), s = this._mergeSeries(this.series, o);
				Bt(this.series, s) || (this.series = s);
				for (let e of o) i.sourceStates.set(e.source.id, "ready");
				this._completeLoad(i, c), this.host.requestUpdate(), this.debugPerformance && R(this.debugPerformance, "controller.add_sources_complete", {
					sessionId: i.id,
					sourceCount: t.length,
					pointCount: t.reduce((e, t) => e + t.points.length, 0),
					totalDurationMs: Math.round(L() - d),
					mergeDurationMs: Math.round(L() - a)
				});
			});
		}).catch((e) => {
			if (this._isCurrentSession(i)) {
				for (let e of c) i.sourceStates.set(e.id, "error");
				this.error = Rt(e), this._completeLoad(i, c), this.host.requestUpdate(), this.debugPerformance && R(this.debugPerformance, "controller.add_sources_error", {
					sessionId: i.id,
					totalDurationMs: Math.round(L() - d),
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
			let r = St(e, n, a);
			if (!r) return t;
			let c = {
				...r,
				time: Math.min(Math.max(r.time, i), a)
			}, l = Ht(Vt(t.points, c), i);
			return l === t.points ? t : (o = !0, {
				...t,
				points: l
			});
		});
		o && (this.series = c, this.host.requestUpdate());
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
		this.series = this.series.filter((e) => !t.has(e.source.id));
		for (let t of e) this._session?.sourceStates.delete(t);
		this._prevKey = this.series.map((e) => e.source.id).join("|") + "|", this.host.requestUpdate();
	}
}, Wt = [
	"#ff9800",
	"#42a5f5",
	"#66bb6a",
	"#ec407a",
	"#ab47bc",
	"#26a69a"
], Gt = {
	current_temperature: "#42a5f5",
	temperature: "#ff9800"
}, Kt = new Set(Object.values(Gt)), z = Wt.filter((e) => !Kt.has(e));
function qt(e) {
	return z[e % z.length];
}
function Jt(e) {
	return e.trim().toLowerCase();
}
function Yt(e) {
	return `hsl(${(e * 137.508 % 360).toFixed(1)} 68% 52%)`;
}
function Xt(e, t, n) {
	if (!t.has(Jt(e))) return e;
	let r = [
		...z.slice(n % z.length),
		...z.slice(0, n % z.length),
		...Wt
	];
	for (let e of r) if (!t.has(Jt(e))) return e;
	let i = n, a = Yt(i);
	for (; t.has(Jt(a));) i += 1, a = Yt(i);
	return a;
}
function Zt(e) {
	return Jt(e);
}
var Qt = 214;
function $t(e) {
	if (!Number.isFinite(e) || Number.isInteger(e)) return 0;
	let t = e.toString().toLowerCase();
	if (t.includes("e-")) {
		let [e, n] = t.split("e-"), r = e.split(".")[1]?.length ?? 0;
		return Math.min(r + Number(n), 4);
	}
	return Math.min(t.split(".")[1]?.length ?? 0, 4);
}
function en(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
function tn(e, t, n = 5) {
	if (!Number.isFinite(e) || !Number.isFinite(t)) return [e, t];
	let r = Math.abs(t - e);
	if (r < 1e-10) return [e];
	let i = nn(r / (Math.max(n, 2) - 1)), a = Math.floor(e / i) * i, o = Math.ceil(t / i) * i, s = i * 1e-8, c = [];
	for (let e = a; e <= o + s; e += i) c.push(rn(e, i));
	return c;
}
function nn(e) {
	if (e <= 0) return 1;
	let t = Math.floor(Math.log10(Math.abs(e))), n = e / 10 ** t, r;
	return r = n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10, r * 10 ** t;
}
function rn(e, t) {
	let n = Math.max(0, -Math.floor(Math.log10(Math.abs(t) || 1)) + 1);
	return parseFloat(e.toFixed(n));
}
function an(e) {
	let t = 0;
	for (let n of e) {
		let e = String(n), r = e.indexOf(".");
		r !== -1 && (t = Math.max(t, e.length - r - 1));
	}
	return t;
}
function on(e, t, n) {
	let r = t - e;
	if (r < 1e-6) {
		let r = Math.max(Math.abs(t) * .05, 1);
		return {
			min: en(e - r, n),
			max: en(t + r, n)
		};
	}
	let i = Math.max(r * .08, 10 ** -n), a = 10 ** n, o = Math.ceil(i * a) / a;
	return {
		min: en(e - o, n),
		max: en(t + o, n)
	};
}
function sn(e) {
	return 28 + (Math.max(e, 1) - 1) * Qt + 180 + 18;
}
var cn = .15, ln = 8;
function un(e) {
	return Math.max(e.max - e.min, 1e-9);
}
function dn(e) {
	return (e.min + e.max) / 2;
}
function fn(e) {
	return Math.log10(Math.max(Math.abs(e), 1e-9));
}
function pn(e, t) {
	let n = Math.abs(fn(un(e)) - fn(un(t))), r = Math.abs(fn(dn(e)) - fn(dn(t))), i = e.unit && t.unit && e.unit !== t.unit ? .4 : 0;
	return n + r * .6 + i;
}
function mn(e) {
	if (e.length < 2) return !1;
	let t = Math.min(...e.map((e) => e.min)), n = Math.max(...e.map((e) => e.max)), r = Math.max(n - t, 1e-9), i = e.map((e) => e.max - e.min).filter((e) => e > 1e-6);
	if (i.length < 2) return !1;
	let a = Math.min(...i), o = Math.max(...i);
	return Math.min(...i.map((e) => e / r)) <= cn && (o / Math.max(a, 1e-9) >= ln || r / a >= ln);
}
function hn(e) {
	let t = e[0], n = e[1], r = -Infinity;
	for (let i = 0; i < e.length; i++) for (let a = i + 1; a < e.length; a++) {
		let o = pn(e[i], e[a]);
		o > r && (r = o, t = e[i], n = e[a]);
	}
	return t.order <= n.order ? [t, n] : [n, t];
}
function gn(e) {
	if (!mn(e)) return [e, []];
	let [t, n] = hn(e), r = [], i = [];
	for (let a of e) a.id === t.id ? r.push(a) : a.id === n.id ? i.push(a) : pn(a, t) <= pn(a, n) ? r.push(a) : i.push(a);
	return [r, i];
}
function _n(e, t, n, r) {
	let i = Math.min(...n.map((e) => e.min)), a = Math.max(...n.map((e) => e.max)), o = Math.max(...n.map((e) => e.precision)), s = on(i, a, o), c = tn(s.min, s.max);
	return {
		ids: new Set(n.map((e) => e.id)),
		graphKey: e,
		axis: t,
		min: s.min,
		max: s.max,
		precision: Math.max(o, an(c)),
		ticks: c,
		top: r,
		height: 180
	};
}
function vn(e) {
	let t = [];
	for (let [n, r] of e.entries()) {
		if (r.valueType !== "number" && r.valueType !== "boolean") continue;
		let e = r.points.map((e) => Number(e.value)).filter((e) => Number.isFinite(e)), i = r.scaleMode === "manual" && r.scaleMin !== void 0 ? r.scaleMin : 0, a = r.scaleMode === "manual" && r.scaleMax !== void 0 ? r.scaleMax : 1, o = r.valueType === "boolean" ? 0 : e.length > 0 ? Math.min(...e) : Math.min(i, a), s = r.valueType === "boolean" ? 1 : e.length > 0 ? Math.max(...e) : Math.max(i, a), c = r.valueType === "boolean" || e.length === 0 ? 0 : Math.max(...e.map((e) => $t(e))), l = r.valueType === "boolean" ? "group:boolean" : r.scaleGroupKey, u = t.find((e) => e.key === l);
		u || (u = {
			key: l,
			series: []
		}, t.push(u)), r.scaleMode === "manual" && (r.scaleMin !== void 0 && (o = Math.min(o, r.scaleMin)), r.scaleMax !== void 0 && (s = Math.max(s, r.scaleMax))), u.series.push({
			id: r.id,
			unit: r.unit,
			min: o,
			max: s,
			precision: c,
			order: n
		});
	}
	return t.flatMap((e, t) => {
		let [n, r] = e.key === "group:boolean" ? [e.series, []] : gn(e.series), i = 28 + t * Qt, a = _n(e.key, "left", n, i);
		return r.length > 0 ? [a, _n(e.key, "right", r, i)] : [a];
	});
}
function yn(e, t, n, r) {
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
function bn(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function xn(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function Sn(e, t) {
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
function Cn(e) {
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
function wn(e, t, n) {
	let r = Cn(e);
	if (!r) return [];
	let i = e.find((e) => e.id === r.tempId), a = e.find((e) => e.id === r.hvacId);
	if (!i || !a) return [];
	let o = t.find((e) => e.ids.has(i.id));
	if (!o) return [];
	let s = i.points.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time);
	return s.length === 0 ? [] : Tn(a.points, n).filter((e) => e.value === "heating").reduce((e, t) => {
		let n = e[e.length - 1];
		return n && Math.abs(n.end - t.start) < 1 ? n.end = t.end : e.push({
			start: t.start,
			end: t.end
		}), e;
	}, []).flatMap(({ start: e, end: t }, r) => {
		let i = [
			{
				time: e,
				value: Sn(s, e)
			},
			...s.filter((n) => n.time > e && n.time < t),
			{
				time: t,
				value: Sn(s, t)
			}
		].filter((e) => e.value !== void 0);
		if (i.length === 0) return [];
		let c = o.top + o.height, l = [
			`${bn(e, n).toFixed(1)},${c.toFixed(1)}`,
			...i.map((e) => `${bn(e.time, n).toFixed(1)},${xn(e.value, o).toFixed(1)}`),
			`${bn(t, n).toFixed(1)},${c.toFixed(1)}`
		].join(" ");
		return [{
			id: `${a.id}:heat:${r}`,
			points: l
		}];
	});
}
function Tn(e, t) {
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
function B(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function V(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function En(e, t) {
	return t.find((t) => t.ids.has(e.id));
}
function Dn(e, t) {
	return On(e, t, !0);
}
function On(e, t, n) {
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
var kn = new Set([
	"off",
	"idle",
	"none",
	"false"
]);
function An(e, t, n, r) {
	if (typeof e == "boolean") return e ? t : "var(--better-history-muted-color, var(--secondary-text-color, #888))";
	let i = String(e);
	return kn.has(i.toLowerCase()) ? "var(--better-history-muted-color, var(--secondary-text-color, #888))" : (n.has(i) || n.set(i, Wt[(r + n.size) % Wt.length]), n.get(i));
}
function jn(e, t) {
	return e + 34 + Math.max(t - 1, 0) * 14;
}
function Mn(e, t, n, r) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode === "column") return [];
		let i = En(e, t);
		if (!i) return [];
		let a = yn(Nn(e.points, n, e.lineMode, r), n, 40, 640), { points: o, pathLength: s } = e.lineMode === "line" ? Vn(a, n, i) : Bn(a, n, i);
		return [{
			id: e.id,
			color: e.color,
			points: o,
			pathLength: s,
			lineWidth: e.lineWidth
		}];
	});
}
function Nn(e, t, n, r) {
	let i = e.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time), a = i.filter((e) => e.time >= t.start && e.time <= t.end);
	if (n === "line") return Fn(i, a, t);
	let o = [...i].reverse().find((e) => e.time < t.start), s = o && (a.length === 0 || a[0].time > t.start) ? [{
		time: t.start,
		value: o.value
	}, ...a] : a, c = s[s.length - 1];
	return r.extendStairToEnd && c && c.time < t.end ? [...s, {
		time: t.end,
		value: c.value
	}] : s;
}
function Pn(e, t, n) {
	if (!e || !t || e.time === t.time || e.time > n || t.time < n) return;
	let r = (n - e.time) / (t.time - e.time);
	return {
		time: n,
		value: e.value + (t.value - e.value) * r
	};
}
function Fn(e, t, n) {
	let r = [...e].reverse().find((e) => e.time < n.start), i = e.find((e) => e.time > n.start), a = [...e].reverse().find((e) => e.time < n.end), o = e.find((e) => e.time > n.end), s = t[0]?.time === n.start ? void 0 : Pn(r, i, n.start), c = t[t.length - 1]?.time === n.end ? void 0 : Pn(a, o, n.end);
	return [
		s,
		...t,
		c
	].filter((e) => e !== void 0);
}
function In(e) {
	return e.min <= 0 && e.max >= 0 ? 0 : e.min > 0 ? e.min : e.max;
}
function Ln(e, t, n, r) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode !== "column") return [];
		let i = En(e, t);
		if (!i) return [];
		let a = V(In(i), i);
		return On(e, n, r.extendColumnToEnd).flatMap((t, r) => {
			let o = Number(t.value);
			if (!Number.isFinite(o)) return [];
			let s = B(t.start, n), c = B(t.end, n), l = V(o, i), u = Math.max(c - s, 1);
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
function Rn(e, t, n) {
	let r = t + 10, i = 0;
	return e.flatMap((e, t) => {
		if (e.valueType === "number" || e.valueType === "boolean") return [];
		let a = r + i * 14;
		i += 1;
		let o = /* @__PURE__ */ new Map();
		return Dn(e, n).reduce((n, r) => {
			let i = An(r.value, e.color, o, t), a = n[n.length - 1];
			return a && a.fill === i && Math.abs(a.end - r.start) < 1 ? a.end = r.end : n.push({
				start: r.start,
				end: r.end,
				fill: i
			}), n;
		}, []).map((t, r) => {
			let i = B(t.start, n), o = Math.max(B(t.end, n) - i, 1);
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
function zn(e) {
	return e.flatMap((e) => {
		let t = e.height - 10;
		return e.ticks.map((n) => ({
			y: e.top + 5 + t - (n - e.min) / (e.max - e.min) * t,
			value: Hn(n, e.precision)
		}));
	});
}
function Bn(e, t, n) {
	if (e.length === 0) return {
		points: "",
		pathLength: 0
	};
	if (e.length === 1) return {
		points: `${B(e[0].time, t).toFixed(1)},${V(e[0].value, n).toFixed(1)}`,
		pathLength: 0
	};
	let r = [], i = 0;
	for (let a = 0; a < e.length - 1; a++) {
		let o = e[a], s = e[a + 1], c = B(o.time, t), l = V(o.value, n), u = B(s.time, t), d = V(s.value, n);
		a === 0 && r.push(`${c.toFixed(1)},${l.toFixed(1)}`), r.push(`${u.toFixed(1)},${l.toFixed(1)}`), r.push(`${u.toFixed(1)},${d.toFixed(1)}`), i += Math.abs(u - c) + Math.abs(d - l);
	}
	return {
		points: r.join(" "),
		pathLength: i
	};
}
function Vn(e, t, n) {
	if (e.length === 0) return {
		points: "",
		pathLength: 0
	};
	let r = 0, i;
	return {
		points: e.map((e) => {
			let a = B(e.time, t), o = V(e.value, n);
			return i && (r += Math.hypot(a - i.x, o - i.y)), i = {
				x: a,
				y: o
			}, `${a.toFixed(1)},${o.toFixed(1)}`;
		}).join(" "),
		pathLength: r
	};
}
function Hn(e, t) {
	return t <= 0 && Number.isInteger(e) ? String(e) : e.toFixed(t);
}
var Un = 60 * 1e3, H = 60 * Un, U = 24 * H, Wn = [
	10 * Un,
	15 * Un,
	20 * Un,
	30 * Un,
	H,
	2 * H,
	3 * H,
	4 * H,
	6 * H,
	8 * H,
	12 * H,
	U,
	2 * U,
	3 * U,
	7 * U,
	14 * U,
	30 * U,
	60 * U,
	90 * U
];
function Gn(e, t) {
	for (let n of Wn) if (e / n <= t) return n;
	return Wn[Wn.length - 1];
}
function Kn(e, t, n = 12) {
	let r = t - e;
	if (r <= 0) return [];
	let i = Gn(r, n), a = [], o = Math.ceil(e / i) * i;
	for (let e = o; e < t; e += i) {
		let t = new Date(e);
		a.push({
			time: e,
			bold: t.getHours() === 0 && t.getMinutes() === 0
		});
	}
	return a;
}
function qn(e, t) {
	let n = new Date(e), r = t / U;
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
function Jn(e, t) {
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
function Yn(e, t) {
	return e.map((e) => ({
		...e,
		points: Jn(e.points, t)
	}));
}
function Xn(e) {
	return e.valueType === "boolean" ? "group:boolean" : e.scaleGroupKey;
}
function Zn(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	for (let t of e) {
		if (t.valueType !== "number" && t.valueType !== "boolean") continue;
		let e = Xn(t);
		i.set(e, [...i.get(e) ?? [], t]);
	}
	for (let e of t) {
		if (e.valueType !== "number" && e.valueType !== "boolean") continue;
		let t = Xn(e);
		r.set(t, [...r.get(t) ?? [], e]);
	}
	return [...i.entries()].flatMap(([e, t]) => Yn(r.get(e) ?? t, n));
}
function Qn(e, t, n, r = !1, i = 12, a = !0) {
	let o = { extendStairToEnd: a }, s = { extendColumnToEnd: a }, c = vn(Zn(e, t, n)), l = new Set(c.map((e) => e.graphKey)).size, u = sn(l), d = e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").length, f = Kn(n.start, n.end, i), p = n.end - n.start;
	return {
		allSeries: e,
		visibleSeries: t,
		timeBounds: n,
		extendStairToEnd: a,
		numericScales: c,
		plotBottom: u,
		chartHeight: jn(u, d),
		numericLines: Mn(t, c, n, o),
		numericColumns: Ln(t, c, n, s),
		segments: Rn(t, u, n),
		heatingAreas: r ? [] : wn(t, c, n),
		yAxisLabels: zn(c),
		xAxisLabels: f.map((e) => ({
			x: B(e.time, n),
			label: qn(e.time, p),
			bold: e.bold
		}))
	};
}
function $n(e, t, n, r, i) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode !== "column").flatMap((e) => {
		let a = En(e, t);
		if (!a) return [];
		let o = {
			...a,
			top: 28,
			height: i
		}, s = yn(Nn(e.points, n, e.lineMode, r), n, 40, 640), { points: c, pathLength: l } = e.lineMode === "line" ? Vn(s, n, o) : Bn(s, n, o);
		return {
			id: e.id,
			color: e.color,
			points: c,
			pathLength: l,
			lineWidth: e.lineWidth
		};
	});
}
function er(e, t, n, r, i) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode === "column").flatMap((e) => {
		let a = En(e, t);
		if (!a) return [];
		let o = {
			...a,
			top: 28,
			height: r
		}, s = V(In(o), o);
		return On(e, n, i.extendColumnToEnd).flatMap((t, r) => {
			let i = Number(t.value);
			if (!Number.isFinite(i)) return [];
			let a = B(t.start, n), c = B(t.end, n), l = V(i, o);
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
function tr(e, t, n) {
	return e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").flatMap((e, r) => {
		let i = t + r * 14, a = /* @__PURE__ */ new Map();
		return Dn(e, n).reduce((t, n) => {
			let i = An(n.value, e.color, a, r), o = t[t.length - 1];
			return o && o.fill === i && Math.abs(o.end - n.start) < 1 ? o.end = n.end : t.push({
				start: n.start,
				end: n.end,
				fill: i
			}), t;
		}, []).map((t, r) => {
			let a = B(t.start, n), o = Math.max(B(t.end, n) - a, 1);
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
function nr(e) {
	return e >= 160 ? 5 : e >= 100 ? 4 : e >= 64 ? 3 : 2;
}
function rr(e, t) {
	let n = t - 10, r = nr(t), i = e.ticks.length <= r ? e.ticks : tn(e.min, e.max, r), a = e.ticks === i ? e.precision : Math.max(e.precision, an(i));
	return i.map((t) => ({
		y: 33 + n - (t - e.min) / (e.max - e.min) * n,
		value: Hn(t, a)
	}));
}
function ir(e, t, n) {
	let r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
	return {
		allSeries: e.map((e, t) => {
			let a = Xt(e.color, r, n * Wt.length + t);
			return r.add(Zt(a)), i.set(e.id, a), a === e.color ? e : {
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
function ar(e, t = 12, n = 180) {
	let r = [], i = e.timeBounds, a = e.allSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), o = e.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), s = i.end - i.start, c = Kn(i.start, i.end, t).map((e) => ({
		x: B(e.time, i),
		label: qn(e.time, s),
		bold: e.bold
	}));
	if (e.numericScales.length === 0 && a.length > 0) {
		let e = o.length, t = 28 + n + 16 + 6, s = e > 0 ? 22 + e * 14 : 0, l = 28 + n + s + 18, u = l + 16, d = ir(a, o, 0);
		r.push({
			series: d.visibleSeries,
			allSeries: d.allSeries,
			scales: [],
			graphHeight: n,
			svgHeight: l,
			canvasHeight: u,
			lines: [],
			columns: [],
			segments: tr(d.visibleSeries, t, i),
			yLabels: [],
			rightYLabels: [],
			xLabels: c,
			heatingAreas: []
		});
	}
	let l = [...new Set(e.numericScales.map((e) => e.graphKey))];
	for (let t = 0; t < l.length; t++) {
		let s = l[t], u = e.numericScales.filter((e) => e.graphKey === s), d = u.find((e) => e.axis === "left") ?? u[0], f = u.find((e) => e.axis === "right"), p = new Set(u.flatMap((e) => [...e.ids])), m = e.allSeries.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && Xn(e) === s), h = e.visibleSeries.filter((e) => p.has(e.id)), g = t === 0 ? [...h, ...o] : h, _ = ir(t === 0 ? [...m, ...a] : m, g, t), v = _.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), y = v.length, ee = 28 + n + 16 + 6, b = y > 0 ? 22 + y * 14 : 0, x = 28 + n + b + 18, S = x + 16, C = rr(d, n), w = f ? rr(f, n) : [], T = u.map((e) => ({
			...e,
			top: 28,
			height: n
		})), te = T.find((e) => e.axis === "left") ?? T[0];
		r.push({
			series: _.visibleSeries,
			allSeries: _.allSeries,
			scale: te,
			scales: T,
			graphHeight: n,
			svgHeight: x,
			canvasHeight: S,
			lines: $n(_.visibleSeries, T, i, { extendStairToEnd: e.extendStairToEnd }, n),
			columns: er(_.visibleSeries, T, i, n, { extendColumnToEnd: e.extendStairToEnd }),
			segments: tr(v, ee, i),
			yLabels: C,
			rightYLabels: w,
			xLabels: c,
			heatingAreas: e.heatingAreas.length > 0 ? wn(e.visibleSeries, T, i) : []
		});
	}
	return r;
}
var or = class {
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
		if (!t) {
			this._clear();
			return;
		}
		this._pendingPoint = t, this._frame === void 0 && (this._frame = requestAnimationFrame(() => {
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
			x: B(i, this._timeBounds),
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
	_svgPoint(e) {
		let t = e.currentTarget;
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
		if (!this.tooltip) return j;
		let e = this.tooltip.activeLeft + (this.tooltip.x - 40) / 640 * this.tooltip.activeWidth, t = this.tooltip.activeLeft + (this.tooltip.tooltipX - 40) / 640 * this.tooltip.activeWidth, n = this.tooltip.placement === "above" ? "translate(-50%, calc(-100% - 10px))" : "translate(-50%, 10px)";
		return k`
      <div class="tooltip-axis-pointer" style=${`left:${e.toFixed(1)}px;top:${this.tooltip.activeTop.toFixed(1)}px;height:${this.tooltip.activeHeight.toFixed(1)}px;`}></div>
      <div
        class="tooltip"
        style=${`left:clamp(150px,${t.toFixed(1)}px,calc(100% - 150px));top:${this.tooltip.y.toFixed(1)}px;transform:${n};`}
      >
        <div class="tooltip-time">${new Date(this.tooltip.time).toLocaleString()}</div>
        ${this.tooltip.values.map((e) => k`
            <div class="tooltip-row">
              <span class="tooltip-dot" style=${`background:${e.color}`}></span>
              <span class="tooltip-label">${e.label}</span>
              <span>${e.value}</span>
            </div>
          `)}
      </div>
    `;
	}
}, sr = "temperature";
function cr(e) {
	return e.join(".");
}
function lr(e) {
	return e?.toLowerCase() === sr;
}
function ur(e, t) {
	if (!e || !t) return;
	let n = t[cr(e)];
	return typeof n == "string" && n !== "" ? n : void 0;
}
function dr(e) {
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
var fr = 24, pr = "2.5", mr = [
	"current_temperature",
	"temperature",
	"hvac_action"
], hr = /°[CF]|[CFK]$/;
function gr(e) {
	return hr.test(e);
}
function _r(e) {
	return e.scaleMode === "manual" && (e.scaleMin !== void 0 || e.scaleMax !== void 0);
}
function vr(e) {
	return /* @__PURE__ */ new Date(Math.floor(e.getTime() / 1e3) * 1e3);
}
function yr(e) {
	if (e !== void 0) return Array.isArray(e) ? e : e.split(".");
}
function br(e) {
	return e === "line" || e === "column" ? e : "stair";
}
function xr(e) {
	return typeof e == "number" ? Number.isFinite(e) && e >= 0 ? String(e) : pr : typeof e == "string" && e.trim() !== "" ? e.trim() : pr;
}
function Sr(e, t) {
	return t ? `attr:${e}:${t.join(".")}` : `state:${e}`;
}
function Cr(e) {
	return e[e.length - 1] ?? "";
}
function wr(e, t, n) {
	let r = e?.states[t];
	return r ? n ? gt(r, n)?.valueType ?? "string" : ht(r)?.valueType ?? "string" : "number";
}
function Tr(e, t, n, r) {
	if (r) return r;
	if (n) return Cr(n);
	let i = e?.states[t]?.attributes.friendly_name;
	return typeof i == "string" && i !== "" ? i : t;
}
function Er(e, t, n, r, i) {
	if (r !== void 0) return r || void 0;
	if (n) return ur(n, i);
	let a = e?.states[t]?.attributes.unit_of_measurement;
	return typeof a == "string" && a !== "" ? a : void 0;
}
function Dr(e, t, n, r) {
	return n ? `group:${n}` : r === "number" && t ? `unit:${t}` : `series:${e}`;
}
function Or(e, t, n, r, i, a) {
	let o = yr(e.attribute), s = Sr(e.entity, o), c = wr(n, e.entity, o), l = Er(n, e.entity, o, e.unit, r);
	return {
		id: s,
		entity: e.entity,
		attribute: o,
		forced: e.forced ?? !0,
		label: Tr(n, e.entity, o, e.label),
		color: e.color ?? qt(t),
		unit: l,
		scaleGroupKey: Dr(s, l, e.scaleGroup, c),
		scaleMode: e.scaleMode ?? "auto",
		scaleMin: e.scaleMin,
		scaleMax: e.scaleMax,
		lineMode: br(e.lineMode ?? i),
		lineWidth: xr(e.lineWidth ?? a),
		valueType: c
	};
}
function kr(e, t, n, r, i) {
	let a = n?.states[e];
	if (!a) {
		let n = `state:${e}`;
		return {
			id: n,
			entity: e,
			forced: !0,
			label: e,
			color: qt(t),
			scaleGroupKey: `series:${n}`,
			scaleMode: "auto",
			lineMode: br(r),
			lineWidth: xr(i),
			valueType: "number"
		};
	}
	let o = ht(a);
	if (o) return {
		id: o.id,
		entity: e,
		forced: !0,
		label: o.label,
		color: qt(t),
		unit: o.unit,
		scaleGroupKey: Dr(o.id, o.unit, void 0, o.valueType),
		scaleMode: "auto",
		lineMode: br(r),
		lineWidth: xr(i),
		valueType: o.valueType
	};
}
function Ar(e, t) {
	let n = t?.states[e];
	if (!n) return;
	let r = n.attributes, i = r.temperature_unit;
	if (typeof i == "string" && i !== "") return i;
	let a = r.unit_of_measurement;
	if (typeof a == "string" && a !== "") return a;
}
function jr(e, t, n) {
	if (e.attribute || !e.entity.startsWith("climate.") || !n?.states[e.entity]) return [e];
	let r = Ar(e.entity, n);
	return [e, ...mr.map((i) => {
		let a = [i], o = Sr(e.entity, a), s = wr(n, e.entity, a), c = Gt[i] ?? qt(t()), l = i === "current_temperature" || i === "temperature" ? r : void 0, u = i === "hvac_action" ? void 0 : "temperature";
		return {
			id: o,
			entity: e.entity,
			attribute: a,
			forced: e.forced,
			label: i,
			color: c,
			unit: l,
			scaleGroupKey: Dr(o, l, u, s),
			scaleMode: "auto",
			lineMode: e.lineMode,
			lineWidth: e.lineWidth,
			valueType: s
		};
	})];
}
function Mr(e) {
	return e.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && gr(e.unit))?.unit ?? e.find((e) => e.unit && gr(e.unit))?.unit;
}
function Nr(e) {
	let t = Mr(e), n = e.some((e) => e.scaleGroupKey === "group:temperature");
	return e.map((e) => {
		let r = lr(e.unit), i = r && t ? t : e.unit, a = r && i && e.scaleGroupKey === "unit:temperature" ? `unit:${i}` : e.scaleGroupKey;
		return n && e.valueType === "number" && i && gr(i) && a.startsWith("unit:") && !_r(e) && (a = "group:temperature"), i !== e.unit || a !== e.scaleGroupKey ? {
			...e,
			unit: i,
			scaleGroupKey: a
		} : e;
	});
}
function Pr(e) {
	let { config: t, hass: n } = e, r = e.attributeUnits ?? t?.attributeUnits, i = t?.endDate ?? e.endDate ?? /* @__PURE__ */ new Date(), a = t?.hours ?? e.hours ?? fr, o = t?.startDate ?? e.startDate ?? /* @__PURE__ */ new Date(i.getTime() - a * 36e5), s = t?.lineMode ?? e.lineMode, c = t?.lineWidth ?? e.lineWidth, l;
	l = t?.series && t.series.length > 0 ? t.series.map((e, t) => Or(e, t, n, r, s, c)) : (t?.defaultEntities ?? e.entities ?? []).map((e, t) => kr(e, t, n, s, c)).filter((e) => e !== void 0);
	let u = l.length;
	return l = l.flatMap((e) => jr(e, () => u++, n)), l = Nr(l), {
		startDate: vr(o),
		endDate: vr(i),
		showDatePicker: t?.showDatePicker ?? e.showDatePicker ?? !1,
		showEntityPicker: t?.showEntityPicker ?? e.showEntityPicker ?? !1,
		showLegend: t?.showLegend ?? e.showLegend ?? !0,
		showTooltip: t?.showTooltip ?? e.showTooltip ?? !0,
		showGrid: t?.showGrid ?? e.showGrid ?? !0,
		showScale: t?.showScale ?? e.showScale ?? !0,
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
var Fr = {
	loading: "ui.common.loading",
	empty: "ui.components.history_charts.no_history_found",
	error: "ui.components.history_charts.error",
	add_target: "ui.components.target-picker.add_target",
	attributes: "ui.dialogs.more_info_control.attributes",
	back: "ui.common.back",
	done: "ui.common.done",
	search_entity: "ui.components.entity.entity-picker.search"
}, Ir = {
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
		scale_group: "Scale group",
		scale_group_placeholder: "Default",
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
		scale_group: "Groupe d'échelle",
		scale_group_placeholder: "Défaut",
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
function W(e, t) {
	let n = Fr[t];
	if (n && e?.localize) {
		let t = e.localize(n);
		if (t) return t;
	}
	return Ir[e?.locale?.language?.split("-")[0] ?? e?.language?.split("-")[0] ?? "en"]?.[t] ?? Ir.en?.[t] ?? t;
}
var Lr = o`
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
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
`, Rr = [
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
], zr;
function Br() {
	return zr ??= Ie(Rr), zr;
}
var Vr;
function Hr() {
	return Vr ??= Ur(), Vr;
}
async function Ur() {
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
function Wr() {
	return customElements.get("ha-date-range-picker") !== void 0;
}
async function Gr() {
	await Hr();
}
function Kr(e) {
	return k`
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
var qr = 8, Jr = 50, Yr = 20, Xr = [
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
function G(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Zr(e) {
	return typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id;
}
function Qr(e) {
	return typeof e == "string" && e.trim() !== "" ? e : void 0;
}
function $r(...e) {
	return e.find((e) => Qr(e) !== void 0);
}
function ei(e) {
	return e.split(".")[0] ?? e;
}
function ti(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function ni(e, t) {
	let n = Zr(t), r = e.entities?.[t.entity_id], i = r?.device_id ? e.devices?.[r.device_id] : void 0, a = r?.area_id ?? i?.area_id, o = a ? e.areas?.[a] : void 0, s = $r(r?.name_by_user, r?.name, r?.original_name, n) ?? t.entity_id, c = $r(i?.name_by_user, i?.name), l = $r(o?.name), u = ei(t.entity_id);
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
function ri(e, t) {
	return e ? (t ?? Object.values(e.states).filter((e) => e !== void 0)).map((t) => ni(e, t)) : [];
}
function ii(e, t) {
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
function ai(e) {
	return [
		e.primary,
		e.secondary,
		e.id,
		...Object.values(e.search_labels).filter((e) => typeof e == "string")
	].filter((e) => typeof e == "string").map(ti);
}
function oi(e, t) {
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
		e.length >= 4 && t.some((t) => ii(e, t) <= 1) && (n = Math.max(n ?? 0, 65));
	}
	return n;
}
function si(e, t, n = Yr) {
	let r = ti(t).split(/\s+/).filter(Boolean);
	return r.length === 0 ? [] : e.map((e) => {
		let t = ai(e), n = 0;
		for (let e of r) {
			let r = oi(e, t);
			if (r === void 0) return;
			n += r;
		}
		return {
			item: e,
			score: n
		};
	}).filter((e) => e !== void 0).sort((e, t) => t.score - e.score || e.item.primary.localeCompare(t.item.primary)).slice(0, n).map((e) => e.item);
}
var ci = !1;
async function li() {
	ci || (ci = !0, await Br());
}
function ui() {
	return customElements.get("ha-generic-picker") !== void 0;
}
function di(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0, n = Ei(e);
	return k`
    <div class="entity-picker"
      @picker-opened=${e.onEntityPickerOpened}
      @picker-closed=${e.onEntityPickerClosed}
    >
      <div class="entity-menu" ?open=${e.menuOpen} @click=${(e) => e.stopPropagation()}>
        <div class="entity-menu-top">
          <span class="entity-menu-title">${t ? Zr(t) : ""}</span>
          <button class="entity-menu-close" @click=${e.onCloseMenu}>&#x2715;</button>
        </div>
        ${vi(e)}
      </div>
      ${e.hideEmptyPickerState ? fi(e) : k`
        <ha-generic-picker
          class="entity-trigger"
          .hass=${e.hass}
          .addButtonLabel=${W(e.hass, "add_target")}
          .value=${""}
          .getItems=${e.getItems}
          .emptyLabel=${""}
          .searchLabel=${W(e.hass, "search_entity")}
          .searchKeys=${Xr}
          @value-changed=${(t) => {
		let n = t.detail.value;
		n && e.onEntitySelected(n);
	}}
        ></ha-generic-picker>
      `}
      ${e.loading ? k`
            <div class="history-loading-indicator" role="status" aria-label=${W(e.hass, "loading")}>
              <span class="history-loading-spinner"></span>
              <span class="history-loading-text">${W(e.hass, "loading")}</span>
            </div>
          ` : j}
      ${n.length > 0 ? k`
        <div
          class="entity-row"
          @dragover=${(t) => e.onSourceDragOver(void 0, t)}
          @drop=${(t) => e.onSourceDrop(void 0, t)}
        >
          ${n.map((t) => hi(t, e))}
        </div>
      ` : j}
      ${gi(e)}
    </div>
  `;
}
function fi(e) {
	let t = W(e.hass, "add_target"), n = W(e.hass, "search_entity"), r = e.entitySearch ?? "", i = r.trim() ? e.getAdditionalItems(r).filter(pi) : [];
	return k`
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
      ${i.length > 0 ? k`
        <div class="entity-select-results">
          ${i.map((t) => k`
            <button
              class="entity-select-result"
              @click=${() => {
		e.onEntitySearchChanged?.(""), e.onEntitySelected(t.id);
	}}
            >
              <span class="entity-browser-entry-label">${t.primary}</span>
              ${t.secondary ? k`<span class="entity-browser-entry-secondary">${t.secondary}</span>` : j}
            </button>
          `)}
        </div>
      ` : j}
    </div>
  `;
}
function pi(e) {
	return G(e) && typeof e.id == "string" && typeof e.primary == "string";
}
function mi(e) {
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
function hi(e, t) {
	let n = wi(e.id, t), r = Si(e.id, t), i = e.kind === "entity_state", a = t.hass?.states[e.entityId], o = i ? "entity-source-chip" : "attr-source-chip", s = t.draggingSourceId === e.id, c = e.kind === "entity_attribute" && r && !n, l, u, d = () => {
		l !== void 0 && (clearTimeout(l), l = void 0), u = void 0;
	}, f = (n) => {
		c && (n.preventDefault(), n.stopPropagation(), t.onSourceSettingsOpen(e, n));
	};
	return k`
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
        ${i && a ? k`<ha-icon .icon=${mi(a)}></ha-icon>` : k`<ha-icon .icon=${_i(e.valueType)}></ha-icon>`}
      </span>
      <span class="source-chip-label">${e.label}</span>
      ${n ? j : k`<button
            class="source-chip-remove"
            @click=${(n) => {
		n.preventDefault(), t.onSourceRemoved(e.id);
	}}
          >&#x2715;</button>`}
    </div>
  `;
}
function gi(e) {
	return e.sourceSettingsSourceId ? k`
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
        <span>${W(e.hass, "attribute_unit")}</span>
        <input
          class="source-settings-input"
          .value=${e.sourceSettingsUnit ?? ""}
          placeholder=${W(e.hass, "attribute_unit_placeholder")}
          @input=${(t) => e.onSourceSettingsUnitChanged(t.target.value)}
        />
      </label>
      <label class="source-settings-field">
        <span>${W(e.hass, "scale_group")}</span>
        <input
          class="source-settings-input"
          .value=${e.sourceSettingsScaleGroup ?? ""}
          placeholder=${W(e.hass, "scale_group_placeholder")}
          @input=${(t) => e.onSourceSettingsScaleGroupChanged(t.target.value)}
        />
      </label>
      <button class="source-settings-close" @click=${e.onSourceSettingsClose}>
        ${W(e.hass, "done")}
      </button>
    </div>
  ` : j;
}
function _i(e) {
	switch (e) {
		case "number": return "mdi:chart-line";
		case "string": return "mdi:text";
		case "boolean": return "mdi:toggle-switch";
		default: return "mdi:code-tags";
	}
}
function vi(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0, n = e.path, r = t ? (() => {
		if (n.length === 0) return t.attributes;
		let e = t.attributes;
		for (let t of n) {
			if (!G(e)) return;
			e = e[t];
		}
		return e;
	})() : void 0;
	return k`
    <div class="entity-browser">
      ${yi(t, e)}
      <div class="entity-browser-list">
        ${t ? bi(t, n, G(r) ? r : {}, e) : k`<div class="entity-browser-empty">${W(e.hass, "no_entity_selected")}</div>`}
      </div>
    </div>
  `;
}
function yi(e, t) {
	return !e || t.path.length === 0 ? k`` : k`
    <div class="entity-breadcrumb">
      ${t.path.map((e, n) => k`
          ${n > 0 ? k`<span class="entity-breadcrumb-sep">/</span>` : j}
          <button class="entity-crumb" @click=${() => t.onBreadcrumbClick(t.path.slice(0, n + 1))}>${e}</button>
        `)}
    </div>
  `;
}
function bi(e, t, n, r) {
	let i = Object.entries(n).sort(([e], [t]) => e.localeCompare(t)), a = i.some(([n, r]) => G(r) ? !0 : mt(r) !== void 0 && !!gt(e, [...t, n]));
	return k`
    <div class="entity-browser-entries">
      ${t.length > 0 ? k`
            <div class="entity-browser-back" @click=${() => r.onBreadcrumbClick(t.slice(0, -1))}>
              &#x2190; ${W(r.hass, "back")}
            </div>
          ` : k`
            ${ki(e, r)}
            ${a ? k`
                  <div class="entity-browser-section-title">${W(r.hass, "attributes")}</div>
                  ${xi(r)}
                ` : j}
          `}
      ${t.length === 0 && r.attributeSearch.trim() ? Mi(e, r) : i.map(([n, i]) => Ai(e, n, i, t, r))}
    </div>
  `;
}
function xi(e) {
	let t = W(e.hass, "search_attributes");
	return k`
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
function Si(e, t) {
	return t.selectedSources.some((t) => t.id === e);
}
function Ci(e, t) {
	return (t.resolved?.series ?? []).some((t) => t.id === e);
}
function wi(e, t) {
	return (t.resolved?.series ?? []).some((t) => t.id === e && t.forced !== !1);
}
function Ti(e) {
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
function Ei(e) {
	let t = [...(e.resolved?.series ?? []).filter((e) => e.forced === !1).map(Ti), ...e.selectedSources], n = /* @__PURE__ */ new Set();
	return t.filter((e) => n.has(e.id) ? !1 : (n.add(e.id), !0));
}
function Di(e, t) {
	let n = t.selectedSources.some((t) => t.entityId === e), r = (t.resolved?.series ?? []).some((t) => t.entity === e);
	return n || r;
}
function Oi(e, t) {
	if (!e.entity_id.startsWith("climate.")) return !1;
	let n = t.selectedSources.some((t) => t.entityId.startsWith("climate.") && t.entityId !== e.entity_id), r = (t.resolved?.series ?? []).some((t) => t.entity.startsWith("climate.") && t.entity !== e.entity_id);
	return n || r;
}
function ki(e, t) {
	let n = ht(e);
	return n ? Oi(e, t) ? k`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : Si(n.id, t) ? k`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onSourceRemoved(n.id)}>
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : Ci(n.id, t) ? wi(n.id, t) ? k`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--forced">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : k`
        <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onSourceRemoved(n.id)}>
          <span class="entity-browser-entry-label">${e.entity_id}</span>
        </div>
      ` : Di(e.entity_id, t) ? k`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : k`
    <div class="entity-browser-entity" @click=${() => t.onSourceAdded(n)}>
      <span class="entity-browser-entry-label">${e.entity_id}</span>
    </div>
  ` : j;
}
function Ai(e, t, n, r, i) {
	if (G(n)) return k`
      <div class="entity-browser-entry" @click=${() => i.onBreadcrumbClick([...r, t])}>
        <span class="entity-browser-entry-label">${t}</span>
        <span class="entity-browser-entry-arrow">&#x203A;</span>
      </div>
    `;
	let a = mt(n), o = [...r, t];
	if (!a) return j;
	let s = gt(e, o);
	return s ? ji({
		label: t,
		source: s,
		type: a,
		opts: i
	}) : j;
}
function ji(e) {
	let { label: t, source: n, type: r, opts: i, secondary: a } = e, o = k`
    <span class="entity-browser-entry-text">
      <span class="entity-browser-entry-label">${t}</span>
      ${a ? k`<span class="entity-browser-entry-secondary">${a}</span>` : j}
    </span>
    <span class="entity-browser-entry-type">${r}</span>
  `;
	return Si(n.id, i) ? k`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--removable" @click=${() => i.onSourceRemoved(n.id)}>
        ${o}
      </div>
    ` : Ci(n.id, i) ? wi(n.id, i) ? k`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--forced">
        ${o}
      </div>
    ` : k`
        <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--removable" @click=${() => i.onSourceRemoved(n.id)}>
          ${o}
        </div>
      ` : k`
    <div class="entity-browser-entry" @click=${() => i.onSourceAdded(n)}>
      ${o}
    </div>
  `;
}
function Mi(e, t) {
	let n = Ni(e, e.attributes, t.attributeSearch), r = n.slice(0, Jr);
	return r.length === 0 ? k`<div class="entity-browser-search-empty">${W(t.hass, "no_matching_attributes")}</div>` : k`
    <div class="entity-browser-search-results">
      ${r.map((e) => ji({
		label: e.key,
		source: e.source,
		type: e.valueType,
		opts: t,
		secondary: e.dottedPath
	}))}
      ${n.length > r.length ? k`<div class="entity-browser-search-count">${W(t.hass, "attribute_results_limited")}</div>` : j}
    </div>
  `;
}
function Ni(e, t, n) {
	let r = n.trim().toLocaleLowerCase();
	if (!r) return [];
	let i = [], a = (t, n, o) => {
		if (!(o > qr)) for (let [s, c] of Object.entries(t)) {
			let t = [...n, s];
			if (G(c)) {
				a(c, t, o + 1);
				continue;
			}
			let l = mt(c), u = l ? gt(e, t) : void 0;
			!l || !u || Pi(t, c).includes(r) && i.push({
				key: s,
				dottedPath: t.join("."),
				valueType: l,
				source: u
			});
		}
	};
	return a(t, [], 0), i.sort((e, t) => {
		let n = Fi(e, r), i = Fi(t, r);
		return n === i ? e.dottedPath.length === t.dottedPath.length ? e.dottedPath.localeCompare(t.dottedPath) : e.dottedPath.length - t.dottedPath.length : n - i;
	});
}
function Pi(e, t) {
	let n = typeof t == "string" || typeof t == "number" || typeof t == "boolean" ? String(t) : "";
	return [
		...e,
		e.join("."),
		n
	].join(" ").toLocaleLowerCase();
}
function Fi(e, t) {
	let n = e.key.toLocaleLowerCase(), r = e.dottedPath.toLocaleLowerCase();
	return n.startsWith(t) ? 0 : r.startsWith(t) ? 1 : n.includes(t) ? 2 : r.includes(t) ? 3 : 4;
}
function K(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
var Ii = /°[CF]|[CFK]$/, Li = 60, Ri = 1e3, zi = 24, Bi = 28, Vi = 720, q = 1e3, Hi = 18, Ui = 44, Wi = 12, Gi = 14, Ki = 48, qi = .34, Ji = .72, Yi = 720, J = 2, Xi = [
	"current_temperature",
	"temperature",
	"hvac_action"
], Zi = new Set(["current_temperature", "temperature"]), Qi = 5, $i = "haBetterHistory";
function ea(e) {
	let t = 0;
	for (let n of e) n >= "0" && n <= "9" ? t += 6.2 : n === "." || n === "," ? t += 3.2 : n === "-" ? t += 4 : t += 6.2;
	return Math.ceil(t);
}
function ta(e) {
	let t = Math.max(0, ...e.map((e) => ea(e.value)));
	return t > 0 ? `${t + Qi}px` : "0px";
}
function na(e) {
	return Ii.test(e);
}
var Y = class extends P {
	constructor(...e) {
		super(...e), this.hours = 24, this.showDatePicker = !1, this.showEntityPicker = !1, this.showImportButton = !1, this.showExportButton = !0, this.showTimeRangeSelector = !0, this.showLineModeButtons = !0, this.showLegend = !0, this.showTooltip = !0, this.showGrid = !0, this.showScale = !0, this.showControls = !0, this.debugPerformance = !1, this.toolsOpen = !1, this._hiddenSeriesIds = [], this._liveNow = Date.now(), this._datePickerReady = !1, this._entityComponentsReady = !1, this._attributeMenuOpen = !1, this._attributeSearch = "", this._path = [], this._selectedSources = [], this._removedConfigSourceIds = [], this._customEntityIds = [], this._entityPickerOpen = !1, this._datePickerOpen = !1, this._data = new Ut(this), this._tooltip = new or(this), this._browserHistoryInstanceId = `hbh-${Math.random().toString(36).slice(2)}`, this._prevClipX = /* @__PURE__ */ new Map(), this._prevStartTime = 0, this._prevEndTime = 0, this._prevContainerWidth = 0, this._wasLoading = !1, this._suppressLineAnimation = !1, this._suppressLiveRangeAnimation = !1, this._pendingAddedSources = [], this._dragDropCommitted = !1, this._lastPickerOverlayOpen = !1, this._lastPointerDownInside = !1, this._syncingBrowserHistory = !1, this._selectingEntityForAttributeMenu = !1, this._importedSeriesMeta = /* @__PURE__ */ new Map(), this._importedDataActive = !1, this._containerWidth = 0, this._chartSurfaceHeight = 0, this._chartSurfaceConstrained = !1, this._lastContentHeight = 0, this._handleBrowserPopState = (e) => {
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
		}, this._lastFetchKey = "", this._lastFetchSources = [], this._lastHassResolveTime = 0, this._getEntityPickerItems = () => ri(this.hass), this._getAdditionalEntityPickerItems = (e) => {
			if (!this.hass || !e?.trim()) return [];
			let t = new Set(this._pickerEntities().map((e) => e.entity_id));
			return si(ri(this.hass, Object.values(this.hass.states).filter((e) => e !== void 0).filter((e) => !t.has(e.entity_id))), e);
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
		this.styles = Lr;
	}
	connectedCallback() {
		super.connectedCallback(), Br(), document.addEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.addEventListener("click", this._handleDocumentClick, !0), window.addEventListener("popstate", this._handleBrowserPopState), this._resizeObserver = new ResizeObserver((e) => {
			for (let t of e) if (t.target === this) {
				let e = Math.round(t.contentRect.width);
				e !== this._containerWidth && (this._containerWidth = e);
			} else t.target === this._observedChartSurface && this._syncChartSurfaceSize(t.contentRect.height);
		}), this._resizeObserver.observe(this);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), document.removeEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.removeEventListener("click", this._handleDocumentClick, !0), window.removeEventListener("popstate", this._handleBrowserPopState), this._resizeObserver?.disconnect(), this._resizeObserver = void 0, this._surfaceHeaderObserver?.disconnect(), this._surfaceHeaderObserver = void 0, this._sourceAddBatchTimer !== void 0 && (clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = void 0), this._stopLiveClock();
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
		if (this._measureGraphLayout(n ?? void 0, r), this._lastContentHeight > 0 && r > 0 && r === this._lastContentHeight && Math.abs(t - this._chartSurfaceHeight) > J) return;
		this._lastContentHeight = r;
		let i = r < t - J || t < r - J, a = t < this._chartSurfaceHeight - J, o = this._graphGroupRenderCache?.graphHeight ?? 180, s = this._chartSurfaceConstrained && o !== 180;
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
		let n = t.querySelector(".chart-graphs"), r = Math.round(t.getBoundingClientRect().height), i = n ? Math.round(n.offsetHeight) : 0, a = i > r - J, o = Math.max(0, (r - i) / 2), s = e + 10 - o, c = t.style.getPropertyValue("--better-history-surface-header-offset"), l = c !== "";
		if (this._chartSurfaceConstrained || a) {
			let r = Math.ceil(e + 10);
			if (c === `${r}px`) return;
			this._lastContentHeight = n ? Math.round(n.offsetHeight) : 0, t.style.setProperty("--better-history-surface-header-offset", `${r}px`);
			return;
		}
		if (s <= 0) {
			if (!l || s > -J) return;
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
			let e = this._effectiveEndDate().getTime(), t = !this._viewEnd || Math.abs(this._viewEnd.getTime() - e) <= Ri * 2, n = Date.now();
			this._liveNow = n, t && (this._viewEnd = new Date(n));
		}, Ri);
	}
	_stopLiveClock() {
		this._liveNowTimer !== void 0 && (clearInterval(this._liveNowTimer), this._liveNowTimer = void 0);
	}
	_browserHistoryEntry(e = window.history.state) {
		let t = typeof e == "object" && e ? e[$i] : void 0;
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
			[$i]: {
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
		if (this._resolved && !this._importedDataActive) for (let n of this._activeResolvedSeries()) t.has(n.id) || (t.add(n.id), e.push(dr(n)));
		for (let n of this._selectedSources) for (let r of this._expandedSelectedSources(n)) t.has(r.id) || (t.add(r.id), e.push(r));
		return e;
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
		return this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && na(e.unit))?.unit;
	}
	willUpdate(e) {
		this._data.debugPerformance = this.debugPerformance || this.config?.debugPerformance === !0;
		let t = this._usesRollingRelativeRange(), n = this._effectiveDateRange(), r = n.start.getTime(), i = n.end.getTime(), a = this._rangeExtendsFuture();
		this._syncLiveClock(), e.has("hass") && (a || t) && this._data.updateLivePoints(this.hass, this._lastFetchSources, new Date(r), new Date(i));
		let o = r !== this._prevStartTime || i !== this._prevEndTime, s = this._containerWidth !== this._prevContainerWidth, c = e.has("_rangeStart") || e.has("_rangeEnd") || e.has("startDate") || e.has("endDate") || e.has("config") || e.has("hours"), l = (a || t) && o && !s && !c;
		this._suppressLiveRangeAnimation = l, (o || s) && (l || this._prevClipX.clear(), this._prevStartTime = r, this._prevEndTime = i, this._prevContainerWidth = this._containerWidth), this._data.loading && this._data.series.length === 0 && this._prevClipX.clear();
		let u = /* @__PURE__ */ "_rangeStart._rangeEnd._selectedSources._removedConfigSourceIds.hass.config.entities.hours.startDate.endDate.showDatePicker.showEntityPicker.showLegend.showTooltip.showGrid.showScale.width.height.lineMode.lineWidth.backgroundColor.graphTitle.titleFontFamily.titleFontSize.titleColor.language.debugPerformance.attributeUnits._runtimeLineMode".split(".");
		if (u.some((t) => e.has(t))) {
			let r = !u.some((t) => t !== "hass" && e.has(t));
			if ((e.has("config") || e.has("entities")) && (this._importedDataActive = !1, this._importedSeriesMeta.clear()), r) {
				let e = Math.floor(Date.now() / 1e3) * 1e3;
				if ((a || t) && this._lastFetchKey && (this._lastHassResolveTime = e, !t) || !t && e === this._lastHassResolveTime && this._lastFetchKey) return;
				this._lastHassResolveTime = e;
			}
			let i = Pr({
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
			i.showDatePicker && !this._datePickerReady && Gr().then(() => {
				this._datePickerReady = Wr(), this.requestUpdate();
			}), i.showEntityPicker && !this._entityComponentsReady && li().then(() => {
				this._entityComponentsReady = ui(), this.requestUpdate();
			});
		}
	}
	updated(e) {
		this._observeChartSurface(), this._observeSurfaceHeader(), e.has("_attributeMenuOpen") && this._attributeMenuOpen && this._positionEntityMenu(), e.has("_sourceSettingsSourceId") && this._sourceSettingsSourceId && this._positionSourceSettingsPopover(), (e.has("_attributeMenuOpen") || e.has("_entityPickerOpen") || e.has("_datePickerOpen") || e.has("_sourceSettingsSourceId")) && this._emitPickerOverlayState(), this._emitGraphVisibilityState(), this._animateClipPaths(), this._wasLoading = this._data.loading, this._suppressLiveRangeAnimation = !1;
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
	_pickScaleGroup(e, t) {
		if (e.valueType !== "number") return `series:${e.id}`;
		if (e.scaleGroup) return `group:${e.scaleGroup}`;
		let n = e.entityId.startsWith("climate.") && e.path?.length === 1 && Zi.has(e.path[0]);
		if (e.unit) {
			let n = t.find((t) => t.unit === e.unit && t.valueType === "number");
			if (n) return n.scaleGroupKey;
			let r = this._resolved?.series.find((t) => t.unit === e.unit && t.valueType === "number");
			if (r) return r.scaleGroupKey;
			let i = this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature");
			if (i && na(e.unit)) return i.scaleGroupKey;
		}
		if (n) {
			let e = t.find((e) => e.valueType === "number" && e.unit !== void 0 && na(e.unit));
			return e ? e.scaleGroupKey : "group:temperature";
		}
		return e.unit ? `unit:${e.unit}` : `series:${e.id}`;
	}
	_defaultLineMode() {
		let e = this._effectiveLineMode();
		return e === "line" || e === "column" ? e : "stair";
	}
	_defaultLineWidth() {
		let e = this.config?.lineWidth ?? this.lineWidth;
		return typeof e == "number" ? Number.isFinite(e) && e >= 0 ? String(e) : "2.5" : typeof e == "string" && e.trim() !== "" ? e.trim() : "2.5";
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
		if (this._selectedSources.length > 0) return !1;
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
				lineMode: this._runtimeLineMode ?? e.lineMode,
				lineWidth: e.lineWidth,
				valueType: e.valueType,
				points: t?.points ?? []
			}];
		});
		for (let t of this._selectedSources) for (let n of this._expandedSelectedSources(t)) {
			if (e.some((e) => e.id === n.id)) continue;
			let t = this._data.series.find((e) => e.source.id === n.id);
			if (!t) continue;
			let r = e.length, i = this._pickScaleGroup(n, e), a = n.entityId.startsWith("climate.") && n.path?.length === 1 ? n.path[0] : void 0;
			e.push({
				id: n.id,
				label: n.label,
				color: this._importedSeriesMeta.get(n.id)?.color ?? (a ? Gt[a] : void 0) ?? qt(r),
				unit: n.unit,
				scaleGroupKey: i,
				scaleMode: "auto",
				lineMode: this._runtimeLineMode ?? this._importedSeriesMeta.get(n.id)?.lineMode ?? this._defaultLineMode(),
				lineWidth: this._defaultLineWidth(),
				valueType: n.valueType,
				points: t?.points ?? []
			});
		}
		return e;
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
			e.lineMode,
			e.lineWidth,
			e.valueType
		].join("~")) ?? [], ...this._selectedSources.flatMap((e) => this._expandedSelectedSources(e)).map((e) => [
			e.id,
			e.label,
			e.kind,
			e.unit ?? "",
			e.scaleGroup ?? "",
			e.valueType,
			this._defaultLineMode(),
			this._defaultLineWidth()
		].join("~"))].join("|");
	}
	_chartData() {
		let e = this._hiddenSeriesIds.join("|"), t = this._chartSourceKey(), n = this._chartRenderCache, r = this._effectiveViewRange(), i = r.start.getTime(), a = r.end.getTime(), o = this._containerWidth, s = !this._data.loading;
		if (n && n.seriesRef === this._data.series && n.sourceKey === t && n.hiddenKey === e && n.startTime === i && n.endTime === a && n.extendStairToEnd === s && n.containerWidth === o) return n.data;
		let c = this._maxXTicks(), l = this._buildRenderSeries(), u = l.filter((e) => !this._hiddenSeriesIds.includes(e.id)), d = {
			start: i,
			end: Math.max(a, i + 1)
		}, f = this._data.debugPerformance, p = f ? L() : 0, m = Qn(l, u, d, this._resolved?.disableClimateOverlay ?? !1, c, s), h = f ? L() - p : 0;
		return f && R(f, "chart.build_data", {
			allSeriesCount: l.length,
			visibleSeriesCount: u.length,
			pointCount: u.reduce((e, t) => e + t.points.length, 0),
			groupCount: m.numericScales.length,
			segmentCount: m.segments.length,
			lineCount: m.numericLines.length,
			buildDurationMs: Math.round(h)
		}), this._chartRenderCache = {
			seriesRef: this._data.series,
			sourceKey: t,
			hiddenKey: e,
			startTime: i,
			endTime: a,
			extendStairToEnd: s,
			containerWidth: o,
			data: m
		}, m;
	}
	_graphGroups(e) {
		let t = this._maxXTicks(), n = this._graphHeightFor(e), r = this._graphGroupRenderCache;
		if (r && r.dataRef === e && r.maxXTicks === t && r.graphHeight === n) return r.groups;
		let i = ar(e, t, n);
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
	_shouldAnimateLine(e, t = this._lineTargetX(e)) {
		let n = this._prevClipX.get(e.id) ?? 0;
		return this._data.loading && !this._suppressLineAnimation && !this._suppressLiveRangeAnimation && t > n;
	}
	_graphHeightFor(e) {
		if (!this._chartSurfaceConstrained || this._chartSurfaceHeight <= 0) return 180;
		let t = this._graphCountFor(e), n = this._measuredGraphLayout?.graphCount === t ? this._measuredGraphLayout.overheadHeight : void 0, r = this._estimatedGraphOverhead(e, t), i = n ?? r, a = this._chartSurfaceHeight - i, o = this._containerWidth > 0 ? this._containerWidth * 640 / 720 : 640, s = Math.max(180, Math.min(Math.floor(o * qi), Math.floor(this._chartSurfaceHeight / t * Ji), Yi)), c = Math.floor(Math.max(0, a) / t);
		return Math.max(Ki, Math.min(c, s));
	}
	_graphCountFor(e) {
		return Math.max(new Set(e.numericScales.map((e) => e.graphKey)).size, +!!e.allSeries.some((e) => e.valueType !== "number" && e.valueType !== "boolean"), 1);
	}
	_estimatedGraphOverhead(e, t) {
		let n = e.allSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").length, r = this._resolved?.showLegend ?? !0 ? t * 30 : 0;
		return t * 62 + r + (n > 0 ? 10 + n * 14 : 0);
	}
	_renderGraphGroup(e) {
		let t = this._resolved?.showLegend ?? !0, n = this._resolved?.showGrid ?? !0, r = this._resolved?.showScale ?? !0, i = e.series.map((e) => e.id).join("|"), a = r ? ta(e.yLabels) : "0px", o = r ? ta(e.rightYLabels) : "0px", s = 28 + e.graphHeight, c = s + 3, l = s + 16 + 6;
		return k`
      <div class="graph-section">
        <div class="graph-row" style=${`--axis-label-gap:${Qi}px;--axis-left-gutter:${a};--axis-right-gutter:${o};`}>
          <div class="axis-labels axis-labels--left" style="height:${e.canvasHeight}px">
            ${r ? e.yLabels.map((e) => k`<span class="y-axis-label y-axis-label--left" style="top:${e.y.toFixed(1)}px;">${e.value}</span>`) : j}
          </div>
          <div class="graph-canvas" data-series-ids=${i} style="height:${e.canvasHeight}px">
            <svg
              viewBox="${40} 0 ${640} ${e.svgHeight}"
              height="${e.svgHeight}"
              preserveAspectRatio="none"
            >
              ${n ? e.xLabels.map((e) => A`
                      <line class="grid-line grid-line--vertical" x1=${e.x.toFixed(1)} y1=${18} x2=${e.x.toFixed(1)} y2=${s}></line>
                    `) : j}
              ${n ? e.yLabels.map((e) => A`
                      <line class="grid-line grid-line--horizontal" x1=${40} y1=${e.y.toFixed(1)} x2=${680} y2=${e.y.toFixed(1)}></line>
                    `) : j}
              <defs>
                ${e.lines.map((t) => {
			let n = t.id.replace(/[^a-zA-Z0-9]/g, "_"), r = `clip-${n}`, i = `rect-${n}`, a = this._lineTargetX(t);
			return A`
                    <clipPath id=${r}>
                      <rect id=${i} x="0" y="0" width=${this._shouldAnimateLine(t, a) ? this._prevClipX.get(t.id) ?? 0 : a} height=${e.svgHeight}></rect>
                    </clipPath>
                  `;
		})}
              </defs>
              ${e.heatingAreas.map((e) => A`<polygon class="climate-heating-area" points=${e.points}></polygon>`)}
              ${e.columns.map((e) => A`<rect class="column" x=${e.x.toFixed(1)} y=${e.y.toFixed(1)} width=${e.width.toFixed(1)} height=${e.height.toFixed(1)} fill=${e.fill}></rect>`)}
              ${e.lines.map((e) => {
			let t = `clip-${e.id.replace(/[^a-zA-Z0-9]/g, "_")}`, n = this._lineTargetX(e), r = this._shouldAnimateLine(e, n);
			return A`<polyline class="line" style=${`--better-history-line-width:${e.lineWidth};`} clip-path="url(#${t})" data-line-id=${e.id} data-animate-clip=${r ? "true" : j} data-target-x=${n} points=${e.points} stroke=${e.color}></polyline>`;
		})}
              ${e.segments.map((e) => A`<rect class="segment" x=${e.x} y=${e.y} width=${e.width} height="9" fill=${e.fill}></rect>`)}
              ${e.series.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").map((e, t) => A`<rect class="segment-border" x=${40} y=${l + t * 14} width=${640} height="9" fill="none" stroke=${e.color}></rect>`)}
              ${r ? A`<line class="axis" x1=${40} y1=${18} x2=${40} y2=${s}></line>` : j}
              ${r && e.rightYLabels.length > 0 ? A`<line class="axis" x1=${680} y1=${18} x2=${680} y2=${s}></line>` : j}
              ${r ? A`<line class="axis" x1=${40} y1=${s} x2=${680} y2=${s}></line>` : j}
              ${r && e.scale ? e.yLabels.map((e) => A`
                      <line class="axis tick" x1=${40} y1=${e.y.toFixed(1)} x2=${44} y2=${e.y.toFixed(1)}></line>
                    `) : j}
              ${r ? e.rightYLabels.map((e) => A`
                      <line class="axis tick" x1=${676} y1=${e.y.toFixed(1)} x2=${680} y2=${e.y.toFixed(1)}></line>
                    `) : j}
            </svg>
            ${r ? e.xLabels.map((e) => {
			let t = ((e.x - 40) / 640 * 100).toFixed(2);
			return k`<span class="x-axis-label ${e.bold ? "x-axis-label--bold" : ""}" style="left:${t}%;top:${c}px;">${e.label}</span>`;
		}) : j}
          </div>
          <div class="axis-labels axis-labels--right" style="height:${e.canvasHeight}px">
            ${r ? e.rightYLabels.map((e) => k`<span class="y-axis-label y-axis-label--right" style="top:${e.y.toFixed(1)}px;">${e.value}</span>`) : j}
          </div>
        </div>
        ${t && e.allSeries.length > 0 ? k`
            <div class="graph-legend">
              ${e.allSeries.map((e) => k`
                  <button class="legend-item" ?hidden-series=${this._hiddenSeriesIds.includes(e.id)} @click=${() => this._toggleSeries(e.id)}>
                    <span class="swatch" style=${e.valueType === "string" ? `background:color-mix(in srgb,${e.color} 30%,transparent);border:1px solid ${e.color};` : `background:${e.color};`}></span>
                    <span class="legend-label">${e.label}</span>
                  </button>
                `)}
            </div>
          ` : j}
      </div>
    `;
	}
	_animateClipPaths() {
		let e = this.renderRoot;
		e && e.querySelectorAll("polyline[data-line-id]").forEach((t) => {
			let n = t.getAttribute("data-line-id"), r = Number(t.getAttribute("data-target-x"));
			if (!n || !Number.isFinite(r)) return;
			let i = this._prevClipX.get(n) ?? 0, a = n.replace(/[^a-zA-Z0-9]/g, "_"), o = e.querySelector(`#rect-${a}`);
			if (o instanceof SVGRectElement) {
				if (t.getAttribute("data-animate-clip") !== "true") {
					o.style.removeProperty("transition"), o.setAttribute("width", r.toString()), this._prevClipX.set(n, r);
					return;
				}
				o.style.setProperty("transition", "none"), o.setAttribute("width", i.toString()), o.getBoundingClientRect(), o.style.setProperty("transition", "width 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)"), o.setAttribute("width", r.toString()), this._prevClipX.set(n, r);
			}
			t.removeAttribute("data-animate-clip");
		});
	}
	_renderChartBody() {
		if (this._data.error) {
			this._queueGraphVisible(!1);
			let e = /timed?\s*out/i.test(this._data.error);
			return k`<div class="error">${W(this.hass, e ? "error_timeout" : "error")}</div>`;
		}
		if (!this._resolved || this._resolved.series.length === 0 && this._selectedSources.length === 0) return this._queueGraphVisible(!1), j;
		let e = this._chartData(), t = e.visibleSeries.some((e) => e.points.length > 0), n = this._resolved.showTooltip, r = this._graphGroups(e), i = r.length > 0 && (t || this._data.loading);
		this._queueGraphVisible(i), this._suppressLineAnimation = this._wasLoading && !this._data.loading;
		let a = r.reduce((e, t) => e + t.canvasHeight, 0);
		if (t && n) {
			let t = r.flatMap((e) => e.allSeries.map((e) => ({
				id: e.id,
				label: e.label,
				color: e.color
			})));
			this._tooltip.sync(t, this._data.series, this._hiddenSeriesIds, a, e.timeBounds);
		}
		return k`
      <div class="chart-surface">
        ${i ? k`
              <div class="chart-graphs"
                @pointermove=${n ? (e) => this._tooltip.handlePointerMove(e) : j}
                @pointerleave=${n ? () => this._tooltip.handlePointerLeave() : j}
              >
                ${r.map((e) => this._renderGraphGroup(e))}
                ${n ? this._tooltip.renderTooltip() : j}
              </div>` : this._data.loading ? j : k`<div class="empty">${W(this.hass, "empty")}</div>`}
      </div>
    `;
	}
	_renderEntityPickerUI() {
		return !this._resolved?.showEntityPicker || !this._entityComponentsReady ? j : di({
			hass: this.hass,
			menuOpen: this._attributeMenuOpen,
			entityPickerOpen: this._entityPickerOpen,
			selectedEntityId: this._selectedEntityId,
			path: this._path,
			selectedSources: this._selectedSources,
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
			sourceSettingsScaleGroup: this._sourceSettingsSource()?.scaleGroup,
			onSourceSettingsOpen: (e) => this._openSourceSettings(e),
			onSourceSettingsClose: () => {
				this._sourceSettingsSourceId = void 0;
			},
			onSourceSettingsUnitChanged: (e) => {
				let t = e.trim();
				this._updateSourceSettings({ unit: t || void 0 });
			},
			onSourceSettingsScaleGroupChanged: (e) => {
				let t = e.trim();
				this._updateSourceSettings({ scaleGroup: t || void 0 });
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
	_rangeSliderTrackWidthPx(e) {
		let t = (e?.closest(".range-slider-stack") ?? this.renderRoot.querySelector(".range-slider-stack"))?.getBoundingClientRect().width ?? 0;
		return t > 0 ? t : void 0;
	}
	_minViewRangeGapPx() {
		return window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? Bi : zi;
	}
	_rangeThumbHalfWidthPx() {
		return (window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? Gi : Wi) / 2;
	}
	_rangeThumbHitWidthPx() {
		return window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? Ui : Hi;
	}
	_minViewSpanMs(e = this._rangeSliderTrackWidthPx()) {
		let { span: t } = this._loadedRangeMs(), n = this._minViewRangeGapPx(), r = Math.max(e ?? Vi, n), i = Math.ceil(t * n / r), a = Math.min(6e4, Math.max(1, Math.floor(t / 1e3)));
		return Math.min(t, Math.max(1, i, a));
	}
	_minViewRangeStep(e) {
		let t = this._loadedRangeMs();
		return Math.max(1, Math.ceil(this._minViewSpanMs(e) / t.span * q));
	}
	_percentFromRangePointer(e, t) {
		return Math.round(Math.max(0, Math.min(t.width, e.clientX - t.left)) / t.width * q);
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
		return new Date(t + Math.max(0, Math.min(q, e)) / q * (n - t));
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
		e === "start" ? (c = Math.min(Math.max(t, 0), o - s), r && (r.value = String(c)), this._setViewRangeMs(this._dateFromRangePercent(c).getTime(), i.end.getTime(), n)) : (c = Math.max(Math.min(t, q), a + s), r && (r.value = String(c)), this._setViewRangeMs(i.start.getTime(), this._dateFromRangePercent(c).getTime(), n));
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
		let i = this._effectiveViewRange(), a = this._rangePercent(i.start, i.start), o = this._rangePercent(i.end, i.end), s = a / q * r.width, c = o / q * r.width, l = Math.max(0, Math.min(r.width, e.clientX - r.left)), u = this._percentFromRangePointer(e, r), d = this._rangeThumbHalfWidthPx(), f = this._rangeThumbHitWidthPx(), p = s <= f, m = c >= r.width - f, h = Math.max(0, s - f), g = Math.min(r.width, s + (p ? f : d)), _ = Math.max(0, c - (m ? f : d)), v = Math.min(r.width, c + f);
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
				unit: typeof e.unit == "string" ? e.unit : void 0
			}, d = c.map((e) => this._parseImportedPoint(e, s)).filter((e) => e !== void 0).sort((e, t) => e.time - t.time);
			t.push({
				source: u,
				points: d
			}), n.set(i, {
				color: typeof e.color == "string" && e.color.trim() !== "" ? e.color : void 0,
				lineMode: e.lineMode === "line" || e.lineMode === "column" || e.lineMode === "stair" ? e.lineMode : void 0
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
		if (!this.toolsOpen || !this._resolved || this._lastGraphVisible === !1) return j;
		let e = this._effectiveViewRange(), t = this._rangePercent(e.start, this._resolved.startDate), n = this._rangePercent(e.end, this._resolved.endDate), r = this._defaultLineMode(), i = this._showTimeRangeSelector(), a = this._showLineModeButtons(), o = this._showExportButton(), s = this._showImportButton();
		return !i && !a && !o && !s ? j : k`
      <div class="tools-panel">
        <div class="tool-range">
          <div class="tool-range-row">
            ${i ? k`
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
                  title=${W(this.hass, "reset_zoom")}
                  aria-label=${W(this.hass, "reset_zoom")}
                  @click=${() => this._resetViewRange()}
                >
                  <ha-icon .icon=${"mdi:restore"}></ha-icon>
                </button>
              ` : j}
            <div class="tool-actions">
              ${a ? k`
                <div class="mode-switch" role="group" aria-label=${W(this.hass, "line_mode")}>
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
		].map(([e, t, n]) => k`
                    <button
                      class="mode-button"
                      ?active=${r === e}
                      title=${W(this.hass, n)}
                      @click=${() => this._setRuntimeLineMode(e)}
                    >
                      <ha-icon .icon=${t}></ha-icon>
                    </button>
                  `)}
                </div>
              ` : j}
              ${o ? k`
                  <button
                    class="tool-action-button"
                    title=${W(this.hass, "export_data")}
                    aria-label=${W(this.hass, "export_data")}
                    @click=${() => this._exportData()}
                  >
                    <ha-icon .icon=${"mdi:download"}></ha-icon>
                  </button>
                ` : j}
              ${s ? k`
                  <button
                    class="tool-action-button"
                    title=${W(this.hass, "import_data")}
                    aria-label=${W(this.hass, "import_data")}
                    ?disabled=${this._hasForcedConfigSeries()}
                    @click=${() => this._importData()}
                  >
                    <ha-icon .icon=${"mdi:upload"}></ha-icon>
                  </button>
                ` : j}
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
		return k`
      <div class="root" style="width:${e};background:${t};">
        ${n ? k`<div class="graph-title" style=${r}>${n}</div>` : j}
        <div class="chart-layout">
          ${a ? k`<div class="surface-header">
                ${i ? k`<div class="controls-bar">
                      ${this._renderDatePicker()}
                      ${this._renderEntityPickerUI()}
                    </div>` : j}
                ${this._renderToolsPanel()}
              </div>` : j}
          <div class="chart-area">
            ${this._renderChartBody()}
          </div>
        </div>
      </div>
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
		return !this._resolved?.showDatePicker || !this._datePickerReady ? j : Kr({
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
		t.style.top = "0", t.style.left = "0", t.style.right = "", t.style.width = "";
		let n = t.getBoundingClientRect(), r = e.getBoundingClientRect(), i = this.getBoundingClientRect(), a = i.bottom - 8 - r.bottom - 8;
		t.style.maxHeight = `${Math.min(Math.max(a, 120), 420)}px`, t.style.top = `${r.bottom - n.top + 6}px`;
		let o = i.left + 8, s = i.right - 8, c = s - o, l = Math.min(420, c);
		t.style.width = `${l}px`;
		let u;
		window.matchMedia("(hover: hover) and (pointer: fine)").matches ? (u = r.left, u = Math.min(u, s - l), u = Math.max(u, o)) : (u = o, t.style.width = `${c}px`), t.style.left = `${u - n.left}px`, t.style.right = "";
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
		let t = ur(e.path, this.attributeUnits ?? this.config?.attributeUnits), n = lr(t) ? this._resolvedTemperatureUnit() ?? t : t;
		return !n || e.unit === n ? e : {
			...e,
			unit: n
		};
	}
	_expandedSelectedSources(e) {
		if (e.kind !== "entity_state" || !e.entityId.startsWith("climate.")) return [this._sourceWithAttributeUnit(e)];
		let t = this.hass?.states[e.entityId];
		if (!t) return [this._sourceWithAttributeUnit(e)];
		let n = typeof t.attributes.temperature_unit == "string" && t.attributes.temperature_unit !== "" ? t.attributes.temperature_unit : typeof t.attributes.unit_of_measurement == "string" && t.attributes.unit_of_measurement !== "" ? t.attributes.unit_of_measurement : void 0, r = Xi.map((r) => {
			let i = gt(t, [r]), a = {
				id: `attr:${e.entityId}:${r}`,
				kind: "entity_attribute",
				entityId: e.entityId,
				label: r,
				path: [r],
				valueType: r === "hvac_action" ? "string" : "number",
				unit: Zi.has(r) ? n : void 0
			}, o = i ?? a;
			return Zi.has(r) && n ? {
				...o,
				unit: n
			} : o;
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
		})), this._sourceAddBatchTimer !== void 0 && clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = setTimeout(() => this._flushPendingAddedSources(), Li);
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
		e.kind === "entity_attribute" && (this._sourceSettingsSourceId = e.id);
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
K([F({ attribute: !1 })], Y.prototype, "hass", void 0), K([F({ attribute: !1 })], Y.prototype, "config", void 0), K([F({ attribute: !1 })], Y.prototype, "entities", void 0), K([F({ attribute: !1 })], Y.prototype, "attributeUnits", void 0), K([F({ type: Number })], Y.prototype, "hours", void 0), K([F({ attribute: !1 })], Y.prototype, "startDate", void 0), K([F({ attribute: !1 })], Y.prototype, "endDate", void 0), K([F({
	type: Boolean,
	attribute: "show-date-picker"
})], Y.prototype, "showDatePicker", void 0), K([F({
	type: Boolean,
	attribute: "show-entity-picker"
})], Y.prototype, "showEntityPicker", void 0), K([F({
	type: Boolean,
	attribute: "show-import-button"
})], Y.prototype, "showImportButton", void 0), K([F({
	type: Boolean,
	attribute: "show-export-button"
})], Y.prototype, "showExportButton", void 0), K([F({
	type: Boolean,
	attribute: "show-time-range-selector"
})], Y.prototype, "showTimeRangeSelector", void 0), K([F({
	type: Boolean,
	attribute: "show-line-mode-buttons"
})], Y.prototype, "showLineModeButtons", void 0), K([F({
	type: Boolean,
	attribute: "show-legend"
})], Y.prototype, "showLegend", void 0), K([F({
	type: Boolean,
	attribute: "show-tooltip"
})], Y.prototype, "showTooltip", void 0), K([F({
	type: Boolean,
	attribute: "show-grid"
})], Y.prototype, "showGrid", void 0), K([F({
	type: Boolean,
	attribute: "show-scale"
})], Y.prototype, "showScale", void 0), K([F({
	type: Boolean,
	attribute: "show-controls"
})], Y.prototype, "showControls", void 0), K([F()], Y.prototype, "width", void 0), K([F()], Y.prototype, "height", void 0), K([F({ attribute: "line-mode" })], Y.prototype, "lineMode", void 0), K([F({ attribute: "line-width" })], Y.prototype, "lineWidth", void 0), K([F({ attribute: "background-color" })], Y.prototype, "backgroundColor", void 0), K([F({ attribute: "graph-title" })], Y.prototype, "graphTitle", void 0), K([F({ attribute: "title-font-family" })], Y.prototype, "titleFontFamily", void 0), K([F({ attribute: "title-font-size" })], Y.prototype, "titleFontSize", void 0), K([F({ attribute: "title-color" })], Y.prototype, "titleColor", void 0), K([F()], Y.prototype, "language", void 0), K([F({
	type: Boolean,
	attribute: "debug-performance"
})], Y.prototype, "debugPerformance", void 0), K([F({
	type: Boolean,
	attribute: "tools-open"
})], Y.prototype, "toolsOpen", void 0), K([I()], Y.prototype, "_resolved", void 0), K([I()], Y.prototype, "_hiddenSeriesIds", void 0), K([I()], Y.prototype, "_rangeStart", void 0), K([I()], Y.prototype, "_rangeEnd", void 0), K([I()], Y.prototype, "_viewStart", void 0), K([I()], Y.prototype, "_viewEnd", void 0), K([I()], Y.prototype, "_liveNow", void 0), K([I()], Y.prototype, "_datePickerReady", void 0), K([I()], Y.prototype, "_entityComponentsReady", void 0), K([I()], Y.prototype, "_runtimeLineMode", void 0), K([I()], Y.prototype, "_attributeMenuOpen", void 0), K([I()], Y.prototype, "_attributeSearch", void 0), K([I()], Y.prototype, "_selectedEntityId", void 0), K([I()], Y.prototype, "_path", void 0), K([I()], Y.prototype, "_selectedSources", void 0), K([I()], Y.prototype, "_removedConfigSourceIds", void 0), K([I()], Y.prototype, "_customEntityIds", void 0), K([I()], Y.prototype, "_entityPickerOpen", void 0), K([I()], Y.prototype, "_datePickerOpen", void 0), K([I()], Y.prototype, "_draggingSourceId", void 0), K([I()], Y.prototype, "_sourceSettingsSourceId", void 0), K([I()], Y.prototype, "_importedDataActive", void 0), K([I()], Y.prototype, "_containerWidth", void 0), K([I()], Y.prototype, "_chartSurfaceHeight", void 0), K([I()], Y.prototype, "_chartSurfaceConstrained", void 0);
var ra = "haBetterHistory", X = class extends P {
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
		}, this._getItems = () => ri(this.hass), this._getAdditionalItems = (e) => {
			if (!this.hass || !e?.trim()) return [];
			let t = new Set(this._pickerEntities().map((e) => e.entity_id));
			return si(ri(this.hass, Object.values(this.hass.states).filter((e) => e !== void 0).filter((e) => !t.has(e.entity_id))), e);
		};
	}
	static {
		this.styles = [Lr, o`
      :host {
        display: block;
      }
    `];
	}
	connectedCallback() {
		super.connectedCallback(), document.addEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.addEventListener("click", this._handleDocumentClick, !0), window.addEventListener("popstate", this._handleBrowserPopState), li().then(() => {
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
		t.style.top = "0", t.style.left = "0", t.style.right = "", t.style.width = "";
		let n = t.getBoundingClientRect(), r = e.getBoundingClientRect(), i = this.getBoundingClientRect(), a = i.bottom - 8 - r.bottom - 8;
		t.style.maxHeight = `${Math.min(Math.max(a, 120), 420)}px`, t.style.top = `${r.bottom - n.top + 6}px`;
		let o = i.left + 8, s = i.right - 8, c = s - o, l = Math.min(420, c);
		t.style.width = `${l}px`;
		let u;
		window.matchMedia("(hover: hover) and (pointer: fine)").matches ? (u = r.left, u = Math.min(u, s - l), u = Math.max(u, o)) : (u = o, t.style.width = `${c}px`), t.style.left = `${u - n.left}px`, t.style.right = "";
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
		let t = typeof e == "object" && e ? e[ra] : void 0;
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
			[ra]: {
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
		e.kind === "entity_attribute" && (this._sourceSettingsSourceId = e.id);
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
		return this._componentsReady ? k`
      ${di({
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
			sourceSettingsScaleGroup: this._sourceSettingsSource()?.scaleGroup,
			onSourceSettingsOpen: (e) => this._openSourceSettings(e),
			onSourceSettingsClose: () => {
				this._sourceSettingsSourceId = void 0;
			},
			onSourceSettingsUnitChanged: (e) => {
				let t = e.trim();
				this._updateSourceSettings({ unit: t || void 0 });
			},
			onSourceSettingsScaleGroupChanged: (e) => {
				let t = e.trim();
				this._updateSourceSettings({ scaleGroup: t || void 0 });
			},
			onBreadcrumbClick: (e) => {
				this._path = e;
			},
			onCloseMenu: () => this._closeAttributeMenu(),
			hideEmptyPickerState: this._pickerEntities().length === 0
		})}
    ` : k``;
	}
};
K([F({ attribute: !1 })], X.prototype, "hass", void 0), K([F({ attribute: !1 })], X.prototype, "initialSources", void 0), K([F({
	type: Boolean,
	attribute: "browser-history"
})], X.prototype, "browserHistory", void 0), K([I()], X.prototype, "_selectedSources", void 0), K([I()], X.prototype, "_attributeMenuOpen", void 0), K([I()], X.prototype, "_entityPickerOpen", void 0), K([I()], X.prototype, "_selectedEntityId", void 0), K([I()], X.prototype, "_entitySearch", void 0), K([I()], X.prototype, "_path", void 0), K([I()], X.prototype, "_attributeSearch", void 0), K([I()], X.prototype, "_componentsReady", void 0), K([I()], X.prototype, "_customEntityIds", void 0), K([I()], X.prototype, "_sourceSettingsSourceId", void 0), customElements.get("abh-series-picker") || customElements.define("abh-series-picker", X);
function ia(e = "ha-better-history") {
	customElements.get(e) || customElements.define(e, Y);
}
//#endregion
//#region src/data/build-better-history-config.ts
function aa(e) {
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
function oa(e) {
	return {
		entity: e.entity,
		...e.attribute !== void 0 && { attribute: e.attribute },
		...e.forced !== void 0 && { forced: e.forced },
		...e.label !== void 0 && { label: e.label },
		...e.color !== void 0 && { color: e.color },
		...e.unit !== void 0 && { unit: e.unit },
		...e.scale_group !== void 0 && { scaleGroup: e.scale_group },
		...e.scale_mode !== void 0 && { scaleMode: e.scale_mode },
		...e.scale_min !== void 0 && { scaleMin: e.scale_min },
		...e.scale_max !== void 0 && { scaleMax: e.scale_max },
		...e.line_mode !== void 0 && { lineMode: e.line_mode },
		...e.line_width !== void 0 && { lineWidth: e.line_width }
	};
}
function sa(e, t) {
	let n = {};
	if (e.series && (n.series = e.series.map(oa)), e.entities && (n.defaultEntities = e.entities), e.attribute_units && (n.attributeUnits = e.attribute_units), e.range_mode === "absolute" ? (e.start_date && (n.startDate = new Date(e.start_date)), e.end_date && (n.endDate = new Date(e.end_date))) : n.hours = e.hours ?? 24, e.show_date_picker !== void 0 && (n.showDatePicker = e.show_date_picker), e.show_entity_picker !== void 0 && (n.showEntityPicker = e.show_entity_picker), e.show_legend !== void 0 && (n.showLegend = e.show_legend), e.show_tooltip !== void 0 && (n.showTooltip = e.show_tooltip), e.show_grid !== void 0 && (n.showGrid = e.show_grid), e.show_scale !== void 0 && (n.showScale = e.show_scale), e.show_import_button !== void 0 && (n.showImportButton = e.show_import_button), e.show_export_button !== void 0 && (n.showExportButton = e.show_export_button), e.show_time_range_selector !== void 0 && (n.showTimeRangeSelector = e.show_time_range_selector), e.disable_climate_overlay !== void 0 && (n.disableClimateOverlay = e.disable_climate_overlay), !t) {
		e.title !== void 0 && (n.title = e.title), e.title_font_family !== void 0 && (n.titleFontFamily = e.title_font_family), e.title_font_size !== void 0 && (n.titleFontSize = e.title_font_size);
		let t = aa(e.title_color);
		t !== void 0 && (n.titleColor = t);
	}
	return e.line_mode !== void 0 && (n.lineMode = e.line_mode), e.line_width !== void 0 && (n.lineWidth = e.line_width), e.show_line_mode_buttons !== void 0 && (n.showLineModeButtons = e.show_line_mode_buttons), e.debug_performance !== void 0 && (n.debugPerformance = e.debug_performance), n;
}
//#endregion
//#region src/localize/localize.ts
var Z = "en", ca = new Set([
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
]), la = { "common.loading": "ui.common.loading" }, ua = {}, da = {};
function fa(e) {
	return new URL(
		/* @vite-ignore */
		`translations/${e}.json`,
		import.meta.url
	).toString();
}
function Q(e, t) {
	let n = (t ?? e?.locale?.language ?? e?.language ?? Z).split("-")[0]?.toLowerCase() ?? Z;
	return ca.has(n) ? n : Z;
}
function pa(e) {
	return (e.split(".").at(-1) ?? e).replace(/_/g, " ").replace(/^\w/, (e) => e.toUpperCase());
}
async function ma(e) {
	if (!ua[e]) return da[e] || (da[e] = fetch(fa(e)).then((e) => {
		if (!e.ok) throw Error(`HTTP ${e.status}`);
		return e.json();
	}).then((t) => {
		ua[e] = t;
	}).catch((t) => {
		console.warn(`[a-better-history-card] Failed to load ${e} translations:`, t), ua[e] = {};
	}).finally(() => {
		delete da[e];
	})), da[e];
}
async function ha(e, t) {
	let n = Q(e, t), r = n === Z ? [Z] : [Z, n];
	return await Promise.all(r.map((e) => ma(e))), n;
}
function $(e, t, n) {
	let r = la[t], i = e?.localize;
	if (r && i) {
		let e = i(r);
		if (e) return e;
	}
	return ua[Q(e, n)]?.[t] ?? ua[Z]?.[t] ?? pa(t);
}
//#endregion
//#region src/components/history-dialog.ts
var ga = class extends P {
	constructor(...e) {
		super(...e), this.open = !1, this._fullscreen = !1, this._controlsVisible = !0, this._toolsOpen = !1, this._translationLanguage = "", this._pickerOverlayOpen = !1, this._suppressNextClose = !1, this._onDocPointerDown = () => {
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
		e !== this._translationLanguage && (this._translationLanguage = e, await ha(this.hass, e), this.requestUpdate());
	}
	_styleDialogHeader() {
		let e = this.renderRoot.querySelector("ha-dialog")?.shadowRoot;
		if (!e || e.querySelector("style[data-abh-header]")) return;
		let t = document.createElement("style");
		t.dataset.abhHeader = "true", t.textContent = "\n      .mdc-dialog__title, .header-title, .title {\n        min-width: 0;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n      .header, .dialog-header, .mdc-dialog__header { gap: 12px; }\n      [name=\"headerActionItems\"], slot[name=\"headerActionItems\"] { flex: 0 0 auto; }\n    ", e.appendChild(t);
	}
	render() {
		let e = this.config, t = e?.title ?? $(this.hass, "dialog.title.history", this.language);
		return k`
      <ha-dialog
        .open=${this.open}
        .headerTitle=${t}
        width="large"
        flexcontent
        ?fullscreen=${this._fullscreen}
        @closed=${(e) => this._onDialogClosed(e)}
      >
        ${e?.show_tools_button ? k`<ha-icon-button
              slot="headerActionItems"
              class="btn btn-tools"
              .label=${$(this.hass, "card.label.tools", this.language)}
              ?active=${this._toolsOpen}
              ?disabled=${this._toolsDisabled(e)}
              @click=${() => {
			this._toolsOpen = !this._toolsOpen;
		}}
            ><ha-icon icon="mdi:tools"></ha-icon></ha-icon-button>` : j}
        ${e?.show_controls_toggle && (e?.show_date_picker || e?.show_entity_picker) ? k`<ha-icon-button
              slot="headerActionItems"
              class="btn"
              .label=${$(this.hass, this._controlsVisible ? "card.label.hide_controls" : "card.label.show_controls", this.language)}
              @click=${() => {
			this._controlsVisible = !this._controlsVisible;
		}}
            ><ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon></ha-icon-button>` : j}
        ${e?.show_fullscreen_button ? k`<ha-icon-button
              slot="headerActionItems"
              class="btn btn-fs"
              .label=${$(this.hass, this._fullscreen ? "dialog.label.exit_fullscreen" : "card.label.fullscreen", this.language)}
              @click=${() => {
			this._fullscreen = !this._fullscreen;
		}}
            ><ha-icon icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon></ha-icon-button>` : j}
        ${this.open && e ? k`<a-better-history-card-history
              .hass=${this.hass}
              .config=${sa(e, !0)}
              .language=${this.language}
              .showControls=${this._controlsVisible}
              .toolsOpen=${this._toolsOpen}
              @picker-overlay-changed=${(e) => this._onPickerOverlayChanged(e)}
              @graph-visibility-changed=${(e) => this._onGraphVisibilityChanged(e)}
              class="history"
            ></a-better-history-card-history>` : j}
      </ha-dialog>
    `;
	}
};
customElements.get("abh-history-dialog") || customElements.define("abh-history-dialog", ga);
//#endregion
//#region src/data/normalize-config.ts
function _a(e) {
	return {
		range_mode: "relative",
		hours: 24,
		show_legend: !0,
		show_tooltip: !0,
		show_grid: !0,
		show_scale: !0,
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
var va = "A Better History Card", ya = "custom:a-better-history-card", ba = "a-better-history-card", xa = "a-better-history-card-history", Sa = "a-better-history-card-editor", Ca = "custom:a-better-history-button-card", wa = "a-better-history-button-card", Ta = "a-better-history-button-card-editor";
//#endregion
//#region src/cards/a-better-history-card.ts
function Ea(e) {
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
var Da = class extends P {
	constructor(...e) {
		super(...e), this._toolsOpen = !1, this._controlsVisible = !0, this._dialogOpen = !1, this._translationLanguage = "";
	}
	static getConfigElement() {
		return document.createElement(Sa);
	}
	static getStubConfig(e) {
		let t = e?.states ?? {}, n = Object.keys(t).find((e) => /^sensor\.[^.]*temperature/.test(e) || e.startsWith("climate.")) ?? Object.keys(t).find((e) => e.startsWith("sensor.") && !isNaN(Number(t[e]?.state)));
		return {
			type: ya,
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
		this.styles = o`
    :host {
      display: block;
      height: 100%;
    }

    ha-card {
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
		!t.entities?.length && t.series?.length, this._config = { ..._a(t) }, this._controlsVisible = this._config.show_controls ?? !0, this._graphVisible = void 0;
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
		e !== this._translationLanguage && (this._translationLanguage = e, await ha(this.hass, e), this.requestUpdate());
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
	_renderHeader() {
		let e = this._config, t = e?.title, n = !!(e?.show_controls_toggle && (e?.show_date_picker || e?.show_entity_picker)), r = e?.show_tools_button || n || e?.show_fullscreen_button;
		if (!t && !r) return j;
		let i = Ea(e?.title_color), a = [
			e?.title_font_family ? `font-family:${e.title_font_family};` : "",
			e?.title_font_size ? `font-size:${e.title_font_size};` : "",
			i ? `color:${i};` : ""
		].join("");
		return k`
      <div class="header">
        ${t ? k`<div class="card-title" style=${a}>${t}</div>` : j}
        ${r ? k`<div class="header-actions">
          ${e.show_tools_button ? k`<ha-icon-button
                .label=${$(this.hass, "card.label.tools")}
                ?active=${this._toolsOpen}
                ?disabled=${this._toolsDisabled(e)}
                @click=${() => {
			this._toolsOpen = !this._toolsOpen;
		}}
              ><ha-icon icon="mdi:tools"></ha-icon></ha-icon-button>` : j}
          ${n ? k`<ha-icon-button
                .label=${$(this.hass, this._controlsVisible ? "card.label.hide_controls" : "card.label.show_controls")}
                @click=${() => {
			this._controlsVisible = !this._controlsVisible;
		}}
              ><ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon></ha-icon-button>` : j}
          ${e.show_fullscreen_button ? k`<ha-icon-button
                .label=${$(this.hass, "card.label.fullscreen")}
                @click=${() => this._openDialog()}
              ><ha-icon icon="mdi:fullscreen"></ha-icon></ha-icon-button>` : j}
        </div>` : j}
      </div>
    `;
	}
	render() {
		let e = this._config;
		if (!e) return k`<ha-card><div class="error">${$(this.hass, "card.error.no_configuration")}</div></ha-card>`;
		let t = sa(e, !!e.title), n = this.hass?.locale?.language ?? this.hass?.language;
		return k`
      <ha-card>
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
function Oa(e) {
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
var ka = class extends P {
	constructor(...e) {
		super(...e), this._open = !1, this._translationLanguage = "";
	}
	static getConfigElement() {
		return document.createElement(Ta);
	}
	static getStubConfig(e) {
		let t = e?.states ?? {}, n = Object.keys(t).find((e) => /^sensor\.[^.]*temperature/.test(e) || e.startsWith("climate.")) ?? Object.keys(t).find((e) => e.startsWith("sensor.") && !isNaN(Number(t[e]?.state)));
		return {
			type: Ca,
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
		this._config = { ..._a(e) };
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
		e !== this._translationLanguage && (this._translationLanguage = e, await ha(this.hass, e), this.requestUpdate());
	}
	render() {
		let e = this._config, t = e?.button_icon ?? "mdi:chart-line", n = e?.button_label ?? $(this.hass, "dialog.title.history"), r = e?.button_show_name !== !1, i = e?.button_show_icon !== !1, a = e?.button_hover_effect !== !1, o = Oa(e?.button_color), s = Oa(e?.button_hover_color), c = this.hass?.locale?.language ?? this.hass?.language, l = [];
		return o && l.push(`--_btn-color: ${o}`), s && l.push(`--_btn-hover-color: ${s}`), l.push(`--_btn-hover-shadow: ${a ? "0 0 0 2px var(--_btn-hover-color, var(--primary-color))" : "none"}`), k`
      <ha-card style=${l.join("; ")} @click=${this._openDialog}>
        <div class="btn-content">
          ${i ? k`<ha-icon icon=${t}></ha-icon>` : null}
          ${r ? k`<span class="label">${n}</span>` : null}
        </div>
      </ha-card>
      <abh-history-dialog
        .open=${this._open}
        .hass=${this.hass}
        .config=${e}
        .language=${c}
        @abh-dialog-closed=${this._onDialogClosed}
      ></abh-history-dialog>
    `;
	}
};
//#endregion
//#region src/editors/series-item-editor.ts
function Aa(e) {
	if (typeof e == "string" && e.trim() !== "") return e.trim();
	if (!Array.isArray(e) || e.length < 3) return;
	let [t, n, r] = e.map((e) => Number(e));
	if ([
		t,
		n,
		r
	].every((e) => Number.isFinite(e))) return `rgb(${t}, ${n}, ${r})`;
}
var ja = class extends P {
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
		let e = Q(this.hass);
		e !== this._translationLanguage && (this._translationLanguage = e, await ha(this.hass, e), this.requestUpdate());
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
				name: "scale_group",
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
		this._emitItem(this._withDefaultUnit(t));
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
		}, n = Aa(e.detail.value);
		n === void 0 || n === "" ? delete t.color : t.color = n, this._emitItem(t);
	}
	render() {
		let e = {
			forced: !0,
			...this.series
		}, t = this._schema(), n = t.filter((e) => e.name === "line_width"), r = t.filter((e) => e.name !== "line_width");
		return k`
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
customElements.get("abh-series-item-editor") || customElements.define("abh-series-item-editor", ja);
//#endregion
//#region src/data/source-to-series.ts
function Ma(e) {
	let t = e;
	return {
		entity: e.entityId,
		attribute: e.kind === "entity_attribute" && e.path ? e.path.join(".") : void 0,
		unit: e.unit,
		scale_group: t.scaleGroup,
		forced: !0
	};
}
//#endregion
//#region src/ha/load-components.ts
var Na = [
	"ha-form",
	"ha-icon",
	"ha-icon-button",
	"ha-button",
	"ha-color-picker",
	"ha-expansion-panel"
], Pa;
function Fa() {
	return Pa ??= Ie(Na), Pa;
}
var Ia;
function La() {
	return Ia ??= Ra(), Ia;
}
async function Ra() {
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
var za = class extends P {
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
		super.connectedCallback(), Fa().then(() => {
			this._componentsReady = !0;
		});
	}
	updated() {
		this._loadTranslations();
	}
	async _loadTranslations() {
		let e = Q(this.hass);
		e !== this._translationLanguage && (this._translationLanguage = e, await ha(this.hass, e), this.requestUpdate());
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
		let t = e.detail.sources.map(Ma);
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
		return k`
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
		let n = k`
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
    `, r = k`
      <div class="series-details">
        <abh-series-item-editor
          .series=${e}
          .hass=${this.hass}
          @item-changed=${(e) => this._onItemChanged(t, e.detail.item)}
        ></abh-series-item-editor>
      </div>
    `;
		return this._componentsReady ? k`
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
    ` : k`${n}${r}`;
	}
};
customElements.get("abh-series-list-editor") || customElements.define("abh-series-list-editor", za);
//#endregion
//#region src/editors/base-card-editor.ts
var Ba = new Set([
	"title_color",
	"button_color",
	"button_hover_color"
]);
function Va(e) {
	if (typeof e == "string" && e.trim() !== "") return e.trim();
	if (!Array.isArray(e) || e.length < 3) return;
	let [t, n, r] = e.map((e) => Number(e));
	if ([
		t,
		n,
		r
	].every((e) => Number.isFinite(e))) return `rgb(${t}, ${n}, ${r})`;
}
var Ha = class extends P {
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
		super.connectedCallback(), Fa().then(() => {
			this._componentsReady = !0;
		}), La().then(() => {
			this._dateRangePickerReady = customElements.get("ha-date-range-picker") !== void 0;
		});
	}
	updated() {
		this._loadTranslations();
	}
	setConfig(e) {
		this._config = { ..._a(e) }, this._editingHours || (this._hoursDraft = this._hoursDisplayValue());
		let t = this._tabs();
		t.find((e) => e.id === this._activeTab) || (this._activeTab = t[0]?.id ?? ""), this._config._store_preview && (this._config = this._withoutStorePreview(this._config), queueMicrotask(() => this._emitConfig()));
	}
	_localize(e) {
		return $(this.hass, e);
	}
	async _loadTranslations() {
		let e = Q(this.hass);
		e !== this._translationLanguage && (this._translationLanguage = e, await ha(this.hass, e), this.requestUpdate());
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
		return k`
      <div class="tabs">
        ${e.map((e) => k`
            <button
              class="tab"
              ?active=${e.id === t}
              @click=${() => {
			this._activeTab = e.id;
		}}
            >${e.label}</button>
          `)}
      </div>
      ${t === "entities" ? this._renderEntitiesTab() : t === "range" ? this._renderRangeTab() : t === "style" ? this._renderStyleTab() : t === "button" ? this._renderButtonTab() : k`
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
		return k`
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
		return e.filter((e) => !Ba.has(e.name));
	}
	_colorFields(e) {
		return e.filter((e) => Ba.has(e.name));
	}
	_renderStyleTab() {
		let e = this._styleSchema(), t = e.filter((e) => e.name === "line_width"), n = this._withoutColorFields(e).filter((e) => e.name !== "line_width");
		return k`
      ${this._renderSchemaForm(n)}
      <ha-form
        class="line-width-form"
        .hass=${this.hass}
        .data=${this._getFormData()}
        .schema=${t}
        .computeLabel=${(e) => this._computeLabel(e)}
        @value-changed=${(e) => this._lineWidthChanged(e)}
      ></ha-form>
      ${this._renderColorGrid(this._colorFields(e))}
    `;
	}
	_renderButtonTab() {
		let e = this._buttonSchema();
		return k`
      ${this._renderSchemaForm(this._withoutColorFields(e))}
      ${this._renderColorGrid(this._colorFields(e))}
    `;
	}
	_renderColorGrid(e) {
		return k`
      <div class="color-grid">
        ${e.map((e) => this._renderColorField(e))}
      </div>
    `;
	}
	_renderColorField(e) {
		return k`
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
		let n = { ...this._config }, r = Va(t.detail.value);
		r === void 0 || r === "" ? delete n[e] : n[e] = r, this._config = n, this._emitConfig();
	}
	_renderEntitiesTab() {
		return k`
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
		return k`
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
      ${this._config.range_mode === "absolute" && this._componentsReady && this._dateRangePickerReady ? k`
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
          ` : k``}
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
}, Ua = class extends Ha {
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
customElements.get("a-better-history-card-editor") || customElements.define(Sa, Ua);
//#endregion
//#region src/editors/a-better-history-button-card-editor.ts
var Wa = class extends Ha {
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
customElements.get("a-better-history-button-card-editor") || customElements.define(Ta, Wa), ia(xa), customElements.get("a-better-history-card") || customElements.define(ba, Da), customElements.get("a-better-history-button-card") || customElements.define(wa, ka), window.customCards = window.customCards ?? [];
var Ga = window.customCards;
Ga.filter((e) => e.type === "a-better-history-card" || e.type === "custom:a-better-history-card" || e.type === "a-better-history-button-card" || e.type === "custom:a-better-history-button-card").forEach((e) => {
	Ga.splice(Ga.indexOf(e), 1);
}), Ga.push({
	type: ba,
	name: va,
	description: "Display history charts directly in your dashboard.",
	preview: !0,
	documentationURL: "https://github.com/KipK/a-better-history-card#readme"
}), Ga.push({
	type: wa,
	name: `${va} Button`,
	description: "Button that opens a history chart dialog.",
	preview: !0,
	documentationURL: "https://github.com/KipK/a-better-history-card#readme"
});
//#endregion
