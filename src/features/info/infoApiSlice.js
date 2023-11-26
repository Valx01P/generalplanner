import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const infoAdapter = createEntityAdapter({})

const initialState = infoAdapter.getInitialState()

export const infoApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getInfo: builder.query({
            query: () => '/info',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedInfo = responseData.map(info => {
                    info.id = info._id
                    return info
                });
                return infoAdapter.setAll(initialState, loadedInfo)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Info', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Info', id }))
                    ]
                } else return [{ type: 'Info', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetInfoQuery,
} = infoApiSlice

// returns the query result object
export const selectInfoResult = infoApiSlice.endpoints.getInfo.select()

// creates memoized selector
const selectInfoData = createSelector(
    selectInfoResult,
    infoResult => infoResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllInfo,
    selectById: selectInfoById,
    selectIds: selectInfoIds
    // Pass in a selector that returns the info slice of state
} = infoAdapter.getSelectors(state => selectInfoData(state) ?? initialState)