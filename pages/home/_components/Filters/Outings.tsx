import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';
import { useGetCountryEnQuery } from '@/store/Filter/FetchCountryEnApi';
import { useGetTourTypeQuery } from '@/store/Filter/FetchTourTypeApi';
import { ClientStorage } from '@/hooks/useLocalStroge';
import { useGetCountryArQuery } from '@/store/Filter/FetchCountryArApi';
import { useGetTourTypeArQuery } from '@/store/Filter/FetchTourTypeArApi';
import { useGetCityEnQuery } from '@/store/Filter/FetchCityEnApi';
import { useGetCityArQuery } from '@/store/Filter/FetchCityArApi';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Loading from '@/components/Loading/Loading';
import { useRouter } from 'next/router';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
interface Props {}
interface Countries {
    REGION_CODE: string;
    COUNTRY_CODE: number;
    COUNTRY_NAME: string;
}
interface City {
    CITY_CODE: number;
    CITY_NAME: string;
}
interface TourType {
    tour_type_code: number;
    tour_type_desc: string;
    tour_type_desc_ara: string;
}
const Outings: FunctionComponent<Props> = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const language = ClientStorage.get('language') || 'en';
    const langCode = language === 'en' ? 1 : 2;
    const [error, setError] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<{
        COUNTRY_CODE: number;
        REGION_CODE: string;
    } | null>(null);
    const [citiesData, setCitiesData] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedTripType, setSelectedTripType] = useState<{ id: number; name: string } | null>(
        null
    );

    // Countries
    const { data: CountriesEn, isError: isErrorEn } = useGetCountryEnQuery({});
    const { data: CountriesAr, isError: isErrorAr } = useGetCountryArQuery({});
    const CountriesData =
        language === 'ar' ? CountriesAr?.Countries || [] : CountriesEn?.Countries || [];

    // Fetch Cities based on selected country and region
    const { data: CityEn } = useGetCityEnQuery({
        Country: selectedCountry?.COUNTRY_CODE,
        Region: selectedCountry?.REGION_CODE,
    });
    const { data: CityAr } = useGetCityArQuery({
        Country: selectedCountry?.COUNTRY_CODE,
        Region: selectedCountry?.REGION_CODE,
    });

    useEffect(() => {
        if (selectedCountry) {
            const cityData = language === 'ar' ? CityAr?.Countries || [] : CityEn?.Countries || [];
            setCitiesData(cityData);
        } else {
            setCitiesData([]);
        }
    }, [selectedCountry, CityEn, CityAr, language]);

    // TourType
    const { data: TourType, isError: isTourTypeErrorEn } = useGetTourTypeQuery({});
    const { data: TourTypeAr, isError: isTourTypeErrorAr } = useGetTourTypeArQuery({});
    const TourTypeData = language === 'ar' ? TourTypeAr?.items || [] : TourType?.items || [];

    if (isErrorEn || isErrorAr) {
        return <div>Error loading countries data.</div>;
    }

    if (isTourTypeErrorEn || isTourTypeErrorAr) {
        return <div>Error loading tour type data.</div>;
    }

    const handleSearch = async () => {
        if (!selectedDate) {
            setError(t('Please select a date'));
            return;
        }
        if (selectedCountry && !selectedCity) {
            setError(t('Please select a city'));
            return;
        }
        const apiUrl =
            language === 'ar'
                ? 'https://app.misrtravelco.net:4444/ords/invoice/ProgAR/SearchAR'
                : 'https://app.misrtravelco.net:4444/ords/invoice/programes/search';

        const queryParams = {
            City: String(selectedCity?.CITY_CODE || ''),
            Country: String(selectedCountry?.COUNTRY_CODE || ''),
            T_Type: String(selectedTripType?.id || ''),
            T_Date: selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '',
        };
        const queryString = new URLSearchParams(queryParams).toString();

        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}?${queryString}`);
            setSearchResults(response.data.Trips || []);
            setError(null);
            setOpenModal(true);
        } catch (error) {
            setError('Failed to fetch search results. Please try again.');
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            console.log('T_Date:', format(date, 'dd/MM/yyyy'));
        }
    };

    const clearDate = () => {
        setSelectedDate(null);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const labelStyle = {
        color: '#E07026',
    };

    return (
        <Grid container justifyContent="center" alignItems="end">
            {/* Country Select */}
            <Grid item xs={6} md={2}>
                <Autocomplete
                    id="country"
                    options={(CountriesData || []).map((n: Countries) => ({
                        label: n.COUNTRY_NAME || 'Unknown',
                        COUNTRY_CODE: n.COUNTRY_CODE,
                        REGION_CODE: n.REGION_CODE,
                    }))}
                    autoHighlight
                    onChange={(_, value) =>
                        setSelectedCountry(
                            value
                                ? {
                                      COUNTRY_CODE: value.COUNTRY_CODE,
                                      REGION_CODE: value.REGION_CODE,
                                  }
                                : null
                        )
                    }
                    sx={{
                        backgroundColor: 'body.light',
                        borderRadius: '0',
                        color: 'main.lightGray',
                        width: '100%',
                        '& .MuiInputBase-root': {
                            borderRadius: '0',
                        },
                    }}
                    getOptionLabel={(option: {
                        label: string;
                        COUNTRY_CODE: number;
                        REGION_CODE: string;
                    }) => option.label}
                    renderInput={params => (
                        <TextField
                            {...params}
                            placeholder={t('Countries')}
                            inputProps={{
                                ...params.inputProps,
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <li {...props} key={option.COUNTRY_CODE}>
                            {option.label}
                        </li>
                    )}
                />
            </Grid>

            {/* City Select*/}
            <Grid item xs={6} md={2}>
                <Autocomplete
                    id="city"
                    options={(citiesData || []).map((n: City) => ({
                        label: n.CITY_NAME || 'Unknown',
                        CITY_CODE: n.CITY_CODE,
                    }))}
                    autoHighlight
                    onChange={(_, value) =>
                        setSelectedCity(
                            value ? { CITY_CODE: value.CITY_CODE, CITY_NAME: value.label } : null
                        )
                    }
                    disabled={!selectedCountry}
                    sx={{
                        backgroundColor: 'body.light',
                        borderRadius: '0',
                        color: 'main.lightGray',
                        width: '100%',
                        '& .MuiInputBase-root': {
                            borderRadius: '0',
                        },
                    }}
                    getOptionLabel={(option: { label: string; CITY_CODE: number }) => option.label}
                    renderInput={params => (
                        <TextField
                            {...params}
                            placeholder={t('City')}
                            inputProps={{
                                ...params.inputProps,
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <li {...props} key={option.CITY_CODE}>
                            {option.label}
                        </li>
                    )}
                />
            </Grid>

            {/* Trip Type Select */}
            <Grid item xs={6} md={2.4}>
                <Autocomplete
                    id="tripType"
                    options={TourTypeData.map((type: TourType) => ({
                        id: type.tour_type_code,
                        name: language === 'ar' ? type.tour_type_desc_ara : type.tour_type_desc,
                    }))}
                    autoHighlight
                    getOptionLabel={option => option.name || ''}
                    onChange={(_, value) => setSelectedTripType(value || null)}
                    value={selectedTripType}
                    sx={{
                        backgroundColor: 'body.light',
                        borderRadius: '0',
                        color: 'main.lightGray',
                        width: '100%',
                        '& .MuiInputBase-root': {
                            borderRadius: '0',
                        },
                    }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            placeholder={t('Trip type')}
                            inputProps={{
                                ...params.inputProps,
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                    )}
                />
            </Grid>

            <Grid item xs={6} md={2.4}>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Pick a date"
                    customInput={
                        <TextField
                            fullWidth
                            value={selectedDate ? selectedDate.toLocaleDateString('en-GB') : ''}
                            sx={{
                                backgroundColor: 'body.light',
                                borderRadius: '0',
                                color: 'main.lightGray',
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                        sx={{ color: 'main.lightGray' }}
                                    >
                                        <InsertInvitationRoundedIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: selectedDate && (
                                    <InputAdornment position="end">
                                        <IconButton onClick={clearDate} size="small">
                                            <CloseRoundedIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    }
                />
            </Grid>

            {/* Search Button */}
            <Grid item xs={6} md={2}>
                <Button
                    type="button"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ borderRadius: '0 5px 5px 0', py: 1.9, boxShadow: 0, mt: 1 }}
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? <Loading /> : t('Search')}
                </Button>
            </Grid>
            {error && (
                <Typography
                    variant="body2"
                    color="error"
                    style={{ marginTop: '10px', backgroundColor: 'white', padding: 10 }}
                >
                    {error}
                </Typography>
            )}

            {/* search modal  */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        width: '60%',
                        margin: 'auto',
                        marginTop: '100px',
                        backgroundColor: 'white',
                        padding: 3,
                        borderRadius: 2,
                        '@media (max-width: 600px)': {
                            width: '95%',
                            height: 'auto',
                        },
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#e97c34',
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#555',
                        },
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        {t('Search Results')}{' '}
                        <span style={{ color: '#e97c34' }}>({searchResults.length})</span>
                    </Typography>
                    {loading ? (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Loading />
                        </div>
                    ) : error ? (
                        <div style={{ color: 'red' }}>{error}</div>
                    ) : searchResults.length > 0 ? (
                        <div>
                            {searchResults.map((result, index) => (
                                <div style={{ height: '100%' }} key={index}>
                                    <div className="container" style={{ height: '100%' }}>
                                        <div className="row" style={{ height: '100%' }}>
                                            <div
                                                className="col-md-12 card reservation-card p-3 mb-3"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    router.push(
                                                        `/productDetails/${result.PROG__CODE}/${result.prog_year}/${langCode}`
                                                    )
                                                }
                                            >
                                                <div className="row" style={{ height: '100%' }}>
                                                    {/* image */}
                                                    <div
                                                        className="col-12 col-lg-6"
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <div
                                                            className="reservation-img-box"
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                position: 'relative',
                                                            }}
                                                        >
                                                            <Image
                                                                src={result.PathImage}
                                                                alt="banner"
                                                                layout="fill"
                                                                objectFit="cover"
                                                                style={{ borderRadius: '10px' }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* content */}
                                                    <div className="col-12 col-lg-6 card-body">
                                                        <Typography variant="body1">
                                                            <span style={labelStyle}>
                                                                {t('Program Name')} :{' '}
                                                            </span>
                                                            {result.PROG__NAME}
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            <span style={labelStyle}>
                                                                {t('Country')} :{' '}
                                                            </span>
                                                            {result.COUNTRY_NAME}
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            <span style={labelStyle}>
                                                                {t('City')} :{' '}
                                                            </span>
                                                            {result.City}
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            <span style={labelStyle}>
                                                                {t('Program Year')} :{' '}
                                                            </span>
                                                            {result.prog_year}
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            <span style={labelStyle}>
                                                                {t('Trip Date from')} :{' '}
                                                            </span>
                                                            {result.Date_From}
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            <span style={labelStyle}>
                                                                {t('Trip Date to')} :{' '}
                                                            </span>
                                                            {result.Date_to}
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            <span style={labelStyle}>
                                                                {t('Start Price')} :{' '}
                                                            </span>
                                                            {result.start_price}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>{t('No results found.')}</div>
                    )}
                    <Button onClick={handleCloseModal} variant="contained" sx={{ marginTop: 2 }}>
                        {t('Close')}
                    </Button>
                </Box>
            </Modal>
        </Grid>
    );
};

export default Outings;
