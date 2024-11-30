import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useRouter } from 'next/router';
interface Props {}

const Failed: FunctionComponent<Props> = () => {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <Grid container justifyContent="center" sx={{ my: 4 }}>
            <Grid item xs={6}>
                <Paper
                    elevation={1}
                    sx={{
                        backgroundColor: '#FAFAFA',
                        p: 3,
                        mt: 5,
                    }}
                >
                    <DangerousIcon
                        sx={{
                            fontSize: 177,
                            color: 'red',
                            mx: 'auto',
                            width: '100%',
                            mb: 2,
                        }}
                    />
                    <Typography
                        variant="h3"
                        sx={{
                            textAlign: 'center',
                        }}
                    >
                        {t('Booking Failed')}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'main.payment',
                            textAlign: 'center',
                            mt: 2,
                        }}
                    >
                        {t('Please try again')}
                    </Typography>
                </Paper>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={4}
                    sx={{
                        mt: 4,
                    }}
                >
                    <Button variant="contained" fullWidth onClick={() => router.push('/')}>
                        {t('Return home')}
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default Failed;
