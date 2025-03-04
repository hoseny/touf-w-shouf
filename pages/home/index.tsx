import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useStore';
import { toggleLanguage } from '@/store/languageSlice';
import { ClientStorage } from '@/hooks/useLocalStroge';
import Carousel from '@/pages/home/_components/Carousel';
import ContactDial from '@/pages/home/_components/ContactDail';
import Filter from '@/pages/home/_components/Filters';
import Packages from '@/components/products/Packages';
import BannerAds from '@/components/ui/BannerAds';
import banner1 from '@/assets/images/banner1.jpg';
import banner2 from '@/assets/images/banner2.jpg';
import Partners from '@/components/ui/Partners';
import DayUse from '@/components/products/DayUse';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import HomePageVideo from './_components/HomePageVideo';

const Home: NextPage = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const banner1Props = {
        image: banner1.src,
        title: t('Planning a vacation?'),
        des: t('Choose your holiday packages. Book online or talk to our holiday experts'),
        bookUrl: 'travelUrl',
    };

    const banner2Props = {
        image: banner2.src,
        title: t('Royal Promenade'),
        des: t(
            `Did you wish to spend a day as if you were a king? Only on our royal promenade, you can do so by sailing across the Nile to reach King Farouk's Rest house.`
        ),
        bookUrl: 'travelUrl',
    };

    useEffect(() => {
        const storedLanguage = ClientStorage.get('language');

        if (!storedLanguage) {
            ClientStorage.set('language', 'en');
            dispatch(toggleLanguage('en'));
        }
    }, [dispatch]);

    return (
        <Box>
            <ToastContainer />
            <Head>
                <title>{t('Home')}</title>
            </Head>
            <ContactDial />
            <Box>
                {/* <HomePageVideo /> */}
                <Carousel />
                <Filter />
            </Box>
            <Container maxWidth="lg">
                <Packages title={t('Packages')} />
            </Container>
            <Carousel />
            <Container maxWidth="lg">
                <DayUse title={t('Day Trip')} />
            </Container>
            {/* <BannerAds {...banner1Props} /> */}
            <Carousel />
            {/* <BannerAds {...banner2Props} /> */}
            <Partners />
        </Box>
    );
};

export default Home;
