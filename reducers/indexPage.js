const initialState = {
  groups: []
  // success: false
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case 'ADD_GROUP':
      return {
        ...state,
        groups: state.groups.concat(action.payload)
      };
    case 'REMOVE_GROUP': {
      const temp = [...state.groups];
      temp.splice(action.payload, 1);

      return {
        ...state,
        groups: temp
      };
    }
    case 'CHECK_ANSWER':
      const temp = [...state.groups];
      const { listAnswer, index, exactAnwser } = action.payload;
      for (let i = 0; i < listAnswer.length; i++) {
        if (listAnswer[i] === exactAnwser) {
          if ((index + 1) % 5 === 0) {
            temp[i].score += 500;
          } else {
            temp[i].score += 100;
          }
        }
      }

      return {
        ...state,
        groups: temp
      };
    default:
      return state;
  }
}
