import axios from 'axios';

export const fetchHitsByQuery = async (query, page) => {
  const response = await axios.get('https://pixabay.com/api/', {
    method: 'get',
    params: {
      key: '38913591-286792a977615f082346a44ee',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: page,
    },
  });
  return response.data.hits;
};
