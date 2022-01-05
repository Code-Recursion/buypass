class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // case insensitive
          },
        }
      : {};
    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    //duplicating query
    const queryStrCopy = { ...this.queryStr }; // this.queryStr will be referring to the same obj, so use spread
    // removing some fields for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((item) => delete queryStrCopy[item]);
    // console.log(queryStrCopy);

    // Filter for price and rating
    // console.log(queryStrCopy)
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    // console.log(queryStr)
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
      console.log(this.queryStr)
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
