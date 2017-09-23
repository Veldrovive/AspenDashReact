export const loadState = () => {
  try{
    const serializedData = localStorage.getItem('aspenDash');
    if(serializedData === null){
      return undefined
    }
    return JSON.parse(serializedData)
  }catch(err){
    throw ("Could not get localStorage state");
    return undefined
  }
};

export const saveState = (state) => {
  try{
    //State is saved as a string so it has to be stringified
    const serializedState = JSON.stringify(state);
    localStorage.setItem('aspenDash', serializedState)
  }catch(err){
    throw ("Could not serialize state")
  }
};