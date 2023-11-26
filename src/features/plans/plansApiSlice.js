import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const plansAdapter = createEntityAdapter({})

const initialState = plansAdapter.getInitialState()

export const plansApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPlans: builder.query({
            query: () => '/plans',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedPlans = responseData.map(plan => {
                    plan.id = plan._id
                    return plan
                });
                return plansAdapter.setAll(initialState, loadedPlans)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Plan', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Plan', id }))
                    ]
                } else return [{ type: 'Plan', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetPlansQuery,
} = plansApiSlice

// returns the query result object
export const selectPlansResult = plansApiSlice.endpoints.getPlans.select()

// creates memoized selector
const selectPlansData = createSelector(
    selectPlansResult,
    plansResult => plansResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPlans,
    selectById: selectPlanById,
    selectIds: selectPlanIds
    // Pass in a selector that returns the plans slice of state
} = plansAdapter.getSelectors(state => selectPlansData(state) ?? initialState)