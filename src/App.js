import React, { Component } from 'react';
import { actions, reducer } from './state';
import './App.css';

const getInitialIdeas = () => {
  try {
    return JSON.parse(window.localStorage.getItem('ideas')) || [];
  } catch (error) {
    return [];
  }
};

const initialIdeas = getInitialIdeas();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: initialIdeas,
    };
  }

  componentDidUpdate() {
    const { ideas } = this.state;
    window.localStorage.setItem('ideas', JSON.stringify(ideas, null, 2));
  }

  render() {
    const { ideas } = this.state;

    const dispatch = (action) => {
      this.setState({
        ideas: reducer(this.state.ideas, action),
      });
    };

    return (
      <div>
        <div className="header">
          <button className="new" onClick={() => dispatch(actions.newIdea())}>
            + New Idea
          </button>
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
                onChange={(event) => {
                  const title = event.target.value;
                  dispatch(actions.setTitle({ id: idea.id, title }));
                }}
              />
              <textarea
                className="description"
                placeholder="description"
                value={idea.description}
                onChange={(event) => {
                  const description = event.target.value;
                  dispatch(
                    actions.setDescription({ id: idea.id, description })
                  );
                }}
              />
              <button
                className="delete"
                onClick={() => {
                  dispatch(actions.deleteIdea({ id: idea.id }));
                }}
              >
                Delete
              </button>
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
