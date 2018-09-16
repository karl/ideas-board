import React, { Component } from 'react';

export class Idea extends Component {
  render() {
    const {
      idea,
      focusTitle,
      setTitle,
      setDescription,
      deleteIdea,
    } = this.props;
    return (
      <div className="idea">
        <input
          className="title"
          type="text"
          placeholder="title"
          value={idea.title}
          autoFocus={focusTitle}
          onChange={(event) => {
            const title = event.target.value;
            setTitle({ id: idea.id, title });
          }}
        />
        <textarea
          className="description"
          placeholder="description"
          value={idea.description}
          maxLength={140}
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
        <div className="createdDate">Created {idea.createdDate.toString()}</div>
      </div>
    );
  }
}
