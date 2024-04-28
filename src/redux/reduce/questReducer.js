import { FETCH_QUEST_SUCCESS,FETCH_QUEST_REQUEST, FETCH_QUEST_ERROR, FETCH_ROOM, FETCH_ROUTE,FETCH_UPDATE } from '../action/type';

const INITIAL_STATE = {
    idquest:0,
    isLoading:false,
    isError:true,
    data:{},
    room:null,
    component:"1",
    update:{}
};
const questReduce = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_QUEST_REQUEST:
           return {
             ...state,
             isLoading:true
           };

        case FETCH_QUEST_SUCCESS:
           return {
              ...state,
              isLoading:false,
              data:action.dataquiz,
           };
           case FETCH_QUEST_ERROR:
           return {
              ...state,

           };
           case FETCH_ROOM:
            return {
               ...state,
               room:action.room
 
            };
            case FETCH_ROUTE:
               return {
                  ...state,
                  component:action.component
               };
               case FETCH_UPDATE:
                  return {
                     ...state,
                     update:action.update
                  };
         default: return state;

    }

};

export default questReduce;