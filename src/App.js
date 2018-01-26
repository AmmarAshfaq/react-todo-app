import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase';
const styles = {
  gape: {
    marginLeft: '2px'
  },
  inputGape: {
    marginLeft: '3px'
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      flag: true,
      inputId: '',
      inputVal: ''
    }
    firebase.database().ref("/").child("todos").on("child_added", (snap) => {
      var obj = snap.val();
      obj.id = snap.key;
      console.log(obj)
      console.log(this.state.todos)
      this.state.todos.push(obj)
      this.setState({ todos: this.state.todos })
      console.log(this.state.todos)
      
    })
  }

 
  addTodo() {
    console.log(this.insertText.value)
    let todo = { todo: this.insertText.value }
    console.log(todo)

    firebase.database().ref('/').child("todos").push(todo)
  }
  removeTodo(keyVal, idVal) {
    firebase.database().ref("/").child(`todos/${keyVal}`).remove();
    var afterRemove = this.state.todos;
    afterRemove.splice(idVal, 1)
    this.setState({ todos: afterRemove })
  }

  editTodo(keyId, todoVal) {
    this.setState({ inputId: keyId, inputVal: todoVal, flag: false })
  }
  updateVal() {
    console.log(this.editVal.value)
    firebase.database().ref("/").child(`todo/${this.state.inputId}`).update({ todo: this.editVal.value })
      .then(() => {
        this.setState({ flag: true })
      })
  }
  render() {

    return (
      <div className="App">
        <MuiThemeProvider>
          <div >
            <AppBar
              title="TodoApp Using React And Redux "
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
            <div style={{ margin: '0px auto', width: '200',alignSelf:'center'}}>
              <input type="text" ref={(input) => { this.insertText = input }} />
              {/* <TextFiel
                hintText="Enter Todo"
                style={styles.inputGape}
                ref={(input)=>{this.insertText = input}}

              /> */}
              <RaisedButton label="Add Todo" primary={true} onClick={this.addTodo.bind(this)} style={styles.gape} />
              {/* <br/> */}
              {(this.state.flag) ?
                <ul>
                  {this.state.todos.map((val, ind) => {
                    return <li key={ind}>
                      {val.todo}
                      <RaisedButton label="Delete Todo" secondary={true} onClick={this.removeTodo.bind(this, val.id, ind)} style={styles.gape} />
                      <RaisedButton label="Edit Todo" onClick={this.editTodo.bind(this, val.id, val.todo)} style={styles.gape} />
                    </li>
                  })}</ul>

                :
                <div>
                  <input type="text" ref={updateVal => this.editVal = updateVal} />
                  <RaisedButton label="Update Value" onClick={this.updateVal.bind(this)} style={styles.gape} />
                  <RaisedButton label="Cancel" secondary={true} onClick={() => this.setState({ flag: true })} style={styles.gape} />

                </div>
              }



            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
