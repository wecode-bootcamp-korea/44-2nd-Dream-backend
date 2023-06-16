class ProductsQueryBuilder {
  constructor(categoryId, ageId, levelId, sort, sortorder) {
    this.categoryId = categoryId;
    this.ageId = ageId;
    this.levelId = levelId;
    this.sort = sort;
    this.sortorder = sortorder;
    this.whereCondition = '';
    this.categoryChose = [];
  }
  categoryIdCondition() {
    if (this.categoryId)
      this.categoryChose.push(`products.category_id IN (${this.categoryId})`);
  }

  ageIdCondtion() {
    if (this.ageId)
      this.categoryChose.push(`products.product_age_id IN (${this.ageId})`);
  }

  levelIdCondition() {
    if (this.levelId)
      this.categoryChose.push(`products.product_level_id IN (${this.levelId})`);
  }
  whereQuery() {
    this.whereCondition =
      this.categoryChose.length > 0
        ? `WHERE ` + `` + `${this.categoryChose.join(' AND ')}`
        : '';
    return this.whereCondition;
  }
  sortQuery() {
    const sortList = {
      like: 'likeCount',
      immediatebuyprice: 'immediateBuyPrice',
      immediateSalePrice: 'immediateSalePrice',
      review: 'reviewCount',
      premium: 'premiumPercent',
    };

    const sortOrder = {
      desc: 'DESC',
      asc: 'ASC',
    };

    const sortCondition = sortList[this.sort]
      ? `${sortList[this.sort]} ${sortOrder[this.sortorder]}`
      : 'products.id';

    return sortCondition;
  }
  build() {
    this.ageIdCondtion();
    this.categoryIdCondition();
    this.levelIdCondition();
    const whereCondition = this.whereQuery();
    const sortCondition = this.sortQuery();
    return { whereCondition, sortCondition };
  }
}

module.exports = ProductsQueryBuilder;
