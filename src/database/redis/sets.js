/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-multi-assign */
/* eslint-disable no-void */
/* eslint-disable max-len */
/* eslint-disable no-sequences */

"use strict";

const __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P((resolve) => {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))((resolve, reject) => {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator.throw(value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
const __generator =
	(this && this.__generator) ||
	function (thisArg, body) {
		let _ = {
			label: 0,
			sent: function () {
				if (t[0] & 1) throw t[1];
				return t[1];
			},
			trys: [],
			ops: [],
		};
		let f;
		let y;
		let t;
		let g;
		return (
			(g = { next: verb(0), throw: verb(1), return: verb(2) }),
			typeof Symbol === "function" &&
				(g[Symbol.iterator] = function () {
					return this;
				}),
			g
		);
		function verb(n) {
			return function (v) {
				return step([n, v]);
			};
		}
		function step(op) {
			if (f) throw new TypeError("Generator is already executing.");
			while ((g && ((g = 0), op[0] && (_ = 0)), _)) {
				try {
					if (
						((f = 1),
						y &&
							(t =
								op[0] & 2
									? y.return
									: op[0]
									? y.throw || ((t = y.return) && t.call(y), 0)
									: y.next) &&
							!(t = t.call(y, op[1])).done)
					)
						return t;
					if (((y = 0), t)) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return { value: op[1], done: false };
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (
								!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
								(op[0] === 6 || op[0] === 2)
							) {
								_ = 0;
								continue;
							}
							if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
			}
			if (op[0] & 5) throw op[1];
			return { value: op[0] ? op[1] : void 0, done: true };
		}
	};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers = require("./helpers");

module.exports = function (module) {
	module.setAdd = function (key, value) {
		return __awaiter(this, void 0, void 0, function () {
			let _a;
			return __generator(this, (_b) => {
				switch (_b.label) {
					case 0:
						if (!Array.isArray(value)) {
							value = [value];
						}
						if (!value.length) {
							return [2];
						}
						return [
							4 /* yield */,
							(_a = module.client) === null || _a === void 0
								? void 0
								: _a.sadd(key, value),
						];
					case 1:
						_b.sent();
						return [2];
				}
			});
		});
	};
	module.setsAdd = function (keys, value) {
		return __awaiter(this, void 0, void 0, function () {
			let batch;
			let _a;
			return __generator(this, (_b) => {
				switch (_b.label) {
					case 0:
						if (!Array.isArray(keys) || !keys.length) {
							return [2];
						}
						batch =
							(_a = module.client) === null || _a === void 0
								? void 0
								: _a.batch();
						keys.forEach((k) => batch.sadd(String(k), String(value)));
						return [4 /* yield */, helpers.execBatch(batch)];
					case 1:
						_b.sent();
						return [2];
				}
			});
		});
	};
	module.setRemove = function (key, value) {
		return __awaiter(this, void 0, void 0, function () {
			let batch;
			let _a;
			return __generator(this, (_b) => {
				switch (_b.label) {
					case 0:
						if (!Array.isArray(value)) {
							value = [value];
						}
						if (!Array.isArray(key)) {
							key = [key];
						}
						if (!value.length) {
							return [2];
						}
						batch =
							(_a = module.client) === null || _a === void 0
								? void 0
								: _a.batch();
						key.forEach((k) => batch.srem(String(k), value));
						return [4 /* yield */, helpers.execBatch(batch)];
					case 1:
						_b.sent();
						return [2];
				}
			});
		});
	};
	module.setsRemove = function (keys, value) {
		return __awaiter(this, void 0, void 0, function () {
			let batch;
			let _a;
			return __generator(this, (_b) => {
				switch (_b.label) {
					case 0:
						batch =
							(_a = module.client) === null || _a === void 0
								? void 0
								: _a.batch();
						keys.forEach((k) => batch.srem(String(k), value));
						return [4 /* yield */, helpers.execBatch(batch)];
					case 1:
						_b.sent();
						return [2];
				}
			});
		});
	};
	module.isSetMember = function (key, value) {
		return __awaiter(this, void 0, void 0, function () {
			let result;
			let _a;
			return __generator(this, (_b) => {
				switch (_b.label) {
					case 0:
						return [
							4 /* yield */,
							(_a = module.client) === null || _a === void 0
								? void 0
								: _a.sismember(key, value),
						];
					case 1:
						result = _b.sent();
						return [2 /* return */, result === 1];
				}
			});
		});
	};
	module.isSetMembers = function (key, values) {
		return __awaiter(this, void 0, void 0, function () {
			let batch;
			let results;
			let _a;
			return __generator(this, (_b) => {
				switch (_b.label) {
					case 0:
						batch =
							(_a = module.client) === null || _a === void 0
								? void 0
								: _a.batch();
						values.forEach((v) => batch.sismember(String(key), String(v)));
						return [4 /* yield */, helpers.execBatch(batch)];
					case 1:
						results = _b.sent();
						return [
							2 /* return */,
							results ? helpers.resultsToBool(results) : null,
						];
				}
			});
		});
	};
	module.isMemberOfSets = function (sets, value) {
		return __awaiter(this, void 0, void 0, function () {
			let batch;
			let results;
			let _a;
			return __generator(this, (_b) => {
				switch (_b.label) {
					case 0:
						batch =
							(_a = module.client) === null || _a === void 0
								? void 0
								: _a.batch();
						sets.forEach((s) => batch.sismember(String(s), String(value)));
						return [4 /* yield */, helpers.execBatch(batch)];
					case 1:
						results = _b.sent();
						return [
							2 /* return */,
							results ? helpers.resultsToBool(results) : null,
						];
				}
			});
		});
	};
	module.getSetMembers = function (key) {
		return __awaiter(this, void 0, void 0, function () {
			let _a;
			return __generator(this, (_b) => {
				switch (_b.label) {
					case 0:
						return [
							4 /* yield */,
							(_a = module.client) === null || _a === void 0
								? void 0
								: _a.smembers(key),
						];
					case 1:
						return [2 /* return */, _b.sent()];
				}
			});
		});
	};
	module.getSetsMembers = function (keys) {
		return __awaiter(this, void 0, void 0, function () {
			let batch;
			let _a;
			return __generator(this, (_b) => {
				switch (_b.label) {
					case 0:
						batch =
							(_a = module.client) === null || _a === void 0
								? void 0
								: _a.batch();
						keys.forEach((k) => batch.smembers(String(k)));
						return [4 /* yield */, helpers.execBatch(batch)];
					case 1:
						return [2 /* return */, _b.sent()];
				}
			});
		});
	};
	module.setCount = function (key) {
		return __awaiter(this, void 0, void 0, function () {
			let _a;
			return __generator(this, (_b) => {
				switch (_b.label) {
					case 0:
						return [
							4 /* yield */,
							(_a = module.client) === null || _a === void 0
								? void 0
								: _a.scard(key),
						];
					case 1:
						return [2 /* return */, _b.sent()];
				}
			});
		});
	};
	module.setsCount = function (keys) {
		return __awaiter(this, void 0, void 0, function () {
			let batch;
			let _a;
			return __generator(this, (_b) => {
				switch (_b.label) {
					case 0:
						batch =
							(_a = module.client) === null || _a === void 0
								? void 0
								: _a.batch();
						keys.forEach((k) => batch.scard(String(k)));
						return [4 /* yield */, helpers.execBatch(batch)];
					case 1:
						return [2 /* return */, _b.sent()];
				}
			});
		});
	};
	module.setRemoveRandom = function (key) {
		return __awaiter(this, void 0, void 0, function () {
			let _a;
			return __generator(this, (_b) => {
				switch (_b.label) {
					case 0:
						return [
							4 /* yield */,
							(_a = module.client) === null || _a === void 0
								? void 0
								: _a.spop(key),
						];
					case 1:
						return [2 /* return */, _b.sent()];
				}
			});
		});
	};
	return module;
};
