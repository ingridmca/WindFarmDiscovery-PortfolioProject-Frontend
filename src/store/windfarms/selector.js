export const selectWindTurbines = (reduxState) =>
  reduxState.windfarms.windTurbines;

export const filterWindFarms = (reduxState) => {
  const { supplier, ratedPower, year, height } = reduxState.windfarms.filters;
  const allTurbines = reduxState.windfarms.windTurbines;

  const supplierCondition = (wt) => (!supplier ? true : wt.t_manu === supplier);
  const powerCondition = (wt) =>
    ratedPower === 0 ? true : wt.t_cap / 1000 <= ratedPower;

  const yearCondition = (wt) => (year === 1990 ? true : wt.p_year <= year);
  const heightCondition = (wt) => (height === 50 ? true : wt.t_hh <= height);

  const allFiltered = allTurbines.filter((wt) => {
    return (
      supplierCondition(wt) &&
      powerCondition(wt) &&
      yearCondition(wt) &&
      heightCondition(wt)
    );
  });

  return allFiltered;
};

export const selectFilters = (reduxState) => {
  return reduxState.windfarms.filters;
};
