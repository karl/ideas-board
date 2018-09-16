import React, { Component } from 'react';
import './App.css';

const testIdeas = [
  {
    id: 1,
    title: 'A test idea',
    description: 'First line\nSecond line\nThird line',
    createdDate: new Date(),
  },
  {
    id: 2,
    title: 'Editable titles',
    description: 'Make titles editable',
    createdDate: new Date(),
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: testIdeas,
    };
  }

  render() {
    const { ideas } = this.state;
    return (
      <div>
        <div className="header">
          <button className="new">+ New Idea</button>
          <h1>Ideas Board</h1>
        </div>
        <div>
          {ideas.map((idea) => (
            <div key={idea.id} className="idea">
              <input
                className="title"
                type="text"
                placeholder="title"
                value={idea.title}
                onChange={() => {}}
              />
              <textarea
                className="description"
                placeholder="description"
                value={idea.description}
                onChange={() => {}}
              />
              <button className="delete">Delete</button>
              <div className="createdDate">
                Created {idea.createdDate.toString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
