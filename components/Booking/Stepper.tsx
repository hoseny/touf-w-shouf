import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useTranslation } from 'react-i18next';

import PassengerData from './PassengerData';
import Payment from '@/pages/Payment/[ref]/[sp]';
import Success from '@/pages/Payment/Success';

const stepsComponent = ['Passenger data', 'Booking', 'Success'];

export default function BookingStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [tripDate, setTripDate] = React.useState<string | null>(null);
    const { t } = useTranslation();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {stepsComponent.map(label => (
                    <Step key={label}>
                        <StepLabel>
                            <Typography variant="subtitle1">{t(label)}</Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <>
                {activeStep === 0 ? (
                    <PassengerData handleNext={handleNext} setTripDate={setTripDate} />
                ) : activeStep === 1 ? (
                    <Payment />
                ) : (
                    activeStep === 2 && <Success />
                )}
            </>
        </Box>
    );
}
