import React, { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { AddNewElement, NamePicker } from "./AddNewElementModule"
import { Card } from "./Card"
import styled from 'styled-components';

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
`;
const Title = styled.h3`
padding: 8px;`;
const TaskList = styled.div`
padding: 8px;`;


export const List = ({ datakey, listName, deleteList, updateParentList }) => {


    //TO DO: SHOULD I RAISE THESE STATES UP?
    //----------------------------------

    // Create a New card Button click state
    const [isInitialState, setState] = useState(true);
    // Add new list to Trello's lists array
    const [cardsArr, editCardsArr] = useState([]);

    useEffect(() => {
        if (cardsArr.length > 0) {
            updateParentList(datakey, cardsArr[cardsArr.length - 1].datakey);
        }
    }
        , [cardsArr]);

    const addNewCardBtnPress = (newCardName) => {
        if (newCardName.replace(/\s/g, '') !== "") {
            const newCard = [{
                key: cardsArr.length,
                datakey: cardsArr.length,
                cardName: newCardName.trim(),
                deleteCard: key => editCardsArr(cardsArr => hideElement(key, cardsArr)),
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
        <Container>
            <div className='list'>
                <Title>
                    <div className={`list - title`}>
                        <h2 contentEditable="true">{listName}</h2>
                    </div>
                </Title>
                <Droppable droppableId={`droppable-${datakey}`}>
                    {provided => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <div className='cards'>
                                {cardsArr.map((result, index) => (
                                    <>
                                        {!result.hidden &&
                                            <Card key={result.key} datakey={result.datakey} index={index} cardName={result.cardName} deleteCard={result.deleteCard} />}

                                    </>
                                ))}
                                {provided.placeholder}
                            </div>
                        </TaskList>
                    )}
                </Droppable>
                <div className='add-new-card-container'>
                    {isInitialState ?
                        <AddNewElement elementType={"Card"} onClick={() => setState(false)} buttonText={"Add another card"} /> :
                        <NamePicker elementType={"Card"} resetState={() => setState(true)} onCreateNewClick={addNewCardBtnPress} />}
                </div>
                <div className="delete-button">
                    <button onClick={(e) => deleteList(datakey)}> Delete list</button>
                </div>
            </div>
        </Container>
    )
};