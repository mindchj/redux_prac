import { useEffect } from "react";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import { createAction, handleActions } from "redux-actions";
import Example from './Example';

const SET_ITEM_NAME = "setItemName";
const SET_ITEM_COMMENT = "setItemComment";
const ADD_FORM_LIST = "addFormList";
const DEL_FORM_LIST = "delFormList";
const MOD_FORM_LIST = "modFormList";

const setItemName = createAction(SET_ITEM_NAME, itemName => itemName);
const setItemComment = createAction(SET_ITEM_COMMENT, itemComment => itemComment);
const addFormList = createAction(ADD_FORM_LIST, form => form);
const delFormList = createAction(DEL_FORM_LIST, idx => idx);
const modFormList = createAction(MOD_FORM_LIST, (form, idx) => ({ form: form, idx: idx }));

const init = {
    itemName : "first",
    itemComment : "first",
    itemDetailFormList : [],
}

export const setter2 = handleActions(
    {
        [SET_ITEM_NAME] : (state, action) => (
            {
                ...state,
                itemName : action.payload+"haha",
            }
        ),
        [SET_ITEM_COMMENT] : (state, action) => (
            {
                ...state,
                itemComment : action.payload,
            }
        ),
        [ADD_FORM_LIST] : (state, action) => (
            {
                ...state,
                itemDetailFormList : state.itemDetailFormList.concat(action.payload),
            }
        ),
        [DEL_FORM_LIST] : (state, action) => (
            {
                ...state,
                itemDetailFormList : state.itemDetailFormList.filter( (row,idx) => idx != action.payload ),
            }
        ),
        [MOD_FORM_LIST] : (state, action) => {
            let newState = state;
            newState.itemDetailFormList[action.payload.idx] = action.payload.form;
            return newState;
        }
    },
    init,
)

export const store = createStore(setter2);

export const ReduxProvider = () => {
    return (
        <Provider store={store}>
            <Container/>
        </Provider>
    )
}

const Container = ({product, setItemName, setItemComment, addFormList, delFormList, modFormList}) => {
    return (
        <div>lll
            {/* <button onClick={()=>setItemName("hahaha")}>버튼</button><br/> */}
            <b>{product.itemName}</b>
            <hr/>
            <Example product={product} setItemName={setItemName} setItemComment={setItemComment}
                     addFormList={addFormList} delFormList={delFormList} modFormList={modFormList} />
        </div>
    )

}

export default connect(
    state => ({
        product : state,
    }),
    {
        setItemName,
        setItemComment,
        addFormList,
        delFormList,
        modFormList,
    }
)(Container);