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
            // transformResponse: responseData => {
            //     const loadedInfo = responseData.map(info => {
            //         info.id = info._id
            //         return info
            //     });
            //     return infoAdapter.setAll(initialState, loadedInfo)
            // },
            // transformResponse: responseData => {
            //     if (Array.isArray(responseData)) {
            //         const loadedInfo = responseData.map(info => {
            //             info.id = info._id
            //             return info
            //         });
            //         return infoAdapter.setAll(initialState, loadedInfo);
            //     } else {
            //         console.error('Invalid response data format:', responseData);
            //         return initialState;
            //     }
            // },
            // transformResponse: responseData => {
            //     if (Array.isArray(responseData)) {
            //         // Map and transform each item in the responseData
            //         const loadedInfo = responseData.map(info => ({
            //             ...info,
            //             id: info._id, // Assuming _id is present in the response data
            //         }));
            
            //         return loadedInfo; // Return the transformed data
            //     } else {
            //         console.error('Invalid response data format:', responseData);
            //         return [];
            //     }
            // },
            transformResponse: responseData => {
                if (Array.isArray(responseData)) {
                    // Assuming that responseData is an array of info objects
                    const loadedInfo = responseData.map(info => ({
                        ...info,
                        id: info._id, // Adding id, _id is present in the response data
                    }))

                    return {
                        ids: loadedInfo.map(info => info.id),
                        entities: loadedInfo.reduce((acc, info) => {
                            acc[info.id] = info
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
                        { type: 'Info', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Info', id }))
                    ]
                } else return [{ type: 'Info', id: 'LIST' }]
            }
        }),
        addNewInfo: builder.mutation({
            query: initialInfoData => ({
                url: '/info',
                method: 'POST',
                body: {
                    ...initialInfoData,
                }
            }),
            invalidatesTags: [
                { type: 'Info', id: "LIST" }
            ]
        }),
        updateInfo: builder.mutation({
            query: initialInfoData => ({
                url: '/info',
                method: 'PATCH',
                body: {
                    ...initialInfoData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Info', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/info`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Info', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetInfoQuery,
    useAddNewInfoMutation,
    useUpdateInfoMutation,
    useDeleteInfoMutation,
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