import React from "react";

export const Card = ({ datakey, cardName, deleteCard }) => {
    return (
        <div className="card-container">
            <p contentEditable="true"> {cardName} </p>
            <div>
                <button onClick={() => deleteCard(datakey)}>Delete card</button>
            </div>
        </div>
    )
};