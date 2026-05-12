import { C as e, S as t, _ as n, a as r, b as i, c as a, d as o, f as s, g as c, h as l, i as u, l as d, m as f, n as p, o as m, p as h, r as g, s as _, t as v, u as y, v as ee, x as b, y as x } from "./decorators-BBL2xFP6.js";
//#region node_modules/@kipk/ha-better-history/dist/ha-better-history-BgBEvQh2.js
var S = 6e4, te = 48;
function C(e) {
	requestAnimationFrame(() => requestAnimationFrame(e));
}
function w(e) {
	return e instanceof Error ? e.message : String(e);
}
function T(e) {
	return `${e.kind === "entity_attribute" ? "full" : "state"}:${e.entityId}`;
}
function ne(e, t) {
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
function re(e, t) {
	let n = e.findIndex((e) => e.time === t.time);
	if (n !== -1) {
		if (e[n].value === t.value) return e;
		let r = [...e];
		return r[n] = t, r;
	}
	return [...e].reverse().find((e) => e.time < t.time)?.value === t.value ? e : [...e, t].sort((e, t) => e.time - t.time);
}
var ie = class {
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
			accumulator: new o()
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
		return (e.activeEntityLoads.get(T(t)) ?? 0) > 0;
	}
	_beginLoad(e, t) {
		e.activeLoads += 1;
		for (let n of t) {
			e.sourceStates.set(n.id, "loading");
			let t = T(n);
			e.activeEntityLoads.set(t, (e.activeEntityLoads.get(t) ?? 0) + 1);
		}
	}
	_completeLoad(e, t) {
		e.activeLoads = Math.max(0, e.activeLoads - 1);
		for (let n of t) {
			let t = T(n), r = Math.max(0, (e.activeEntityLoads.get(t) ?? 0) - 1);
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
		let t = s() - this._lastProgressUpdateMs, n = Math.max(0, te - t);
		setTimeout(() => {
			requestAnimationFrame(() => {
				this._progressUpdateScheduled = !1, this._isCurrentSession(e) && (this._lastProgressUpdateMs = s(), this.host.requestUpdate());
			});
		}, n);
	}
	fetch(e, t, r, i) {
		let a = `${t.map((e) => e.id).join("|")}|${r.getTime()}|${i.getTime()}`;
		if (a === this._prevKey && !this.error) return;
		if (this._prevKey = a, t.length === 0) {
			this.series = [], this.loading = !1, this.error = "", this.host.requestUpdate();
			return;
		}
		if (!e) {
			this.series = [], this.loading = !1, this.error = "No hass object", this.host.requestUpdate();
			return;
		}
		let o = this._createSession(t, r, i), c = s();
		this.series = [], this.loading = !0, this.error = "", this._beginLoad(o, t), this.debugPerformance && n(this.debugPerformance, "controller.fetch_start", {
			sessionId: o.id,
			sourceCount: t.length,
			rangeHours: Math.round((i.getTime() - r.getTime()) / 36e3) / 100
		}), this.host.requestUpdate(), h(e, o.sources, r, i, (t) => {
			if (!this._isCurrentSession(o)) return;
			let a = s(), c = this._availableSessionSeries(o, e, r, i, t);
			this.series = this._mergeSeries(this.series.filter((e) => !o.sources.some((t) => t.id === e.source.id)), c);
			for (let e of c) o.sourceStates.set(e.source.id, "partial");
			this._requestProgressUpdate(o), this.debugPerformance && n(this.debugPerformance, "controller.progress_update", {
				sessionId: o.id,
				sourceCount: t.length,
				pointCount: t.reduce((e, t) => e + t.points.length, 0),
				updateDurationMs: Math.round(s() - a)
			});
		}, this.debugPerformance ? (e) => {
			n(this.debugPerformance, e.event, e.details);
		} : void 0, {
			isCancelled: () => !this._isCurrentSession(o),
			chunkTimeoutMs: S,
			accumulator: o.accumulator
		}).then((a) => {
			this._isCurrentSession(o) && C(() => {
				if (!this._isCurrentSession(o)) return;
				let l = s(), u = this._availableSessionSeries(o, e, r, i, a), d = this._mergeSeries(this.series.filter((e) => !o.sources.some((t) => t.id === e.source.id)), u);
				ne(this.series, d) || (this.series = d);
				for (let e of u) o.sourceStates.set(e.source.id, "ready");
				this._completeLoad(o, t), this.host.requestUpdate(), this.debugPerformance && n(this.debugPerformance, "controller.fetch_complete", {
					sessionId: o.id,
					sourceCount: a.length,
					pointCount: a.reduce((e, t) => e + t.points.length, 0),
					totalDurationMs: Math.round(s() - c),
					updateDurationMs: Math.round(s() - l)
				});
			});
		}).catch((e) => {
			if (this._isCurrentSession(o)) {
				for (let e of t) o.sourceStates.set(e.id, "error");
				this.error = w(e), this._completeLoad(o, t), this.host.requestUpdate(), this.debugPerformance && n(this.debugPerformance, "controller.fetch_error", {
					sessionId: o.id,
					totalDurationMs: Math.round(s() - c),
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
	addSources(e, t, r, i) {
		if (!e || t.length === 0) return;
		let a = this._activeSession(r, i) ?? this._createSession(this.series.map((e) => e.source), r, i), o = new Set([...this.series.map((e) => e.source.id), ...a.sourceStates.keys()]), c = t.filter((e) => !o.has(e.id));
		if (c.length === 0) return;
		let l = new Set(a.activeEntityLoads.keys());
		this._addSessionSources(a, c);
		let u = c.filter((e) => !this._hasActiveEntityLoad(a, e)), d = new Set(u.map((e) => e.id)), f = a.sources.filter((e) => d.has(e.id) || !l.has(T(e))), p = s();
		for (let e of c) a.sourceStates.set(e.id, u.includes(e) ? "queued" : "loading");
		if (u.length === 0) {
			let t = this._availableSessionSeries(a, e, r, i, []);
			if (t.length > 0) {
				this._mergePartial(t);
				for (let e of t) a.sourceStates.set(e.source.id, "partial");
			}
			this.loading = a.activeLoads > 0, this._requestProgressUpdate(a), this.debugPerformance && n(this.debugPerformance, "controller.add_sources_joined_active_load", {
				sessionId: a.id,
				sourceCount: c.length,
				existingSourceCount: this.series.length
			});
			return;
		}
		this.loading = !0, this._beginLoad(a, u), this.debugPerformance && n(this.debugPerformance, "controller.add_sources_start", {
			sessionId: a.id,
			sourceCount: u.length,
			joinedActiveSourceCount: c.length - u.length,
			existingSourceCount: this.series.length,
			rangeHours: Math.round((i.getTime() - r.getTime()) / 36e3) / 100
		}), this.host.requestUpdate(), h(e, f, r, i, (t) => {
			if (!this._isCurrentSession(a)) return;
			let o = s(), c = this._availableSessionSeries(a, e, r, i, t);
			this._mergePartial(c);
			for (let e of c) a.sourceStates.set(e.source.id, "partial");
			this._requestProgressUpdate(a), this.debugPerformance && n(this.debugPerformance, "controller.add_sources_progress", {
				sessionId: a.id,
				sourceCount: t.length,
				pointCount: t.reduce((e, t) => e + t.points.length, 0),
				mergeDurationMs: Math.round(s() - o)
			});
		}, this.debugPerformance ? (e) => {
			n(this.debugPerformance, e.event, e.details);
		} : void 0, {
			isCancelled: () => !this._isCurrentSession(a),
			chunkTimeoutMs: S,
			accumulator: a.accumulator
		}).then((t) => {
			this._isCurrentSession(a) && C(() => {
				if (!this._isCurrentSession(a)) return;
				let o = s(), c = this._availableSessionSeries(a, e, r, i, t), l = this._mergeSeries(this.series, c);
				ne(this.series, l) || (this.series = l);
				for (let e of c) a.sourceStates.set(e.source.id, "ready");
				this._completeLoad(a, u), this.host.requestUpdate(), this.debugPerformance && n(this.debugPerformance, "controller.add_sources_complete", {
					sessionId: a.id,
					sourceCount: t.length,
					pointCount: t.reduce((e, t) => e + t.points.length, 0),
					totalDurationMs: Math.round(s() - p),
					mergeDurationMs: Math.round(s() - o)
				});
			});
		}).catch((e) => {
			if (this._isCurrentSession(a)) {
				for (let e of u) a.sourceStates.set(e.id, "error");
				this.error = w(e), this._completeLoad(a, u), this.host.requestUpdate(), this.debugPerformance && n(this.debugPerformance, "controller.add_sources_error", {
					sessionId: a.id,
					totalDurationMs: Math.round(s() - p),
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
			let r = l(e, n, a);
			if (!r) return t;
			let c = {
				...r,
				time: Math.min(Math.max(r.time, i), a)
			}, u = re(t.points, c);
			return u === t.points ? t : (o = !0, {
				...t,
				points: u
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
}, E = [
	"#ff9800",
	"#42a5f5",
	"#66bb6a",
	"#ec407a",
	"#ab47bc",
	"#26a69a"
], D = {
	current_temperature: "#42a5f5",
	temperature: "#ff9800"
}, ae = new Set(Object.values(D)), O = E.filter((e) => !ae.has(e));
function k(e) {
	return O[e % O.length];
}
function A(e) {
	return e.trim().toLowerCase();
}
function oe(e) {
	return `hsl(${(e * 137.508 % 360).toFixed(1)} 68% 52%)`;
}
function se(e, t, n) {
	if (!t.has(A(e))) return e;
	let r = [
		...O.slice(n % O.length),
		...O.slice(0, n % O.length),
		...E
	];
	for (let e of r) if (!t.has(A(e))) return e;
	let i = n, a = oe(i);
	for (; t.has(A(a));) i += 1, a = oe(i);
	return a;
}
function ce(e) {
	return A(e);
}
var le = 214;
function ue(e) {
	if (!Number.isFinite(e) || Number.isInteger(e)) return 0;
	let t = e.toString().toLowerCase();
	if (t.includes("e-")) {
		let [e, n] = t.split("e-"), r = e.split(".")[1]?.length ?? 0;
		return Math.min(r + Number(n), 4);
	}
	return Math.min(t.split(".")[1]?.length ?? 0, 4);
}
function j(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
function de(e, t, n = 5) {
	if (!Number.isFinite(e) || !Number.isFinite(t)) return [e, t];
	let r = Math.abs(t - e);
	if (r < 1e-10) return [e];
	let i = fe(r / (Math.max(n, 2) - 1)), a = Math.floor(e / i) * i, o = Math.ceil(t / i) * i, s = i * 1e-8, c = [];
	for (let e = a; e <= o + s; e += i) c.push(pe(e, i));
	return c;
}
function fe(e) {
	if (e <= 0) return 1;
	let t = Math.floor(Math.log10(Math.abs(e))), n = e / 10 ** t, r;
	return r = n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10, r * 10 ** t;
}
function pe(e, t) {
	let n = Math.max(0, -Math.floor(Math.log10(Math.abs(t) || 1)) + 1);
	return parseFloat(e.toFixed(n));
}
function me(e) {
	let t = 0;
	for (let n of e) {
		let e = String(n), r = e.indexOf(".");
		r !== -1 && (t = Math.max(t, e.length - r - 1));
	}
	return t;
}
function he(e, t, n) {
	let r = t - e;
	if (r < 1e-6) {
		let r = Math.max(Math.abs(t) * .05, 1);
		return {
			min: j(e - r, n),
			max: j(t + r, n)
		};
	}
	let i = Math.max(r * .08, 10 ** -n), a = 10 ** n, o = Math.ceil(i * a) / a;
	return {
		min: j(e - o, n),
		max: j(t + o, n)
	};
}
function ge(e) {
	return 28 + (Math.max(e, 1) - 1) * le + 180 + 18;
}
var _e = .15, ve = 8;
function ye(e) {
	return Math.max(e.max - e.min, 1e-9);
}
function be(e) {
	return (e.min + e.max) / 2;
}
function M(e) {
	return Math.log10(Math.max(Math.abs(e), 1e-9));
}
function N(e, t) {
	let n = Math.abs(M(ye(e)) - M(ye(t))), r = Math.abs(M(be(e)) - M(be(t))), i = e.unit && t.unit && e.unit !== t.unit ? .4 : 0;
	return n + r * .6 + i;
}
function xe(e) {
	if (e.length < 2) return !1;
	let t = Math.min(...e.map((e) => e.min)), n = Math.max(...e.map((e) => e.max)), r = Math.max(n - t, 1e-9), i = e.map((e) => e.max - e.min).filter((e) => e > 1e-6);
	if (i.length < 2) return !1;
	let a = Math.min(...i), o = Math.max(...i);
	return Math.min(...i.map((e) => e / r)) <= _e && (o / Math.max(a, 1e-9) >= ve || r / a >= ve);
}
function Se(e) {
	let t = e[0], n = e[1], r = -Infinity;
	for (let i = 0; i < e.length; i++) for (let a = i + 1; a < e.length; a++) {
		let o = N(e[i], e[a]);
		o > r && (r = o, t = e[i], n = e[a]);
	}
	return t.order <= n.order ? [t, n] : [n, t];
}
function Ce(e) {
	if (!xe(e)) return [e, []];
	let [t, n] = Se(e), r = [], i = [];
	for (let a of e) a.id === t.id ? r.push(a) : a.id === n.id ? i.push(a) : N(a, t) <= N(a, n) ? r.push(a) : i.push(a);
	return [r, i];
}
function P(e, t, n, r) {
	let i = Math.min(...n.map((e) => e.min)), a = Math.max(...n.map((e) => e.max)), o = Math.max(...n.map((e) => e.precision)), s = he(i, a, o), c = de(s.min, s.max);
	return {
		ids: new Set(n.map((e) => e.id)),
		graphKey: e,
		axis: t,
		min: s.min,
		max: s.max,
		precision: Math.max(o, me(c)),
		ticks: c,
		top: r,
		height: 180
	};
}
function we(e) {
	let t = [];
	for (let [n, r] of e.entries()) {
		if (r.valueType !== "number" && r.valueType !== "boolean") continue;
		let e = r.points.map((e) => Number(e.value)).filter((e) => Number.isFinite(e)), i = r.scaleMode === "manual" && r.scaleMin !== void 0 ? r.scaleMin : 0, a = r.scaleMode === "manual" && r.scaleMax !== void 0 ? r.scaleMax : 1, o = r.valueType === "boolean" ? 0 : e.length > 0 ? Math.min(...e) : Math.min(i, a), s = r.valueType === "boolean" ? 1 : e.length > 0 ? Math.max(...e) : Math.max(i, a), c = r.valueType === "boolean" || e.length === 0 ? 0 : Math.max(...e.map((e) => ue(e))), l = r.valueType === "boolean" ? "group:boolean" : r.scaleGroupKey, u = t.find((e) => e.key === l);
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
		let [n, r] = e.key === "group:boolean" ? [e.series, []] : Ce(e.series), i = 28 + t * le, a = P(e.key, "left", n, i);
		return r.length > 0 ? [a, P(e.key, "right", r, i)] : [a];
	});
}
function Te(e, t, n, r) {
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
function F(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function Ee(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function De(e, t) {
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
function Oe(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		if (!n.id.startsWith("attr:")) continue;
		let e = n.id.split(":");
		if (e.length < 3) continue;
		let r = e[1], i = e.slice(2).join(":");
		t.has(r) || t.set(r, {});
		let a = t.get(r);
		i === "current_temperature" || i === "temperature" ? a.temp = n.id : i === "hvac_action" && (a.hvac = n.id);
	}
	for (let [, e] of t) if (e.temp && e.hvac) return {
		tempId: e.temp,
		hvacId: e.hvac
	};
}
function ke(e, t, n) {
	let r = Oe(e);
	if (!r) return [];
	let i = e.find((e) => e.id === r.tempId), a = e.find((e) => e.id === r.hvacId);
	if (!i || !a) return [];
	let o = t.find((e) => e.ids.has(i.id));
	if (!o) return [];
	let s = i.points.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time);
	return s.length === 0 ? [] : Ae(a.points, n).filter((e) => e.value === "heating").reduce((e, t) => {
		let n = e[e.length - 1];
		return n && Math.abs(n.end - t.start) < 1 ? n.end = t.end : e.push({
			start: t.start,
			end: t.end
		}), e;
	}, []).flatMap(({ start: e, end: t }, r) => {
		let i = [
			{
				time: e,
				value: De(s, e)
			},
			...s.filter((n) => n.time > e && n.time < t),
			{
				time: t,
				value: De(s, t)
			}
		].filter((e) => e.value !== void 0);
		if (i.length === 0) return [];
		let c = o.top + o.height, l = [
			`${F(e, n).toFixed(1)},${c.toFixed(1)}`,
			...i.map((e) => `${F(e.time, n).toFixed(1)},${Ee(e.value, o).toFixed(1)}`),
			`${F(t, n).toFixed(1)},${c.toFixed(1)}`
		].join(" ");
		return [{
			id: `${a.id}:heat:${r}`,
			points: l
		}];
	});
}
function Ae(e, t) {
	let n = Date.now();
	return e.flatMap((r, i) => {
		let a = Math.max(r.time, t.start), o = Math.min(e[i + 1]?.time ?? t.end, t.end, n);
		return o > a ? [{
			start: a,
			end: o,
			value: r.value
		}] : [];
	});
}
var je = 16;
function I(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function L(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function R(e, t) {
	return t.find((t) => t.ids.has(e.id));
}
function z(e, t) {
	let n = Date.now(), r = [...e.points].sort((e, t) => e.time - t.time), i = r.findIndex((e) => e.time >= t.start), a = i === -1 ? r.length : i, o = a > 0 ? r.slice(a - 1) : r;
	return o.flatMap((e, r) => {
		let i = Math.max(e.time, t.start), a = Math.min(o[r + 1]?.time ?? t.end, t.end, n);
		return a > i ? [{
			start: i,
			end: a,
			value: e.value
		}] : [];
	});
}
var Me = new Set([
	"off",
	"idle",
	"none",
	"false"
]);
function Ne(e, t, n, r) {
	if (typeof e == "boolean") return e ? t : "var(--better-history-muted-color, var(--secondary-text-color, #888))";
	let i = String(e);
	return Me.has(i.toLowerCase()) ? "var(--better-history-muted-color, var(--secondary-text-color, #888))" : (n.has(i) || n.set(i, E[(r + n.size) % E.length]), n.get(i));
}
function Pe(e, t) {
	return e + 34 + Math.max(t - 1, 0) * 14;
}
function Fe(e, t, n, r) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode === "column") return [];
		let i = R(e, t);
		if (!i) return [];
		let a = Te(Ie(e.points, n, e.lineMode, r), n, 40, 640), { points: o, pathLength: s } = e.lineMode === "line" ? We(a, n, i) : Ue(a, n, i);
		return [{
			id: e.id,
			color: e.color,
			points: o,
			pathLength: s,
			lineWidth: e.lineWidth
		}];
	});
}
function Ie(e, t, n, r) {
	let i = e.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time), a = i.filter((e) => e.time >= t.start && e.time <= t.end);
	if (n === "line") return Re(i, a, t);
	let o = [...i].reverse().find((e) => e.time < t.start), s = o && (a.length === 0 || a[0].time > t.start) ? [{
		time: t.start,
		value: o.value
	}, ...a] : a, c = s[s.length - 1];
	return r.extendStairToEnd && c && c.time < t.end ? [...s, {
		time: t.end,
		value: c.value
	}] : s;
}
function Le(e, t, n) {
	if (!e || !t || e.time === t.time || e.time > n || t.time < n) return;
	let r = (n - e.time) / (t.time - e.time);
	return {
		time: n,
		value: e.value + (t.value - e.value) * r
	};
}
function Re(e, t, n) {
	let r = [...e].reverse().find((e) => e.time < n.start), i = e.find((e) => e.time > n.start), a = [...e].reverse().find((e) => e.time < n.end), o = e.find((e) => e.time > n.end), s = t[0]?.time === n.start ? void 0 : Le(r, i, n.start), c = t[t.length - 1]?.time === n.end ? void 0 : Le(a, o, n.end);
	return [
		s,
		...t,
		c
	].filter((e) => e !== void 0);
}
function ze(e) {
	return e.min <= 0 && e.max >= 0 ? 0 : e.min > 0 ? e.min : e.max;
}
function Be(e, t, n) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode !== "column") return [];
		let r = R(e, t);
		if (!r) return [];
		let i = L(ze(r), r);
		return z(e, n).flatMap((t, a) => {
			let o = Number(t.value);
			if (!Number.isFinite(o)) return [];
			let s = I(t.start, n), c = I(t.end, n), l = L(o, r), u = Math.max(c - s, 1);
			return [{
				id: `${e.id}:${a}`,
				x: s,
				y: Math.min(l, i),
				width: u,
				height: Math.max(Math.abs(i - l), 1),
				fill: e.color
			}];
		});
	});
}
function Ve(e, t, n) {
	let r = t + 10, i = 0;
	return e.flatMap((e, t) => {
		if (e.valueType === "number" || e.valueType === "boolean") return [];
		let a = r + i * 14;
		i += 1;
		let o = /* @__PURE__ */ new Map();
		return z(e, n).reduce((n, r) => {
			let i = Ne(r.value, e.color, o, t), a = n[n.length - 1];
			return a && a.fill === i && Math.abs(a.end - r.start) < 1 ? a.end = r.end : n.push({
				start: r.start,
				end: r.end,
				fill: i
			}), n;
		}, []).map((t, r) => {
			let i = I(t.start, n), o = Math.max(I(t.end, n) - i, 1);
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
function He(e) {
	return e.flatMap((e) => {
		let t = e.height - 10;
		return e.ticks.map((n) => ({
			y: e.top + 5 + t - (n - e.min) / (e.max - e.min) * t,
			value: Ge(n, e.precision)
		}));
	});
}
function Ue(e, t, n) {
	if (e.length === 0) return {
		points: "",
		pathLength: 0
	};
	if (e.length === 1) return {
		points: `${I(e[0].time, t).toFixed(1)},${L(e[0].value, n).toFixed(1)}`,
		pathLength: 0
	};
	let r = [], i = 0;
	for (let a = 0; a < e.length - 1; a++) {
		let o = e[a], s = e[a + 1], c = I(o.time, t), l = L(o.value, n), u = I(s.time, t), d = L(s.value, n);
		a === 0 && r.push(`${c.toFixed(1)},${l.toFixed(1)}`), r.push(`${u.toFixed(1)},${l.toFixed(1)}`), r.push(`${u.toFixed(1)},${d.toFixed(1)}`), i += Math.abs(u - c) + Math.abs(d - l);
	}
	return {
		points: r.join(" "),
		pathLength: i
	};
}
function We(e, t, n) {
	if (e.length === 0) return {
		points: "",
		pathLength: 0
	};
	let r = 0, i;
	return {
		points: e.map((e) => {
			let a = I(e.time, t), o = L(e.value, n);
			return i && (r += Math.hypot(a - i.x, o - i.y)), i = {
				x: a,
				y: o
			}, `${a.toFixed(1)},${o.toFixed(1)}`;
		}).join(" "),
		pathLength: r
	};
}
function Ge(e, t) {
	return t <= 0 && Number.isInteger(e) ? String(e) : e.toFixed(t);
}
var B = 60 * 1e3, V = 60 * B, H = 24 * V, U = [
	10 * B,
	15 * B,
	20 * B,
	30 * B,
	V,
	2 * V,
	3 * V,
	4 * V,
	6 * V,
	8 * V,
	12 * V,
	H,
	2 * H,
	3 * H,
	7 * H,
	14 * H,
	30 * H,
	60 * H,
	90 * H
];
function Ke(e, t) {
	for (let n of U) if (e / n <= t) return n;
	return U[U.length - 1];
}
function qe(e, t, n = 12) {
	let r = t - e;
	if (r <= 0) return [];
	let i = Ke(r, n), a = [], o = Math.ceil(e / i) * i;
	for (let e = o; e < t; e += i) {
		let t = new Date(e);
		a.push({
			time: e,
			bold: t.getHours() === 0 && t.getMinutes() === 0
		});
	}
	return a;
}
function Je(e, t) {
	let n = new Date(e), r = t / H;
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
function Ye(e, t) {
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
function Xe(e, t) {
	return e.map((e) => ({
		...e,
		points: Ye(e.points, t)
	}));
}
function W(e) {
	return e.valueType === "boolean" ? "group:boolean" : e.scaleGroupKey;
}
function Ze(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	for (let t of e) {
		if (t.valueType !== "number" && t.valueType !== "boolean") continue;
		let e = W(t);
		i.set(e, [...i.get(e) ?? [], t]);
	}
	for (let e of t) {
		if (e.valueType !== "number" && e.valueType !== "boolean") continue;
		let t = W(e);
		r.set(t, [...r.get(t) ?? [], e]);
	}
	return [...i.entries()].flatMap(([e, t]) => Xe(r.get(e) ?? t, n));
}
function Qe(e, t, n, r = !1, i = 12, a = !0) {
	let o = { extendStairToEnd: a }, s = we(Ze(e, t, n)), c = new Set(s.map((e) => e.graphKey)).size, l = ge(c), u = e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").length, d = qe(n.start, n.end, i), f = n.end - n.start;
	return {
		allSeries: e,
		visibleSeries: t,
		timeBounds: n,
		extendStairToEnd: a,
		numericScales: s,
		plotBottom: l,
		chartHeight: Pe(l, u),
		numericLines: Fe(t, s, n, o),
		numericColumns: Be(t, s, n),
		segments: Ve(t, l, n),
		heatingAreas: r ? [] : ke(t, s, n),
		yAxisLabels: He(s),
		xAxisLabels: d.map((e) => ({
			x: I(e.time, n),
			label: Je(e.time, f),
			bold: e.bold
		}))
	};
}
function $e(e, t, n, r, i) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode !== "column").flatMap((e) => {
		let a = R(e, t);
		if (!a) return [];
		let o = {
			...a,
			top: 28,
			height: i
		}, s = Te(Ie(e.points, n, e.lineMode, r), n, 40, 640), { points: c, pathLength: l } = e.lineMode === "line" ? We(s, n, o) : Ue(s, n, o);
		return {
			id: e.id,
			color: e.color,
			points: c,
			pathLength: l,
			lineWidth: e.lineWidth
		};
	});
}
function et(e, t, n, r) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode === "column").flatMap((e) => {
		let i = R(e, t);
		if (!i) return [];
		let a = {
			...i,
			top: 28,
			height: r
		}, o = L(ze(a), a);
		return z(e, n).flatMap((t, r) => {
			let i = Number(t.value);
			if (!Number.isFinite(i)) return [];
			let s = I(t.start, n), c = I(t.end, n), l = L(i, a);
			return [{
				id: `${e.id}:${r}`,
				x: s,
				y: Math.min(l, o),
				width: Math.max(c - s, 1),
				height: Math.max(Math.abs(o - l), 1),
				fill: e.color
			}];
		});
	});
}
function tt(e, t, n) {
	return e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").flatMap((e, r) => {
		let i = t + r * 14, a = /* @__PURE__ */ new Map();
		return z(e, n).reduce((t, n) => {
			let i = Ne(n.value, e.color, a, r), o = t[t.length - 1];
			return o && o.fill === i && Math.abs(o.end - n.start) < 1 ? o.end = n.end : t.push({
				start: n.start,
				end: n.end,
				fill: i
			}), t;
		}, []).map((t, r) => {
			let a = I(t.start, n), o = Math.max(I(t.end, n) - a, 1);
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
function nt(e) {
	return e >= 160 ? 5 : e >= 100 ? 4 : e >= 64 ? 3 : 2;
}
function rt(e, t) {
	let n = t - 10, r = nt(t), i = e.ticks.length <= r ? e.ticks : de(e.min, e.max, r), a = e.ticks === i ? e.precision : Math.max(e.precision, me(i));
	return i.map((t) => ({
		y: 33 + n - (t - e.min) / (e.max - e.min) * n,
		value: Ge(t, a)
	}));
}
function it(e, t) {
	return t === 0 ? e : e.split(" ").map((e) => {
		let [n, r] = e.split(",");
		return `${n},${(parseFloat(r) + t).toFixed(1)}`;
	}).join(" ");
}
function at(e, t, n) {
	let r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
	return {
		allSeries: e.map((e, t) => {
			let a = se(e.color, r, n * E.length + t);
			return r.add(ce(a)), i.set(e.id, a), a === e.color ? e : {
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
function ot(e, t = 12, n = 180) {
	let r = [], i = e.timeBounds, a = e.allSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), o = e.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), s = i.end - i.start, c = qe(i.start, i.end, t).map((e) => ({
		x: I(e.time, i),
		label: Je(e.time, s),
		bold: e.bold
	}));
	if (e.numericScales.length === 0 && a.length > 0) {
		let e = o.length, t = e > 0 ? 10 + e * 14 : 0, s = 28 + n + t + 18, l = s + je, u = at(a, o, 0);
		r.push({
			series: u.visibleSeries,
			allSeries: u.allSeries,
			scales: [],
			graphHeight: n,
			svgHeight: s,
			canvasHeight: l,
			lines: [],
			columns: [],
			segments: tt(u.visibleSeries, 28 + n + 10, i),
			yLabels: [],
			rightYLabels: [],
			xLabels: c,
			heatingAreas: []
		});
	}
	let l = [...new Set(e.numericScales.map((e) => e.graphKey))];
	for (let t = 0; t < l.length; t++) {
		let s = l[t], u = e.numericScales.filter((e) => e.graphKey === s), d = u.find((e) => e.axis === "left") ?? u[0], f = u.find((e) => e.axis === "right"), p = new Set(u.flatMap((e) => [...e.ids])), m = e.allSeries.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && W(e) === s), h = e.visibleSeries.filter((e) => p.has(e.id)), g = t === 0 ? [...h, ...o] : h, _ = at(t === 0 ? [...m, ...a] : m, g, t), v = _.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), y = v.length, ee = y > 0 ? 10 + y * 14 : 0, b = 28 + n + ee + 18, x = b + je, S = 28 - d.top, te = rt(d, n), C = f ? rt(f, n) : [];
		r.push({
			series: _.visibleSeries,
			allSeries: _.allSeries,
			scale: d,
			scales: u,
			graphHeight: n,
			svgHeight: b,
			canvasHeight: x,
			lines: $e(_.visibleSeries, u, i, { extendStairToEnd: e.extendStairToEnd }, n),
			columns: et(_.visibleSeries, u, i, n),
			segments: tt(v, 28 + n + 10, i),
			yLabels: te,
			rightYLabels: C,
			xLabels: c,
			heatingAreas: t === 0 ? e.heatingAreas.map((e) => ({
				id: e.id,
				points: it(e.points, S)
			})) : []
		});
	}
	return r;
}
var st = class {
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
			x: I(i, this._timeBounds),
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
		if (!this.tooltip) return b;
		let e = this.tooltip.activeLeft + (this.tooltip.x - 40) / 640 * this.tooltip.activeWidth, n = this.tooltip.activeLeft + (this.tooltip.tooltipX - 40) / 640 * this.tooltip.activeWidth, r = this.tooltip.placement === "above" ? "translate(-50%, calc(-100% - 10px))" : "translate(-50%, 10px)";
		return t`
      <div class="tooltip-axis-pointer" style=${`left:${e.toFixed(1)}px;top:${this.tooltip.activeTop.toFixed(1)}px;height:${this.tooltip.activeHeight.toFixed(1)}px;`}></div>
      <div
        class="tooltip"
        style=${`left:clamp(150px,${n.toFixed(1)}px,calc(100% - 150px));top:${this.tooltip.y.toFixed(1)}px;transform:${r};`}
      >
        <div class="tooltip-time">${new Date(this.tooltip.time).toLocaleString()}</div>
        ${this.tooltip.values.map((e) => t`
            <div class="tooltip-row">
              <span class="tooltip-dot" style=${`background:${e.color}`}></span>
              <span class="tooltip-label">${e.label}</span>
              <span>${e.value}</span>
            </div>
          `)}
      </div>
    `;
	}
}, ct = "temperature";
function lt(e) {
	return e.join(".");
}
function ut(e) {
	return e?.toLowerCase() === ct;
}
function dt(e, t) {
	if (!e || !t) return;
	let n = t[lt(e)];
	return typeof n == "string" && n !== "" ? n : void 0;
}
function ft(e) {
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
var pt = 24, mt = "2.5", ht = [
	"current_temperature",
	"temperature",
	"hvac_action"
], gt = /°[CF]|[CFK]$/;
function G(e) {
	return gt.test(e);
}
function _t(e) {
	return e.scaleMode === "manual" && (e.scaleMin !== void 0 || e.scaleMax !== void 0);
}
function vt(e) {
	return /* @__PURE__ */ new Date(Math.floor(e.getTime() / 1e3) * 1e3);
}
function yt(e) {
	if (e !== void 0) return Array.isArray(e) ? e : e.split(".");
}
function K(e) {
	return e === "line" || e === "column" ? e : "stair";
}
function q(e) {
	return typeof e == "number" ? Number.isFinite(e) && e >= 0 ? String(e) : mt : typeof e == "string" && e.trim() !== "" ? e.trim() : mt;
}
function bt(e, t) {
	return t ? `attr:${e}:${t.join(".")}` : `state:${e}`;
}
function xt(e) {
	return e[e.length - 1] ?? "";
}
function St(e, t, n) {
	let r = e?.states[t];
	return r ? n ? y(r, n)?.valueType ?? "string" : _(r)?.valueType ?? "string" : "number";
}
function Ct(e, t, n, r) {
	if (r) return r;
	if (n) return xt(n);
	let i = e?.states[t]?.attributes.friendly_name;
	return typeof i == "string" && i !== "" ? i : t;
}
function wt(e, t, n, r, i) {
	if (r !== void 0) return r || void 0;
	if (n) return dt(n, i);
	let a = e?.states[t]?.attributes.unit_of_measurement;
	return typeof a == "string" && a !== "" ? a : void 0;
}
function J(e, t, n, r) {
	return n ? `group:${n}` : r === "number" && t ? `unit:${t}` : `series:${e}`;
}
function Tt(e, t, n, r, i, a) {
	let o = yt(e.attribute), s = bt(e.entity, o), c = St(n, e.entity, o), l = wt(n, e.entity, o, e.unit, r);
	return {
		id: s,
		entity: e.entity,
		attribute: o,
		forced: e.forced ?? !0,
		label: Ct(n, e.entity, o, e.label),
		color: e.color ?? k(t),
		unit: l,
		scaleGroupKey: J(s, l, e.scaleGroup, c),
		scaleMode: e.scaleMode ?? "auto",
		scaleMin: e.scaleMin,
		scaleMax: e.scaleMax,
		lineMode: K(e.lineMode ?? i),
		lineWidth: q(e.lineWidth ?? a),
		valueType: c
	};
}
function Et(e, t, n, r, i) {
	let a = n?.states[e];
	if (!a) {
		let n = `state:${e}`;
		return {
			id: n,
			entity: e,
			forced: !0,
			label: e,
			color: k(t),
			scaleGroupKey: `series:${n}`,
			scaleMode: "auto",
			lineMode: K(r),
			lineWidth: q(i),
			valueType: "number"
		};
	}
	let o = _(a);
	if (o) return {
		id: o.id,
		entity: e,
		forced: !0,
		label: o.label,
		color: k(t),
		unit: o.unit,
		scaleGroupKey: J(o.id, o.unit, void 0, o.valueType),
		scaleMode: "auto",
		lineMode: K(r),
		lineWidth: q(i),
		valueType: o.valueType
	};
}
function Dt(e, t) {
	let n = t?.states[e];
	if (!n) return;
	let r = n.attributes, i = r.temperature_unit;
	if (typeof i == "string" && i !== "") return i;
	let a = r.unit_of_measurement;
	if (typeof a == "string" && a !== "") return a;
}
function Ot(e, t, n) {
	if (e.attribute || !e.entity.startsWith("climate.") || !n?.states[e.entity]) return [e];
	let r = Dt(e.entity, n);
	return [e, ...ht.map((i) => {
		let a = [i], o = bt(e.entity, a), s = St(n, e.entity, a), c = D[i] ?? k(t()), l = i === "current_temperature" || i === "temperature" ? r : void 0, u = i === "hvac_action" ? void 0 : "temperature";
		return {
			id: o,
			entity: e.entity,
			attribute: a,
			forced: e.forced,
			label: i,
			color: c,
			unit: l,
			scaleGroupKey: J(o, l, u, s),
			scaleMode: "auto",
			lineMode: e.lineMode,
			lineWidth: e.lineWidth,
			valueType: s
		};
	})];
}
function kt(e) {
	return e.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && G(e.unit))?.unit ?? e.find((e) => e.unit && G(e.unit))?.unit;
}
function At(e) {
	let t = kt(e), n = e.some((e) => e.scaleGroupKey === "group:temperature");
	return e.map((e) => {
		let r = ut(e.unit), i = r && t ? t : e.unit, a = r && i && e.scaleGroupKey === "unit:temperature" ? `unit:${i}` : e.scaleGroupKey;
		return n && e.valueType === "number" && i && G(i) && a.startsWith("unit:") && !_t(e) && (a = "group:temperature"), i !== e.unit || a !== e.scaleGroupKey ? {
			...e,
			unit: i,
			scaleGroupKey: a
		} : e;
	});
}
function jt(e) {
	let { config: t, hass: n } = e, r = e.attributeUnits ?? t?.attributeUnits, i = t?.endDate ?? e.endDate ?? /* @__PURE__ */ new Date(), a = t?.hours ?? e.hours ?? pt, o = t?.startDate ?? e.startDate ?? /* @__PURE__ */ new Date(i.getTime() - a * 36e5), s = t?.lineMode ?? e.lineMode, c = t?.lineWidth ?? e.lineWidth, l;
	l = t?.series && t.series.length > 0 ? t.series.map((e, t) => Tt(e, t, n, r, s, c)) : (t?.defaultEntities ?? e.entities ?? []).map((e, t) => Et(e, t, n, s, c)).filter((e) => e !== void 0);
	let u = l.length;
	return l = l.flatMap((e) => Ot(e, () => u++, n)), l = At(l), {
		startDate: vt(o),
		endDate: vt(i),
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
function Mt() {
	return customElements.get("ha-date-range-picker") !== void 0;
}
async function Nt() {
	await f();
}
function Pt(e, n, r, i) {
	return t`
    <div class="date-picker-wrapper">
      <ha-date-range-picker
        .hass=${e}
        .startDate=${n}
        .endDate=${r}
        time-picker
        extended-presets
        @value-changed=${(e) => {
		let t = e.detail, n = t.value?.startDate ?? t.startDate, r = t.value?.endDate ?? t.endDate;
		n instanceof Date && r instanceof Date && i(n, r);
	}}
      ></ha-date-range-picker>
    </div>
  `;
}
var Ft = /°[CF]|[CFK]$/, It = 60, Lt = 1e3, Y = 24, Rt = 720, zt = 48, Bt = .34, Vt = .72, Ht = 720, X = 2, Ut = [
	"current_temperature",
	"temperature",
	"hvac_action"
], Z = new Set(["current_temperature", "temperature"]), Wt = 5;
function Gt(e) {
	let t = 0;
	for (let n of e) n >= "0" && n <= "9" ? t += 6.2 : n === "." || n === "," ? t += 3.2 : n === "-" ? t += 4 : t += 6.2;
	return Math.ceil(t);
}
function Kt(e) {
	let t = Math.max(0, ...e.map((e) => Gt(e.value)));
	return t > 0 ? `${t + Wt}px` : "0px";
}
function Q(e) {
	return Ft.test(e);
}
var $ = class extends i {
	constructor(...e) {
		super(...e), this.hours = 24, this.showDatePicker = !1, this.showEntityPicker = !1, this.showImportButton = !1, this.showExportButton = !0, this.showTimeRangeSelector = !0, this.showLineModeButtons = !0, this.showLegend = !0, this.showTooltip = !0, this.showGrid = !0, this.showScale = !0, this.showControls = !0, this.debugPerformance = !1, this.toolsOpen = !1, this._hiddenSeriesIds = [], this._liveNow = Date.now(), this._datePickerReady = !1, this._entityComponentsReady = !1, this._attributeMenuOpen = !1, this._attributeSearch = "", this._path = [], this._selectedSources = [], this._removedConfigSourceIds = [], this._customEntityIds = [], this._entityPickerOpen = !1, this._data = new ie(this), this._tooltip = new st(this), this._prevClipX = /* @__PURE__ */ new Map(), this._prevStartTime = 0, this._prevEndTime = 0, this._prevContainerWidth = 0, this._wasLoading = !1, this._suppressLineAnimation = !1, this._pendingAddedSources = [], this._dragDropCommitted = !1, this._lastPickerOverlayOpen = !1, this._importedSeriesMeta = /* @__PURE__ */ new Map(), this._importedDataActive = !1, this._containerWidth = 0, this._chartSurfaceHeight = 0, this._chartSurfaceConstrained = !1, this._lastFetchKey = "", this._lastFetchSources = [], this._lastHassResolveTime = 0, this._getEntityPickerItems = () => g(this.hass), this._getAdditionalEntityPickerItems = (e) => {
			if (!this.hass || !e?.trim()) return [];
			let t = new Set(this._pickerEntities().map((e) => e.entity_id));
			return c(g(this.hass, Object.values(this.hass.states).filter((e) => e !== void 0).filter((e) => !t.has(e.entity_id))), e);
		}, this._handleDocumentPointerDown = (e) => {
			this._attributeMenuOpen && (this._isEventInsideAttributeOverlay(e) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation()));
		}, this._handleDocumentClick = (e) => {
			this._attributeMenuOpen && (this._isEventInsideAttributeOverlay(e) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this._closeAttributeMenu()));
		};
	}
	static {
		this.styles = ee;
	}
	connectedCallback() {
		super.connectedCallback(), r(), document.addEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.addEventListener("mousedown", this._handleDocumentPointerDown, !0), document.addEventListener("click", this._handleDocumentClick, !0), this._resizeObserver = new ResizeObserver((e) => {
			for (let t of e) if (t.target === this) {
				let e = Math.round(t.contentRect.width);
				e !== this._containerWidth && (this._containerWidth = e);
			} else t.target === this._observedChartSurface && this._syncChartSurfaceSize(t.contentRect.height);
		}), this._resizeObserver.observe(this);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), document.removeEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.removeEventListener("mousedown", this._handleDocumentPointerDown, !0), document.removeEventListener("click", this._handleDocumentClick, !0), this._resizeObserver?.disconnect(), this._resizeObserver = void 0, this._sourceAddBatchTimer !== void 0 && (clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = void 0), this._stopLiveClock();
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
		let t = Math.round(e), n = this._observedChartSurface?.querySelector(".chart-graphs"), r = n ? Math.round(n.offsetHeight) : 0, i = r < t - X || t < r - X, a = t < this._chartSurfaceHeight - X, o = this._graphGroupRenderCache?.graphHeight ?? 180, s = this._chartSurfaceConstrained && o !== 180;
		if (i || a || s) {
			this._chartSurfaceHeight !== t && (this._chartSurfaceHeight = t), this._chartSurfaceConstrained ||= !0;
			return;
		}
		this._chartSurfaceHeight !== 0 && (this._chartSurfaceHeight = 0), this._chartSurfaceConstrained &&= !1;
	}
	_effectiveStartDate() {
		return this._rangeStart ?? this.startDate ?? this.config?.startDate ?? /* @__PURE__ */ new Date(Date.now() - (this.config?.hours ?? this.hours ?? 24) * 36e5);
	}
	_effectiveEndDate() {
		let e = this._requestedEndDate(), t = this._liveNow || Date.now();
		return e.getTime() > t ? new Date(t) : e;
	}
	_requestedEndDate() {
		return this._rangeEnd ?? this.endDate ?? this.config?.endDate ?? /* @__PURE__ */ new Date();
	}
	_rangeExtendsFuture() {
		return this._requestedEndDate().getTime() > Date.now();
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
			let e = this._effectiveEndDate().getTime(), t = !this._viewEnd || Math.abs(this._viewEnd.getTime() - e) <= Lt * 2, n = Date.now();
			this._liveNow = n, t && (this._viewEnd = new Date(n));
		}, Lt);
	}
	_stopLiveClock() {
		this._liveNowTimer !== void 0 && (clearInterval(this._liveNowTimer), this._liveNowTimer = void 0);
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
		if (this._resolved && !this._importedDataActive) for (let n of this._activeResolvedSeries()) t.has(n.id) || (t.add(n.id), e.push(ft(n)));
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
		return this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && Q(e.unit))?.unit;
	}
	willUpdate(e) {
		this._data.debugPerformance = this.debugPerformance || this.config?.debugPerformance === !0;
		let t = this._effectiveStartDate().getTime(), n = this._effectiveEndDate().getTime(), r = this._rangeExtendsFuture();
		this._syncLiveClock(), e.has("hass") && r && this._data.updateLivePoints(this.hass, this._lastFetchSources, new Date(t), new Date(n));
		let i = t !== this._prevStartTime || n !== this._prevEndTime, o = this._containerWidth !== this._prevContainerWidth, s = e.has("_rangeStart") || e.has("_rangeEnd") || e.has("startDate") || e.has("endDate") || e.has("config") || e.has("hours");
		(i || o) && (r && i && !o && !s || this._prevClipX.clear(), this._prevStartTime = t, this._prevEndTime = n, this._prevContainerWidth = this._containerWidth), this._data.loading && this._data.series.length === 0 && this._prevClipX.clear();
		let c = /* @__PURE__ */ "_rangeStart._rangeEnd._selectedSources._removedConfigSourceIds.hass.config.entities.hours.startDate.endDate.showDatePicker.showEntityPicker.showLegend.showTooltip.showGrid.showScale.width.height.lineMode.lineWidth.backgroundColor.graphTitle.titleFontFamily.titleFontSize.titleColor.language.debugPerformance.attributeUnits._runtimeLineMode".split(".");
		if (c.some((t) => e.has(t))) {
			let t = !c.some((t) => t !== "hass" && e.has(t));
			if ((e.has("config") || e.has("entities")) && (this._importedDataActive = !1, this._importedSeriesMeta.clear()), t) {
				let e = Math.floor(Date.now() / 1e3) * 1e3;
				if (r && this._lastFetchKey) {
					this._lastHassResolveTime = e;
					return;
				}
				if (e === this._lastHassResolveTime && this._lastFetchKey) return;
				this._lastHassResolveTime = e;
			}
			let n = jt({
				config: this.config,
				entities: this.entities,
				hours: this.hours,
				startDate: this._effectiveStartDate(),
				endDate: this._effectiveEndDate(),
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
			this._reconcileRemovedConfigSourceIds(n), this._resolved = n, !this._rangeStart && !this._rangeEnd && (this._rangeStart = n.startDate, this._rangeEnd = n.endDate), !this._viewStart && !this._viewEnd && (this._viewStart = n.startDate, this._viewEnd = n.endDate);
			let i = this._fetchSources(), o = i.map((e) => e.id).sort().join("|"), s = `${o}|${n.startDate.getTime()}|${n.endDate.getTime()}`;
			if (s !== this._lastFetchKey) {
				let e = o === this._lastFetchKey.split("|").slice(0, -2).join("|") && this._lastFetchKey !== "";
				if (this._lastFetchSources.length > 0 && !e) {
					let e = new Set(this._lastFetchSources.map((e) => e.id)), t = new Set(i.map((e) => e.id)), r = i.filter((t) => !e.has(t.id)), a = this._lastFetchSources.filter((e) => !t.has(e.id)).map((e) => e.id);
					r.length > 0 && a.length === 0 ? (this._lastFetchKey = s, this._lastFetchSources = i, this._data.addSources(this.hass, r, n.startDate, n.endDate)) : a.length > 0 && r.length === 0 ? (this._lastFetchKey = s, this._lastFetchSources = i, this._data.removeSources(a)) : (this._lastFetchKey = s, this._lastFetchSources = i, this._data.fetch(this.hass, i, n.startDate, n.endDate));
				} else this._lastFetchKey = s, this._lastFetchSources = i, this._data.fetch(this.hass, i, n.startDate, n.endDate);
			}
			n.showDatePicker && !this._datePickerReady && Nt().then(() => {
				this._datePickerReady = Mt(), this.requestUpdate();
			}), n.showEntityPicker && !this._entityComponentsReady && a().then(() => {
				this._entityComponentsReady = d(), this.requestUpdate();
			});
		}
	}
	updated(e) {
		this._observeChartSurface(), e.has("_attributeMenuOpen") && this._attributeMenuOpen && this._positionEntityMenu(), (e.has("_attributeMenuOpen") || e.has("_entityPickerOpen")) && this._emitPickerOverlayState(), this._animateClipPaths(), this._wasLoading = this._data.loading;
	}
	_emitPickerOverlayState() {
		let e = this._attributeMenuOpen || this._entityPickerOpen;
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
	_pickScaleGroup(e, t) {
		if (e.valueType !== "number") return `series:${e.id}`;
		let n = e.entityId.startsWith("climate.") && e.path?.length === 1 && Z.has(e.path[0]);
		if (e.unit) {
			let n = t.find((t) => t.unit === e.unit && t.valueType === "number");
			if (n) return n.scaleGroupKey;
			let r = this._resolved?.series.find((t) => t.unit === e.unit && t.valueType === "number");
			if (r) return r.scaleGroupKey;
			let i = this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature");
			if (i && Q(e.unit)) return i.scaleGroupKey;
		}
		if (n) {
			let e = t.find((e) => e.valueType === "number" && e.unit !== void 0 && Q(e.unit));
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
				color: this._importedSeriesMeta.get(n.id)?.color ?? (a ? D[a] : void 0) ?? k(r),
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
			e.valueType,
			this._defaultLineMode(),
			this._defaultLineWidth()
		].join("~"))].join("|");
	}
	_chartData() {
		let e = this._hiddenSeriesIds.join("|"), t = this._chartSourceKey(), r = this._chartRenderCache, i = this._effectiveViewRange(), a = i.start.getTime(), o = i.end.getTime(), c = this._containerWidth, l = !this._data.loading;
		if (r && r.seriesRef === this._data.series && r.sourceKey === t && r.hiddenKey === e && r.startTime === a && r.endTime === o && r.extendStairToEnd === l && r.containerWidth === c) return r.data;
		let u = this._maxXTicks(), d = this._buildRenderSeries(), f = d.filter((e) => !this._hiddenSeriesIds.includes(e.id)), p = {
			start: a,
			end: Math.max(o, a + 1)
		}, m = this._data.debugPerformance, h = m ? s() : 0, g = Qe(d, f, p, this._resolved?.disableClimateOverlay ?? !1, u, l), _ = m ? s() - h : 0;
		return m && n(m, "chart.build_data", {
			allSeriesCount: d.length,
			visibleSeriesCount: f.length,
			pointCount: f.reduce((e, t) => e + t.points.length, 0),
			groupCount: g.numericScales.length,
			segmentCount: g.segments.length,
			lineCount: g.numericLines.length,
			buildDurationMs: Math.round(_)
		}), this._chartRenderCache = {
			seriesRef: this._data.series,
			sourceKey: t,
			hiddenKey: e,
			startTime: a,
			endTime: o,
			extendStairToEnd: l,
			containerWidth: c,
			data: g
		}, g;
	}
	_graphGroups(e) {
		let t = this._maxXTicks(), n = this._graphHeightFor(e), r = this._graphGroupRenderCache;
		if (r && r.dataRef === e && r.maxXTicks === t && r.graphHeight === n) return r.groups;
		let i = ot(e, t, n);
		return this._graphGroupRenderCache = {
			dataRef: e,
			maxXTicks: t,
			graphHeight: n,
			groups: i
		}, i;
	}
	_graphHeightFor(e) {
		if (!this._chartSurfaceConstrained || this._chartSurfaceHeight <= 0) return 180;
		let t = Math.max(new Set(e.numericScales.map((e) => e.graphKey)).size, +!!e.allSeries.some((e) => e.valueType !== "number" && e.valueType !== "boolean"), 1), n = e.allSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").length, r = t * 62 + (n > 0 ? 10 + n * 14 : 0), i = this._chartSurfaceHeight - r, a = this._containerWidth > 0 ? this._containerWidth * 640 / 720 : 640, o = Math.max(180, Math.min(Math.floor(a * Bt), Math.floor(this._chartSurfaceHeight / t * Vt), Ht)), s = Math.floor(Math.max(0, i) / t);
		return Math.max(zt, Math.min(s, o));
	}
	_renderGraphGroup(n) {
		let r = this._resolved?.showLegend ?? !0, i = this._resolved?.showGrid ?? !0, a = this._resolved?.showScale ?? !0, o = n.series.map((e) => e.id).join("|");
		return t`
      <div class="graph-section">
        <div class="graph-row" style=${`--axis-label-gap:${Wt}px;--axis-left-gutter:${a ? Kt(n.yLabels) : "0px"};--axis-right-gutter:${a ? Kt(n.rightYLabels) : "0px"};`}>
          <div class="axis-labels axis-labels--left" style="height:${n.canvasHeight}px">
            ${a ? n.yLabels.map((e) => t`<span class="y-axis-label y-axis-label--left" style="top:${e.y.toFixed(1)}px;">${e.value}</span>`) : b}
          </div>
          <div class="graph-canvas" data-series-ids=${o} style="height:${n.canvasHeight}px">
            <svg
              viewBox="${40} 0 ${640} ${n.svgHeight}"
              height="${n.svgHeight}"
              preserveAspectRatio="none"
            >
              ${i ? n.xLabels.map((t) => e`
                      <line class="grid-line grid-line--vertical" x1=${t.x.toFixed(1)} y1=${18} x2=${t.x.toFixed(1)} y2=${n.svgHeight - 18}></line>
                    `) : b}
              ${i ? n.yLabels.map((t) => e`
                      <line class="grid-line grid-line--horizontal" x1=${40} y1=${t.y.toFixed(1)} x2=${680} y2=${t.y.toFixed(1)}></line>
                    `) : b}
              <defs>
                ${n.lines.map((t) => {
			let r = t.id.replace(/[^a-zA-Z0-9]/g, "_");
			return e`
                    <clipPath id=${`clip-${r}`}>
                      <rect id=${`rect-${r}`} x="0" y="0" width="0" height=${n.svgHeight}></rect>
                    </clipPath>
                  `;
		})}
              </defs>
              ${n.heatingAreas.map((t) => e`<polygon class="climate-heating-area" points=${t.points}></polygon>`)}
              ${n.columns.map((t) => e`<rect class="column" x=${t.x.toFixed(1)} y=${t.y.toFixed(1)} width=${t.width.toFixed(1)} height=${t.height.toFixed(1)} fill=${t.fill}></rect>`)}
              ${n.lines.map((t) => {
			let n = `clip-${t.id.replace(/[^a-zA-Z0-9]/g, "_")}`, r = t.points.split(" "), i = r[r.length - 1], a = i ? parseFloat(i.split(",")[0]) : 0, o = this._prevClipX.get(t.id) ?? 0, s = !this._suppressLineAnimation && a > o;
			return e`<polyline class="line" style=${`--better-history-line-width:${t.lineWidth};`} clip-path="url(#${n})" data-line-id=${t.id} data-animate-clip=${s ? "true" : b} data-target-x=${a} points=${t.points} stroke=${t.color}></polyline>`;
		})}
              ${n.segments.map((t) => e`<rect class="segment" x=${t.x} y=${t.y} width=${t.width} height="9" fill=${t.fill}></rect>`)}
              ${n.series.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").map((t, r) => e`<rect class="segment-border" x=${40} y=${28 + n.graphHeight + 10 + r * 14} width=${640} height="9" fill="none" stroke=${t.color}></rect>`)}
              ${a ? e`<line class="axis" x1=${40} y1=${18} x2=${40} y2=${n.svgHeight - 18}></line>` : b}
              ${a && n.rightYLabels.length > 0 ? e`<line class="axis" x1=${680} y1=${18} x2=${680} y2=${n.svgHeight - 18}></line>` : b}
              ${a ? e`<line class="axis" x1=${40} y1=${n.svgHeight - 18} x2=${680} y2=${n.svgHeight - 18}></line>` : b}
              ${a && n.scale ? n.yLabels.map((t) => e`
                      <line class="axis tick" x1=${40} y1=${t.y.toFixed(1)} x2=${44} y2=${t.y.toFixed(1)}></line>
                    `) : b}
              ${a ? n.rightYLabels.map((t) => e`
                      <line class="axis tick" x1=${676} y1=${t.y.toFixed(1)} x2=${680} y2=${t.y.toFixed(1)}></line>
                    `) : b}
            </svg>
            ${a ? n.xLabels.map((e) => {
			let r = ((e.x - 40) / 640 * 100).toFixed(2);
			return t`<span class="x-axis-label ${e.bold ? "x-axis-label--bold" : ""}" style="left:${r}%;top:${n.svgHeight + 3}px;">${e.label}</span>`;
		}) : b}
          </div>
          <div class="axis-labels axis-labels--right" style="height:${n.canvasHeight}px">
            ${a ? n.rightYLabels.map((e) => t`<span class="y-axis-label y-axis-label--right" style="top:${e.y.toFixed(1)}px;">${e.value}</span>`) : b}
          </div>
        </div>
        ${r && n.allSeries.length > 0 ? t`
            <div class="graph-legend">
              ${n.allSeries.map((e) => t`
                  <button class="legend-item" ?hidden-series=${this._hiddenSeriesIds.includes(e.id)} @click=${() => this._toggleSeries(e.id)}>
                    <span class="swatch" style=${e.valueType === "string" ? `background:color-mix(in srgb,${e.color} 30%,transparent);border:1px solid ${e.color};` : `background:${e.color};`}></span>
                    <span class="legend-label">${e.label}</span>
                  </button>
                `)}
            </div>
          ` : b}
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
			let e = /timed?\s*out/i.test(this._data.error);
			return t`<div class="error">${m(this.hass, e ? "error_timeout" : "error")}</div>`;
		}
		if (!this._resolved || this._resolved.series.length === 0 && this._selectedSources.length === 0) return b;
		let e = this._chartData(), n = e.visibleSeries.some((e) => e.points.length > 0), r = this._resolved.showTooltip, i = this._graphGroups(e), a = i.length > 0 && (n || this._data.loading);
		this._suppressLineAnimation = this._wasLoading && !this._data.loading;
		let o = i.reduce((e, t) => e + t.canvasHeight, 0);
		if (n && r) {
			let t = i.flatMap((e) => e.allSeries.map((e) => ({
				id: e.id,
				label: e.label,
				color: e.color
			})));
			this._tooltip.sync(t, this._data.series, this._hiddenSeriesIds, o, e.timeBounds);
		}
		return t`
      <div class="chart-surface">
        ${a ? t`
              <div class="chart-graphs"
                @pointermove=${r ? (e) => this._tooltip.handlePointerMove(e) : b}
                @pointerleave=${r ? () => this._tooltip.handlePointerLeave() : b}
              >
                ${i.map((e) => this._renderGraphGroup(e))}
                ${r ? this._tooltip.renderTooltip() : b}
              </div>` : this._data.loading ? b : t`<div class="empty">${m(this.hass, "empty")}</div>`}
      </div>
    `;
	}
	_renderEntityPickerUI() {
		return !this._resolved?.showEntityPicker || !this._entityComponentsReady ? b : u({
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
	_minViewSpanMs(e = this._rangeSliderTrackWidthPx()) {
		let { span: t } = this._loadedRangeMs(), n = Math.max(e ?? Rt, Y), r = Math.ceil(t * Y / n), i = Math.min(6e4, Math.max(1, Math.floor(t / 1e3)));
		return Math.min(t, Math.max(1, r, i));
	}
	_minViewRangeStep(e) {
		let t = this._loadedRangeMs();
		return Math.max(1, Math.ceil(this._minViewSpanMs(e) / t.span * 1e3));
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
		return new Date(t + Math.max(0, Math.min(1e3, e)) / 1e3 * (n - t));
	}
	_formatRangeDate(e) {
		return e.toLocaleString(this._resolved?.language ?? void 0, {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	}
	_setViewRangePart(e, t) {
		let n = t.currentTarget, r = Number(n.value), i = this._rangeSliderTrackWidthPx(n), a = this._effectiveViewRange(), o = this._rangePercent(a.start, a.start), s = this._rangePercent(a.end, a.end), c = this._minViewRangeStep(i), l;
		e === "start" ? (l = Math.min(Math.max(r, 0), s - c), n.value = String(l), this._setViewRangeMs(this._dateFromRangePercent(l).getTime(), a.end.getTime(), i)) : (l = Math.max(Math.min(r, 1e3), o + c), n.value = String(l), this._setViewRangeMs(a.start.getTime(), this._dateFromRangePercent(l).getTime(), i));
	}
	_onRangeSelectionPointerDown(e) {
		if (e.button !== 0) return;
		let t = e.currentTarget, n = t.closest(".range-slider-stack");
		if (!(n instanceof HTMLElement)) return;
		let r = n.getBoundingClientRect();
		if (r.width <= 0) return;
		let i = this._loadedRangeMs(), a = this._effectiveViewRange(), o = a.start.getTime(), s = a.end.getTime() - o;
		if (s >= i.span - 1) return;
		e.preventDefault(), e.stopPropagation();
		let c = e.clientX;
		t.setPointerCapture(e.pointerId), t.toggleAttribute("dragging", !0);
		let l = (e) => {
			e.preventDefault();
			let t = (e.clientX - c) / r.width * i.span, n = Math.min(Math.max(o + t, i.start), i.end - s);
			this._setViewRangeMs(n, n + s);
		}, u = () => {
			t.toggleAttribute("dragging", !1), t.removeEventListener("pointermove", l), t.removeEventListener("pointerup", u), t.removeEventListener("pointercancel", u);
		};
		t.addEventListener("pointermove", l), t.addEventListener("pointerup", u), t.addEventListener("pointercancel", u);
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
		if (!this.toolsOpen || !this._resolved) return b;
		let e = this._effectiveViewRange(), n = this._rangePercent(e.start, this._resolved.startDate), r = this._rangePercent(e.end, this._resolved.endDate), i = this._defaultLineMode(), a = this._showTimeRangeSelector(), o = this._showLineModeButtons(), s = this._showExportButton(), c = this._showImportButton();
		return !a && !o && !s && !c ? b : t`
      <div class="tools-panel">
        <div class="tool-range">
          <div class="tool-range-row">
            ${a ? t`
                <div class="tool-range-control">
                  <div class="range-values">
                    <span>${this._formatRangeDate(e.start)}</span>
                    <span>${this._formatRangeDate(e.end)}</span>
                  </div>
                  <div class="range-slider-stack">
                    <div
                      class="range-selection"
                      style="left:${n / 10}%;right:${100 - r / 10}%;"
                    ></div>
                    <div
                      class="range-selection-hit"
                      @pointerdown=${(e) => this._onRangeSelectionPointerDown(e)}
                    ></div>
                    <input class="range-slider" type="range" min="0" max="1000" .value=${String(n)} @input=${(e) => this._setViewRangePart("start", e)} />
                    <input class="range-slider" type="range" min="0" max="1000" .value=${String(r)} @input=${(e) => this._setViewRangePart("end", e)} />
                  </div>
                </div>
                <button
                  class="tool-action-button tool-reset-button"
                  title=${m(this.hass, "reset_zoom")}
                  aria-label=${m(this.hass, "reset_zoom")}
                  @click=${() => this._resetViewRange()}
                >
                  <ha-icon .icon=${"mdi:restore"}></ha-icon>
                </button>
              ` : b}
            <div class="tool-actions">
              ${o ? t`
                <div class="mode-switch" role="group" aria-label=${m(this.hass, "line_mode")}>
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
		].map(([e, n, r]) => t`
                    <button
                      class="mode-button"
                      ?active=${i === e}
                      title=${m(this.hass, r)}
                      @click=${() => this._setRuntimeLineMode(e)}
                    >
                      <ha-icon .icon=${n}></ha-icon>
                    </button>
                  `)}
                </div>
              ` : b}
              ${s ? t`
                  <button
                    class="tool-action-button"
                    title=${m(this.hass, "export_data")}
                    aria-label=${m(this.hass, "export_data")}
                    @click=${() => this._exportData()}
                  >
                    <ha-icon .icon=${"mdi:download"}></ha-icon>
                  </button>
                ` : b}
              ${c ? t`
                  <button
                    class="tool-action-button"
                    title=${m(this.hass, "import_data")}
                    aria-label=${m(this.hass, "import_data")}
                    ?disabled=${this._hasForcedConfigSeries()}
                    @click=${() => this._importData()}
                  >
                    <ha-icon .icon=${"mdi:upload"}></ha-icon>
                  </button>
                ` : b}
            </div>
          </div>
        </div>
      </div>
    `;
	}
	render() {
		let e = this._resolved?.width ?? "100%", n = this._resolved?.backgroundColor ?? "transparent", r = this._resolved?.title?.trim(), i = [
			this._resolved?.titleFontFamily ? `font-family:${this._resolved.titleFontFamily};` : "",
			this._resolved?.titleFontSize ? `font-size:${this._resolved.titleFontSize};` : "",
			this._resolved?.titleColor ? `color:${this._resolved.titleColor};` : ""
		].join("");
		return t`
      <div class="root" style="width:${e};background:${n};">
        ${r ? t`<div class="graph-title" style=${i}>${r}</div>` : b}
        ${this.showControls ? t`<div class="controls-bar">
              ${this._renderDatePicker()}
              ${this._renderEntityPickerUI()}
            </div>` : b}
        ${this._renderToolsPanel()}
        <div class="chart-area">
          ${this._renderChartBody()}
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
	_renderDatePicker() {
		return !this._resolved?.showDatePicker || !this._datePickerReady ? b : Pt(this.hass, this._resolved.startDate, this._resolved.endDate, (e, t) => this._onDateRangeChanged(e, t));
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
	_closeAttributeMenu() {
		this._attributeMenuOpen = !1, this._entityPickerOpen = !1, this._attributeSearch = "";
	}
	_onEntitySelected(e) {
		new Set(this._pickerEntities().map((e) => e.entity_id)).has(e) || (this._customEntityIds = [...this._customEntityIds, e]), this._selectedEntityId = e, this._path = [], this._attributeSearch = "", this._entityPickerOpen = !1, this._attributeMenuOpen = !0;
	}
	_onEntityPickerOpened() {
		this._entityPickerOpen = !0, this._attributeMenuOpen = !1;
	}
	_onEntityPickerClosed() {
		this._entityPickerOpen = !1;
	}
	_isEventInsideAttributeOverlay(e) {
		let t = e.composedPath(), n = this.renderRoot?.querySelector(".entity-menu");
		if (n && t.includes(n)) return !0;
		for (let e of t) {
			if (!(e instanceof HTMLElement)) continue;
			let t = e.localName;
			if (t === "ha-generic-picker" || t === "ha-combo-box" || t === "vaadin-combo-box-overlay" || t === "mwc-menu-surface" || t === "ha-md-list" || t === "md-menu") return !0;
		}
		return !1;
	}
	_sourceWithAttributeUnit(e) {
		if (e.kind !== "entity_attribute" || !e.path) return e;
		let t = dt(e.path, this.attributeUnits ?? this.config?.attributeUnits), n = ut(t) ? this._resolvedTemperatureUnit() ?? t : t;
		return !n || e.unit === n ? e : {
			...e,
			unit: n
		};
	}
	_expandedSelectedSources(e) {
		if (e.kind !== "entity_state" || !e.entityId.startsWith("climate.")) return [this._sourceWithAttributeUnit(e)];
		let t = this.hass?.states[e.entityId];
		if (!t) return [this._sourceWithAttributeUnit(e)];
		let n = typeof t.attributes.temperature_unit == "string" && t.attributes.temperature_unit !== "" ? t.attributes.temperature_unit : typeof t.attributes.unit_of_measurement == "string" && t.attributes.unit_of_measurement !== "" ? t.attributes.unit_of_measurement : void 0, r = Ut.map((r) => {
			let i = y(t, [r]), a = {
				id: `attr:${e.entityId}:${r}`,
				kind: "entity_attribute",
				entityId: e.entityId,
				label: r,
				path: [r],
				valueType: r === "hvac_action" ? "string" : "number",
				unit: Z.has(r) ? n : void 0
			}, o = i ?? a;
			return Z.has(r) && n ? {
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
		})), this._sourceAddBatchTimer !== void 0 && clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = setTimeout(() => this._flushPendingAddedSources(), It);
	}
	_flushPendingAddedSources() {
		if (this._sourceAddBatchTimer = void 0, this._pendingAddedSources.length === 0) return;
		let e = new Set(this._selectedSources.map((e) => e.id)), t = this._pendingAddedSources.filter((t) => !e.has(t.id));
		this._pendingAddedSources = [], t.length !== 0 && (this._selectedSources = [...this._selectedSources, ...t], this.requestUpdate());
	}
	_removeSource(e) {
		let t = this._selectedSources.find((t) => t.id === e);
		if (this._pendingAddedSources = this._pendingAddedSources.filter((t) => t.id !== e), this._activeResolvedSeries().find((t) => t.id === e && t.forced === !1)) {
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
//#endregion
//#region node_modules/@kipk/ha-better-history/dist/define.js
x([p({ attribute: !1 })], $.prototype, "hass", void 0), x([p({ attribute: !1 })], $.prototype, "config", void 0), x([p({ attribute: !1 })], $.prototype, "entities", void 0), x([p({ attribute: !1 })], $.prototype, "attributeUnits", void 0), x([p({ type: Number })], $.prototype, "hours", void 0), x([p({ attribute: !1 })], $.prototype, "startDate", void 0), x([p({ attribute: !1 })], $.prototype, "endDate", void 0), x([p({
	type: Boolean,
	attribute: "show-date-picker"
})], $.prototype, "showDatePicker", void 0), x([p({
	type: Boolean,
	attribute: "show-entity-picker"
})], $.prototype, "showEntityPicker", void 0), x([p({
	type: Boolean,
	attribute: "show-import-button"
})], $.prototype, "showImportButton", void 0), x([p({
	type: Boolean,
	attribute: "show-export-button"
})], $.prototype, "showExportButton", void 0), x([p({
	type: Boolean,
	attribute: "show-time-range-selector"
})], $.prototype, "showTimeRangeSelector", void 0), x([p({
	type: Boolean,
	attribute: "show-line-mode-buttons"
})], $.prototype, "showLineModeButtons", void 0), x([p({
	type: Boolean,
	attribute: "show-legend"
})], $.prototype, "showLegend", void 0), x([p({
	type: Boolean,
	attribute: "show-tooltip"
})], $.prototype, "showTooltip", void 0), x([p({
	type: Boolean,
	attribute: "show-grid"
})], $.prototype, "showGrid", void 0), x([p({
	type: Boolean,
	attribute: "show-scale"
})], $.prototype, "showScale", void 0), x([p({
	type: Boolean,
	attribute: "show-controls"
})], $.prototype, "showControls", void 0), x([p()], $.prototype, "width", void 0), x([p()], $.prototype, "height", void 0), x([p({ attribute: "line-mode" })], $.prototype, "lineMode", void 0), x([p({ attribute: "line-width" })], $.prototype, "lineWidth", void 0), x([p({ attribute: "background-color" })], $.prototype, "backgroundColor", void 0), x([p({ attribute: "graph-title" })], $.prototype, "graphTitle", void 0), x([p({ attribute: "title-font-family" })], $.prototype, "titleFontFamily", void 0), x([p({ attribute: "title-font-size" })], $.prototype, "titleFontSize", void 0), x([p({ attribute: "title-color" })], $.prototype, "titleColor", void 0), x([p()], $.prototype, "language", void 0), x([p({
	type: Boolean,
	attribute: "debug-performance"
})], $.prototype, "debugPerformance", void 0), x([p({
	type: Boolean,
	attribute: "tools-open"
})], $.prototype, "toolsOpen", void 0), x([v()], $.prototype, "_resolved", void 0), x([v()], $.prototype, "_hiddenSeriesIds", void 0), x([v()], $.prototype, "_rangeStart", void 0), x([v()], $.prototype, "_rangeEnd", void 0), x([v()], $.prototype, "_viewStart", void 0), x([v()], $.prototype, "_viewEnd", void 0), x([v()], $.prototype, "_liveNow", void 0), x([v()], $.prototype, "_datePickerReady", void 0), x([v()], $.prototype, "_entityComponentsReady", void 0), x([v()], $.prototype, "_runtimeLineMode", void 0), x([v()], $.prototype, "_attributeMenuOpen", void 0), x([v()], $.prototype, "_attributeSearch", void 0), x([v()], $.prototype, "_selectedEntityId", void 0), x([v()], $.prototype, "_path", void 0), x([v()], $.prototype, "_selectedSources", void 0), x([v()], $.prototype, "_removedConfigSourceIds", void 0), x([v()], $.prototype, "_customEntityIds", void 0), x([v()], $.prototype, "_entityPickerOpen", void 0), x([v()], $.prototype, "_draggingSourceId", void 0), x([v()], $.prototype, "_importedDataActive", void 0), x([v()], $.prototype, "_containerWidth", void 0), x([v()], $.prototype, "_chartSurfaceHeight", void 0), x([v()], $.prototype, "_chartSurfaceConstrained", void 0), customElements.get("ha-better-history") || customElements.define("ha-better-history", $);
//#endregion
