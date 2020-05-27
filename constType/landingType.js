const createRequestTypes = (base, act) =>
  ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    const key = `${act}_${type}`;
    acc[key] = `${base}_${act}_${type}`;
    return acc;
  }, {});

const LANDING_TYPE = {
  ...createRequestTypes('LANDING', 'FETCH_LIST_NEWEST'),
  ...createRequestTypes('LANDING', 'FETCH_LIST_EVENTS'),
  ...createRequestTypes('LANDING', 'FETCH_LIST_BLOGS'),
  ...createRequestTypes('LANDING', 'FETCH_DATA_DETAIL')
};

export default LANDING_TYPE;
