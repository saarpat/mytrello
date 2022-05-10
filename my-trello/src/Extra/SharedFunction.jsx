export const toggleHiddenProperty = (id, elementArr, updateElementsArrState) => {
    const list = elementArr.map(item => {
        if (item.id === id) {
            return { ...item, hidden: !item.hidden };
        }
        return item;
    })
    updateElementsArrState(list)

} // end of toggle