import {
    store
} from "../index";

import {
    languages
} from "./data";
import {setValues, getValues} from '../../utils/auth'
const state = {
    languages,
    selectedLocale: getValues('lang') ? JSON.parse(getValues('lang')) : languages[2],
}
// getters
const getters = {
    selectedLocale: state => {
        var lang = state.selectedLocale;

        for (const item of languages) {
            if (item.suffix === store.getters.language ) {
                lang = item;
                break;
            }else {
                lang = state.selectedLocale;
            }
        }
        return lang;
    },
    languages: state => {

        return state.languages;
    },
}

const actions = {
    changeLanguage(context, payload) {
        context.commit('changeLanguageHandler', payload);
    }
}

const mutations = {
    changeLanguageHandler(state, language) {
        setValues('lang', language)
        state.selectedLocale = language;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
