import React from 'react';
import { shallow } from 'enzyme';

import Search from '../Search/Search';

describe('Search tests', () => {

  it('renders search input', () => {

    let props = {
      onSearchResults: jest.fn()
    };

    const wrapper = shallow(<Search {...props}/>);

    expect(wrapper.find('#searchForm')).toBeDefined();
  });
});
