export const actions = {
  newIdea: (payload) => {
    return {
      type: 'NEW',
      payload,
    };
  },
  setTitle: (payload) => {
    return {
      type: 'SET_TITLE',
      payload,
    };
  },
  setDescription: (payload) => {
    return {
      type: 'SET_DESCRIPTION',
      payload,
    };
  },
  deleteIdea: (payload) => {
    return {
      type: 'DELETE',
      payload,
    };
  },
};

export const reducer = (ideas, action) => {
  switch (action.type) {
    case 'NEW': {
      const { createdDate } = action.payload;
      const maxId = ideas.reduce((max, idea) => {
        return Math.max(max, idea.id);
      }, 0);
      return [
        ...ideas,
        {
          id: maxId + 1,
          title: '',
          description: '',
          createdDate,
        },
      ];
    }
    case 'SET_TITLE': {
      const { id, title } = action.payload;
      return ideas.map((idea) => {
        if (idea.id !== id) {
          return idea;
        }
        return {
          ...idea,
          title,
        };
      });
    }
    case 'SET_DESCRIPTION': {
      const { id, description } = action.payload;
      return ideas.map((idea) => {
        if (idea.id !== id) {
          return idea;
        }
        return {
          ...idea,
          description,
        };
      });
    }
    case 'DELETE': {
      const { id } = action.payload;
      return ideas.filter((idea) => {
        return idea.id !== id;
      });
    }
    default: {
      return ideas;
    }
  }
};
