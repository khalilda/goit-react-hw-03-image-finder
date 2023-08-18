import axios from 'axios';
const API_KEY = '38913591-286792a977615f082346a44ee';

const imagesApi = axios.create({
  baseURL: 'https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12',

  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const getImage = async (query, page = 1) => {
  const { data } = await imagesApi.get('', {
    params: {
      q: query,
      page,
    },
  });

  return data.hits;
};
