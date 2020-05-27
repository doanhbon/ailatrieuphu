/* eslint-disable no-console */
import React, { useState } from 'react';
import { withRouter, useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { urlHelper } from 'utils';
// import { DOC_CONST } from 'const';

const SearchContext = React.createContext();
const SearchConsumer = SearchContext.Consumer;
// const { CATEGORY } = DOC_CONST;

const Provider = props => {
  const router = useRouter();
  const defaultState = {
    range: [1, 5],
    languagesCl: [],
    skillsCl: [],
    categoryGroup: {
      indeterminate: [],
      checkAll: []
    },
    categoriesCl: []
  };

  const [state, setState] = useState({
    ...defaultState,
    ...router.query
  });
  const [categoryState, setCategoryState] = useState({
    ...defaultState.categoryGroup,
    ...router.query
  });

  const [facetsData, setFacetsData] = useState({
    search_text: '',
    page_size: 10,
    current_page: 1,
    selected_facets: []
  });

  const getPlainOptions = buckets =>
    buckets &&
    buckets.length > 0 &&
    buckets.map(i => ({
      label: `${i.name} (${i.doc_count})`,
      value: i.name
    }));

  const loadCategoryFilters = facets => {
    setCategoryState({
      ...categoryState,
      checkAll:
        facets &&
        facets.buckets &&
        facets.buckets.map(f => ({
          ...f,
          value: false,
          checkedList: [],
          indeterminate: false
        }))
    });
  };

  const handleRangeChange = value => {
    setState({
      ...state,
      range: value
    });
  };

  const handleCheckedListChange = (checkedList, componentName) => {
    setState({
      ...state,
      [`${componentName}Cl`]: checkedList
    });
  };

  const handlePushFilterParam = (search_text, currentFacets) => {
    const getStringParams = (stext, fcs) => {
      let stringParams = '';
      if (stext) {
        stringParams += `search_text=${stext}`;
      }
      if (fcs && fcs.buckets && fcs.buckets.length > 0) {
        let string = '';
        fcs.buckets.forEach(el => {
          string += `${el.name}__${el.buckets.join()};`;
        });
        stringParams += `${fcs.name}=${string}`;
      }
      return stringParams;
    };

    const strQuery = {
      ...urlHelper.getUrlSearch(getStringParams(search_text, currentFacets))
        .route
    };

    router.push(strQuery.to, strQuery.to, { shallow: true });
  };

  return (
    <SearchContext.Provider
      value={{
        state,
        categoryState,
        facetsData,
        setState,
        getPlainOptions,
        handleRangeChange,
        handleCheckedListChange,
        loadCategoryFilters,
        setCategoryState,
        handlePushFilterParam,
        setFacetsData
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

const SearchProvider = withRouter(Provider);

export { SearchContext, SearchConsumer, SearchProvider };

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any)
};
Provider.defaultProps = {
  children: {}
};
