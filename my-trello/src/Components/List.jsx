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
    const [cardsArr, addNewCard] = useState([]);

    const addNewCardBtnPress = (newCardName) => {
        if (newCardName.replace(/\s/g, '') !== "") {
            const newCard = [<Card key={cardsArr.length} cardName={newCardName.trim()} />];
            addNewCard(cardsArr.concat(newCard));
            setState(true);
        }
    };
    return (
        <div className='list'>
            <div className={`list-title`}>
                <h2 contentEditable="true">{listName}</h2>
            </div>
            <div className='cards'>
                {cardsArr}
            </div>
            <div className='add-new-card-container'>
                {isInitialState ?
                    <AddNewElement elementType={"Card"} onClick={() => setState(false)} buttonText={"Add another card"} /> :
                    <NamePicker elementType={"Card"} resetState={() => setState(true)} onCreateNewClick={addNewCardBtnPress} />}
            </div>
            <div className="delete-button">
                <button onClick={(e) => deleteList(datakey)}> Delete </button>
            </div>
        </div>
    )
};