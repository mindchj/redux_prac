

import React, { useEffect, useState } from 'react';

const Example = ({product, setItemName, setItemComment, addFormList, delFormList, modFormList}) => {

    const [refresh, setRefresh] = useState(0);
    const [iName, setIName] = useState("");
    const [iComment, setIComment] = useState("");
    const [idx, setIdx] = useState(0);
    const [form, setFrom] = useState(
        {
            price : 0,
            stockQuantity : 0,
            optionName : "",
            optionValue : "",
            mainImg : "",
            subImg : "",
        }
    )

    const onChangeIName = (e) => {
        setIName(e.target.value);
    }

    const onChangeIComment = (e) => {
        setIComment(e.target.value);
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

    useEffect( () => {
        console.log(product);
    },[])


    return (
        <div>
            itemName : <input onChange={onChangeIName} value={iName}/>
            <button onClick={ () => setItemName(iName)}>itemName 입력</button><br/>
            itemComment : <input onChange={onChangeIComment} value={iComment}/>
            <button onClick={ () => setItemComment(iComment)}>itemComment 입력</button><br/>
            price________ : <input name="price" onChange={onChange} value={form.price}/>
            stockQuantity : <input name="stockQuantity" onChange={onChange} value={form.stockQuantity}/>
            optionName : <input name="optionName" onChange={onChange} value={form.optionName}/><br/>
            optionValue : <input name="optionValue" onChange={onChange} value={form.optionValue}/>
            mainImg______ : <input name="mainImg" onChange={onChange} value={form.mainImg}/>
            subImg_____ : <input name="subImg" onChange={onChange} value={form.subImg}/><br/>
            <button onClick={ () => addFormList(form)}>formList 추가</button><br/>
            작업할 idx : <input name="idx" onChange={(e)=>setIdx(e.target.value)} value={idx}/><br/>
            <button onClick={ () => delFormList(idx)}>formList {idx} 삭제</button><br/>
            <button onClick={modFunc}>formList {idx} 수정</button>
            <hr/>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>itemName : {product && product.itemName}</th>
                        <th>itemComment : {product && product.itemComment}</th>
                    </tr>
                    <tr>
                        <th>idx</th>
                        <th>price</th>
                        <th>stockQuantity</th>
                        <th>optionName</th>
                        <th>optionValue</th>
                        <th>mainImg</th>
                        <th>subImg</th>
                    </tr>
                </thead>
                <tbody>
                    {product && product.itemDetailFormList.map( (row,idx) => 
                        <tr key={idx}>
                            <td>{idx}</td>
                            <td>{row.price}</td>
                            <td>{row.stockQuantity}</td>
                            <td>{row.optionName}</td>
                            <td>{row.optionValue}</td>
                            <td>{row.mainImg}</td>
                            <td>{row.subImg}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Example;