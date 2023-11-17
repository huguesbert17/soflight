"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
let _client = null;
const getClient = () => __awaiter(void 0, void 0, void 0, function* () {
    if (_client)
        return _client;
    _client = yield (0, redis_1.createClient)(
    // {
    //     url: 'redis://alice:foobared@awesome.redis.server:6380'
    // }
    ).on('error', err => console.log('Redis Client Error', err))
        .connect();
    return _client;
});
module.exports = {
    getClient,
};
