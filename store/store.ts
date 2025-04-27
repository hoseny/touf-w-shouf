import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import languageSlice from './languageSlice';
import { FetchProductApi } from './Products/GetProductsApi';
import { RegisterApi } from './Register/RegisterApi';
import { LoginApi } from './Register/LoginApi';
import { FetchImagesApi } from './Products/FetchImagesApi';
import { FetchDetailsApi } from './Products/FetchDetailsApi';
import { FetchReviewApi } from './Products/FetchReviewApi';
import { FetchSupplementApi } from './Products/FetchSupplementApi';
import { FetchTourIncludingApi } from './Products/FetchTourIncludingApi';
import { FetchPolicyApi } from './Products/FetchPolicyApi';
import { VerifyEmailApi } from './Register/VerifyEmailApi';
import { AddReviewApi } from './Products/AddReviewApi';
import userSlice from './Register/userSlice';
import { FetchProgramGroupsApi } from './Products/FetchProgramGroupsApi';
import { FetchGroupPriceApi } from './Products/FetchGroupPriceApi';
import { FetchExtraApi } from './Products/FetchExtraApi';
import { AddReservationApi } from './Reservation/AddReservationApi';
import { AddExtraApi } from './Reservation/AddExtraApi';
import { AddReservationDetailsApi } from './Reservation/AddReservationDetailsApi';
import { FetchPaymentApi } from './Reservation/FetchPaymentApi';
import { FetchForgetPassDataApi } from './ForgetPassword/FetchForgetPassDataApi';
import { VerifyPasswordApi } from './ForgetPassword/VerifyPasswordApi';
import { ResetPasswordApi } from './ForgetPassword/ResetPasswordApi';
import { FetchNationalityApi } from './Filter/FetchNationalityApi';
import wishlistSlice from './wishlistSlice';
import { FetchLanguageApi } from './FetchLanguageApi';
import { FetchDayUseArApi } from './Products/FetchDayUseArApi';
import { FetchPackagesEnApi } from './Products/FetchPackagesEnApi';
import { FetchPackagesArApi } from './Products/FetchPackagesArApi';
import { FetchDetailsARApi } from './Products/ProgramDetailsAR/FetchDetailsARApi';
import { FetchTourIncludingArApi } from './Products/ProgramDetailsAR/FetchTourIncludingArApi';
import { FetchPolicyArApi } from './Products/ProgramDetailsAR/FetchPolicyArApi';
import { FetchCountryEnApi } from './Filter/FetchCountryEnApi';
import { FetchCountryArApi } from './Filter/FetchCountryArApi';
import { FetchTourTypeApi } from './Filter/FetchTourTypeApi';
import { FetchPaidReservation } from './Reservation/FetchPaidReservation';
import { FetchSupplementArApi } from './Products/FetchSupplementArApi';
import { FetchCityEnApi } from './Filter/FetchCityEnApi';
import { FetchCityArApi } from './Filter/FetchCityArApi';
import { FetchTourTypeArApi } from './Filter/FetchTourTypeArApi';
import { FetchUnPaidReservation } from './Reservation/FetchUnPaidReservation';
import { FetchInvoiceById } from './Reservation/FetchInvoiceById';
import { FetchTourExcludingApi } from './Products/FetchTourExcludingApi';
import { fetchLogoSlice } from './Home/LogoSlice';
import { FetchDayUseEnApi } from './Products/FetchDayUseEnApi';
import { FetchVideo } from './Products/FetchVideo';
import { FetchTourExcludingArApi } from './Products/ProgramDetailsAR/FetchTourExcludingArApi';
import { FetchVoucher } from './Reservation/FetchVoucher';
import { FetchPublicPolicy } from './Products/FetchPublicPolicy';
import { FetchPublicPolicyArApi } from './Products/FetchPublicPolicyAr';

