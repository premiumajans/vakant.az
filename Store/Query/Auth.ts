import {changePasswordParam, loginParams, registerParam,} from "@/interfaces/authParams";
import {getItems, Item, select} from "@/interfaces/generalResponses";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";

const MAIN_PATH = process.env.NEXT_PUBLIC_MAIN_PATH;

export const auth = createApi({
    baseQuery: fetchBaseQuery({baseUrl: MAIN_PATH}),
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (build) => ({
        login: build.mutation({
            query: (data: loginParams) => ({
                url: `api/auth/login`,
                method: "POST",
                body: data
            }),
        }),
        register: build.mutation({
            query: (data: registerParam) => ({
                headers: {
                    'Content-type': 'application/json'
                },
                url: `api/auth/register`,
                method: "POST",
                body: data
            }),
        }),
        privacy: build.mutation({
            query: () => ({
                url: `api/term`,
                method: "GET",
            }),
        }),
        logout: build.mutation({
            query: (token) => ({
                url: `api/auth/logout`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        changePassword: build.mutation({
            query: ({
                        user,
                        token,
                    }: {
                user: changePasswordParam;
                token: string;
            }) => ({
                url: `api/auth/change-password`,
                method: "POST",
                body: user,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
            }),
        }),
        refresh: build.mutation({
            query: (token: string , abortController:any = '') => ({
                url: `api/auth/refresh`,
                method: "POST",
                signal:abortController?.siqnal,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }),
        }),
        salaries: build.query<select, any>({
            query: () => ({
                url: `api/salaries`,
                method: "GET",
            }),
        }),
        education: build.query<select, any>({
            query: () => ({
                url: `api/education`,
                method: "GET",
            }),
        }),
        experience: build.query<select, any>({
            query: () => ({
                url: `api/experience`,
                method: "GET",
            }),
        }),
        categories: build.query<select, any>({
            query: () => ({
                url: `api/categories`,
                method: "GET",
            }),
        }),
        modes: build.query<select, any>({
            query: () => ({
                url: `api/modes`,
                method: "GET",
            }),
        }),
        vacancies: build.query<select, any>({
            query: () => ({
                url: `api/vacancies`,
                method: "GET",
            }),
        }),
        city: build.query<select, any>({
            query: () => ({
                url: `api/city`,
                method: "GET",
            }),
        }),
        postVacancies: build.mutation<{ message: string }, { data: FormData, token: string }>({
            query: ({data, token}) => ({
                body: data,
                headers: {
                    'Content-type': 'application/json;',
                    'Authorization': `Bearer ${token}`,
                },
                method: "POST",
                url: `api/vacancies/store`,
            }),
        }),
        forgotPassword: build.mutation<{ data: { token: string, email: string }, status: string }, { email: string }>({
            query: (data) => ({
                url: `api/auth/forgot-password`,
                method: "POST",
                body: data,
                headers: {
                    'Content-type': 'application/json'
                }
            }),
        }),
        resetPassword: build.mutation<any, {
            email: string,
            new_password: string,
            password_confirmation: string,
            token: string
        }>({
            query: (data) => ({
                url: `api/auth/reset-password`,
                method: "POST",
                body: data,
                headers: {
                    'Content-type': 'application/json'
                }
            }),
        }),
        updateCompany: build.mutation<any, {
            data: { email: string, phone: string, name: string, address: string },
            token: string
        }>({
            query: ({data, token}) => ({
                url: `api/company-update`,
                method: "POST",
                body: data,
                headers: {
                    "Access-Control-Allow-Origin": "http::/localhost:3000",
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
            }),
        }),
        checkCompany: build.mutation<any, { token: string }>({
            query: ({token}) => ({
                url: `api/get-company`,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }),
        }),
        sendPhoto: build.mutation<any, { data: FormData, token: string }>({
            query: ({data, token}) => ({
                url: `api/company/update/photo`,
                method: "POST",
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }),
        }),
        getItems: build.mutation<getItems, string>({
            query: (token) => ({
                url: `api/vacancies/all`,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }),
        }),
        getItem: build.mutation<{ vacancy:Item }, { token: string, id: string }>({
            query: ({token, id}) => ({
                url: `api/vacancies/${id}`,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }),
        }),
        updateItem: build.mutation<{ vacancy:Item }, { token: string, id: string, data:Item }>({
            query: ({token, id, data}) => ({
                url: `api/vacancies/${id}/update`,
                method: "POST",
                body: data,
                headers: {
                    'Content-type': 'application/json;',
                    'Authorization': `Bearer ${token}`,
                },
            }),
        }),
        deleteItem: build.mutation<getItems, { id: number, token: string }>({
            query: ({vacancy_id, token}) => ({
                url: `api/vacancies/${vacancy_id}/delete`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }),
        }),
        getPremium: build.mutation<getItems, { id: number, token: string }>({
            query: ({id, token}) => ({
                url: `api/company/${id}/get-premium`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }),
        }),
        cancelPremium: build.mutation<getItems, { id: number, token: string }>({
            query: ({id, token}) => ({
                url: `api/company/${id}/premium/cancel`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }),
        }),
        increasePremium: build.mutation<getItems, { id: number, token: string }>({
            query: ({id, token}) => ({
                url: `api/company/${id}/extend/time`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }),
        }),
        settings: build.query({
            query: () => ({
                url: `api/settings`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useDeleteItemMutation,
    useGetItemsMutation,
    useCheckCompanyMutation,
    useSendPhotoMutation,
    useUpdateCompanyMutation,
    useResetPasswordMutation,
    useLoginMutation,
    useRegisterMutation,
    usePrivacyMutation,
    useLogoutMutation,
    useChangePasswordMutation,
    useRefreshMutation,
    useCategoriesQuery,
    useCityQuery,
    useEducationQuery,
    useExperienceQuery,
    useModesQuery,
    useSalariesQuery,
    usePostVacanciesMutation,
    useForgotPasswordMutation,
    useGetItemMutation,
    useUpdateItemMutation,
    useGetPremiumMutation,
    useSettingsQuery,
    useCancelPremiumMutation,
    useIncreasePremiumMutation
} = auth;
