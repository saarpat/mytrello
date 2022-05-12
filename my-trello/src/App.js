/* TO DO: 
2) CHANGE ADD NEW CARD AND LIST TO FORMS INSTEAD OF REGULAR TAGS
3) THINK IF I CAN HIDE LIST OR CARD WITH USEREDUCED
*/


import React, { useState, useEffect, useRef } from 'react';
import { AddNewElement, NamePicker } from "./Components/AddNewElementModule"
import { List } from "./Components/List"
import { DragDropContext } from 'react-beautiful-dnd';

const App = () => {

  // Create a New List Button click state
  const [isInitialState, setState] = useState(true);
  // Add new list to Trello's lists array
  const [listsArr, editList] = useState([]);

  const renderCount = useRef(0);
  const listsCardsArr = useRef([]);

  useEffect(() => { renderCount.current = renderCount.current + 1 });
  useEffect(() => {
    if (listsArr.length > 0) {
      listsCardsArr.current.push({
        id: listsArr[listsArr.length - 1].datakey,
        cardsArr: []
      });
    }
    console.log(listsCardsArr.current)
  }, [listsArr.length]);

  const hideElement = (id, arr) => {
    let newArr = [...arr];
    newArr[id].hidden = true;
    return newArr
  };

  const addNewListBtnPress = (newListName) => {
    if (newListName.replace(/\s/g, '') !== "") {
      const newList = [{
        key: listsArr.length,
        datakey: listsArr.length,
        listName: newListName.trim(),
        deleteList: key => editList(listsArr => hideElement(key, listsArr)),
        hidden: false,
      }];
      editList(listsArr.concat(newList));
      setState(true);
    }
  };

  const updateParentList = (listId, newCardId) => {
    listsCardsArr.current[listId].cardsArr.push(newCardId);
  };

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }

    const column = listsArr[source.droppableId];
    // const newCardsArr = Array.from(column.)
  };
  return (
    <div className='App'>
      <div className='siteTitle'>
        <h1>MyTrello</h1>
      </div>
      <div className='addNewList'>
        {isInitialState ?
          <AddNewElement elementType={"List"} onClick={() => setState(false)} buttonText={"Add another list"} /> :
          <NamePicker elementType={"List"} resetState={() => setState(true)} onCreateNewClick={addNewListBtnPress} />}
      </div>

      <DragDropContext
        onDragEnd={onDragEnd}>
        <div className='lists'>
          {listsArr.map(result => (
            <>
              {!result.hidden && <List key={result.key} datakey={result.datakey} listName={result.listName} deleteList={result.deleteList} updateParentList={updateParentList} />}

            </>
          ))}
        </div>
      </DragDropContext>
      {renderCount.current}
    </div>
  );
};

export default App;