export const store = configureStore({
    reducer: {
        language: languageSlice,
        user: userSlice,
        wishlist: wishlistSlice,
        [FetchProductApi.reducerPath]: FetchProductApi.reducer,
        [FetchDayUseArApi.reducerPath]: FetchDayUseArApi.reducer,
        [FetchDayUseEnApi.reducerPath]: FetchDayUseEnApi.reducer,
        [RegisterApi.reducerPath]: RegisterApi.reducer,
        [LoginApi.reducerPath]: LoginApi.reducer,
        [FetchImagesApi.reducerPath]: FetchImagesApi.reducer,
        [FetchDetailsApi.reducerPath]: FetchDetailsApi.reducer,
        [FetchReviewApi.reducerPath]: FetchReviewApi.reducer,
        [FetchSupplementApi.reducerPath]: FetchSupplementApi.reducer,
        [FetchTourIncludingApi.reducerPath]: FetchTourIncludingApi.reducer,
        [FetchPolicyApi.reducerPath]: FetchPolicyApi.reducer,
        [VerifyEmailApi.reducerPath]: VerifyEmailApi.reducer,
        [AddReviewApi.reducerPath]: AddReviewApi.reducer,
        [FetchProgramGroupsApi.reducerPath]: FetchProgramGroupsApi.reducer,
        [FetchGroupPriceApi.reducerPath]: FetchGroupPriceApi.reducer,
        [FetchExtraApi.reducerPath]: FetchExtraApi.reducer,
        [AddReservationApi.reducerPath]: AddReservationApi.reducer,
        [AddExtraApi.reducerPath]: AddExtraApi.reducer,
        [AddReservationDetailsApi.reducerPath]: AddReservationDetailsApi.reducer,
        [FetchPaymentApi.reducerPath]: FetchPaymentApi.reducer,
        [FetchForgetPassDataApi.reducerPath]: FetchForgetPassDataApi.reducer,
        [ResetPasswordApi.reducerPath]: ResetPasswordApi.reducer,
        [VerifyPasswordApi.reducerPath]: VerifyPasswordApi.reducer,
        [FetchNationalityApi.reducerPath]: FetchNationalityApi.reducer,
        [FetchLanguageApi.reducerPath]: FetchLanguageApi.reducer,
        [FetchPackagesArApi.reducerPath]: FetchPackagesArApi.reducer,
        [FetchPackagesEnApi.reducerPath]: FetchPackagesEnApi.reducer,
        [FetchDetailsARApi.reducerPath]: FetchDetailsARApi.reducer,
        [FetchTourIncludingArApi.reducerPath]: FetchTourIncludingArApi.reducer,
        [FetchPolicyArApi.reducerPath]: FetchPolicyArApi.reducer,
        [FetchCountryEnApi.reducerPath]: FetchCountryEnApi.reducer,
        [FetchTourTypeApi.reducerPath]: FetchTourTypeApi.reducer,
        [FetchCountryArApi.reducerPath]: FetchCountryArApi.reducer,
        [FetchPaidReservation.reducerPath]: FetchPaidReservation.reducer,
        [FetchUnPaidReservation.reducerPath]: FetchUnPaidReservation.reducer,
        [FetchSupplementArApi.reducerPath]: FetchSupplementArApi.reducer,
        [FetchCityEnApi.reducerPath]: FetchCityEnApi.reducer,
        [FetchCityArApi.reducerPath]: FetchCityArApi.reducer,
        [FetchTourTypeArApi.reducerPath]: FetchTourTypeArApi.reducer,
        [FetchInvoiceById.reducerPath]: FetchInvoiceById.reducer,
        [FetchTourExcludingApi.reducerPath]: FetchTourExcludingApi.reducer,
        [fetchLogoSlice.reducerPath]: fetchLogoSlice.reducer,
        [FetchVideo.reducerPath]: FetchVideo.reducer,
        [FetchTourExcludingArApi.reducerPath]: FetchTourExcludingArApi.reducer,
        [FetchVoucher.reducerPath]: FetchVoucher.reducer,
        [FetchPublicPolicy.reducerPath]: FetchPublicPolicy.reducer,
        [FetchPublicPolicyArApi.reducerPath]: FetchPublicPolicyArApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(FetchVideo.middleware)
            .concat(FetchTourExcludingArApi.middleware)
            .concat(FetchProductApi.middleware)
            .concat(FetchDayUseArApi.middleware)
            .concat(FetchDayUseEnApi.middleware)
            .concat(RegisterApi.middleware)
            .concat(LoginApi.middleware)
            .concat(FetchImagesApi.middleware)
            .concat(FetchDetailsApi.middleware)
            .concat(FetchReviewApi.middleware)
            .concat(FetchSupplementApi.middleware)
            .concat(FetchTourIncludingApi.middleware)
            .concat(FetchPolicyApi.middleware)
            .concat(VerifyEmailApi.middleware)
            .concat(AddReviewApi.middleware)
            .concat(FetchProgramGroupsApi.middleware)
            .concat(FetchGroupPriceApi.middleware)
            .concat(FetchExtraApi.middleware)
            .concat(AddReservationApi.middleware)
            .concat(AddExtraApi.middleware)
            .concat(AddReservationDetailsApi.middleware)
            .concat(FetchPaymentApi.middleware)
            .concat(FetchForgetPassDataApi.middleware)
            .concat(ResetPasswordApi.middleware)
            .concat(VerifyPasswordApi.middleware)
            .concat(FetchNationalityApi.middleware)
            .concat(FetchCountryEnApi.middleware)
            .concat(FetchLanguageApi.middleware)
            .concat(FetchPackagesArApi.middleware)
            .concat(FetchPackagesEnApi.middleware)
            .concat(FetchDetailsARApi.middleware)
            .concat(FetchTourIncludingArApi.middleware)
            .concat(FetchPolicyArApi.middleware)
            .concat(FetchTourTypeApi.middleware)
            .concat(FetchCountryArApi.middleware)
            .concat(FetchPaidReservation.middleware)
            .concat(FetchSupplementArApi.middleware)
            .concat(FetchCityEnApi.middleware)
            .concat(FetchCityArApi.middleware)
            .concat(FetchTourTypeArApi.middleware)
            .concat(FetchUnPaidReservation.middleware)
            .concat(FetchInvoiceById.middleware)
            .concat(FetchTourExcludingApi.middleware)
            .concat(FetchVoucher.middleware)
            .concat(FetchPublicPolicy.middleware)
            .concat(FetchPublicPolicyArApi.middleware)
            .concat(fetchLogoSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
