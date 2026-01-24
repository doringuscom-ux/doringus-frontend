import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import BrandsMarquee from '../components/sections/BrandsMarquee';
import ValueProps from '../components/sections/ValueProps';
import CreatorCategories from '../components/sections/CreatorCategories';
import BespokeSolutions from '../components/sections/BespokeSolutions';
import WhyDoringus from '../components/sections/WhySocialAdda';
import FAQ from '../components/sections/FAQ';
import TextMarqueeCTA from '../components/sections/TextMarqueeCTA';
import Footer from '../components/layout/Footer';

const Home = () => {
    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <main className="overflow-x-hidden">
                <Hero />
                <BrandsMarquee />
                <ValueProps />
                <BespokeSolutions />
                <CreatorCategories />
                <WhyDoringus />
                <FAQ />
                <TextMarqueeCTA />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
