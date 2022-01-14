const MSG_TYPES = Object.freeze({
  DELETED: "Resource Deleted Successfully",
  UPDATED: "Resource Updated Successfully",
  CREATED: "Resource Created Successfully",
  FETCHED: "Resource Fetched Successfully",
  DUPLICATE: "Resource Already Exist",
  ONE_OR_MORE_DUPLICATE: "One Or More Resource Already Exist",
  NOT_FOUND: "Resource Not Found",
  FILTER_NOT_ALLOWED: "Filter Not Allowed",
  SERVER_ERROR: (msg) => {
    return msg || "An internal error occurred. Try again";
  },
});

module.exports = { MSG_TYPES };
