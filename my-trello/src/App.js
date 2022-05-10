import React, { useState } from 'react';
import { AddNewElement, NamePicker } from "./Components/AddNewElementModule"
import { List } from "./Components/List"

const App = () => {

  // Create a New List Button click state
  const [isInitialState, setState] = useState(true);
  // Add new list to Trello's lists array
  const [listsArr, editList] = useState([]);

  const hideElement = (id, arr) => {
    console.log("toggleHiddenProperty");
    let newArr = [...arr];
    newArr[id].hidden = true;
    return newArr
  };

  const addNewListBtnPress = (newListName) => {
    if (newListName.replace(/\s/g, '') !== "") {
      const newList = [{
        component: <List key={listsArr.length} datakey={listsArr.length} listName={newListName.trim()} deleteList={key => editList(listsArr => hideElement(key, listsArr))} />,
        hidden: false
      }];
      editList(listsArr.concat(newList));
      setState(true);
    }
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
      <div className='lists'>
        {listsArr.map(result => (
          <>
            {!result.hidden && result.component}

          </>
        ))}
      </div>
      {JSON.stringify(listsArr)};

    </div>
  );
};

export default App;