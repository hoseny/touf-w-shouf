import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Logo4 from '@/assets/images/partner/logo-1.jpg';
import Logo3 from '@/assets/images/partner/logo-2.jpg';
import Logo2 from '@/assets/images/partner/logo-3.jpg';
import Logo1 from '@/assets/images/partner/logo-4.jpeg';
import { useTranslation } from 'react-i18next';

interface Props {}
const LogosArray = [Logo1, Logo2, Logo3, Logo4];
const Partners: FunctionComponent<Props> = () => {
    const { t } = useTranslation();

    return (
        <Box sx={{ my: 12 }}>
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 3 }}>
                {t('Partners')}
            </Typography>

            <Grid container justifyContent="space-between" alignItems="center">
                {LogosArray.map((value, index) => (
                    <Grid item xs={3} key={index}>
                        <Image
                            src={value}
                            alt=""
                            placeholder="blur"
                            layout="responsive"
                            objectFit="scale-down"
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Partners;
