import React, { Component } from 'react';
import { actions, reducer, getInitialIdeas } from './state';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: getInitialIdeas(),
      focusNew: false,
    };
  }

  componentDidUpdate() {
    const { focusNew } = this.state;
    if (focusNew) {
      this.lastTitleEl.focus();
      this.setState({
        focusNew: false,
      });
    }
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
          <button
            className="new"
            onClick={() => {
              dispatch(actions.newIdea());
              this.setState({
                focusNew: true,
              });
            }}
          >
            + New Idea
          </button>
          <h1>Ideas Board</h1>
        </div>
        <div>
          {ideas.map((idea, index) => (
            <div key={idea.id} className="idea">
              <input
                className="title"
                type="text"
                placeholder="title"
                value={idea.title}
                ref={(input) => {
                  if (index === ideas.length - 1) {
                    this.lastTitleEl = input;
                  }
                }}
                onChange={(event) => {
                  const title = event.target.value;
                  dispatch(actions.setTitle({ id: idea.id, title }));
                }}
              />
              <textarea
                className="description"
                placeholder="description"
                value={idea.description}
                maxLength={140}
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
