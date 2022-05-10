import React from "react";

export const AddNewElement = ({ elementType, onClick, buttonText }) => {
    return (
        < div className={`addNew${elementType}Button`} >
            <button onClick={() => onClick()}>
                {buttonText}
            </button>
        </div >
    )
};

export const NamePicker = ({ elementType, resetState, onCreateNewClick }) => {
    let newElementName = "";

    const handleValueChange = (event) => {
        newElementName = event.target.value;
    };
    return (
        < div className={`addNew${elementType}Module`} >
            <input autoFocus type="text" placeholder={`Enter ${elementType} title…`} onChange={handleValueChange} />
            <div>
                <button onClick={() => onCreateNewClick(newElementName)}>{`Add ${elementType}`}</button>
                <button onClick={() => resetState()}>X</button>
            </div>
        </div >
    )
};