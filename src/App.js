import React, { Component } from 'react';
import { actions, reducer, getInitialIdeas } from './state';
import { Idea } from './Idea';
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
      this.setState({ focusNew: false });
    }
  }

  render() {
    const { ideas, sortBy, focusNew } = this.state;

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
          {sortedIdeas.map((idea) => (
            <Idea
              key={idea.id}
              idea={idea}
              focusTitle={focusNew && idea === lastIdea}
              setTitle={(payload) => dispatch(actions.setTitle(payload))}
              setDescription={(payload) =>
                dispatch(actions.setDescription(payload))
              }
              deleteIdea={(payload) => dispatch(actions.deleteIdea(payload))}
            />
          ))}
        </div>
      </div>
    );
  }
}
