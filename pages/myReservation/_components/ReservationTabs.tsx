import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { useTranslation } from 'react-i18next';
import UnpaidReservation from './UnpaidReservation';
import PaidReservation from './PaidReservation';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface Reservation {
    CustomerID: number;
    CustomerName: string;
    DateTrip: string;
    GroupCode: number;
    PROG_YEAR: number;
    ProgramCode: number;
    ProgramName: string;
    ReferrancePayment: number;
    ReservationNo: number;
    ReservationReferrance: string;
    TotalPayMent: string;
}
function CustomTabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const { t } = useTranslation();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={t('All Paid Reservations')} {...a11yProps(0)} />
                    <Tab label={t('All Unpaid Reservations')} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <PaidReservation/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <UnpaidReservation />
            </CustomTabPanel>
        </Box>
    );
}
