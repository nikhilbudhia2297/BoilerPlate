// import redis, {RedisClient} from "redis";
// import {promisify} from "util";
// import {redisApiCacheUrl} from "../constants/envConfig";
//
// export let redisCache: RedisCache;
//
// export async function createRedisCacheClient() {
//     redisCache = await RedisCache.getInstance();
// }
//
// class RedisCache {
//     static KEY_PREFIX: string = "LoyaltyService";
//     private cache: RedisClient;
//     private static instance: RedisCache;
//
//     protected delAsync: any;
//     protected getAsync: any;
//     protected setAsync: any;
//     protected setexAsync: any;
//     protected incrAsync: any;
//     protected decrAsync: any;
//     protected setnxAsync: any;
//     protected expireAsync: any;
//     protected lpushAsync: any;
//     protected rpushAsync: any;
//     protected lpopAsync: any;
//     protected rpopAsync: any;
//     protected lrangeAsync: any;
//     protected lremAsync: any;
//     protected llenAsync: any;
//     protected lindexAsync: any;
//     protected saddAsync: any;
//     protected smembersAsync: any;
//     protected sremAsync: any;
//     protected scardAsync: any;
//     protected sismemberAsync: any;
//     protected hsetAsync: any;
//     protected hgetAsync: any;
//     protected hgetallAsync: any;
//     protected hdelAsync: any;
//     protected hlenAsync: any;
//     protected scanAsync: any;
//
//     private constructor() {
//
//     }
//
//     public static async getInstance() {
//         if (!RedisCache.instance) {
//             RedisCache.instance = new RedisCache();
//             await RedisCache.instance.createRedisConnection();
//         }
//         return RedisCache.instance;
//     }
//
//     public async get(key: string) {
//         const value = await this.getAsync(this.prefixedKey(key));
//         if (value == null) return null;
//         try {
//             return JSON.parse(value);
//         } catch {
//             return null;
//         }
//     }
//
//     public async set(key: string, value: any, options: any={}) {
//         const args = [this.prefixedKey(key), value]
//         if (options.EX) {
//             args.push('EX');
//             args.push(options.EX);
//         } else if(options.PX) {
//             args.push('PX');
//             args.push(options.PX);
//         }
//         if (options.NX) {
//             args.push('NX')
//         }
//         return await this.setAsync(...args);
//     }
//
//
//     public async del(key: string) {
//         return await this.delAsync(this.prefixedKey(key))
//     }
//
//     // list operations
//     public async lpush(key: string, value: string) {
//         return await this.lpushAsync(this.prefixedKey(key), value);
//     }
//
//     public async rpushAll(key: string, value: Array<string>) {
//         return await this.rpushAsync(this.prefixedKey(key), value);
//     }
//
//     public async rpush(key: string, value: string) {
//         return await this.rpushAsync(this.prefixedKey(key), value);
//     }
//
//     public async lpop(key: string) {
//         return await this.lpopAsync(this.prefixedKey(key));
//     }
//
//     public async rpop(key: string): Promise<string[]> {
//         return await this.rpopAsync(this.prefixedKey(key));
//     }
//
//     public async lrange(key: string, start: number, end: number) {
//         return await this.lrangeAsync(this.prefixedKey(key), start, end)
//     }
//
//     public async lrem(key: string, value: string) {
//         return await this.lremAsync(this.prefixedKey(key), 0, value);
//     }
//
//     public async llen(key: string) {
//         return await this.llenAsync(this.prefixedKey(key));
//     }
//
//     public async lindex(key: string, index: number) {
//         return await this.lindexAsync(this.prefixedKey(key), index);
//     }
//
//     public async expire(key: string, ttl: number) {
//         return await this.expireAsync(this.prefixedKey(key), ttl);
//     }
//
//     public async incr(key: string): Promise<number> {
//         return await this.incrAsync(this.prefixedKey(key));
//     }
//
//     private prefixedKey(key: string) {
//         return RedisCache.KEY_PREFIX + ':' + key;
//     }
//
//     private async createRedisConnection() {
//         const options = { url: redisApiCacheUrl };
//         RedisCache.instance.cache = redis.createClient(options);
//         this.initAsyncMethods();
//     }
//
//     private initAsyncMethods() {
//         this.delAsync = promisify(this.cache.del).bind(this.cache);
//         this.getAsync = promisify(this.cache.get).bind(this.cache);
//         this.setAsync = promisify(this.cache.set).bind(this.cache);
//         this.setexAsync = promisify(this.cache.setex).bind(this.cache);
//         this.incrAsync = promisify(this.cache.incr).bind(this.cache);
//         this.decrAsync = promisify(this.cache.decr).bind(this.cache);
//         this.setnxAsync = promisify(this.cache.setnx).bind(this.cache);
//         this.expireAsync = promisify(this.cache.expire).bind(this.cache);
//         this.lpushAsync = promisify(this.cache.lpush).bind(this.cache);
//         this.rpushAsync = promisify(this.cache.rpush).bind(this.cache);
//         this.lpopAsync = promisify(this.cache.lpop).bind(this.cache);
//         this.rpopAsync = promisify(this.cache.rpop).bind(this.cache);
//         this.lrangeAsync = promisify(this.cache.lrange).bind(this.cache);
//         this.lremAsync = promisify(this.cache.lrem).bind(this.cache);
//         this.llenAsync = promisify(this.cache.llen).bind(this.cache);
//         this.lindexAsync = promisify(this.cache.lindex).bind(this.cache);
//         this.saddAsync = promisify(this.cache.sadd).bind(this.cache);
//         this.smembersAsync = promisify(this.cache.smembers).bind(this.cache);
//         this.sremAsync = promisify(this.cache.srem).bind(this.cache);
//         this.scardAsync = promisify(this.cache.scard).bind(this.cache);
//         this.sismemberAsync = promisify(this.cache.sismember).bind(this.cache);
//         this.hsetAsync = promisify(this.cache.hset).bind(this.cache);
//         this.hgetAsync = promisify(this.cache.hget).bind(this.cache);
//         this.hgetallAsync = promisify(this.cache.hgetall).bind(this.cache);
//         this.hdelAsync = promisify(this.cache.hdel).bind(this.cache);
//         this.hlenAsync = promisify(this.cache.hlen).bind(this.cache);
//         this.scanAsync = promisify(this.cache.scan).bind(this.cache);
//     }
//
// }
