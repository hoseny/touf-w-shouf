/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Avatar from '@mui/material/Avatar';
import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useGetImgQuery } from '@/store/Products/FetchImagesApi';
import BookButton from './BookButton';
import { useGetReviewQuery } from '@/store/Products/FetchReviewApi';
import { useGetSupplementQuery } from '@/store/Products/FetchSupplementApi';
import UserRating from '@/components/products/UserRating';
import ReviewForm from '../ReviewForm';
import Loading from '@/components/Loading/Loading';
import { useGetTourExcludingArQuery } from '@/store/Products/ProgramDetailsAR/FetchTourExcludingArApi';
import { ClientStorage } from '@/hooks/useLocalStroge';
import { useGetSupplementArQuery } from '@/store/Products/FetchSupplementArApi';
import Modal from '@mui/material/Modal';
interface Props {
    id: string | number | undefined;
    productData: {
        code: number;
        programyear: number;
        languagecode: number;
        programname: string;
        rating: number;
        startprice?: number;
        img_path: string;
        offerPrice?: number | null;
        OverView: string;
        startDate: string;
        endDate: string;
    };
}

interface Supplement {
    code: number;
    the_price_includes_supplement: string;
}

const DetailsTabs: FunctionComponent<Props> = ({ id, productData }) => {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleOpen = (image: string) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage('');
    };

    const { t } = useTranslation();
    const router = useRouter();
    const [value, setValue] = React.useState(0);
    const language = ClientStorage.get('language') || 'en';

    const code = router.query.code ? parseInt(router.query.code as string, 10) : undefined;
    const languagecode = router.query.languagecode
        ? parseInt(router.query.languagecode as string, 10)
        : undefined;
    const programyear = router.query.programyear
        ? parseInt(router.query.programyear as string, 10)
        : undefined;

    // Fetch images
    const {
        data,
        error: imgError,
        isLoading: isLoadingImages,
    } = useGetImgQuery({ code, programyear });
    const tripImages = data?.items || [];

    // Fetch reviews
    const {
        data: reviewData,
        error: reviewError,
        isLoading: reviewLoading,
        refetch,
    } = useGetReviewQuery({ code, programyear });
    const reviews = reviewData?.items || [];

    // Fetch Supplement
    const {
        data: SupplementData,
        error: supplementError,
        isLoading: supplementLoading,
    } = useGetSupplementQuery({ code, programyear }, { skip: language !== 'en' });

    const {
        data: SupplementArData,
        error: supplementArError,
        isLoading: supplementArLoading,
    } = useGetSupplementArQuery({ code, programyear }, { skip: language !== 'ar' });

    const Supplements =
        language === 'ar' ? SupplementArData?.items || [] : SupplementData?.items || [];

    // Fetch TourExcludingAr
    const queryParamsInlude = { code, programyear };
    const { data: TourExcludingAr, error: TourExcludingArError } = useGetTourExcludingArQuery(
        queryParamsInlude,
        {
            skip: language !== 'ar',
        }
    );
    const TourExcluding = TourExcludingAr?.items[0];

    // Error and loading handling
    if (imgError || reviewError || supplementError || supplementArError) {
        return <Typography>{t('Error loading data')}</Typography>;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ mb: 5 }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Product Details Tabs"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                    '& .MuiTabs-flexContainer': {
                        justifyContent: 'space-between',
                        overflowX: 'auto',
                        scrollbarWidth: 'thin',
                    },
                    px: 2,
                    mb: 1,
                    '@media (max-width: 600px)': {
                        '& .MuiTabs-flexContainer': {
                            justifyContent: 'unset',
                        },
                    },
                }}
            >
                <Tab label={t('Overview')} />
                <Tab label={t('Supplement')} />
                <Tab label={t('Photo Gallery')} />
                <Tab label={t('Reviews')} />
            </Tabs>

            {/* Overview */}
            <TabPanel value={value} index={0}>
                <Typography variant="body2">
                    {t(productData?.OverView || 'No overview available')}
                </Typography>
                <Typography variant="subtitle2" sx={{ my: 2 }}>
                    {t('Additional Info')}
                </Typography>
                <Typography variant="body2">
                    {t('Start Date')}: {t(productData?.startDate || 'No start date available')}
                </Typography>
                <Typography variant="body2">
                    {t('End Date')}: {t(productData?.endDate || 'No end date available')}
                </Typography>
                {TourExcluding?.TOUREXCLUDING && (
                    <Typography variant="body2">{t(TourExcluding.TOUREXCLUDING)}</Typography>
                )}
                <BookButton code={code} programyear={programyear} languagecode={languagecode} />
            </TabPanel>

            {/* Supplement */}
            <TabPanel value={value} index={1}>
                <Typography variant="subtitle2" sx={{ my: 2 }}>
                    {t('The price includes supplement :')}
                </Typography>
                <Stack direction="column" spacing={2}>
                    {supplementLoading && supplementArLoading ? (
                        <Loading />
                    ) : Supplements.length > 0 ? (
                        Supplements.map((supplement: Supplement, index: number) => (
                            <SupplementItem
                                key={index}
                                description={supplement['the_price_includes_supplement']}
                            />
                        ))
                    ) : (
                        <Typography variant="body2">{t('No supplements available')}</Typography>
                    )}
                </Stack>
                <Divider sx={{ mt: 8, mb: 2 }} />
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ color: 'primary.main' }}
                >
                    <TaskAltIcon />
                    <Typography variant="subtitle1">{t("All prices include VAT")}</Typography>
                </Stack>
            </TabPanel>

            {/* Photo Gallery */}
            <TabPanel value={value} index={2}>
                {isLoadingImages ? (
                    <Loading />
                ) : tripImages.length > 0 ? (
                    <>
                        <ImageList cols={4} rowHeight={140}>
                            {tripImages.map((item: any, index: number) => (
                                <ImageListItem
                                    key={index}
                                    sx={{ mx: 2, cursor: 'pointer' }}
                                    onClick={() =>
                                        handleOpen(
                                            item.image.startsWith('https')
                                                ? item.image
                                                : `https://${item.image}`
                                        )
                                    }
                                >
                                    <img
                                        src={
                                            item.image.startsWith('https')
                                                ? item.image
                                                : `https://${item.image}`
                                        }
                                        alt={item.img_name}
                                        style={{
                                            width: '150px',
                                            height: '100px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>

                        {/* Modal for full-size image */}
                        <Modal open={open} onClose={handleClose}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    bgcolor: '#ffffffe0',
                                    boxShadow: 24,
                                    p: 2,
                                    width: '500px',
                                    height: '400px',
                                    outline: 'none',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '@media (max-width: 600px)': {
                                        width: '90%',
                                        height: 'auto',
                                    },
                                }}
                            >
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                    }}
                                />
                            </Box>
                        </Modal>
                    </>
                ) : (
                    <Typography variant="body2">{t('No images available')}</Typography>
                )}
            </TabPanel>

            {/* Reviews */}
            <TabPanel value={value} index={3}>
                {reviewLoading ? (
                    <Typography variant="body2">
                        <Loading />
                    </Typography>
                ) : reviewError ? (
                    <Typography variant="body2" color="error">
                        Failed to load reviews. Please try again.
                    </Typography>
                ) : (
                    <>
                        <ReviewSection reviews={reviews} />
                        {code && programyear ? (
                            <ReviewForm
                                code={code}
                                programyear={programyear}
                                onReviewAdded={() => refetch()}
                            />
                        ) : (
                            <Typography variant="body2">Unable to load review form</Typography>
                        )}
                    </>
                )}
            </TabPanel>
        </Box>
    );
};

// Supplement Item component
const SupplementItem: FunctionComponent<{ description: string }> = ({ description }) => (
    <Stack direction="row" spacing={2} alignItems="center">
        <TaskAltIcon sx={{ color: 'secondary.main' }} />
        <Typography variant="body2">{description}</Typography>
    </Stack>
);

// Review Section component
const ReviewSection: FunctionComponent<{
    reviews: { review: string; rate: number; customer: string }[];
}> = ({ reviews }) => {
    const { t } = useTranslation();
    return (
        <Stack spacing={2}>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <Stack key={index} direction="row" alignItems="top" spacing={2}>
                        <Avatar variant="square" sx={{ width: 56, height: 56 }} />
                        <Box>
                            <Typography variant="subtitle2">{review.customer}</Typography>
                            <Typography variant="body2">{review.review}</Typography>
                            <Divider sx={{ my: 2 }} />
                        </Box>
                        <UserRating readOnly rating={review.rate} />
                    </Stack>
                ))
            ) : (
                <Typography variant="body2">{t('No reviews available')}</Typography>
            )}
        </Stack>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default DetailsTabs;
