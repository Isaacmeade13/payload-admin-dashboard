'use client';

import Header from '../components/shared/header/Header';
import Filters from './components/filters/Filters';
import Locations from './components/locations/Locations';

function SerpPage() {
  return (
    <div>
      <Header />
      <Filters />
      <Locations />
    </div>
  );
}

export default SerpPage;
