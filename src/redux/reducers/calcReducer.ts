import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { removeSpaces, toLocaleString } from '../../helpers';
export interface DefaultState {
    res: number | string;
    num: number;
    sign: string;
    history: string;
    historyList: HistoryValues[];
}

const defaultState:DefaultState = {
    res: 0,
    num: 0,
    sign: '+',
    history: '',
    historyList: [],
};

export const calcSlice = createSlice({
    name: 'calc',
    initialState: defaultState,
    reducers: {
        resetClick: (state) => {
            state.sign = "";
            state.num = 0;
            state.res = 0;
            state.history = "";
        },
        numClick:(state, action: PayloadAction<number | string>) => {
            const value = action.payload;
            if (removeSpaces(state.num).length < 16) {
                state.num =
                state.num === 0 && value === "0"
                  ? 0
                  :  +removeSpaces(state.num) % 1 === 0
                  ? +toLocaleString(Number(removeSpaces(state.num + value.toString())))
                  : +toLocaleString(state.num + value.toString()),
                  state.res = !state.sign ? 0 : state.res;
                  state.history += value.toString();
            };
        },
        invertClick: (state) => {
            state.num = state.num ? +toLocaleString(+removeSpaces(state.num) * -1) : 0;
            state.res = state.res ? +toLocaleString(+removeSpaces(state.res) * -1) : 0;
            state.sign = "";
        },
        percentClick:(state) => {
            let num = state.num ? parseFloat(removeSpaces(state.num)) : 0;
            let res = state.res ? parseFloat(removeSpaces(state.res)) : 0;

            state.num = (num /= Math.pow(100, 1));
            state.res = (res /= Math.pow(100, 1));
            state.sign = "";
        },
        equalsClick: (state) => {
            if (state.sign && state.num) {
                const math = (a: number, b: number, sign: string) => {
                  if (sign === '+') return a + b;
                  if (sign === '-') return a - b;
                  if (sign === 'X') return a * b;
                  return a / b;
                }
                
                state.res = 
                state.num === 0 && state.sign === "/"
                    ? "Can't divide with 0"
                    : toLocaleString(
                        math(
                          Number(removeSpaces(state.res)),
                          Number(removeSpaces(state.num)),
                          state.sign
                        )
                    );
                state.historyList = [...state.historyList, {
                    date: new Date().toISOString(),
                    historyItem: state.history + "=" + state.res,
                }];
                state.history = ""
                state.sign = "";
                state.num = 0;
      
            }
        },
        signClick: (state, action:PayloadAction<string>) => {
            state.res = !state.res && state.num ? state.num : state.res;
            state.num = 0;
            
            if (state.sign !== '' && state.sign === state.history.slice(-1)) {
                state.history = state.history.replace(state.history.slice(-1), action.payload);
            } else {
                state.history += action.payload;
            }
            state.sign = action.payload;
        },
        commaClick: (state, action:PayloadAction<number>) => {
            state.num = !state.num.toString().includes(".") ? state.num + action.payload : state.num;
        },
    }
});

export const { resetClick, numClick, invertClick, percentClick, signClick, commaClick, equalsClick} = calcSlice.actions

export default calcSlice.reducer;