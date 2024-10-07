import { execBatch, resultsToBool } from './helpers';

// Interfaces for the Redis client
interface Client {
    sadd: (key: string, value: string | string[]) => Promise<void>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    batch: () => any;
    srem: (key: string, value: string | string[]) => Promise<void>;
    sismember: (key: string, value: string) => Promise<number>;
    smembers: (key: string) => Promise<string[]>;
    scard: (key: string) => Promise<number>;
    spop: (key: string) => Promise<string | null>;
}

// Interfaces for the module
interface ModuleWithClient {
    client: Client;
    setAdd: (key: string, value: string | string[]) => Promise<void>;
    setsAdd: (keys: string[], value: string) => Promise<void>;
    setRemove: (key: string | string[], value: string | string[]) => Promise<void>;
    setsRemove: (keys: string[], value: string) => Promise<void>;
    isSetMember: (key: string, value: string) => Promise<boolean>;
    isSetMembers: (key: string, values: string[]) => Promise<boolean[] | null>;
    isMemberOfSets: (sets: string[], value: string) => Promise<boolean[] | null>;
    getSetMembers: (key: string) => Promise<string[]>;
    getSetsMembers: (keys: string[]) => Promise<string[]>;
    setCount: (key: string) => Promise<number>;
    setsCount: (keys: string[]) => Promise<number[]>;
    setRemoveRandom: (key: string) => Promise<string | null>;
}

export default function (module: ModuleWithClient): ModuleWithClient {
	// // eslint-disable-next-line @typescript-eslint/no-require-imports
	// const { execBatch, resultsToBool } = require('./helpers');

	// setAdd adds a value to a set
	module.setAdd = async function (key: string, value: string | string[]): Promise<void> {
		if (!Array.isArray(value)) {
			value = [value];
		}
		if (!value.length) {
			return;
		}
		await module.client.sadd(key, value);
	};

	// setsAdd adds a value to multiple
	module.setsAdd = async function (keys: string[], value: string): Promise<void> {
		if (!Array.isArray(keys) || !keys.length) {
			return;
		}
		const batch = module.client.batch();
		keys.forEach(k => batch.sadd(String(k), String(value)));
		await execBatch(batch);
	};

	// setRemove removes a value from a set
	module.setRemove = async function (key: string | string[], value: string | string[]): Promise<void> {
		if (!Array.isArray(value)) {
			value = [value];
		}
		if (!Array.isArray(key)) {
			key = [key];
		}
		if (!value.length) {
			return;
		}

		const batch = module.client.batch();
		key.forEach(k => batch.srem(String(k), value));
		await execBatch(batch);
	};

	// setsRemove removes a value from multiple sets
	module.setsRemove = async function (keys: string[], value: string): Promise<void> {
		const batch = module.client.batch();
		keys.forEach(k => batch.srem(String(k), value));
		await execBatch(batch);
	};

	// isSetMember checks if a value is a member of a set
	module.isSetMember = async function (key: string, value: string): Promise<boolean> {
		const result = await module.client.sismember(key, value);
		return result === 1;
	};

	// isSetMembers checks if values are members of a set
	module.isSetMembers = async function (key: string, values: string[]): Promise<boolean[] | null> {
		const batch = module.client.batch();
		values.forEach(v => batch.sismember(String(key), String(v)));
		const results = await execBatch(batch);
		return results ? resultsToBool(results) : null;
	};

	// isMemberOfSets checks if a value is a member of multiple sets
	module.isMemberOfSets = async function (sets: string[], value: string): Promise<boolean[] | null> {
		const batch = module.client.batch();
		sets.forEach(s => batch.sismember(String(s), String(value)));
		const results = await execBatch(batch);
		return results ? resultsToBool(results) : null;
	};

	// getSetMembers returns all members of a set
	module.getSetMembers = async function (key: string): Promise<string[]> {
		return await module.client.smembers(key);
	};

	// getSetsMembers returns all members of multiple sets
	module.getSetsMembers = async function (keys: string[]): Promise<string[]> {
		const batch = module.client.batch();
		keys.forEach(k => batch.smembers(String(k)));
		return await execBatch(batch);
	};

	// setCount returns the number of members in a set
	module.setCount = async function (key: string): Promise<number> {
		return await module.client.scard(key);
	};

	// setsCount returns the number of members in multiple sets
	module.setsCount = async function (keys: string[]): Promise<number[]> {
		const batch = module.client.batch();
		keys.forEach(k => batch.scard(String(k)));
		return await execBatch(batch);
	};

	// setRemoveRandom removes a random member from a set
	module.setRemoveRandom = async function (key: string): Promise<string | null> {
		return await module.client.spop(key);
	};

	return module;
}
