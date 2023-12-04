const db = require("../models");

const supportedModels = new Set([db.Posts, db.Users]);

const defaultSortOptionForPosts = "post_likes";

function addPostFilters(selectOptions, req) {
  const statusFilter = req.query.status;
  const categoryFilter = req.query.category;
  const startDateFilter = req.query.startDate;
  const endDateFilter = req.query.endDate;

  if (statusFilter) {
    selectOptions.where.post_status = statusFilter === "active";
  }

  if (categoryFilter) {
    categories = Array.from(categoryFilter.split(","));

    selectOptions.include[1].where = {
      id: {
        [db.Sequelize.Op.in]: categories
          .filter((id) => !isNaN(id))
          .map((id) => parseInt(id, 10)),
      },
    };
  }

  if (startDateFilter && endDateFilter) {
    selectOptions.where.post_publish_date = {
      [db.Sequelize.Op.between]: [
        new Date(startDateFilter),
        new Date(endDateFilter),
      ],
    };
  }
  return selectOptions;
}

function getDefaultSortByForModel(model) {
  switch (model) {
    case db.Posts:
      return defaultSortOptionForPosts;
    default:
      return null;
  }
}

function initSelectOptionsForModel(model) {
  switch (model) {
    case db.Posts:
      return {
        include: [
          {
            model: db.Users,
            as: "post_author",
            attributes: ["id", "user_login", "user_profile_picture"],
          },
          {
            model: db.Categories,
            as: "post_categories",
            attributes: ["id", "category_title", "category_description"],
          },
          {
            model: db.Likes,
            as: "post_likes",
          },
          {
            model: db.Comments,
            as: "post_comments",
          },
        ],
        where: {},
      };
    case db.Users:
      return {
        attributes: [
          "user_login",
          "user_role",
          "user_rating",
          "user_profile_picture",
        ],
      };
    default:
      return null;
  }
}

function configureSortOptions(selectOptions, model, sortBy, sortOrder) {
  selectOptions.attributes = [
    "id",
    "post_title",
    "post_publish_date",
    "post_content",
    [
      db.sequelize.literal(
        `(SELECT COUNT(*) FROM likes WHERE likes.post_id = Posts.id AND likes.like_type = true)`
      ),
      "like_count",
    ],
  ];

  switch (model) {
    case db.Posts: {
      if (sortBy === defaultSortOptionForPosts) {
        selectOptions.order = [[db.sequelize.literal("like_count"), sortOrder]];
      } else {
        selectOptions.order = [[sortBy, sortOrder]];
      }
      return selectOptions;
    }
    default:
      return null;
  }
}

function configureFilterOption(selectOptions, model, req) {
  switch (model) {
    case db.Posts:
      selectOptions = addPostFilters(selectOptions, req);
      return selectOptions;
    default:
      return null;
  }
}

function prepareSelectOptions(model) {
  return async (req, res, next) => {
    if (!supportedModels.has(model)) return res.sendStatus(501);

    //quick hack
    if (model === db.Users) {
      res.selectOptions = initSelectOptionsForModel(model);
      next();
    } else {
      const sortOrder = req.query.sortOrder || "DESC";
      const sortBy = req.query.sortBy || getDefaultSortByForModel(model);
      let selectOptions = initSelectOptionsForModel(model);
      selectOptions = configureSortOptions(
        selectOptions,
        model,
        sortBy,
        sortOrder
      );
      selectOptions = configureFilterOption(selectOptions, model, req);
      if (selectOptions == null) return res.sendStatus(501);
      res.selectOptions = selectOptions;
      next();
    }
  };
}

module.exports = prepareSelectOptions;
