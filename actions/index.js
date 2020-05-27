/* eslint-disable import/prefer-default-export */
export const addGroup = newItem => dispath => {
  dispath({
    type: 'ADD_GROUP',
    payload: { name: newItem, score: 0 }
  });
};

export const removeGroup = index => dispath => {
  dispath({
    type: 'REMOVE_GROUP',
    payload: index
  });
};

export const checkAnswer = props => dispath => {
  dispath({
    type: 'CHECK_ANSWER',
    payload: props
  });
};
