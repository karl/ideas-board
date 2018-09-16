export const actions = {
  newIdea: () => {
    const createdDate = new Date().toISOString();
    return {
      type: 'NEW',
      payload: {
        createdDate,
      },
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

export const getInitialIdeas = () => {
  try {
    return JSON.parse(window.localStorage.getItem('ideas')) || [];
  } catch (error) {
    return [];
  }
};

export const baseReducer = (ideas, action) => {
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

const saveToLocalStorage = (ideas) => {
  window.localStorage.setItem('ideas', JSON.stringify(ideas, null, 2));
};

export const reducer = (ideas, action) => {
  const newIdeas = baseReducer(ideas, action);
  saveToLocalStorage(ideas);
  return newIdeas;
};
