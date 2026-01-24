import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import BrandsMarquee from '../components/sections/BrandsMarquee';
import ValueProps from '../components/sections/ValueProps';
import CampaignShowcase from '../components/sections/CampaignShowcase';
import CreatorCategories from '../components/sections/CreatorCategories';
import BespokeSolutions from '../components/sections/BespokeSolutions';
import InfluencerGrid from '../components/sections/InfluencerGrid';
import WhySocialAdda from '../components/sections/WhySocialAdda';
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
                <CampaignShowcase />
                <BespokeSolutions />
                <CreatorCategories />
                <InfluencerGrid />
                <WhySocialAdda />
                <TextMarqueeCTA />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
