import RedisCache from '@shared/cache/RedisCache';

class ProductCacheService {
  static key: string = 'api-vendas-PRODUCT_LIST';
  static redisCache = new RedisCache();

  static async invalidate() {
    await this.redisCache.invalidate(this.key);
  }
}

export default ProductCacheService;
