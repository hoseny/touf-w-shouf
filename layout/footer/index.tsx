import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import LinkMui from '@mui/material/Link';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

interface Props {}

const Index: FunctionComponent<Props> = () => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                flexGrow: 1,
                backgroundColor: 'body.main',
                width: '100%',
                color: 'body.light',
                py: 4,
            }}
            component="footer"
        >
            <Container maxWidth="lg">
                <Box sx={{ mb: 4 }}>
                    <Grid container spacing={3}>
                        {/* About Us Section */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1">{t('About Us')}</Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Link href={'/ContactUs'}>{t('Contact Us')}</Link>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Link href={'/Suggestion'}>{t('Complaint and Suggestion')}</Link>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Link href={'/wishlist'}>{t('My WishList')}</Link>{' '}
                            </Box>
                        </Grid>

                        {/* Information Section */}

                        {/* <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1">{t('Information')}</Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Link href={''}>{t('FAQs')}</Link>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Link href={''}>{t('Vision')}</Link>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Link href={''}>{t('Goals')}</Link>
                            </Box>
                            </Grid> */}

                        {/* Related Links Section */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1">{t('Related links')}</Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <a
                                    href="https://www.misrtravel.net"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('Misr Travel')}
                                </a>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <a
                                    href="https://www.experienceegypt.eg/en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('experience egypt')}
                                </a>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <a
                                    href="https://mota.gov.eg/ar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('Ministry of Tourism and Antiquities')}
                                </a>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <a
                                    href="http://www.mpbs.gov.eg/Arabic/Pages/default.aspx"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('Ministry of Public Business Sector')}
                                </a>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <a
                                    href="https://hotac.com.eg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('Tourism and Hotels Holding Company')}
                                </a>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Box>
                                <Typography>
                                    <EmailIcon /> {t('Mail')} :
                                </Typography>
                                <Typography variant="subtitle1">
                                    <a href="mailto:info@toufwshouf.travel">
                                        info@toufwshouf.travel
                                    </a>
                                </Typography>
                            </Box>
                            <Box>
                                <Box sx={{ my: 2 }}>
                                    <Typography variant="subtitle1">{t('Social media')}</Typography>
                                </Box>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <LinkMui
                                        href="#"
                                        target="_blank"
                                        underline="none"
                                        sx={{ color: 'body.light' }}
                                    >
                                        <FacebookSharpIcon />
                                    </LinkMui>
                                    <LinkMui
                                        href="#"
                                        target="_blank"
                                        underline="none"
                                        sx={{ color: 'body.light' }}
                                    >
                                        <InstagramIcon />
                                    </LinkMui>
                                    <LinkMui
                                        href="#"
                                        target="_blank"
                                        underline="none"
                                        sx={{ color: 'body.light' }}
                                    >
                                        <TwitterIcon />
                                    </LinkMui>
                                </Stack>
                            </Box>
                        </Grid>

                        {/* Newsletter and Social Media Section */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Stack
                                direction="column"
                                justifyContent="space-between"
                                sx={{ height: '100%' }}
                            >
                                <div>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle1">
                                            {t('Subscribe to our newsletter')}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" alignItems="center">
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            fullWidth
                                            placeholder={t('Search')}
                                            sx={{
                                                backgroundColor: 'body.light',
                                                borderRadius: '5px 0 0 5px',
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: '0 5px 5px 0',
                                                ml: '-5px',
                                                py: 2,
                                            }}
                                        >
                                            <Typography variant="button">{t('Send')}</Typography>
                                        </Button>
                                    </Stack>
                                </div>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ borderColor: 'gray.main', my: 2 }} />

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={{ xs: 2, sm: 0 }}
                >
                    <Typography variant="caption">
                        {t('Touf w Shof. 2024 - All Rights Reserved')}
                    </Typography>
                    <Typography variant="caption">{t('Created by ITD')}</Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Index;
