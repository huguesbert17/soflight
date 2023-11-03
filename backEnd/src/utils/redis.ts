import redis, {createClient} from 'redis';
import {RedisFunctions, RedisModules, RedisScripts} from "@redis/client/dist/lib/commands";
import RedisClient from "@redis/client/dist/lib/client";

let _client: RedisClient<RedisModules, RedisFunctions, RedisScripts>|null = null;

const getClient = async () => {

    if (_client) return _client;

    _client = await createClient(
        // {
        //     url: 'redis://alice:foobared@awesome.redis.server:6380'
        // }
    ).on('error', err => console.log('Redis Client Error', err))
        .connect()
    return _client
};

module.exports = {
    getClient,
};
