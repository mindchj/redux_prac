import { useState } from "react";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import { createAction, handleActions } from "redux-actions";

const SET_ITEM_NAME = "setItemName";
const ADD_FORM_LIST = "addFormList";
const DEL_FORM_LIST = "delFormList";
const MOD_FORM_LIST = "modFormList";

const setItemName = createAction(SET_ITEM_NAME,itemName => itemName);
const addFormList = createAction(ADD_FORM_LIST, form => form);
const delFormList = createAction(DEL_FORM_LIST, idx => idx);
const modFormList = createAction(MOD_FORM_LIST, (form, idx) => ({form:form,idx:idx}));

const init = {
    itemName : "",
    formList : [],
}

export const setter = handleActions(
    {
        [SET_ITEM_NAME] : (state, action) => (
            {
                ...state,
                itemName : action.payload,
            }
        ),
        [ADD_FORM_LIST] : (state, action) => (
            {
                ...state,
                formList : state.formList.concat({
                    ...action.payload,
                }),
            }
        ),
        [DEL_FORM_LIST] : (state, action) => (
            {
                ...state,
                formList : state.formList.filter( (item,idx) => idx != action.payload ),
            }
        ),
        [MOD_FORM_LIST] : (state, action) => {
            let newState = state;
            newState.formList[action.payload.idx] = action.payload.form;
            return newState;
        }
    },
    init,
)

export const store = createStore(setter);

export const ReduxProvider = () => {
    return (
        <Provider store={store}>
            <Comp2/>
        </Provider>
    )
}


const Comp2 = ({data, setItemName, addFormList, delFormList, modFormList}) => {
    const [refresh, setRefresh] = useState(0);
    const [iName, setIName] = useState("");
    const [idx, setIdx] = useState(0);
    const [form, setFrom] = useState(
        {
            optionName : "",
            optionValue : "",
        }
    )

    const onChangeIName = (e) => {
        setIName(e.target.value);
    }

    const onChange = (e) => {
        setFrom(form => ({
            ...form,
            [e.target.name] : e.target.value,
        }));
    }

    const modFunc = () =>{
        modFormList(form, idx);
        setRefresh(prev => prev+1);
    }
    

    return (
        <div>
            itemname : <input onChange={onChangeIName} value={iName}/>
            <button onClick={ () => setItemName(iName)}>itemName 입력</button><br/>
            optionName : <input name="optionName" onChange={onChange} value={form.optionName}/><br/>
            optionValue : <input name="optionValue" onChange={onChange} value={form.optionValue}/><br/>
            <button onClick={ () => addFormList(form)}>formList 추가</button><br/>
            작업할 idx : <input name="idx" onChange={(e)=>setIdx(e.target.value)} value={idx}/><br/>
            <button onClick={ () => delFormList(idx)}>formList {idx} 삭제</button><br/>
            <button onClick={modFunc}>formList {idx} 수정</button>
            <hr/>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>itemName : {data.itemName}</th>
                    </tr>
                    <tr>
                        <th>idx</th>
                        <th>optionName</th>
                        <th>optionValue</th>
                    </tr>
                </thead>
                <tbody>
                    {data.formList.map( (row,idx) => 
                        <tr key={idx}>
                            <td>{idx}</td>
                            <td>{row.optionName}</td>
                            <td>{row.optionValue}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default connect(
    state => ({
        data : state,
    }),
    {
        setItemName,
        addFormList,
        delFormList,
        modFormList,
    }
)(Comp2);