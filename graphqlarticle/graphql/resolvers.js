const Article = require("../models/article");

module.exports = {
  // articles query to fetch all articles
  articles: async () => {
    try {
      const articlesFetched = await Article.find();
      return articlesFetched.map((article) => {
        return {
          ...article._doc,
          _id: article.id,
          createdAt: new Date(article._doc.createdAt).toISOString(),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  // creation of an article
  createArticle: async (args) => {
    try {
      const { title, body } = args.article;
      const article = new Article({ title, body });
      const newArticle = await article.save();
      return { ...newArticle._doc, _id: newArticle.id };
    } catch (err) {
      throw err;
    }
  },
};
