class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

     search() {
    const Keyword = this.queryStr.Keyword ?{
        name: {
                 $regex: this.queryStr.Keyword,
                $options : "i",
        },
    } : {};

    // console.log(Keyword);
      this.query = this.query.find({ ...Keyword });
      return this;
 }


 filter(){
    const queryCopy = {...this.queryStr}


    // Removing some fields for category

    const removeFields = ["Keyword", "page", "limit"];
    removeFields.forEach(Key=>delete queryCopy[Key]);



     // filter for price

     console.log(queryCopy);
     let queryStr = JSON.stringify(queryCopy);
     queryStr =  queryStr.replace(/\b(gt|gte|lt|gte)\b/g, Key=>`$${Key}`);


    this.query = this.query.find(JSON.parse(queryStr));

    console.log(queryStr);
    return this;
 }



 pagination(resultPerPage){
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
 }
}
 
   module.exports = ApiFeatures;   