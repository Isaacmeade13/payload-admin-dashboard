'use client';

import About from './components/about/About';
import Footer from './components/footer/Footer';
import Gallery from './components/gallery/Gallery';
import Header from '../components/shared/header/Header';
import Policy from './components/policy/Policy';

function PlacePage() {
  return (
    <div>
      <Header withTextLogoMobile withSearchBar withMobileSearchBar={false} />
      <main className="grid px-36 max-xl:px-0">
        <Gallery />
        <About />
        <Policy />
      </main>
      <Footer />
    </div>
  );
}
export default PlacePage;
