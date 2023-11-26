import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const incomeAdapter = createEntityAdapter({})

const initialState = incomeAdapter.getInitialState()

export const incomeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getIncome: builder.query({
            query: () => '/income',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedIncome = responseData.map(income => {
                    income.id = income._id
                    return income
                });
                return incomeAdapter.setAll(initialState, loadedIncome)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Income', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Income', id }))
                    ]
                } else return [{ type: 'Income', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetIncomeQuery,
} = incomeApiSlice

// returns the query result object
export const selectIncomeResult = incomeApiSlice.endpoints.getIncome.select()

// creates memoized selector
const selectIncomeData = createSelector(
    selectIncomeResult,
    incomeResult => incomeResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllIncome,
    selectById: selectIncomeById,
    selectIds: selectIncomeIds
    // Pass in a selector that returns the income slice of state
} = incomeAdapter.getSelectors(state => selectIncomeData(state) ?? initialState)