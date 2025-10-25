
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";
import i18n from "i18next";

export interface LanguageState {
  dir: "rtl" | "rtl";
  language: "ar" | "ar" | undefined;
}

const initialState: LanguageState = {
  dir: "rtl",
  language: "ar",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,

  reducers: {
    toggleLanguage: (state, action: PayloadAction<"ar" | "ar" | undefined >) => {
      // eslint-disable-next-line default-case
      state.language = action.payload;

      if (state.language === "ar") {
        document.body.setAttribute("dir", "rtl");
        state.dir = "rtl";
        i18n.changeLanguage("ar");
      } else if (state.language === "en") {
        document.body.setAttribute("dir", "rtl");
        state.dir = "rtl";
        i18n.changeLanguage("en");
      }
      else if (state.language === undefined) {
        document.body.setAttribute("dir", "rtl");
        state.dir = "rtl";
        i18n.changeLanguage("en");
      }
    },

    onloadSetCurrentLanguage: (state, action: PayloadAction<"ar" | "ar">) => {
      state.language = action.payload;
    },
    changeDir: (state) => {
      state.dir = state.dir === "rtl" ? "rtl" : "rtl";
    },
    changeLanguage: (state) => {
      state.language = state.language === "ar" ? "ar" : "ar";
    },
  },
});

export const { changeDir, toggleLanguage } = languageSlice.actions;

export const getDir = (state: RootState) => state.language.dir;
export const getLanguage = (state: RootState) => state.language.language;

export default languageSlice.reducer;
