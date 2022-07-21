export const filterWindFarms = (reduxState) => {
  const { supplier, ratedPower, year, height } = reduxState.windfarms.filters;
  const allTurbines = reduxState.windfarms.windTurbines;

  const supplierCondition = (wt) =>
    supplier === "All" ? true : wt.t_manu === supplier;
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

export const selectwindFarm = (name) => (reduxState) => {
  return reduxState.windfarms.windTurbines.filter(
    (wt) => wt.p_name === name.p_name
  );
};

export const selectwindTurbineType = () => (reduxState) => {
  return reduxState.windfarms.windFarmsDetails;
};

export const selectWindTuebinesFromFarm = () => (reduxState) => {
  return reduxState.windfarms.windTurbinesFromAFarm;
};

export const selectTurbinesPerformanceFarms = () => (reduxState) => {
  const data = reduxState.windfarms.windTurbinesPerformance;
  if (!data || data.length === 0) {
    return [];
  }
  const windfarms = data.map((wt) => wt.turbine.p_name);

  return [...new Set(windfarms)];
};

export const selectTurbinesPerformanceTurbines = (windfarm) => (reduxState) => {
  const data = reduxState.windfarms.windTurbinesPerformance;
  if (!data || data.length === 0) {
    return [];
  }
  const turbines = data
    .filter((wt) => windfarm.includes(wt.turbine.p_name))
    .map((wt) => wt.case_id);
  return [...new Set(turbines)];
};

export const selectTurbinesPerformanceProduction =
  (windFarm) => (reduxState) => {
    const data = reduxState.windfarms.windTurbinesPerformance;
    if (!data || data.length === 0) {
      return [];
    }

    const windFarmFiltered = data
      .filter((wf) => windFarm.includes(wf.turbine.p_name))
      .map((wtPower) => wtPower.avgPower);
    const initialValue = 0;

    const production = windFarmFiltered.reduce((pWtPower, cWtPower) => {
      return pWtPower + cWtPower;
    }, initialValue);

    return Math.floor(production / 1000) / 100;
  };

export const selectTurbinesPerformanceAvaiability =
  (windFarm) => (reduxState) => {
    const data = reduxState.windfarms.windTurbinesPerformance;
    if (!data || data.length === 0) {
      return [];
    }

    const windFarmFiltered = data
      .filter((wf) => windFarm.includes(wf.turbine.p_name))
      .map((wtAvaiability) => wtAvaiability.avgAvaiability);
    const initialValue = 0;

    const availability = windFarmFiltered.reduce(
      (pWtAvaiability, cWtAvaiability) => {
        return pWtAvaiability + cWtAvaiability;
      },
      initialValue
    );
    const windFarmFilteredSize = windFarmFiltered.length;

    //console.log("windFarmFiltered", availability);
    return Math.floor((availability * 100) / windFarmFilteredSize) / 100;
  };

export const selectTurbinesPerformancePerformanceIndex =
  (windFarm) => (reduxState) => {
    const data = reduxState.windfarms.windTurbinesPerformance;
    if (!data || data.length === 0) {
      return [];
    }

    const windFarmFiltered = data
      .filter((wf) => windFarm.includes(wf.turbine.p_name))
      .map((wtPerformance) => wtPerformance.avgPerformance);
    const initialValue = 0;

    const performance = windFarmFiltered.reduce(
      (pWtPerformance, cWtPerformance) => {
        return pWtPerformance + cWtPerformance;
      },
      initialValue
    );
    const windFarmFilteredSize = windFarmFiltered.length;

    //console.log("windFarmFiltered", performance);
    return Math.floor((performance * 100) / windFarmFilteredSize) / 100;
  };

export const selectPerformanceFilters = () => (reduxState) => {
  return reduxState.windfarms.performancePageFilter;
};

export const selectPowerGraph = () => (reduxState) => {
  const data = reduxState.windfarms.windTurbinesPerformancePowerGraph;
  // console.log(data);
  return data;
};

export const selectTurbinesAvailability = () => (reduxState) => {
  const data = reduxState.windfarms.windTurbinesAvailability;
  // console.log(data);
  return data;
};

export const selectwindTurbinesAvailabilityConcat = () => (reduxState) => {
  const data = reduxState.windfarms.windTurbinesAvailabilityConcat;
  return data;
};
