import { getPaginateQuery, getSearchQuery, getFieldQuery, getFieldSort } from "@utils/querys";
import { QueryI } from "@modules/interfaces";
import User from "@modules/users/model";

export const getAllUserByQuery = async (query: QueryI, not_equal_users: string[]) => {
  const search = getSearchQuery(query);
  const pag = getPaginateQuery(query);
  const fields = getFieldQuery(query);
  const order = getFieldSort(query);

  if (query.search.length) {
    return await User.find({ _id: { $nin: not_equal_users }, ...search }, fields)
      .sort(order)
      .paginate(pag);
  } else {
    return {
      paginate: {
        currentPag: pag.pag,
        totalPaginate: 0,
        limit: pag.limit,
        totalPag: 0,
        total: 0,
      },
      data: [],
    };
  }
};