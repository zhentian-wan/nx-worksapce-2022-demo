import { render } from '@testing-library/react';

import SharedMdxElement from './shared-mdx-element';

describe('SharedMdxElement', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedMdxElement />);
    expect(baseElement).toBeTruthy();
  });
});
