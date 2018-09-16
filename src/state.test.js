import { actions, reducer } from './state';

describe('Ideas Reducer', () => {
  let initialIdeas;
  beforeEach(() => {
    initialIdeas = [
      {
        id: 1,
        title: 'First title',
        description: 'First description',
        createdDate: new Date('2018-09-16T12:34:56'),
      },
      {
        id: 2,
        title: 'Second title',
        description: 'Second description',
        createdDate: new Date('2018-09-16T17:16:15'),
      },
    ];
  });

  it('newIdea creates new blank idea', () => {
    const createdDate = new Date('2018-09-17T00:00:00');
    const action = actions.newIdea({ createdDate });
    const ideas = reducer(initialIdeas, action);
    expect(ideas).toEqual([
      ...initialIdeas,
      { createdDate, description: '', id: 3, title: '' },
    ]);
  });

  it('setTitle sets the title', () => {
    const newTitle = 'New first title';
    const action = actions.setTitle({ id: 1, title: newTitle });
    const ideas = reducer(initialIdeas, action);
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
    const ideas = reducer(initialIdeas, action);
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
    const ideas = reducer(initialIdeas, action);
    expect(ideas).toEqual([initialIdeas[1]]);
  });
});
