import React from 'react';
import NoteCreateForm from '../note-create-form/index';

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      notes: [],
    };
    //----------------------------------------------------
    // Binding Handlers
    //----------------------------------------------------
    let memberFunctions = Object.getOwnPropertyNames(Dashboard.prototype);
    console.log(memberFunctions)
    for(let functionName of memberFunctions){
      if(functionName.startsWith('handle')){
        this[functionName] = this[functionName].bind(this);
      }
    }
    console.log('after',memberFunctions)
    //----------------------------------------------------
  }
  //------------------------------------------------------
  // Member Function
  //------------------------------------------------------
  handleAddExpense(note){
    note = {...note};
    note.createdOn = new Date();
    note.id = Math.random();
    note.editing = false;
    note.completed = false;
    

    this.setState(previousState => {
      {console.log(previousState.note)}
      return {notes :[...previousState.notes,note]};
    });
  }
  
  handleDeleteNote(event){
    // event.preventDefault();
    // console.log('inside index', item.id);
    console.log(event.target.id)
    console.log('previous',this.state)

    this.setState({
      notes: this.state.notes.filter((item)=> item.id.toString() !== event.target.id.toString())
})

    // this.setState(previousState => {
    //   return {notes :[...previousState.notes,note]};
    // });
  }
  



  //add delete stuff here
  //------------------------------------------------------
  // Hooks
  //------------------------------------------------------

  
  render(){
    return(
      <div>
        <h1>To-Do List</h1>
        <NoteCreateForm 
        handleAddExpense={this.handleAddExpense}
        handleDeleteNote={this.handleDeleteNote}/>
        <ul>
          {
            this.state.notes.map((note,index) =>
            <div key={index}>
              <li>{note.name}</li>
              <p>{note.description}</p>
              <button id={note.id} onClick={this.handleDeleteNote}>Delete</button>
            </div>  
            )
          }
        </ul>
      </div>
    );

  }
}

export default Dashboard;