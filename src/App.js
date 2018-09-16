import React, { Component } from 'react';
import { actions, reducer, getInitialIdeas } from './state';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: getInitialIdeas(),
      sortBy: 'createdDate',
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
    const { ideas, sortBy } = this.state;

    const dispatch = (action) => {
      this.setState({
        ideas: reducer(this.state.ideas, action),
      });
    };

    const sortedIdeas = [...ideas].sort((a, b) => {
      const aField = a[sortBy];
      const bField = b[sortBy];

      if (aField < bField) return -1;
      if (aField > bField) return 1;
      return 0;
    });

    const lastIdea = ideas[ideas.length - 1];

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
          <select
            className="sortBy"
            value={sortBy}
            onChange={(event) => {
              const sortBy = event.target.value;
              this.setState({ sortBy });
            }}
          >
            <option value="createdDate">Sort by created date</option>
            <option value="title">Sort by title</option>
          </select>
          <h1>Ideas Board</h1>
        </div>
        <div>
          {sortedIdeas.map((idea, index) => (
            <div key={idea.id} className="idea">
              <input
                className="title"
                type="text"
                placeholder="title"
                value={idea.title}
                ref={(input) => {
                  if (idea === lastIdea) {
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
