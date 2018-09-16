import React, { Component } from 'react';
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
    const newIdea = () => {
      const maxId = ideas.reduce((max, idea) => {
        return Math.max(max, idea.id);
      }, 0);
      this.setState({
        ideas: [
          ...ideas,
          {
            id: maxId + 1,
            title: '',
            description: '',
            createdDate: new Date(),
          },
        ],
      });
    };
    const setTitle = ({ id, title }) => {
      this.setState({
        ideas: ideas.map((idea) => {
          if (idea.id !== id) {
            return idea;
          }
          return {
            ...idea,
            title,
          };
        }),
      });
    };
    const setDescription = ({ id, description }) => {
      this.setState({
        ideas: ideas.map((idea) => {
          if (idea.id !== id) {
            return idea;
          }
          return {
            ...idea,
            description,
          };
        }),
      });
    };
    const deleteIdea = ({ id }) => {
      this.setState({
        ideas: ideas.filter((idea) => {
          return idea.id !== id;
        }),
      });
    };

    return (
      <div>
        <div className="header">
          <button className="new" onClick={newIdea}>
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
                  setTitle({ id: idea.id, title });
                }}
              />
              <textarea
                className="description"
                placeholder="description"
                value={idea.description}
                onChange={(event) => {
                  const description = event.target.value;
                  setDescription({ id: idea.id, description });
                }}
              />
              <button
                className="delete"
                onClick={() => {
                  deleteIdea({ id: idea.id });
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
