import React from "react";
import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
border: 1px solid lightgrey;
margin-bottom: 8px;
padding: 8px;
border-radius: 2px;
background-color: AliceBlue ;
`;


export const Card = ({ datakey, index, cardName, deleteCard }) => {
    return (
        <Draggable draggableId={`draggable-${datakey}`} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="card-container">
                        <p contentEditable="true"> {cardName} </p>
                        <div>
                            <button onClick={() => deleteCard(datakey)}>Delete card</button>
                        </div>
                    </div>
                </Container>
            )}
        </Draggable>
    )
};