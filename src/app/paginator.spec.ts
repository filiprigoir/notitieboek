import { Paginator } from './paginator';

describe('Paginator', () => {
  it('should create an instance', () => {
    expect(new Paginator(1,10)).toBeTruthy();
  });
});
