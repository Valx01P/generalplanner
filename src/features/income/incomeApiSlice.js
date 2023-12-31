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
            query: () => ({
                url: '/income',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            // transformResponse: responseData => {
            //     const loadedIncome = responseData.map(income => {
            //         income.id = income._id
            //         return income
            //     });
            //     return incomeAdapter.setAll(initialState, loadedIncome)
            // },
            transformResponse: responseData => {
                if (Array.isArray(responseData)) {
                    // Assuming that responseData is an array of info objects
                    const loadedIncome = responseData.map(income => ({
                        ...income,
                        id: income._id, // Adding id, _id is present in the response data
                    }))

                    return {
                        ids: loadedIncome.map(income => income.id),
                        entities: loadedIncome.reduce((acc, income) => {
                            acc[income.id] = income
                            return acc
                        }, {}),
                    }
                } else {
                    console.error('Invalid response data format:', responseData);
                    return { ids: [], entities: {} }
                }
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
        
        addNewIncome: builder.mutation({
            query: initialIncomeData => ({
                url: '/income',
                method: 'POST',
                body: {
                    ...initialIncomeData,
                }
            }),
            invalidatesTags: [
                { type: 'Income', id: "LIST" }
            ]
        }),
        updateIncome: builder.mutation({
            query: initialIncomeData => ({
                url: '/income',
                method: 'PATCH',
                body: {
                    ...initialIncomeData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Income', id: arg.id }
            ]
        }),
        deleteIncome: builder.mutation({
            query: ({ id }) => ({
                url: `/income`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Income', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetIncomeQuery,
    useAddNewIncomeMutation,
    useUpdateIncomeMutation,
    useDeleteIncomeMutation,
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