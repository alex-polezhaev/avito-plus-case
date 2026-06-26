import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTableValues } from '../../api/servicesBackend.js';

export const fetchTableData = createAsyncThunk(
  'table/fetchTableData',
  async ({ token, spreadsheetId }) => getAllTableValues(token, spreadsheetId),
);

const makeObjectUsingTableData = (array) => {
  const tableObject = {};
  array.forEach((column) => {
    tableObject[column[0]] = [...column];
  });
  return tableObject;
};

const getLargestColLength = (tableObject) =>
  Object.keys(tableObject).reduce((result, key) => {
    const col = tableObject[key];
    if (col.length > result) return col.length;
    return result;
  }, 2);

const initialState = {
  tableObject: {},
  tableObjects: {},
  numOfAds: 0,
  isTableDataLoaded: false,
  isTableDataLoading: false,
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    createTableObject: (state, action) => {
      const { sheetID } = action.payload;
      const tableObject = state.tableObjects[sheetID];
      state.tableObject = tableObject;
      state.numOfAds = getLargestColLength(tableObject) - 2;
    },
    removeTable: () => initialState,
    updateTableObject: (state, action) => {
      const newTableObject = action.payload;
      const sheetID = newTableObject.SheetID[1];
      state.tableObject = newTableObject;
      state.tableObjects = { ...state.tableObjects, [sheetID]: newTableObject };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.fulfilled, (state, action) => {
        const tableData = action.payload;
        state.tableObjects = tableData
          .map(({ values }) => makeObjectUsingTableData(values))
          .filter((obj) => obj['SheetID'])
          .reduce((acc, obj) => {
            const sheetID = obj['SheetID'][1];
            return { ...acc, [sheetID]: obj };
          }, {});
        state.isTableDataLoaded = true;
        state.isTableDataLoading = false;
      })
      .addCase(fetchTableData.pending, (state) => {
        state.isTableDataLoaded = false;
        state.isTableDataLoading = true;
      });
  },
});

export const { createTableObject, removeTable, updateTableObject } =
  tableSlice.actions;

export default tableSlice.reducer;
