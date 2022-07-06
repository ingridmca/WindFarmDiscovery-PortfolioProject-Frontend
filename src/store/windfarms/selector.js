export const selectWindTurbines = (reduxState) =>
  reduxState.windfarms.windTurbines;

export const filterWindTurbines = (reduxState) => {
  const { supplier, ratedPower } = reduxState.windfarms.filters;
  const allTurbines = reduxState.windfarms.windTurbines;

  const supplierCondition = (wt) => (!supplier ? true : wt.t_manu === supplier);
  const powerCondition = (wt) =>
    ratedPower === 0 ? true : wt.t_cap <= ratedPower;

  const allFiltered = allTurbines.filter((wt) => {
    return supplierCondition(wt) && powerCondition(wt);
  });

  return allFiltered;
};

export const selectFilters = (reduxState) => {
  return reduxState.windfarms.filters;
};
