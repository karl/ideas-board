import { actions, baseReducer } from './state';

describe('Ideas baseReducer', () => {
  let initialIdeas;
  beforeEach(() => {
    initialIdeas = [
      {
        id: 1,
        title: 'First title',
        description: 'First description',
        createdDate: '2018-09-16T11:34:56.000Z',
      },
      {
        id: 2,
        title: 'Second title',
        description: 'Second description',
        createdDate: '2018-09-16T16:16:15.000Z',
      },
    ];
  });

  it('newIdea creates new blank idea', () => {
    const createdDate = '2018-09-16T20:58:07.221Z';
    const action = { type: 'NEW', payload: { createdDate } };
    const ideas = baseReducer(initialIdeas, action);
    expect(ideas).toEqual([
      ...initialIdeas,
      { createdDate, description: '', id: 3, title: '' },
    ]);
  });

  it('setTitle sets the title', () => {
    const newTitle = 'New first title';
    const action = actions.setTitle({ id: 1, title: newTitle });
    const ideas = baseReducer(initialIdeas, action);
    const updatedIdea = {
      ...initialIdeas[0],
      title: newTitle,
    };
    expect(ideas).toEqual([updatedIdea, initialIdeas[1]]);
  });

  it('setDescription sets the description', () => {
    const newDescription = 'New second description';
    const action = actions.setDescription({
      id: 2,
      description: newDescription,
    });
    const ideas = baseReducer(initialIdeas, action);
    const updatedIdea = {
      ...initialIdeas[1],
      description: newDescription,
    };
    expect(ideas).toEqual([initialIdeas[0], updatedIdea]);
  });

  it('deleteIdea deletes the idea', () => {
    const action = actions.deleteIdea({
      id: 1,
    });
    const ideas = baseReducer(initialIdeas, action);
    expect(ideas).toEqual([initialIdeas[1]]);
  });
});
