import { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {createAction, handleActions} from 'redux-actions';
import App from './App';

const SET_ITEM_NAME = 'itemNamewow';
const SET_ITEM_COMMENT = 'itemCommentwow';
const ADD_FORM_LIST = 'addFormList';
const DELETE_FORM_LIST = 'deleteFormList';
const UPDATE_FORM_LIST = 'updateFormList';

const setItemName = createAction(SET_ITEM_NAME, itemName => itemName);
const setItemComment = createAction(SET_ITEM_COMMENT, itemComment => itemComment);
const addFormList = createAction(ADD_FORM_LIST, addForm => addForm);
const deleteFormList = createAction(DELETE_FORM_LIST, (idx) => idx);
const updateFormList = createAction(UPDATE_FORM_LIST, (updateForm, idx) => ({form: updateForm, idx: idx}) );

const init = {
    "itemName" : "상품명",
    "itemComment" : "상품설명",
    "itemDetailFormList" : [ {
      "price" : 20000,
      "stockQuantity" : 200,
      "optionName" : "옵션이름2",
      "optionValue" : "옵션값2",
      "mainImg" : "대표사진2",
      "subImg" : "옵션사진"
    }, {
      "price" : 10000,
      "stockQuantity" : 100,
      "optionName" : "옵션이름",
      "optionValue" : "옵션값",
      "mainImg" : "대표사진",
      "subImg" : "옵션사진"
    } ]
  };


  export const setter = handleActions(
      {
          [SET_ITEM_NAME]: (state, action) => {
              return {
                  ...state,
                  itemName : action.payload,
              };
          },
          [SET_ITEM_COMMENT]: (state, action) => (
              {
                  ...state,
                  itemComment : action.payload,
              }
          ),
          [ADD_FORM_LIST]: (state, action) => (
              {
                  ...state,
                  itemDetailFormList : [
                      ...state.itemDetailFormList,
                      action.payload,
                  ],
              }
          ),
          [DELETE_FORM_LIST]: (state, action) => (
              {
                  ...state,
                  itemDetailFormList : state.itemDetailFormList.filter( (row,idx) => action.payload !==idx)
              }
          ),
          [UPDATE_FORM_LIST]: (state, action) => {
              let newState = state;
              newState.itemDetailFormList[action.payload.idx] = action.payload.form;
              return newState;
          }
          
      },
      init,
  )

  const Comp = ( {data, setItemName, setItemComment, addFormList, deleteFormList, updateFormList} ) => {

    const [iName, setIName] = useState("hoho");
    const [iComment, setIComment] = useState(data.itemComment);
    const [refresh, setRefresh] = useState(0);


    useEffect( () => {
        console.log("데이터 출력");
        console.log(data);
    },[data])

    const onChange = () => {
        setRefresh(prev => prev + 1);
    }

    const addData = {
        "price" : 20000,
      "stockQuantity" : 300,
      "optionName" : "추가이름",
      "optionValue" : "추가옵션값",
      "mainImg" : "추가대표사진",
      "subImg" : "추가옵션사진"
    }

    const updateData = {
        "price" : 30000,
      "stockQuantity" : 400,
      "optionName" : "수정이름",
      "optionValue" : "수정옵션값",
      "mainImg" : "수정대표사진",
      "subImg" : "수정옵션사진"
    }

    return (
        <div>
            itemName 입력 : <input onChange={(e)=>setIName(e.target.value)}/>
            <button onClick={()=>setItemName(iName)}>변경</button>
            itemComment 입력 : <input onChange={(e)=>setIComment(e.target.value)}/>
            <button onClick={()=>setItemComment(iComment)}>변경</button>
            <br/>
            변경된 itemName : <b>{data.itemName}</b><br/>
            변경된 itemComment : <b>{data.itemComment}</b><br/>
            <button onClick={()=>addFormList(addData)}>FormList 추가</button>
            <button onClick={()=>deleteFormList(3)}>FormList 제거</button>
            <button onClick={()=>{updateFormList(updateData, 3);onChange();}}>FormList 수정</button>
            <App data={data}/>
        </div>
    )
  }

export default connect(
    state => ({
        data : state,
    }),
    {
        setItemName,
        setItemComment,
        addFormList,
        deleteFormList,
        updateFormList,
    }
)(Comp);