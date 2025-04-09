import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import SignpostIcon from '@mui/icons-material/Signpost';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useGetVideoQuery } from '@/store/Products/FetchVideo';
import Loading from '@/components/Loading/Loading';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { ClientStorage } from '@/hooks/useLocalStroge';
import { toast, ToastContainer } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { addToWishlist, removeFromWishlist, setWishlist } from '@/store/wishlistSlice';
import { Product } from '@/data/products';
import Box from '@mui/material/Box';
interface Props {
    code: string;
    programyear: string;
    productData: Product;
}

const WatchVideoAndMap: FunctionComponent<Props> = ({ code, programyear, productData }) => {
    const { t } = useTranslation();
    const [openVideoDialog, setOpenVideoDialog] = useState(false);
    const language = ClientStorage.get('language') || 'en';
    const dispatch = useAppDispatch();
    const wishlistItems = useAppSelector(state => state.wishlist.items);

    const {
        data: videoData,
        isLoading,
        isError,
    } = useGetVideoQuery({
        code,
        programyear,
    });

    const isInWishlist = wishlistItems.some(item => item.prog_Code === productData.prog_Code);

    const handleToggleWishlist = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(productData.prog_Code));
            toast.error(t('trip removed from wish list') as string);
        } else {
            dispatch(addToWishlist(productData));
            toast.success(t('trip added to wish list') as string, {
                className: 'toast-orange',
                autoClose: 2000,
            });
        }
    };

    const handleOpenVideo = () => {
        if (videoData?.Vedio?.[0]?.Status === 'No_Vedio_Return') {
            toast.error('No video available');
        } else if (videoData?.Vedio?.[0]?.Logo_PATH) {
            setOpenVideoDialog(true);
        }
    };

    const handleCloseVideo = () => {
        setOpenVideoDialog(false);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <ToastContainer />
            <Stack
                direction="row"
                justifyContent="start"
                alignItems="center"
                spacing={5}
                sx={{ mb: 3 }}
            >
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <Box
                        onClick={handleToggleWishlist}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            '&:hover': {
                                opacity: 0.8,
                            },
                        }}
                    >
                        <Checkbox
                            icon={<FavoriteBorderIcon color="primary" />}
                            checkedIcon={<FavoriteIcon />}
                            checked={isInWishlist}
                            onChange={handleToggleWishlist}
                            sx={{
                                p: 0,
                                mr: 1,
                                pointerEvents: 'none',
                            }}
                        />
                        <Typography variant="body1" sx={{ color: 'body.main' }}>
                            {t('Add to Wishlist')}
                        </Typography>
                    </Box>
                </div>

                <div
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={handleOpenVideo}
                >
                    <IconButton color="primary" sx={{ boxShadow: 1, mr: 2 }}>
                        <PlayArrowRoundedIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ color: 'body.main' }}>
                        {t('Watch Video')}
                    </Typography>
                </div>

                {/* <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <IconButton color="primary" sx={{ boxShadow: 1, mr: 2 }}>
                        <SignpostIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ color: 'body.main' }}>
                        {t('Map')}
                    </Typography>
                </div> */}
            </Stack>

            {/* Video Dialog */}
            <Dialog open={openVideoDialog} onClose={handleCloseVideo} maxWidth="md" fullWidth>
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseVideo}
                        sx={{
                            position: 'absolute',
                            ...(language === 'ar'
                                ? { left: 8, top: 0, right: 'auto' }
                                : { right: 8, top: 0, left: 'auto' }),
                            color: theme => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {videoData?.Vedio?.[0]?.Status === 'No_Vedio_Return' ? (
                        <Typography variant="body1" sx={{ textAlign: 'center', p: 2 }}>
                            {t('No video available')}
                        </Typography>
                    ) : videoData?.Vedio?.[0]?.Logo_PATH ? (
                        <video controls autoPlay style={{ width: '100%', outline: 'none' }}>
                            <source src={videoData.Vedio[0].Logo_PATH} type="video/mp4" />
                            {t('Your browser does not support the video tag.')}
                        </video>
                    ) : null}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default WatchVideoAndMap;
