import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlaceIcon from '@mui/icons-material/Place';
import UpdateIcon from '@mui/icons-material/Update';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
interface Props {
    time: string;
    price: number;
    location: string;
    TourType: string;
}
const LocationAndPriceAndTime: FunctionComponent<Props> = ({ time, price, TourType, location }) => {
    const { t } = useTranslation();

    return (
        <Paper elevation={1}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={7}
                sx={{ my: 3, p: 4 }}
            >
                <Stack
                    direction="row"
                    justifyContent="start"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: 'gray.main' }}
                >
                    <PlaceIcon />
                    <Stack direction="row" spacing={0.5}>
                        <Typography variant="body1"> {t('Location')}:</Typography>
                        <Typography variant="subtitle1" sx={{ color: 'body.main' }}>
                            {location}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="start"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: 'gray.main' }}
                >
                    {/* <AttachMoneyIcon /> */}
                    <Stack direction="row" spacing={0.5}>
                        {/* <Typography variant="body1"> {t('Start Price')}:</Typography> */}
                        <Typography variant="body1">
                            {TourType === 'Package' ? t('Start Price p/p') : t('Price')}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'body.main' }}>
                            {price ? t(`${price}`) : t('Price Not Available')} {t('EGP')}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack
                    direction="row"
                    justifyContent="start"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: 'gray.main' }}
                >
                    <UpdateIcon />
                    <Stack direction="row" spacing={0.5}>
                        <Typography variant="body1"> {t('Duration time')} </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'body.main' }}>
                            {time}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default LocationAndPriceAndTime;
