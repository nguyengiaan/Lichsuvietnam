import { FETCH_QUEST_SUCCESS,FETCH_QUEST_REQUEST, FETCH_QUEST_ERROR,FETCH_ROOM,FETCH_ROUTE,FETCH_UPDATE } from './type';
export const fetchquestrequest=()=>{
  return {
    type:FETCH_QUEST_REQUEST,
  }
}
export const fetchquestSuccess=(dataquiz)=>{
    return {
      type:FETCH_QUEST_SUCCESS,
      dataquiz:dataquiz
    }
}
export const fetchquesterror=()=>{
    return {
      type:FETCH_QUEST_ERROR,
    }
}
export const fetchroom=(room)=>{
  return {
    type:FETCH_ROOM,
    room:room
  }
}
export const fetchrouter=(component)=>{
  return {
    type:FETCH_ROUTE,
    component:component
  }
}
export const fetchupdate=(update)=>{
  return {
    type:FETCH_UPDATE,
    update:update
  }
}