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

'use strict';

import * as helpers from './helpers';

interface Module {
    client: any;
    setAdd(key: string, value: string | string[]): Promise<void>;
    setsAdd(keys: string[], value: string): Promise<void>;
    setRemove(key: string | string[], value: string | string[]): Promise<void>;
    setsRemove(keys: string[], value: string | string[]): Promise<void>;
    isSetMember(key: string, value: string): Promise<boolean>;
    isSetMembers(key: string, values: string[]): Promise<boolean[] | null>;
    isMemberOfSets(sets: string[], value: string): Promise<boolean[] | null>;
    getSetMembers(key: string): Promise<string[]>;
    getSetsMembers(keys: string[]): Promise<string[][]>;
    setCount(key: string): Promise<number>;
    setsCount(keys: string[]): Promise<number[]>;
    setRemoveRandom(key: string): Promise<string | null>;
}

module.exports = function (module: Module): Module {
    module.setAdd = async function (key: string, value: string | string[]): Promise<void> {
        if (!Array.isArray(value)) {
            value = [value];
        }
        if (!value.length) {
            return;
        }
        await module.client?.sadd(key, value);
    };

    module.setsAdd = async function (keys: string[], value: string): Promise<void> {
        if (!Array.isArray(keys) || !keys.length) {
            return;
        }
        const batch = module.client?.batch();
        keys.forEach(k => batch.sadd(String(k), String(value)));
        await helpers.execBatch(batch);
    };

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

        const batch = module.client?.batch();
        key.forEach(k => batch.srem(String(k), value));
        await helpers.execBatch(batch);
    };

    module.setsRemove = async function (keys: string[], value: string | string[]): Promise<void> {
        const batch = module.client?.batch();
        keys.forEach(k => batch.srem(String(k), value));
        await helpers.execBatch(batch);
    };

    module.isSetMember = async function (key: string, value: string): Promise<boolean> {
        const result = await module.client?.sismember(key, value);
        return result === 1;
    };

    module.isSetMembers = async function (key: string, values: string[]): Promise<boolean[] | null> {
        const batch = module.client?.batch();
        values.forEach(v => batch.sismember(String(key), String(v)));
        const results = await helpers.execBatch(batch);
        return results ? helpers.resultsToBool(results) : null;
    };

    module.isMemberOfSets = async function (sets: string[], value: string): Promise<boolean[] | null> {
        const batch = module.client?.batch();
        sets.forEach(s => batch.sismember(String(s), String(value)));
        const results = await helpers.execBatch(batch);
        return results ? helpers.resultsToBool(results) : null;
    };

    module.getSetMembers = async function (key: string): Promise<string[]> {
        return await module.client?.smembers(key);
    };

    module.getSetsMembers = async function (keys: string[]): Promise<string[][]> {
        const batch = module.client?.batch();
        keys.forEach(k => batch.smembers(String(k)));
        return await helpers.execBatch(batch);
    };

    module.setCount = async function (key: string): Promise<number> {
        return await module.client?.scard(key);
    };

    module.setsCount = async function (keys: string[]): Promise<number[]> {
        const batch = module.client?.batch();
        keys.forEach(k => batch.scard(String(k)));
        return await helpers.execBatch(batch);
    };

    module.setRemoveRandom = async function (key: string): Promise<string | null> {
        return await module.client?.spop(key);
    };

    return module;
};