import React from "react";

export const Card = ({ cardName, deleteCard }) => {
    return (
        <div className="card-container">
            <p contentEditable="true"> {cardName} </p>
            <div>
                <button onClick={() => deleteCard()}>Delete card</button>
            </div>
        </div>
    )
};