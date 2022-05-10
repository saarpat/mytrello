import React, { useState } from "react";

import { AddNewElement, NamePicker } from "./AddNewElementModule"
import { Card } from "./Card"


// NEED TO ADD KEYS TO CARD TAG


export const List = ({ datakey, listName, deleteList }) => {


    //TO DO: SHOULD I RAISE THESE STATES UP?
    //----------------------------------

    // Create a New card Button click state
    const [isInitialState, setState] = useState(true);
    // Add new list to Trello's lists array
    const [cardsArr, editCardsArr] = useState([]);

    const addNewCardBtnPress = (newCardName) => {
        if (newCardName.replace(/\s/g, '') !== "") {
            const newCard = [{
                component: <Card key={cardsArr.length} datakey={cardsArr.length} cardName={newCardName.trim()} deleteCard={key => editCardsArr(cardsArr => hideElement(key, cardsArr))} />,
                hidden: false
            }];
            editCardsArr(cardsArr.concat(newCard));
            setState(true);
        }
    };

    const hideElement = (id, arr) => {
        let newArr = [...arr];
        newArr[id].hidden = true;
        return newArr
    };

    return (
        <div className='list'>
            <div className={`list-title`}>
                <h2 contentEditable="true">{listName}</h2>
            </div>
            <div className='cards'>
                {cardsArr.map(result => (
                    <>
                        {!result.hidden && result.component}

                    </>
                ))}
            </div>
            <div className='add-new-card-container'>
                {isInitialState ?
                    <AddNewElement elementType={"Card"} onClick={() => setState(false)} buttonText={"Add another card"} /> :
                    <NamePicker elementType={"Card"} resetState={() => setState(true)} onCreateNewClick={addNewCardBtnPress} />}
            </div>
            <div className="delete-button">
                <button onClick={(e) => deleteList(datakey)}> Delete list</button>
            </div>
        </div>
    )
};